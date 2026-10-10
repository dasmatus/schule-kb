---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T09 – Siete LAN, WAN, VLAN

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> SIETE LAN, WAN, VLAN – topológie, intranet, extranet, základné charakteristiky siete, tradičné a konvergované siete, aritmetické operátory

LAN pokrýva malý priestor a spravuje ju organizácia, WAN prepája vzdialené LAN cez poskytovateľa. Intranet je interná sieť organizácie, extranet poskytuje vybraný prístup partnerom. Topológie sú hviezda, zbernica, kruh, strom a mesh; dnes prevažuje hviezda so switchom.

## Základné charakteristiky siete

Počítačová sieť je sústava koncových zariadení, sieťových zariadení, prenosových médií a protokolov, ktoré umožňujú zdieľanie dát a služieb. Pri opise siete sledujeme najmä:

- rozsah a geografické pokrytie,
- prenosové médium a rýchlosť/šírku pásma,
- oneskorenie, priepustnosť a straty,
- topológiu a spôsob riadenia prístupu k médiu,
- adresovanie, smerovanie, dostupnosť a redundanciu,
- bezpečnosť, správu používateľov a škálovateľnosť.

**LAN** (*Local Area Network*) pokrýva miestnosť, budovu alebo areál; Ethernet a Wi-Fi v nej zvyčajne spravuje jedna organizácia. **WAN** (*Wide Area Network*) prepája vzdialené LAN cez prenajaté linky, internet alebo sieť poskytovateľa. Medzi nimi sa niekedy uvádza MAN pre mestský rozsah a PAN pre osobné zariadenia.

## Topológie

- **zbernicová** — všetky zariadenia zdieľajú jeden kábel; je lacná, ale porucha chrbtice vyradí sieť a vznikajú kolízie,
- **hviezdicová** — zariadenia sú pripojené k centrálnemu switchu; ľahko sa spravuje, no výpadok centra zasiahne segment,
- **kruhová** — každý uzol má dvoch susedov; tok môže byť riadený jedným alebo oboma smermi,
- **stromová/hierarchická** — viac hviezd sa pripája do vrstiev prístupu, distribúcie a jadra,
- **mesh (mriežková)** — uzly majú viacero ciest; poskytuje redundanciu, ale je drahšia a zložitejšia,
- **hybridná** — kombinuje viac topológií podľa potrieb.

V dnešnej LAN prevláda hierarchická hviezda so switchmi a pri dôležitých spojoch sa dopĺňajú redundantné linky.

## Intranet a extranet

**Intranet** je interná sieť organizácie s internými aplikáciami, súbormi a službami. Prístup majú iba zamestnanci alebo iné oprávnené účty. **Extranet** sprístupní vybranú časť zdrojov partnerom, dodávateľom alebo zákazníkom. Musí byť oddelený autentifikáciou, firewallom, VPN alebo aplikačnou bránou; nie je to otvorený internet.

## VLAN v sieti

VLAN (*Virtual Local Area Network*) logicky rozdelí jednu fyzickú prepínanú sieť na viac samostatných broadcastových domén. Access port patrí do jednej VLAN, trunk prenáša viac VLAN a označuje rámce tagom IEEE 802.1Q. VLAN sa používa na oddelenie používateľov, serverov, hlasu alebo správy a zmenšuje rozsah broadcastov. Komunikácia medzi VLAN už vyžaduje router alebo multilayer switch; samotná VLAN nie je náhradou firewallu.

## Tradičné a konvergované siete

Tradičná infraštruktúra mohla mať oddelenú sieť pre hlas, inú pre dáta a ďalšiu pre video. Konvergovaná sieť prenáša všetky tieto služby na spoločnej IP infraštruktúre. Znižuje počet technológií a zjednodušuje správu, ale vyžaduje QoS, dostatočnú kapacitu, segmentáciu a zálohovanie. Hlas a video sú citlivé na oneskorenie, jitter a stratu paketov, preto sa im prideľuje priorita.

## Aritmetické operátory

Pri programovaní alebo výpočte parametrov siete používame:

`+` sčítanie, `-` odčítanie, `*` násobenie, `/` delenie a `%` zvyšok po celočíselnom delení. V mnohých jazykoch existuje aj `++`, `--`, zložené priradenie `+=` a `-=`. Treba sledovať prioritu: násobenie, delenie a modulo sa vyhodnocujú pred sčítaním a odčítaním; zátvorky poradie spresnia. Pri celočíselnom delení môže byť výsledok skrátený, preto priemer alebo pomer často vyžaduje desatinný typ.

## Porovnanie typov sietí

| | PAN | LAN | MAN | WAN |
| --- | --- | --- | --- | --- |
| rozsah | ~10 m | budova, areál | mesto | krajina, svet |
| správa | používateľ | organizácia | operátor / mesto | poskytovateľ (ISP) |
| technológie | Bluetooth, USB | Ethernet, Wi-Fi | metro Ethernet, optika | MPLS, DSL, optika, 4G/5G, prenajatá linka |
| rýchlosť | nízka | vysoká (1–10 Gb/s) | vysoká | rôzna, drahšia |

Ďalej sa rozlišuje **WLAN** (bezdrôtová LAN) a **SAN** (sieť úložísk).

## Prenosové médiá

