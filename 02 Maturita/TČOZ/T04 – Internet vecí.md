---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T04 – Internet vecí

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> INTERNET VECÍ – architektúra, hardvér, komponenty, programátorské rozhranie, softvér IoT, Ohmov zákon, Kirchhofove zákony

## Definícia a architektúra internetu vecí

Internet vecí (IoT) prepája fyzické objekty, senzory, akčné členy a softvérové služby cez komunikačné siete. Zariadenie meria stav prostredia, odošle údaj na spracovanie a podľa výsledku môže vykonať akciu. Architektúra sa v praxi delí na vrstvy:

1. **zariadenie/snímacia vrstva** — senzor, akčný člen a mikrokontrolér,
2. **prístupová sieť** — Ethernet, Wi-Fi, Bluetooth LE, Zigbee, LoRaWAN alebo mobilná sieť,
3. **brána a edge** — preklad protokolov, lokálne filtrovanie a reakcia s malým oneskorením,
4. **platforma/cloud** — príjem správ, databáza, analýza, pravidlá a správa zariadení,
5. **aplikácia** — dashboard, mobilná aplikácia alebo automatizované rozhranie.

Bezpečnosť, identita zariadenia, aktualizácie a správa kľúčov prechádzajú všetkými vrstvami. Nie každé IoT riešenie musí používať cloud; pri citlivých alebo časovo kritických úlohách sa časť spracovania ponechá lokálne.

## Hardvér a komponenty

Typické IoT zariadenie obsahuje:

- mikrokontrolér alebo jednodeskový počítač,
- digitálne snímače a analógové snímače s A/D prevodníkom,
- akčné členy, napríklad relé, LED, ventil alebo motor,
- GPIO piny, PWM, komunikačné rozhrania UART, I²C alebo SPI,
- pamäť programu a dát, prípadne RTC hodiny,
- komunikačný modul a anténu,
- napájanie, menič, batériu a obvod na úsporný režim,
- puzdro a ochranu pred prostredím.

Pri voľbe hardvéru sa posudzuje spotreba, dosah, priepustnosť, latencia, presnosť merania, rozsah teplôt a možnosť aktualizácie firmvéru.

## Programátorské rozhranie a softvér IoT

Na úrovni mikrokontroléra je programátorské rozhranie API alebo knižnica, ktorá poskytuje funkcie na čítanie GPIO/ADC, zápis PWM, komunikáciu a časovanie. Na úrovni siete ide o aplikačné API, napríklad REST/HTTP alebo publikovanie a odber správ cez MQTT. MQTT používa brokera a témy, čo je vhodné pre malé správy a prerušované pripojenie.

Softvérový zásobník tvoria:

- bootloader a firmware s inicializáciou a hlavnou slučkou,
- ovládače snímačov a komunikačného modulu,
- protokolová vrstva a autentifikácia,
- gateway/broker a služba na ukladanie časových radov,
- dashboard, pravidlá automatizácie a logovanie,
- bezpečné OTA aktualizácie.

Príklad logiky je: zmerať teplotu každých 10 sekúnd, hodnotu overiť proti rozsahu, publikovať ju na `dom/izba/teplota` a pri prekročení limitu zapnúť ventilátor. Do správ sa nemajú ukladať heslá ani tajné kľúče v otvorenom tvare.

## Ohmov zákon a výkon

Pre rezistor platí

`U = R·I`, `I = U/R`, `R = U/I`.

Výkon možno vypočítať ako `P = U·I = I²R = U²/R`. Ak je LED napájaná z `5 V`, má úbytok `2 V` a požadovaný prúd `10 mA`, sériový rezistor je približne

`R = (5 - 2)/0,01 = 300 Ω`.

Zvolí sa najbližšia vhodná normalizovaná hodnota a overí sa jeho výkonové zaťaženie. V IoT je výpočet dôležitý aj pre dimenzovanie batérie a regulátora.

## Kirchhoffove zákony

**Prvý Kirchhoffov zákon** pre uzol vyjadruje zachovanie náboja: súčet prúdov vtekajúcich do uzla sa rovná súčtu prúdov vytekajúcich. Algebraicky `ΣI = 0`.

**Druhý Kirchhoffov zákon** pre uzavretú slučku vyjadruje súčet napätí: `ΣU = 0`, teda zdrojové napätie sa rovná súčtu úbytkov na prvkoch. Pomocou oboch zákonov možno vypočítať prúdy v rozvetvenom obvode a skontrolovať, či elektrická časť zariadenia neprekračuje limity.

## Platformy a komunikačné technológie

| Platforma | Čo to je | Typické použitie |
| --- | --- | --- |
| **Arduino** (Uno, Nano) | mikrokontrolér bez OS, program v C/C++ | snímače, riadenie motorov, výuka |
| **ESP32 / ESP8266** | mikrokontrolér s Wi-Fi (ESP32 aj Bluetooth) | lacné sieťové IoT zariadenia |
| **Raspberry Pi** | jednodoskový počítač s Linuxom | brána, server, kamera, dashboard |

| Technológia | Dosah | Spotreba | Rýchlosť | Použitie |
| --- | --- | --- | --- | --- |
| Wi-Fi | desiatky m | vysoká | vysoká | domáce zariadenia, kamery |
| Bluetooth LE | ~10 m | veľmi nízka | nízka | nositeľná elektronika |
| Zigbee | ~10–100 m, sieť mesh | nízka | nízka | inteligentná domácnosť |
| LoRaWAN | km | veľmi nízka | veľmi nízka | poľnohospodárstvo, odpočty |
| NB-IoT / LTE-M | km (mobilná sieť) | nízka | nízka | merače, sledovanie |

