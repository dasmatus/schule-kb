---
title: "Pevné disky"
predmet: "Informačné a sieťové technológie"
typ: "referát"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2025
zdroj: "99 Zdroje/docx/Pevné disky.docx"
obrázky: 4
tags:
  - ist
  - hardvér
  - referát
---

# Pevné disky

> [!info] Zdrojový dokument
> `Pevné disky.docx` — [[Pevné disky.docx|otvoriť originál]]

STREDNÁ PRIEMYSELNÁ ŠKOLA ELEKTROTECHNICKÁ

HÁLOVA 16

**Pevné disky**

Matúš Maštena

Bratislava, 2025

# Obsah

### 1.1 Účel diskov a ich formátovanie

Disky slúžia ako primárne úložné zariadenia v počítačoch a iných zariadeniach, od rozsiahlych serverových systémov, ktoré spracovávajú rozsiahle množstvá dát, až po prenosné osobné zariadenia, ako sú smartfóny a tablety, ktoré sa využívajú na každodenné úlohy.

Disky umožňujú trvalé uloženie dát, čo znamená, že dáta zostávajú uložené aj po prerušení dodávky elektrickej energie do počítača. Táto vlastnosť je kľúčová pre fungovanie moderných počítačov, pretože umožňuje používateľom uchovávať svoju prácu, nastavenia a súbory bez obáv z ich straty pri každom reštarte zariadenia. Bez trvalého uloženia by bolo potrebné všetky dáta a nastavenia opakovane vytvárať po každom zapnutí počítača, čo by predstavovalo mimoriadnu nepraktickosť a neefektívnosť. Dáta uložené na diskoch môžu byť následne opakovane načítané, upravované a ukladané, čo ich ustanovuje za nevyhnutný nástroj pre produktivitu, zábavu a správu informácií v digitálnom veku.

Toto rozdelenie umožňuje operačnému systému efektívne zapisovať a čítať dáta, pretože poskytuje presnú adresáciu pre každú časť úložného priestoru. Počas formátovania sa vytvára tabuľka, ktorá zaznamenáva, ktoré sektory sú voľné a ktoré sú obsadené, čo umožňuje operačnému systému rýchlo lokalizovať a pristupovať k požadovaným súborom. Táto tabuľka, často označovaná ako alokačná tabuľka súborov, je kľúčovou súčasťou systému súborov a umožňuje operačnému systému spravovať úložný priestor na disku.

### 1.2 Vznik prvého pevného disku

![[pevne-disky-001.png]]

Obr.1.: IBM 305 RAMAC

Prvý pevný disk bol vyvinutý spoločnosťou IBM v roku 1956. Bol inkorporovaný do systému IBM 305 RAMAC (Random Access Method of Accounting and Control). Tento disk, známy ako IBM Model 350, disponoval kapacitou 3,75 MB, čo predstavuje hodnotu, ktorá je v porovnaní s dnešnými terabajtovými diskami značne nízka. Bol zložený z päťdesiatich diskov s priemerom 24 palcov a jeho hmotnosť presahovala jednu tonu.

Pevný disk RAMAC predstavoval revolučný pokrok, pretože umožňoval rýchly a náhodný prístup k dátam. Predtým sa počítače spoliehali na pomalšie médiá, ako boli dierne štítky a magnetické pásky, ktoré vyžadovali sekvenčný prístup. Pri sekvenčnom prístupe bolo nevyhnutné, aby počítač prečítal všetky dáta pred dosiahnutím požadovaného umiestnenia, čo zapríčiňovalo značnú časovú náročnosť. RAMAC umožnil počítačom okamžitý prístup k akémukoľvek miestu na disku, čo viedlo k výraznému urýchleniu spracovania dát. Tento skok v rýchlosti prístupu bol kľúčový pre rozvoj interaktívnych počítačových systémov a databázových aplikácií.

Vývoj RAMACu bol sprevádzaný komplexnosťou a vyžadoval prekonanie mnohých technických výziev. Inžinieri museli vyvinúť nové metódy záznamu a čítania dát na rotujúcich diskoch, rovnako ako aj precízne mechanizmy na pohyb hláv čítacích a zapisovacích zariadení. Pevný disk RAMAC bol nielen objemný, ale aj finančne náročný na prenájom, a preto nachádzal uplatnenie predovšetkým vo veľkých [[Podnik|podnikoch]] a vládnych inštitúciách. Jeho vplyv na budúcnosť výpočtovej techniky bol však neoceniteľný. Demonštroval potenciál ukladania a rýchleho načítavania rozsiahleho množstva informácií, čo podnietilo vývoj menších, cenovo dostupnejších a výkonnejších [[HDD|pevných diskov]], ktoré sa používajú dodnes.

