---
title: "ENSA 04 – Koncepty ACL"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 4
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 4: ACL Concepts"
tags:
  - ist
  - siete
  - ccna3
  - acl
  - bezpečnosť
---

# ENSA 04 – Koncepty ACL (Access Control Lists)

> [!abstract] Ciele modulu
> Ako ACL filtrujú prevádzku · wildcard masky · zásady tvorby ACL · štandardné vs. rozšírené ACL a ich umiestnenie.
> Konfigurácia je v [[ENSA 05 – Konfigurácia IPv4 ACL]].

## 1. Čo je ACL

- **ACL** = sekvenčný zoznam príkazov **permit / deny**, ktoré filtrujú pakety podľa informácií v hlavičke (L3, L4).
- Jednotlivé riadky = **ACE (Access Control Entries)**.
- Router **defaultne nemá žiadne ACL**. Po aplikovaní na rozhranie router kontroluje každý paket, ktorý ním prechádza.
- Na čo sa ACL používajú: obmedzenie prevádzky (napr. video), riadenie toku (routing updates len od známych zdrojov), základná bezpečnosť (prístup do HR siete), filtrovanie podľa typu (povoliť e-mail, zakázať Telnet), prístup k službám (FTP/HTTP), **identifikácia prevádzky pre QoS a NAT**.

### Filtrovanie paketov

- **Štandardná ACL** – filtruje **len na L3**, iba podľa **zdrojovej IPv4 adresy**.
- **Rozšírená ACL** – filtruje na **L3 aj L4**: zdrojová a cieľová IP, protokol (IP, TCP, UDP, ICMP), zdrojové/cieľové porty TCP/UDP.

### Inbound vs. outbound

- **Inbound ACL** – filtruje pakety **predtým**, než sa smerujú → šetrí vyhľadávanie v routovacej tabuľke, ak sa paket zahodí.
- **Outbound ACL** – filtruje **po** smerovaní, bez ohľadu na vstupné rozhranie.

### Postup spracovania ACL

1. Router vyberie zdrojovú IP (pri rozšírenej aj ďalšie polia).
2. Porovnáva ACE **zhora nadol**, postupne.
3. Pri **prvej zhode** vykoná permit/deny a **ďalšie ACE už neskúma**.
4. Ak nič nesedí → **implicitné `deny any`** na konci každej ACL → paket sa zahodí.

> [!warning] Implicit deny
> ACL bez jediného `permit` zablokuje **všetku** prevádzku. Najšpecifickejšie pravidlá patria **navrch**.

## 2. Wildcard masky

- 32-bitová maska: **0 = bit musí sedieť**, **1 = bit ignoruj** (opak podsieťovej masky).
- Výpočet: **255.255.255.255 − maska podsiete**.

| Wildcard | Význam |
| --- | --- |
| `0.0.0.0` | presne jeden host → kľúčové slovo **`host`** |
| `0.0.0.255` | celá /24 sieť |
| `0.0.255.255` | celá /16 sieť |
| `0.0.0.3` | /30 (point-to-point linka) |
| `0.0.0.15` | /28 |
| `0.0.0.63` | /26 |
| `255.255.255.255` | všetky adresy → kľúčové slovo **`any`** |

- Rozsah: `192.168.16.0 0.0.3.255` pokryje 192.168.16.0 – 192.168.19.255.
- `10.120.160.0 0.0.7.255` → **10.120.160.0 až 10.120.167.255**.
- `172.16.0.0 0.0.15.255` → 172.16.0.0 – 172.16.15.255.

## 3. Zásady tvorby ACL

- Limit na rozhraní: **1 ACL na protokol, na smer** → na dual-stack rozhraní max. **4 ACL** (IPv4 in, IPv4 out, IPv6 in, IPv6 out).
- Best practices:
  - vychádzaj z **bezpečnostnej politiky organizácie**,
  - **napíš si vopred**, čo má ACL robiť,
  - píš a uchovávaj ACL v **textovom editore**,
  - dokumentuj príkazom **`remark`**,
  - **otestuj** na vývojovej sieti pred nasadením.

## 4. Typy IPv4 ACL

| | Štandardná | Rozšírená |
| --- | --- | --- |
| Filtruje podľa | zdrojovej IP | zdroj, cieľ, protokol, porty |
| Číslovanie | **1 – 99, 1300 – 1999** | **100 – 199, 2000 – 2699** |
| Umiestnenie | **čo najbližšie k cieľu** | **čo najbližšie k zdroju** |

- **Pomenované (named) ACL** – preferovaný spôsob; môžu byť štandardné aj rozšírené. Názov: alfanumerický, bez medzier a interpunkcie, odporúča sa VEĽKÝMI PÍSMENAMI; ACE sa dajú pridávať a mazať.
- **Prečo štandardná pri cieli?** Filtruje len podľa zdroja – keby bola pri zdroji, zablokovala by prevádzku do všetkých cieľov.
- **Prečo rozšírená pri zdroji?** Nežiaduca prevádzka sa zahodí skôr, než zaťaží sieť.
- Faktory umiestnenia: rozsah kontroly organizácie (spravuje zdroj aj cieľ?), šírka pásma, jednoduchosť konfigurácie.

## Krátka ústna odpoveď

ACL je sekvenčný zoznam permit/deny pravidiel (ACE), ktorý router porovnáva zhora nadol; pri prvej zhode vykoná akciu a na konci platí implicitné deny any. Štandardné ACL (1–99, 1300–1999) filtrujú len podľa zdrojovej IP a dávajú sa blízko cieľa; rozšírené (100–199, 2000–2699) filtrujú podľa zdroja, cieľa, protokolu a portov a dávajú sa blízko zdroja. Wildcard maska určuje, ktoré bity sa porovnávajú (0 = zhoda, 1 = ignoruj); skratky sú host a any. Na rozhranie sa dá aplikovať jedna ACL na protokol a smer (in/out).

## Kvíz – kľúčové otázky z kurzu

- Permit/deny riadky v ACL → **ACE**.
- Štandardné ACL filtrujú → **len na L3**; filtrovanie podľa TCP portu → **rozšírená ACL**.
- Pomenované ACL → **môžu byť štandardné aj rozšírené**.
- Koľko ACL na rozhraní (IPv4 + IPv6) → **4**.
- Best practice → **napísať ACL pred konfiguráciou na routeri**.
- Wildcard len pre host 10.10.10.1 → **0.0.0.0**; sieť 10.10.0.0/16 → **0.0.255.255**; všetko → **255.255.255.255**.
- `access-list 1 permit 172.16.0.0 0.0.15.255` zachytí → **172.16.0.255, 172.16.15.36**.
- Kedy router zahodí paket → **zdroj nesedí s permit v inbound štandardnej ACL**; **neexistuje trasa do cieľa** (aj keď ACL povolí).
- Outbound prevádzka = **tá, ktorá opúšťa router smerom k cieľu**.
- Dokumentácia ACE → **`remark`**.
- ACL omylom aplikovaná `in` namiesto `out` → **nebude fungovať podľa návrhu**.

Predchádzajúci: [[ENSA 03 – Koncepty sieťovej bezpečnosti]] · Ďalej: [[ENSA 05 – Konfigurácia IPv4 ACL]] · Späť: [[CCNA3 – ENSA]]
