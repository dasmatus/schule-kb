---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T17 – Robotika a softvérové aplikácie

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> ROBOTIKA A SOFTVÉROVÉ APLIKÁCIE – definujte Arduino a jeho časti, servomotory, robot, manipulátor, kinematická štruktúra, typy podvozkov, sieťová dokumentácia

## Arduino a jeho časti

Arduino je otvorená hardvérová a softvérová platforma založená na mikrokontroléri. Doska typicky obsahuje:

- mikrokontrolér s CPU, pamäťou programu a dát,
- digitálne vstupno-výstupné piny a analógové vstupy s A/D prevodníkom,
- PWM piny na približné analógové riadenie,
- USB rozhranie na programovanie a sériovú komunikáciu,
- napájací konektor, regulátor, reset a hodinový oscilátor,
- konektory pre rozširujúce moduly a stavové LED.

Program, nazývaný sketch, má v Arduino IDE zvyčajne tvar:

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

`setup()` sa vykoná raz po štarte a `loop()` sa opakuje. Pri reálnom zariadení treba okrem logiky riešiť prúdové limity pinov, spoločnú zem, odrušenie a samostatné napájanie výkonových členov.

## Servomotor

Servomotor je motor s prevodovkou a spätnou väzbou, ktorý udržiava požadovanú polohu. Bežné hobby servo prijíma periodický PWM signál; šírka impulzu určuje cieľový uhol v rozsahu určenom konkrétnym servom, často približne 0–180°. Frekvencia a impulzy nie sú univerzálne pre všetky modely, preto sa používa dokumentácia výrobcu.

Riadenie má uzavretú slučku: snímač zmeria polohu, regulátor porovná odchýlku a motor upraví pohyb. Servo potrebuje vhodné napájanie a pri rozbehu môže odoberať veľký prúd; napájanie z pinu mikrokontroléra môže dosku poškodiť.

## Robot a manipulátor

Robot je programovateľný stroj, ktorý vníma okolie, spracúva údaje a vykonáva pohyb alebo inú akciu. Základ tvorí mechanika, pohony, snímače, riadiaca jednotka, napájanie a program. Riadiaca slučka je `zmeraj → vypočítaj → vykonaj → over výsledok`.

**Manipulátor** je mechanická časť robota určená na polohovanie nástroja alebo úchop. Skladá sa z článkov, kĺbov, pohonov a koncového efektora, napríklad čeľustí, prísavky alebo zváračky. Počet nezávislých pohybov je počet stupňov voľnosti (DOF). Pri kinematike rozlišujeme priamu úlohu (z uhlov kĺbov vypočítať polohu) a inverznú úlohu (z požadovanej polohy určiť kĺby).

## Kinematická štruktúra

Manipulátor môže byť:

- **sériový** — články sú za sebou; veľký pracovný priestor, ale kumulácia vôlí a menšia tuhosť,
- **paralelný** — viac ramien podopiera efektor; vysoká tuhosť a rýchlosť, zložitejšie riadenie,
- **kartézsky** — lineárne osi X/Y/Z,
- **SCARA** — vhodný na rýchle rovinné montážne úlohy,
- **antropomorfný/artikulovaný** — rotačné kĺby podobné ramenu človeka.

Voľba závisí od presnosti, nosnosti, dosahu a tvaru pracovného priestoru.

## Typy podvozkov

- **dvojkolesový diferenciálny** — ľavé a pravé koleso majú nezávislé rýchlosti, otáčanie vzniká ich rozdielom,
- **štvorkolesový** — stabilnejší, môže mať diferenciálne alebo riadené kolesá,
- **pásový** — dobrá trakcia v nerovnom teréne, ale väčšie trenie,
- **omnidirekcionálny** — napríklad mecanum kolesá umožnia pohyb do strán, vyžadujú presné riadenie,
- **kráčajúci** — nohy prekonajú prekážky, ale mechanika a koordinácia sú zložité.

## Sieťová dokumentácia

Dokumentácia siete má opisovať skutočný aj plánovaný stav. Mala by obsahovať fyzickú schému káblov a portov, logickú topológiu, IP/VLAN adresný plán, názvy a sériové čísla zariadení, verzie firmvéru, mapu portov, konfigurácie, zálohy, kontakty a záznam zmien. Citlivé heslá sa do otvorenej dokumentácie neukladajú; používajú sa trezory a riadenie prístupu. Schéma a tabuľky musia byť pravidelne aktualizované po zmene zapojenia.

## Krátka ústna odpoveď

Arduino je platforma s mikrokontrolérom, USB, napájaním, digitálnymi a analógovými pinmi, PWM a IDE; program používa `setup()` a opakovaný `loop()`. Servomotor vďaka PWM a spätnej väzbe nastavuje uhol. Robot je programovateľný stroj a manipulátor jeho kinematická časť s článkami, kĺbmi a efektorom. Podvozok môže byť kolesový, pásový, omnidirekcionálny alebo kráčajúci. Sieťová dokumentácia obsahuje fyzickú a logickú schému, adresy, porty, konfigurácie a zmeny.
