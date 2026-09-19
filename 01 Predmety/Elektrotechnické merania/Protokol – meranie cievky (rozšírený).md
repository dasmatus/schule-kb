---
title: "Protokol – meranie cievky (rozšírený)"
predmet: "Elektrotechnické merania"
typ: "protokol"
trieda: "III.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/docx/protokol_meranie_cievka.docx"
obrázky: 4
tags:
  - elm
  - protokol
  - cievka
---

# Protokol – meranie cievky (rozšírený)

> [!info] Zdrojový dokument
> `protokol_meranie_cievka.docx` — [[protokol_meranie_cievka.docx|otvoriť originál]]

**Protokol o meraní**

**Meranie parametrov cievky**

Meranie s [[Osciloskop|osciloskopom]] – závislosť [[Impedancia|impedancie]], [[Fázový posun|fázového posunu]] a reaktancie od frekvencie

| **Predmet:** | Elektrotechnika – laboratórne meranie |
| --- | --- |
| **Meraný predmet:** | Cievka L = 33 H |
| **Metóda:** | Meranie s osciloskopom |

## 1. Úloha

Úlohou merania je experimentálne určiť základné parametre cievky (indukčnosť L) pri striedavom napätí rôznych frekvencií. Meraním s [[Osciloskop|osciloskopom]] sa má zistiť závislosť [[Impedancia|impedancie]] |Z|, [[Fázový posun|fázového posunu]] φ medzi napätím a prúdom a [[Induktívna reaktancia|induktívnej reaktancie]] XL od frekvencie striedavého signálu. Z nameraných hodnôt sa má overiť teoretický vzťah pre impedanciu cievky Z = R + jXL, kde XL = 2πfL, a potvrdiť, že fázový posun sa pri čistej indukčnosti blíži k 90°. Okrem toho sa má zistiť efektívna hodnota indukčnosti z nameraných dát a porovnať s nominálnou hodnotou cievky L = 33 H. Doplňujúcim cieľom je pozorovanie vplyvu parazitných javov (najmä odporu vinutia R a medzikapacitných javov) na správanie sa cievky pri rôznych frekvenciách a dokumentovanie odchýlok od ideálneho induktívneho prvku.

## 2. Teoretický rozbor

Cievka (indukčnosť) je pasívny lineárny elektrický prvok, ktorého hlavnou vlastnosťou je schopnosť ukladať energiu v magnetickom poli. V striedavom obvode sa cievka správa ako komplexná impedance, ktorá závisí od frekvencie pripojeného signálu. Pre ideálnu cievku s indukčnosťou L platí základný vzťah pre induktívnu reaktanciu:

*XL = 2πfL = ωL*

kde f je frekvencia striedavého signálu a ω = 2πf je uhlová frekvencia. Induktívna reaktancia XL rastie lineárne s frekvenciou, čo znamená, že cievka viac bráni prechodu prúdu pri vyšších frekvenciách. Skutočná cievka však nie je ideálna – obsahuje aj odpor vinutia R, ktorý spôsobuje skutočnú impedanciu cievky vyjadriteľnú komplexným číslom:

*Z = R + jXL = R + jωL*

Modul impedancie (veľkosť impedancie) je potom:

*|Z| = √(R² + XL²) = √(R² + (ωL)²)*

Fázový posun φ medzi napätím na cievke a prúdom prechádzajúcim ňou je daný vzťahom:

*φ = arctan(XL / R) = arctan(ωL / R)*

Pre ideálnu cievku (R = 0) je fázový posun φ = 90°, tzn. napätie predbehne prúd o štvrť períody. Pre skutočnú cievku s nezanedbateľným odporom R je fázový posun menší ako 90°, pričom sa k tejto hodnote približuje pri vysokých frekvenciách, kde platí ωL \>\> R. Pri nízkych frekvenciách, kde ωL \<\< R, sa fázový posun blíži k nule a cievka sa správa prevažne ako odpor. Tento prechod od odporového k induktívnemu správaniu je kľúčovým javom, ktorý sa pri meraní sleduje a dokumentuje.

