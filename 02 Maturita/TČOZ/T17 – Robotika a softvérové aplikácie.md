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

## Arduino Uno – parametre

| Parameter | Hodnota |
| --- | --- |
| mikrokontrolér | ATmega328P, 16 MHz |
| pamäť | 32 KB flash (program), 2 KB SRAM, 1 KB EEPROM |
| digitálne piny | 14 (z toho 6 PWM, označené `~`) |
| analógové vstupy | 6 (A0–A5), 10-bitový ADC |
| pracovné napätie | 5 V (napájanie 7–12 V cez konektor alebo USB) |
| prúd jedného pinu | odporúčané 20 mA, absolútne max. 40 mA |

Základné funkcie: `pinMode()`, `digitalWrite()`, `digitalRead()`,
`analogRead()`, `analogWrite()` (PWM), `delay()`, `millis()`,
`Serial.begin()`, `Serial.println()`.

## Motory v robotike

| Motor | Vlastnosti | Riadenie |
| --- | --- | --- |
| jednosmerný (DC) | rýchly, lacný, bez presnej polohy | H-mostík (napr. L298N), PWM na rýchlosť |
| krokový | presné kroky bez spätnej väzby | driver (A4988), impulzy = kroky |
| servomotor | presná poloha uhla so spätnou väzbou | PWM signál |

**Riadenie serva:** perióda 20 ms (50 Hz), šírka impulzu približne
**1 ms → 0°**, **1,5 ms → 90°**, **2 ms → 180°** (presne podľa výrobcu).
Servo obsahuje DC motor, prevodovku, potenciometer (snímač polohy) a
riadiacu elektroniku.

```cpp
#include <Servo.h>
Servo servo;

void setup() {
  servo.attach(9);          // signál serva na PWM pin 9
}

void loop() {
  for (int uhol = 0; uhol <= 180; uhol += 10) {
    servo.write(uhol);      // nastav uhol 0–180°
    delay(200);
  }
}
```

## Senzory robota

ultrazvukový snímač vzdialenosti (HC-SR04), infračervený snímač čiary,
gyroskop a akcelerometer (MPU-6050), enkodér otáčok kolesa, koncový spínač,
kamera.

## Typy kinematických štruktúr

| Štruktúra | Kĺby (T = posuvný, R = rotačný) | Pracovný priestor |
| --- | --- | --- |
| kartézska | TTT | kváder |
| cylindrická | RTT | valec |
| sférická | RRT | guľa |
| SCARA | RRT (zvislá os) | valcový, rýchla montáž v rovine |
| angulárna (antropomorfná) | RRR | guľový, najväčšia flexibilita |

Na ľubovoľnú polohu **a** natočenie nástroja v priestore treba **6 stupňov voľnosti**
(3 pre polohu, 3 pre orientáciu).

## Sieťová dokumentácia – adresná tabuľka

| Zariadenie | Rozhranie | IP adresa | Maska | Brána |
| --- | --- | --- | --- | --- |
| R1 | G0/0 | 192.168.10.1 | 255.255.255.0 | – |
| R1 | S0/0/0 | 10.0.0.1 | 255.255.255.252 | – |
| S1 | VLAN 99 | 192.168.99.2 | 255.255.255.0 | 192.168.99.1 |
| PC-A | NIC | 192.168.10.10 | 255.255.255.0 | 192.168.10.1 |

Ďalej: **fyzická topológia** (kde sú zariadenia, ktorý kábel do ktorého portu),
**logická topológia** (siete, VLAN, adresy), zoznam zariadení (model,
sériové číslo, verzia IOS), zálohy konfigurácií a **denník zmien**. Nástroje:
Packet Tracer, draw.io, Visio, NetBox.

## Krátka ústna odpoveď

Arduino je platforma s mikrokontrolérom, USB, napájaním, digitálnymi a analógovými pinmi, PWM a IDE; program používa `setup()` a opakovaný `loop()`. Servomotor vďaka PWM a spätnej väzbe nastavuje uhol. Robot je programovateľný stroj a manipulátor jeho kinematická časť s článkami, kĺbmi a efektorom. Podvozok môže byť kolesový, pásový, omnidirekcionálny alebo kráčajúci. Sieťová dokumentácia obsahuje fyzickú a logickú schému, adresy, porty, konfigurácie a zmeny.

## Pozri aj – CCNA3 ENSA

- [[ENSA 12 – Riešenie problémov v sieti]]

## Kontrolné otázky

> [!question]- Čo je Arduino a z čoho sa skladá?
> Otvorená platforma s mikrokontrolérom (Uno: ATmega328P). Má digitálne a
> analógové piny, PWM, USB, napájanie, regulátor, oscilátor, reset; programuje
> sa v Arduino IDE (C/C++).

> [!question]- Aká je štruktúra programu pre Arduino?
> `setup()` sa vykoná raz po štarte (nastavenie pinov, sériovej linky),
> `loop()` sa opakuje stále.

> [!question]- Ako funguje servomotor?
> DC motor s prevodovkou a potenciometrom. Riadi sa PWM – šírka impulzu (1–2 ms
> pri 50 Hz) určuje uhol, elektronika porovná skutočnú polohu s požadovanou.

> [!question]- Čo je robot a čo manipulátor?
> Robot je programovateľný stroj, ktorý sníma okolie, rozhoduje a koná.
> Manipulátor je jeho mechanická časť (články, kĺby, pohony, efektor) na
> polohovanie a úchop.

> [!question]- Čo sú stupne voľnosti?
> Počet nezávislých pohybov. Na úplné polohovanie a natočenie v priestore treba 6.

> [!question]- Aké kinematické štruktúry poznáš?
> Kartézska, cylindrická, sférická, SCARA, angulárna; sériová a paralelná.

> [!question]- Aké typy podvozkov poznáš?
> Diferenciálny dvojkolesový, štvorkolesový, pásový, omnidirekcionálny
> (mecanum), kráčajúci.

> [!question]- Čo obsahuje sieťová dokumentácia?
> Fyzickú a logickú topológiu, adresnú tabuľku, VLAN plán, mapu portov,
> inventár zariadení, konfigurácie a ich zálohy, denník zmien.
