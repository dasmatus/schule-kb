---
title: "M01 – Basic Device Configuration"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 1
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, poznámky]
---

# M01 – Basic Device Configuration

> [!info] Súvisí s maturitou
> [[T12 – Diagnostika sietí]] · [[T24 – Objektovo orientované programovanie]] (základná konfigurácia sieťových zariadení) · späť na [[CCNA2 – SRWE]]

## Boot switchu (5 krokov)
1. **POST** z ROM – test CPU, DRAM a časti flash
2. načíta sa **boot loader** z ROM
3. boot loader spraví nízkoúrovňovú **inicializáciu CPU** (registre, mapovanie pamäte)
4. boot loader inicializuje **flash file system**
5. načíta **IOS** a odovzdá mu riadenie

- Ktorý IOS sa načíta, určuje premenná `BOOT`; ak nie je nastavená → prvý spustiteľný súbor vo flash.
- startup-config switchu = `config.text` vo flash.
- `boot system flash:/<priečinok>/<image>.bin` ju nastaví, `show boot` ju ukáže.

## LED diódy (Catalyst 2960)
SYST, RPS, STAT, DUPLX, SPEED, PoE; tlačidlo **Mode** prepína, čo ukazujú LED portov.
- SYST: nesvieti = bez napájania, zelená = OK, oranžová = napájanie je, ale chyba
- STAT portu: zelená = link, blikajúca zelená = aktivita, oranžová = blokovaný STP (prvých ~30 s), striedavo zelená/oranžová = chyba linky
- SPEED: nesvieti 10 Mb, zelená 100 Mb, blikajúca zelená 1 Gb
- DUPLX: nesvieti = half, zelená = full

## Obnova po páde – boot loader
Konzola → vytiahni napájanie → zapoj a **do 15 s drž Mode**, kým SYST bliká zeleno → pusti, keď zasvieti oranžovo a potom zeleno → prompt `switch:`.
```
switch: set                      ! ukáže cestu BOOT
switch: flash_init               ! inicializuje flash
switch: dir flash:
switch: BOOT=flash:c2960-...bin  ! nastaví nový image
switch: boot
```

## Management SVI
Na vzdialenú správu treba **SVI** s IP + maskou a **default gateway** (pre správu z iných sietí). Odporúčanie: management VLAN ≠ VLAN 1 (napr. 99).
```
S1(config)# interface vlan 99
S1(config-if)# ip address 172.17.99.11 255.255.255.0
S1(config-if)# ipv6 address 2001:db8:acad:99::11/64
S1(config-if)# no shutdown
S1(config)# ip default-gateway 172.17.99.1
S1# copy running-config startup-config
```
- SVI je down/down, kým VLAN neexistuje **a** nie je v nej aktívny aspoň jeden port.
- 2960 s IOS 15.0 potrebuje pred IPv6 `sdm prefer dual-ipv4-and-ipv6 default` + reload.
- IPv6 default gateway netreba – príde z Router Advertisement.
- IP na SVI slúži len na správu – L2 switch tým nesmeruje.

## Duplex, rýchlosť, auto-MDIX
- **Full duplex** = oba smery naraz, žiadna kolízna doména (mikrosegmentácia). **Half** = len jeden smer naraz, kolízie (huby).
- Gigabit a 10 Gb vyžadujú full duplex; porty na 1000 Mb sú len full. Optické porty majú pevnú rýchlosť a sú vždy full.
- Predvolene `auto` (2960/3560). Pri známych zariadeniach (servery, sieťové prvky) nastav rýchlosť a duplex ručne.
- Nezhoda / zlyhané autonegotiation → problémy s konektivitou.
```
S1(config-if)# duplex full
S1(config-if)# speed 100
S1(config-if)# mdix auto      ! speed aj duplex musia byť auto
S1# show controllers ethernet-controller fa0/1 phy | include MDIX
```
- Bez auto-MDIX: priamy kábel switch↔PC/router/server, krížený switch↔switch.

## Overovacie príkazy
| Príkaz | Ukáže |
|---|---|
| `show interfaces [id]` | stav + počítadlá |
| `show running-config` / `show startup-config` | konfiguráciu |
| `show flash` | súbory vo flash |
| `show version` | HW/SW, IOS image |
| `show history` | posledné príkazy |
| `show ip interface [id]` / `show ipv6 interface [id]` | L3 info |
| `show mac address-table` | MAC tabuľku |