Osciloskop umožňuje priame meranie fázového posunu medzi napätím a prúdom zobrazením oboch signálov na obrazovke súčasne. Prúd sa meria nepriamo – snímaním napätia na sériovo zapojenom referenčnom rezistore (shunte), cez ktorý prechádza rovnaký prúd ako [[Cievka|cievkou]]. Z pomeru amplitúd napätia a prúdu a z nameraného fázového posunu sa môže vypočítať kompletná impedance cievky v komplexnom tvare.

## 3. Opis meraného predmetu

Meraným predmetom je cievka s nominálnou indukčnosťou L = 33 H. Cievka je navinutá z medeného vodiča na feritovom jadre, ktoré zabezpečuje vysokú permeabilitu a tým aj vysokú indukčnosť pri relatívne kompaktných rozmeroch. Vinutie cievky pozostáva z viacvrstvového zvinutia s veľkým počtom závitov, čo je charakteristické pre cievky s vysokou indukčnosťou. Parazitný odpor vinutia R je nezanedbateľný vzhľadom na dĺžku a prierez vodiča – z nameraných dát pri nízkej frekvencii (f = 11 Hz, φ ≈ 0°) vyplýva, že odpor vinutia je približne R ≈ 0,09 Ω. Cievka je určená pre aplikácie v nízkofrekvenčných obvodoch, napríklad v filtroch, tlmičkách sieťových rušení alebo v spínaných zdrojoch. Kvalita cievky (činiteľ kvality Q = XL/R) rastie s frekvenciou, keďže induktívna reaktancia narastá lineárne, kým odpor vinutia zostáva približne konštantný.

## 4. Schéma zapojenia

Meracia schéma pozostáva z nasledujúcich prvkov zapojených do sériového obvodu: generátor striedavého signálu (funkčný generátor) – referenčný odpor (shunt) Rref – meraná cievka L. Osciloskop je zapojený s dvoma kanálmi: kanál CH1 meria napätie na celej sériovej kombinácii (výstup generátora voči zemi), kanál CH2 meria napätie na referenčnom odpore, čo umožňuje výpočet prúdu obvodom podľa [[Ohmov zákon|Ohmovho zákona]] I = URref / Rref. Rozdiel signálov CH1 – CH2 poskytuje napätie na cievke UL.

- **Sériové zapojenie:**
- Generátor (f) → Rref (shunt) → Cievka (L) → Zem
- **Osciloskop:**
- CH1: napätie Ucelk (generátor) \| CH2: napätie URref (shunt) → prúd I \| CH1 – CH2: napätie na cievke UL

Obr. 1: Schéma zapojenia meracieho obvodu

## 5. Súpis meracích prístrojov

| **Prístroj** | **Typ / Model** | **Rozsah** | **Presnosť** |
| --- | --- | --- | --- |
| Osciloskop | Digitálny 2-kanálový | 0 – 100 MHz | ±2 % |
| Funkčný generátor | Generátor signálov | 0 – 2 MHz | ±1 % |
| Referenčný odpor | Shunt Rref | 0,09 Ω | ±1 % |
| Cievka | Feritové jadro | L = 33 H | ±10 % |
| Multimeter | Digitálny | 0 – 1000 V / 0 – 10 A | ±0,5 % |

Tab. 1: Súpis meracích prístrojov

## 6. Postup pri meraní

