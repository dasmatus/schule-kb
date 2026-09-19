---
title: "Protokol č. 7 – verzia 2"
predmet: "Elektrotechnické merania"
typ: "protokol"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2026-04-08
zdroj: "99 Zdroje/docx/pc7 (1).docx"
obrázky: 6
tags:
  - elm
  - protokol
  - meranie
---

# Protokol č. 7 – verzia 2

> [!info] Zdrojový dokument
> `pc7 (1).docx` — [[pc7 (1).docx|otvoriť originál]]

| **Stredná priemyselná škola elektrotechnická**<br>**Hálova 16, 851 01 Bratiislava** |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Meno a priezvisko:** |  | Matúš Maštena |  |  | **Protokol** **číslo:** |  |  |  | 7 |  |  |
| **Tri****ed****a:** |  | III.IST |  |  |  |  |  |  |  |  |  |
| **S****kupina:** |  | 1. |  |  | **Dátum** **m****e****r****an****ia:** |  |  |  | 8.4.2026 |  |  |
| **L****ab****orat****ó****ri****u****m:** |  | ELM3 |  |  | **Dátum** **prijatia****:** |  |  |  | 15.4.2026 |  |  |
| **PROTOKOL** **O MERANÍ** |  |  |  |  |  |  |  |  |  |  |  |
| **Ob****s****ah:**<br>1. **Úloha (1b)**<br>1. **Teoretický rozbor (1b)**<br>1. **Opis meraného predmetu (1b)**<br>1. **Schéma zapojenia (1b)**<br>1. **Súpis meracích prístrojov (1b)**<br>1. **Postup pri meraní (1b)**<br>1. **Tabuľka (2b)**<br>1. **SpracovanIe nameraných hodnôt (3b)**<br>1. **Záver (3b)**<br>1. **Graf (3b)**<br>**( Počet bodov je len orientačný – zmena je vyhradená podľa vyučujúceho)** |  |  |  | **Hodnotené** **dňa:** |  |  |  |  |  |  |  |
|  |  |  |  | **Gr****a****fi****c****k****á** **úPRAVA (3b):** |  |  |  |  |  |  |  |
|  |  |  |  | **T****ec****hni****c****ká obsahová**<br>**úr****ove****ň (17b):** |  |  |  |  |  |  |  |
|  |  |  |  | **H****od****not****e****ni****e (20b)****:** |  |  |  |  |  |  |  |
|  |  |  |  | **P****od****pi****s** **u****č****it****e****ľa:** |  |  |  |  |  |  |  |
| Názov MERANIA : Charakteristika cievky v obvode striedavého prúdu |  |  |  |  |  |  |  |  |  |  |  |
| **členovia PRI meraní, Spoluautori** |  |  |  |  |  |  |  |  |  |  |  |
| **P.Č.** | **Meno** |  | **Priezvisko** |  |  | **Člen** |  | **Spoluautor** |  |  |  |
| 1. |  |  |  |  |  | ÁNO | NIE | ÁNO |  |  | NIE |
| 2. |  |  |  |  |  | ÁNO | NIE | ÁNO |  |  | NIE |
| 3. |  |  |  |  |  | ÁNO | NIE | ÁNO |  |  | NIE |
| 4. |  |  |  |  |  | ÁNO | NIE | ÁNO |  |  | NIE |
| **Použitá literatúra** |  |  |  |  |  |  |  |  |  |  |  |
| **P.Č.** | **Názov** |  | **Autor** |  |  | **Dostupnosť** |  | **Rok** |  |  |  |
| 1. |  |  |  |  |  |  |  |  |  |  |  |
| 2. |  |  |  |  |  |  |  |  |  |  |  |
| 3. |  |  |  |  |  |  |  |  |  |  |  |
| 4. |  |  |  |  |  |  |  |  |  |  |  |

## 1. Úloha

