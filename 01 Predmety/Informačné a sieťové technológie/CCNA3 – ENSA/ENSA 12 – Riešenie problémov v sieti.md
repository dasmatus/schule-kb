---
title: "ENSA 12 – Riešenie problémov v sieti"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 12
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 12: Network Troubleshooting"
tags:
  - ist
  - siete
  - ccna3
  - troubleshooting
  - diagnostika
  - packet-tracer
---

# ENSA 12 – Riešenie problémov v sieti (Network Troubleshooting)

> [!abstract] Ciele modulu
> Sieťová dokumentácia a baseline · proces riešenia problémov · nástroje · symptómy a príčiny podľa vrstiev OSI · postup pri IP konektivite.
> Hlavný podklad k maturitnej téme [[T12 – Diagnostika sietí]], dokumentácia aj k [[T17 – Robotika a softvérové aplikácie]].

## 1. Sieťová dokumentácia

- **Fyzická topológia** – ako sú zariadenia fyzicky zapojené: názov, umiestnenie (miestnosť, rack), rozhrania/porty, **typ a dĺžka kábla**.
- **Logická topológia** – ako tečú dáta: **IP adresy, prefixy, VLAN, routing protokoly**, rozhrania.
- **Dokumentácia zariadení:** router (rozhranie, IPv4/IPv6, MAC, routing protokol), switch (port, access/trunk, VLAN, EtherChannel, native VLAN), koncové zariadenia (**end-system documentation** – názov, **OS**, služby, MAC, IP, brána, DNS).
- **Baseline (základná línia výkonu)** – meria sa **počas bežnej pracovnej doby**, dostatočne dlho, aby ukázala „normál“. Odpovedá na:
  - ako sieť funguje v bežný deň,
  - kde vzniká najviac chýb,
  - ktorá časť je najviac / najmenej využívaná,
  - čo monitorovať a aké prahy alarmov,
  - či sieť spĺňa politiky.
- Baseline **nie je nekonečný** proces; začni s pár premennými (vyťaženie rozhraní, CPU).
- Zber údajov: `show`, `ping`, `traceroute`, `telnet`.

| Príkaz | Čo zobrazí |
| --- | --- |
| `show version` | uptime, verzia IOS, hardvér |
| `show ip interface brief` / `show ipv6 interface brief` | stav rozhraní a IP |
| `show interfaces` | detailné štatistiky (chyby, kolízie, duplex) |
| `show ip route` / `show ipv6 route` | routovacia tabuľka |
| `show cdp neighbors detail` | susedné Cisco zariadenia |
| `show arp` / `show ipv6 neighbors` | ARP / neighbor tabuľka |
| `show running-config` | aktuálna konfigurácia |
| `show vlan`, `show port` | VLAN a porty na switchi |
| `show tech-support` | veľa údajov naraz pre podporu |

## 2. Proces riešenia problémov

### Sedem krokov

1. **Define the problem** – definuj problém
2. **Gather information** – zbieraj informácie
3. **Analyze information** – analyzuj
4. **Eliminate possible causes** – vylúč možné príčiny
5. **Propose hypothesis** – navrhni hypotézu
6. **Test hypothesis** – otestuj (tu sa robí aj **rollback plán**)
7. **Solve the problem** – vyrieš a **zdokumentuj všetko**, čo sa skúšalo

Zjednodušene 3 fázy: **zbieranie symptómov → izolácia problému → náprava**.

### Komunikácia s používateľom

Otvorené a uzavreté otázky: čo nefunguje, koho sa to týka, **kedy sa to začalo**, je to stále alebo občas, dá sa to zopakovať, čo sa zmenilo, čo funguje.

### Štruktúrované metódy

| Metóda | Kedy |
| --- | --- |
| **Bottom-up** (od L1 nahor) | podozrenie na **fyzický problém (kábel)**, zložité problémy |
| **Top-down** (od L7 nadol) | **softvérový/aplikačný** problém (napr. web funguje, FTP nie) |
| **Divide-and-conquer** | začne v strede (napr. ping na L3) – skúsený technik |
| **Follow-the-path** | sleduje cestu paketu (traceroute) |
| **Substitution** | vymení podozrivý komponent za funkčný |
| **Comparison** | porovná s funkčnou konfiguráciou |
| **Educated guess** | odhad podľa skúseností |

- Ak **ping funguje, ale Telnet nie** → skúmaj **od sieťovej po aplikačnú vrstvu** (L3 je OK).
- Najvyššia vrstva, ktorú treba zvážiť pri routeroch / L3 switchoch → **L4**.

## 3. Nástroje

**Softvér:** NMS nástroje (**WhatsUp Gold**, PRTG, SolarWinds), **knowledge base** výrobcu, baselining nástroje, **protokolový analyzátor (Wireshark)** – obsah paketov, overenie šifrovania.

**Hardvér:**

- **digitálny multimeter (DMM)** – napätie, prúd, odpor,
- **cable tester** – zapojenie, prerušenie, **vzdialenosť k zlomu** (TDR),
- **cable analyzer** – **testuje a certifikuje** meď aj optiku podľa štandardov,
- portable network analyzer, Cisco Prime NAM.

**Syslog** ako nástroj – logovanie na konzolu, terminál, buffer, SNMP trap, syslog server; čím nižšie číslo, tým závažnejšie (0 – 7, pozri [[ENSA 10 – Správa siete]]).

```text
R1(config)# logging host 209.165.200.225
R1(config)# logging trap notifications
R1(config)# logging on
```

## 4. Symptómy a príčiny podľa vrstiev