1. Zostavenie meracieho obvodu podľa schémy zapojenia (sekcia 4). Generátor, referenčný odpor a cievka boli zapojené do série. Osciloskop bol pripojený na meranie napätia na celej kombinácii (CH1) a na referenčnom odpore (CH2).
2. Nastavenie [[Funkčný generátor|funkčného generátora]] na minimálnu frekvenciu f = 11 Hz a amplitúdu výstupného napätia tak, aby prúd obvodom neprekročil menovitú hodnotu cievky. Overenie správneho zobrazenia oboch signálov na osciloskope.
3. Meranie efektívnej hodnoty napätia Urms na výstupe generátora, amplitúdy prúdu Ip a efektívnej hodnoty prúdu Irms vypočítanej z napätia na referenčnom odpore.
4. Meranie fázového posunu φ medzi napätím a prúdom pomocou osciloskopu – z časového posunu medzi nulovými prechodmi oboch signálov podľa vzťahu φ = (Δt / T) × 360°, kde Δt je časový posun a T je períoda signálu.
5. Zaznamenanie nameraných hodnôt do tabuľky.
6. Zvýšenie frekvencie generátora na nasledujúcu hodnotu (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000 Hz) a opakovanie krokov 3–5 pre každú frekvenciu.
7. Kontrola konzistencie nameraných dát – overenie monotónnosti rastu fázového posunu s frekvenciou a zmysluplnosti vypočítaných hodnôt impedancie a reaktancie.
8. Ukončenie merania a rozpojenie obvodu.

## 7. Tabuľka nameraných hodnôt

Nasledujúca tabuľka obsahuje namerané hodnoty pre cievku L = 33 H pri rôznych frekvenciách. Stĺpce udávajú: frekvenciu f, efektívnu hodnotu napätia Urms, amplitúdu prúdu Ip, efektívnu hodnotu prúdu Irms a fázový posun φ medzi napätím a prúdom.

| **f [Hz]** | **Urms [V]** | **Ip [mA]** | **Irms [mA]** | **φ [°]** |
| --- | --- | --- | --- | --- |
| 11 | 3.53 | 55.00 | 38.89 | 0 |
| 50 | 4.10 | 53.03 | 37.50 | 4 |
| 100 | 4.32 | 52.40 | 37.05 | 9 |
| 200 | 4.57 | 45.60 | 32.24 | 23 |
| 300 | 4.98 | 42.00 | 29.70 | 36 |
| 400 | 5.25 | 36.00 | 25.46 | 42 |
| 500 | 5.57 | 29.00 | 20.51 | 52 |
| 600 | 5.84 | 24.00 | 16.97 | 59 |
| 700 | 6.00 | 22.00 | 15.56 | 61 |
| 800 | 6.22 | 18.40 | 13.01 | 65 |
| 900 | 6.34 | 16.80 | 11.88 | 72 |
| 1000 | 6.46 | 14.40 | 10.18 | 78 |
| 1200 | 6.61 | 11.20 | 7.92 | 82 |
| 1400 | 6.71 | 9.20 | 6.51 | 87 |
| 1600 | 6.79 | 8.00 | 5.66 | 90 |
| 1800 | 6.84 | 6.00 | 4.24 | 90 |
| 2000 | 6.87 | 4.40 | 3.11 | 90 |

Tab. 2: Namerané hodnoty pre cievku L = 33 H

Doplnková tabuľka porovnania dvoch cievok pri frekvencii f = 900 Hz:

| **L [H]** | **U [V]** | **f [Hz]** | **I [mA]** | **φ [°]** |
| --- | --- | --- | --- | --- |
| 10 | 4.60 | 900 | 72.4 | 76.6 |
| 33 | 4.09 | 900 | 30.5 | 71.2 |

Tab. 3: Porovnanie cievok L = 10 H a L = 33 H pri f = 900 Hz

## 8. Spracovanie nameraných hodnôt

Z nameraných hodnôt boli vypočítané nasledujúce veličiny pre každú frekvenciu:

### 8.1 Výpočet komplexnej impedancie Z

Komplexná impedance cievky sa vypočíta z nameraného napätia a prúdu:

*Z = Ucomplex / Icomplex*

kde Ucomplex = Urms (napätie na cievke ako referenčný fázor) a Icomplex = Irms × e^(jφ) (prúd s fázovým posunom φ). Realná časť impedancie ZR = Re{Z} zodpovedá odporu vinutia, imaginárna časť ZI = Im{Z} zodpovedá induktívnej reaktancii XL s opačným znamienkom (prúd zaostáva za napätím). Výsledky výpočtov sú uvedené v tabuľke nižšie.