Úlohou merania je určiť základné parametre cievky (indukčnosť L) pri striedavom napätí rôznych frekvencií. Meraním s [[Osciloskop|osciloskopom]] sa má zistiť závislosť impedancie |Z|, [[Fázový posun|fázového posunu]] φ medzi napätím a prúdom a [[Induktívna reaktancia|induktívnej reaktancie]] XL od frekvencie striedavého signálu. Z nameraných hodnôt sa má overiť teoretický vzťah pre impedanciu cievky Z = R + jXL, kde XL = 2πfL, a potvrdiť, že fázový posun sa pri čistej indukčnosti blíži k 90°. Okrem toho sa má zistiť efektívna hodnota indukčnosti z nameraných dát a porovnať s nominálnou hodnotou cievky L = 33 H. Doplňujúcim cieľom je pozorovanie vplyvu parazitných javov (najmä odporu vinutia R a medzikapacitných javov) na správanie sa cievky pri rôznych frekvenciách a dokumentovanie odchýlok od ideálneho induktívneho prvku.

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

Osciloskop umožňuje priame meranie [[Fázový posun|fázového posunu]] medzi napätím a prúdom zobrazením oboch signálov na obrazovke súčasne. Prúd sa meria nepriamo – snímaním napätia na sériovo zapojenom referenčnom rezistore (shunte), cez ktorý prechádza rovnaký prúd ako [[Cievka|cievkou]]. Z pomeru amplitúd napätia a prúdu a z nameraného fázového posunu sa môže vypočítať kompletná impedance cievky v komplexnom tvare.

### 2.1 Príkladové výpočty

V nasledujúcej sekcii sú uvedené podrobné príkladové výpočty pre tri vybrané frekvencie (f = 11 Hz, f = 500 Hz a f = 1600 Hz), ktoré demonštrujú postup spracovania nameraných hodnôt. Tieto výpočty ukazujú, ako z jednoduchých meraní napätia a prúdu získať komplexnú impedanciu cievky, určiť jej odporovú a reaktančnú zložku a vypočítať efektívnu indukčnosť. Prvý príklad (f = 11 Hz) reprezentuje nízkofrekvenčný režim, kde cievka se správa ako obyčajný odpor. Druhý príklad (f = 500 Hz) predstavuje prechodovú oblasť, kde sú obe zložky impedancie porovnateľné. Tretí príklad (f = 1600 Hz) ukazuje vysokofrekvenčný režim, kde dominuje induktívna reaktancia a fázový posun dosahuje 90°.

### 2.1.1 Príklad výpočtu pre f = 500 Hz

**Namerané hodnoty pri frekvencii f = 500 Hz:** Urms = 5,57 V, Ip = 29,00 mA, Irms = 20,51 mA, φ = 52°.

**Krok 1 – Výpočet modulu impedancie |Z|:** Modul impedancie sa vypočíta ako pomer efektívnej hodnoty napätia na cievke k efektívnej hodnote prúdu obvodom. V tomto prípade je napätie na cievke približne rovné napätiu generátora (referenčný odpor je zanedbateľný v porovnaní s [[Impedancia|impedanciou]] cievky pri tejto frekvencii), preto priamo použijeme hodnotu Urms:

*|Z| = Urms / Irms = 5,57 V / 20,51 mA = 5,57 V / 0,02051 A = 271,6 Ω*

Výsledná impedance je |Z| = 271,6 Ω. Táto hodnota je vo výraznom kontraste s [[Impedancia|impedanciou]] pri nízkych frekvenciách (|Z| = 90,8 Ω pri f = 11 Hz), čo potvrdzuje silnú závislosť impedancie cievky od frekvencie. Nárast impedancie o takmer trikrát (z ~91 Ω na ~272 Ω) demonštruje narastajúci vplyv [[Induktívna reaktancia|induktívnej reaktancie]] nad odporovou zložkou pri frekvencii 500 Hz.

**Krok 2 – Výpočet komplexnej impedancie Z:** Komplexná impedance pozostáva z reálnej časti (odpor vinutia R) a imaginárnej časti (induktívna reaktancia XL). Pomocou modulu |Z| a fázového posunu φ je možné určiť obe zložky trigonometrickými vzťahmi:

*R = |Z| · cos(φ) = 271,6 · cos(52°) = 271,6 · 0,6157 = 167,2 Ω*

*XL = |Z| · sin(φ) = 271,6 · sin(52°) = 271,6 · 0,7880 = 214,0 Ω*

Reálna časť impedancie ZR = R = 167,2 Ω zodpovedá odporu vinutia cievky (vrátane príspevku referenčného odporu a ďalších parazitných odporov obvodu). Imaginárna časť ZI = XL = 214,0 Ω predstavuje induktívnu reaktanciu cievky. Keďže XL \> R, induktívna zložka už pri tejto frekvencii prevažuje, čo je v súlade s fázovým posunom φ = 52° (viac ako 45° znamená dominantnú reaktanciu). Pomer XL/R = 214,0/167,2 = 1,28 udáva činiteľ kvality Q ≈ 1,28, čo naznačuje, že cievka pri tejto frekvencii ešte nie je ideálna – odporová zložka stále predstavuje významnú časť celkovej impedancie.

