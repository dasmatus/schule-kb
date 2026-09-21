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

## Krátka ústna odpoveď

IoT spája senzory, mikrokontrolér, komunikačnú sieť, bránu alebo cloud a používateľskú aplikáciu. Hardvér tvoria snímače, akčné členy, GPIO/ADC/PWM, pamäť, komunikácia a napájanie; softvér tvorí firmware, API, MQTT/HTTP, broker, databáza a dashboard. Pri návrhu používam Ohmov zákon a výkonové vzťahy a pri zložitejších obvodoch Kirchhoffove zákony. Dôležitá je aj autentifikácia, šifrovanie a bezpečná aktualizácia.

Hardvér Arduina obsahuje mikrokontrolér, digitálne a analógové piny, napájanie a rozhrania UART/I2C/SPI. API je rozhranie, cez ktoré aplikácie komunikujú; IoT softvér spracúva dáta, vizualizuje ich a riadi zariadenie. Pri návrhu treba riešiť aktualizácie, silné heslá, šifrovanie a minimálne oprávnenia.

Ohmov zákon: `U = R·I`. Kirchhoffov prúdový zákon: súčet prúdov do uzla je nulový; napäťový zákon: algebraický súčet napätí v slučke je nulový.
