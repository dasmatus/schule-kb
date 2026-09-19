---
title: "LosOS – článok (pracovná verzia)"
typ: "projekt"
trieda: "III.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/docx/losos.docx"
tags:
  - losos
  - projekt
  - paper
---
# LosOS – článok (pracovná verzia)

> [!info] Zdrojový dokument
> `losos.docx` — [[losos.docx|otvoriť originál]]

# LosOS: A Stateless, Container-Native Operating System for Edge and Homelab Deployments

Abstract

Container runtimes are routinely deployed on general-purpose Linux distributions whose persistent file systems accumulate configuration drift, residual malware, and unbounded state over time. We present *LosOS*, a minimal operating system in which the entire userspace lives inside a single read-only cpio initramfs loaded entirely into RAM at boot. Because no data is ever written to the root filesystem, a reboot unconditionally restores the system to its factory-clean state. LosOS is written in Rust and compiled as fully static binaries against musl libc, eliminating shared-library dependencies. It ships five purpose-built components: a PID 1 init system (actman), a DHCP client (dhcman), a cluster orchestrator (cluman), an OTA updater (updman), and an ISO/initramfs builder (isoman). We describe the architecture, key design patterns — including symlink polymorphism and embedded build artefacts — and evaluate the system’s boot behaviour, component performance, and security properties. Results show sub-millisecond dispatch latencies for core OS primitives and a dramatically reduced attack surface compared to conventional distributions.

operating systems, containers, stateless, edge computing, Rust, homelab, security

## Introduction

Modern infrastructure increasingly favours immutable, declarative deployments: container images are built once and never mutated in production; configuration management tools strive to make system state a function of declared intent rather than accumulated history. Yet the operating systems underneath these workloads are often conventional, mutable Linux distributions — systems whose root filesystems grow with every apt upgrade, log rotation, or misconfigured daemon. The gap between *intended* and *actual* system state widens over time, opening windows for configuration drift, persistent malware, and hard-to-reproduce failures.

A compelling solution is to make the OS itself stateless: load the entire userspace into RAM at boot from a read-only image, run workloads in containers on a separate persistent data volume, and trust that a reboot always returns the machine to a known-good state. This approach has been explored in specialised contexts — ChromeOS, CoreOS/Flatcar, NixOS — but these systems either carry significant complexity, depend on heavyweight toolchains, or target cloud providers rather than resource-constrained homelab and edge hardware.

*LosOS* (from the Slovak word *losos*, salmon — which return to their origin) explores how small such a stateless OS can be without sacrificing functionality. The entire userspace fits in approximately 50 MB: three programs (mdl-utils, BusyBox, nerdctl/containerd) statically linked against musl, packed into a single newc cpio archive. The OS boots, acquires a network address, registers with a cluster controller, and begins accepting container workloads — all before any operator interaction.

The main contributions of this paper are:

- A description of the LosOS architecture and its five core components, each implementing a narrow, well-defined OS responsibility.
- The *symlink polymorphism* pattern for role-dispatch in static binaries, which enables a single compiled artefact to serve multiple system roles without recompilation.
- An embedded-Containerfile build strategy that makes the initramfs build fully reproducible with zero external file dependencies.
- An evaluation of component latencies, security properties, and a comparison with comparable minimal Linux systems.

## Background and Related Work

### Stateless and Immutable OS Designs

Container Linux (formerly CoreOS) pioneered read-only root filesystems for server nodes, using A/B partition schemes for atomic OS updates. Flatcar Linux continues this lineage. NixOS achieves reproducibility through the Nix purely functional package manager, but retains a writable filesystem and a complex configuration language. Alpine Linux targets minimalism and is frequently used as a container base image, but is not itself stateless at the OS level. LosOS differs from all of these in loading the entire userspace into RAM, requiring no persistent root partition at all.

### Rust in Systems Programming

