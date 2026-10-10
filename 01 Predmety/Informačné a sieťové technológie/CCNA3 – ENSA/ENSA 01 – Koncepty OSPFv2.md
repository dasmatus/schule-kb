---
title: "ENSA 01 – Koncepty OSPFv2"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 1
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 1: Single-Area OSPFv2 Concepts"
tags:
  - ist
  - siete
  - ccna3
  - ospf
  - smerovanie
---

# ENSA 01 – Koncepty OSPFv2 (Single-Area OSPFv2 Concepts)

> [!abstract] Cieľ modulu
> Vysvetliť, ako funguje single-area OSPF v point-to-point aj broadcast multiaccess sieťach.
> Súvisí s maturitnými témami [[T11 – Smerovanie a smerovacie protokoly]] a [[T22 – Funkcie a metódy]] (časť OSPF).

## 1. Čo je OSPF

- **OSPF (Open Shortest Path First)** = **link-state** smerovací protokol, vznikol ako náhrada za distance-vector **RIP**.
- RIP používa ako metriku iba **počet skokov (hop count)** → zle škáluje, nepozná rýchlosť liniek.
- OSPF: **rýchlejšia konvergencia**, škáluje na veľké siete, metrika = **cost (cena)** odvodená od šírky pásma.
- **OSPFv2** = pre IPv4, **OSPFv3** = pre IPv6 (rovnaké princípy, samostatný proces a samostatné tabuľky).
- *Link* = rozhranie routera / segment medzi routermi / stub sieť (LAN za jedným routerom). Link-state informácia obsahuje **prefix siete, dĺžku prefixu a cost**.
- Administratívna vzdialenosť (AD) OSPF = **110**.

## 2. Komponenty OSPF – 3 databázy

| Databáza | Tabuľka | Čo obsahuje | Príkaz |
| --- | --- | --- | --- |
| Adjacency database | **Neighbor table** | susedia, s ktorými má router obojsmernú komunikáciu; unikátna pre každý router | `show ip ospf neighbor` |
| Link-state database (**LSDB**) | **Topology table** | informácie o všetkých routeroch v oblasti; **všetky routery v oblasti majú identickú LSDB** | `show ip ospf database` |
| Forwarding database | **Routing table** | najlepšie cesty vypočítané SPF algoritmom; unikátna pre každý router | `show ip route` |

- Tabuľky sú uložené v **RAM**.
- **Dijkstrov SPF (Shortest Path First) algoritmus** – každý router sa postaví do **koreňa SPF stromu** a vypočíta najkratšiu (najlacnejšiu kumulatívnu) cestu ku každej sieti.

## 3. Link-state operácia – 5 krokov (poradie sa skúša!)

1. **Establish Neighbor Adjacencies** – Hello pakety na všetky OSPF rozhrania.
2. **Exchange Link-State Advertisements (LSA)** – LSA obsahuje stav a cost priamo pripojených liniek; zaplavujú sa (flooding) do celej oblasti.
3. **Build the Link-State Database** (topology table).
4. **Execute the SPF Algorithm** → SPF strom.
5. **Choose the Best Route** → najlepšie cesty idú do routovacej tabuľky (ak neexistuje zdroj s nižšou AD, napr. statická trasa).

## 4. Single-area vs. multiarea OSPF

- **Oblasť (area)** = skupina routerov s rovnakou link-state informáciou v LSDB.
- **Single-area** – všetky routery v jednej oblasti, odporúča sa **area 0**. Vhodné pre menšie siete.
- **Multiarea** – hierarchicky, všetky oblasti sa musia pripájať na **backbone area 0**. Routery medzi oblasťami = **ABR (Area Border Router)**.
- Výhody multiarea:
  - menšie routovacie tabuľky (sumarizácia medzi oblasťami – nie je zapnutá defaultne),
  - menšia réžia link-state aktualizácií,
  - **menej SPF výpočtov** – zmena topológie ovplyvní len danú oblasť; ostatné oblasti len aktualizujú tabuľku, SPF znova nepočítajú.

## 5. Typy OSPF paketov

| Typ | Paket | Účel |
| --- | --- | --- |
| 1 | **Hello** | objavenie susedov, budovanie a udržiavanie adjacencie, voľba DR/BDR |
| 2 | **DBD** (Database Description) | skrátený zoznam LSDB odosielateľa – kontrola synchronizácie |
| 3 | **LSR** (Link-State Request) | žiadosť o konkrétne záznamy |
| 4 | **LSU** (Link-State Update) | odpoveď na LSR a oznámenie nových informácií; **LSU obsahuje jedno alebo viac LSA** |
| 5 | **LSAck** | potvrdenie prijatia LSU (prázdne dátové pole) |

