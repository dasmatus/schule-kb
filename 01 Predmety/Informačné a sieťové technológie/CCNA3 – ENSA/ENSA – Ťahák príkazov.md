---
title: "ENSA – Ťahák príkazov"
predmet: "Informačné a sieťové technológie"
typ: "ťahák"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27 (moduly 1 – 14)"
tags:
  - ist
  - siete
  - ccna3
  - cisco-ios
  - packet-tracer
  - ťahák
---

# ENSA – Ťahák príkazov Cisco IOS

> [!tip] Na čo to je
> Všetky konfiguračné a overovacie príkazy z kurzu na jednom mieste – na Packet Tracer úlohy (ENSA PT Assessment, PČOZ) a rýchle opakovanie. Vysvetlenia sú v jednotlivých moduloch, pozri [[CCNA3 – ENSA]].

## Základ (platí všade)

```text
enable
configure terminal
hostname R1
interface g0/0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown
 description LAN
exit
do show ip interface brief        ! show príkaz z config módu
copy running-config startup-config
```

## OSPFv2 ([[ENSA 02 – Konfigurácia OSPFv2]])

```text
router ospf 10
 router-id 1.1.1.1
 network 10.10.1.0 0.0.0.255 area 0
 network 10.1.1.5 0.0.0.0 area 0          ! presne jedno rozhranie
 passive-interface g0/0/1                 ! LAN – neposielať Hello
 passive-interface default                ! všetko pasívne…
 no passive-interface g0/0/0              ! …okrem linky k susedovi
 auto-cost reference-bandwidth 10000      ! rovnako na všetkých routeroch
 default-information originate            ! na ASBR, ktorý má default route
!
interface g0/0/0
 ip ospf 10 area 0                        ! OSPF priamo na rozhraní
 ip ospf network point-to-point           ! bez volieb DR/BDR
 ip ospf priority 255                     ! 0 = nikdy DR/BDR
 ip ospf cost 30
 ip ospf hello-interval 5
 ip ospf dead-interval 20
!
ip route 0.0.0.0 0.0.0.0 s0/1/1           ! default route na ASBR
clear ip ospf process                     ! po zmene RID / pre novú voľbu DR
```

Overenie: `show ip ospf neighbor` · `show ip protocols` · `show ip ospf` · `show ip ospf interface [brief]` · `show ip route ospf` · `show ip ospf database`

## ACL ([[ENSA 05 – Konfigurácia IPv4 ACL]])

```text
! štandardná číslovaná (1-99, 1300-1999) – blízko CIEĽA
access-list 10 remark Povol LAN 20
access-list 10 permit 192.168.20.0 0.0.0.255
access-list 10 deny host 192.168.10.10
! štandardná pomenovaná
ip access-list standard ADMIN-HOST
 permit host 192.168.10.10
 deny any
! rozšírená (100-199, 2000-2699) – blízko ZDROJA
access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq www
access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq 443
access-list 120 permit tcp any 192.168.10.0 0.0.0.255 established
ip access-list extended NO-FTP
 deny tcp 192.168.10.0 0.0.0.255 any eq ftp
 permit ip any any
! aplikovanie
interface g0/0/0
 ip access-group 110 in
line vty 0 4
 access-class ADMIN-HOST in               ! VTY = access-class!
! úprava pomocou sekvenčných čísel
ip access-list standard 1
 no 10
 15 deny 192.168.10.5
```

Overenie: `show access-lists` · `show ip interface g0/0/0` · `clear access-list counters`

## NAT / PAT ([[ENSA 06 – NAT pre IPv4]])

```text
! statický
ip nat inside source static 192.168.10.254 209.165.201.5
! dynamický
ip nat pool NAT-POOL1 209.165.200.226 209.165.200.240 netmask 255.255.255.224
access-list 1 permit 192.168.0.0 0.0.255.255
ip nat inside source list 1 pool NAT-POOL1
! PAT – jedna adresa rozhrania
ip nat inside source list 1 interface s0/1/1 overload
! PAT – pool
ip nat inside source list 1 pool NAT-POOL1 overload
! rozhrania (NEZABUDNÚŤ!)
interface g0/0/0
 ip nat inside
interface s0/1/1
 ip nat outside
```

Overenie: `show ip nat translations [verbose]` · `show ip nat statistics` · `clear ip nat statistics` · `clear ip nat translation *`

## Správa siete ([[ENSA 10 – Správa siete]])

```text
cdp run / no cdp run
interface g0/0/1
 cdp enable / no cdp enable
lldp run
interface g0/0/1
 lldp transmit
 lldp receive
ntp server 209.165.200.225
ntp master 1
service timestamps log datetime
logging host 192.168.1.50
logging trap notifications
logging on
snmp-server community PUBLIC ro
snmp-server community PRIVATE rw
boot system flash0:isr4200-universalk9_ias.16.09.04.SPA.bin
config-register 0x2102
```

Overenie: `show cdp neighbors [detail]` · `show lldp neighbors [detail]` · `show clock detail` · `show ntp associations` · `show ntp status` · `show logging` · `show version` · `show flash:` · `show file systems`

Záloha: `copy running-config tftp` · `copy startup-config tftp` · `copy tftp running-config` · `copy tftp: flash:` · `copy running-config usbflash0:/`

## Troubleshooting ([[ENSA 12 – Riešenie problémov v sieti]])

| Na čo | Cisco IOS | Windows / Linux |
| --- | --- | --- |
| rozhrania | `show ip interface brief`, `show interfaces` | `ipconfig /all`, `ifconfig` / `ip a` |
| duplex, chyby | `show interfaces g0/0/0` | – |
| ARP / susedia | `show arp`, `show ipv6 neighbors` | `arp -a`, `netsh interface ipv6 show neighbor` |
| MAC tabuľka | `show mac address-table` | – |
| brána / trasy | `show ip route`, `show ipv6 route` | `route print`, `ip route` |
| cesta | `traceroute` | `tracert` / `traceroute` |
| L4 test | `telnet <IP> <port>` | `telnet`, `Test-NetConnection` |
| ACL | `show ip access-lists`, `show ip interface` | – |
| DNS | `show running-config`, `ip host` | `nslookup` |
| CPU / pamäť | `show processes cpu`, `show memory` | – |
| všetko naraz | `show tech-support` | – |

## Čísla, ktoré treba vedieť

| Čo | Hodnota |
| --- | --- |
| AD: priamo pripojená / statická / OSPF / RIP / EIGRP | 0 / 1 / **110** / 120 / 90 |
| OSPF multicast all routers / DR+BDR | **224.0.0.5** / **224.0.0.6** |
| OSPF Hello / Dead (default) | **10 s / 40 s** |
| OSPF priorita default / rozsah | **1** / 0 – 255 |
| OSPF reference bandwidth default | **100 Mb/s** |
| Std ACL / Ext ACL čísla | 1–99, 1300–1999 / 100–199, 2000–2699 |
| NAT timeout | 24 h |
| SNMP / trap / Syslog / NTP | UDP 161 / 162 / 514 / 123 |
| Syslog úrovne | 0 Emergency … 7 Debugging |
| Hlas: latencia / jitter / strata | ≤150 ms / ≤30 ms / ≤1 % |
| DSCP / CoS bity | 6 / 3 |

Späť: [[CCNA3 – ENSA]]
