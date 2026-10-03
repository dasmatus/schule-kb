---
title: "ENSA 13 – Virtualizácia sietí"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 13
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 13: Network Virtualization"
tags:
  - ist
  - siete
  - ccna3
  - cloud
  - virtualizácia
  - sdn
---

# ENSA 13 – Virtualizácia sietí (Network Virtualization)

> [!abstract] Ciele modulu
> Cloud computing · virtualizácia · virtuálna sieťová infraštruktúra · SDN · kontroléry.
> Súvisí s [[T14 – Architektúra počítača a operačné systémy]] (OS, hardvér) a [[T04 – Internet vecí]].

## 1. Cloud computing

- Veľa počítačov prepojených sieťou, fyzicky kdekoľvek; efektívnejšie využitie zdrojov → **nižšie prevádzkové náklady**.
- Výhody: prístup k dátam **kdekoľvek a kedykoľvek**, platíš len za potrebné služby, menej vlastného IT vybavenia a údržby, nižšie náklady (energia, priestory, školenia), rýchla reakcia na rast dát.

### Modely služieb (NIST)

| Model | Poskytovateľ dáva | Príklad |
| --- | --- | --- |
| **SaaS** (Software as a Service) | hotové aplikácie cez internet | e-mail, Office 365, **mzdový systém v cloude** |
| **PaaS** (Platform as a Service) | **vývojové nástroje a služby** na tvorbu a doručenie aplikácií | spoločný vývoj webových aplikácií |
| **IaaS** (Infrastructure as a Service) | **sieťové vybavenie, virtualizované služby, infraštruktúru** | firma bez vlastných serverov, kupuje na požiadanie |

### Typy cloudov

- **Public** – pre širokú verejnosť (zadarmo alebo pay-per-use).
- **Private** – pre jednu organizáciu (napr. štát) – viacero interných IT služieb.
- **Hybrid** – dva alebo viac cloudov (napr. časť private, časť public), každý samostatný, ale spojené **jednou architektúrou**.
- **Community** – pre konkrétnu komunitu/odvetvie (zdravotníctvo, médiá).

## 2. Virtualizácia

- Cloud ≠ virtualizácia; **virtualizácia je základ cloudu**. **Oddeľuje OS od hardvéru.**
- Problémy dedikovaných serverov: celé RAM/CPU/disk pre jednu službu, **single point of failure**, servery často nečinné → **server sprawl** (plytvanie energiou a priestorom).
- Výhody virtualizácie: **menej zariadení**, menej energie a priestoru, ľahšie prototypovanie, **rýchlejšie nasadenie (provisioning)**, **vyšší uptime**, lepšie zotavenie po havárii, podpora starších systémov (legacy).
- Abstrakčné vrstvy počítača: **služby (services), OS, firmvér, hardvér**.
- **Hypervisor** – program/firmvér/hardvér, ktorý pridá abstrakčnú vrstvu nad fyzický hardvér a vytvára **VM**.

| Typ 1 – „bare metal“ | Typ 2 – „hosted“ |
| --- | --- |
| priamo na hardvéri | **nad existujúcim OS** |
| priamy prístup k HW → efektívnejší, škálovateľný, robustný | jednoduchý na domáce/testovacie použitie |
| potrebuje **management konzolu** (konsolidácia serverov, zapínanie/vypínanie, obnova po poruche, niektoré aj over-allocation) | VMware Workstation, VirtualBox |
| VMware ESXi, Hyper-V, KVM, Xen | |

## 3. Virtuálna sieťová infraštruktúra

- Virtualizácia skrýva fyzické servery, čo komplikuje tradičnú sieť (VLAN, QoS…).
- **East-West prevádzka** – medzi **virtuálnymi servermi v tom istom dátovom centre** (veľa, mení sa v čase).
- **North-South prevádzka** – medzi distribučnou a core vrstvou, smerom **von** (iné DC, cloud, internet).

## 4. SDN – Software-Defined Networking

### Roviny sieťového zariadenia

| Rovina | Úloha |
| --- | --- |
| **Control plane** („mozog“) | rozhodovanie o forwardingu: **routing protokoly, susedia, topológia, routovacie tabuľky, STP, ARP**; spracúva **CPU** |
| **Data plane** (forwarding plane) | **samotné preposielanie** prevádzky; **switch fabric**, špeciálny procesor (ASIC) bez CPU |
| **Management plane** | správa zariadenia – **SSH, TFTP, SFTP, HTTPS, SNMP** (sem sa admin pripája pri konfigurácii) |

