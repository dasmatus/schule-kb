---
title: "Pamäte"
predmet: "Informačné a sieťové technológie"
typ: "referát"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2025
zdroj: "99 Zdroje/docx/Pamäte.docx"
obrázky: 4
tags:
  - ist
  - hardvér
  - referát
---

# Pamäte

> [!info] Zdrojový dokument
> `Pamäte.docx` — [[Pamäte.docx|otvoriť originál]]

STREDNÁ PRIEMYSELNÁ ŠKOLA ELEKTROTECHNICKÁ

HÁLOVA 16

**Pamäte**

Matúš Maštena

Bratislava, 2025

# Obsah

## 1.1 Účel a význam pamätí do PC.

Random Access Memory (RAM) je typ pamäte počítača, ktorý slúži na krátkodobé ukladanie dát, ktoré sú aktívne používané procesorom.

Na rozdiel od dlhodobých úložných zariadení, ako sú [[HDD|pevné disky]] a SSD, ktoré uchovávajú dáta aj po ukončení prevádzky výpočtového systému, RAM vykazuje vlastnosť volatility pamäte. To znamená, že akonáhle dôjde k vypnutiu počítača, všetky dáta uložené v RAM sa vymažú. Z tohto dôvodu sa javí ako nevyhnutné pravidelné ukladanie vykonanej práce, aby sa predišlo jej prípadnej strate.

Rýchlosť a kapacita RAM majú priamy vplyv na celkovú výkonnosť výpočtového systému. Vyššia rýchlosť RAM umožňuje centrálnej procesorovej jednotke vykonávať operácie čítania a zápisu dát efektívnejšie, čo sa prejavuje rýchlejším spúšťaním programov a celkovo plynulejším chodom systému. Väčšia kapacita RAM následne umožňuje počítaču spracovávať rozsiahlejší objem úloh súčasne, čo je obzvlášť dôležité pri vykonávaní viacerých úloh naraz a spúšťaní náročných aplikácií, ako sú napríklad grafické editory alebo počítačové hry.

## 1.2 Vývoj pamätí ROM

ROM predstavuje typ pamäte, ktorý uchováva dáta permanentne. Používa sa na ukladanie nevyhnutných inštrukcií, ktoré nepodliehajú zmenám, ako napríklad firmvér pre rôzne zariadenia. Vývoj ROM prešiel niekoľkými fázami, pričom každá z týchto fáz priniesla signifikantné zlepšenia v oblasti flexibility, kapacity a jednoduchosti použitia.

Mask ROM predstavuje pamäť, kedy dáta boli zapisované do týchto čipov počas výrobného procesu, prostredníctvom špeciálnej masky. Tento proces sa vyznačoval vysokými [[Náklady|nákladmi]] a nízkou flexibilitou, pretože akákoľvek zmena v dátach si vyžadovala výrobu novej masky. Mask ROM nachádzal uplatnenie v zariadeniach, kde sa zmena obsahu pamäte nepovažovala za potrebnú, napríklad v arkádových hrách a starších počítačových systémoch. Výhodou bola nízka cena pri rozsiahlej výrobe.

PROM umožňujú používateľom vykonať zápis dát jedenkrát, a to prostredníctvom špeciálneho programovacieho zariadenia. Zápis sa realizoval prepálením tenkých drôtikov (poistiek) v štruktúre čipu. Hoci PROM vykazoval vyššiu flexibilitu v porovnaní s Mask ROM, keďže umožňoval programovanie po výrobe, stále neumožňoval vymazanie, čo viedlo k nepoužiteľnosti čipu v prípade výskytu chyby.

EPROM priniesol možnosť vymazávania a opakovaného programovania. Na vymazanie dát sa používalo ultrafialové (UV) svetlo, ktoré bolo aplikované cez špeciálne okienko umiestnené na puzdre čipu. Po vymazaní bolo možné do EPROM zapísať nové dáta. Tento typ pamäte bol často využívaný vo vývojových a prototypových zariadeniach, kde sa vyžadovala častá zmena firmvéru.

![[pamate-001.png]]

[[EEPROM]] predstavoval ďalší vývojový krok, pretože umožňoval vymazávanie a programovanie elektricky, čím sa eliminovala potreba použitia UV svetla. Táto vlastnosť umožnila jednoduchšiu aktualizáciu firmvéru priamo v zariadení. [[EEPROM]] sa používa v rôznych aplikáciách, napríklad v systémoch [[BIOS]] počítačov a v niektorých typoch pamäťových kariet. Na tento účel sa využíva tzv. flash programátor, ktorý sa dá zohnať relatívne lacno. Používajú sa primárne na inštaláciu alternatívnych [[BIOS]] systémov, ako napríklad Libreboot.

Obr.1.: Flash prográmator KeeYees S018 SOP8, ktorý stojí 16,53€ na nemeckom Amazone

![[pamate-002.png]]

Obr.2.: Notebook Thinkpad T480 so spusteným Librebootom.

[[Flash pamäť]] je typ EEPROM, ktorý sa vyznačuje vyššou hustotou, rýchlosťou a schopnosťou opakovaného prepisovania. Dáta sa zapisujú a vymazávajú v blokoch, čo umožňuje dosiahnuť vyššiu rýchlosť vykonávaných operácií. [[Flash pamäť]] sa stala dominantnou technológiou v mnohých oblastiach, vrátane USB kľúčov, diskov SSD, pamäťových kariet a mobilných telefónov.

## 1.3 Vývoj pamätí RAM

