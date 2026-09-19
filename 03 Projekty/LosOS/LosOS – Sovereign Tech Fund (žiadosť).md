---
title: "LosOS – Sovereign Tech Fund (žiadosť)"
typ: "projekt"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2026-03
zdroj: "99 Zdroje/docx/LosOS_STF_Application.docx"
tags:
  - losos
  - projekt
  - grant
---

# LosOS – Sovereign Tech Fund (žiadosť)

> [!info] Zdrojový dokument
> `LosOS_STF_Application.docx` — [[LosOS_STF_Application.docx|otvoriť originál]]

**LosOS**

A stateless, RAM-resident container OS for edge and homelab infrastructure

Sovereign Tech Fund — Open Call Application • March 2026

| **Project Name** | LosOS (formerly Massdeployed Linux / MDL) |
| --- | --- |

| **Repository** | https://gitlab.com/mtos-v2 |
| --- | --- |

| **License** | Open source (OSI-approved) |
| --- | --- |

| **Applicant** | Matus Mastena — solo maintainer |
| --- | --- |

| **Contact** | mmastena.alertbot@gmail.com |
| --- | --- |

| **Requested Amount** | €50,000 |
| --- | --- |

| **Duration** | 12 months |
| --- | --- |

| **Technology Readiness** | Working prototype — boots, clusters, updates OTA |
| --- | --- |

## 1. Executive Summary

LosOS is a minimal, stateless Linux operating system distributed as a single bootable ISO. The entire userspace lives in a cpio initramfs loaded into RAM at boot — there is no persistent root filesystem. A reboot unconditionally returns the machine to a clean, known-good state. Malware, misconfigurations, and accumulated drift cannot survive a reboot because there is nothing to persist into.

This architecture addresses a structural problem in edge and homelab deployments: servers are configured once, then quietly drift into unknown states over months of updates, patches, and manual fixes. LosOS eliminates that class of problem by making the running system ephemeral by construction.

The project is written entirely in Rust, statically linked against musl libc, and ships a small suite of purpose-built system utilities — init, DHCP, cluster orchestration, OTA updater, ISO builder, and integration test runner. It is developed and maintained by one person as a fully open source project.

## 2. Problem Statement

Modern server infrastructure has a reproducibility problem. Even when deployments start from a clean image, they diverge over time:

- Package updates modify system files in place, often without atomic rollback.
- Ad-hoc configuration changes accumulate in /etc and /var.
- Intrusions or supply-chain compromises can write persistent artifacts that survive reboots — because the root filesystem is writable and durable.
- Homelab and edge nodes are frequently managed by a single operator with limited tooling; recovery from a broken state requires manual intervention.

Existing solutions address this partially. Container orchestrators (Docker, Kubernetes) isolate workloads but still run on mutable host operating systems. Immutable distros (Flatcar, NixOS, Talos) move in the right direction but carry significant complexity, resource requirements, and learning curves that exclude small teams and individual operators.

LosOS addresses the problem at the OS level: by making the host itself stateless and RAM-resident, the attack surface shrinks to what is in the ISO, OTA updates are atomic (apply at next reboot), and recovery is always one reboot away.

## 3. Technical Description

### 3.1 Architecture

LosOS boots via a hybrid [[BIOS]]/[[BIOS|UEFI]] ISO (built with Limine). The kernel decompresses a single cpio initramfs into RAM and pivots to it as the root. There is no disk mount for the OS layer. All state that must persist between reboots (user data, container images, configuration) is written to a separate data drive, which is explicitly outside the OS boundary.

All system utilities are statically linked Rust binaries — no shared libraries, no dynamic linker, no package manager at runtime. The entire OS image is typically under 30 MB.

### 3.2 Component Overview (util-mdl)

