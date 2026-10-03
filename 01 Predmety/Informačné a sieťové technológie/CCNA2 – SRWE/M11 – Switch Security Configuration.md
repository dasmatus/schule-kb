---
title: "M11 – Switch Security Configuration"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 11
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, bezpečnosť, poznámky]
---

# M11 – Switch Security Configuration

> [!info] Súvisí s maturitou
> [[T07 – Kybernetická bezpečnosť]] (zabezpečenie sietí a zariadení) · späť na [[CCNA2 – SRWE]]

## Nepoužívané porty
```
S1(config)# interface range fa0/8 - 24
S1(config-if-range)# shutdown
```

## Port security
Funguje len na **access** porte (na dynamickom: „Command rejected: … is a dynamic port“).
```
S1(config-if)# switchport mode access
S1(config-if)# switchport port-security                       ! predvolene: max 1 MAC, shutdown
S1(config-if)# switchport port-security maximum 2             ! 1–8192
S1(config-if)# switchport port-security mac-address aaaa.bbbb.1234   ! statická
S1(config-if)# switchport port-security mac-address sticky    ! naučí sa + zapíše do running-config
```
Tri spôsoby učenia MAC: **ručne (static)**, **dynamicky**, **dynamicky sticky**.

### Aging
```
switchport port-security aging { static | time <0-1440 min> | type { absolute | inactivity } }
```
- **absolute** – zmaže sa po čase bez ohľadu na prevádzku
- **inactivity** – zmaže sa, len ak za ten čas nebola prevádzka

### Režimy porušenia (violation)
```
switchport port-security violation { protect | restrict | shutdown }
```
| Režim | Zahodí prevádzku | Syslog | Počítadlo porušení | Vypne port |
|---|---|---|---|---|
| **Protect** | ✅ | ❌ | ❌ | ❌ |
| **Restrict** | ✅ | ✅ | ✅ | ❌ |
| **Shutdown** (predvolený) | ✅ | ✅ | ✅ | ✅ → **err-disabled** |

**Obnova z err-disabled:** odstráň príčinu, potom na rozhraní `shutdown` → `no shutdown`.
(LED portu nesvieti, `show interface` → `down, line protocol is down (err-disabled)`, port status `Secure-shutdown`.)

### Overenie
```
show port-security                       ! prehľad všetkých portov
show port-security interface fa0/1
show port-security address               ! SecureSticky / SecureConfigured
show run interface fa0/1
```

## VLAN útoky – 5 krokov
1. DTP vypnúť na ne-trunk portoch → `switchport mode access`
2. Nepoužívané porty vypnúť **a** dať do nepoužívanej VLAN
3. Trunky nastaviť ručne → `switchport mode trunk`
4. DTP vypnúť na trunkoch → `switchport nonegotiate`
5. Native VLAN ≠ VLAN 1 → `switchport trunk native vlan 999`
```
S1(config)# interface range fa0/17 - 20
S1(config-if-range)# switchport mode access
S1(config-if-range)# switchport access vlan 1000
S1(config-if-range)# shutdown
```

## DHCP snooping
Porty sú **trusted** (k skutočnému DHCP serveru / uplinky) alebo **untrusted** (všetko ostatné, predvolene). Serverové DHCP správy (OFFER, ACK) z untrusted portu sa **zahodia**. Vytvára **DHCP snooping binding tabuľku** (MAC, IP, lease, VLAN, port).
```
S1(config)# ip dhcp snooping                         ! 1. zapnúť globálne
S1(config)# interface f0/1
S1(config-if)# ip dhcp snooping trust                ! 2. dôveryhodný port
S1(config)# interface range f0/5 - 24
S1(config-if-range)# ip dhcp snooping limit rate 6   ! 3. max DISCOVER/s na untrusted
S1(config)# ip dhcp snooping vlan 5,10,50-52         ! 4. pre ktoré VLAN
S1# show ip dhcp snooping
S1# show ip dhcp snooping binding
```

## DAI (Dynamic ARP Inspection)
**Vyžaduje DHCP snooping** (používa jeho binding tabuľku). Kontroluje IP↔MAC v ARP správach na untrusted portoch, neprepustí neplatné/gratuitous odpovede.
```
S1(config)# ip dhcp snooping
S1(config)# ip dhcp snooping vlan 10
S1(config)# ip arp inspection vlan 10
S1(config)# interface fa0/24
S1(config-if)# ip dhcp snooping trust
S1(config-if)# ip arp inspection trust
S1(config)# ip arp inspection validate src-mac dst-mac ip    ! v JEDNOM riadku – každý nový príkaz prepíše predošlý!
```
Zásady: snooping + DAI na VLAN, uplinky/trunky trusted, access porty untrusted.

## STP – PortFast a BPDU Guard
```
S1(config-if)# spanning-tree portfast                  ! len k jednému koncovému zariadeniu!
S1(config)# spanning-tree portfast default             ! všetky access porty
S1(config-if)# spanning-tree bpduguard enable
S1(config)# spanning-tree portfast bpduguard default   ! BPDU Guard na všetky PortFast porty
S1# show spanning-tree summary
S1# show running-config | begin span
```
BPDU Guard zapínaj **vždy** spolu s PortFast. Prijaté BPDU → **err-disabled**.
