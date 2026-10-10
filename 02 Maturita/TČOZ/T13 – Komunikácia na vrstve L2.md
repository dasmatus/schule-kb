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

## Ethernetový rámec

| Pole | Veľkosť |
| --- | --- |
| preambula + SFD | 8 B (synchronizácia, do rámca sa nepočíta) |
| cieľová MAC | 6 B |
| zdrojová MAC | 6 B |
| 802.1Q tag (len na trunku) | 4 B |
| typ (EtherType, napr. `0x0800` = IPv4) | 2 B |
| dáta | 46–1500 B (MTU 1500) |
| FCS (CRC) | 4 B |

Rámec má **64 až 1518 B** (s tagom 1522 B). Kratší je *runt*, dlhší
*giant* – switch ich zahodí.

Typy cieľovej MAC: **unicast** (jedno zariadenie), **broadcast**
`FF:FF:FF:FF:FF:FF` (všetci vo VLAN), **multicast** (skupina, IPv4 začína
`01:00:5E`).

## Ako sa switch učí – príklad

1. PC-A (port 1) pošle rámec pre PC-B. Switch zapíše *MAC-A → port 1*.
2. MAC-B v tabuľke nie je → switch rámec **zaplaví** na všetky porty vo VLAN okrem portu 1.
3. PC-B (port 3) odpovie. Switch zapíše *MAC-B → port 3* a pošle rámec len na port 1.
4. Ďalšia komunikácia ide už len medzi portom 1 a 3.

Záznamy bez aktivity sa po **300 s** vymažú. Výpis: `show mac address-table`.

## Kolízne a broadcastové domény

- **hub** – všetky porty = 1 kolízna a 1 broadcastová doména
- **switch** – každý port = samostatná kolízna doména, celý switch (jedna VLAN) = 1 broadcastová doména
- **router** – každé rozhranie = samostatná broadcastová doména
- **VLAN** – každá VLAN = samostatná broadcastová doména

## STP podrobnejšie

1. **Voľba root bridge** – vyhrá najnižšie **Bridge ID** (priorita, predvolene
   32768, + MAC adresa).
2. Každý iný switch zvolí **root port** – port s najnižšou cenou cesty k rootu.
3. Na každom segmente sa zvolí **designated port**.
4. Ostatné porty sú **alternate/blocked** – neposielajú dáta, tým sa preruší slučka.

| Rýchlosť linky | Cena STP |
| --- | --- |
| 10 Mb/s | 100 |
| 100 Mb/s | 19 |
| 1 Gb/s | 4 |
| 10 Gb/s | 2 |

Klasický STP (802.1D) konverguje 30–50 s, **RSTP** (802.1w) za pár sekúnd.
Ochrana: **PortFast** na portoch ku koncovým zariadeniam a **BPDU Guard**.

## Konfigurácia prepojených switchov

```text
! SW1 aj SW2
vlan 10
 name UCITELIA
vlan 20
 name ZIACI
interface g0/1
 switchport mode trunk
 switchport trunk native vlan 99
 switchport trunk allowed vlan 10,20,99
!
spanning-tree vlan 10,20 root primary      ! len na SW1 – bude root bridge
interface range f0/1-24
 spanning-tree portfast
 spanning-tree bpduguard enable
```

## Metóda v C#

```csharp
// metóda s parametrom a návratovou hodnotou
static int UrciVlan(string ip)
{
    if (ip.StartsWith("10.10.")) return 10;
    if (ip.StartsWith("10.20.")) return 20;
    return 1;
}

// metóda bez návratovej hodnoty (void)
static void VypisPort(int port, int vlan)
{
    Console.WriteLine($"Port {port} patrí do VLAN {vlan}");
}

int vlan = UrciVlan("10.20.0.5");   // volanie s argumentom → 20
VypisPort(3, vlan);
```

## Krátka ústna odpoveď

Linková vrstva prenáša rámce, používa MAC adresy a FCS. Switch sa učí zdrojové MAC do CAM tabuľky a známy unicast pošle na konkrétny port, kým broadcast a neznámy unicast zaplaví v rámci VLAN. Ethernet historicky používal CSMA/CD, Wi-Fi CSMA/CA. VLAN a trunk s 802.1Q oddeľujú broadcastové domény, STP rieši slučky medzi switchmi. Metóda je funkcia patriaca triede a môže mať parametre aj návratovú hodnotu.

## Súvisiace poznámky (CCNA2)

[[M02 – Switching Concepts]] · [[M03 – VLANs]] · [[M05 – STP Concepts]] — rozcestník [[CCNA2 – SRWE]]

## Kontrolné otázky

> [!question]- Ako switch spracuje rámec s neznámou cieľovou MAC?
> Zapíše si zdrojovú MAC a port, rámec zaplaví na všetky porty v tej VLAN okrem
> vstupného. Keď cieľ odpovie, naučí sa aj jeho port.

> [!question]- Porovnaj CSMA/CD a CSMA/CA.
> CSMA/CD (starý half-duplex Ethernet) kolíziu zistí a vysielanie zopakuje po
> náhodnom čase. CSMA/CA (Wi-Fi) sa kolízii snaží predísť – čakanie, RTS/CTS, ACK.

> [!question]- Aké spôsoby preposielania rámcov má switch?
> Store-and-forward (celý rámec, kontrola FCS), cut-through (hneď po cieľovej
> MAC, rýchly, aj chybné rámce), fragment-free (po prvých 64 B).

> [!question]- Aký je rozdiel medzi access a trunk portom?
> Access patrí do jednej VLAN, rámce bez tagu, pre koncové zariadenia. Trunk
> prenáša viac VLAN s tagom 802.1Q, medzi switchmi a k routeru.

> [!question]- Prečo je potrebný STP a ako funguje?
> Redundantné linky vytvárajú slučky a broadcastové búrky. STP zvolí root
> bridge (najnižšie BID), určí root a designated porty a ostatné zablokuje.

> [!question]- Koľko kolíznych a broadcastových domén má switch s 24 portami a jednou VLAN?
> 24 kolíznych domén, 1 broadcastovú doménu.

> [!question]- Z čoho sa skladá ethernetový rámec?
> Cieľová a zdrojová MAC, (tag 802.1Q), typ, dáta 46–1500 B, FCS.

> [!question]- Čo je metóda a čím sa líši metóda typu void?
> Pomenovaný blok kódu v triede, môže mať parametre. Metóda `void` nevracia
> hodnotu, ostatné vracajú výsledok cez `return`.
