---
title: "LosOS – NLnet NGI Zero Core (žiadosť)"
typ: "projekt"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2026-03
zdroj: "99 Zdroje/docx/LosOS_NLNet_NGI_Zero_Core_Application.docx"
tags:
  - losos
  - projekt
  - grant
---

# LosOS – NLnet NGI Zero Core (žiadosť)

> [!info] Zdrojový dokument
> `LosOS_NLNet_NGI_Zero_Core_Application.docx` — [[LosOS_NLNet_NGI_Zero_Core_Application.docx|otvoriť originál]]

**LosOS**

Stateless, Secure, Self-Updating Linux for Edge and Homelab

NGI Zero Core — Grant Application — March 2026

## Contact Information

**Applicant:** Matuš Mastena

**Email:** mmastena.alertbot@gmail.com

**Country:** Slovakia

**Organisation:** Individual / Open-source project

**Repository:** https://gitlab.com/matus\_mastena/mdl

**Fund:** NGI Zero Core

## Project Abstract

LosOS is a minimal, stateless, RAM-resident Linux distribution for secure edge and homelab deployments. Its entire userspace lives in a single statically-linked cpio initramfs — no shared libraries, no dynamic linker, no persistent writable root filesystem. Every reboot returns the machine to a clean known state, providing a hardware-enforced security guarantee: malware cannot survive a reboot below UEFI.

All system components are written in Rust, statically linked against musl libc, and ship as a single bootable ISO via the Limine bootloader ([[BIOS]] + UEFI). LosOS includes a custom init system (actman), a DHCP client (dhcman), a cluster orchestration daemon (cluman) with an HTTP API, an autonomous OTA updater (updman), and an early-stage Nix-based package manager (pakman).

This proposal funds four milestones: ARM64 architecture support, formal security hardening, completion of pakman, and comprehensive documentation enabling real-world adoption.

## Problem Statement

Edge and homelab infrastructure runs on software stacks that are complex, stateful, and hard to audit. Conventional Linux distributions accumulate state over time — installed packages, modified configs, leftover credentials — creating an ever-growing attack surface that is difficult to reason about. When a machine is compromised, cleaning it is non-trivial; operators often cannot be sure a reinstall was thorough enough.

Existing stateless or minimal systems either require significant operational complexity (NixOS, Talos + Kubernetes), are vendor-controlled and cloud-only (Bottlerocket), or lack built-in orchestration (Alpine diskless mode). None offers the combination of: stateless RAM-boot, autonomous OTA updates, simple cluster orchestration, and a minimal Rust-only binary tree that a single person can audit end-to-end.

## Solution

LosOS addresses this gap through three architectural decisions:

- Stateless by construction: the root filesystem is the initramfs, loaded into RAM at boot and never written to. A reboot is a full reset. No configuration drift, no persistence of malicious state.
- Minimal trusted computing base: all components are single statically-linked Rust binaries. No shared libraries, no interpreter, no package manager running at runtime. The entire OS — init, DHCP, cluster daemon, OTA updater — compiles to under 10 MB.
- Self-managing clusters: cluman provides Swarm-style orchestration via a simple HTTP API and Docker Compose task files. Nodes poll for tasks; the controller pushes updates. No Kubernetes, no etcd, no complex control plane.

OTA updates work by pulling a new initramfs image from a container registry (updman), writing it to the boot partition, and rebooting. The update takes effect on next boot, leaving the running system unaffected until the operator chooses to restart.

## Current Project Status

LosOS is functional and self-hosting today on x86\_64. Completed components:

- actman — PID 1 init system (service supervision, shutdown sequencing)
- dhcman — full DORA DHCP client
- cluman — cluster manager (server/client/controller via argv\[0\] symlink polymorphism); HTTP API on :9999
- updman — OTA updater (pulls initramfs from OCI registry, writes to boot partition)
- isoman — ISO builder (Limine [[BIOS]]+UEFI, multi-stage Podman build)
- testman — QEMU-based integration test framework with log assertion
- pakman — early-stage Nix-based package manager (not yet production-ready)

What is missing: ARM64 support, formal security hardening, pakman completion, and documentation sufficient for external adoption. This grant funds exactly those gaps.

## Requested Support

**Requested amount:** €15,000

**Other funding:** None. This is the first funding sought for LosOS.

### Budget Breakdown

