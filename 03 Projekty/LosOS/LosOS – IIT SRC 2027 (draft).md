---
title: "LosOS – IIT SRC 2027 (draft)"
typ: "projekt"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2026-03
zdroj: "99 Zdroje/docx/LosOS_IIT-SRC2027_Draft.docx"
tags:
  - losos
  - projekt
  - paper
---

# LosOS – IIT SRC 2027 (draft)

> [!info] Zdrojový dokument
> `LosOS_IIT-SRC2027_Draft.docx` — [[LosOS_IIT-SRC2027_Draft.docx|otvoriť originál]]

**LosOS: A Stateless, Container-Native Operating System for Edge and Homelab Deployments**

**Matúš Ma****š****tena**

*Faculty of Informatics and Information Technologies*

*Slovak University of Technology in Bratislava*

*Bratislava, Slovakia*

***Abstract***—Container runtimes are routinely deployed on general-purpose Linux distributions whose persistent file systems accumulate configuration drift, residual malware, and unbounded state over time. We present *LosOS*, a minimal operating system in which the entire userspace lives inside a single read-only cpio initramfs loaded entirely into RAM at boot. Because no data is ever written to the root filesystem, a reboot unconditionally restores the system to its factory-clean state. LosOS is written in Rust and compiled as fully static binaries against musl libc, eliminating shared-library dependencies. It ships five purpose-built components: a PID 1 init system (actman), a DHCP client (dhcman), a cluster orchestrator (cluman), an OTA updater (updman), and an ISO/initramfs builder (isoman). We describe the architecture, key design patterns—including symlink polymorphism and embedded build artefacts—and evaluate the system's boot behaviour, component performance, and security properties. Results show sub-millisecond dispatch latencies for core OS primitives and a dramatically reduced attack surface compared to conventional distributions.

***Index Terms***—operating systems, containers, stateless, edge computing, Rust, homelab, security

**I. INTRODUCTION**

Modern infrastructure increasingly favours immutable, declarative deployments: container images are built once and never mutated in production; configuration management tools strive to make system state a function of declared intent rather than accumulated history. Yet the operating systems underneath these workloads are often conventional, mutable Linux distributions—systems whose root filesystems grow with every apt upgrade, log rotation, or misconfigured daemon. The gap between *intended* and *actual* system state widens over time, opening windows for configuration drift, persistent malware, and hard-to-reproduce failures.

A compelling solution is to make the OS itself stateless: load the entire userspace into RAM at boot from a read-only image, run workloads in containers on a separate persistent data volume, and trust that a reboot always returns the machine to a known-good state. This approach has been explored in specialised contexts—ChromeOS, CoreOS/Flatcar, NixOS—but these systems either carry significant complexity, depend on heavyweight toolchains, or target cloud providers rather than resource-constrained homelab and edge hardware.

*LosOS* (from the Slovak word *losos*, salmon—which return to their origin) explores how small such a stateless OS can be without sacrificing functionality. The entire userspace fits in approximately 50 MB: three programs (mdl-utils, BusyBox, nerdctl/containerd) statically linked against musl, packed into a single newc cpio archive. The OS boots, acquires a network address, registers with a cluster controller, and begins accepting container workloads—all before any operator interaction.

The main contributions of this paper are:

- *Architecture description.* LosOS and its five core components, each implementing a narrow, well-defined OS responsibility.
- *Symlink polymorphism.* A pattern for role-dispatch in static binaries, enabling a single compiled artefact to serve multiple system roles without recompilation.
- *Embedded-Containerfile build strategy.* Makes the initramfs build fully reproducible with zero external file dependencies.
- *Evaluation.* Component latencies, security properties, and a comparison with comparable minimal Linux systems.

**II. BACKGROUND AND RELATED WORK**

***A. Stateless and Immutable OS Designs***

Container Linux (formerly CoreOS) \[1\] pioneered read-only root filesystems for server nodes, using A/B partition schemes for atomic OS updates. Flatcar Linux \[2\] continues this lineage. NixOS \[3\] achieves reproducibility through the Nix purely functional package manager, but retains a writable filesystem and a complex configuration language. Alpine Linux \[4\] targets minimalism and is frequently used as a container base image, but is not itself stateless at the OS level. LosOS differs from all of these in loading the entire userspace into RAM, requiring no persistent root partition at all.