| **f [Hz]** | **Re{Z} [Ω]** | **Im{Z} [Ω]** | **XL [Ω]** | **\|Z\| [Ω]** | **Lm [µH]** |
| --- | --- | --- | --- | --- | --- |
| 11 | 0.0908 | 0.0000 | 0.0000 | 0.0908 | 0.00 |
| 100 | 0.1152 | -0.0182 | 0.0182 | 0.1166 | 29.03 |
| 300 | 0.1357 | -0.0986 | 0.0986 | 0.1677 | 52.29 |
| 500 | 0.1672 | -0.2140 | 0.2140 | 0.2716 | 68.13 |
| 700 | 0.1870 | -0.3373 | 0.3373 | 0.3857 | 76.70 |
| 900 | 0.1649 | -0.5076 | 0.5076 | 0.5337 | 89.76 |
| 1200 | 0.1162 | -0.8265 | 0.8265 | 0.8346 | 109.62 |
| 1600 | 0.0000 | -1.2003 | 1.2003 | 1.2003 | 119.40 |
| 2000 | 0.0000 | -2.2081 | 2.2081 | 2.2081 | 175.72 |

Tab. 4: Vypočítané hodnoty impedancie a reaktancie pre vybrané frekvencie

### 8.2 Výpočet indukčnosti z nameraných hodnôt

Z nameranej reaktancie XL je možné vypočítať efektívnu indukčnosť cievky pre každú frekvenciu podľa vzťahu:

*Lm = XL / (2πf)*

Vypočítané hodnoty Lm sú uvedené v tabuľke 4. Pre vyššie frekvencie (f ≥ 500 Hz) sa vypočítaná indukčnosť pohybuje v rozsahu približne 68 až 176 µH. Tieto hodnoty sú výrazne nižšie ako nominálna hodnota L = 33 H uvedená na cievke. Tento rozdiel naznačuje, že nominálna hodnota 33 H pravdepodobne nezodpovedá skutočnej indukčnosti cievky v danom meranom rozsahu, alebo že označenie cievky bolo interpretované inak (napríklad ako poradové číslo typu cievky). Skutočná indukčnosť zodpovedajúca nameraným dátam je v ráde stotín milihenry, čo je typické pre menšie cievky používané v elektronických obvodoch.

### 8.3 Analýza fázového posunu

Fázový posun φ rastie s frekvenciou od 0° pri f = 11 Hz až po 90° pri frekvenciách f ≥ 1600 Hz. Toto správanie je v súlade s teóriou: pri nízkych frekvenciách prevaľuje odporová zložka (ωL \<\< R), takže fázový posun je malý. S rastúcou frekvenciou narastá induktívna reaktancia ωL rýchlejšie ako odpor R zostáva konštantný, a teda pomer XL/R rastie, čo vedie k nárastu fázového posunu. Pri dostatočne vysokej frekvencii (f ≥ 1600 Hz) je XL \>\> R a fázový posun dosahuje teoretickú limitnú hodnotu 90° pre čisto induktívny prvok. Prechodová oblasť, v ktorej sa fázový posun mení najrýchlejšie, leží približne medzi 200 Hz a 1000 Hz, Čo zodpovedá frekvencii, kde XL ≈ R.

### 8.4 Porovnanie cievok L = 10 H a L = 33 H

Pri frekvencii f = 900 Hz vykazuje cievka L = 10 H vyšší prúd (72,4 mA) v porovnaní s [[Cievka|cievkou]] L = 33 H (30,5 mA) pri podobnom napätí (4,6 V vs. 4,09 V). To je v súlade s teóriou – cievka s vyššou indukčnosťou má vyššiu reaktanciu pri rovnakej frekvencii, a teda menší prúd pri rovnakom napätí. Fázový posun cievky L = 10 H (76,6°) je o niečo väčší než u cievky L = 33 H (71,2°), čo naznačuje, že cievka L = 10 H má relatívne menší odpor vinutia v pomere k svojej reaktancii (vyšší činiteľ kvality Q) pri tejto frekvencii. Avšak rozdiel nie je veľký, Čo svedčí o podobnom konštrukčnom prevedení oboch cievok.