Rust’s ownership model and absence of a garbage collector have made it increasingly attractive for OS-level code. Projects such as Redox build an entire microkernel in Rust; LosOS takes a narrower approach, replacing only the init system and OS utilities while reusing the Linux kernel. Static compilation against musl provides fully self-contained binaries with no dynamic-linker dependency, a property that is critical for an initramfs environment.

### Edge and Homelab Orchestration

Kubernetes and Docker Swarm provide cluster orchestration but carry substantial operational overhead. K3s targets edge deployments with a reduced footprint, but still requires a writeable, persistent OS. LosOS’s cluman component offers a lightweight alternative: a single binary providing server, client, and controller roles via a minimal HTTP API, suitable for single-digit-node homelabs where Kubernetes complexity is unwarranted.

## Architecture

### System Overview

LosOS layer model. Everything above the kernel resides in RAM.

At boot the Linux kernel extracts the cpio archive into a tmpfs root. actman is invoked as PID 1, mounts the standard virtual filesystems (/dev, /proc, /sys, /tmp), and iterates /etc/init/start/ lexicographically to spawn system services. dhcman configures each network interface via a full DORA exchange and netlink. cluman (in client mode) registers the node with the cluster server and enters a polling loop to receive Docker Compose tasks. Container workloads run via nerdctl atop containerd; their data lands on a separate persistent block device (/data), never on the root.

### Symlink Polymorphism

A recurring design problem in initramfs environments is binary proliferation: each additional binary increases initramfs size and maintenance burden. LosOS addresses this with *symlink polymorphism*: a single compiled Rust binary, installed under a canonical name, serves multiple roles depending on the basename of argv\[0\].

fn main() {
 let role = std::env::args()
 .next()
 .and\_then(|p| Path::new(&p)
 .file\_name()
 .map(|n| n.to\_string\_lossy()
 .into\_owned()));
 match role.as\_deref() {
 Some("init") =\> run\_init(),
 Some("poweroff")=\> reboot(RebootCmd::PowerOff),
 Some("reboot") =\> reboot(RebootCmd::Reboot),
 \_ =\> eprintln!("unknown role"),
 }
}

The filesystem contains only one ELF binary; /sbin/init, /sbin/poweroff, and /sbin/reboot are symlinks to it. The same pattern is used by dhcman (one binary, one symlink per interface) and cluman (server / client / controller roles). This reduces the number of distinct binaries in the initramfs to five, totalling approximately 5 MB of stripped Rust code.

### Shared Kernel Command-Line Parser

Kernel command-line parameters (/proc/cmdline) carry boot-time configuration across all LosOS components. Rather than duplicating parsing logic, a single CmdLineOptions type is defined in actman::cmdline and re-exported for use by updman and pakman. Parameters follow a key=value convention; the parser is linear in the number of pairs and benchmarks at under 1 µs for typical command lines of 10–20 parameters.

### Embedded Build Artefacts

The isoman ISO builder embeds the multi-stage Containerfile as a static Rust string literal rather than reading it from disk. This has two consequences: (1) the build recipe is version-controlled with the binary itself, and (2) initiating an initramfs build requires no external files beyond a running Podman daemon. The Containerfile is written to a tempfile at build invocation time with the target role injected as a build argument (ARG MODE={client|server|controller}), baking the cluman role into the resulting image.

## Implementation

### actman — PID 1 Init System

actman is the first userspace process. It mounts four virtual filesystems, then spawns services by iterating /etc/init/start/ in lexicographic order. Each entry is executed as a child process; actman enters a perpetual waitpid loop to reap zombies, a requirement for any PID 1. Shutdown is symmetric: /etc/init/stop/ scripts are executed in reverse order, followed by a rustix::system::reboot() syscall.

### dhcman — DHCP Client

dhcman implements the full RFC 2131 DORA sequence using the dhcproto crate for packet encoding. Network configuration (address, prefix length, default route, DNS) is applied via netlink sockets using netlink-packet-route. The binary waits up to 10 s for the target interface to appear in /sys/class/net/, accommodating slow driver probes. Three DHCP attempts are made with a 5 s receive timeout per attempt. The interface name is extracted from argv\[0\] after stripping any numeric prefix (e.g., 00-eth0 `→` eth0), enabling per-interface service instances from a single binary.