***B. Rust in Systems Programming***

Rust's ownership model and absence of a garbage collector have made it increasingly attractive for OS-level code \[5\]. Projects such as Redox \[6\] build an entire microkernel in Rust; LosOS takes a narrower approach, replacing only the init system and OS utilities while reusing the Linux kernel. Static compilation against musl \[7\] provides fully self-contained binaries with no dynamic-linker dependency, a property that is critical for an initramfs environment.

***C. Edge and Homelab Orchestration***

Kubernetes \[8\] and Docker Swarm \[9\] provide cluster orchestration but carry substantial operational overhead. K3s \[10\] targets edge deployments with a reduced footprint, but still requires a writeable, persistent OS. LosOS's cluman component offers a lightweight alternative: a single binary providing server, client, and controller roles via a minimal HTTP API, suitable for single-digit-node homelabs where Kubernetes complexity is unwarranted.

**III. ARCHITECTURE**

***A. System Overview***

- **Boot media (ISO / PXE)**<br>Linux kernel + initramfs (cpio, RAM)<br>actman (PID 1) → dhcman → cluman<br>Container workloads (nerdctl/containerd)<br>Persistent data volume (/data, optional)

Fig. 1. LosOS layer model. Everything above the kernel resides in RAM.

At boot the Linux kernel extracts the cpio archive into a tmpfs root. actman is invoked as PID 1, mounts the standard virtual filesystems (/dev, /proc, /sys, /tmp), and iterates /etc/init/start/ lexicographically to spawn system services. dhcman configures each network interface via a full DORA exchange and netlink. cluman (in client mode) registers the node with the cluster server and enters a polling loop to receive Docker Compose tasks. Container workloads run via nerdctl atop containerd; their data lands on a separate persistent block device (/data), never on the root.

***B. Symlink Polymorphism***

A recurring design problem in initramfs environments is binary proliferation: each additional binary increases initramfs size and maintenance burden. LosOS addresses this with *symlink polymorphism*: a single compiled Rust binary, installed under a canonical name, serves multiple roles depending on the basename of argv\[0\].

- fn main() {
- let role = std::env::args()
- .next()
- .and_then(\|p\| Path::new(&p)
- .file_name()
- .map(\|n\| n.to_string_lossy()
- .into_owned()));
- match role.as_deref() {
- Some("init") => run_init(),
- Some("poweroff") => reboot(RebootCmd::PowerOff),
- Some("reboot") => reboot(RebootCmd::Reboot),
- _ => eprintln!("unknown role"),
- }
- }

*Listing 1. Role dispatch in actman (simplified).*

The filesystem contains only one ELF binary; /sbin/init, /sbin/poweroff, and /sbin/reboot are symlinks to it. The same pattern is used by dhcman (one binary, one symlink per interface) and cluman (server / client / controller roles). This reduces the number of distinct binaries in the initramfs to five, totalling approximately 5 MB of stripped Rust code.

***C. Shared Kernel Command-Line Parser***

Kernel command-line parameters (/proc/cmdline) carry boot-time configuration across all LosOS components. Rather than duplicating parsing logic, a single CmdLineOptions type is defined in actman::cmdline and re-exported for use by updman and pakman. Parameters follow a key=value convention; the parser is linear in the number of pairs and benchmarks at under 1 µs for typical command lines of 10–20 parameters.

***D. Embedded Build Artefacts***

The isoman ISO builder embeds the multi-stage Containerfile as a static Rust string literal rather than reading it from disk. This has two consequences: (1) the build recipe is version-controlled with the binary itself, and (2) initiating an initramfs build requires no external files beyond a running Podman daemon. The Containerfile is written to a tempfile at build invocation time with the target role injected as a build argument (ARG MODE={client|server|controller}), baking the cluman role into the resulting image.

**IV. IMPLEMENTATION**

***A. actman — PID 1 Init System***

actman is the first userspace process. It mounts four virtual filesystems, then spawns services by iterating /etc/init/start/ in lexicographic order. Each entry is executed as a child process; actman enters a perpetual waitpid loop to reap zombies, a requirement for any PID 1. Shutdown is symmetric: /etc/init/stop/ scripts are executed in reverse order, followed by a rustix::system::reboot() syscall.

