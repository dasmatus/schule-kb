---
title: "Meranie parametrov cievky osciloskopom"
predmet: "Elektrotechnické merania"
typ: "protokol"
trieda: "III.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/docx/Protokol_Cievka.docx"
obrázky: 4
tags:
  - elm
  - protokol
  - cievka
---

# Meranie parametrov cievky osciloskopom

> [!info] Zdrojový dokument
> `Protokol_Cievka.docx` — [[Protokol_Cievka.docx|otvoriť originál]]

# Meranie parametrov cievky pomocou osciloskopu - Závislosť impedancie a fázového posunu od frekvencie

## 1. Úloha

Cieľom merania bolo určiť [[charakteristika|charakteristiky]] cievky (indukčnosť, odpor, impedancia) v závislosti od frekvencie striedavého prúdu a overiť teoretické vzťahy pre RL obvod.

## 2. Teoretický rozbor

[[Cievka]] sa v obvode striedavého prúdu správa ako sériová kombinácia ohmického odporu R a indukčnosti L.

[[Impedancia]] Z je daná vzťahom:Z = √(R² + (ωL)²) = √(R² + (2πfL)²)

Kde uhlová frekvencia ω je:ω = 2πf

Indukčná reaktancia X\_L:X\_L = ωL = 2πfL

Fázový posun φ medzi napätím a prúdom:tan(φ) = X\_L/R = ωL/R

Pre veľké frekvencie sa impedancia blíži k reaktancii XL = ωL a fázový posun k 90°.

Komplexná impedancia:Z̄ = R + jωL = R + jX\_L

## 3. Opis meraného predmetu

Meraným predmetom bola cievka s nominálnou indukčnosťou 33 mH.

Z merania jednosmerného prúdu (DC) boli zistené odpory troch rôznych cievok:

| Cievka | U_max (V) | Odpor (Ω) | Prúd (mA) |
| --- | --- | --- | --- |
| Cievka 1 | 1.566 | 17.4 | 90 |
| Cievka 2 | 3.315 | 66.3 | 50 |
| Cievka 3 | 153.6 | 4800 | 32 |

Pre AC meranie bola použitá cievka s nominálnou indukčnosťou 33 mH. Z nameraných hodnôt pri nízkej frekvencii (11 Hz) môžeme odhadnúť jej ohmický odpor približne na 90 Ω (keďže X\_L je pri tejto frekvencii zanedbateľné).

## 4. Schéma zapojenia

Zapojenie pozostávalo zo signálneho generátora, cievky, ochranného rezistora a [[Osciloskop|osciloskopu]] pre meranie napätia a [[Fázový posun|fázového posunu]].

![[meranie-parametrov-cievky-osciloskopom-001.png]]

Obr. 1: Schéma zapojenia pre meranie charakteristík cievky

## 5. Súpis meracích prístrojov

[[Osciloskop]] (digitálny, 2 kanály)

[[Funkčný generátor]] (sínusový priebeh)

[[Multimeter]] (pre meranie DC odporu)

Cievky ([[Cievka]] 1, 2, 3)

Rezistor (ochranný)

Prepojovacie káble

## 6. Postup pri meraní

1. Zmerali sme ohmický odpor cievok pomocou [[Multimeter|multimetra]] (metódou U/I pre jednosmerný prúd).
2. Zapojili sme obvod podľa schémy (Obr. 1).
3. Nastavili sme generátor na sínusový priebeh.
4. Menili sme frekvenciu v rozsahu 11 Hz až 2000 Hz.
5. Pre každú frekvenciu sme odčítali efektívne napätie U\_rms, prúd I\_rms a fázový posun φ.
6. Namerané hodnoty sme zaznamenali do tabuľky.

## 7. Tabuľka nameraných hodnôt (AC)

| f (Hz) | U_rms (V) | I_rms (mA) | φ (°) | Z = U/I (Ω) |
| --- | --- | --- | --- | --- |
| 11 | 3.53 | 38.89 | 0 | 90.77 |
| 50 | 4.1 | 37.5 | 4 | 109.33 |
| 100 | 4.32 | 37.05 | 9 | 116.60 |
| 200 | 4.57 | 32.24 | 23 | 141.75 |
| 300 | 4.98 | 29.7 | 36 | 167.68 |
| 400 | 5.25 | 25.46 | 42 | 206.21 |
| 500 | 5.57 | 20.51 | 52 | 271.57 |
| 600 | 5.84 | 16.97 | 59 | 344.14 |
| 700 | 6.0 | 15.56 | 61 | 385.60 |
| 800 | 6.22 | 13.01 | 65 | 478.09 |
| 900 | 6.34 | 11.88 | 72 | 533.67 |
| 1000 | 6.46 | 10.18 | 78 | 634.58 |
| 1200 | 6.61 | 7.92 | 82 | 834.60 |
| 1400 | 6.71 | 6.51 | 87 | 1030.72 |
| 1600 | 6.79 | 5.66 | 90 | 1199.65 |
| 1800 | 6.84 | 4.24 | 90 | 1613.21 |
| 2000 | 6.87 | 3.11 | 90 | 2209.00 |

## 8. Spracovanie nameraných hodnôt

Vypočítaná impedancia: Z = U\_rms/I\_rms

Predpokladaný ohmický odpor cievky R ≈ 90.0 Ω (určené z merania pri f = 11 Hz).

Indukčnosť L bola vypočítaná zo vzťahu:L = √(Z² - R²)/(2πf)

alebo ekvivalentne:X\_L = √(Z² - R²)
L = X\_L/ω = X\_L/(2πf)

## 9. Záver

Meraním sme overili, že impedancia cievky rastie s frekvenciou. Pri nízkych frekvenciách sa cievka správa prevažne ako rezistor (Z ≈ R). S rastúcou frekvenciou rastie indukčná reaktancia X\_L a fázový posun sa blíži k 90°. Vypočítaná indukčnosť sa pohybuje okolo nominálnej hodnoty (s určitou odchýlkou danou toleranciou súčiastky a presnosťou merania).

## 10. Grafy

Závislosť [[Impedancia|impedancie]] od frekvencie:

![[meranie-parametrov-cievky-osciloskopom-002.png]]

Závislosť [[Fázový posun|fázového posunu]] od frekvencie:

![[meranie-parametrov-cievky-osciloskopom-003.png]]

Vypočítaná indukčnosť v závislosti od frekvencie:

![[meranie-parametrov-cievky-osciloskopom-004.png]]