Bežné typy LSA: 1 Router, 2 Network, 3/4 Summary, 5 AS External, 7 NSSA.

### Hello paket

- Hello sa posiela na multicast **224.0.0.5 (All OSPF Routers)**.
- Polia: Type, **Router ID**, **Area ID**, **Network Mask**, **Hello Interval**, **Router Priority**, **Dead Interval**, **DR**, **BDR**, **zoznam susedov**.
- Aby sa routery stali susedmi, musia sa zhodovať: **area ID, hello/dead interval, maska (subnet), typ siete OSPF**, autentifikácia.
- Default: **Hello 10 s, Dead 40 s** (= 4× Hello) na multiaccess aj point-to-point linkách.

## 6. Stavy OSPF (OSPF Operational States)

| Stav | Čo sa deje |
| --- | --- |
| **Down** | žiadne Hello prijaté; router posiela Hello |
| **Init** | prijal Hello od suseda (s RID suseda) |
| **Two-Way** | vidí vlastné RID v Hello suseda → obojsmerná komunikácia; **na multiaccess sa volí DR a BDR** |
| **ExStart** | rozhodne sa, kto posiela DBD prvý (**vyššie Router ID**) a počiatočné sekvenčné číslo |
| **Exchange** | výmena **DBD** paketov |
| **Loading** | LSR/LSU na doplnenie chýbajúcich informácií; spracovanie SPF |
| **Full** | LSDB plne synchronizované – konvergencia |

- Na point-to-point linke idú routery z Two-Way rovno do ExStart (bez volieb DR/BDR).
- Synchronizácia DB = 3 kroky: **rozhodni prvý router → vymeň DBD → pošli LSR**.
- LSU sa posielajú len pri zmene (inkrementálne) a každých **30 minút**.

## 7. Prečo DR a BDR

- Na multiaccess sieti (Ethernet) by vzniklo príliš veľa adjacencií: **n(n − 1)/2** → 5 routerov = 10, 20 routerov = 190.
- Plus nadmerné zaplavovanie LSA.
- Riešenie: **DR (Designated Router)** – zberné a distribučné miesto LSA; **BDR** – záloha; ostatné = **DROTHER**.
- DR sa používa len na šírenie LSA, nie na forwarding dát.

## Krátka ústna odpoveď

OSPF je link-state smerovací protokol s metrikou cost. Routery si cez Hello pakety (224.0.0.5) vytvoria susedstvá, vymenia si LSA, zostavia identickú LSDB v rámci oblasti a Dijkstrovým SPF algoritmom vypočítajú najlepšie cesty. Používa tri databázy (neighbor, topology, routing) a päť typov paketov (Hello, DBD, LSR, LSU, LSAck). Prechádza stavmi Down → Init → Two-Way → ExStart → Exchange → Loading → Full. Na multiaccess sieťach sa volí DR a BDR, aby sa znížil počet adjacencií a zaplavovanie LSA. Oblasti (area 0 = backbone) zmenšujú LSDB a počet SPF výpočtov.

## Kvíz – kľúčové otázky z kurzu

- Neighbor table ↔ **Adjacency database**; topology table ↔ **LSDB**; routing table ↔ **Forwarding database**; cost počíta **Dijkstrov algoritmus**.
- Paket so skráteným zoznamom LSDB → **DBD**; oznámenie novej informácie → **LSU**; žiadosť → **LSR**; potvrdenie → **LSAck**.
- Čo jednoznačne identifikuje router v Hello? → **Router ID**.
- Voľba DR/BDR prebieha v stave → **Two-Way**; výmena DBD → **Exchange**; konvergované LSDB → **Full**; žiadne Hello → **Down**.
- Poradie paketov pri konvergencii → **Hello, DBD, LSR, LSU, LSAck**.
- Hello 15 s na P2P → default Dead interval = **60 s** (4×).
- Čo sa stane po výmene Hello a vytvorení adjacencie? → vymenia si **skrátené zoznamy LSDB (DBD)**.
- Dead interval vyprší → OSPF **odstráni suseda z LSDB**.
- Funkcia DR → **šírenie (dissemination) LSA**.
- Dôvody pre multiarea → **menej SPF výpočtov, menej pamäte a CPU**.

Ďalej: [[ENSA 02 – Konfigurácia OSPFv2]] · Späť: [[CCNA3 – ENSA]]