| **Component** | **Role** |
| --- | --- |
| **actman** | PID 1 init system — starts services, reaps zombies. |
| **dhcman** | DHCP client implementing the full DORA sequence. |
| **cluman** | Cluster manager — HTTP API on :9999; controller distributes Docker Compose tasks to clients. Multi-role via argv[0] symlink. |
| **updman** | OTA updater — pulls a new initramfs image from a container registry and makes it live on the next reboot. |
| **isoman** | ISO builder — multi-stage Podman build producing a hybrid BIOS+UEFI bootable image. |
| **pakman** | Package manager — builds Docker images and persists them to the data drive, making them available across reboots without re-pulling (early stage). |
| **testman** | Integration test framework — boots the OS in QEMU and asserts against log output. |

### 3.3 Key Security Properties

- Reboot-to-clean guarantee: the RAM-resident OS image cannot be modified at runtime. Any malicious write below the UEFI layer is cleared on the next power cycle.
- Minimal attack surface: no package manager, no shared library loader, no writable OS partition at runtime.
- Atomic OTA: the update process replaces the initramfs image atomically; the running system is never partially updated.
- Deterministic builds: the ISO is produced by a reproducible multi-stage Podman build.

## 4. Relevance to Sovereign Tech Fund Criteria

### 4.1 Public Interest and Digital Sovereignty

Dependence on centralised, vendor-controlled infrastructure is one of the main sovereignty risks for European institutions and organisations. LosOS addresses this directly: it is a fully open, self-hostable OS layer that removes reliance on commercial cloud providers, proprietary management planes, or subscription-gated update infrastructure.

The stateless design is particularly valuable for edge computing — a growing deployment model for healthcare IoT, industrial automation, smart city infrastructure, and research networks, all sectors identified by the Sovereign Tech Agency as high-priority. Nodes that reboot clean are inherently easier to audit, certify, and replace.

### 4.2 Vulnerability of the Project

LosOS is currently maintained by a single unpaid developer with no institutional backing, no sponsorship, and no team. The project exists because the problem it solves is real and the maintainer has the skills to address it — but its continuity is entirely dependent on volunteer time. This is the definition of a vulnerable open source project.

Without sustained funding, the following work cannot happen on any predictable timeline:

- ARM64 and RISC-V architecture support (critical for edge hardware diversity).
- Hardening the cluster orchestration layer for production use.
- Completing the pakman package manager (Docker image build + data drive persistence).
- Writing security documentation, threat model, and operator guides.
- Building a public test infrastructure so external contributors can verify changes.

### 4.3 Prevalence and Relevance

LosOS is early-stage, not yet widely deployed. However, the technology category it represents — stateless, immutable, RAM-resident OS images — is a recognised direction in enterprise infrastructure (Talos Linux, Flatcar, CoreOS, NixOS). LosOS occupies a unique niche within that category: it targets resource-constrained single-operator deployments with a dramatically lower complexity footprint than any existing solution.

The Sovereign Tech Fund has historically funded foundational infrastructure that is underinvested relative to its long-term impact. LosOS is at the stage where modest, focused funding can determine whether it becomes a credible open alternative for European edge deployments or remains a personal experiment.

### 4.4 Expertise

The maintainer has designed and implemented all core components from scratch in Rust: a working init system, a DHCP client, a cluster orchestration layer, an OTA updater, an ISO build pipeline, and a QEMU-based integration test framework. The project boots, forms clusters, and updates itself over the network. An internship at ESET (a major European cybersecurity company) provided direct exposure to production security engineering practices.

Technical writing is documented on a public blog with approximately 10,000 readers, demonstrating the ability to communicate technical concepts to a broader audience.

## 5. Proposed Work and Milestones

The following work plan covers 12 months. Priorities are ordered by impact on stability, security, and adoption.

### Milestone 1 — Security Hardening and Documentation (Months 1–3)

- Write a formal threat model covering the stateless boot chain, OTA update path, and cluster communication.
- Conduct a self-audit of all Rust components and address findings (unsafe blocks, error handling, network input validation in cluman and dhcman).
- Publish operator documentation: deployment guide, update lifecycle, data drive layout, recovery procedures.
- Add fuzzing targets for the DHCP and HTTP API parsers.

