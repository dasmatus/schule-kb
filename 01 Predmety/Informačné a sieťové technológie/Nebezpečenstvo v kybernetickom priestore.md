---
title: "Nebezpečenstvo v kybernetickom priestore"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
dátum: 2026-11-09
zdroj: "99 Zdroje/pdf/1 Nebezpečenstvo.pdf"
tags:
  - "ist"
  - "kybernetická-bezpečnosť"
  - "poznámky"
aktualizované: 2026-11-26
---

# Nebezpečenstvo v kybernetickom priestore

> [!info] Zdrojový dokument
> `1 Nebezpečenstvo.pdf` — modul 1 kurzu CyberOps Associate v1.0
> (11 strán, zadanie 9. 11. 2026, 1 KB). Originál v trezore ešte nie
> je. Nadväzujúci modul 2 je už spracovaný v
> [[Kybernetická bezpečnosť – SOC a kariéra]] (`2 Bojovníci vo vojne
> proti počítačovej kriminalite.pdf`). Čísla a príklady nižšie sú
> citované z kurzu, nie samostatne aktualizované.

## Úvod kurzu (1.0)

Kurz pripravuje na prácu bezpečnostného analytika na úrovni spolupracovníka v SOC. Po jeho absolvovaní má študent vedieť okrem iného nainštalovať virtuálne stroje na analýzu hrozieb, vysvetliť úlohu analytika, pracovať s Windows a Linuxom v kontexte analýzy, klasifikovať sieťové útoky, používať nástroje na monitorovanie, vysvetliť vplyv kryptografie, skúmať zraniteľnosti koncových bodov a aplikovať modely odozvy na incidenty.

**Vyhlásenie o etickom hackovaní.** Nástroje a techniky z kurzu sa smú používať iba eticky a v poskytnutom sandboxovom prostredí virtuálnych strojov. Experimentovanie mimo tohto prostredia je na uvážení inštruktora a školy.

Cieľ modulu *Nebezpečenstvo*: pochopiť aktérov hrozieb, „vojnové príbehy“ a vplyv hrozby.

## Vojnové príbehy (1.1)

Dokument uvádza tri typy dopadov:

- **Unesené osoby** — kybernetický útok môže ohroziť aj bezpečnosť ľudí.
- **Vykúpené spoločnosti** — vydieranie (ransomware) a odstavenie prevádzky.
- **Cielené národy** — útoky motivované politikou a národnou bezpečnosťou.

Ako príklad kurz spomína útok škodlivého kódu **Stuxnet** (cielený na priemyselné riadenie, v texte spojený s obavami o národnú bezpečnosť) a DDoS útok z októbra 2016 proti poskytovateľovi DNS **Dyn**, ktorý dočasne vyradil množstvo známych webov; zdrojom bola sieť nezabezpečených zariadení internetu vecí (kamery, rekordéry, smerovače).

## Aktéri hrozieb (1.2)

Kurz rozlišuje okrem iného:

- **amatérov**, ktorí často využívajú verejne dostupné návody a nástroje;
- **hacktivistov**;
- aktérov motivovaných **finančným ziskom**;
- aktérov zameraných na **obchodné tajomstvá a globálnu politiku**.

Osobitná otázka je bezpečnosť **internetu vecí**: nezabezpečené zariadenia sa dajú zneužiť ako súčasť botnetu (príklad Dyn vyššie). Kurz odkazuje aj na TED prednášku Avi Rubin o nebezpečenstvách nezabezpečených IoT zariadení.

## Vplyv hrozby (1.3)

- **PII, PHI a PSI** — osobné údaje, zdravotné údaje a ďalšie citlivé informácie sú lukratívnym cieľom; únik zoznamov PII sa ďalej predáva alebo zneužíva.
- **Stratená konkurenčná výhoda** — firemná špionáž a krádež duševného vlastníctva.
- **Politika a národná bezpečnosť** — útoky na kritickú infraštruktúru (priehrady, elektrická sieť). Stuxnet je v texte uvedený ako príklad.

Kurz uvádza odhad, že podniky stratia do roku 2024 v dôsledku kybernetických útokov viac ako **5 biliónov dolárov** ročne. Ide o číslo z učebného textu, nie o mnou overený aktuálny štatistický údaj.

## Zhrnutie modulu (1.4)

Študent má vedieť rozlíšiť typy aktérov hrozieb, uviesť príklady „vojnových príbehov“ a vysvetliť ekonomický, osobný a bezpečnostný dopad útokov.

## Súvisiace

- [[Kybernetická bezpečnosť – SOC a kariéra]] — modul 2 toho istého kurzu
- [[ENSA 03 – Koncepty sieťovej bezpečnosti]]
- [[T07 – Kybernetická bezpečnosť]]
- [[Informačné a sieťové technológie]] — predmet

> [!info] Naposledy aktualizované
> 2026-11-26 — Doplnenie poznámok z PC architektúry a kybernetickej bezpečnosti
