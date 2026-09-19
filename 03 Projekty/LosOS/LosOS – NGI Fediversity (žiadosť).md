---
title: "LosOS – NGI Fediversity (žiadosť)"
typ: "projekt"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2026-03
zdroj: "99 Zdroje/docx/LosOS_NGI_Fediversity_Application.docx"
tags:
  - losos
  - projekt
  - grant
---

# LosOS – NGI Fediversity (žiadosť)

> [!info] Zdrojový dokument
> `LosOS_NGI_Fediversity_Application.docx` — [[LosOS_NGI_Fediversity_Application.docx|otvoriť originál]]

**LosOS**

Stateless, Secure Infrastructure for Self-Hosted Federated Services

NGI Fediversity — Grant Application — March 2026

| **Applicant** | Matuš Mastena |
| --- | --- |
| **Email** | mmastena.alertbot@gmail.com |
| **Country** | Slovakia |
| **Organisation** | Individual / Open-source project |
| **Repository** | [https://gitlab.com/mtos-v2/mdl](https://gitlab.com/matus_mastena/mdl) |
| **Fund** | NGI Fediversity |
| **Requested Amount** | **€****15,000** |

## Project Abstract

LosOS is a minimal, stateless, RAM-resident Linux distribution purpose-built for secure, self-managed server deployments. Its core insight is simple but powerful: by loading the entire OS into RAM at boot and never writing to a persistent root filesystem, every reboot returns the machine to a guaranteed clean state. There is no configuration drift, no accumulated malware, no mystery. A compromised fediverse instance is one reboot from clean.

This property makes LosOS an ideal substrate for the federated internet. Running a Mastodon instance, a PeerTube server, or a Lemmy community today requires operators to manage stateful Linux systems — patching, auditing, and reasoning about years of accumulated state. LosOS eliminates that burden. The entire userspace fits in a single statically-linked cpio initramfs; all components are written in Rust and linked against musl libc. A built-in cluster daemon (cluman) deploys fediverse services as Docker Compose tasks over a simple HTTP API. An autonomous OTA updater (updman) keeps the OS itself current by pulling a new initramfs from a container registry, taking effect on the next reboot. An early-stage Nix-based package manager (pakman) will extend this to application-layer packages, directly aligning with the NixOS ecosystem central to NGI Fediversity.

This proposal funds four milestones: ARM64 architecture support (enabling deployment on Raspberry Pi — the most common self-hosting hardware), formal security hardening, completion of pakman with fediverse service templates, and comprehensive documentation guiding operators through deploying real federated services on LosOS.

## Problem Statement

The federated internet depends on independent operators running their own servers. Every Mastodon instance, PeerTube channel, or Lemmy community that exists is maintained by someone who chose to host it themselves — often a volunteer with limited time and limited systems administration experience. The health and resilience of the fediverse is directly proportional to how easy and sustainable that hosting is.

Today, self-hosting a fediverse service means managing a conventional Linux system: installing dependencies, configuring services, applying security patches, reasoning about what has changed since initial setup, and cleaning up after incidents. These systems accumulate state over time — modified configs, leftover credentials, installed-but-forgotten packages — and that accumulated state is the primary source of security vulnerabilities and operational surprises. When a server is compromised, operators face a hard question: was the reinstall thorough enough? Is the new system actually clean?

Existing solutions fall short in different ways. Docker-based self-hosting platforms (YunoHost, Umbrel, CasaOS) reduce the application-layer complexity but run on top of conventional stateful Linux systems, inheriting all the underlying state problems. NixOS offers reproducible system configuration but requires significant expertise and still maintains a stateful filesystem. Talos Linux and similar immutable OSes are designed for Kubernetes clusters, not the small-scale single-node or three-node deployments that characterise fediverse self-hosting. None combines stateless RAM-boot, built-in service orchestration, autonomous OTA updates, and a minimal auditable binary tree that a single operator can understand end-to-end.

The result: running a fediverse instance is harder than it should be, more fragile than it needs to be, and opaque enough that security incidents are difficult to reason about and recover from. This is a structural barrier to the growth of the federated internet.

## Solution

LosOS addresses this structural barrier through three architectural decisions that work together to make self-hosted fediverse services radically simpler, more secure, and more resilient.

### Stateless by Construction

The root filesystem is the initramfs, loaded into RAM at boot and never written to. A reboot is a complete reset to a known-good state. There is no configuration drift, no persistence of malicious state, and no ambiguity about whether a compromised system has been fully cleaned. Fediverse operators can recover from an incident by rebooting. Application data (user posts, media, databases) lives on a separate data partition or network storage and is explicitly scoped — not mixed into the OS state.

### Minimal Trusted Computing Base

All OS components are single statically-linked Rust binaries: actman (PID 1 init system), dhcman (DHCP client), cluman (cluster orchestration daemon), updman (OTA updater), isoman (ISO builder), and pakman (Nix-based package manager). No shared libraries, no interpreter, no package manager running at runtime. The entire OS compiles to under 10 MB. This minimalism is security-relevant: there is less code to audit, fewer attack vectors, and a smaller blast radius when a vulnerability is found.

### Fediverse-Ready Orchestration and Packaging

cluman provides Swarm-style service orchestration via a simple HTTP API and Docker Compose task files. Deploying a Mastodon instance, a PeerTube server, or a Lemmy community is a matter of pushing a Compose file to the cluster API — the same interface used to update any other service. updman handles OS updates autonomously by pulling a new initramfs from an OCI container registry and scheduling a reboot. pakman (the subject of Milestone 3) will extend this to application-layer packages using Nix flakes, enabling reproducible, declarative fediverse service configurations that can be shared, version-controlled, and audited.

## Current Project Status

LosOS is functional and self-hosting today on x86\_64. The following components are complete:

- actman — PID 1 init system (service supervision, shutdown sequencing)
- dhcman — full DORA DHCP client
- cluman — cluster manager (server/client/controller via argv\[0\] symlink polymorphism); HTTP API on :9999
- updman — OTA updater (pulls initramfs from OCI registry, writes to boot partition)
- isoman — ISO builder (Limine [[BIOS]]+[[BIOS|UEFI]], multi-stage Podman build)
- testman — QEMU-based integration test framework with log assertion
- pakman — early-stage Nix-based package manager (not yet production-ready)

What is missing: ARM64 support for Raspberry Pi deployment, formal security hardening, pakman completion with fediverse service templates, and documentation sufficient for real-world fediverse operator adoption. This grant funds exactly those gaps.

## Requested Support

**Requested amount:** €15,000

**Other funding:** None. This is the first funding sought for LosOS.

### Budget Breakdown

| **Milestone** | **Description** | **Duration** | **Budget** |
| --- | --- | --- | --- |
| **M1 — ARM64 Port** | Cross-compile entire musl/Rust toolchain for aarch64; validate Limine ARM64 UEFI boot; test on Raspberry Pi 5 and ARM cloud instances; extend testman QEMU suite for aarch64. Enables cheap, low-power fediverse hosting. | 6 weeks | €4,000 |
| **M2 — Security Hardening** | Formal threat model for fediverse operator deployments; seccomp profiles per component; AppArmor LSM integration; reproducible build verification and supply-chain attestation. Builds operator trust. | 6 weeks | €4,000 |
| **M3 — pakman + Fediverse Templates** | Complete Nix flake-based package management for the data drive. Develop ready-to-use fediverse service templates: Mastodon, PeerTube, and Lemmy as cluman task files and pakman packages. Integrate install/remove/upgrade lifecycle. | 6 weeks | €4,000 |
| **M4 — Documentation & Adoption** | Architecture reference; getting-started guide; three worked deployment examples: (1) single-node Mastodon instance, (2) PeerTube video hosting node, (3) Lemmy community server. All targeting non-expert fediverse operators. | 4 weeks | €3,000 |
| **Total** |  | **22 weeks** | **€****15,000** |

The applicant is a solo developer. Budget covers part-time compensation for approximately 22 weeks of focused development work (roughly €680/week), prioritised over existing student commitments. No subcontractors. ARM devices and cloud access will be covered from personal resources.

## Significant Technical Challenges

### ARM64 Cross-Compilation

The entire toolchain — Rust, musl libc, and all crates — must cross-compile cleanly to aarch64-unknown-linux-musl. The Limine bootloader must be validated for ARM64 UEFI boot. testman must be extended to spin up aarch64 QEMU VMs and assert correct boot behaviour. This enables LosOS to run on Raspberry Pi 5 and other low-cost ARM hardware that is the dominant substrate for hobbyist and small-organisation fediverse hosting.

### pakman in a Stateless Environment

Nix normally expects a writable /nix/store. LosOS has no writable root at runtime. pakman will use a separate data partition (or a tmpfs overlay) to host Nix-built container images, avoiding the /nix/store assumption entirely. Fediverse service templates must be declarative, reproducible, and composable — a Mastodon deployment, for example, requires PostgreSQL, [[Redis]], Sidekiq workers, and a web frontend, all of which must be coordinated through cluman's task dispatch API.

### Seccomp in a Non-Standard Init Environment

Standard seccomp profile tooling assumes systemd or a similar init. LosOS uses actman as PID 1. Each component needs a bespoke seccomp allowlist derived from its actual syscall footprint, validated by strace and automated by testman assertions. For fediverse operators, this directly reduces the blast radius of any vulnerability in a hosted service.

## Comparison with Existing Efforts

The table below positions LosOS against the closest alternatives for self-hosted fediverse infrastructure:

| **Platform** | **Stateless Boot** | **Built-in Orch.** | **Auto OTA** | **Nix / Reproducible** | **Fediverse-Ready** |
| --- | --- | --- | --- | --- | --- |
| **LosOS** | ✅ Yes | ✅ Yes (cluman) | ✅ Yes (updman) | ✅ Yes (pakman) | ✅ Milestone 3 |
| YunoHost | ❌ Stateful | ✅ App store | ⚠️ Manual | ❌ No | ✅ Yes |
| Umbrel / CasaOS | ❌ Stateful | ✅ App store | ⚠️ Partial | ❌ No | ⚠️ Limited |
| NixOS | ❌ Stateful | ❌ None built-in | ⚠️ nixos-rebuild | ✅ Yes | ⚠️ DIY |
| Talos Linux | ✅ Yes | ⚠️ Requires K8s | ✅ Yes | ❌ No | ❌ Over-complex |

LosOS is the only platform combining stateless boot, built-in orchestration, autonomous OTA, and a Nix-based reproducible package system — while remaining simple enough for a single fediverse operator to understand and audit.

## Ecosystem and Community Engagement

LosOS targets three overlapping communities that are core to the NGI Fediversity mission:

- Fediverse operators running Mastodon instances, PeerTube channels, Lemmy communities, or similar services who want a simpler, more secure hosting substrate.
- Homelab and self-hosting enthusiasts who already value independence from cloud providers and are open to radically minimal infrastructure.
- Security researchers and infrastructure engineers interested in stateless systems, minimal trusted computing bases, and reproducible builds.

Planned engagement activities during and after the grant period:

- Publish fediverse service templates (Mastodon, PeerTube, Lemmy) as open pakman packages, shareable and version-controlled by the community.
- Submit to the Fediverse-focused forums and communities (fediverse.info, Mastodon social.coop, the SocialHub forum) with deployment guides.
- Publish reproducible build attestations to make the supply chain auditable — directly supporting the NGI Fediversity emphasis on security and trust.
- Write up the architecture and deployment examples on the existing technical blog (~10,000 views).
- Submit a talk proposal to FOSDEM 2027 (Decentralised Internet & Privacy devroom or Distributions devroom).
- Engage with the NixOS community through the pakman Nix flake design, contributing learnings about stateless Nix usage back to the ecosystem.

All code is and will remain MIT-licensed. There are no vendor dependencies in the core OS components; the OTA mechanism uses the OCI image specification (an open standard), and the packaging system uses Nix flakes (an open, community-maintained toolchain).

## Applicant Background

Matuš Mastena is a Computer Science student based in Slovakia. He has been developing LosOS solo for 18 months, building every component from scratch in Rust. His background includes:

- Completed two-week mandatory internship at ESET (Slovak cybersecurity company) — exposure to professional security engineering practices directly relevant to Milestone 2.
- Technical blog with approximately 10,000 views mostly in Slovak covering Linux internals, Rust systems programming, and infrastructure topics.
- Practical hands-on experience with QEMU, musl toolchains, Podman, Nix, OCI image format, and Limine bootloader — all directly exercised in LosOS today.
- Familiarity with fediverse service deployment through personal homelab experimentation with Mastodon and PeerTube.

The applicant understands the scope of the proposed milestones from first-hand implementation experience. pakman and ARM64 are already partially explored; testman provides an automated baseline to work against; and the fediverse service templates build directly on the cluman HTTP API that is already functional.

## Generative AI Disclosure

Claude Sonnet 4.6 (Anthropic) was used to assist with drafting and structuring this application. The applicant reviewed and edited all content before submission. All technical descriptions reflect actual implementation decisions made by the applicant. AI was not used to generate code, make architectural decisions, or fabricate project details.

*End of application — thank you for your consideration.*
