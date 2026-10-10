---
title: "ENSA 02 – Konfigurácia OSPFv2"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 2
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 2: Single-Area OSPFv2 Configuration"
tags:
  - ist
  - siete
  - ccna3
  - ospf
  - konfigurácia
  - packet-tracer
---

# ENSA 02 – Konfigurácia single-area OSPFv2

> [!abstract] Ciele modulu
> Router ID · OSPF v point-to-point sieťach · DR/BDR a priorita v multiaccess sieťach · úprava cost a časovačov · šírenie default route · overovanie.
> Teória je v [[ENSA 01 – Koncepty OSPFv2]]. Na maturite (PČOZ) sa OSPF často konfiguruje v [[Packet Tracer]].

## 1. Router ID (RID)

- Zapnutie OSPF: `router ospf <process-id>` – process ID **1 – 65 535**, je **lokálne významné** (nemusí byť rovnaké na všetkých routeroch).
- RID = 32-bitové číslo zapísané ako IPv4 adresa. Používa sa na synchronizáciu LSDB a voľbu DR/BDR (tie-breaker).
- **Poradie voľby RID:**
  1. explicitne nastavené `router-id <rid>`,
  2. **najvyššia IPv4 adresa loopback** rozhrania,
  3. **najvyššia aktívna IPv4 adresa** fyzického rozhrania.
- Loopback pre RID sa zadáva s maskou `/32` (255.255.255.255) – host route.
- Zmena RID na bežiacom procese sa prejaví až po **`clear ip ospf process`** alebo reloade.

```text
R1(config)# router ospf 10
R1(config-router)# router-id 1.1.1.1
R1(config-router)# end
R1# clear ip ospf process
R1# show ip protocols | include Router ID
```

## 2. Príkaz `network` a wildcard maska

- Syntax: `network <adresa-siete> <wildcard> area <area-id>` – všetky rozhrania, ktoré spadajú do rozsahu, posielajú/prijímajú OSPF a sieť sa ohlasuje.
- V single-area musí byť **rovnaké area-id na všetkých routeroch**.
- **Wildcard maska**: bit **0 = zhoda**, bit **1 = ignoruj**. Rýchly výpočet: **255.255.255.255 − maska** (napr. /27 → 0.0.0.31, /30 → 0.0.0.3).
- Alternatíva: presná IP rozhrania s quad-zero wildcard `0.0.0.0`.

```text
R1(config-router)# network 10.10.1.0 0.0.0.255 area 0
R1(config-router)# network 10.1.1.4 0.0.0.3 area 0
! alebo presne podľa rozhrania:
R1(config-router)# network 10.1.1.5 0.0.0.0 area 0
```

### OSPF priamo na rozhraní

```text
R1(config)# interface GigabitEthernet0/0/0
R1(config-if)# ip ospf 10 area 0
```

## 3. Passive interface

- Zastaví posielanie Hello/OSPF správ cez rozhranie (napr. do LAN, loopback), **sieť sa ale stále ohlasuje**.
- Dôvody: šetrí šírku pásma a zdroje, zvyšuje bezpečnosť.
- Overenie: `show ip protocols` (vypíše pasívne rozhrania).

```text
R1(config-router)# passive-interface loopback 0
R1(config-router)# passive-interface default      ! všetky pasívne, potom:
R1(config-router)# no passive-interface g0/0/0
```

## 4. Point-to-point siete

- Na linke medzi dvoma routermi nemá voľba DR/BDR zmysel → `ip ospf network point-to-point`.
- Loopback sa defaultne ohlasuje ako **/32 host route**; aby simuloval reálnu LAN (/24), nastaví sa naň tiež `ip ospf network point-to-point`.

## 5. Multiaccess siete, DR/BDR

- Typy OSPF sietí: point-to-point, broadcast multiaccess (Ethernet), NBMA, point-to-multipoint, virtual links.
- **DR** zbiera a rozosiela LSA na **224.0.0.5** (všetky OSPF routery).
- **DROTHER** posielajú na **224.0.0.6** (All DR routers) – počúvajú len DR a BDR.
- Voľba DR/BDR:
  1. **najvyššia priorita rozhrania** (0 – 255, default **1**; **0 = nikdy nebude DR/BDR**),
  2. pri zhode **najvyššie Router ID**.
- Voľba **nie je preemptívna** – nový router s vyššou prioritou DR nezosadí. Pri páde DR sa BDR stane DR a volí sa nový BDR. Novú voľbu vynútiš `clear ip ospf process`.
- Stavy v `show ip ospf neighbor`: `FULL/DR`, `FULL/BDR`, `FULL/DROTHER`, `2WAY/DROTHER` (dva DROTHERy – normálny stav), `FULL/-` (P2P, bez DR).

```text
R1(config)# interface g0/0/0
R1(config-if)# ip ospf priority 255   ! chce byť DR
R3(config-if)# ip ospf priority 0     ! nikdy DR/BDR
```

