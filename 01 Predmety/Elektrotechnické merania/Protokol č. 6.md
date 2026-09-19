---
title: "Protokol č. 6"
predmet: "Elektrotechnické merania"
typ: "protokol"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2026-03-04
zdroj: "99 Zdroje/docx/pc6.docx"
obrázky: 4
tags:
  - elm
  - protokol
  - meranie
---

# Protokol č. 6

> [!info] Zdrojový dokument
> `pc6.docx` — [[pc6.docx|otvoriť originál]]

| **Stredná** **pri****e****my****se****ln****á** **š****kol****a** **e****l****e****ktrot****e****chnick****á**<br>**H****á****lov****a** **16,** **851** **01** **Brati****s****l****a****v****a** |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Meno a priezvisko:** |  | Matúš Maštena |  |  | **Protokol** **číslo:** |  |  |  | 6 |  |  |
| **Tri****ed****a:** |  | III.IST |  |  |  |  |  |  |  |  |  |
| **S****kupina:** |  | 1. |  |  | **Dátum** **m****e****r****an****ia:** |  |  |  | 4.3.2026 |  |  |
| **L****ab****orat****ó****ri****u****m:** |  | ELM3 |  |  | **Dátum** **prijatia****:** |  |  |  | 18.3.2026 |  |  |
| **PROTOKOL** **O MERANÍ** |  |  |  |  |  |  |  |  |  |  |  |
| **Ob****s****ah:**<br>1. **Úloha (1b)**<br>1. **Teoretický rozbor (1b)**<br>1. **Opis meraného predmetu (1b)**<br>1. **Schéma zapojenia (1b)**<br>1. **Súpis meracích prístrojov (1b)**<br>1. **Postup pri meraní (1b)**<br>1. **Tabuľka (2b)**<br>1. **SpracovanIe nameraných hodnôt (3b)**<br>1. **Záver (3b)**<br>1. **Graf (3b)**<br>**( Počet bodov je len orientačný – zmena je vyhradená podľa vyučujúceho)** |  |  |  | **Hodnotené** **dňa:** |  |  |  |  |  |  |  |
|  |  |  |  | **Gr****a****fi****c****k****á** **úPRAVA (3b):** |  |  |  |  |  |  |  |
|  |  |  |  | **T****ec****hni****c****ká obsahová**<br>**úr****ove****ň (17b):** |  |  |  |  |  |  |  |
|  |  |  |  | **H****od****not****e****ni****e (20b)****:** |  |  |  |  |  |  |  |
|  |  |  |  | **P****od****pi****s** **u****č****it****e****ľa:** |  |  |  |  |  |  |  |
| Názov MERANIA : Meranie kapacitnej reaktancie kondenzátora |  |  |  |  |  |  |  |  |  |  |  |
| **členovia PRI meraní, Spoluautori** |  |  |  |  |  |  |  |  |  |  |  |
| **P.Č.** | **Meno** |  | **Priezvisko** |  |  | **Člen** |  | **Spoluautor** |  |  |  |
| 1. | Matúš |  | Maštena |  |  | ÁNO | NIE | ÁNO |  |  | NIE |
| 2. | Samuel |  | Štrkula |  |  | ÁNO | NIE | ÁNO |  |  | NIE |
| 3. |  |  |  |  |  | ÁNO | NIE | ÁNO |  |  | NIE |
| 4. |  |  |  |  |  | ÁNO | NIE | ÁNO |  |  | NIE |
| **Použitá literatúra** |  |  |  |  |  |  |  |  |  |  |  |
| **P.Č.** | **Názov** |  | **Autor** |  |  | **Dostupnosť** |  | **Rok** |  |  |  |
| 1. |  |  |  |  |  |  |  |  |  |  |  |
| 2. |  |  |  |  |  |  |  |  |  |  |  |
| 3. |  |  |  |  |  |  |  |  |  |  |  |
| 4. |  |  |  |  |  |  |  |  |  |  |  |

## 1. Úloha merania

Cieľom merania je overenie závislosti [[Kapacitná reaktancia|kapacitnej reaktancie]] Xc [[Kondenzátor|kondenzátora]] od frekvencie striedavého napätia. Meranie slúži na experimentálne potvrdenie teoretického vzťahu Xc = 1/(2πfC), kde Xc je kapacitná reaktancia, f je frekvencia a C je kapacita kondenzátora. Z nameraných hodnôt prúdu a napätia sa vypočíta skutočná kapacita meraného kondenzátora a porovná sa s jeho nominálnou hodnotou.

