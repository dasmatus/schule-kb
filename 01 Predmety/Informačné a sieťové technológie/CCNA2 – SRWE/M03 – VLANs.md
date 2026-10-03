---
title: "M03 – VLANs"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 3
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, vlan, poznámky]
---

# M03 – VLANs

> [!info] Súvisí s maturitou
> [[T09 – Siete LAN, WAN, VLAN]] · [[T13 – Komunikácia na vrstve L2]] · [[T15 – Virtuálne siete VLAN]] · späť na [[CCNA2 – SRWE]]

## Prečo
VLAN = logická broadcastová doména nezávislá od fyzického umiestnenia. **1 VLAN = 1 IP podsieť.** Von z VLAN sa ide len cez router / L3 switch.
Výhody: menšie broadcastové domény, bezpečnosť, efektivita IT, nižšie náklady, výkon, jednoduchšia správa projektov/aplikácií.
Bez VLAN je aj viac podsietí na jednom switchi **jedna broadcastová doména** (ARP dostanú všetci).

## Typy VLAN
- **Default** – VLAN 1: predvolene v nej sú všetky porty, je aj native a management; **nedá sa premenovať ani zmazať**; nesie L2 riadiacu prevádzku.
- **Data / user** – prevádzka používateľov (nie hlas ani správa).
- **Native** – netagovaná prevádzka na 802.1Q trunku (predvolene VLAN 1). Odporúčanie: nepoužívaná VLAN, nie 1.
- **Management** – SSH/Telnet/HTTP(S)/SNMP na switch (predvolene VLAN 1 → zmeniť).
- **Voice** – VoIP potrebuje garantovanú šírku pásma, prioritu (QoS), obchádzanie zahltených úsekov a oneskorenie **< 150 ms**.

## Trunky a 802.1Q
- **Trunk** = point-to-point linka, ktorá nesie viac VLAN (switch↔switch, switch↔router, server s 802.1Q NIC). Nepatrí žiadnej VLAN. Predvolene povolí všetky VLAN.
- 802.1Q vloží **4-bajtový tag** a prepočíta FCS:
  - **Type/TPID** 2 B = `0x8100`
  - **User priority** 3 bity (CoS)
  - **CFI** 1 bit (Token Ring)
  - **VID** 12 bitov → až **4096** VLAN
- Native VLAN: netagovaný rámec na trunku → native VLAN (PVID). **Tagovaný rámec s VID native VLAN → zahodí sa.** Native VLAN musí byť **na oboch koncoch rovnaká**.

## Voice VLAN
Cisco IP telefón má 3-portový switch (uplink, interný port telefónu, port pre PC). Access port nesie **dve VLAN**: dátovú (netagovanú) + hlasovú (tagovanú s CoS). Switch to telefónu oznámi cez **CDP**.
```
S3(config)# vlan 20
S3(config-vlan)# name student
S3(config-vlan)# vlan 150
S3(config-vlan)# name VOICE
S3(config)# interface fa0/18
S3(config-if)# switchport mode access
S3(config-if)# switchport access vlan 20
S3(config-if)# mls qos trust cos
S3(config-if)# switchport voice vlan 150
```
(`switchport access vlan 30` pre neexistujúcu VLAN → switch ju sám vytvorí.)

## Rozsahy VLAN
- **Normal:** 1–1005 (1002–1005 pre Token Ring/FDDI; 1 a 1002–1005 sa nedajú zmazať). Ukladajú sa do **`vlan.dat`** vo flash.
- **Extended:** 1006–4094, ukladajú sa do running-config.

## Konfigurácia
```
S1(config)# vlan 20
S1(config-vlan)# name student
S1(config)# vlan 100,102,105-107        ! viac naraz
S1(config)# interface fa0/6
S1(config-if)# switchport mode access
S1(config-if)# switchport access vlan 20
S1(config)# interface range fa0/1 - 10   ! viac portov
```
- Access port je v práve **jednej dátovej VLAN** (+ prípadne jednej voice).
- Zmena: znova `switchport access vlan X`, alebo `no switchport access vlan` → späť do VLAN 1.
- Zmazanie: `no vlan 20` → jej porty sú **neaktívne** (nepresunú sa do VLAN 1!). Najprv ich preraď.
- Všetko: `delete flash:vlan.dat`. Továrenské nastavenie: `erase startup-config` + `delete vlan.dat` + reload.

Overenie:
```
show vlan [brief | id X | name N | summary]
show interfaces fa0/18 switchport
```

## Konfigurácia trunku
```
S1(config)# interface fa0/1
S1(config-if)# switchport mode trunk
S1(config-if)# switchport trunk native vlan 99
S1(config-if)# switchport trunk allowed vlan 10,20,30,99
S1# show interfaces fa0/1 switchport
S1# show interfaces trunk
```
Reset: `no switchport trunk allowed vlan`, `no switchport trunk native vlan`; späť na access: `switchport mode access`.
(2960 používa 802.1Q automaticky; iné switche môžu potrebovať `switchport trunk encapsulation dot1q`.)

## DTP (Dynamic Trunking Protocol)
Cisco proprietárny, vyjednáva trunky medzi switchmi. **Predvolene zapnutý.**
```
switchport mode { access | dynamic auto | dynamic desirable | trunk }
switchport nonegotiate     ! vypne DTP (napr. k ne-Cisco zariadeniu)
show dtp interface fa0/1
```
| | **Auto** | **Desirable** | **Trunk** | **Access** |
|---|---|---|---|---|
| **Auto** | Access | Trunk | Trunk | Access |
| **Desirable** | Trunk | Trunk | Trunk | Access |
| **Trunk** | Trunk | Trunk | Trunk | *obmedzené* |
| **Access** | Access | Access | *obmedzené* | Access |

Zapamätať: **auto + auto = access**. Predvolený režim 2960 je dynamic auto.
Odporúčanie: kde chceš trunk → `switchport mode trunk` + `switchport nonegotiate`; inde DTP vypnúť.
