---
title: "M09 – FHRP Concepts"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 9
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, fhrp, poznámky]
---

# M09 – FHRP Concepts

> [!info] Súvisí s maturitou
> [[T11 – Smerovanie a smerovacie protokoly]] · späť na [[CCNA2 – SRWE]]

## Problém
Hostitelia majú **jednu** default gateway. Keď padne → nedostanú sa von z LAN, aj keď existuje druhý router (ručné prepínanie brány je nepraktické).
(IPv6 berie bránu z RA, ale FHRP aj tak dá rýchlejšie prepnutie.)

## Riešenie: virtuálny router
Viac routerov sa tvári ako **jeden virtuálny router** s **virtuálnou IP + virtuálnou MAC**. Hostitelia majú ako bránu virtuálnu IP.
- **Active / forwarding** router posiela prevádzku, **standby** sleduje.

Prepnutie pri výpadku:
1. Standby prestane dostávať **Hello** od aktívneho.
2. Standby prevezme preposielanie.
3. Prevezme virtuálnu IP **aj MAC** → hostitelia nič nepoznajú.

## Možnosti FHRP
| Protokol | Poznámka |
|---|---|
| **HSRP** / HSRP for IPv6 | Cisco proprietárny, active + standby |
| **VRRPv2** | otvorený štandard (IPv4), master + backup |
| **VRRPv3** | IPv4 + IPv6, multivendor |
| **GLBP** / GLBP for IPv6 | Cisco proprietárny, redundancia + **rozkladanie záťaže** cez viac routerov |
| **IRDP** | zastarané (RFC 1256) |

## HSRP
- Skupina routerov → zvolí **active** a **standby**.
- **Priorita** 0–255, predvolene **100**; vyhráva najvyššia. Pri zhode → **najvyššia IP adresa**.
- **Preemption** – predvolene vypnutá. So zapnutou preemption router s vyššou prioritou, ktorý sa zapne neskôr, **prevezme** rolu active. Bez nej zostane active ten, kto naštartoval prvý.
- **Stavy:** Initial → Learn → Listen → Speak → Standby → Active
  - *Initial*: po zmene konfigurácie / zapnutí rozhrania
  - *Learn*: ešte nepozná virtuálnu IP
  - *Listen*: pozná VIP, nie je active ani standby, počúva hello
  - *Speak*: posiela hello, zúčastňuje sa volby
  - *Standby*: kandidát na active
  - *Active*: posiela prevádzku
- Časovače: hello **3 s**, hold **10 s**.

Konfigurácia HSRP nie je povinná pre kurz ani CCNA (len bonusová PT aktivita):
```
R1(config-if)# standby version 2
R1(config-if)# standby 1 ip 192.168.1.254
R1(config-if)# standby 1 priority 150
R1(config-if)# standby 1 preempt
R1# show standby [brief]
```
