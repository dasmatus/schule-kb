---
title: "M06 – EtherChannel"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 6
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, etherchannel, poznámky]
---

# M06 – EtherChannel

> [!info] Súvisí s maturitou
> [[T18 – Algoritmy, vývojové diagramy a VLSM]] (EtherChannel) · späť na [[CCNA2 – SRWE]]

## Čo a prečo
Spojí **viac fyzických liniek do jednej logickej** = **port channel**. STP vidí jednu linku → nič neblokuje.
Výhody: viac šírky pásma, rozkladanie záťaže, redundancia (výpadok jednej linky nespustí prepočet STP), konfigurácia na jednom mieste (port-channel rozhranie).
Obmedzenia: max **8** liniek (Cisco s LACP až 16: 8 aktívnych + 8 standby); nedajú sa miešať typy rozhraní (FE + GE).

## Vyjednávacie protokoly
**PAgP** (Cisco proprietárny) – režimy **on / desirable / auto**
| S1 \ S2 | On | Desirable | Auto |
|---|---|---|---|
| On | ✅ | ❌ | ❌ |
| Desirable | ❌ | ✅ | ✅ |
| Auto | ❌ | ✅ | ❌ |

**LACP** (IEEE 802.3ad → dnes 802.1AX, multivendor) – režimy **on / active / passive**
| S1 \ S2 | On | Active | Passive |
|---|---|---|---|
| On | ✅ | ❌ | ❌ |
| Active | ❌ | ✅ | ✅ |
| Passive | ❌ | ✅ | ❌ |

Zapamätať: **auto+auto** a **passive+passive** → kanál nevznikne. **on** funguje len s **on** (statický, bez vyjednávania).

## Pravidlá (všetky porty v zväzku)
- rovnaká **rýchlosť a duplex**
- rovnaká **VLAN** (access) alebo všetky **trunk** s rovnakou **native VLAN** a **allowed VLAN**
- rozhrania nemusia byť vedľa seba ani na tom istom module

## Konfigurácia (LACP)
```
S1(config)# interface range fa0/1 - 2
S1(config-if-range)# channel-group 1 mode active     ! PAgP: mode desirable
S1(config)# interface port-channel 1
S1(config-if)# switchport mode trunk
S1(config-if)# switchport trunk allowed vlan 1,2,20
```
L2 nastavenia daj na **port-channel** rozhranie – prenesú sa na členské porty.

## Overenie
```
show interfaces port-channel 1
show etherchannel summary          ! príznaky: SU = L2 v použití, P = v zväzku, D = down
show etherchannel port-channel
show interfaces f0/1 etherchannel
```

## Časté problémy
- porty v rôznych VLAN / nie všetky trunk / iná native VLAN
- trunk len na niektorých portoch
- iný zoznam **allowed VLAN**
- nekompatibilné režimy (auto+auto, passive+passive, on+active…)

Oprava: `no interface port-channel 1` a znova `channel-group 1 mode …` na portoch (kvôli STP odstrániť a vytvoriť nanovo, nie upravovať).
Nepliesť si: **PAgP/LACP** = EtherChannel, **DTP** = vyjednávanie trunku.