## 9. Záver

Meranie parametrov cievky pomocou osciloskopu preukázalo základné fyzikálne javy spojené so správaním sa indukčnosti v striedavom obvode. Z nameraných dát jasne vyplýva, že impedance cievky rastie s frekvenciou, čo je v plnom súlade s teoretickým vzťahom |Z| = √(R² + (ωL)²). Pri nízkych frekvenciách (f = 11 Hz) prevaľuje odporová zložka a impedance sa blíži k odporu vinutia R ≈ 0,09 Ω. Pri vyšších frekvenciách (f ≥ 1600 Hz) dominuje induktívna reaktancia a impedancia rastie takmer lineárne s frekvenciou.

Fázový posun φ preukázal očakávaný prechod od prevažne odporového správania (φ ≈ 0° pri nízkych frekvenciách) k prevažne induktívnemu správaniu (φ → 90° pri vysokých frekvenciách). Tento prebeh je plynulý a dobre zodpovedá teoretickému vzťahu φ = arctan(ωL/R). Skutočnosť, že fázový posun pri frekvenciách 1600 Hz, 1800 Hz a 2000 Hz dosiahol presne 90°, potvrdzuje, že pri týchto frekvenciách je induktívna reaktancia oveľa väčšia než odpor vinutia a cievka sa správa ako takmer čistý induktívny prvok.

Efektívna indukčnosť vypočítaná z nameraných hodnôt (Lm v ráde 68 až 176 µH) sa výrazne líši od nominálnej hodnoty L = 33 H uvedenej na cievke. Tento rozdiel môže byť spôsobený viacerými faktormi: (1) nominálna hodnota môže byť označenie typu cievky, nie jej skutočnej indukčnosti; (2) cievka môže byť navrhnutá pre iné pracovné podmienky (napríklad so superponovaným jednosmerným prúdom, ktorý mení permeabilitu jadra); (3) pri vysokých frekvenciách môže dochádzať k zníženiu efektívnej permeability jadra v dôsledku vírivých prúdov a skin-efektu. Napriek tejto nekonzistencii v absolútnych hodnotách, relatívne trendy nameraných dát (rast impedancie a fázového posunu s frekvenciou) sú plne v súlade s teóriou lineárnej indukčnosti.

Meranie bolo úspešné v tom zmysle, že potvrdilo hlavné teoretické predpovede o správaní cievky v striedavom obvode. Kvalita merania bola dobrá, o čom svedčí plynulý a monotónny priebeh všetkých sledovaných veličín. Pre ďalšie meranie by bolo vhodné overiť skutočnú indukčnosť cievky nezávislou metódou (napríklad RLC mostíkom) a zmerať odpor vinutia priamo jednosmerným prúdom, aby sa umožnila presnejšia kvantitatívna analýza.

## 10. Grafy

Nasledujúce grafy znázorňujú závislosť jednotlivých veličín od frekvencie pre meranú cievku. Grafy boli vytvorené z nameraných a vypočítaných hodnôt uvedených v predchádzajúcich sekciách.

![[protokol-meranie-cievky-rozsireny-001.png]]

Obr. 2: Závislosť impedancie |Z| od frekvencie

![[protokol-meranie-cievky-rozsireny-002.png]]

Obr. 3: Závislosť fázového posunu φ od frekvencie

![[protokol-meranie-cievky-rozsireny-003.png]]

Obr. 4: Závislosť [[Induktívna reaktancia|induktívnej reaktancie]] XL od frekvencie

![[protokol-meranie-cievky-rozsireny-004.png]]

Obr. 5: Závislosť Irms a Urms od frekvencie
