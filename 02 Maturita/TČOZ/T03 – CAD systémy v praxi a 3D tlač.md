---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T03 – CAD systémy v praxi a 3D tlač

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> CAD SYSTÉMY V PRAXI A 3D TLAČ – nastavenie 3D tlače, 3D tlačiareň ako stroj, proces tlače, softvér pre 3D tlač, prvky R, L, C v jednosmernom a striedavom obvode

## CAD a miesto 3D tlače v návrhu

CAD (*Computer-Aided Design*) je počítačom podporované navrhovanie. V 2D vzniká technický výkres s rozmermi a toleranciami, v 3D parametrický alebo polygonálny model. Návrh musí mať správne jednotky, mierku, uzavreté plochy a primeranú orientáciu, aby bol použiteľný na výrobu.

Typický postup je:

1. vytvoriť alebo importovať model v CAD programe,
2. skontrolovať rozmery, hrúbku stien, otvory a kolízie,
3. exportovať napríklad do `STL` alebo `3MF`,
4. otvoriť model v sliceri, nastaviť tlač a vytvoriť `G-code`,
5. preniesť kód do tlačiarne, vykonať kontrolu a vytlačiť skúšobnú vrstvu.

## 3D tlačiareň ako stroj

FDM/FFF tlačiareň možno chápať ako číslicovo riadený stroj. Jej hlavné časti sú:

- rám a mechanické vedenia osí `X`, `Y`, `Z`,
- krokové motory, remene alebo skrutky a koncové spínače,
- extrudér, ktorý podáva filament, a hotend s vyhrievanou dýzou,
- tlačová podložka, často vyhrievaná,
- riadiaca doska s mikrokontrolérom, ovládačmi motorov a teplotnými snímačmi,
- napájací zdroj, displej alebo sieťové rozhranie a bezpečnostné prvky.

Pohyb je riadený príkazmi G-code, napríklad `G1 X50 Y30 F1200` znamená lineárny presun na súradnice s určenou rýchlosťou. Presnosť ovplyvňuje tuhosť rámu, kalibrácia krokov na milimeter, vôľa, teplota a rovinnosť podložky.

## Nastavenie 3D tlače

Pred tlačou treba nastaviť najmä:

- **materiál a teplotu** dýzy/podložky podľa odporúčania výrobcu filamentu,
- **výšku vrstvy**; menšia vrstva zlepší povrch, ale predĺži tlač,
- počet obvodov a hrúbku stien,
- hustotu a typ výplne, ktorá ovplyvní pevnosť, hmotnosť a čas,
- rýchlosť, zrýchlenie a retraction na obmedzenie nitkovania,
- podpory pre previsy a orientáciu modelu,
- priľnavosť k podložke, napríklad brim, raft alebo vhodný povrch,
- chladenie a minimálny čas vrstvy.

Nastavenie musí byť kompromisom medzi kvalitou, pevnosťou, časom a spotrebou. Pri diagnostike je užitočná skúšobná kocka alebo teplotná veža; nevhodná teplota môže spôsobiť slabé spojenie vrstiev, deformáciu alebo upchatie dýzy.

## Proces tlače

Slicer model najprv nareže na vrstvy, vytvorí obrysy, výplň, podpory a pohyby. Po homingu sa tlačiareň zahreje, vyrovná podložku a vytlačí prvú vrstvu. Každá ďalšia vrstva vzniká nanesením materiálu podľa dráhy v G-code. Po skončení sa nechá podložka vychladnúť a výrobok sa bezpečne oddelí; odstránia sa podpory a prípadne sa vykoná brúsenie či iná úprava.

## Softvér pre 3D tlač

Rozlišujeme:

- CAD modelár (parametrické diely, zostavy, výkresy),
- mesh editor na opravu polygonálnych sietí,
- **slicer**, ktorý mení model na vrstvy a G-code,
- firmware v tlačiarni, ktorý interpretuje G-code a riadi motory, ohrievače a snímače,
- monitorovací alebo riadiaci softvér na posielanie úloh a sledovanie teploty.

`STL` nesie hlavne geometriu trojuholníkovej siete, `3MF` môže uchovať aj jednotky a nastavenia a G-code je postup príkazov stroja. STL preto nie je priamo program pre tlačiareň.

## Prvky R, L a C v jednosmernom a striedavom obvode

Rezistor `R` obmedzuje prúd a v ideálnom jednosmernom obvode platí Ohmov zákon `U = R·I`. Výkon je `P = U·I = I²R = U²/R`. Indukčnosť `L` sa bráni zmene prúdu; pri ustálenom DC sa ideálna cievka správa približne ako skrat. Kapacita `C` sa bráni zmene napätia; po nabití sa v ustálenom DC správa približne ako rozpojený obvod.

Pri sínusovom AC majú reaktancie veľkosti

- `X_L = 2πfL` — s frekvenciou rastie,
- `X_C = 1/(2πfC)` — s frekvenciou klesá.

V sériovom RLC obvode možno impedanciu zapísať `Z = R + j(X_L - X_C)`. Rezonancia nastane približne pri `f₀ = 1/(2π√(LC))`, keď sa induktívna a kapacitná reaktancia vyrušia. V riadiacej elektronike 3D tlačiarne sa R, L a C uplatňujú vo vykurovaní, filtrovaní napájania, motoroch a potláčaní rušenia.

## Technológie 3D tlače a materiály

| Technológia | Princíp | Použitie |
| --- | --- | --- |
| **FDM/FFF** | tavenie a nanášanie filamentu | najlacnejšia, prototypy, škola |
| **SLA/MSLA** | vytvrdzovanie živice UV svetlom | jemné detaily, figúrky, zubné modely |
| **SLS** | spekanie prášku laserom | pevné funkčné diely bez podpôr |