### cluman — Cluster Manager

cluman provides lightweight cluster orchestration across three roles:

**Server** exposes a Tokio async HTTP API on port 9999. State is a shared Arc\<Mutex\<ServerState\>\> containing a client registry and a [[FIFO]] task queue (VecDeque\<Task\>). Endpoints include /register, /task (poll), and /push (controller `→` server).

**Client** runs as a boot-time daemon. It registers itself, then polls /task and executes received Docker Compose payloads. An Executor trait abstracts the Docker Compose invocation, enabling mock-based unit testing without a live container runtime.

**Controller** is a one-shot CLI tool for human operators or automation pipelines. It sends commands to the server over HTTP and exits.

IP range expansion supports single addresses, CIDR notation, and dash notation (e.g., 10.0.0.1-10.0.0.20), allowing a controller to fan out a task to an arbitrary node set in a single invocation.

### updman — OTA Updater

updman reads /etc/update.json (containing base\_url, image\_tag, and hash fields), pulls the new OS image from a container registry using nerdctl save, extracts the nested os.initramfs.tar.gz layer, mounts the BOOT partition, and replaces the initramfs file. The update takes effect on the next reboot; the running system is unaffected. Hash verification of the downloaded artefact is reserved for a forthcoming version.

### Build Pipeline

A five-stage GitLab CI pipeline builds and validates every commit:

1. **compile** — cargo build --release for all crates targeting x86\_64-unknown-linux-musl.
1. **initramfs** — isoman assembles the cpio archive inside a Podman multi-stage build.
1. **iso** — isoman links kernel, initramfs, and Limine bootloader into a hybrid [[BIOS]]+[[BIOS|UEFI]] ISO.
1. **test-boot** — testman boots the ISO in QEMU (-nographic) and asserts expected log patterns on the serial console.
1. **publish** — pushes the container image to the GitLab registry tagged by branch.

Stages 3 and 4 run in parallel; the total pipeline duration is dominated by the Rust compile stage ( 90 s on shared runners).

## Evaluation

### Component Microbenchmarks

Table1 summarises latencies for core OS primitives measured with Criterion on an x86\_64 host (AMD Ryzen 5, 16 GB RAM).

Microbenchmark Results

| **Operation** | **Mean** | **Notes** |
| --- | --- | --- |
| CmdLineOptions parse (10 pairs) | `<1`µs | linear |
| RebootCMD dispatch | `<50`ns | single match |
| DHCP message encode/decode | 5–10 µs | per round-trip |
| Mask-to-prefix conversion | `<100`ns | leading_ones() |

All critical OS paths operate well below the millisecond threshold, confirming that Rust and musl impose negligible overhead compared to the dominant I/O costs (DHCP network round-trips, container image pulls).

### Initramfs Size

The production initramfs (client role) compresses to approximately 50 MB as a gzip’d cpio. The five mdl-utils binaries account for roughly 5 MB; the remainder is BusyBox, nerdctl, containerd, and buildkitd. For comparison, a minimal Debian 12 debootstrap image exceeds 300 MB before any workload packages are added.

### Security Analysis

LosOS’s architecture eliminates several classes of persistent threats by construction:

**No persistent root filesystem.** Malware that writes to / disappears on the next reboot. An attacker must persist state to the data volume or to the boot partition, both of which are separate and can be cryptographically verified independently.

**No dynamic linker.** All binaries are statically linked against musl. There is no ld.so, no /etc/ld.so.cache, and no dynamic library search path — a common vector for privilege escalation via LD\_PRELOAD injection.

**Minimal binary surface.** Five binaries totalling 5 MB replace the hundreds of setuid and world-executable binaries present in a typical distribution.

**Known limitation.** cluman communicates over plain HTTP with no authentication. This is acceptable for trusted network segments (e.g., isolated VLAN homelab), but unsuitable for internet-exposed deployments. mTLS or HMAC-signed requests are planned.