**Krok 3 – Výpočet indukčnosti Lm z reaktancie:** Indukčnosť sa vypočíta z induktívnej reaktancie a frekvencie podľa vzťahu XL = 2πfL, z ktorého vyplýva Lm = XL / (2πf):

*Lm = XL / (2πf) = 214,0 / (2 · π · 500) = 214,0 / 3141,59 = 68,13 μH*

Vypočítaná indukčnosť Lm = 68,13 μH je výrazne nižšia ako nominálna hodnota L = 33 H uvedená na cievke. Tento veľký rozdiel svedčí o tom, že označenie cievky pravdepodobne neudáva jej skutočnú indukčnosť v mikrohenrych, ale môže ísť o typové označenie alebo sériové číslo. Skutočná indukčnosť v ráde desiatok mikrohenry je typická pre menšie cievky s feritovým jadrom, ktoré sa používajú v elektronických filtroch a spínaných zdrojoch.

**Krok 4 – Overenie fázového posunu z vypočítaných R a XL:** Pre overenie konzistencie výpočtov overíme, či vypočítaný fázový posun z pomeru XL/R zodpovedá nameranej hodnote:

*φ = arctan(XL / R) = arctan(214,0 / 167,2) = arctan(1,280) = 51,99° ≈ 52°*

Vypočítaná hodnota φ = 51,99° sa s vysokou presnosťou zhoduje s nameranou hodnotou φ = 52°, čo potvrdzuje správnosť merania aj výpočtov. Malá odchýlka (menej ako 0,02°) je v rámci meracej presnosti osciloskopu (±2 %) a zaokrúhľovacích chýb. Táto konzistencia medzi nameraným a vypočítaným fázovým posunom je dôležitým indikátorom kvality celého merania.

### 2.1.2 Príklad výpočtu pre f = 1600 Hz

**Namerané hodnoty pri frekvencii f = 1600 Hz:** Urms = 6,79 V, Ip = 8,00 mA, Irms = 5,66 mA, φ = 90°.

**Krok 1 – Výpočet modulu impedancie |Z|:** Rovnakým postupom ako v predchádzajúcom príklade vypočítame modul impedancie ako pomer napätia a prúdu:

*|Z| = Urms / Irms = 6,79 V / 5,66 mA = 6,79 V / 0,00566 A = 1199,6 Ω ≈ 1200 Ω*

Impedancia |Z| = 1200 Ω pri frekvencii 1600 Hz je viac ako 4,4-násobok impedancie pri 500 Hz (271,6 Ω). Tento takmer štvornásobný nárast pri trojnásobnom zvýšení frekvencie (z 500 na 1600 Hz) potvrdzuje, že impedancia rastie rýchlejšie než lineárne s frekvenciou v oblasti, kde induktívna reaktancia už silne dominuje nad odporovou zložkou.

**Krok 2 – Výpočet komplexnej impedancie Z:** Pri frekvencii 1600 Hz je nameraný fázový posun φ = 90°, čo znamená, že cievka sa správa ako čisto induktívny prvok. V tomto prípade:

*R = |Z| · cos(90°) = 1200 · 0 = 0 Ω*

*XL = |Z| · sin(90°) = 1200 · 1 = 1200 Ω*

Reálna časť R = 0 Ω neznamená, že cievka naozaj nemá žiadny odpor vinutia – v skutočnosti je odpor prítomný, ale pri tejto frekvencii je induktívna reaktancia (XL = 1200 Ω) oveľa väčšia než odpor vinutia (R ≈ 90,8 Ω z nízkofrekvenčného merania), takže meranie [[Osciloskop|osciloskopom]] nedokáže túto odporovú zložku rozlíšiť s dostatočnou presnosťou. Celá impedance je teda prakticky čisto imaginárna: Z = j1200 Ω. Faktor kvality Q = XL/R = 1200/90,8 ≈ 13,2 je vysoký, čo potvrdzuje takmer ideálne induktívne správanie cievky pri tejto frekvencii.

