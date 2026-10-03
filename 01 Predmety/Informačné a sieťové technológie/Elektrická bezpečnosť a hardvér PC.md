---
title: "Elektrická bezpečnosť a hardvér PC"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
trieda: "III.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/pdf/Elektrická bezpečnosť.pdf"
tags:
  - ist
  - hardvér
  - bezpečnosť
  - poznámky
---

# Elektrická bezpečnosť a hardvér PC

> [!info] Zdrojový dokument
> `Elektrická bezpečnosť.pdf` — PC Essentials, kap. 1 *Úvod do hardvéru osobných počítačov*. Súvisí s [[Základná doska]], [[Pamäte]], [[Pevné disky]], [[Grafické karty]] a maturitnou témou [[T14 – Architektúra počítača a operačné systémy]].

## 1. Bezpečnosť pri práci

- **Elektrická bezpečnosť** – niektoré časti (napr. zdroje tlačiarne) majú vysoké napätie aj po vypnutí; používať správny sieťový adaptér pre dané zariadenie; zariadenia musia byť **uzemnené** (prúd odteká cestou najmenšieho odporu), uzemnené musia byť aj serverové stojany.
- **ESD (elektrostatický výboj)** – človek ho pocíti od ~**3 000 V**, bolesť/zvuk od ~10 000 V, no komponent môže poškodiť už **< 30 V**. Predchádzanie:
  - súčiastky nechať v antistatických vreckách do inštalácie,
  - uzemnené rohože na stôl aj na podlahu,
  - antistatický náramok pri práci vnútri PC,
  - **samouzemnenie** – dotyk uzemneného predmetu pred prácou.

## 2. Skriňa a napájací zdroj

- **Skriňa** (case) – plast / oceľ / hliník; nesie, chráni a chladí komponenty, uzemňuje ich. Tvarové faktory: horizontálna, veža plnej veľkosti, kompaktná veža, all-in-one (HTPC pre domáce kino).
- **Zdroj** premieňa **striedavý prúd (AC)** na **jednosmerný (DC)** s nižším napätím. Typy: AT (zastaraný), ATX (zastaraný), **ATX12V** (najbežnejší, druhý konektor pre CPU), EPS12V (servery, high-end PC).
- Napätia: **3,3 V a 5 V** (digitálne obvody), **12 V** (motory diskov a ventilátorov). Konektory sú „s kľúčom“ (len jedna orientácia). Zdroj môže mať jednu alebo viac **koľajníc** (rail).

## 3. Základná doska

Chrbtica PC – **PCB** so zbernicami prepájajúcimi súčiastky. Obsahuje CPU, RAM, rozširujúce sloty, **čipovú sadu**, **BIOS / UEFI** (UEFI ho v moderných PC nahradilo; firmvér = program, cez ktorý OS ovláda hardvér) a rozhranie **SATA** (podporuje *hot swap*).

- **Severný mostík** – rýchly prístup k RAM a grafike, riadi komunikáciu CPU s ostatnými časťami.
- **Južný mostík** – pomalšie zariadenia: disky, USB, rozširujúce sloty.

## 4. CPU a chladenie

- **CPU** interpretuje a vykonáva príkazy. Výrobcovia: Intel, AMD.
- Pätica: **PGA** (piny na procesore, *ZIF* = nulová vkladacia sila) vs. **LGA** (piny v pätici).
- Chladenie: **pasívne** (chladič, zníženie rýchlosti – bez energie) vs. **aktívne** (ventilátor – potrebuje energiu).

## 5. Pamäť

| Typ | Vlastnosti |
| --- | --- |
| **ROM** | len na čítanie, **energeticky nezávislá**, štartovacie inštrukcie |
| **RAM** | dočasná, **volatilná**; viac RAM = vyšší výkon (menej výmen s diskom); maximum určuje základná doska |
| **SRAM** | najrýchlejšia, vyrovnávacia pamäť (cache) CPU |
| **DRAM** | hlavná pamäť |

- **DIP** – samostatný čip (starý); dnes **pamäťové moduly** v slote.
- Moduly jedno- / obojstranné; **jedno-, dvoj-, troj-, štvorkanálová** pamäť zvyšuje priepustnosť (treba podporu čipovej sady a správne obsadenie slotov).
- **Chyby pamäte:** *neparitná* (bez kontroly, najbežnejšia), *paritná* (8 bitov dát + 1 paritný), **ECC** (opraví 1-bitové a zistí viacbitové chyby – servery).

## 6. Adaptérové karty a sloty

Zvuková, sieťová (**NIC**), bezdrôtová, video, eSATA, záznamová, TV tuner, USB radič. Sloty: **PCI** (zastarané), **PCIe** – spätne kompatibilné, rýchlosť určuje najnižšia verzia; až 25 W do slotu, 75 W pre grafiku (+ 75 W cez PCIe konektor zo zdroja).

## 7. Úložné zariadenia

Energeticky nezávislé; magnetické, polovodičové, optické.

- **HDD** – magnetické platne, rýchlosť v **RPM** (5400 / 7200 / 10 000 / 15 000); formáty 3,5″ (PC), 2,5″ (mobilné), 1,8″.
- **SSD** – flash, bez pohyblivých častí, tichý, rýchly, menej tepla. Prevedenia: 2,5″/3,5″, rozširujúca karta, **mSATA / M.2**. **NVMe** – rozhranie SSD cez zbernicu **PCIe**.
- **SSHD** – hybrid HDD + flash cache (rýchlejší ako HDD, lacnejší ako SSD).
- **Optické mechaniky** – laser, vymeniteľné médiá.
- **Pásková** mechanika – sekvenčný prístup.

## 8. Porty, káble, adaptéry

- **Video porty:** VGA (analógový), **DVI** (DVI-D digitálny, DVI-A analógový, DVI-I oboje), HDMI (nástupca).
- **Adaptér** – fyzicky spojí dve technológie (DVI→HDMI); **prevodník** – navyše **prekladá signál** (USB 3.0 → SATA).

## 9. Vstupné a výstupné zariadenia

- **Vstupné:** pôvodné (klávesnica, myš) → dotyková obrazovka, stylus, čítačka magnetických prúžkov, čiarový kód → najnovšie: **NFC**, rozpoznávanie tváre / odtlačku / hlasu, VR headset.
- **Výstupné:** monitor (**LCD**, **LED** = LCD s LED podsvietením, **OLED** = každý pixel svieti sám, hlbšia čierna), projektor, reproduktory, slúchadlá, tlačiarne (atramentová, úderová, 3D, terminálová).
- **VR** – simulované 3D prostredie, zakrýva okolie; **AR** – prekrýva obraz reálneho sveta (Pokémon GO, smart okuliare).
