---
title: "Zostavenie PC"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/pdf/2 Zostavenie PC.pdf"
tags:
  - ist
  - hardvér
  - poznámky
---

# Zostavenie PC

> [!info] Zdrojový dokument
> `2 Zostavenie PC.pdf` — PC Essentials, kap. 2 *Zostavenie počítača*
> (výňatok 2.1.2.3 – 2.2.1). Nadväzuje na
> [[Elektrická bezpečnosť a hardvér PC]] a [[Pokročilý počítačový hardvér]];
> patrí k maturitnej téme
> [[T14 – Architektúra počítača a operačné systémy]].

Zostavovanie počítača je bežná práca IT technika. Rozhoduje **kompatibilita**
komponentov, dostatok systémových zdrojov a metodický postup. Pri výbere sa
vždy pýtame, či je lepšie komponent **upgradovať**, alebo **vymeniť**.

## 1. Skriňa a chladenie

Skriňa (case, šasi, puzdro) drží komponenty, chráni ich a zabezpečuje
prúdenie vzduchu. Jej tvarový faktor musí sedieť so **základnou doskou**
a **zdrojom**.

- **Typ:** horizontálna skriňa (HTPC), veža plnej veľkosti, kompaktná veža,
  all-in-one; výrobcovia používajú aj super tower, mid tower, mini tower či cube.
- **Veľkosť:** viac komponentov = viac priestoru na prúdenie vzduchu.
- **Zdroj:** výkon a typ konektorov musia zodpovedať základnej doske.
- **Vzhľad a LED:** kontrolky napájania, aktivity disku a režimu spánku.
- **Vetracie otvory:** zdroj má vlastný výduch, niektoré skrine majú ďalšie
  otvory vpredu/vzadu.
- **Ventilátory:** musia fúkať **rovnakým smerom** — studený vzduch dnu,
  teplý von. Opačne otočený alebo zle dimenzovaný ventilátor spôsobí, že
  prúdy vzduchu idú proti sebe.

> [!tip] Prakticky
> Skriňa sa často dodáva s predinštalovaným zdrojom. Aj tak treba overiť,
> či jeho výkon stačí na všetky komponenty.

## 2. Základná doska

Pri výbere alebo výmene základnej dosky musí platiť:

- **Pätica a čipová sada** sú kompatibilné s procesorom.
- Doska podporuje **RAM**, **grafickú kartu** a ďalšie adaptéry.
- Pri opätovnom použití CPU sedí aj **existujúci chladič a ventilátor**.
- Počet a typ **rozširujúcich slotov** zodpovedá kartám.
- **Zdroj** má vhodné konektory.
- Doska sa fyzicky zmestí do **skrine**.

**Zbernica** prenáša dáta medzi časťami počítača:

| Časť zbernice | Čo prenáša |
| --- | --- |
| **dátová** | dáta medzi komponentmi |
| **adresová** | adresy pamäťových miest, kam CPU číta alebo zapisuje |

Šírka zbernice určuje, koľko bitov prejde naraz (**32-bit** alebo
**64-bit**), rýchlosť udáva takt v **MHz / GHz**. Staršie **PCI** je
paralelná zbernica (viac bitov súčasne), **PCIe** je sériová (jeden bit,
ale oveľa rýchlejšie).

## 3. CPU a chladenie

- Procesor musí byť kompatibilný s **päticou** a **čipovou sadou** dosky.
- Rýchlosť sa udáva v **GHz**; maximálna rýchlosť je tá, pri ktorej CPU
  pracuje bez chýb.
- Výkon limitujú **oneskorenie prenosu** (tranzistory a vodiče) a
  **generovanie tepla** (viac tepla = chyby).
- **FSB** (predná zbernica) spája CPU so severným mostíkom. Frekvencia CPU
  vzniká ako FSB × multiplikátor: napr. 3200 MHz = 400 MHz × 8.
- **32-bit vs. 64-bit:** 64-bitový CPU spracuje viac inštrukcií za takt
  a podporí viac pamäte; musia ho podporovať aj OS a aplikácie.
- Chladenie je **vzduchové** alebo **kvapalinové**, vždy s chladičom a
  ventilátorom. Procesor je jedna z najdrahších a najcitlivejších súčiastok.

## 4. Pamäť RAM

- Nová RAM musí byť kompatibilná so **základnou doskou** a jej rýchlosť
  musí podporovať **čipová sada**.
- Moduly sa kupujú v **pároch** s rovnakou kapacitou, aby fungovala
  **dvojkanálová** pamäť.
- **Nevyrovnávacia (unbuffered)** RAM je bežná pre stolné PC — je rýchlejšia,
  ale má obmedzenú maximálnu kapacitu.
- **Vyrovnávacia (buffered / registered)** RAM má vlastný riadiaci čip;
  používa sa v serveroch a high-end staniciach. Do herných PC a bežných
  pracovných staníc sa nehodí, pretože je pomalšia.

## 5. Disky a optické mechaniky

**Príznaky zlyhávajúceho disku:** neobvyklé zvuky a vibrácie, chybové
hlásenia, poškodené dáta, aplikácie sa nenačítajú.