## Čítanie `show interfaces`
`FastEthernet0/18 is up, line protocol is up` → prvé = fyzická vrstva (carrier), druhé = linková (keepalive).
- **up / down** → nezhoda enkapsulácie, druhá strana err-disabled alebo HW chyba
- **down / down** → nezapojený kábel alebo iný problém s rozhraním
- **administratively down** → bol zadaný `shutdown`

| Chyba | Význam |
|---|---|
| Input errors | súčet runts, giants, no buffer, CRC, frame, overrun, ignored |
| Runts | rámec < **64 B** (vadná NIC, kolízie) |
| Giants | rámec > **1518 B** |
| CRC | nesedí kontrolný súčet → kábel/rušenie |
| Output errors | súčet chýb, ktoré zabránili odoslaniu |
| Collisions | pri half duplex normálne, pri full **nikdy** |
| Late collisions | po **512 bitoch** → priveľmi dlhý kábel alebo **duplex mismatch** (vidno ich na strane s half) |

**Postup:** rozhranie down → skontroluj kábel, potom nezhodu rýchlosti. Rozhranie up, ale problémy → runts/giants/CRC = rušenie/dĺžka/typ kábla; kolízie = duplex mismatch → nastav full na oboch stranách.

## SSH
Telnet = TCP **23**, plaintext. SSH = TCP **22**, šifrované. IOS musí mať kryptografiu (**k9** v názve, `show version`).
```
S1# show ip ssh                           ! 1. podpora SSH
S1(config)# ip domain-name cisco.com      ! 2. doména (+ musí byť nastavený hostname)
S1(config)# crypto key generate rsa       ! 3. kľúče → zapne SSH (napr. 1024 bitov)
S1(config)# username admin secret ccna    ! 4. lokálny používateľ
S1(config)# line vty 0 15                 ! 5. vty linky
S1(config-line)# transport input ssh
S1(config-line)# login local
S1(config)# ip ssh version 2              ! 6. SSHv2
S1# show ip ssh / show ssh                ! overenie
```
`crypto key zeroize rsa` zmaže kľúče → SSH sa vypne.

## Základná konfigurácia routera
```
Router(config)# hostname R1
R1(config)# enable secret class
R1(config)# line console 0
R1(config-line)# password cisco
R1(config-line)# login
R1(config)# line vty 0 4
R1(config-line)# password cisco
R1(config-line)# login
R1(config)# service password-encryption
R1(config)# banner motd #Authorized Access Only!#
R1# copy running-config startup-config
```
Rozhrania routera sú **predvolene vypnuté**; treba IP + `no shutdown` + niečo pripojené. `description` max 240 znakov.
```
R1(config)# interface g0/0/0
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64
R1(config-if)# description Link to LAN 1
R1(config-if)# no shutdown
```
**Loopback** = logické rozhranie, vždy up, kým router beží; na testy a simuláciu sietí. Adresa musí byť unikátna.
```
R1(config)# interface loopback 0
R1(config-if)# ip address 10.0.0.1 255.255.255.0
```

## Overenie priamo pripojených sietí
- `show ip interface brief` / `show ipv6 interface brief` – prehľad stavu (chceme up/up)
- `show ipv6 interface g0/0/0` – link-local (**FE80::**, pridá sa automaticky), GUA, multicast skupiny (**FF02::1**, FF02::1:FF..)
- `show running-config interface g0/0/0`
- `show ip route` / `show ipv6 route` – **C** = pripojená sieť, **L** = local host route (/32 IPv4, /128 IPv6, AD 0)

**Filtre výstupu** za `|`: `section`, `include`, `exclude`, `begin`
```
R1# show running-config | section line vty
R1# show ip interface brief | include up
R1# show ip route | begin Gateway
```
- Výstup sa zastaví po 24 riadkoch (`--More--`); `terminal length 0` stránkovanie vypne.
- História: Ctrl+P / ↑ staršie, Ctrl+N / ↓ novšie; predvolene **10** riadkov; `terminal history size 200`; `show history`.