| Filament | Dýza | Podložka | Vlastnosti |
| --- | --- | --- | --- |
| PLA | 190–220 °C | 50–60 °C | najľahšia tlač, krehkejší, nevydrží teplo |
| PETG | 230–250 °C | 70–80 °C | húževnatý, odolný voči vode |
| ABS | 230–260 °C | 90–110 °C | odolný teplu, deformuje sa, výpary – uzavretá komora |
| TPU | 210–230 °C | 40–60 °C | pružný, tlačí sa pomaly |

Teploty sú orientačné, presné hodnoty udáva výrobca filamentu.

## Softvér – príklady

- **CAD:** Fusion 360, SolidWorks, Autodesk Inventor, FreeCAD, Tinkercad (pre začiatočníkov), AutoCAD (2D výkresy)
- **Slicer:** PrusaSlicer, Ultimaker Cura, OrcaSlicer, Bambu Studio
- **Firmvér tlačiarne:** Marlin, Klipper

## Základné príkazy G-code

| Príkaz | Význam |
| --- | --- |
| `G28` | návrat osí do východiskovej polohy (homing) |
| `G0` / `G1` | presun bez tlače / lineárny pohyb s tlačou |
| `G90` / `G91` | absolútne / relatívne súradnice |
| `M104 S210` / `M109 S210` | nastav teplotu dýzy / nastav a počkaj |
| `M140 S60` / `M190 S60` | nastav teplotu podložky / nastav a počkaj |
| `M106` / `M107` | zapni / vypni ventilátor chladenia |

## Radenie R, L, C

| | Sériovo | Paralelne |
| --- | --- | --- |
| **R** a **L** | `R = R1 + R2` | `1/R = 1/R1 + 1/R2` |
| **C** | `1/C = 1/C1 + 1/C2` | `C = C1 + C2` |

Kondenzátory sa teda sčítavajú opačne ako rezistory.

## Správanie v striedavom obvode

| Prvok | Fáza prúdu voči napätiu | Odpor pri DC | Pri raste `f` |
| --- | --- | --- | --- |
| R | vo fáze | `R` | nemení sa |
| L | prúd **zaostáva** o 90° | ≈ 0 (skrat) | `X_L` rastie |
| C | prúd **predbieha** o 90° | ∞ (rozpojené) | `X_C` klesá |

Pomôcka **CIVIL**: pri **C** je **I** pred **V** (napätím), pri **L** je
**V** pred **I**.

- **Energia:** kondenzátor `W = ½ · C · U²`, cievka `W = ½ · L · I²`
- **Časová konštanta:** RC článok `τ = R · C`, RL článok `τ = L / R`.
  Za `τ` sa kondenzátor nabije na **63 %**, prakticky úplne za `5τ`.
- **Veľkosť impedancie** sériového RLC: `|Z| = √(R² + (X_L − X_C)²)`

### Riešený príklad

`f = 50 Hz`, `R = 10 Ω`, `L = 0,1 H`, `C = 100 µF`, sériové zapojenie:

- `X_L = 2π · 50 · 0,1 ≈ 31,4 Ω`
- `X_C = 1 / (2π · 50 · 0,0001) ≈ 31,8 Ω`
- `|Z| = √(10² + (31,4 − 31,8)²) ≈ 10 Ω` — obvod je takmer v rezonancii,
  reaktancie sa skoro vyrušia a prúd obmedzuje hlavne `R`.

## Krátka ústna odpoveď

CAD vytvára model a slicer ho rozdelí na vrstvy a preloží do G-code. 3D tlačiareň je číslicovo riadený stroj s rámom, osami, krokovými motormi, extrudérom, hotendom, podložkou, snímačmi a riadiacou doskou. Kvalitu určujú teploty, výška vrstvy, rýchlosť, výplň, podpory a priľnavosť. V elektrickej časti treba rozumieť správaniu rezistora, cievky a kondenzátora v DC aj AC; platia vzťahy pre Ohmov zákon, reaktancie a RLC rezonanciu.

## Kontrolné otázky

> [!question]- Opíš postup od nápadu po výtlačok.
> Model v CAD → kontrola → export do STL/3MF → slicer (nastavenie, vrstvy) →
> G-code → tlačiareň (homing, ohrev, prvá vrstva) → dokončenie a úprava.

> [!question]- Z akých častí sa skladá FDM tlačiareň?
> Rám s osami X/Y/Z, krokové motory, extrudér, hotend s dýzou, vyhrievaná
> podložka, riadiaca doska so snímačmi, zdroj, displej.

> [!question]- Ktoré parametre nastavuješ v sliceri?
> Materiál a teploty, výšku vrstvy, steny, výplň, rýchlosť, retraction,
> podpory, priľnavosť (brim, raft), chladenie.

> [!question]- Aký je rozdiel medzi STL a G-code?
> STL je len geometria (trojuholníková sieť). G-code je postupnosť príkazov
> pre stroj, vznikne v sliceri.

> [!question]- Ako sa správa cievka a kondenzátor v jednosmernom obvode?
> Ideálna cievka v ustálenom stave ako skrat, nabitý kondenzátor ako rozpojený
> obvod.

> [!question]- Ako závisí reaktancia cievky a kondenzátora od frekvencie?
> `X_L = 2πfL` s frekvenciou rastie, `X_C = 1/(2πfC)` klesá.

> [!question]- Ako vypočítaš celkovú kapacitu dvoch kondenzátorov paralelne a sériovo?
> Paralelne `C = C1 + C2`, sériovo `1/C = 1/C1 + 1/C2`.

> [!question]- Kedy nastane rezonancia RLC obvodu?
> Keď `X_L = X_C`, pri `f₀ = 1 / (2π√(LC))`.
