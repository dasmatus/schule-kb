---
title: "ENSA 11 – Návrh siete"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 11
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 11: Network Design"
tags:
  - ist
  - siete
  - ccna3
  - návrh-siete
  - hardvér
---

# ENSA 11 – Návrh siete (Network Design)

> [!abstract] Ciele modulu
> Hierarchické siete · škálovateľné siete · hardvér switchov · hardvér routerov.
> Súvisí s [[T09 – Siete LAN, WAN, VLAN]], [[T10 – Hardvér počítačových sietí]] a [[T18 – Algoritmy, vývojové diagramy a VLSM]] (redundancia na L2, EtherChannel).

## 1. Hierarchické siete

- Podniková sieť musí: podporovať kritické aplikácie, konvergovanú prevádzku (dáta, hlas, video), rôzne obchodné potreby a centralizovanú správu.
- **Cisco Borderless Network** – jednotný rámec pre drôtový aj bezdrôtový prístup, politiky a správu na hierarchickej, škálovateľnej a odolnej infraštruktúre.
- Princípy návrhu: **hierarchia, modularita, odolnosť (resiliency), flexibilita**.
  - **Resilient** – sieť je vždy dostupná,
  - **Modular** – dá sa rozšíriť a pridávať služby na požiadanie,
  - **Flexible** – využíva všetky zdroje, zdieľanie záťaže.

### Trojvrstvový model

| Vrstva | Úloha |
| --- | --- |
| **Access (prístupová)** | pripojenie koncových zariadení (**network access**), okraj siete, PoE, port security, VLAN |
| **Distribution (distribučná)** | spája access a core; **smerovanie medzi VLAN, QoS, bezpečnosť (ACL)**, agregácia |
| **Core (jadro)** | **vysokorýchlostná chrbtica (backbone)**, izolácia porúch, redundancia, čo najmenej spracovania |

- **Dvojvrstvový model / collapsed core** – distribučná a core vrstva **zlúčené** do jednej (menšie siete).
- Topológia kampusu pri viacerých budovách → **extended star** (rozšírená hviezda).

## 2. Škálovateľné siete

Odporúčania:

- **modulárne, rozšíriteľné** zariadenia alebo stohované/klastrované,
- **hierarchický** návrh (moduly sa dajú pridať/meniť),
- **hierarchická adresácia** IPv4/IPv6 (sumarizácia),
- **routery alebo multilayer switche** na obmedzenie broadcastov,
- **redundantné linky** medzi kritickými zariadeniami (access ↔ distribution ↔ core) – na L2 vyžaduje **STP**,
- **viac liniek naraz** – **EtherChannel** (link aggregation) alebo rovnaké cesty (ECMP) → viac šírky pásma,
- **škálovateľný routing protokol** (OSPF – hierarchia oblastí, rýchla konvergencia),
- **bezdrôtová konektivita** – rozšíri prístupovú vrstvu, mobilita.

- **Failure domain (doména poruchy)** – časť siete zasiahnutá pri výpadku zariadenia/služby. Zmenšuje sa pomocou **switch block** prístupu (bloky budov fungujú nezávisle) a routermi/L3 switchmi.
- **EtherChannel** – zlúči viac fyzických liniek do **jednej logickej** (STP ich neblokuje).

## 3. Hardvér switchov

- Kategórie: **campus LAN**, **cloud-managed** (Meraki), **data center**, **service provider** (agregujú prevádzku na okraji siete poskytovateľa), **virtual networking**.
- Form factor:
  - **fixed configuration** – pevný počet portov,
  - **modular** – šasi s **vymeniteľnými líniovými kartami** (line cards),
  - **stackable** – prepojené špeciálnym káblom, **spravujú sa ako jeden veľký switch**.
- Výška v racku = **rack units (U)**.
- **Port density** – počet portov na jednom switchi.
- **Forwarding rate** – koľko dát switch spracuje za sekundu. *48-portový gigabitový switch pri plnej rýchlosti = 48 Gb/s* (wire speed).
- **PoE** – napájanie po ethernetovom kábli (AP, IP telefóny, kamery). **PoE pass-through** – switch napájaný z nadradeného switcha môže ďalej napájať zariadenia (Catalyst 2960-C).
- **Multilayer (L3) switch** – vie routovaciu tabuľku, routing protokoly, forwarding IP takmer rýchlosťou L2; nasadzuje sa v **core a distribution**.
- Výber switcha: cena, hustota portov, napájanie, spoľahlivosť, rýchlosť portov, **frame buffers**, škálovateľnosť.

## 4. Hardvér routerov

- Router smeruje podľa **sieťovej časti (prefixu)** cieľovej IP, vyberá náhradnú cestu pri výpadku. Rozhranie routera v LAN = **default gateway**.
- Ďalšie funkcie: **obmedzenie broadcastov**, prepojenie vzdialených lokalít, logické zoskupenie používateľov, bezpečnosť (ACL).
- Kategórie Cisco routerov:
  - **Branch** – jednoduchá konfigurácia a správa pre LAN a WAN pobočiek,
  - **Network edge** – vysoký výkon a bezpečnosť, spájajú kampus, dátové centrum a pobočky; zákazníci majú prístup kedykoľvek a kdekoľvek,
  - **Service provider** – end-to-end služby pre predplatiteľov,
  - **Industrial** – podnikové funkcie v **drsnom prostredí**.
- **Fixed** (vstavané rozhrania) vs. **modular** (sloty na výmenu rozhraní). Rozhrania: FastEthernet, GigabitEthernet, Serial, optické.

## Krátka ústna odpoveď

Podnikové siete sa navrhujú hierarchicky v troch vrstvách: prístupová (pripojenie koncových zariadení), distribučná (smerovanie, QoS, ACL) a core (rýchla chrbtica a izolácia porúch); v menších sieťach sa distribučná a core zlučujú (collapsed core). Škálovateľnosť zabezpečujú modulárne zariadenia, hierarchická adresácia, redundantné linky so STP, EtherChannel, škálovateľný routing (OSPF) a bezdrôtový prístup; failure domain sa zmenšuje switch blokmi. Switche majú form factor fixed, modular alebo stackable a posudzuje sa hustota portov, forwarding rate a PoE; routery delíme na branch, network edge, service provider a industrial.

## Kvíz – kľúčové otázky z kurzu

- Vždy dostupná sieť → **resilient**; rozšíriteľná na požiadanie → **modularity**; využíva všetky zdroje → **flexible**.
- Izolácia porúch a vysokorýchlostná chrbtica → **core**; priame pripojenie používateľov → **access**; routing, bezpečnosť → **distribution**.
- Collapsed core → **zlúčenie distribučnej a core vrstvy**.
- Viac budov, cenovo efektívne → **extended star**.
- Oblasť zasiahnutá poruchou → **failure domain**; zmenšenie → **switch block**.
- Redundantné linky v switched sieti vyžadujú → **STP**; viac liniek ako jedna logická → **EtherChannel**.
- Vymeniteľné líniové karty → **modular**; spravované ako jeden → **stackable**; počet portov → **port density**; dáta za sekundu → **forwarding rate**.
- Routing rýchlosťou blízko L2 → **multilayer switch**.
- PoE pass-through → **switche, telefóny a AP dostávajú napájanie z nadradeného switcha**.
- Prístup zákazníkov kedykoľvek a kdekoľvek → **network edge routers**; drsné prostredie → **industrial**.

Predchádzajúci: [[ENSA 10 – Správa siete]] · Ďalej: [[ENSA 12 – Riešenie problémov v sieti]] · Späť: [[CCNA3 – ENSA]]