***B. dhcman — DHCP Client***

dhcman implements the full RFC 2131 DORA sequence using the dhcproto crate for packet encoding. Network configuration (address, prefix length, default route, DNS) is applied via netlink sockets using netlink-packet-route. The binary waits up to 10 s for the target interface to appear in /sys/class/net/, accommodating slow driver probes. Three DHCP attempts are made with a 5 s receive timeout per attempt. The interface name is extracted from argv\[0\] after stripping any numeric prefix (e.g., 00-eth0 → eth0), enabling per-interface service instances from a single binary.

***C. cluman — Cluster Manager***

cluman provides lightweight cluster orchestration across three roles:

**Server** exposes a Tokio async HTTP API on port 9999. State is a shared Arc\<Mutex\<ServerState\>\> containing a client registry and a [[FIFO]] task queue (VecDeque\<Task\>). Endpoints include /register, /task (poll), and /push (controller → server).

**Client** runs as a boot-time daemon. It registers itself, then polls /task and executes received Docker Compose payloads. An Executor trait abstracts the Docker Compose invocation, enabling mock-based unit testing without a live container runtime.

**Controller** is a one-shot CLI tool for human operators or automation pipelines. It sends commands to the server over HTTP and exits. IP range expansion supports single addresses, CIDR notation, and dash notation (e.g., 10.0.0.1-10.0.0.20), allowing a controller to fan out a task to an arbitrary node set in a single invocation.

***D. updman — OTA Updater***

updman reads /etc/update.json (containing base\_url, image\_tag, and hash fields), pulls the new OS image from a container registry using nerdctl save, extracts the nested os.initramfs.tar.gz layer, mounts the BOOT partition, and replaces the initramfs file. The update takes effect on the next reboot; the running system is unaffected. Hash verification of the downloaded artefact is reserved for a forthcoming version.

***E. Build Pipeline***

A five-stage GitLab CI pipeline builds and validates every commit:

1. **compile** — cargo build --release for all crates targeting x86\_64-unknown-linux-musl.
2. **initramfs** — isoman assembles the cpio archive inside a Podman multi-stage build.
3. **iso** — isoman links kernel, initramfs, and Limine bootloader into a hybrid [[BIOS]]+[[BIOS|UEFI]] ISO.
4. **test-boot** — testman boots the ISO in QEMU (-nographic) and asserts expected log patterns on the serial console.
5. **publish** — pushes the container image to the GitLab registry tagged by branch.

Stages 3 and 4 run in parallel; the total pipeline duration is dominated by the Rust compile stage (~90 s on shared runners).

**V. EVALUATION**

***A. Component Microbenchmarks***

Table I summarises latencies for core OS primitives measured with Criterion on an x86\_64 host (AMD Ryzen 5, 16 GB RAM).

| **Operation** | **Mean** | **Notes** |
| --- | --- | --- |
| CmdLineOptions parse (10 pairs) | < 1 µs | linear |
| RebootCMD dispatch | < 50 ns | single match |
| DHCP message encode/decode | 5–10 µs | per round-trip |
| Mask-to-prefix conversion | < 100 ns | leading_ones() |

TABLE I. Microbenchmark Results

All critical OS paths operate well below the millisecond threshold, confirming that Rust and musl impose negligible overhead compared to the dominant I/O costs (DHCP network round-trips, container image pulls).

***B. Initramfs Size***

The production initramfs (client role) compresses to approximately 50 MB as a gzip'd cpio. The five mdl-utils binaries account for roughly 5 MB; the remainder is BusyBox, nerdctl, containerd, and buildkitd. For comparison, a minimal Debian 12 debootstrap image exceeds 300 MB before any workload packages are added.

***C. Security Analysis***

LosOS's architecture eliminates several classes of persistent threats by construction:

**No persistent root filesystem.** Malware that writes to / disappears on the next reboot. An attacker must persist state to the data volume or to the boot partition, both of which are separate and can be cryptographically verified independently.

**No dynamic linker.** All binaries are statically linked against musl. There is no ld.so, no /etc/ld.so.cache, and no dynamic library search path—a common vector for privilege escalation via LD\_PRELOAD injection.

