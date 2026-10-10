---
title: "M08 – SLAAC and DHCPv6"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 8
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, ipv6, dhcp, poznámky]
---

# M08 – SLAAC and DHCPv6

> [!info] Súvisí s maturitou
> [[T19 – Vstupno-výstupné operácie a výpočty]] (DHCPv6) · [[T08 – IP protokoly]] · [[T14 – Architektúra počítača a operačné systémy]] (druhy adries IPv6) · späť na [[CCNA2 – SRWE]]

## Základ
- Router: GUA ručne cez `ipv6 address 2001:db8:acad:1::1/64`.
- Hostiteľ si **link-local** (FE80::/10) vytvorí sám hneď, ako je rozhranie aktívne. Windows ukazuje `%21` = zone/scope ID (ktoré rozhranie).
- GUA hostiteľ dostane dynamicky podľa **RA** (Router Advertisement, ICMPv6).
- **Default gateway** pre IPv6 = **link-local adresa routera, ktorý poslal RA**. DHCPv6 bránu **nikdy** nedáva.

## 3 príznaky v RA (naspamäť!)
| Príznak | Význam |
|---|---|
| **A** – Address autoconfig | 1 = vytvor si GUA sám cez **SLAAC** |
| **O** – Other config | 1 = **ostatné** údaje (DNS, doména) zober zo **stateless DHCPv6** |
| **M** – Managed | 1 = **adresu** zober zo **stateful DHCPv6** |

| Metóda | A | O | M |
|---|---|---|---|
| Len SLAAC (predvolené) | 1 | 0 | 0 |
| SLAAC + stateless DHCPv6 | 1 | **1** | 0 |
| Stateful DHCPv6 | **0** (odporúčané) | 0 | **1** |

## SLAAC
- Bez servera; prefix z RA, interface ID si hostiteľ vytvorí sám.
- Router posiela RA až po `ipv6 unicast-routing` (pridá sa do skupiny all-routers **FF02::2**). Potom je predvolene zapnutý len SLAAC.
- RA každých **200 s**, alebo hneď ako odpoveď na **RS** (Router Solicitation na FF02::2).
- **Interface ID** (64 bitov): **náhodné** alebo **EUI-64** (MAC + FFFE do stredu, otočí sa 7. bit).
- **DAD** (Duplicate Address Detection): hostiteľ pošle ICMPv6 **NS** na svoju **solicited-node multicast** adresu (FF02::1:FFxx:xxxx – posledných **24 bitov** adresy). Nikto neodpovie → adresa je unikátna.
```
R1(config)# ipv6 unicast-routing
R1# show ipv6 interface g0/0/1 | section Joined    ! FF02::1, FF02::2, FF02::1:FF..
```

## DHCPv6
Porty: klient → server **UDP 547**, server → klient **UDP 546**.
Správy: SOLICIT → ADVERTISE → REQUEST / INFORMATION-REQUEST → REPLY.

### Stateless (O=1)
Adresa cez SLAAC, DNS a pod. z DHCPv6; server **nedrží stav**.
```
R1(config)# ipv6 unicast-routing
R1(config)# ipv6 dhcp pool IPV6-STATELESS
R1(config-dhcpv6)# dns-server 2001:db8:acad:1::254
R1(config-dhcpv6)# domain-name example.com
R1(config)# interface g0/0/1
R1(config-if)# ipv6 address fe80::1 link-local
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64
R1(config-if)# ipv6 nd other-config-flag          ! O = 1
R1(config-if)# ipv6 dhcp server IPV6-STATELESS
```
Klient (router): `ipv6 enable` + **`ipv6 address autoconfig`**

### Stateful (M=1)
Server pridelí adresu a pamätá si ju (bindingy).
```
R1(config)# ipv6 dhcp pool IPV6-STATEFUL
R1(config-dhcpv6)# address prefix 2001:db8:acad:1::/64
R1(config-dhcpv6)# dns-server 2001:4860:4860::8888
R1(config-dhcpv6)# domain-name example.com
R1(config)# interface g0/0/1
R1(config-if)# ipv6 nd managed-config-flag             ! M = 1
R1(config-if)# ipv6 nd prefix default no-autoconfig    ! A = 0
R1(config-if)# ipv6 dhcp server IPV6-STATEFUL
```
Klient (router): `ipv6 enable` + **`ipv6 address dhcp`**
Pri A=1 a M=1 si Windows vezme **dve** adresy (SLAAC + DHCP) → nastav A=0.
Vrátenie: `no ipv6 nd managed-config-flag`, `no ipv6 nd prefix default no-autoconfig`, `no ipv6 nd other-config-flag`.

### Router môže byť
DHCPv6 **server**, **klient** alebo **relay agent**. Klient-router potrebuje `ipv6 unicast-routing` + link-local adresu.

### Relay
Na rozhraní **smerom ku klientom**:
```
R1(config-if)# ipv6 dhcp relay destination 2001:db8:acad:1::2 g0/0/0
```
(Výstupné rozhranie treba len vtedy, keď je next hop link-local adresa.)

## Overenie
```
show ipv6 interface g0/0/1 | begin ND      ! príznaky
show ipv6 dhcp pool
show ipv6 dhcp binding                     ! len stateful
show ipv6 dhcp interface [g0/0/1]          ! klient / relay
show ipv6 interface brief
```