| Médium | Dosah | Poznámka |
| --- | --- | --- |
| krútená dvojlinka UTP Cat5e / Cat6 | 100 m | 1 Gb/s, Cat6A až 10 Gb/s; najbežnejšia v LAN |
| optika multimode | stovky m | LED/VCSEL, kratšie vzdialenosti v budove |
| optika singlemode | desiatky km | laser, chrbticové a WAN spoje, odolná voči rušeniu |
| bezdrôtové (Wi-Fi) | desiatky m | 2,4 / 5 / 6 GHz, zdieľané médium |

## Hierarchický model siete

1. **Prístupová vrstva** (*access*) – pripojenie koncových zariadení, VLAN, port security, PoE
2. **Distribučná vrstva** – smerovanie medzi VLAN, ACL, redundancia
3. **Jadro** (*core*) – rýchly prenos medzi časťami siete, vysoká dostupnosť

V menších sieťach sa distribúcia a jadro zlúčia (**collapsed core**, dvojvrstvový model).

## Štyri vlastnosti spoľahlivej siete

- **odolnosť voči chybám** (*fault tolerance*) – redundantné cesty, pri výpadku sa nájde iná
- **škálovateľnosť** – sieť sa dá rozšíriť bez narušenia existujúcich služieb
- **kvalita služby** (*QoS*) – priorita pre hlas a video
- **bezpečnosť** – dôvernosť, integrita, dostupnosť

## Riešený príklad – čas prenosu

Súbor `1 GB` cez linku `100 Mb/s`: `1 GB = 8 000 Mb`, čas `8 000 / 100 = 80 s`.
Pozor na rozdiel **b** (bit) a **B** (bajt): rýchlosť sa udáva v bitoch,
veľkosť súborov v bajtoch.

## Aritmetické operátory v C#

```csharp
int a = 7, b = 2;
Console.WriteLine(a + b);          // 9
Console.WriteLine(a - b);          // 5
Console.WriteLine(a * b);          // 14
Console.WriteLine(a / b);          // 3   – celočíselné delenie
Console.WriteLine(a % b);          // 1   – zvyšok
Console.WriteLine((double)a / b);  // 3.5 – pretypovanie na desatinné číslo
a += 3;                            // a = 10
a++;                               // a = 11
Console.WriteLine(2 + 3 * 4);      // 14, nie 20 – násobenie má prednosť
```

Rozdiel `a++` a `++a`: pri `x = a++` sa do `x` uloží pôvodná hodnota a až
potom sa `a` zvýši, pri `x = ++a` sa najprv zvýši `a`.

Praktické použitie `%`: párnosť čísla (`n % 2 == 0`) alebo veľkosť bloku podsiete.

## Krátka ústna odpoveď

LAN je lokálna sieť, WAN spája vzdialené LAN. Topológia môže byť zbernica, hviezda, kruh, strom, mesh alebo hybrid; najčastejšia je hierarchická hviezda so switchmi. Intranet je interná sieť a extranet dáva obmedzený prístup partnerom. Tradičné siete oddeľovali hlas, dáta a video, konvergované ich prenášajú spoločne s QoS. Pri výpočtoch používam `+`, `-`, `*`, `/` a `%` s ohľadom na typ a prioritu operátorov.

## Súvisiace poznámky (CCNA2)

[[M03 – VLANs]] · [[M12 – WLAN Concepts]] — rozcestník [[CCNA2 – SRWE]]

## Pozri aj – CCNA3 ENSA

- [[ENSA 07 – Koncepty WAN]]
- [[ENSA 11 – Návrh siete]]

## Kontrolné otázky

> [!question]- Aký je rozdiel medzi LAN a WAN?
> LAN pokrýva malé územie, spravuje ju organizácia, je rýchla a lacná. WAN
> spája vzdialené LAN cez poskytovateľa, je pomalšia a drahšia.

> [!question]- Porovnaj hviezdicovú a mesh topológiu.
> Hviezda: všetko cez centrálny switch, jednoduchá správa, ale centrum je
> slabé miesto. Mesh: viac ciest medzi uzlami, vysoká redundancia, drahá a zložitá.

> [!question]- Čo je intranet a extranet?
> Intranet – interná sieť a služby len pre zamestnancov. Extranet – vybraná
> časť dostupná partnerom cez autentifikáciu, VPN alebo firewall.

> [!question]- Čo je konvergovaná sieť a čo potrebuje?
> Jedna IP sieť pre dáta, hlas aj video. Potrebuje QoS, dostatočnú kapacitu a
> segmentáciu, lebo hlas a video sú citlivé na oneskorenie a jitter.

> [!question]- Aké vlastnosti má mať spoľahlivá sieť?
> Odolnosť voči chybám, škálovateľnosť, QoS a bezpečnosť.

> [!question]- Opíš hierarchický model siete.
> Prístupová vrstva (koncové zariadenia), distribučná (smerovanie medzi VLAN,
> ACL), jadro (rýchly prenos).

> [!question]- Čo vypíše `7 / 2` a `7 % 2` v C#?
> `3` (celočíselné delenie) a `1` (zvyšok).

> [!question]- Ako dlho trvá prenos 1 GB pri 100 Mb/s?
> `8 000 Mb / 100 Mb/s = 80 s`.
