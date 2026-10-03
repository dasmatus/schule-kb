---
title: "ENSA 07 – Koncepty WAN"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 7
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 7: WAN Concepts"
tags:
  - ist
  - siete
  - ccna3
  - wan
---

# ENSA 07 – Koncepty WAN

> [!abstract] Ciele modulu
> Účel WAN · fungovanie WAN (štandardy, zariadenia, terminológia) · tradičné, moderné a internetové WAN pripojenia.
> Priamo k maturitnej téme [[T09 – Siete LAN, WAN, VLAN]].

## 1. LAN vs. WAN

| LAN | WAN |
| --- | --- |
| malá geografická oblasť (domov, kancelária, budova, kampus) | veľké oblasti (mestá, štáty, kontinenty) |
| prepája lokálne počítače a periférie | prepája vzdialených používateľov, siete a pobočky |
| vlastní a spravuje organizácia / domácnosť | vlastnia a spravujú **poskytovatelia** (ISP, telekomunikácie, káblovky, satelit) |
| žiadny poplatok za používanie | služby sú **platené** |
| vysoké rýchlosti (Ethernet, Wi-Fi) | nízke až vysoké rýchlosti na veľké vzdialenosti |

- **Súkromná WAN** – vyhradená pre jedného zákazníka (leased line, Ethernet WAN, MPLS). **Verejná WAN** – cez internet (broadband + VPN).
- Medzistupne: **CAN** (campus – viac LAN v obmedzenom areáli), **MAN** (metropolitná, väčšia než LAN, menšia než WAN).

### WAN topológie (logické)

- **Point-to-point** – priama linka medzi dvoma miestami.
- **Hub-and-spoke** – centrála (hub) prepojená s pobočkami (spoke); pobočky medzi sebou cez hub. *Centrála + pobočky, ktoré nepotrebujú priame spojenie.*
- **Dual-homed** – pobočka má dve linky (redundancia).
- **Fully meshed** – každý s každým → **najodolnejšia voči výpadkom**, najdrahšia.
- **Partially meshed** – kompromis.
- **Single-carrier** vs. **dual-carrier** pripojenie – dual-carrier (dvaja poskytovatelia, dve SLA) = **redundancia**.

## 2. Ako WAN funguje

- Štandardy: **TIA/EIA, ISO, IEEE**. WAN technológie pracujú hlavne na **L1 (fyzická)** a **L2 (linková)** vrstve OSI.
  - L1 optické: **SDH, SONET, DWDM**.
  - L2: broadband, wireless, **Ethernet WAN, MPLS, PPP, HDLC** (staršie Frame Relay, ATM).

### WAN terminológia

| Pojem | Význam |
| --- | --- |
| **DTE** | zariadenie zákazníka, ktoré pripája LAN k WAN (zvyčajne router) |
| **DCE** | zariadenie na komunikáciu s poskytovateľom (modem, CSU/DSU); dodáva clock |
| **CPE** | zariadenia na strane zákazníka (DTE + DCE) – vlastnené alebo prenajaté |
| **POP** (Point of Presence) | miesto, kde sa zákazník pripája do siete poskytovateľa |
| **Demarcation point** | fyzická hranica zodpovednosti zákazník ↔ poskytovateľ |
| **Local loop (last mile)** | meď/optika z CPE do CO poskytovateľa |
| **CO** (Central Office) | lokálna budova poskytovateľa |
| **Toll network** | vnútorná sieť poskytovateľa (linky, switche, routery) |
| **Backhaul / Backbone** | spája prístupové uzly / veľkokapacitná chrbtica (Tier-1) |

Cesta dát: **DTE → DCE → WAN oblak → DCE → DTE**.

### WAN zariadenia

voiceband (dial-up) modem · **DSL modem** (telefónna linka) a **káblový modem** (koax) = broadband modemy · **CSU/DSU** (digitálne prenajaté linky) · **optický prevodník** · bezdrôtový router/AP (aj mobilná sieť) · WAN core zariadenia (výkonné routery, L3 switche).

### Sériová vs. paralelná komunikácia

- **Sériová** – bity za sebou po jednom kanáli → **všetky WAN spojenia sú sériové**.
- Paralelná – viac bitov naraz po viacerých vodičoch (problém: clock skew, presluchy).

### Prepájanie okruhov vs. paketov

- **Circuit-switched** – pred komunikáciou sa vytvorí vyhradený okruh, všetko ide rovnakou cestou: **PSTN, ISDN**.
- **Packet-switched** – dáta v paketoch cez zdieľanú sieť: **Ethernet WAN, MPLS** (staršie **Frame Relay, ATM**).

### SDH/SONET a DWDM

