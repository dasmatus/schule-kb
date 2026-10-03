---
title: "M14 – Routing Concepts"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 14
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, routing, poznámky]
---

# M14 – Routing Concepts

> [!info] Súvisí s maturitou
> [[T11 – Smerovanie a smerovacie protokoly]] (router, smerovacie protokoly, smerovacia tabuľka) · [[T22 – Funkcie a metódy]] (OSPF) · späť na [[CCNA2 – SRWE]]

## Čo robí router
1. **Určí najlepšiu cestu** podľa smerovacej tabuľky
2. **Prepošle** paket k cieľu

**Najlepšia cesta = longest match** – trasa s najviac zhodnými bitmi zľava (najdlhší prefix).
Príklad: 172.16.0.10 vs 172.16.0.0/12, /18, /26 → vyhrá **/26**.
IPv6: 2001:db8:c000::/40 vs /48 vs 2001:db8:c000:5555::/64 → /48 (/64 nesedí).

## Zdroje trás
- **Priamo pripojené** – rozhranie s IP v stave **up/up**
- **Statické** – zadané ručne
- **Dynamické** – naučené protokolom (OSPF, EIGRP…)

## Preposlanie paketu
Príde rámec → deenkapsulácia → vyhľadanie cieľovej IP → longest match → jedna z troch možností:
1. **Priamo pripojená sieť** → ARP / ND pre MAC cieľa → odoslať
2. **Next-hop router** → ARP pre MAC next hopu → odoslať
3. **Žiadna zhoda** (a ani default route) → **zahodiť** (+ ICMP unreachable)
Router vytvorí **nový L2 rámec** pre výstupné rozhranie (Ethernet: nové MAC; sériová point-to-point: L2 cieľ samé jednotky).

### Mechanizmy preposielania
| Mechanizmus | Princíp |
|---|---|
| **Process switching** | CPU hľadá pre každý paket – najpomalšie |
| **Fast switching** | prvý paket cez CPU, výsledok do **fast-switching cache** |
| **CEF** (Cisco Express Forwarding) | predpočítaná **FIB** + **adjacency tabuľka** – najrýchlejšie, predvolené |

## Základná konfigurácia (opakovanie)
```
R1(config)# hostname R1
R1(config)# enable secret class
R1(config)# line console 0
R1(config-line)# logging synchronous      ! hlásenia ti nerozbijú písanie
R1(config-line)# password cisco
R1(config-line)# login
R1(config)# service password-encryption
R1(config)# ipv6 unicast-routing
R1(config)# interface g0/0/0
R1(config-if)# ip address 10.0.1.1 255.255.255.0
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64
R1(config-if)# no shutdown
```
Overenie: `show ip interface brief`, `show ip route`, `show ip interface`, `show running-config`, `show interfaces`, `ping`. Filtre: `| section / include / exclude / begin`.

## Smerovacia tabuľka
**Kódy:** **L** local (/32 alebo /128 adresa rozhrania) · **C** connected · **S** static · **O** OSPF · **D** EIGRP · **R** RIP · **\*** kandidát na default.
Princípy:
1. Každý router rozhoduje **sám**, podľa svojej tabuľky.
2. Tabuľka jedného routera nemusí sedieť s tabuľkou iného.
3. Trasa tam nezaručuje trasu späť (**asymetrické smerovanie**).

Záznam: `O 10.0.4.0/24 [110/50] via 10.0.3.2, 00:24:22, Serial0/1/1`
= zdroj · cieľová sieť · **[AD/metrika]** · next hop · čas · výstupné rozhranie.

- **Default route:** `0.0.0.0/0` (quad zero) alebo `::/0`; statická (`S*`) alebo dynamická (`O*E2`). „Gateway of last resort“.
- IPv4 tabuľka: odsadenie podľa triednych sietí („is variably subnetted“ = rodičovská trasa). IPv6 takú štruktúru nemá.
- IPv6 dynamické trasy používajú **link-local adresu next hopu**.

## Administratívna vzdialenosť (AD) – dôveryhodnosť zdroja
| Zdroj | AD |
|---|---|
| **Priamo pripojená** | **0** |
| **Statická** | **1** |
| EIGRP summary | 5 |
| External BGP | 20 |
| **Internal EIGRP** | **90** |
| **OSPF** | **110** |
| IS-IS | 115 |
| **RIP** | **120** |
| External EIGRP | 170 |
| Internal BGP | 200 |
Nižšia = dôveryhodnejšia. AD vyberá medzi **rôznymi zdrojmi**, **metrika** medzi cestami **toho istého protokolu**.

## Statické vs dynamické
| | Dynamické | Statické |
|---|---|---|
| Konfigurácia | nezávisí od veľkosti siete | rastie so sieťou |
| Zmena topológie | prispôsobí sa samo | musí zasiahnuť admin |
| Škálovateľnosť | jednoduché aj zložité siete | jednoduché siete |
| Bezpečnosť | treba nastaviť | bezpečné samo osebe |
| Zdroje | CPU, RAM, šírka pásma | nič navyše |
| Predvídateľnosť | závisí od protokolu | určí admin |

**Statické** sa používajú: default route k ISP, trasy mimo smerovacej domény, explicitne určená cesta, **stub siete**.
**Dynamické** sa používajú: viac ako pár routerov, automatické presmerovanie, škálovateľnosť.

## Dynamické protokoly
| | IGP – Distance vector | IGP – Link-state | EGP – Path vector |
|---|---|---|---|
| IPv4 | RIPv2, EIGRP | OSPFv2, IS-IS | **BGP-4** |
| IPv6 | RIPng, EIGRP for IPv6 | OSPFv3, IS-IS for IPv6 | BGP-MP |
- **IGP** = v rámci jednej organizácie; **EGP** = medzi organizáciami (len **BGP**, ISP).
- Súčasti: dátové štruktúry (tabuľky), správy protokolu, algoritmus.
- **Metrika:** RIP = **počet skokov** (max 15), OSPF = **cost** (šírka pásma), EIGRP = šírka pásma + oneskorenie (+ záťaž, spoľahlivosť).
- **Load balancing:** cesty s rovnakou cenou → prevádzka sa delí (**ECMP**). Len **EIGRP** vie **unequal-cost** load balancing.
