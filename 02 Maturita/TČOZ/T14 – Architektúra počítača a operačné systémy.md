---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T14 – Architektúra počítača a operačné systémy

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> ARCHITEKTÚRA POČÍTAČA A OPERAČNÉ SYSTÉMY – základné komponenty PC, operačné systémy, blokové schémy rôznych architektúr počítača, druhy pamätí v počítači, aplikačné programy, druhy adries IPv6, objektovo orientované programovanie – trieda, objekt, ...

## Základné komponenty počítača

Osobný počítač tvoria najmä:

- **CPU** — riadiaca jednotka načítava a dekóduje inštrukcie, ALU vykonáva aritmetické a logické operácie, registre držia malé množstvo okamžitých údajov a cache zrýchľuje prístup k často používaným dátam,
- **základná doska** — prepája komponenty, obsahuje čipset, sloty, zbernice, firmware UEFI a konektory,
- **RAM** — pracovná, rýchla a spravidla volatilná pamäť,
- **úložisko** — SSD alebo HDD pre trvalé programy a dáta,
- **GPU** — vykonáva grafické a paralelné výpočty,
- **zdroj (PSU)** — mení sieťové napätie na stabilné jednosmerné napätia,
- vstupno-výstupné zariadenia, sieťový adaptér a chladiaci systém.

## Architektúry a blokové schémy

Vo **von Neumannovej architektúre** sú program aj dáta v spoločnej pamäti a komunikujú s CPU po spoločnej zbernici. Jednoduchá bloková schéma je `CPU ↔ zbernica ↔ pamäť + vstup/výstup`. Výhodou je flexibilita, nevýhodou zdieľaná cesta a takzvané von Neumannovo hrdlo.

V **Harvardskej architektúre** sú programová a dátová pamäť oddelené a môžu mať samostatné zbernice. Modifikovaná Harvardova architektúra kombinuje princípy; používa sa v mnohých procesoroch s oddelenými cache pre inštrukcie a dáta. Pri návrhu blokovej schémy treba označiť CPU, pamäť, zbernice, radiče a I/O, nie iba jednotlivé periférie.

## Druhy pamätí

Hierarchia od najrýchlejšej po pomalšiu je približne registre → cache → RAM → SSD/HDD. Registre a cache sú malé a volatilné, RAM po vypnutí stráca obsah. ROM, EEPROM a flash sú nevolatilné; firmware sa uchová aj bez napájania. SSD používa flash bez mechanických častí, HDD magnetické platne a hlavičky. Pri pamäti posudzujeme kapacitu, latenciu, priepustnosť, cenu a volatilitu.

## Operačné systémy a aplikačné programy

Operačný systém spravuje procesy a vlákna, virtuálnu pamäť, súborový systém, ovládače, používateľov, oprávnenia, sieť a bezpečnosť. Poskytuje služby, ktoré aplikácia využíva cez API. Poznáme desktopové, serverové, mobilné, embedded a real-time operačné systémy; rozdiel je v účele a požiadavkách na odozvu.

Aplikačný program rieši konkrétnu úlohu používateľa, napríklad kancelársky editor, prehliadač, databázový klient, CAD alebo vývojové prostredie. Nie je to to isté ako ovládač či jadro operačného systému.

## Druhy adries IPv6

IPv6 používa 128-bitové adresy. **Global unicast** je verejne smerovateľná, **link-local** `fe80::/10` platí iba na lokálnom linku a **unique local** `fc00::/7` je určená pre interné použitie. **Multicast** začína `ff00::/8` a nahrádza broadcast. **Anycast** priraďuje rovnakú adresu viacerým uzlom a smerovanie vyberie najbližší. `::1` je loopback a `::` je neurčená adresa.

## OOP: trieda a objekt

V objektovo orientovanom programovaní je **trieda** predloha so stavom a správaním; **objekt** je konkrétna inštancia. Atribúty uchovávajú stav a metódy definujú správanie. Zapuzdrenie obmedzuje priamy prístup, abstrakcia ukazuje podstatné vlastnosti, dedičnosť zdieľa spoločný základ a polymorfizmus umožňuje rovnaké rozhranie s rôznou implementáciou.

## Krátka ústna odpoveď

PC sa skladá z CPU, základnej dosky, RAM, úložiska, zdroja, GPU, sieťového a I/O hardvéru. Von Neumannova architektúra zdieľa pamäť programu a dát, Harvardova ich oddeľuje; pamäťová hierarchia ide od registrov cez cache a RAM po SSD/HDD. OS spravuje procesy, pamäť, súbory, ovládače a bezpečnosť, aplikácie využívajú jeho služby. IPv6 pozná global unicast, link-local, unique local, multicast a anycast. OOP používa triedy, objekty, atribúty a metódy.
