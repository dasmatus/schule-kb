---
title: "M04 – Inter-VLAN Routing"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 4
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, vlan, routing, poznámky]
---

# M04 – Inter-VLAN Routing

> [!info] Súvisí s maturitou
> [[T15 – Virtuálne siete VLAN]] (InterVlan routing) · [[T20 – Riadiace príkazy]] (MLS) · späť na [[CCNA2 – SRWE]]

Hostitelia v rôznych VLAN potrebujú L3 zariadenie. Tri spôsoby:

| Spôsob | Ako | Poznámka |
|---|---|---|
| **Legacy** | jedno rozhranie routera na každú VLAN, každé do access portu | neškáluje, zastarané |
| **Router-on-a-stick** | jedno fyzické rozhranie ako 802.1Q trunk + **subrozhrania** | max ~**50 VLAN** |
| **L3 switch (SVI)** | SVI pre každú VLAN + `ip routing` | moderné, HW prepínanie, najrýchlejšie |

## Router-on-a-stick
Switch: vytvor VLAN, management SVI + `ip default-gateway`, access porty a port k routeru ako **trunk**.
```
R1(config)# interface g0/0/1.10
R1(config-subif)# description Default Gateway for VLAN 10
R1(config-subif)# encapsulation dot1Q 10
R1(config-subif)# ip address 192.168.10.1 255.255.255.0
R1(config)# interface g0/0/1.99
R1(config-subif)# encapsulation dot1Q 99     ! pre native VLAN: encapsulation dot1Q 99 native
R1(config-subif)# ip address 192.168.99.1 255.255.255.0
R1(config)# interface g0/0/1
R1(config-if)# no shutdown        ! FYZICKÉ rozhranie musí byť up → zapne všetky subrozhrania
```
- Každé subrozhranie = vlastná podsieť a default gateway svojej VLAN.
- Overenie: `show ip route`, `show ip interface brief`, `show interfaces g0/0/1.10`, na switchi `show interfaces trunk`.
- Ping medzi PC má TTL 127 (jeden skok cez router).

## L3 switch (MLS)
```
D1(config)# vlan 10
D1(config)# interface vlan 10
D1(config-if)# ip address 192.168.10.1 255.255.255.0
D1(config-if)# no shutdown
D1(config)# interface g1/0/6
D1(config-if)# switchport mode access
D1(config-if)# switchport access vlan 10
D1(config)# ip routing                   ! !!! bez toho nesmeruje
```
**Routed port** (L3 linka k routeru) – vypni switchport:
```
D1(config)# interface g0/0/1
D1(config-if)# no switchport
D1(config-if)# ip address 10.10.10.2 255.255.255.0
D1(config)# ip routing
D1(config)# router ospf 10
D1(config-router)# network 192.168.10.0 0.0.0.255 area 0
```
(OSPF nie je súčasťou kurzu, v aktivitách sú príkazy zadané.)

## Riešenie problémov
| Problém | Oprava | Overenie |
|---|---|---|
| Chýba VLAN | vytvor VLAN, skontroluj VLAN portu | `show vlan [brief]` |
| Trunk port | trunk nastavený a up (nie `shutdown`), VLAN povolená | `show interfaces trunk`, `show run` |
| Access port | správna VLAN na porte, hostiteľ v správnej podsieti | `show interfaces X switchport` |
| Router | IP subrozhrania a **`encapsulation dot1Q <správna VLAN>`** | `show ip interface brief`, `show interfaces \| include Gig\|802.1Q` |

Pozor na:
- Po `no vlan 10` zostane port priradený do VLAN 10, ale je **neaktívny** → znovuvytvorenie VLAN ho oživí.
- V `(config-vlan)#` sa VLAN reálne vytvorí až po `exit`.
- Preklep `encapsulation dot1Q 100` namiesto 10 → VLAN nemá bránu.
