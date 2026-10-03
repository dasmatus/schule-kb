---
title: "ENSA 06 – NAT pre IPv4"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 6
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 6: NAT for IPv4"
tags:
  - ist
  - siete
  - ccna3
  - nat
  - konfigurácia
  - packet-tracer
---

# ENSA 06 – NAT pre IPv4

> [!abstract] Ciele modulu
> Účel NAT · typy NAT (statický, dynamický, PAT) · výhody a nevýhody · konfigurácia v CLI · NAT64.
> Súvisí s [[T08 – IP protokoly]] (typy IPv4 adries) a [[T21 – Jednoduché a zložené údajové typy]] (DualStack).

## 1. Prečo NAT

- Verejných IPv4 adries je málo → vnútri sa používajú **súkromné adresy (RFC 1918)**, ktoré sa na internete nesmerujú.
- **NAT (Network Address Translation)** prekladá súkromné adresy na verejné. Hlavný cieľ = **šetrenie verejných IPv4 adries**.

| Trieda | Rozsah RFC 1918 | Prefix |
| --- | --- | --- |
| A | 10.0.0.0 – 10.255.255.255 | 10.0.0.0/8 |
| B | 172.16.0.0 – 172.31.255.255 | 172.16.0.0/12 |
| C | 192.168.0.0 – 192.168.255.255 | 192.168.0.0/16 |

- NAT beží typicky na **hraničnom (border) routeri**, ktorý má **inside** a **outside** rozhranie. NAT router môže mať **pool** verejných adries.

## 2. NAT terminológia (najčastejšia otázka!)

Pohľad je vždy z hľadiska zariadenia, ktorého adresa sa prekladá:

- **Inside / Outside** – *koho* adresa: inside = prekladané zariadenie, outside = cieľové zariadenie.
- **Local / Global** – *kde* sa adresa objavuje: local = vnútri siete, global = vonku.

| Adresa | Príklad | Význam |
| --- | --- | --- |
| **Inside local** | 192.168.10.10 (PC1) | súkromná adresa vnútorného hosta |
| **Inside global** | 209.165.200.226 | verejná adresa, na ktorú sa PC1 preloží |
| **Outside global** | 209.165.201.10 (web server) | skutočná verejná adresa cieľa |
| **Outside local** | (zvyčajne = outside global) | adresa cieľa, ako ju vidí vnútorná sieť |

## 3. Typy NAT

| Typ | Mapovanie | Použitie |
| --- | --- | --- |
| **Statický NAT** | 1 : 1, ručne, natrvalo | servery, ktoré musia byť dostupné zvonka (web server) |
| **Dynamický NAT** | 1 : 1 z **poolu**, kto prv príde | potrebuje dosť verejných adries pre všetky súčasné relácie |
| **PAT (NAT overload)** | **N : 1** – IP + **číslo portu** | najbežnejší (domácnosti aj firmy) |

- **PAT** rozlišuje relácie podľa **zdrojového portu** – snaží sa zachovať pôvodný port, ak je obsadený, priradí prvý voľný.
- ICMP (nemá porty) PAT prekladá pomocou Query ID.
- Pri dynamickom NAT bez overload: ak je v poole 6 adries a príde 7. používateľ → **jeho požiadavka zlyhá**.

| NAT | PAT |
| --- | --- |
| 1:1 inside local ↔ inside global | jedna inside global pre mnoho inside local |
| prekladá len IPv4 adresy | prekladá IPv4 adresy **aj TCP/UDP porty** |
| každý host potrebuje unikátnu inside global | jedna inside global zdieľaná mnohými hostami |

## 4. Výhody a nevýhody

**Výhody:** šetrí verejné adresy, flexibilita pripojenia, konzistentná vnútorná adresácia (zmena ISP nevyžaduje preadresovanie vnútra), **skrýva vnútorné IP adresy** (bezpečnostný vedľajší efekt – ale NAT **nie je** bezpečnostná technológia).

**Nevýhody:** oneskorenie pri preklade, **strata end-to-end adresovania** a sledovateľnosti, problémy s **tunelovaním (IPsec)** – NAT mení hlavičky a zlyhá kontrola integrity, problémy s aplikáciami, ktoré potrebujú priame spojenie. Dvojitý NAT u poskytovateľa = **CGN (Carrier Grade NAT)**.

## 5. Statický NAT

```text
R2(config)# ip nat inside source static 192.168.10.254 209.165.201.5
R2(config)# interface serial 0/1/0
R2(config-if)# ip nat inside
R2(config-if)# interface serial 0/1/1
R2(config-if)# ip nat outside
```