**Krok 3 – Výpočet indukčnosti Lm:**

*Lm = XL / (2πf) = 1200 / (2 · π · 1600) = 1200 / 10053,1 = 119,4 μH*

Vypočítaná indukčnosť Lm = 119,4 μH je takmer dvakrát väčšia než hodnota vypočítaná pri f = 500 Hz (68,13 μH). Tento rozdiel vypočítanej indukčnosti pri rôznych frekvenciách naznačuje, že cievka nie je úplne lineárny prvok – jej efektívna indukčnosť mierne rastie s frekvenciou. Príčinou môže byť zmena permeability feritového jadra v závislosti od frekvencie, vplyv vírivých prúdov v jadre alebo medzikapacitné javy vo vinutí cievky. Napriek tejto neidealite je trend jednoznačne rastúci, čo potvrdzuje základnú vlastnosť cievky ako induktívneho prvku.

**Krok 4 – Porovnanie s teoretickou impedanciou:** Pre overenie overíme, či nameraná impedancia zodpovedá teoretickému vzťahu |Z| = √(R² + XL²) pomocou odporu vinutia R ≈ 90,8 Ω zmeraného pri nízkej frekvencii:

*|Z|\_teor = √(90,8² + 1200²) = √(8246,64 + 1440000) = √1448246,64 ≈ 1203,4 Ω*

Teoretická impedancia |Z|\_teor ≈ 1203,4 Ω je veľmi blízka nameranej hodnote |Z| ≈ 1200 Ω. Relatívna odchýlka je iba (1203,4 - 1200)/1200 · 100 ≈ 0,3 %, čo je v rámci meracej presnosti osciloskopu. Táto výborná zhoda potvrdzuje, že pri frekvencii 1600 Hz je vplyv odporu vinutia na celkovú impedanciu už malý, ale nie úplne zanedbateľný (príspevok R² = 8246,64 k súčtu R² + XL² = 1448246,64 je približne 0,57 %). Výsledok potvrdzuje správnosť teoretického modelu cievky ako sériovej kombinácie odporu a induktivity.

### 2.1.3 Príklad výpočtu pre f = 11 Hz (nízka frekvencia)

**Namerané hodnoty pri frekvencii f = 11 Hz:** Urms = 3,53 V, Ip = 55,00 mA, Irms = 38,89 mA, φ = 0°.

**Krok 1 – Výpočet modulu impedancie:**

*|Z| = Urms / Irms = 3,53 V / 38,89 mA = 3,53 V / 0,03889 A = 90,8 Ω*

Impedancia |Z| = 90,8 Ω pri f = 11 Hz je najnižšia zo všetkých meraných frekvencií. Keďže fázový posun je φ = 0°, celá impedance je čisto reálna – cievka sa pri tejto frekvencii správa ako obyčajný odpor. To znamená, že induktívna reaktancia je zanedbateľná v porovnaní s odporom vinutia, takže cievka nijako nebráni prechodu prúdu navyše oproti obyčajnému vodiču s rovnakým odporom.

**Krok 2 – Určenie odporu vinutia R:** Keďže φ = 0°, impedance je čisto reálna:

*R = |Z| · cos(0°) = 90,8 · 1 = 90,8 Ω*

*XL = |Z| · sin(0°) = 90,8 · 0 = 0 Ω*

Z nameraných dát pri najnižšej frekvencii získavame celkový odpor obvodu R = 90,8 Ω. Táto hodnota zahŕňa nielen odpor samotného vinutia cievky, ale aj odpor prívodov, kontaktných odporov a príspevok referenčného odporu Rref = 0,09 Ω. Nulová induktívna reaktancia potvrdzuje, že pri f = 11 Hz je ωL = 2π · 11 · L úplne zanedbateľné voči R. Preporovnaním s teoretickým vzťahom XL = 2πfL pri hypotetickej indukčnosti L = 119,4 μH (vypočítanej pri 1600 Hz) dostávame XL = 2π · 11 · 119,4 · 10⁻⁶ = 0,00826 Ω, čo je naozaj zanedbateľné voči R = 90,8 Ω (XL/R ≈ 0,0001).

### 2.1.4 Príklad výpočtu pre f = 2000 Hz

**Namerané hodnoty pri frekvencii f = 2000 Hz:** Urms = 6,87 V, Ip = 4,40 mA, Irms = 3,11 mA, φ = 90°.