## 2. Teoretický rozbor

Kondenzátor je pasívny dvojpólový prvok, ktorý ukladá energiu v elektrickom poli. Pri pripojení na zdroj striedavého napätia kondenzátor kladie odpor prechodu prúdu, ktorý nazývame kapacitná reaktancia Xc. Na rozdiel od ohmického odporu, kapacitná reaktancia závisí od frekvencie priloženého napätia.

Kapacitná reaktancia sa vypočíta podľa vzťahu:

**Xc = 1 / (2π·f·C) \[Ω\]**

kde f je frekvencia v Hz a C je kapacita v F. Z tohto vzťahu vyplýva, že s rastúcou frekvenciou kapacitná reaktancia klesá, a teda prúd prechádzajúci obvodom rastie. Kapacitná reaktancia sa dá tiež vyjadriť ako pomer napätia a prúdu:

**Xc = Uac / Iac \[Ω\]**

Dôležitou vlastnosťou kondenzátora v obvode striedavého prúdu je fázový posun medzi napätím a prúdom. Napätie na kondenzátore zaostáva za prúdom o 90°, teda Uac má [[Fázový posun|fázový uhol]] 0° a Iac má [[Fázový posun|fázový uhol]] 90°. Tento fázový posun je dôsledkom toho, že prúd [[Kondenzátor|kondenzátorom]] je úmerný rýchlosti zmeny napätia.

Z nameraných hodnôt napätia U a prúdu I sa dá spätne vypočítať skutočná kapacita kondenzátora:

**C = I / (2π·f·U) \[F\]**

## 3. Opis meraného predmetu

Meraným predmetom je kondenzátor s nominálnou kapacitou C = 0,1 µF. Jedná sa o kondenzátor pripojený na zdroj striedavého napätia s meniteľnou frekvenciou. Na kondenzátore sa meralo napätie a prúd pri rôznych frekvenciách v rozsahu 50 Hz až 400 Hz pri konštantnom napätí U = 6,94 V.

## 4. Schéma zapojenia

Obvod pozostáva zo zdroja striedavého napätia s regulovateľnou frekvenciou (50 – 400 Hz), ampérmetra (A) zapojeného sériovo na meranie prúdu Iac a voltmetra (V) zapojeného paralelne ku kondenzátoru (C) na meranie napätia Uac. Zdroj napätia je nastavený na konštantnú hodnotu U = 6,94 V a postupne sa mení frekvencia od 50 Hz do 400 Hz s krokom 50 Hz.

![[protokol-c-6-001.png]]

*Obr. 1: Schéma zapojenia meracieho obvodu*

## 5. Súpis meracích prístrojov

| **Prístroj** | **Funkcia** | **Rozsah** |
| --- | --- | --- |
| Zdroj striedavého napätia | Napájanie obvodu | 0 - 10 V, 50 - 400 Hz |
| Voltmeter (V) | Meranie napätia na kondenzátore | 0 - 10 V |
| Ampérmeter (mA) | Meranie prúdu obvodom | 0 - 5 mA |
| Kondenzátor | Meraný objekt | C = 0,1 µF (nominálna) |

## 6. Postup pri meraní

Postup merania bol nasledovný: Najprv sa zapojil merací obvod podľa schémy zapojenia, t.j. zdroj striedavého napätia, ampérmeter sériovo a voltmeter paralelne ku kondenzátoru. Na zdroji sa nastavila frekvencia 50 Hz a napätie U = 6,94 V. Zaznamenala sa hodnota prúdu I z ampérmetra. Následne sa frekvencia postupne zvyšovala s krokom 50 Hz až do 400 Hz, pričom sa pri každej frekvencii odčítala hodnota prúdu. Napätie U bolo počas celého merania udržiavané na konštantnej hodnote 6,94 V.

## 7. Tabuľka nameraných a vypočítaných hodnôt

*Nominálna kapacita kondenzátora: C = 0,1 µF, Napätie: U = 6,94 V = konšt.*