- **CEF (Cisco Express Forwarding)** – forwarding v data plane bez pýtania sa control plane (FIB + adjacency table).
- **SDN = oddelenie control plane od data plane**; control plane sa presúva do **centrálneho SDN kontroléra**.
- Architektúry: **SDN** (OpenFlow, OpenStack) a **Cisco ACI**.
- **OpenFlow** – základný protokol SDN medzi kontrolérom a zariadeniami.
- API:
  - **Northbound API** – kontrolér ↔ **aplikácie** (zhora),
  - **Southbound API** – kontrolér ↔ **zariadenia** (definuje správanie data plane; napr. OpenFlow).

## 5. Kontroléry

- **SDN kontrolér** – logická entita, ktorá riadi, ako má data plane spracovať prevádzku. **Každý tok musí najprv schváliť kontrolér**, ten vypočíta cestu a zapíše záznamy do switchov.
- Tabuľky v switchoch:
  - **Flow table** – priradí paket k toku a určí akcie,
  - **Group table** – akcie pre jeden či viac tokov,
  - **Meter table** – výkonové akcie, napr. **obmedzenie rýchlosti (rate-limit)**.
- **Cisco ACI** – hardvérové riešenie pre dátové centrá; komponenty: **ANP** (Application Network Profile), **APIC** (Application Policy Infrastructure Controller), **Nexus 9000** switche; topológia **spine-leaf**. APIC nemení dátovú cestu priamo, centralizuje **politiky**.
- Typy SDN:
  - **Device-based** – zariadenia programujú aplikácie bežiace na nich alebo na serveri,
  - **Controller-based** – centrálny kontrolér pozná všetky zariadenia,
  - **Policy-based** – ako controller-based + **vrstva politík**, GUI, bez programovania (**Cisco APIC-EM**, nástroj **Path Trace** na analýzu ACL po ceste).

## Krátka ústna odpoveď

Cloud computing poskytuje zdroje cez sieť v modeloch SaaS (aplikácie), PaaS (vývojová platforma) a IaaS (infraštruktúra) a nasadzuje sa ako public, private, hybrid alebo community cloud. Jeho základom je virtualizácia, ktorá oddeľuje OS od hardvéru pomocou hypervisora – typ 1 beží priamo na hardvéri, typ 2 nad OS. Šetrí to hardvér, energiu a zvyšuje dostupnosť. V dátových centrách prevláda East-West prevádzka medzi VM. SDN oddeľuje control plane (rozhodovanie) od data plane (preposielanie) a riadenie presúva do centrálneho kontroléra komunikujúceho cez southbound API (OpenFlow) so zariadeniami a cez northbound API s aplikáciami; Cisco riešenia sú ACI a APIC-EM.

## Kvíz – kľúčové otázky z kurzu

- Mzdový systém v cloude → **SaaS**; vývoj aplikácií → **PaaS**; sieť a servery na požiadanie → **IaaS**.
- Dva cloudy spojené jednou architektúrou → **hybrid**; pre odvetvie → **community**; interné IT služby → **private**.
- Oddelenie OS od hardvéru → **virtualizácia**; vrstva nad hardvérom → **hypervisor**; nad existujúcim OS → **typ 2**.
- Výhody virtualizácie → **menej zariadení, rýchlejšie nasadenie, vyšší uptime**.
- Abstrakčné vrstvy → **hardvér, firmvér, (OS), služby**.
- Typ 1 potrebuje → **management konzolu**.
- Prevádzka medzi VM v DC → **East-West**.
- Control plane → **CPU, rozhoduje o forwardingu, tabuľky susedov a topológie**; data plane → **forwarding, špeciálny procesor, switch fabric**.
- Admin konfiguruje cez → **management plane** (nie control plane).
- SDN odstraňuje zo zariadení → **control plane**; základný protokol → **OpenFlow**; požiadavka kontroléra na data plane → **southbound API**.
- Rate-limit → **meter table**; centrálny kontrolér → **controller-based SDN**; GUI bez programovania → **policy-based**.
- Jadro Cisco ACI → **ANP a APIC**.

Predchádzajúci: [[ENSA 12 – Riešenie problémov v sieti]] · Ďalej: [[ENSA 14 – Automatizácia sietí]] · Späť: [[CCNA3 – ENSA]]