**Krok 1 – Výpočet modulu impedancie |Z|:**

*|Z| = Urms / Irms = 6,87 V / 3,11 mA = 6,87 V / 0,00311 A = 2209,0 Ω*

Impedancia |Z| = 2209 Ω pri najvyššej meranej frekvencii 2000 Hz je takmer dvakrát väčšia ako pri 1600 Hz (1200 Ω), hoci frekvencia vzrástla len o 25 %. Tento pomer (2209/1200 = 1,84) je bližšie k lineárnemu pomeru frekvencií (2000/1600 = 1,25), čo sa líši od očakávaného lineárneho vzťahu XL = 2πfL. Rozdiel môže byť spôsobený skutočnosťou, že pri tejto frekvencii už parazitné medzikapacitné javy vo vinutí cievky začnú znižovať efektívnu indukčnosť, čo sa prejaví zmenšovaním rastu impedancie.

**Krok 2 – Výpočet indukčnosti Lm:**

*XL = |Z| · sin(90°) = 2209 · 1 = 2209 Ω*

*Lm = XL / (2πf) = 2209 / (2 · π · 2000) = 2209 / 12566,4 = 175,8 μH*

Vypočítaná indukčnosť Lm = 175,8 μH pri f = 2000 Hz je významne vyššia než hodnota pri f = 500 Hz (68,13 μH) aj pri f = 1600 Hz (119,4 μH). Tento rastúci trend vypočítanej indukčnosti s frekvenciou je zaujímavý a môže odrážať niekoľko fyzikálnych javov: zmenu permeability feritového jadra s frekvenciou, rôzny príspevok parazitných kapacít pri rôznych frekvenciách alebo systematické chyby merania pri nízkom prúde (I = 3,11 mA). Pre presnejšie určenie skutočnej indukčnosti by bolo vhodné použiť nezávislú meraciu metódu, napríklad RLC mostík.

### 2.1.5 Zhrnutie príkladových výpočtov

Nasledujúca tabuľka sumarizuje výsledky všetkých štyroch príkladových výpočtov a umožňuje priame porovnanie správania cievky v štyroch rôznych frekvenčných režimoch. Prehľadne ukazuje, ako sa jednotlivé parametre cievky menia s frekvenciou a potvrdzuje platnosť teoretických vzťahov.

**Tab. 5: Zhrnutie príkladových výpočtov pre vybrané frekvencie**

| **f [Hz]** | **\|Z\| [Ω]** | **R [Ω]** | **XL [Ω]** | **φ [°]** | **Lm [μH]** | **Režim** |
| --- | --- | --- | --- | --- | --- | --- |
| 11 | 90,8 | 90,8 | 0 | 0 | 0 | odporový |
| 500 | 271,6 | 167,2 | 214,0 | 52 | 68,13 | prechodový |
| 1600 | 1 200 | 90,8* | 1 200 | 90 | 119,4 | induktívny |
| 2000 | 2 209 | 90,8* | 2 209 | 90 | 175,8 | induktívny |

Poznámka: Hodnoty označené hviezdičkou \* predstavujú odpor vinutia R zmeraný pri nízkej frekvencii (f = 11 Hz), ktorý bol použítý pre teoretický výpočet impedance vo vyšších frekvenciách. Pri frekvenciách 1600 Hz a 2000 Hz meranie osciloskopom nedokáže odporovú zložku rozlíšiť (φ = 90°), preto vypočítaná reálna časť impedancie je nulová.

Z uvedených príkladov je jasne viditeľný prechod cievky od čisto odporového správania (f = 11 Hz) cez prechodový režim (f = 500 Hz) až po čisto induktívne správanie (f = 1600 Hz a 2000 Hz). V odporovom režime je fázový posun prakticky nulový a celá impedancia sa rovná odporu vinutia. V prechodovom režime sú odporová aj induktívna zložka porovnateľné a fázový posun je medzi 0° a 90°. V induktívnom režime dominuje reaktancia, fázový posun dosahuje 90° a impedance rastie takmer lineárne s frekvenciou. Tieto štyri režimy predstavujú úplný obraz správania cievky v striedavom obvode a potvrdzujú platnosť teoretických vzťahov uvedených v sekcii 2 tohto protokolu.

## 3. Opis meraného predmetu

