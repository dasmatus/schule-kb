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

## Krátka ústna odpoveď

CAD vytvára model a slicer ho rozdelí na vrstvy a preloží do G-code. 3D tlačiareň je číslicovo riadený stroj s rámom, osami, krokovými motormi, extrudérom, hotendom, podložkou, snímačmi a riadiacou doskou. Kvalitu určujú teploty, výška vrstvy, rýchlosť, výplň, podpory a priľnavosť. V elektrickej časti treba rozumieť správaniu rezistora, cievky a kondenzátora v DC aj AC; platia vzťahy pre Ohmov zákon, reaktancie a RLC rezonanciu.