- Interné disky sa pripájajú cez **SATA**; externé cez **USB**, **eSATA**
  alebo **Thunderbolt**.
- Staršie dosky môžu mať **IDE / EIDE**. Káble SATA a eSATA vyzerajú podobne,
  ale **nie sú zameniteľné**.
- Bežné HDD majú **3,5″**, notebookové a SSD **2,5″**.
- Pri výbere disku rozhoduje: interný/externý, HDD/SSD/SSHD, výmena za
  chodu, teplo, hluk a napájanie.
- Pri viacerých diskoch nechať medzi nimi medzeru kvôli chladeniu; disk
  montovať kovovou stranou nahor.

**Optická mechanika** sa vyberá podľa konektora, čítania, zápisu a typu
média. DVD a Blu-ray môžu mať **dve vrstvy**, čím sa kapacita približne
zdvojnásobí. Mechanika sa montuje do **5,25″** pozície z prednej strany
skrine.

## 6. Adaptérové karty

Adaptérové (rozširujúce, doplnkové) karty pridávajú funkcie, ktoré doska
nemá, alebo nahrádzajú pokazenú integrovanú funkciu.

| Karta | Na čo slúži |
| --- | --- |
| **Grafická (GPU)** | výkon pre 3D hry, vysoké rozlíšenie; niekedy je integrovaná v CPU |
| **Zvuková** | kvalita zvuku, priestorový zvuk, vzorkovacia frekvencia |
| **Radič úložiska** | ďalšie interné/externé disky, RAID, odolnosť alebo rýchlosť |
| **Vstupno-výstupná** | pridanie portov (napr. USB, čítačka kariet) |
| **Sieťová (NIC)** | Wi-Fi alebo vyššia šírka pásma |
| **Záznamová** | video vstup, TV tuner, nahrávanie a strih |

Sloty sú **PCI** (staršie karty) a **PCIe** s veľkosťami **x1, x4, x8,
x16** (od najkratšieho po najdlhší). Grafické karty často potrebujú
**6- alebo 8-pinové** napájanie, niekedy dva konektory. Pred kúpou overiť
**dĺžku karty** a miesto v skrini.

## 7. Čítačky kariet a externé úložisko

Pamäťové karty sa používajú vo fotoaparátoch, telefónoch, tabletoch a
prehrávačoch:

- **SD** — až 2 TB, fotoaparáty, MP3, notebooky.
- **microSD** — najmenšia verzia, telefóny a tablety.
- **miniSD** — medzi SD a microSD, staršie mobilné telefóny.
- **CompactFlash** — starší, ale rýchly formát, bežne do 128 GB, videokamery.
- **Memory Stick** — proprietárny formát Sony.
- **xD** — staršie digitálne fotoaparáty.

Čítačka sa vyberá podľa podporovaných kariet, interná/externá, veľkosti a
typu konektora. Externé úložisko (USB kľúč, externý HDD) sa vyberá podľa
portu, kapacity, rýchlosti, prenosnosti a napájania.

## 8. Káble predného panela

Káble predného panela sa pripájajú ku konektoru **systémového panela** na
základnej doske. Obsahujú:

- **tlačidlo napájania** — zapne/vypne PC; ak nereaguje, podržať 5 a viac sekúnd,
- **tlačidlo Reset** — reštart bez vypnutia,
- **kontrolku napájania** — svieti pri zapnutí, bliká v režime spánku,
- **LED aktivity disku** — svieti/bliká pri čítaní a zápise,
- **systémový reproduktor** — pípnutie pri štarte, séria pípnutí pri chybe,
- **zvukové porty** — mikrofón, slúchadlá, externé zvukové zariadenia.

Konektory nie sú „s kľúčom“. **Pin 1** je na kábli označený šípkou a na
doske znamienkom **+**. Ak tlačidlo alebo LED nefunguje, konektor je
pravdepodobne otočený.

> [!warning] USB vs. FireWire
> Konektor na doske musí byť označený ako **USB**. FireWire je mu veľmi
> podobný — pripojenie USB kábla do FireWire konektora ho poškodí.

## 9. Rýchla kontrolka pred montážou

- [ ] Skriňa, doska a zdroj majú rovnaký tvarový faktor.
- [ ] CPU sedí do pätice a chladič je kompatibilný.
- [ ] RAM je podporovaná doskou aj čipovou sadou.
- [ ] Disky a optika majú správne rozhranie (SATA / M.2 / USB).
- [ ] Adaptérová karta má voľný slot, napájanie a miesto na dĺžku.
- [ ] Zdroj má dosť výkonu a správne konektory.
- [ ] Káble predného panela sú správne orientované (pin 1).

## Súvisiace

- [[Elektrická bezpečnosť a hardvér PC]] — bezpečnosť, komponenty a porty
- [[Pokročilý počítačový hardvér]] — POST, BIOS/UEFI, RAID, monitory, upgrade
- [[Základná doska]] — referát o doske a jej komponentoch
- [[Pamäte]] · [[Pevné disky]] · [[Grafické karty]] — referáty
- [[T14 – Architektúra počítača a operačné systémy]] — maturitná téma