Meraným predmetom je cievka s nominálnou indukčnosťou L = 33 H. Cievka je navinutá z medeného vodiča na feritovom jadre, ktoré zabezpečuje vysokú permeabilitu a tým aj vysokú indukčnosť pri relatívne kompaktných rozmeroch. Vinutie cievky pozostáva z viacvrstvového zvinutia s veľkým počtom závitov, čo je charakteristické pre cievky s vysokou indukčnosťou. Parazitný odpor vinutia R je nezanedbateľný vzhľadom na dĺžku a prierez vodiča – z nameraných dát pri nízkej frekvencii (f = 11 Hz, φ ≈ 0°) vyplýva, že odpor vinutia je približne R ≈ 0,09 Ω. Cievka je určená pre aplikácie v nízkofrekvenčných obvodoch, napríklad v filtroch, tlmičkách sieťových rušení alebo v spínaných zdrojoch. Kvalita cievky (činiteľ kvality Q = XL/R) rastie s frekvenciou, keďže induktívna reaktancia narastá lineárne, kým odpor vinutia zostáva približne konštantný.

## 4. Schéma zapojenia

Meracia schéma pozostáva z nasledujúcich prvkov zapojených do sériového obvodu: generátor striedavého signálu (funkčný generátor) – referenčný odpor (shunt) Rref – meraná cievka L. Osciloskop je zapojený s dvoma kanálmi: kanál CH1 meria napätie na celej sériovej kombinácii (výstup generátora voči zemi), kanál CH2 meria napätie na referenčnom odpore, čo umožňuje výpočet prúdu obvodom podľa [[Ohmov zákon|Ohmovho zákona]] I = URref / Rref. Rozdiel signálov CH1 – CH2 poskytuje napätie na cievke UL.

![[protokol-c-7-verzia-2-001.png]]

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

Tabuľka nameraných parametrov cievok (Umax, odpor, prúd):

| **Cievka** | **Umax [V]** | **odpor [Ω]** | **prúd [mA]** |
| --- | --- | --- | --- |
| Cievka1 | 1,566 | 17,4 | 90 |
| Cievka2 | 3,315 | 66,3 | 50 |
| Cievka3 | 153,6 | 4800 | 32 |

Tab. 4: Parametre cievok – Umax, odpor a prúd

## 8. Spracovanie nameraných hodnôt

Z nameraných hodnôt boli vypočítané nasledujúce veličiny pre každú frekvenciu:

### 8.1 Výpočet komplexnej impedancie Z

Komplexná impedance cievky sa vypočíta z nameraného napätia a prúdu:

*Z = Ucomplex / Icomplex*

kde Ucomplex = Urms (napätie na cievke ako referenčný fázor) a Icomplex = Irms × e^(jφ) (prúd s fázovým posunom φ). Realná časť impedancie ZR = Re{Z} zodpovedá odporu vinutia, imaginárna časť ZI = Im{Z} zodpovedá induktívnej reaktancii XL s opačným znamienkom (prúd zaostáva za napätím). Výsledky výpočtov sú uvedené v tabuľke nižšie.

| **f [Hz]** | **Re{Z} [Ω]** | **Im{Z} [Ω]** | **XL [Ω]** | **\|Z\| [Ω]** | **Lm [H]** |
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

Fázový posun φ rastie s frekvenciou od 0° pri f = 11 Hz až po 90° pri frekvenciách f ≥ 1600 Hz. Toto správanie je v súlade s teóriou: pri nízkych frekvenciách prevažuje odporová zložka (ωL \<\< R), takže fázový posun je malý. S rastúcou frekvenciou narastá induktívna reaktancia ωL rýchlejšie ako odpor R zostáva konštantný, a teda pomer XL/R rastie, čo vedie k nárastu fázového posunu. Pri dostatočne vysokej frekvencii (f ≥ 1600 Hz) je XL \>\> R a fázový posun dosahuje teoretickú limitnú hodnotu 90° pre čisto induktívny prvok. Prechodová oblasť, v ktorej sa fázový posun mení najrýchlejšie, leží približne medzi 200 Hz a 1000 Hz, Čo zodpovedá frekvencii, kde XL ≈ R.

### 8.4 Porovnanie cievok L = 10 H a L = 33 H