| **f [Hz]** | **U [V]** | **I [mA]** | **Xc teor. [Ω]** | **Xc nam. [Ω]** | **C vyp. [µF]** | **ΔXc [Ω]** |
| --- | --- | --- | --- | --- | --- | --- |
| 50 | 6.94 | 0.26 | 31830.99 | 26692.31 | 0.1193 | 5138.68 |
| 100 | 6.94 | 0.53 | 15915.49 | 13094.34 | 0.1215 | 2821.15 |
| 150 | 6.94 | 0.80 | 10610.33 | 8675.00 | 0.1223 | 1935.33 |
| 200 | 6.94 | 1.07 | 7957.75 | 6485.98 | 0.1227 | 1471.77 |
| 250 | 6.94 | 1.33 | 6366.20 | 5218.05 | 0.1220 | 1148.15 |
| 300 | 6.94 | 1.60 | 5305.17 | 4337.50 | 0.1223 | 967.67 |
| 350 | 6.94 | 1.87 | 4547.28 | 3711.23 | 0.1225 | 836.05 |
| 400 | 6.94 | 2.14 | 3978.87 | 3242.99 | 0.1227 | 735.88 |

*Xc teor. = 1/(2πfC) pre C = 0,1 µF; Xc nam. = U/I; C vyp. = 1/(2πf·Xc nam.); ΔXc = |Xc teor. − Xc nam.|*

## 8. Spracovanie nameraných hodnôt

Z nameraných hodnôt prúdu I a napätia U sa vypočítala nameraná kapacitná reaktancia Xc podľa vzťahu Xc = U/I. Následne sa z tejto hodnoty vypočítala skutočná kapacita kondenzátora C = 1/(2πf·Xc).

**Príklad výpočtu pre f = 50 Hz:**

Xc = U / I = 6,94 / 0,26·10⁻³ = 26 692,31 Ω

C = 1 / (2π · 50 · 26 692,31) = 0,1193 µF

**Príklad výpočtu pre f = 200 Hz:**

Xc = U / I = 6,94 / 1,07·10⁻³ = 6 485,98 Ω

C = 1 / (2π · 200 · 6 485,98) = 0,1227 µF

**Priemerná nameraná kapacita:**

**C****priem.** **= 0.1219 µF**

Relatívna odchýlka od nominálnej hodnoty: ΔC = |0.1219 − 0,1000| / 0,1000 × 100 % = 21.9 %

Nameraná kapacitná reaktancia je vo všetkých prípadoch nižšia ako teoretická pre C = 0,1 µF, čo potvrdzuje, že skutočná kapacita kondenzátora je vyššia ako nominálna hodnota. Závislosť Xc od frekvencie má očakávaný hyperbolický priebeh a s rastúcou frekvenciou kapacitná reaktancia klesá.

## 9. Záver

Meraním sa potvrdila teoretická závislosť [[Kapacitná reaktancia|kapacitnej reaktancie]] kondenzátora od frekvencie. S rastúcou frekvenciou kapacitná reaktancia klesá podľa vzťahu Xc = 1/(2πfC), čo sa prejavilo zvyšovaním prúdu prechádzajúceho obvodom pri konštantnom napätí U = 6,94 V.

Z nameraných hodnôt bola vypočítaná priemerná kapacita kondenzátora C = 0.1219 µF, čo predstavuje odchýlku 21.9 % od nominálnej hodnoty 0,1 µF. Táto odchýlka je spôsobená výrobnou toleranciou kondenzátora, nepresnosťou meracích prístrojov a parazitnou kapacitou prívodných vodičov.

Grafy závislostí I = f(f), Xc = f(f) a C = f(f) potvrdzujú teoretické predpoklady. Prúd rastie lineárne s frekvenciou, kapacitná reaktancia klesá hyperbolicky a vypočítaná kapacita je vo všetkých meracích bodoch približne konštantná, čo zodpovedá skutočnosti, že kapacita je vlastnosťou kondenzátora nezávislou od frekvencie.

## 10. Grafy

![[protokol-c-6-002.png]]

*Obr. 2: Závislosť prúdu I od frekvencie f*

![[protokol-c-6-003.png]]

*Obr. 3: Závislosť kapacitnej reaktancie Xc od frekvencie f*

![[protokol-c-6-004.png]]

*Obr. 4: Závislosť vypočítanej kapacity C od frekvencie f*