Od svojho vzniku prešla pamäť s priamym prístupom (Random Access Memory, RAM) vývojom, ktorý zásadným spôsobom ovplyvnil vývoj počítačov. Tento vývoj bol poháňaný neustálym dopytom po vyšších rýchlostiach, väčšej kapacite a zvýšenej energetickej účinnosti, čo viedlo k vzniku rôznych typov a generácií technológií RAM.

#### Skoré typy RAM

Statická RAM sa vyznačuje sa vyššou rýchlosťou prístupu k dátam v porovnaní s DRAM, pretože na uchovávanie každého bitu dát používa tranzistory, čím eliminuje potrebu neustáleho obnovovania. Používa sa pre vyrovnávaciu pamäť. Nákladnosť a nižšia hustota SRAM ju však robia menej vhodnou pre rozsiahlejšie systémové pamäte.

Dynamická RAM sa vyznačuje sa nižšou cenou a vyššou hustotou úložiska v porovnaní s SRAM. Na uchovávanie každého bitu dát používa [[Kondenzátor|kondenzátory]], ktoré sa však časom vybíjajú, čo si vyžaduje pravidelné obnovovanie (refresh) na zachovanie integrity dát. Táto požiadavka na obnovovanie prispieva k jej nižšej rýchlosti v porovnaní s SRAM. DRAM sa však vďaka svojej cenovej efektívnosti a vysokej hustote úložiska stala dominantnou technológiou pre systémovú pamäť v osobných počítačoch a serveroch.

#### SDRAM synchronizuje svoje operácie s taktovacou frekvenciou systému. Táto synchronizácia umožňuje pamäti efektívnejšie prijímať a prenášať dáta, čím sa zvyšuje celková rýchlosť a výkon systému. SDRAM sa rýchlo stala štandardnou voľbou pre počítačovú pamäť koncom 90. rokov a pripravila pôdu pre ďalší vývoj technológií RAM.

#### Double Data Rate (DDR) SDRAM

DDR umožňuje prenos dát dvakrát za jeden taktovací cyklus, raz na nábežnej hrane a raz na zostupnej hrane hodinového signálu. Táto technika zdvojnásobuje efektívnu šírku pásma pamäte, čo vedie k výraznému zvýšeniu prenosových rýchlostí dát a celkového výkonu systému.

[[DDR SDRAM|DDR2]] stavia na úspechu DDR tým, že ďalej zvyšuje prenosové rýchlosti dát a znižuje spotrebu energie. [[DDR SDRAM|DDR2]] dosahuje vyššie frekvencie prevádzky a zároveň spotrebuje menej energie vďaka vylepšeniam v prenose signálu a dizajne pamäťových modulov. Tieto vylepšenia umožňujú systémom pracovať efektívnejšie a efektívnejšie spracovávať väčšie množstvá dát.

DDR3 predstavuje ďalší významný krok vpred, ktorý ponúka ešte vyššie frekvencie, nižšiu spotrebu energie a nové funkcie, ako je napríklad zdokonalené časovanie. Vylepšené časovanie umožňuje pamäti efektívnejšie spravovať dátové prenosy, čím sa ďalej optimalizuje výkon systému. DDR3 sa stala široko používanou v osobných počítačoch a serveroch a naďalej zlepšovala možnosti multitaskingu a celkovú odozvu systému.

DDR4 nadväzuje na výhody svojich predchodcov a poskytuje ešte vyššie frekvencie, nižšiu spotrebu energie a vyššiu hustotu modulov. Zvýšená hustota modulov umožňuje systémom podporovať väčšie množstvá [[RAM|pamäte RAM]], čo umožňuje plynulejší chod náročných aplikácií a virtualizácie. DDR4 sa stala dominantnou technológiou RAM v moderných počítačových systémoch a ponúka bezkonkurenčný výkon a energetickú účinnosť.

![[pamate-003.png]]

Obr.3.: DDR4 RAM pamäte Corsair 32 GB KIT DDR4 3600 MHz CL16 Vengeance LPX Black

DDR5 predstavuje najnovšiu generáciu technológie RAM, ktorá posúva hranice výkonu a energetickej účinnosti. DDR5 ponúka výrazne vyššie rýchlosti prenosu dát, zvýšenú kapacitu a zlepšenú energetickú účinnosť v porovnaní s DDR4. Tieto vylepšenia umožňujú systémom zvládnuť čoraz náročnejšie úlohy, ako je hranie hier vo vysokom rozlíšení, strih videa v rozlíšení 8K a aplikácie umelej inteligencie. Hoci je DDR5 relatívne nová, očakáva sa, že sa v nasledujúcich rokoch stane novým štandardom.

![[pamate-004.png]]

Obr.4.: DDR5 RAM Kingston FURY 64GB KIT DDR5 6000MT/s CL30 Beast Black EXPO

## 1.4 Použité zdroje

- \[1\] https://libreboot.org/
- \[2\] https://www.amazon.de/KeeYees-SOIC8-EEPROM-CH341A-Programmer/dp/B07SNTL5V6/ref=sr\_1\_2?sr=8-2
- \[3\] https://libreboot.org/
- \[4\] https://www.alza.sk/corsair-32-gb-kit-ddr4-3600-mhz-cl16-vengeance-lpx-black-d6788178.htm?evt=ac&pos=1&sqid=LuigisBox\_37eb5ae0-9a6d-492a-be42-5731871e289d
- \[5\] https://www.alza.sk/kingston-fury-64gb-kit-ddr5-6000mt-s-cl30-beast-black-expo-d12276316.htm?o=3
