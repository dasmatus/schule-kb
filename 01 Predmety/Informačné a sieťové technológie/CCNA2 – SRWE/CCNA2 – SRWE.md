---
title: "CCNA2 – SRWE"
predmet: "Informačné a sieťové technológie"
typ: "rozcestník"
kurz: "CCNA: Switching, Routing, and Wireless Essentials"
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [rozcestník, ist, siete, ccna, srwe]
---

# 🔀 CCNA2 – Switching, Routing, and Wireless Essentials

> [!abstract] Čo tu je
> Zhustené poznámky z kurzu na NetAcad (*CCNA2_opakovanie_IV_IST*), moduly 1–16, vlastnými slovami. Otázky z kvízov a checkpoint examov tu zámerne nie sú. Späť na [[Informačné a sieťové technológie]].

## Moduly

| # | Modul | Checkpoint exam |
| --- | --- | --- |
| 1 | [[M01 – Basic Device Configuration]] | |
| 2 | [[M02 – Switching Concepts]] | |
| 3 | [[M03 – VLANs]] | |
| 4 | [[M04 – Inter-VLAN Routing]] | **Switching Concepts, VLANs, and Inter-VLAN Routing** (M1–4) |
| 5 | [[M05 – STP Concepts]] | |
| 6 | [[M06 – EtherChannel]] | **Redundant Networks** (M5–6) |
| 7 | [[M07 – DHCPv4]] | |
| 8 | [[M08 – SLAAC and DHCPv6]] | |
| 9 | [[M09 – FHRP Concepts]] | **Available and Reliable Networks** (M7–9) |
| 10 | [[M10 – LAN Security Concepts]] | |
| 11 | [[M11 – Switch Security Configuration]] | |
| 12 | [[M12 – WLAN Concepts]] | |
| 13 | [[M13 – WLAN Configuration]] | **L2 Security and WLANs** (M10–13) |
| 14 | [[M14 – Routing Concepts]] | |
| 15 | [[M15 – IP Static Routing]] | |
| 16 | [[M16 – Troubleshoot Static and Default Routes]] | **Routing Concepts and Configuration** (M14–16) |

## Prepojenie na maturitu (TČOZ)

| Téma | Moduly |
| --- | --- |
| [[T07 – Kybernetická bezpečnosť]] | [[M10 – LAN Security Concepts\|M10]], [[M11 – Switch Security Configuration\|M11]], [[M12 – WLAN Concepts\|M12]] |
| [[T08 – IP protokoly]] | [[M08 – SLAAC and DHCPv6\|M08]] |
| [[T09 – Siete LAN, WAN, VLAN]] | [[M03 – VLANs\|M03]], [[M12 – WLAN Concepts\|M12]] |
| [[T11 – Smerovanie a smerovacie protokoly]] | [[M09 – FHRP Concepts\|M09]], [[M14 – Routing Concepts\|M14]], [[M15 – IP Static Routing\|M15]], [[M16 – Troubleshoot Static and Default Routes\|M16]] |
| [[T12 – Diagnostika sietí]] | [[M01 – Basic Device Configuration\|M01]], [[M13 – WLAN Configuration\|M13]], [[M16 – Troubleshoot Static and Default Routes\|M16]] |
| [[T13 – Komunikácia na vrstve L2]] | [[M02 – Switching Concepts\|M02]], [[M03 – VLANs\|M03]], [[M05 – STP Concepts\|M05]] |
| [[T14 – Architektúra počítača a operačné systémy]] | [[M08 – SLAAC and DHCPv6\|M08]] (druhy adries IPv6) |
| [[T15 – Virtuálne siete VLAN]] | [[M03 – VLANs\|M03]], [[M04 – Inter-VLAN Routing\|M04]] |
| [[T16 – Protokol DHCP]] | [[M07 – DHCPv4\|M07]] |
| [[T18 – Algoritmy, vývojové diagramy a VLSM]] | [[M05 – STP Concepts\|M05]], [[M06 – EtherChannel\|M06]] (redundancia na L2, EtherChannel) |
| [[T19 – Vstupno-výstupné operácie a výpočty]] | [[M08 – SLAAC and DHCPv6\|M08]] (DHCPv6) |
| [[T20 – Riadiace príkazy]] | [[M04 – Inter-VLAN Routing\|M04]] (MLS) |
| [[T21 – Jednoduché a zložené údajové typy]] | [[M01 – Basic Device Configuration\|M01]], [[M15 – IP Static Routing\|M15]] (DualStack) |
| [[T22 – Funkcie a metódy]] | [[M14 – Routing Concepts\|M14]] (OSPF – len prehľad) |
| [[T24 – Objektovo orientované programovanie]] | [[M01 – Basic Device Configuration\|M01]] (základná konfigurácia zariadení) |

## Ťahák – čísla, ktoré sa stále opakujú

| Čo | Hodnota |
| --- | --- |
| Runt / giant | < 64 B / > 1518 B |
| Late collision | po 512 bitoch |
| Telnet / SSH | TCP 23 / 22 |
| MAC aging | 5 min |
| VLAN ID | 12 bitov; normal 1–1005, extended 1006–4094 |
| 802.1Q TPID | 0x8100, tag 4 B |
| STP priorita | 32768 (+VLAN), krok 4096 |
| STP cost 10G / 1G / 100M / 10M | 2 / 4 / 19 / 100 |
| STP hello / forward delay / max age | 2 / 15 / 20 s |
| DHCPv4 server / klient | UDP 67 / 68 |
| DHCPv6 server / klient počúva | UDP 547 / 546 |
| RA interval | 200 s |
| HSRP predvolená priorita | 100 |
| 2,4 GHz neprekrývajúce sa kanály | 1, 6, 11 |
| CAPWAP riadenie / dáta | UDP 5246 / 5247 |
| AD connected / static / EIGRP / OSPF / RIP | 0 / 1 / 90 / 110 / 120 |

## Ako vznikli
Text kurzu sa stiahol skriptom `tools/netacad/netacad-grab.js` (spúšťa sa v konzole prehliadača na stránke kurzu) a prevádza sa cez `netacad-to-md.py`. Surový text je Cisco a zostáva lokálne (`raw/` je v `.gitignore`); do trezoru idú len tieto vlastné poznámky.
