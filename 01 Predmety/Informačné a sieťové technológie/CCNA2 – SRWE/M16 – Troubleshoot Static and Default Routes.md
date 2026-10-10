---
title: "M16 – Troubleshoot Static and Default Routes"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 16
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, routing, diagnostika, poznámky]
---

# M16 – Troubleshoot Static and Default Routes

> [!info] Súvisí s maturitou
> [[T12 – Diagnostika sietí]] · [[T11 – Smerovanie a smerovacie protokoly]] · späť na [[CCNA2 – SRWE]]

## Cesta paketu cez 3 routery (PC1 → PC3)
1. Paket príde na R1 → nemá konkrétnu trasu → **default route** → k R2.
2. R1 zabalí paket do nového rámca; na **point-to-point** (sériovej) linke je L2 cieľ = **samé jednotky**.
3. R2 rozbalí → **statická trasa** → k R3, nový rámec (opäť samé jednotky).
4. R3 → **priamo pripojená** sieť → hľadá MAC PC3 v **ARP tabuľke** (ak chýba → ARP request / reply).
5. R3 vytvorí ethernetový rámec: zdroj = MAC jeho rozhrania, cieľ = MAC PC3 → doručené.

Každý router: rozbaliť → hľadať v smerovacej tabuľke → **nový** L2 rámec pre výstupné rozhranie. IP adresy zostávajú, MAC sa menia na každom skoku.

## Prečo sa veci kazia
Výpadok rozhrania, ISP preruší linku, saturované linky, **preklep admina**.

## Nástroje
| Príkaz | Na čo |
|---|---|
| `ping 192.168.2.1 [source g0/0/0]` | L3 konektivita; `source` = test z konkrétneho LAN rozhrania |
| `traceroute 192.168.2.1` | kde sa cesta zastaví |
| `show ip route \| begin Gateway` | je tam trasa, aký je next hop |
| `show ip interface brief` | rozhrania up/up |
| `show cdp neighbors [detail]` | aké zariadenia sú pripojené, ich IP |
| `show running-config \| include ip route` | aké statické trasy sú nastavené |

## Príklad postupu (z kurzu)
1. `R1# ping 192.168.2.1 source g0/0/0` → nejde
2. `R1# ping 172.16.2.2` (priamo pripojený R2) → OK → linka je v poriadku
3. `R1# ping 192.168.2.1` (bez source) → OK → **problém je v trase späť** do LAN R1
4. `R2# show ip route` / `show running-config | include ip route` → trasa do 172.16.3.0 ukazuje na **zlý next hop** (192.168.1.1)
5. Oprava:
```
R2(config)# no ip route 172.16.3.0 255.255.255.0 192.168.1.1
R2(config)# ip route 172.16.3.0 255.255.255.0 172.16.2.1
```
6. Znova overiť cez `ping … source`.

**Ponaučenie:** ping bez `source` overí len cestu do vzdialenej siete; **prevádzka potrebuje trasu oboma smermi**. Vždy skontroluj smerovacie tabuľky routerov na ceste v oboch smeroch.

## Typické chyby
- zlá IP next hopu (preklep, next hop nie je priamo pripojený)
- zlá maska / adresa siete
- chýba trasa späť
- chýba `ipv6 unicast-routing`, link-local next hop bez rozhrania
- floating trasa má AD nižšiu ako primárna → stane sa primárnou
- výstupné rozhranie je down → statická trasa z tabuľky zmizne
