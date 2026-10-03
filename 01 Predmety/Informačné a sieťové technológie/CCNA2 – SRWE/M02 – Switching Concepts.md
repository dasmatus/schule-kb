---
title: "M02 – Switching Concepts"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 2
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, poznámky]
---

# M02 – Switching Concepts

> [!info] Súvisí s maturitou
> [[T13 – Komunikácia na vrstve L2]] (spôsoby preposielania framov) · späť na [[CCNA2 – SRWE]]

## Preposielanie
- **Ingress** = port, ktorým rámec vchádza; **egress** = port, ktorým odchádza.
- Switch rozhoduje podľa **ingress portu + cieľovej MAC**. Rámec sa nikdy nepošle späť cez port, ktorým prišiel.
- MAC tabuľka je v **CAM** (content addressable memory), preto aj „CAM tabuľka“.

### Learn & forward (každý rámec)
1. **Learn – zdrojová MAC**
   - nie je v tabuľke → pridá MAC + port
   - už je tam → obnoví časovač (predvolene **5 min**)
   - je tam, ale na inom porte → prepíše na nový port
2. **Forward – cieľová MAC**
   - známy unicast → von jedným portom
   - **unknown unicast**, broadcast, multicast → **flood** všetkými portmi okrem ingress

## Spôsoby preposielania
| | Store-and-forward | Cut-through |
|---|---|---|
| Kedy pošle | po prijatí **celého rámca** | hneď po prečítaní cieľovej MAC |
| Kontrola chýb | áno – **FCS/CRC**, chybné zahodí | nie – môže preposlať chybné |
| Buffering | áno → zvládne rôzne rýchlosti (100 Mb dnu → 1 Gb von) | – |
| Použitie | **hlavná** metóda Cisco | najnižšia latencia, HPC (≤ 10 µs) |

- **Fragment-free** = upravený cut-through: počká na prvých 64 bajtov → o niečo lepšia kontrola takmer bez latencie navyše.
- Prepínanie robí hardvér (**ASIC**).

## Domény
- **Kolízna doména:** len na **half-duplex** portoch (napr. k hubu). Full duplex = žiadne kolízie. Porty sa dohodnú na full duplex a najvyššej spoločnej rýchlosti.
- **Broadcastová doména:** prepojené switche = **jedna** broadcastová doména. Rozdelí ju len **L3 zariadenie (router)** (ten delí aj kolízne domény).
- Cieľová MAC L2 broadcastu = samé jednotky (`FF:FF:FF:FF:FF:FF`); posiela sa všetkými portmi okrem ingress.

## Ako switche znižujú zahltenie
Predvolene full duplex, a navyše:
- **rýchle porty** (access 100M/1G, distribution do 10G, core/DC 10/40/100G)
- **rýchle interné prepínanie** (interná zbernica / zdieľaná pamäť)
- **veľké buffery** (rýchly vstup → pomalý výstup bez zahadzovania)
- **vysoká hustota portov** (2×48 lacnejšie ako 4×24, prevádzka zostane lokálna)
