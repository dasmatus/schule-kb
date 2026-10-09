---
title: "Pamäť, adaptérové karty a rozširujúce sloty"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/pdf/Externe karty.pdf"
tags:
  - ist
  - hardvér
  - poznámky
---

# Pamäť, adaptérové karty a rozširujúce sloty

> [!info] Zdrojový dokument
> `Externe karty.pdf` — PC Essentials, kap. 1.2.5 *Pamäť* a 1.2.7 *Adaptérové
> karty a rozširujúce sloty* (materiál z 7. 10. 2026). Nadväzuje na
> [[Elektrická bezpečnosť a hardvér PC]] a patrí k maturitnej téme
> [[T14 – Architektúra počítača a operačné systémy]].

## 1. Pamäť

Všetky pamäťové čipy ukladajú dáta po **bajtoch**. Bajt má **8 bitov**,
každý bit je 0 alebo 1, a reprezentuje písmeno, číslo alebo symbol.

| | ROM | RAM |
| --- | --- | --- |
| Účel | inštrukcie na štart PC a zavedenie OS | dočasné úložisko dát a programov pre CPU |
| Po vypnutí | obsah **ostane** (energeticky nezávislá) | obsah sa **vymaže** (volatilná) |
| Kde | na základnej doske a iných doskách plošných spojov | v pamäťových slotoch základnej dosky |

- **Viac RAM = vyšší výkon.** Pri malej RAM musí počítač presúvať dáta medzi
  RAM a oveľa pomalším diskom. Maximum RAM určuje **základná doska**.
- **ROM v pôvodnom zmysle** sa zapisuje pri výrobe a nedá sa vymazať ani
  prepísať. Dnes je zastaraná; slovo ROM sa používa pre akýkoľvek čip
  určený len na čítanie.

> [!note] Doplnenie (v zdroji iba obrázky)
> Na obrázkoch sú typy ROM. Bežne sa uvádzajú: **PROM** (zapíše sa raz po
> výrobe), **EPROM** (maže sa UV svetlom cez okienko na čipe), **EEPROM**
> (maže sa elektricky) a **flash** (EEPROM mazaná po blokoch, v nej je dnes
> firmvér UEFI).

### Pamäťové moduly

- **DIP** (*Dual Inline Package*) — samostatný čip s dvoma radmi pinov. V
  starých PC sa osádzal priamo na dosku, ťažko sa inštaloval a uvoľňoval sa.
- Riešenie: čipy sa prispájkovali na dosku plošných spojov a vznikol
  **pamäťový modul**, ktorý sa zasúva do slotu na základnej doske (na
  obrázkoch moduly DIMM pre stolné PC a SO-DIMM pre notebooky).
- **Jednostranný** modul má RAM na jednej strane, **obojstranný** na oboch.

### Viackanálová pamäť

Rýchlosť pamäte priamo určuje, koľko dát CPU spracuje za čas. S rýchlejším
procesorom musí rásť aj rýchlosť pamäte.

| Technológia | Súčasne prístupné moduly |
| --- | --- |
| jednokanálová (štandard) | všetky sloty sa adresujú naraz, jeden kanál |
| dvojkanálová | 2 |
| trojkanálová | 3 |
| štvorkanálová | 4, ešte väčšia šírka pásma |

Viac kanálov funguje len vtedy, ak to podporuje **čipová sada**, a využije
sa iba toľko kanálov, koľko slotov je obsadených. Sloty sa často musia
obsadzovať v predpísanom poradí.

### Vyrovnávacia pamäť (cache)

Najrýchlejšia je **SRAM** (statická RAM). Slúži ako cache pre naposledy
použité dáta a inštrukcie CPU, ktoré tak nemusí čítať z pomalšej **DRAM**
(hlavná pamäť).

### Chyby pamäte

Chyba nastane, keď dáta nie sú v čipe uložené správne.

| Typ | Ako funguje | Použitie |
| --- | --- | --- |
| **neparitná** | chyby nekontroluje | najbežnejšia, domáce a kancelárske PC |
| **paritná** | 8 bitov dát + 1 **paritný bit** | chybu zistí |
| **ECC** | zistí viacbitové chyby, **opraví jednobitové** | servery (financie, analýza dát) |