**Minimal binary surface.** Five binaries totalling 5 MB replace the hundreds of setuid and world-executable binaries present in a typical distribution.

**Known limitation.** cluman communicates over plain HTTP with no authentication. This is acceptable for trusted network segments (e.g., isolated VLAN homelab), but unsuitable for internet-exposed deployments. mTLS or HMAC-signed requests are planned.

***D. Comparison with Related Systems***

Table II positions LosOS against comparable minimal systems.

| **System** | **Stateless root** | **Built-in orch.** | **OTA** | **Size** |
| --- | --- | --- | --- | --- |
| LosOS | ✓ | ✓ | ✓ | ~50 MB |
| Alpine Linux | × | × | × | ~130 MB |
| CoreOS/Flatcar | ✓ | × | ✓ | >400 MB |
| K3s + Ubuntu | × | ✓ | × | >1 GB |

TABLE II. Comparison of Minimal Linux Systems

LosOS is the only system in the comparison offering all three properties (stateless root, built-in cluster orchestration, OTA updates) at sub-100 MB footprint.

**VI. DISCUSSION AND FUTURE WORK**

Several aspects of LosOS remain active areas of development:

**Hash-verified OTA updates.** The hash field in update.json is parsed but not enforced. A forthcoming version will verify SHA-256 of the downloaded initramfs before replacing the active boot image, closing the supply-chain integrity gap.

**Authenticated cluster communication.** The cluman HTTP API will be extended with mutual TLS and/or HMAC-signed request bodies to support deployments outside fully trusted networks.

**arm64 support.** All binaries currently target x86\_64-unknown-linux-musl. Porting to aarch64-unknown-linux-musl is straightforward given Rust's cross-compilation support and would enable deployment on ARM single-board computers common in homelab contexts.

**Secure Boot integration.** Signing the kernel and initramfs with a user-controlled key would extend the stateless security guarantee below the OS layer, preventing tampering at the bootloader level.

**pakman maturity.** The NixOS-based package manager is functional but lacks dependency resolution, package update, and integrity verification. Expanding it to a first-class component is a medium-term priority.

**VII. CONCLUSION**

We presented LosOS, a stateless container-native operating system in which the entire userspace is a single read-only cpio archive loaded into RAM. The key insight is that statelessness-by-architecture—rather than statelessness enforced by policy—eliminates whole classes of persistent threats and operational drift. Five purpose-built Rust components, each statically linked against musl, implement the OS responsibilities traditionally spread across hundreds of distribution packages. The symlink polymorphism pattern and embedded build artefact strategy demonstrate that a production-grade OS toolchain need not sacrifice simplicity for functionality. Microbenchmarks confirm sub-millisecond latencies for all core OS primitives. LosOS is open-source and available at

[https://gitlab.com/mtos-v2](https://gitlab.com/mtos-v2).

**. ACKNOWLEDGMENT**

The author used Claude Sonnet 4.6 (Anthropic) as an AI coding assistant for documentation, test scaffolding, and refactoring. All AI-generated content was reviewed and approved by the author before inclusion in the codebase.

**. REFERENCES**

\[1\] CoreOS Team, "Container Linux by CoreOS," https://coreos.com, 2014.

\[2\] Kinvolk GmbH, "Flatcar Container Linux," https://flatcar.org, 2018.

\[3\] E. Dolstra, M. de Jonge, and E. Visser, "Nix: A Safe and Policy-Free System for Software Deployment," in Proc. 18th USENIX LISA, 2004, pp. 79–92.

\[4\] Alpine Linux Project, "Alpine Linux," https://alpinelinux.org.

\[5\] S. Klabnik and C. Nichols, The Rust Programming Language. No Starch Press, 2019.

\[6\] J. Soller et al., "Redox OS," https://www.redox-os.org, 2015.

\[7\] R. Felker, "musl libc," https://www.musl-libc.org.

\[8\] B. Burns, B. Grant, D. Oppenheimer, E. Brewer, and J. Wilkes, "Borg, Omega, and Kubernetes," ACM Queue, vol. 14, no. 1, 2016.

\[9\] Docker Inc., "Docker Swarm," https://docs.docker.com/engine/swarm/, 2015.

\[10\] Rancher Labs, "K3s: Lightweight Kubernetes," https://k3s.io, 2019.