### 1.3 Parametre pevných diskov, podľa ktorých si máme vyberať

- Kapacita
- Rýchlosť otáčania
- Rozhranie
- Veľkosť [[Cache|vyrovnávacej pamäte]]
- Priemerná prístupová doba
- Prenosová rýchlosť
- Formát
- Spoľahlivosť

### 1.4 Hlavné časti pevného disku

![[pevne-disky-002.png]]

Obr.2.: Obrázok s popisom častí disku

Pevný disk sa skladá z niekoľkých kľúčových komponentov:

- **Platne:** Kruhové disky, zhotovené z materiálov ako hliník, sklo, alebo keramika, ktoré sú pokryté magnetickým materiálom. Dáta sú uchovávané na týchto platniach.
- **Vreteno:** Motor, ktorý zabezpečuje rotáciu platní vysokou rýchlosťou.
- **Čítacie a zapisovacie hlavy:** Komponenty, ktorých funkciou je vykonávať operácie čítania a zápisu dát na platne. Tieto sa vznášajú v tesnej blízkosti povrchu platní.
- **Rameno aktuátora:** Mechanizmus, ktorý premiestňuje čítacie a zapisovacie hlavy po platniach, čím umožňuje prístup k rôznym oblastiam dát.
- **Aktuátor:** Zariadenie, ktoré riadi pohyb ramena aktuátora, a tým zaisťuje presné umiestnenie čítacích a zapisovacích hláv.
- **Radič:** Elektronická doska, ktorá koordinuje činnosť HDD, vrátane prenosu dát medzi diskom a počítačom.
- **Rozhranie:** Konektor, ktorý umožňuje pripojenie HDD k počítaču, pričom sa využívajú štandardy ako [[SATA]] alebo IDE.
- **Cache ([[Cache|vyrovnávacia pamäť]] disku):** Dočasné úložisko, v ktorom sú uchovávané často používané dáta, s cieľom urýchliť prístup k nim.

### 1.5 Tabuľka s otáčkami pevných diskov

Tabuľka 1: Otáčky diskov

| **Otáčky (RPM)** | **Čas jednej otáčky (ms)** | **Priemerná latencia (ms)** |
| --- | --- | --- |
| 5400 | 11.11 | 5.56 |
| 7200 | 8.33 | 4.17 |
| 10000 | 6.00 | 3.00 |
| 15000 | 4.00 | 2.00 |

### 1.6 Vývoj pevných diskov

![[pevne-disky-003.png]]

Obr.3.: Vývoj [[HDD|pevných diskov]]

### 1.7 Význam farebných štítkov na WD diskoch

![[pevne-disky-004.png]]

Obr.4.: Všetky disky a ich význam

### 1.8 Zdroje

- \[1\] https://imgs.search.brave.com/P-h\_NQFh5RoENTRM6tsMgW-JBfUO\_uc1wvo3fDhQsl0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2QzL0JSTDYxLUlC/TV8zMDVfUkFNQUMu/anBlZw
- \[2\] https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-9e0iwHPtYjKj71XqWvjGBFUHaDXJr6I4QJQd4kdD1Z-594HnsdtvU5TiAdIR
- \[3\] https://imgs.search.brave.com/wuIX\_tOW2zsGcO7F95WinUG3W4QZyKSjidcwVvbThIs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGl0c2RhdGFyZWNv/dmVyeS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjMvMDMv/SGlzdG9yeS1vZi1I/YXJkLURyaXZlcy5q/cGc
- \[4\] https://imgs.search.brave.com/57V2DVwD7rrwj\_hStTZz3N4n3Nlt4nkeYOgdc7OjSw0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2dkaXJlY3Rvci5j/b20vd3AtY29udGVu/dC91cGxvYWRzL21l/ZGlhLzIwMTkvMDQv/V2VzdGVybi1EaWdp/dGFsLUhERC1Db2xv/cnMtTGluZS11cC1z/aG93aW5nLWFsbC1j/b2xvcnMtaW5jbHVk/aW5nLWJsdWUtYW5k/LWJsYWNrLmpwZw