## 2. Adaptérové karty

Adaptérové karty rozširujú funkcie PC: pridávajú radiče pre konkrétne
zariadenia alebo nahrádzajú nefunkčné porty. Mnohé z nich už bývajú
**integrované na základnej doske**.

| Karta | Čo robí |
| --- | --- |
| zvukový adaptér | zvukové funkcie |
| sieťová karta (**NIC**) | pripojenie k sieti káblom |
| bezdrôtová sieťová karta | pripojenie k sieti rádiovými frekvenciami |
| **eSATA** karta | ďalšie interné a externé porty SATA cez jeden slot PCIe |
| video adaptér (grafická karta) | obraz na monitor |
| záznamová karta | prijíma video signál a softvér ho uloží na disk |
| TV tuner | sledovanie a nahrávanie TV (kábel, satelit, anténa) |
| radič USB | ďalšie USB porty |

Staršie PC mávali aj **modem**, port **AGP** (grafika) a adaptér **SCSI**.

## 3. Rozširujúce sloty

Konektor karty musí zodpovedať slotu na základnej doske.

- **PCI** (*Peripheral Component Interconnect*) — 32- alebo 64-bitový slot,
  dnes väčšinou zastaraný.
- **PCIe** (PCI Express) — dnešný štandard; šírka sa udáva počtom liniek
  (x1, x4, x8, x16).

### Verzie PCIe

| Verzia | GB/s pre x1 | GB/s pre x16 |
| --- | --- | --- |
| 2 | 0,5 | 8 |
| 3 | 0,985 | 15,75 |
| 4 | 1,969 | 31,5 |
| 5 | 3,938 | 63 |

> [!warning] Chyba v zdroji
> V PDF má posledný stĺpec hlavičku „GB/s pre x8“ a pri verzii 3 je hodnota
> **8**. Čísla pri verziách 4 a 5 (31,5 a 63) však zodpovedajú šírke **x16**;
> pri x16 má PCIe 3 hodnotu **15,75 GB/s**. Platí pravidlo, že každá ďalšia
> verzia zhruba **zdvojnásobí** priepustnosť.

- **Spätná kompatibilita:** do dosky s PCIe 4 dáš kartu PCIe 3. Rýchlosť
  určí komponent s **najnižšou verziou**.
- **Napájanie:** slot dodá až **25 W**, pre grafickú kartu až **75 W**.
  Výkonné grafiky dostanú ďalších **75 W** cez napájací konektor PCIe zo zdroja.

## Kontrolné otázky

> [!question]- Aký je rozdiel medzi ROM a RAM?
> ROM je energeticky nezávislá, obsah ostane po vypnutí, nesie štartovacie
> inštrukcie. RAM je volatilná, dočasne drží dáta a programy pre CPU.

> [!question]- Prečo pridanie RAM zrýchli počítač a čo obmedzuje jej množstvo?
> Počítač nemusí toľko presúvať dáta medzi RAM a pomalým diskom. Maximum
> určuje základná doska.

> [!question]- Čo je dvojkanálová pamäť a aké má podmienky?
> Radič pristupuje k dvom modulom súčasne, čím rastie priepustnosť. Musí to
> podporovať čipová sada a moduly musia byť v správnych slotoch.

> [!question]- Čím sa líši paritná pamäť od ECC?
> Paritná má 1 kontrolný bit na 8 bitov dát a chybu len zistí. ECC zistí aj
> viacbitové chyby a jednobitové opraví; používa sa v serveroch.

> [!question]- Na čo slúži SRAM?
> Ako cache CPU pre naposledy použité dáta a inštrukcie; je rýchlejšia než DRAM.

> [!question]- Vymenuj aspoň päť adaptérových kariet.
> NIC, bezdrôtová sieťová karta, zvuková karta, grafická karta, eSATA,
> záznamová karta, TV tuner, radič USB.

> [!question]- Aký výkon dodá slot PCIe grafickej karte?
> Až 75 W zo slotu, ďalších 75 W cez napájací konektor PCIe zo zdroja.

> [!question]- Môžem dať kartu PCIe 3 do slotu PCIe 4?
> Áno, PCIe je spätne kompatibilné. Zbernica pobeží rýchlosťou nižšej verzie.
