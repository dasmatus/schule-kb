---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T18 – Algoritmy, vývojové diagramy a VLSM

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> ALGORITMY A ICH VLASTNOSTI, VÝVOJOVÉ DIAGRAMY - značky vývojového diagramu, redundancia na L2, EtherChannel, subneting VLSM

## Algoritmus a vývojový diagram

Algoritmus je presný, konečný a jednoznačný postup, ktorý z daných vstupov vytvorí požadovaný výstup. Má byť vykonateľný, správny, konečný a podľa potreby efektívny. Pri návrhu určujeme vstupy, výstupy, kroky, podmienky, opakovania a ukončenie.

Základné značky vývojového diagramu:

- ovál — začiatok alebo koniec,
- obdĺžnik — spracovanie/činnosť,
- rovnobežník — vstup alebo výstup,
- kosoštvorec — rozhodnutie s vetvami áno/nie,
- šípky — smer toku,
- spojovací symbol — prepojenie častí diagramu.

Diagram má mať čitateľný tok a každá vetva rozhodnutia musí viesť k ďalšiemu kroku alebo ukončeniu. Pri cykle je dôležité, aby sa menila podmienka, inak vznikne nekonečné opakovanie.

## Redundancia na L2

Redundancia znamená viac fyzických spojení alebo zariadení, aby výpadok jednej cesty neodstavil sieť. Na druhej vrstve však paralelné linky vytvoria slučku: rámce sa môžu neustále replikovať, MAC tabuľka sa bude meniť a vznikne broadcastová búrka. **STP** zvolí koreňový bridge, vypočíta cenu ciest a blokuje nadbytočné porty. **RSTP** skracuje čas rekonvergencie; MSTP môže mapovať viac VLAN do inštancií.

## EtherChannel

EtherChannel (link aggregation) združí viac fyzických ethernetových liniek do jedného logického port-channelu. Zvyšuje dostupnosť a súhrnnú kapacitu a STP ho vidí ako jednu linku. Príklad v štýle Cisco IOS:

```text
interface range GigabitEthernet0/1-2
 channel-group 1 mode active
interface Port-channel1
 switchport mode trunk
 switchport trunk allowed vlan 10,20
```

`mode active` používa LACP; `PAgP` je vendorovo špecifická alternatíva. Členovia musia mať zhodný typ portu, rýchlosť, duplex, native a povolené VLAN. Overujeme `show etherchannel summary` a `show interfaces port-channel`.

## Subneting VLSM

VLSM (*Variable Length Subnet Mask*) umožňuje prideliť rôznym podsieťam rôzne prefixy, aby sa adresný priestor nemíňal na veľké rovnako široké bloky. Postup:

1. spísať podsiete podľa požadovaného počtu hostiteľov,
2. zoradiť ich od najväčšej,
3. pre každú zvoliť počet hostiteľských bitov `h`, aby `2^h - 2` pokrylo hostiteľov,
4. prideliť zarovnaný blok a pokračovať od nasledujúcej adresy,
5. overiť sieťovú adresu, rozsah, broadcast a že sa bloky neprekrývajú.

Pre `192.168.10.0/24` a potreby 100, 50, 20 a 10 hostiteľov môže byť návrh:

| Potreba | Prefix | Sieť | Použiteľné adresy | Broadcast |
|---:|---:|---|---|---|
| 100 | `/25` | `192.168.10.0` | `.1 – .126` | `.127` |
| 50 | `/26` | `192.168.10.128` | `.129 – .190` | `.191` |
| 20 | `/27` | `192.168.10.192` | `.193 – .222` | `.223` |
| 10 | `/28` | `192.168.10.224` | `.225 – .238` | `.239` |

Zvyšný priestor `.240 – .255` ostáva na ďalšie zarovnané podsiete. Pri point-to-point linke môže byť podľa technológie vhodný aj `/31`; vždy treba zohľadniť pravidlá konkrétneho zariadenia.

## Krátka ústna odpoveď

Algoritmus je konečný a jednoznačný postup; vo vývojovom diagrame ovál znamená začiatok/koniec, obdĺžnik činnosť, rovnobežník vstup/výstup a kosoštvorec rozhodnutie. Redundantné L2 linky vytvárajú slučky, preto ich riadi STP/RSTP. EtherChannel združuje porty do jedného logického kanála pomocou LACP alebo PAgP. VLSM prideľuje rôzne prefixy podľa počtu hostiteľov a bloky musia byť zarovnané a neprekrývať sa.
