---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T13 – Komunikácia na vrstve L2

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> KOMUNIKÁCIA NA VRSTVE L2 – sieťové zariadenie switch, spôsoby prístupu na spoločné médium, datalinková vrstva, VLANy, spôsoby preposielania framov, zapojenie viacerých switchov – schéma, metódy a funkcie v programe

## Switch a linková vrstva

Linková vrstva (L2) prenáša rámce medzi zariadeniami v rovnakej lokálnej sieti. Určuje formát rámca, používa MAC adresy, riadi prístup k médiu a kontroluje chyby pomocou FCS/CRC. V modeli IEEE 802 sa často rozlišujú podvrstvy LLC a MAC.

**Switch** je zariadenie, ktoré prijme rámec na porte a podľa cieľovej MAC adresy ho odošle na vhodný port. Pri prijatí si zapíše zdrojovú MAC a port do CAM/MAC tabuľky. Ak cieľ pozná, pošle unicast iba na daný port; broadcast a neznámy unicast zaplaví na ostatné porty v rovnakej VLAN, nie na vstupný port. Tabuľka sa po čase vyprázdňuje, aby sledovala zmeny.

Rámec Ethernetu obsahuje cieľovú a zdrojovú MAC, voliteľný 802.1Q tag, typ/dĺžku, užitočné dáta a FCS. Switch vytvára samostatnú kolíznu doménu pre každý port; plný duplex dnes kolízie prakticky odstraňuje.

## Prístup na spoločné médium

Pri staršom zdieľanom half-duplex Ethernete sa používal **CSMA/CD**: stanica počúva médium, po voľnom stave vysiela, pri kolízii odošle rušivý signál a po náhodnom backoffe skúsi znova. V prepínanom full-duplex Ethernete sa kolízie nevyskytujú, preto sa CSMA/CD nepoužíva.

Wi-Fi používa **CSMA/CA**. Stanica sa pokúsi pred vysielaním počkať náhodný čas, môže použiť RTS/CTS a prijímač potvrdzuje rámec ACK. Kolízii sa skôr predchádza, pretože bezdrôtová stanica ju počas vysielania spoľahlivo nezistí. Iné technológie môžu používať riadený prístup alebo token.

## Datalinková vrstva a VLAN

VLAN logicky rozdeľuje jednu fyzickú prepínanú sieť na viac broadcastových domén. **Access port** prenáša jednu VLAN bez tagu pre koncové zariadenie. **Trunk** prenáša viac VLAN a označuje ich tagom IEEE 802.1Q; jedna VLAN môže byť native/untagged podľa konfigurácie. VLAN zmenšuje rozsah broadcastu a pomáha oddeliť používateľov, hlas, správu a servery, sama však nenahrádza firewall ani správne ACL.

## Spôsoby preposielania rámcov

- **Store-and-forward** prijme celý rámec, overí FCS a až potom ho odošle; je spoľahlivý, ale pridáva latenciu.
- **Cut-through** začne odosielať po prečítaní cieľovej MAC; má menšie oneskorenie, ale môže preposlať chybný rámec.
- **Fragment-free** čaká na prvú časť rámca, aby obmedzil preposielanie kolíznych fragmentov.

## Zapojenie viacerých switchov

Príklad logickej schémy:

```text
PC-A -- access VLAN 10 -- SW1 == trunk (10,20,30) == SW2 -- access VLAN 20 -- PC-B
                              \\== redundantný trunk ==//
```

Redundantná linka zvýši dostupnosť, ale bez riadenia vytvorí slučku a broadcastovú búrku. STP/RSTP zvolí koreňový switch, priradí náklady portom a blokuje nadbytočnú cestu; pri výpadku ju môže odblokovať. Pri trunku treba zhodne nastaviť VLAN, povolené VLAN, native VLAN a prípadne agregáciu.

## Metódy a funkcie v programe

Metóda je funkcia patriaca triede alebo objektu. Má názov, parametre, lokálne premenné a prípadnú návratovú hodnotu:

```text
funkcia vypocitajVlan(adresa):
    ak adresa začína "10.10.":
        vráť 10
    inak:
        vráť 20
```

Metódu voláme s argumentmi, jej výsledok uložíme alebo použijeme v podmienke. Rozlišujeme metódy meniace stav a čisté metódy, ktoré iba vypočítajú výsledok; pomenovanie a kontrola parametrov zlepšujú údržbu programu.

## Krátka ústna odpoveď

Linková vrstva prenáša rámce, používa MAC adresy a FCS. Switch sa učí zdrojové MAC do CAM tabuľky a známy unicast pošle na konkrétny port, kým broadcast a neznámy unicast zaplaví v rámci VLAN. Ethernet historicky používal CSMA/CD, Wi-Fi CSMA/CA. VLAN a trunk s 802.1Q oddeľujú broadcastové domény, STP rieši slučky medzi switchmi. Metóda je funkcia patriaca triede a môže mať parametre aj návratovú hodnotu.