### Comparison with Related Systems

Table2 positions LosOS against comparable minimal systems.

Comparison of Minimal Linux Systems

| **System** | **Stateless root** | **Built-in orch.** | **OTA** | **Size** |
| --- | --- | --- | --- | --- |
| LosOS |  |  |  | `∼`50 MB |
| Alpine Linux | `×` | `×` | `×` | `∼`130 MB |
| CoreOS/Flatcar |  | `×` |  | `>`400 MB |
| K3s + Ubuntu | `×` |  | `×` | `>`1 GB |

LosOS is the only system in the comparison offering all three properties (stateless root, built-in cluster orchestration, OTA updates) at sub-100 MB footprint.

## Discussion and Future Work

Several aspects of LosOS remain active areas of development:

**Hash-verified OTA updates.** The hash field in update.json is parsed but not enforced. A forthcoming version will verify SHA-256 of the downloaded initramfs before replacing the active boot image, closing the supply-chain integrity gap.

**Authenticated cluster communication.** The cluman HTTP API will be extended with mutual TLS and/or HMAC-signed request bodies to support deployments outside fully trusted networks.

**arm64 support.** All binaries currently target x86\_64-unknown-linux-musl. Porting to aarch64-unknown-linux-musl is straightforward given Rust’s cross-compilation support and would enable deployment on ARM single-board computers common in homelab contexts.

**Secure Boot integration.** Signing the kernel and initramfs with a user-controlled key would extend the stateless security guarantee below the OS layer, preventing tampering at the bootloader level.

**pakman maturity.** The NixOS-based package manager is functional but lacks dependency resolution, package update, and integrity verification. Expanding it to a first-class component is a medium-term priority.

## Conclusion

We presented LosOS, a stateless container-native operating system in which the entire userspace is a single read-only cpio archive loaded into RAM. The key insight is that statelessness-by-architecture — rather than statelessness enforced by policy — eliminates whole classes of persistent threats and operational drift. Five purpose-built Rust components, each statically linked against musl, implement the OS responsibilities traditionally spread across hundreds of distribution packages. The symlink polymorphism pattern and embedded build artefact strategy demonstrate that a production-grade OS toolchain need not sacrifice simplicity for functionality. Microbenchmarks confirm sub-millisecond latencies for all core OS primitives. LosOS is open-source and available at [https://gitlab.com/mtos-v2](https://gitlab.com/mtos-v2).

## Acknowledgment

The author used Claude Sonnet 4.6 (Anthropic) as an AI coding assistant for documentation, test scaffolding, and refactoring. All AI-generated content was reviewed and approved by the author before inclusion in the codebase.

00

CoreOS Team, “Container Linux by CoreOS,” [https://coreos.com](https://coreos.com), 2014.

Kinvolk GmbH, “Flatcar Container Linux,” [https://flatcar.org](https://flatcar.org), 2018.

E. Dolstra, M. de Jonge, and E. Visser, “Nix: A Safe and Policy-Free System for Software Deployment,” in *Proc. 18th USENIX LISA*, 2004, pp. 79–92.

Alpine Linux Project, “Alpine Linux,” [https://alpinelinux.org](https://alpinelinux.org).

S. Klabnik and C. Nichols, *The Rust Programming Language*, No Starch Press, 2019.

J. R. Williams et al., “Redox OS,” [https://www.redox-os.org](https://www.redox-os.org), 2015.

R. Lind, “musl libc,” [https://musl.libc.org](https://musl.libc.org).

B. Burns et al., “Borg, Omega, and Kubernetes,” *ACM Queue*, vol. 14, no. 1, pp. 70–93, 2016.

Docker Inc., “Docker Swarm,” [https://docs.docker.com/engine/swarm/](https://docs.docker.com/engine/swarm/), 2015.

Rancher Labs, “K3s: Lightweight Kubernetes,” [https://k3s.io](https://k3s.io), 2019.
