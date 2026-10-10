---
title: "M05 – STP Concepts"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 5
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, stp, poznámky]
---

# M05 – STP Concepts

> [!info] Súvisí s maturitou
> [[T18 – Algoritmy, vývojové diagramy a VLSM]] (redundancia na L2) · [[T13 – Komunikácia na vrstve L2]] · späť na [[CCNA2 – SRWE]]

## Prečo STP
Redundantné L2 linky → **slučky**. Ethernet nemá TTL → rámce krúžia donekonečna. Následky: nestabilná MAC tabuľka, saturované linky, vysoké CPU → **broadcast storm** (sieť padne za sekundy). Krúžia broadcasty, multicasty aj unknown unicast.
STP (spanning tree algoritmus, Radia Perlman) logicky zablokuje redundantné porty → strom bez slučiek; pri výpadku linky prepočíta topológiu.

## 4 kroky k topológii bez slučiek
1. **Voľba root bridge** – najnižšie **BID**
2. **Voľba root portov** (RP) – na každom ne-root switchi port s najnižšou cenou k rootu
3. **Voľba designated portov** (DP) – jeden na segment, strana bližšie k rootu
4. Ostatné = **alternate (blokované)** porty

### BID (Bridge ID)
`priorita (4 bity) + extended system ID (12 bitov = VLAN) + MAC`
- Predvolená priorita **32768** → vo VLAN 1 uvidíš **32769**. Priorita sa mení po **4096**.
- Nižšia priorita vyhráva; pri zhode → **najnižšia MAC**.
- Root bridge má všetky porty designated.

### Cena portu
| Rýchlosť | STP 802.1D | RSTP 802.1w |
|---|---|---|
| 10 Gbps | 2 | 2 000 |
| 1 Gbps | 4 | 20 000 |
| 100 Mbps | 19 | 200 000 |
| 10 Mbps | 100 | 2 000 000 |
**Root path cost** = súčet cien k rootu (posiela sa v BPDU).

### Rozhodovanie pri rovnakej cene
1. najnižšie **BID odosielateľa**
2. najnižšia **priorita portu odosielateľa** (predvolene 128)
3. najnižšie **ID portu odosielateľa**

- Porty ku koncovým zariadeniam = **designated**.

## Časovače a stavy portov (802.1D)
- **Hello** 2 s (interval BPDU), **Forward delay** 15 s (listening + learning), **Max age** 20 s.
- Odporúčaný max. priemer siete: **7 switchov**. Časovače nastavuje root bridge.

| Stav | BPDU | Učenie MAC | Posiela dáta |
|---|---|---|---|
| Blocking | len prijíma | nie | nie |
| Listening | prijíma aj posiela | nie | nie |
| Learning | prijíma aj posiela | **áno** | nie |
| Forwarding | prijíma aj posiela | áno | **áno** |
| Disabled | nič | nie | nie |
Z blocking do forwarding trvá **30–50 s**.

## Verzie STP
| Verzia | Poznámka |
|---|---|
| **STP** 802.1D | pôvodné, jeden strom (CST) pre všetky VLAN |
| **PVST+** | Cisco, **inštancia pre každú VLAN**; **predvolené na IOS 15+** |
| **RSTP** 802.1w | rýchla konvergencia |
| **Rapid PVST+** | Cisco RSTP pre každú VLAN |
| **MSTP / MST** | viac VLAN namapovaných na jednu inštanciu |

PVST umožní mať pre rôzne VLAN rôzny root → rozkladanie záťaže.

## RSTP
- Stavy: **discarding, learning, forwarding** (discarding = blocking + listening + disabled).
- Roly: root, designated, **alternate** (záložná cesta k rootu), **backup** (záložná cesta k zdieľanému segmentu).
- Konverguje za pár sekúnd.

## PortFast a BPDU Guard
- **PortFast**: access port ide **hneď do forwarding** (preskočí listening/learning ≈ 30 s), napr. aby DHCP klienti nečakali. **Len na porty ku koncovým zariadeniam!**
- **BPDU Guard**: prijaté BPDU na porte → **err-disabled** (ochrana proti pripojeniu cudzieho switchu).

## Alternatívy
Veľké siete prechádzajú na L3 všade okrem access vrstvy (routing zvládne redundanciu bez blokovania).
