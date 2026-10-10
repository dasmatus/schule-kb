---
title: "CCNA3 – ENSA"
predmet: "Informačné a sieťové technológie"
typ: "rozcestník"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation) v7"
ročník_teraz: "IV.IST"
maturitný: "áno – TČOZ / PČOZ"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27"
tags:
  - rozcestník
  - ist
  - siete
  - ccna3
  - maturita
---

# 🌐 CCNA3 – Enterprise Networking, Security, and Automation

> [!abstract] Čo tu je
> Slovenské poznámky ku všetkým 14 modulom kurzu **CCNA3 ENSA** na Cisco NetAcad (trieda IV.IST, 2026/27). Každý modul má: vysvetlenie, tabuľky, príkazy, **krátku ústnu odpoveď** na maturitu a **kľúčové otázky z kvízov** kurzu (s odpoveďami).
> Termíny sú ponechané po anglicky (OSPF, ACL, NAT…), lebo tak sú aj v kurze, v Packet Traceri a na skúškach.

## Moduly

| # | Modul | Checkpoint exam |
| --- | --- | --- |
| 1 | [[ENSA 01 – Koncepty OSPFv2]] | OSPF Concepts and Configuration |
| 2 | [[ENSA 02 – Konfigurácia OSPFv2]] | ↑ |
| 3 | [[ENSA 03 – Koncepty sieťovej bezpečnosti]] | Network Security |
| 4 | [[ENSA 04 – Koncepty ACL]] | ↑ |
| 5 | [[ENSA 05 – Konfigurácia IPv4 ACL]] | ↑ |
| 6 | [[ENSA 06 – NAT pre IPv4]] | WAN Concepts |
| 7 | [[ENSA 07 – Koncepty WAN]] | ↑ |
| 8 | [[ENSA 08 – VPN a IPsec]] | ↑ |
| 9 | [[ENSA 09 – Koncepty QoS]] | Optimize, Monitor, and Troubleshoot Networks |
| 10 | [[ENSA 10 – Správa siete]] | ↑ |
| 11 | [[ENSA 11 – Návrh siete]] | ↑ |
| 12 | [[ENSA 12 – Riešenie problémov v sieti]] | ↑ |
| 13 | [[ENSA 13 – Virtualizácia sietí]] | Emerging Network Technologies |
| 14 | [[ENSA 14 – Automatizácia sietí]] | ↑ |

📋 Všetky príkazy a čísla na jednom mieste: [[ENSA – Ťahák príkazov]]

Na konci kurzu: *ENSA Practice Final Exam*, *ENSA Practice Packet Tracer Assessment*, **ENSA Final Exam**, **ENSA Final Packet Tracer Assessment** a *CCNA 200-301 Certification Practice Exam*.

## Prepojenie s maturitou (TČOZ)

| Maturitná téma | Moduly ENSA |
| --- | --- |
| [[T07 – Kybernetická bezpečnosť]] | 3 (hrozby, malware, útoky, kryptografia), 4–5 (ACL), 8 (VPN, IPsec) |
| [[T08 – IP protokoly]] | 6 (súkromné adresy, NAT, NAT64) |
| [[T09 – Siete LAN, WAN, VLAN]] | 7 (WAN), 8 (VPN), 11 (hierarchický návrh) |
| [[T10 – Hardvér počítačových sietí]] | 7 (WAN zariadenia), 11 (switche a routery) |
| [[T11 – Smerovanie a smerovacie protokoly]] | 1–2 (OSPF), 11 (routery) |
| [[T12 – Diagnostika sietí]] | 10 (CDP, LLDP, syslog, SNMP), 12 (troubleshooting) |
| [[T17 – Robotika a softvérové aplikácie]] | 12 (sieťová dokumentácia) |
| [[T18 – Algoritmy, vývojové diagramy a VLSM]] | 11 (redundancia na L2, EtherChannel), 2 a 4 (wildcard masky) |
| [[T22 – Funkcie a metódy]] | 1–2 (OSPF) |
| [[T24 – Objektovo orientované programovanie]] | 2, 5, 6 (základná konfigurácia zariadení) |
| [[T21 – Jednoduché a zložené údajové typy]] · [[T23 – Súbory – zápis a čítanie]] | 14 (JSON/YAML/XML, API) |

## Ako sa učiť

1. Najprv si prečítaj **„Krátku ústnu odpoveď“** v module – to je jadro na maturitu.
2. Prejdi **kvízové otázky** – sú to otázky z kurzu, podobné prídu na checkpoint a final exame.
3. Konfiguračné moduly (**2, 5, 6, 10**) si vyskúšaj v [[Packet Tracer]] podľa [[ENSA – Ťahák príkazov]] – na PT Assessment sa body strácajú hlavne na:
   - chýbajúcom `ip nat inside/outside`,
   - zlom smere ACL (`in`/`out`) alebo `ip access-group` na VTY (patrí `access-class`),
   - nezhodných Hello/Dead intervaloch, zlej wildcard maske a chýbajúcom `passive-interface`,
   - zabudnutom `copy running-config startup-config`.
4. Najslabšie prebraté moduly podľa progresu v kurze (k 3. 10. 2026): **3 – bezpečnosť (46 %)**, **1 – koncepty OSPF (49 %)**, **14 – automatizácia (57 %)** a **8 – VPN** (bez zaznamenaného progresu) – oplatí sa začať nimi.

## Ďalšie zdroje

- Kurz: Cisco NetAcad – *CCNA3_IV_IST_2026_27: Enterprise Networking, Security, and Automation*
- Vyriešené PKA: odkaz v [[README]]
- Predmet: [[Informačné a sieťové technológie]]