| **Milestone** | **Description** | **Duration** | **Budget** |
| --- | --- | --- | --- |
| **M1 — ARM64 Port** | Cross-compile entire musl/Rust toolchain; boot on Raspberry Pi 5 and ARM cloud instances; extend testman QEMU suite for aarch64. | 6 weeks | **€4,000** |
| **M2 — Security Hardening** | Formal threat model document; seccomp profiles per component; AppArmor LSM integration; reproducible build verification and attestation. | 6 weeks | **€4,000** |
| **M3 — pakman Completion** | Finish Nix flake-based container image management for the data drive; integrate with cluman task dispatch API; add install/remove/upgrade lifecycle. | 6 weeks | **€4,000** |
| **M4 — Documentation & Adoption** | Architecture reference; getting-started guide; three worked deployment examples (homelab NAS node, edge sensor node, lightweight CI runner). | 4 weeks | **€3,000** |
| **Total** |  | **22 weeks** | **€15,000** |

The applicant is a solo developer. Budget covers part-time compensation for approximately 22 weeks of focused development work (roughly €680/week), prioritised over existing student commitments. No subcontractors. No hardware costs — ARM devices and cloud access will be covered from personal resources.

## Significant Technical Challenges

### ARM64 Cross-Compilation

The entire toolchain — Rust, musl libc, and all crates — must cross-compile cleanly to aarch64-unknown-linux-musl. The Limine bootloader must be validated for ARM64 UEFI boot. testman must be extended to spin up aarch64 QEMU VMs and assert correct boot behaviour.

### pakman in a Stateless Environment

Nix normally expects a writable /nix/store. LosOS has no writable root at runtime. pakman will use a separate data partition (or a tmpfs overlay) to host container images built by Nix, avoiding the /nix/store assumption entirely. The integration point with cluman’s task dispatch API adds further coupling to reason about carefully.

### Seccomp in a Non-Standard Init Environment

Standard seccomp profile tooling assumes systemd or similar. LosOS uses actman as PID 1. Each component needs a bespoke seccomp allowlist derived from its actual syscall footprint, validated by strace and automated by testman assertions that a seccomp violation terminates the process under test.

## Comparison with Existing Efforts

The table below positions LosOS against the closest alternatives:

|  | **Stateless RAM-boot** | **Built-in orchestration** | **Autonomous OTA** | **Pure Rust / auditable** |
| --- | --- | --- | --- | --- |
| **LosOS** | ✅ Yes | ✅ Yes (cluman) | ✅ Yes (updman) | ✅ Yes |
| Talos Linux | ✅ Yes | ⚠ Requires Kubernetes | ✅ Yes | ❌ Go / complex |
| Alpine diskless | ✅ Yes | ❌ None built-in | ❌ Manual | ❌ C / large |
| Bottlerocket | ✅ Yes | ❌ AWS-only | ✅ Yes | ❌ Rust but proprietary |
| NixOS | ❌ Stateful by default | ❌ None built-in | ⚠ nixos-rebuild | ❌ Nix + large eval |

## Ecosystem and Community Engagement

LosOS targets three communities:

- Homelab operators seeking a reboot-to-clean security model without Kubernetes complexity.
- Edge computing practitioners deploying sensor nodes, lightweight CI runners, or small clusters on ARM hardware.
- Security researchers interested in minimal trusted computing bases and stateless infrastructure.

Planned engagement activities during and after the grant period:

- Publish reproducible build attestations to make the supply chain auditable.
- Submit to Distrowatch and post on LWN.net and Hacker News.
- Write up the architecture and security model on the existing technical blog (~10,000 views).
- Submit a talk proposal to FOSDEM 2027 (Microkernel and Component-Based OS devroom or Security devroom).

All code is and will remain MIT-licensed. There are no vendor dependencies in the core OS components; the OTA mechanism uses the OCI image specification, which is an open standard.

## Applicant Background

Matuš Mastena is a Computer Science student based in Slovakia. He has been developing LosOS solo for 18 months, building every component from scratch in Rust. His background includes:

- Completed two-week internship at ESET (Slovak cybersecurity company) — exposure to professional security engineering practices.
- Technical blog with approximately 10,000 views covering Linux internals, Rust systems programming, and infrastructure topics.
- Practical experience with QEMU, musl toolchains, Podman, Nix, OCI image format, and Limine bootloader.

The applicant understands the scope of the proposed milestones from first-hand implementation experience — pakman and ARM64 are already partially explored, and testman provides an automated baseline to work against.

## Generative AI Disclosure

Claude Sonnet 4.6 (Anthropic) was used to assist with drafting and structuring this application. The applicant reviewed and edited all content before submission. All technical descriptions reflect actual implementation decisions made by the applicant. AI was not used to generate code, make architectural decisions, or fabricate project details.

*End of application — thank you for your consideration.*