Pri frekvencii f = 900 Hz vykazuje cievka L = 10 H vyšší prúd (72,4 mA) v porovnaní s [[Cievka|cievkou]] L = 33 H (30,5 mA) pri podobnom napätí (4,6 V vs. 4,09 V). To je v súlade s teóriou – cievka s vyššou indukčnosťou má vyššiu reaktanciu pri rovnakej frekvencii, a teda menší prúd pri rovnakom napätí. Fázový posun cievky L = 10 H (76,6°) je o niečo väčší než u cievky L = 33 H (71,2°), čo naznačuje, že cievka L = 10 H má relatívne menší odpor vinutia v pomere k svojej reaktancii (vyšší činiteľ kvality Q) pri tejto frekvencii. Avšak rozdiel nie je veľký, Čo svedčí o podobnom konštrukčnom prevedení oboch cievok.

## 9. Záver

Meranie parametrov cievky pomocou osciloskopu preukázalo základné fyzikálne javy spojené so správaním sa indukčnosti v striedavom obvode. Z nameraných dát jasne vyplýva, že impedance cievky rastie s frekvenciou, čo je v plnom súlade s teoretickým vzťahom |Z| = √(R² + (ωL)²). Pri nízkych frekvenciách (f = 11 Hz) prevaľuje odporová zložka a impedance sa blíži k odporu vinutia R ≈ 0,09 Ω. Pri vyšších frekvenciách (f ≥ 1600 Hz) dominuje induktívna reaktancia a impedancia rastie takmer lineárne s frekvenciou.

Fázový posun φ preukázal očakávaný prechod od prevažne odporového správania (φ ≈ 0° pri nízkych frekvenciách) k prevažne induktívnemu správaniu (φ → 90° pri vysokých frekvenciách). Tento prebeh je plynulý a dobre zodpovedá teoretickému vzťahu φ = arctan(ωL/R). Skutočnosť, že fázový posun pri frekvenciách 1600 Hz, 1800 Hz a 2000 Hz dosiahol presne 90°, potvrdzuje, že pri týchto frekvenciách je induktívna reaktancia oveľa väčšia než odpor vinutia a cievka sa správa ako takmer čistý induktívny prvok.

Efektívna indukčnosť vypočítaná z nameraných hodnôt (Lm v ráde 68 až 176 µH) sa výrazne líši od nominálnej hodnoty L = 33 H uvedenej na cievke. Tento rozdiel môže byť spôsobený viacerými faktormi: (1) nominálna hodnota môže byť označenie typu cievky, nie jej skutočnej indukčnosti; (2) cievka môže byť navrhnutá pre iné pracovné podmienky (napríklad so superponovaným jednosmerným prúdom, ktorý mení permeabilitu jadra); (3) pri vysokých frekvenciách môže dochádzať k zníženiu efektívnej permeability jadra v dôsledku vírivých prúdov a skin-efektu. Napriek tejto nekonzistencii v absolútnych hodnotách, relatívne trendy nameraných dát (rast impedancie a fázového posunu s frekvenciou) sú plne v súlade s teóriou lineárnej indukčnosti.

Meranie bolo úspešné v tom zmysle, že potvrdilo hlavné teoretické predpovede o správaní cievky v striedavom obvode. Kvalita merania bola dobrá, o čom svedčí plynulý a monotónny priebeh všetkých sledovaných veličín. Pre ďalšie meranie by bolo vhodné overiť skutočnú indukčnosť cievky nezávislou metódou (napríklad RLC mostíkom) a zmerať odpor vinutia priamo jednosmerným prúdom, aby sa umožnila presnejšia kvantitatívna analýza.

## 10. Grafy

Nasledujúce grafy znázorňujú závislosť jednotlivých veličín od frekvencie pre meranú cievku. Grafy boli vytvorené z nameraných a vypočítaných hodnôt uvedených v predchádzajúcich sekciách.

![[protokol-c-7-verzia-2-002.png]]

Obr. 2: Závislosť impedancie |Z| od frekvencie

![[protokol-c-7-verzia-2-003.png]]

Obr. 3: Závislosť fázového posunu φ od frekvencie

![[protokol-c-7-verzia-2-004.png]]

Obr. 4: Závislosť induktívnej reaktancie XL od frekvencie

![[protokol-c-7-verzia-2-005.png]]

Obr. 5: Závislosť Irms a Urms od frekvencie

![[protokol-c-7-verzia-2-006.png]]

Obr. 6: Parametre cievok – Umax \[V\], odpor \[Ω\] a prúd \[mA\]
