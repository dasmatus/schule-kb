---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T06 – Komunikačné modely

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> KOMUNIKAČNÉ MODELY – typy modelov, PDU na jednotlivých vrstvách, IPv4, algoritmus

## Úloha komunikačných modelov

Komunikačný model rozdeľuje zložitú komunikáciu na vrstvy s presne definovanými službami a rozhraniami. Vďaka tomu možno meniť technológiu jednej vrstvy bez prepracovania celej aplikácie a ľahšie hľadať chyby. Najčastejšie sa porovnávajú referenčný model OSI a praktický model TCP/IP.

## Typy modelov a vrstvy

**OSI** má sedem vrstiev od najnižšej:

1. fyzická — bity, signály, káble a konektory,
2. linková — rámce, MAC adresy, prístup k médiu a detekcia chýb,
3. sieťová — logické adresy a smerovanie paketov,
4. transportná — spojenie koncových procesov, spoľahlivosť a porty,
5. relačná — vytvorenie, udržiavanie a ukončenie relácie,
6. prezentačná — formát, kódovanie, kompresia a šifrovanie dát,
7. aplikačná — služby priamo používané aplikáciami.

**TCP/IP** zoskupuje vrstvy do prístupovej k sieti, internetovej, transportnej a aplikačnej. OSI je najmä referenčný model; TCP/IP opisuje reálne protokoly ako Ethernet, IP, TCP, UDP, DNS a HTTP. Niekedy sa používa aj päťvrstvový model, v ktorom sú relačná a prezentačná vrstva začlenené do aplikačnej.

## PDU na jednotlivých vrstvách

PDU (*Protocol Data Unit*) je názov dátovej jednotky na konkrétnej vrstve:

| OSI vrstva | PDU | Príklad obsahu |
|---|---|---|
| aplikačná, prezentačná, relačná | dáta | HTTP správa alebo požiadavka aplikácie |
| transportná | segment pri TCP, datagram pri UDP | porty a riadenie prenosu |
| sieťová | paket/datagram | IP hlavička a cieľová IP |
| linková | rámec | zdrojová/cieľová MAC a FCS |
| fyzická | bity/signál | elektrické, optické alebo rádiové impulzy |

Pri odosielaní sa vykoná **zapuzdrenie**: dáta → segment/datagram → IP paket → rámec → bity. Prijímač vykoná opačné rozbalenie. Každá vrstva pridá vlastnú hlavičku a niekedy pätičku.

## IPv4 v modeli

IPv4 je protokol sieťovej vrstvy s 32-bitovou adresou zapisovanou štyrmi desiatkovými oktetmi, napríklad `192.168.1.10/24`. Prefix alebo maska určuje sieťovú a hostiteľskú časť. Paket môže prejsť viacerými smerovačmi; každý smerovač zníži TTL a podľa routovacej tabuľky zvolí ďalší skok. IPv4 nepoužíva porty — tie patria TCP/UDP — a neoveruje sám o sebe spoľahlivé doručenie.

## Algoritmus komunikácie

Algoritmus je konečný, jednoznačný a vykonateľný postup riešenia úlohy. Pri sieťovej komunikácii môže mať napríklad tieto kroky:

```text
získaj cieľovú IP adresu
ak cieľ patrí do lokálnej siete:
    zisti jeho MAC pomocou ARP
inak:
    zisti MAC predvolenej brány
vytvor IP paket a rámec
odošli rámec
na každom routeri vyber najdlhší zodpovedajúci prefix
opakuj, kým paket nedosiahne cieľ alebo nevyprší TTL
```

Pri návrhu algoritmu určujeme vstup, výstup, podmienky, opakovanie a ukončenie. Vývojový diagram alebo pseudokód pomáha overiť postup ešte pred programovaním.

## Krátka ústna odpoveď

Komunikačné modely delia komunikáciu na vrstvy; hlavné sú OSI a TCP/IP. Pri zapuzdrení sa z dát stanú na transportnej vrstve segment alebo datagram, na sieťovej paket, na linkovej rámec a na fyzickej vrstve bity. IPv4 používa 32-bitové adresy a smerovače podľa nich vyberajú ďalší skok. Algoritmus je presný konečný postup, ktorý možno zapísať pseudokódom alebo vývojovým diagramom.

IPv4 má 32 bitov a zapisuje sa desiatkovo s bodkami. Algoritmus je konečný, jednoznačný a vykonateľný postup riešenia; musí mať vstup, výstup a konečný počet krokov.
