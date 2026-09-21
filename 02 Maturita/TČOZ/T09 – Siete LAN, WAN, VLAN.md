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

## Krátka ústna odpoveď

LAN je lokálna sieť, WAN spája vzdialené LAN. Topológia môže byť zbernica, hviezda, kruh, strom, mesh alebo hybrid; najčastejšia je hierarchická hviezda so switchmi. Intranet je interná sieť a extranet dáva obmedzený prístup partnerom. Tradičné siete oddeľovali hlas, dáta a video, konvergované ich prenášajú spoločne s QoS. Pri výpočtoch používam `+`, `-`, `*`, `/` a `%` s ohľadom na typ a prioritu operátorov.