## 6. Úprava OSPF – cost a časovače

- **Cost = reference bandwidth / bandwidth rozhrania**, default reference = **100 Mb/s (10^8)**.

| Rozhranie | Default cost (ref 100 Mb/s) | Cost pri ref 10 000 Mb/s |
| --- | --- | --- |
| 10 Gigabit Ethernet | 1 | 1 |
| Gigabit Ethernet | 1 | 10 |
| Fast Ethernet | 1 | 100 |
| Ethernet 10 Mb/s | 10 | 1000 |

- Problém: FE, GE aj 10GE majú pri defaulte rovnaký cost 1 → riešenie:
  - `auto-cost reference-bandwidth <Mb/s>` – **na všetkých routeroch rovnako**,
  - alebo ručne `ip ospf cost <hodnota>` na rozhraní.
- Cost trasy = súčet cost-ov odchádzajúcich rozhraní po ceste k cieľu.
- Časovače: `ip ospf hello-interval <s>`, `ip ospf dead-interval <s>` – musia sa **zhodovať so susedom**, inak adjacencia nevznikne. Overenie: `show ip ospf interface`.

```text
R1(config-router)# auto-cost reference-bandwidth 10000
R1(config)# interface g0/0/1
R1(config-if)# ip ospf cost 30
R1(config-if)# ip ospf hello-interval 5
R1(config-if)# ip ospf dead-interval 20
```

## 7. Šírenie default route

- Router medzi OSPF doménou a ne-OSPF sieťou (ISP) = **ASBR (Autonomous System Boundary Router)**.
- Na ASBR: statická default route + `default-information originate`.
- Ostatné routery ju uvidia ako `O*E2 0.0.0.0/0`.

```text
R2(config)# ip route 0.0.0.0 0.0.0.0 loopback 1
R2(config)# router ospf 10
R2(config-router)# default-information originate
```

## 8. Overovanie

| Príkaz | Čo ukáže |
| --- | --- |
| `show ip interface brief` | rozhrania up/down a ich IP |
| `show ip route` / `show ip route ospf` | trasy (O = OSPF, O*E2 = externá default) |
| `show ip ospf neighbor` | Neighbor ID, Pri, State, Dead Time, Address, Interface |
| `show ip protocols` | process ID, RID, network príkazy, pasívne rozhrania, AD **110** |
| `show ip ospf` | process ID, RID, info o oblasti, kedy naposledy bežal SPF |
| `show ip ospf interface [int]` | typ siete, cost, DR/BDR, Hello/Dead intervaly, susedia |
| `show ip ospf interface brief` | prehľad OSPF rozhraní |

## Kompletná ukážka (3 routery, area 0)

```text
R1(config)# interface loopback 0
R1(config-if)# ip address 1.1.1.1 255.255.255.255
R1(config-if)# exit
R1(config)# router ospf 10
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 10.10.1.0 0.0.0.255 area 0
R1(config-router)# network 10.1.1.4 0.0.0.3 area 0
R1(config-router)# network 10.1.1.12 0.0.0.3 area 0
R1(config-router)# passive-interface g0/0/2
R1(config-router)# auto-cost reference-bandwidth 1000
R1(config-router)# end
R1# show ip ospf neighbor
```

## Typické chyby (troubleshooting)

- nezhodné **area ID**, **Hello/Dead**, **maska podsiete** alebo typ OSPF siete → susedstvo nevznikne,
- rozhranie je `passive` na linke k susedovi,
- zlá wildcard maska v `network` → rozhranie sa do OSPF nezaradí,
- duplicitné Router ID,
- `auto-cost reference-bandwidth` nie je rovnaký na všetkých routeroch.

## Kvíz – kľúčové otázky z kurzu

- Najpreferovanejší spôsob určenia RID → **príkaz `router-id`**; bez neho router s loopbackom → **IP loopbacku**.
- Wildcard pre 192.168.5.96/27 → **0.0.0.31**.
- Ohlásiť iba 192.168.1.0/24 → `network 192.168.1.0 0.0.0.255 area 0`.
- Čo sa musí zhodovať pre adjacenciu → **typ siete OSPF, Hello timer, maska podsiete**.
- Ktorý príkaz ukáže pasívne rozhrania → `show ip protocols`.
- GE s nižším cost ako FE → `auto-cost reference-bandwidth 1000`.
- Po zmene RID → `clear ip ospf process`.
- Hello/Dead intervaly → `show ip ospf interface`.
- Prvé kritérium voľby DR → **najvyššia priorita**.
- Šírenie default route z ISP routera → `default-information originate`.

Predchádzajúci: [[ENSA 01 – Koncepty OSPFv2]] · Ďalej: [[ENSA 03 – Koncepty sieťovej bezpečnosti]] · Späť: [[CCNA3 – ENSA]]
