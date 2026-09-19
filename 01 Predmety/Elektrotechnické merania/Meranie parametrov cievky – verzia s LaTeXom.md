---
title: "Meranie parametrov cievky – verzia s LaTeXom"
predmet: "Elektrotechnické merania"
typ: "protokol"
trieda: "III.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/docx/Protokol_Cievka_Obsahuje_LaTeX.docx"
obrázky: 8
tags:
  - elm
  - protokol
  - cievka
---

# Meranie parametrov cievky – verzia s LaTeXom

> [!info] Zdrojový dokument
> `Protokol_Cievka_Obsahuje_LaTeX.docx` — [[Protokol_Cievka_Obsahuje_LaTeX.docx|otvoriť originál]]

# Protokol o meraní: Vlastnosti cievky v obvode striedavého prúdu

## 1. Úloha

Zmerajte ohmický odpor [[Cievka|cievky]] metódou priameho merania (U/I) pre jednosmerný prúd. Ďalej zmerajte frekvenčnú závislosť [[Impedancia|impedancie]] a [[Fázový posun|fázového posunu]] pre cievku v obvode striedavého prúdu pomocou [[Osciloskop|osciloskopu]]. Určte indukčnosť cievky.

## 2. Teoretický rozbor

Reálna cievka sa v obvode striedavého prúdu správa ako sériová kombinácia ohmického odporu R (odpor vinutia) a indukčnosti L. Celková impedancia Z je daná vzťahom:

![[meranie-parametrov-cievky-verzia-s-latexom-001.png]]

Kde uhlová frekvencia je:

![[meranie-parametrov-cievky-verzia-s-latexom-002.png]]

Fázový posun φ medzi napätím a prúdom pre RL obvod je daný vzťahom:

![[meranie-parametrov-cievky-verzia-s-latexom-003.png]]

## 3. Opis meraného predmetu

Predmetom merania boli tri cievky (označené 1, 2, 3) pre určenie ich ohmického odporu a jedna cievka (nominálne 33 mH) pre AC analýzu.

Namerané hodnoty pre jednosmerný prúd (DC):

| Cievka | U_max (V) | I (mA) | R (Ω) |
| --- | --- | --- | --- |
| Cievka 1 | 1.566 | 90 | 17.4 |
| Cievka 2 | 3.315 | 50 | 66.3 |
| Cievka 3 | 153.6 | 32 | 4800 |

## 4. Schéma zapojenia

Zapojenie pozostáva z [[Funkčný generátor|funkčného generátora]], meranej cievky a bočníkového rezistora pre nepriame meranie prúdu.

![[meranie-parametrov-cievky-verzia-s-latexom-004.png]]

Obr. 1: Schéma zapojenia

## 5. Súpis meracích prístrojov

Digitálny osciloskop (2 kanály)

Funkčný generátor ([[Funkčný generátor|signálny generátor]])

[[Multimeter]] (pre DC meranie)

[[Cievka]] (33 mH)

Rezistor (bočník)

Prepojovacie vodiče

## 6. Postup pri meraní

1. Zmerali sme napätie a prúd pre tri cievky pri jednosmernom napájaní a vypočítali sme odpor R.
2. Zapojili sme obvod podľa schémy (Obr. 1).
3. Na generátore sme nastavili sínusový priebeh a amplitúdu.
4. Menili sme frekvenciu v rozsahu 11 Hz až 2000 Hz.
5. Na osciloskope sme odčítali efektívne napätie U\_rms, efektívny prúd I\_rms (cez bočník) a fázový posun φ.
6. Hodnoty sme zaznamenali do tabuľky.

## 7. Tabuľka nameraných hodnôt (AC)

| f (Hz) | U_rms (V) | I_rms (mA) | φ (°) | Z (Ω) |
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

[[Impedancia]] bola vypočítaná ako podiel napätia a prúdu:

![[meranie-parametrov-cievky-verzia-s-latexom-005.png]]

Indukčnosť bola vypočítaná zo vzťahu:

![[meranie-parametrov-cievky-verzia-s-latexom-006.png]]

Pre výpočet sme použili odpor R určený z merania pri nízkej frekvencii (približne 90 Ω).

## 9. Záver

Z merania vyplynulo, že impedancia cievky rastie s frekvenciou, čo je v súlade s teóriou (X\_L = ωL). Pri nízkych frekvenciách sa cievka správa prevažne ako rezistor (φ ≈ 0°). S rastúcou frekvenciou sa fázový posun blíži k 90° a impedancia rastie. Vypočítaná indukčnosť sa pohybuje v blízkosti nominálnej hodnoty 33 mH.

## 10. Grafy

Závislosť impedancie od frekvencie:

![[meranie-parametrov-cievky-verzia-s-latexom-007.png]]

Závislosť [[Fázový posun|fázového posunu]] od frekvencie:

![[meranie-parametrov-cievky-verzia-s-latexom-008.png]]