- **SDH/SONET** – prenos dát, hlasu, videa po optike na veľké vzdialenosti, **kruhová (ring) topológia** s redundanciou.
- **DWDM** – viac dátových tokov naraz na **rôznych vlnových dĺžkach** svetla v jednom vlákne → násobí kapacitu.

## 3. Tradičné WAN pripojenia

- **Leased lines (prenajaté linky)** – vyhradený point-to-point okruh, **T1/E1, T3/E3** (T-Carrier, E-Carrier).
  - ➕ jednoduchosť, kvalita (bez jitteru), stála dostupnosť.
  - ➖ **cena** (najdrahšie), **malá flexibilita** (pevná kapacita).
- **Circuit-switched:** **PSTN** (dial-up cez analógovú linku), **ISDN** (digitálny signál po PSTN – BRI, PRI).
- **Packet-switched:** **Frame Relay** (L2, NBMA, PVC), **ATM** (bunky s pevnou veľkosťou 53 B – hlas, video, dáta).

## 4. Moderné WAN pripojenia

- **Ethernet WAN (Metro Ethernet, MetroE, EoMPLS, VPLS)** – Ethernet po optike na veľké vzdialenosti; lacnejší, ľahká integrácia so sieťou, vyššia produktivita.
- **MPLS (Multiprotocol Label Switching)** – smerovanie podľa **štítkov (labels)** namiesto IP adries; podporuje rôzne prístupové metódy a protokoly (IPv4, IPv6, Ethernet…). Routery: CE (customer edge), PE (provider edge), P (provider).

## 5. Internetové (broadband) pripojenia

**Drôtové:**

- **DSL** – po krútenej dvojlinke telefónu; **ADSL** (asymetrická) / **SDSL** (symetrická); modem → **DSLAM** u poskytovateľa; nie je zdieľané médium; ISP používajú **PPP / PPPoE**.
- **Kábel** – koaxiál káblovej TV, sieť **HFC (hybrid fiber-coaxial)**, štandard DOCSIS; zdieľané médium.
- **Optika – FTTx**: **FTTH** (domov), **FTTB** (budova), **FTTN** (uzol/node).

**Bezdrôtové:**

- **Municipal Wi-Fi**, **mobilné siete 3G/4G/5G** (LTE), **satelit** (tam, kde nič iné nie je; latencia), **WiMAX**.

**VPN** cez internet – šifrované tunely: **site-to-site** a **remote access** (viac v [[ENSA 08 – VPN a IPsec]]).

**Pripojenie k ISP:** single-homed (1 linka), **dual-homed** (2 linky, 1 ISP), **multihomed** (viac ISP), **dual-multihomed** (2 linky ku každému z viacerých ISP – najvyššia redundancia).

## Krátka ústna odpoveď

WAN prepája siete na veľkých vzdialenostiach a jej linky vlastnia poskytovatelia, ktorým sa platí; pracuje hlavne na fyzickej a linkovej vrstve a komunikuje sériovo. Medzi pojmy patrí DTE, DCE, CPE, demarkačný bod, local loop a CO. Topológie: point-to-point, hub-and-spoke, dual-homed, full a partial mesh. Tradične sa používali prenajaté linky T1/E1, okruhovo prepájané PSTN a ISDN a paketovo prepájané Frame Relay a ATM; dnes Ethernet WAN, MPLS a internetové pripojenia DSL, kábel, optika FTTx, mobilné 4G/5G a satelit, zabezpečené cez VPN.

## Kvíz – kľúčové otázky z kurzu

- WAN → **veľké geografické oblasti, platené služby**, siete vlastnia **poskytovatelia**; vrstvy OSI → **fyzická a linková**.
- Najodolnejšia topológia → **full mesh**; centrála + 4 pobočky bez priamych spojení → **hub-and-spoke**; redundancia u dvoch poskytovateľov → **dual-carrier**.
- Miesto pripojenia zákazníka do siete poskytovateľa → **POP**.
- Komunikácia vo všetkých WAN → **sériová**.
- Circuit-switched → **PSTN, ISDN**; packet-switched → **Ethernet WAN, Frame Relay (ATM, MPLS)**.
- Viac vlnových dĺžok v optike → **DWDM**; médium pre SONET/SDH/DWDM → **optika**.
- T-Carrier/E-Carrier → **leased lines**; WAN na báze Ethernetu → **Metro Ethernet**; štítky → **MPLS**.
- Pobočka cez verejnú infraštruktúru → **VPN**; malá firma (10 ľudí) → **broadband (DSL)**.
- Internet v medzimestských autobusoch → **verejná infraštruktúra + mobilná sieť**.

Predchádzajúci: [[ENSA 06 – NAT pre IPv4]] · Ďalej: [[ENSA 08 – VPN a IPsec]] · Späť: [[CCNA3 – ENSA]]