### Milestone 2 — ARM64 Architecture Port (Months 3–6)

- Port the build system and all util-mdl components to aarch64-unknown-linux-musl.
- Validate on Raspberry Pi 4/5 and at least one ARM server platform (Ampere or similar).
- Extend testman to run QEMU aarch64 integration tests in CI.
- Update isoman to produce universal ISOs or architecture-specific images as appropriate.

### Milestone 3 — pakman Package Manager (Months 5–9)

- Complete pakman to production quality: build Docker images and persist them to the data drive so workloads survive reboots without re-pulling from a registry.
- Define a package manifest format and publish a reference set of pre-built images.
- Integrate pakman into the standard boot flow and document the package lifecycle.

### Milestone 4 — Cluster Orchestration Hardening (Months 7–10)

- Add mTLS to all cluman cluster communications.
- Implement node health monitoring and automatic task reassignment on node failure.
- Write a formal API specification and integration test suite for the cluster layer.
- Publish a multi-node deployment reference architecture.

### Milestone 5 — Community Infrastructure and Outreach (Months 10–12)

- Set up a public CI/CD pipeline with automated integration test results visible to contributors.
- Write a contributor guide and establish a public issue tracker process.
- Publish a technical blog post series covering the architecture, security model, and deployment patterns.
- Submit LosOS to at least two open source security review programmes (e.g., OpenSSF, OSTIF).

## 6. Budget

Total requested: €50,000 over 12 months.

| **Item** | **Amount (€)** | **% of Total** |
| --- | --- | --- |
| Maintainer time (12 months part-time, ~20 hrs/week) | 36,000 | 72% |
| ARM64 development hardware (Raspberry Pi 5 × 2, ARM server) | 1,200 | 2.4% |
| GitLab CI compute minutes — integration tests in QEMU (12 months) | 2,400 | 4.8% |
| External security review / audit (partial) | 6,000 | 12% |
| Conference travel and community outreach | 2,000 | 4% |
| Miscellaneous (software licenses, tooling) | 1,000 | 2% |
| Contingency (5%) | 2,000 | 4% |
| **TOTAL** | **50,000** | **100%** |

Maintainer time is priced conservatively at approximately €150/day (half-day average). This is below market rate for senior Rust systems engineering in Central Europe, reflecting the open source nature of the work.

## 7. Open Source Status

All LosOS source code is publicly hosted at https://gitlab.com/mtos-v2. The project is licensed under an OSI-approved open source license. There are no proprietary components, no contributor license agreements that restrict downstream use, and no dual-licensing scheme.

AI assistance (Claude Sonnet) is used for documentation, test generation, and refactoring suggestions. All AI-generated content is reviewed and committed by the human maintainer. This is documented in the project's ai.md file.

## 8. Sustainability Beyond the Grant Period

The STF grant would fund the critical maturation phase: bringing LosOS from a working prototype to a documented, audited, multi-architecture project that can attract contributors and early adopters. Post-grant sustainability is planned through:

- GitHub Sponsors and Ko-fi for one-time community support (no subscription model).
- Value-added services: custom ISO build pipelines, deployment consulting for small organisations.
- A follow-on NLnet Foundation grant application (NGI Zero Core) targeting the security audit and formal verification work.
- Community growth: as the user base grows, maintenance burden distributes naturally.

The project explicitly avoids subscription-based or vendor lock-in monetisation, consistent with the open source ethos and the Sovereign Tech Fund's goals.

## 9. Conclusion

LosOS solves a real infrastructure problem — node drift, malware persistence, and operational complexity at the edge — using an architectural approach that is straightforward, auditable, and inherently aligned with digital sovereignty goals. It is built in the right language (Rust), targets the right deployment tier (edge, homelab, small organisations), and is developed openly with no proprietary dependencies.

The project needs sustained funding to move from a technically complete prototype to a production-ready tool that European institutions and independent operators can rely on. The Sovereign Tech Fund is the right partner for this stage.