### L1 – fyzická

- **Symptómy:** výkon pod baseline, strata konektivity, preťaženie, vysoké CPU, chybové hlásenia na konzole.
- **Príčiny:** napájanie (najzákladnejšie), chybný hardvér/NIC (**late collisions, short frames, jabber**), kabeláž (zlý typ, zle nakrimpovaný RJ-45), **útlm (attenuation)** – priveľká dĺžka, **šum/EMI** (presluchy, motory), chyby konfigurácie rozhrania (clock rate, shutdown), prekročenie limitov, preťaženie CPU.

### L2 – linková

- **Symptómy:** žiadna konektivita na L2 a vyššie, výkon pod baseline, **nadmerné broadcasty**, hlásenia (`line protocol down`).
- **Príčiny:** chyby zapuzdrenia (rôzne na koncoch WAN linky), chyby mapovania adries (ARP), **framing errors** (duplex mismatch, šum), **STP slučky a zlyhania**.

### L3 – sieťová

- **Symptómy:** výpadok siete, suboptimálny výkon.
- **Príčiny:** zmena topológie, konektivita, chyby v **routovacej tabuľke**, problémy so **susedmi** (OSPF adjacencia), topologická databáza, **routing slučky**.

### L4 – transportná

- Najčastejšie **zle nastavené ACL a NAT**.
- ACL chyby: zlý smer/rozhranie, **zlé poradie ACE**, **implicit deny**, zlé adresy/wildcard, zlý transportný protokol (TCP vs. UDP), porty, `established`, nezvyčajné protokoly (VPN).
- NAT problémy s: **DHCP/BOOTP** (zdroj 0.0.0.0), DNS, SNMP, **IPsec/GRE tunely**.
- Poradie: inbound ACL → outside-to-inside NAT; inside-to-outside NAT → outbound ACL.

### L7 – aplikačná

- Nižšie vrstvy fungujú, ale služba (DNS, HTTP, FTP, SMTP, SNMP…) nie.

## 5. Postup pri IP konektivite (8 krokov)

1. **Fyzická vrstva** – `show processes cpu`, `show memory`, `show interfaces` (chyby, CRC, kolízie).
2. **Duplex mismatch** – `show interfaces`; riešenie `duplex auto` / rovnaký duplex na oboch stranách.
3. **Adresácia v lokálnej sieti** – `arp -a` (Windows), `show arp`, `show ipv6 neighbors`, `show mac address-table`; **zlá VLAN** na porte (`switchport access vlan 10`).
4. **Default gateway** – `show ip route`, `route print` / `ipconfig` (Windows), `ifconfig` (Linux/macOS); IPv6: `ipv6 unicast-routing` na routeri.
5. **Správna cesta** – `show ip route | begin Gateway`, `show ipv6 route`, `traceroute`.
6. **Transportná vrstva** – test cez **Telnet** na konkrétny port.
7. **ACL** – `show ip access-lists`, `show ip interface` (kde je ACL a ktorým smerom).
8. **DNS** – `show running-config`, `ip host <meno> <IP>`, `nslookup`.

> [!tip] Klasické scenáre
> - PC pinguje lokálne zariadenia aj tlačiareň, ale nie internet → **chýbajúca/zlá default gateway**.
> - Nepinguje vzdialené siete, lokálne áno → **zlá default gateway**.
> - Ping OK, Telnet/FTP nie → **ACL alebo aplikácia** (L4 – L7).

## Krátka ústna odpoveď

Riešenie problémov začína dokumentáciou (fyzická a logická topológia, dokumentácia zariadení) a baseline meranou v bežnej prevádzke. Postupuje sa sedemkrokovo: definovať problém, zbierať a analyzovať informácie, vylúčiť príčiny, navrhnúť a otestovať hypotézu a vyriešiť a zdokumentovať. Metódy sú bottom-up (hardvér, káble), top-down (softvér), divide-and-conquer, follow-the-path, substitúcia a porovnanie. Nástroje: ping, traceroute, show príkazy, Wireshark, NMS, cable tester a analyzátor, syslog. Problémy sa hľadajú podľa vrstiev: L1 kabeláž a šum, L2 duplex a STP, L3 routovanie a brána, L4 ACL a NAT, L7 služby ako DNS.

## Kvíz – kľúčové otázky z kurzu

- Diagram s IP adresami → **logická topológia**; OS servera → **end-system documentation**; fyzická topológia obsahuje → **umiestnenie a dĺžky káblov**.
- Baseline → **monitorovať a riešiť výkon**, meraný **počas bežnej pracovnej doby**; nezbiera sa donekonečna.
- Rollback plán → krok **Test hypothesis**; po ktorom kroku sa použije vrstvový model → **gathering symptoms**.
- Kábel → **bottom-up**; softvér, FTP nefunguje ale web áno → **top-down**.
- Ping OK, Telnet nie → **od sieťovej po aplikačnú vrstvu**.
- Čo dokumentovať → **všetko, čo sa skúšalo**.
- Vzdialenosť k zlomu kábla → **cable tester**; certifikácia káblov → **cable analyzer**; obsah paketov / overenie SSL → **protocol analyzer**; NMS → **WhatsUp Gold**.
- Late collisions, jabber → **L1**; STP slučka → **L2**; routing slučka → **L3**; rozšírená ACL → **L4**; DNS → **L7**.
- Najvyššia závažnosť syslogu → **0**.

Predchádzajúci: [[ENSA 11 – Návrh siete]] · Ďalej: [[ENSA 13 – Virtualizácia sietí]] · Späť: [[CCNA3 – ENSA]]