Postup: 1) mapovanie inside local ↔ inside global, 2) označiť **inside** a **outside** rozhrania.

## 6. Dynamický NAT

```text
R2(config)# ip nat pool NAT-POOL1 209.165.200.226 209.165.200.240 netmask 255.255.255.224
R2(config)# access-list 1 permit 192.168.0.0 0.0.255.255
R2(config)# ip nat inside source list 1 pool NAT-POOL1
R2(config)# interface serial 0/1/0
R2(config-if)# ip nat inside
R2(config-if)# interface serial 0/1/1
R2(config-if)# ip nat outside
```

Postup: 1) **pool** (`ip nat pool`, prvá a posledná adresa + `netmask`/`prefix-length`), 2) **štandardná ACL** – ktoré adresy sa prekladajú, 3) **naviazať ACL na pool**, 4) inside/outside rozhrania.

## 7. PAT

**Jedna verejná adresa (rozhranie):**

```text
R2(config)# access-list 1 permit 192.168.0.0 0.0.255.255
R2(config)# ip nat inside source list 1 interface serial 0/1/1 overload
```

**Pool s overload:**

```text
R2(config)# ip nat pool NAT-POOL2 209.165.200.226 209.165.200.240 netmask 255.255.255.224
R2(config)# ip nat inside source list 1 pool NAT-POOL2 overload
```

Kľúčové slovo = **`overload`**.

## 8. Overovanie a mazanie

| Príkaz | Účel |
| --- | --- |
| `show ip nat translations [verbose]` | aktívne preklady (statické + dynamické); pri PAT vidno porty |
| `show ip nat statistics` | počet prekladov, pool, koľko adries pridelených, hits/misses |
| `clear ip nat statistics` | vynulovať štatistiky pred testom |
| `clear ip nat translation *` | zmazať všetky dynamické preklady |
| `ip nat translation timeout <s>` | zmena timeoutu (default **24 hodín**) |

## 9. NAT64 a IPv6

- IPv6 NAT nepotrebuje – adries je dosť. IPv6 má **ULA (unique local, fc00::/7)** – podobné RFC 1918, ale len na lokálnu komunikáciu, nie na šetrenie adries ani bezpečnosť.
- **NAT64** = preklad medzi **IPv6 a IPv4** (prístup IPv6-only ↔ IPv4-only sietí). Len **dočasné** riešenie pri migrácii.
- Prechodové techniky IPv4 → IPv6: **dual-stack** (obe naraz), **tunelovanie** (IPv6 v IPv4), **preklad** (NAT64).

## Krátka ústna odpoveď

NAT prekladá súkromné IPv4 adresy (RFC 1918) na verejné, aby sa šetrili verejné adresy. Rozlišujeme inside local (súkromná adresa hosta), inside global (jej verejný preklad), outside global a outside local. Statický NAT mapuje 1:1 natrvalo (servery), dynamický 1:1 z poolu a PAT (overload) mapuje mnoho hostov na jednu adresu pomocou portov. Konfigurácia: pool/ACL, `ip nat inside source …`, označenie rozhraní `ip nat inside/outside`, overenie `show ip nat translations`. Nevýhodou je strata end-to-end adresovania a problémy s IPsec; v IPv6 sa používa NAT64 len na prechod.

## Kvíz – kľúčové otázky z kurzu

- Adresa PC1 192.168.10.10 → **inside local**; jej preklad 209.165.200.226 → **inside global**; web server 209.165.201.10 → **outside global**.
- Adresa hosta na súkromnej sieti videná zvnútra → **inside local**.
- Statický NAT → **inside local sa preloží na určenú inside global**; úlohy: **mapovanie + označenie inside/outside rozhraní**.
- Mnoho hostov na jednu inside global → **PAT**; firma s 6000 zariadeniami a /27 blokom → **dynamický NAT s overload z poolu**.
- Aktívne preklady → `show ip nat translations`.
- Výhoda NAT na okraji siete → **zmena ISP nevyžaduje preadresovanie vnútorných zariadení**.
- Nevýhoda → **chýba end-to-end adresovanie**.
- Prečo IPv6 nepotrebuje NAT → **dosť verejných adries pre každého**.
- Čo prinesie NAT64 → **pripojenie IPv6 hostov k IPv4 sieti prekladom**.

Predchádzajúci: [[ENSA 05 – Konfigurácia IPv4 ACL]] · Ďalej: [[ENSA 07 – Koncepty WAN]] · Späť: [[CCNA3 – ENSA]]
