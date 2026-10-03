---
title: "M07 – DHCPv4"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 7
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, dhcp, poznámky]
---

# M07 – DHCPv4

> [!info] Súvisí s maturitou
> [[T16 – Protokol DHCP]] · späť na [[CCNA2 – SRWE]]

## Ako to funguje
Server **prenajme** (lease) adresu z poolu na obmedzený čas; klient si ju musí predlžovať.

**Získanie prenájmu (DORA), 4 kroky:**
1. **DHCPDISCOVER** – klient → broadcast
2. **DHCPOFFER** – server ponúkne IP
3. **DHCPREQUEST** – klient o ňu požiada (broadcast → ostatné servery vedia, že si vybral)
4. **DHCPACK** – server potvrdí

**Obnova (pred vypršaním), 2 kroky:** DHCPREQUEST → DHCPACK
Porty: server **UDP 67**, klient **UDP 68**.

## Cisco router ako DHCPv4 server
```
R1(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.9   ! 1. vylúčiť (brána, servery…)
R1(config)# ip dhcp excluded-address 192.168.10.254
R1(config)# ip dhcp pool LAN-POOL-1                               ! 2. pool
R1(dhcp-config)# network 192.168.10.0 255.255.255.0               ! 3. nastavenia poolu
R1(dhcp-config)# default-router 192.168.10.1
R1(dhcp-config)# dns-server 192.168.11.5
R1(dhcp-config)# domain-name example.com
R1(dhcp-config)# lease 7                                          ! dni [hodiny [min]] | infinite
```
(`netbios-name-server` = WINS, dnes sa neodporúča.)

Overenie:
```
show running-config | section dhcp
show ip dhcp binding               ! IP ↔ MAC
show ip dhcp server statistics
```
Služba je **predvolene zapnutá**: `no service dhcp` / `service dhcp`.
(Zmazanie bindingov / reštart služby → môžu vzniknúť dočasne duplicitné IP.)

## DHCP relay
Router **nepreposiela broadcasty** → server v inej sieti nie je dosiahnuteľný. Riešenie na rozhraní **smerom ku klientom**:
```
R1(config)# interface g0/0/0
R1(config-if)# ip helper-address 192.168.11.6
R1# show ip interface g0/0/0
```
`ip helper-address` predvolene preposiela **8 UDP služieb**: 37 Time, 49 TACACS, 53 DNS, **67/68 DHCP**, 69 TFTP, 137/138 NetBIOS.
Na PC: `ipconfig /release`, `ipconfig /renew`, `ipconfig /all`.

## Router ako DHCPv4 klient
(napr. SOHO router ku káblovému/DSL modemu)
```
SOHO(config)# interface g0/0/1
SOHO(config-if)# ip address dhcp
SOHO(config-if)# no shutdown
SOHO# show ip interface g0/0/1      ! „Address determined by DHCP“
```
Domáce routery: typ internetového pripojenia = **Automatic Configuration – DHCP**.