**MQTT** funguje na princípe *publish/subscribe*: zariadenie publikuje správu
do témy (`dom/izba/teplota`), **broker** (napr. Mosquitto) ju doručí všetkým
odberateľom tej témy. Štandardný port je **1883**, so šifrovaním TLS **8883**.

## Príklad programu (Arduino)

```cpp
const int SENZOR = A0;      // analógový snímač teploty
const int VENTILATOR = 7;   // relé ventilátora

void setup() {
  pinMode(VENTILATOR, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int hodnota = analogRead(SENZOR);          // 0 až 1023
  float napatie = hodnota * 5.0 / 1023.0;
  float teplota = napatie * 100.0;           // LM35: 10 mV/°C
  Serial.println(teplota);
  digitalWrite(VENTILATOR, teplota > 30 ? HIGH : LOW);
  delay(1000);
}
```

`setup()` sa vykoná raz po štarte, `loop()` sa opakuje stále dokola.

## Delič napätia

`U_výst = U_vst · R2 / (R1 + R2)`

Pri `5 V` a `R1 = R2 = 10 kΩ` je na výstupe `2,5 V`. Takto sa pripája
napr. fotorezistor alebo termistor k analógovému vstupu. **Pull-up rezistor**
(napr. 10 kΩ k napájaniu) drží vstup tlačidla v definovanom stave `1`, kým
tlačidlo nie je stlačené.

## Riešený príklad – Kirchhoffove zákony

Zdroj `12 V`, `R1 = 100 Ω` v sérii s paralelnou dvojicou `R2 = R3 = 200 Ω`.

1. `R23 = (200 · 200) / (200 + 200) = 100 Ω`
2. `R = R1 + R23 = 200 Ω`, `I = 12 / 200 = 0,06 A = 60 mA`
3. `U1 = 100 · 0,06 = 6 V`, `U23 = 100 · 0,06 = 6 V`
4. `I2 = I3 = 6 / 200 = 30 mA`

Kontrola: **1. KZ** v uzle `60 mA = 30 mA + 30 mA`, **2. KZ** v slučke
`12 V = 6 V + 6 V`.

## Výdrž batérie

`t = kapacita / priemerný prúd`. Batéria `2000 mAh` pri priemernom odbere
`20 mA` vydrží asi `100 h`. Preto IoT zariadenia väčšinu času **spia**
(*deep sleep*, odber v µA) a prebudia sa len na meranie a odoslanie.

## Krátka ústna odpoveď

IoT spája senzory, mikrokontrolér, komunikačnú sieť, bránu alebo cloud a používateľskú aplikáciu. Hardvér tvoria snímače, akčné členy, GPIO/ADC/PWM, pamäť, komunikácia a napájanie; softvér tvorí firmware, API, MQTT/HTTP, broker, databáza a dashboard. Pri návrhu používam Ohmov zákon a výkonové vzťahy a pri zložitejších obvodoch Kirchhoffove zákony. Dôležitá je aj autentifikácia, šifrovanie a bezpečná aktualizácia.

Hardvér Arduina obsahuje mikrokontrolér, digitálne a analógové piny, napájanie a rozhrania UART/I2C/SPI. API je rozhranie, cez ktoré aplikácie komunikujú; IoT softvér spracúva dáta, vizualizuje ich a riadi zariadenie. Pri návrhu treba riešiť aktualizácie, silné heslá, šifrovanie a minimálne oprávnenia.

Ohmov zákon: `U = R·I`. Kirchhoffov prúdový zákon: súčet prúdov do uzla je nulový; napäťový zákon: algebraický súčet napätí v slučke je nulový.

## Kontrolné otázky

> [!question]- Opíš vrstvy architektúry IoT.
> Zariadenie (senzory, akčné členy, MCU) → prístupová sieť (Wi-Fi, BLE, Zigbee,
> LoRaWAN) → brána/edge → platforma/cloud (databáza, analýza) → aplikácia
> (dashboard). Bezpečnosť prechádza všetkými.

> [!question]- Aký je rozdiel medzi Arduinom a Raspberry Pi?
> Arduino je mikrokontrolér bez OS, ktorý vykonáva jeden program. Raspberry Pi
> je počítač s Linuxom, zvládne viac úloh naraz a sieťové služby.

> [!question]- Ako funguje MQTT?
> Publish/subscribe: klient publikuje správu do témy, broker ju pošle
> odberateľom. Je úsporný, vhodný pre malé správy a nestabilné pripojenie.

> [!question]- Vypočítaj rezistor pre LED (5 V, úbytok 2 V, 10 mA).
> `R = (5 − 2) / 0,01 = 300 Ω`, zvolím najbližšiu vyššiu normalizovanú hodnotu (330 Ω).

> [!question]- Vyslov oba Kirchhoffove zákony.
> 1. KZ: súčet prúdov vtekajúcich do uzla = súčet vytekajúcich (`ΣI = 0`).
> 2. KZ: v uzavretej slučke je súčet napätí nulový, napätie zdroja = súčet úbytkov.

> [!question]- Na čo slúžia rozhrania GPIO, ADC, PWM, I²C, SPI a UART?
> GPIO – digitálne vstupy/výstupy; ADC – meranie analógového napätia; PWM –
> regulácia výkonu; I²C, SPI, UART – sériová komunikácia so snímačmi a modulmi.

> [!question]- Aké bezpečnostné riziká má IoT a ako sa im bráni?
> Predvolené heslá, nešifrovaná komunikácia, neaktualizovaný firmvér.
> Obrana: vlastné silné heslá, TLS, bezpečné OTA aktualizácie, oddelená sieť
> (VLAN) pre IoT, minimálne oprávnenia.
