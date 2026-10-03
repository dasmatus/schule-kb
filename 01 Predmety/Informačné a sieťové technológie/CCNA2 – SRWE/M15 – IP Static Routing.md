---
title: "M15 – IP Static Routing"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 15
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, routing, poznámky]
---

# M15 – IP Static Routing

> [!info] Súvisí s maturitou
> [[T11 – Smerovanie a smerovacie protokoly]] · [[T21 – Jednoduché a zložené údajové typy]] (DualStack) · späť na [[CCNA2 – SRWE]]

## Syntax
```
ip route   <sieť> <maska>   { next-hop-ip | výst-rozhranie [next-hop-ip] } [AD]
ipv6 route <prefix>/<dĺžka> { next-hop-ip | výst-rozhranie [next-hop-ip] } [AD]
```
IPv6 smerovanie potrebuje `ipv6 unicast-routing`!
Typy: **štandardná**, **default**, **floating**, **summary** (+ host route).

## Možnosti next hopu
| Typ | Čo zadáš | Kedy |
|---|---|---|
| **Next-hop** | len IP next hopu | odporúčané; výstupné rozhranie sa dohľadá rekurzívne |
| **Directly connected** | len výstupné rozhranie | **len point-to-point sériové** linky |
| **Fully specified** | výstupné rozhranie + IP next hopu | **multi-access** (Ethernet); **IPv6 s link-local next hopom** |

```
R1(config)# ip route 172.16.1.0 255.255.255.0 172.16.2.2                    ! next-hop
R1(config)# ip route 172.16.1.0 255.255.255.0 s0/1/0                        ! directly connected
R1(config)# ip route 172.16.1.0 255.255.255.0 g0/0/1 172.16.2.2             ! fully specified
R1(config)# ipv6 route 2001:db8:acad:1::/64 2001:db8:acad:2::2
R1(config)# ipv6 route 2001:db8:acad:1::/64 s0/1/0 fe80::2                  ! link-local → rozhranie POVINNÉ
```
Bez rozhrania: `%Interface has to be specified for a link-local nexthop`.
V tabuľke: next-hop `S … [1/0] via 172.16.2.2`; directly connected `S … is directly connected, Serial0/1/0`.

## Default route
```
R1(config)# ip route 0.0.0.0 0.0.0.0 172.16.2.2        ! quad-zero
R1(config)# ipv6 route ::/0 2001:db8:acad:2::2
```
Zhoduje sa so všetkým (nemusí sedieť ani jeden bit) → použije sa, keď nič konkrétnejšie neexistuje. Typicky **hraničný router k ISP** a **stub router**.
V tabuľke: `S* 0.0.0.0/0 [1/0] via …` + `Gateway of last resort is 172.16.2.2`.

## Floating static route
**Záložná** trasa s **vyššou AD** ako primárna → do tabuľky sa dostane, až keď primárna zmizne.
```
R1(config)# ip route 0.0.0.0 0.0.0.0 172.16.2.2           ! primárna, AD 1
R1(config)# ip route 0.0.0.0 0.0.0.0 10.10.10.2 5         ! záloha, AD 5
R1(config)# ipv6 route ::/0 2001:db8:acad:2::2
R1(config)# ipv6 route ::/0 2001:db8:feed:10::2 5
```
- V tabuľke je len primárna; po výpadku linky → `S* 0.0.0.0/0 [5/0] via 10.10.10.2`.
- AD zálohy musí byť **vyššia** ako primárnej: záloha za OSPF (110) → napr. 115; za EIGRP (90) → napr. 95.
- `show run | include ip route` ukáže obe.

## Host routes
/32 (IPv4) alebo /128 (IPv6) – trasa na jedno konkrétne zariadenie.
1. **Automaticky** – local route (L) pri nastavení IP na rozhraní
2. **Statická host route** ručne
3. iné spôsoby (mimo rozsahu)
```
Branch(config)# ip route 209.165.200.238 255.255.255.255 198.51.100.2
Branch(config)# ipv6 route 2001:db8:acad:2::238/128 2001:db8:acad:1::2
! s link-local next hopom:
Branch(config)# no ipv6 route 2001:db8:acad:2::238/128 2001:db8:acad:1::2
Branch(config)# ipv6 route 2001:db8:acad:2::238/128 serial 0/1/0 fe80::2
```

## Overenie
```
show ip route | begin Gateway          show ipv6 route | begin C
show ip route static                   show ipv6 route static
show ip route 192.168.2.1              show ipv6 route 2001:db8:cafe:2::
show running-config | section ip route show running-config | section ipv6 route
ping, traceroute
```
