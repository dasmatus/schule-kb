---
title: "E31 – Kalkulácia – dátová dvojzásuvka"
predmet: "Ekonomika"
typ: "maturitná téma"
okruh: "ekonomika"
číslo: 31
stav: "vypracované"
tags:
  - maturita
  - ekonomika
  - vypracovaná-téma
---

# E31 – Kalkulácia – dátová dvojzásuvka

> [!abstract] Zadanie
> dokáže vypočítať cenu za použitý materiál, náklady na montáž potrebnej na realizáciu predmetnej dátovej dvojzásuvky a ktoré metódy tvorby ceny pri výpočte použijete

## 1. Vymedzenie pojmu

**[[Kalkulácia]]** je vyčíslenie nákladov, marže ([[Zisk|zisku]]) a ceny na kalkulačnú jednotku – v tomto prípade na jednu zrealizovanú **dátovú dvojzásuvku** (dodávka materiálu + montážna práca u zákazníka). [[Kalkulácia]] je podkladom pre stanovenie ceny, ktorú firma ponúkne zákazníkovi, napríklad vo forme cenovej ponuky alebo položky rozpočtu stavby.

Základom kalkulácie sú **náklady** – peňažne vyjadrená spotreba práce a prostriedkov na daný výkon. Pri montážnej zákazke rozlišujeme:

- **[[Náklady|priame náklady]]** – dajú sa presne priradiť k danej zásuvke (spotrebovaný materiál, priama mzda montéra),
- **[[Náklady|nepriame náklady]] (réžia)** – spoločné náklady firmy (doprava, náradie, odpisy meracích prístrojov, administratíva), ktoré nemožno priamo priradiť ku konkrétnej zásuvke a rozpočítavajú sa napr. prirážkou.

**Cena** je peňažné vyjadrenie hodnoty výkonu; jej **dolnou hranicou sú náklady** – ak by firma predávala pod úrovňou vlastných nákladov, dosahovala by na zákazke stratu.

## 2. Členenie a charakteristika

**Kalkulačný vzorec** použitý pri montážnej zákazke:

1. priamy materiál
2. priama mzda (montáž)
3. réžia (výrobná a správna)
4. **= vlastné náklady výkonu**
5. zisková prirážka
6. **= cena bez DPH**
7. DPH
8. **= cena s DPH (predajná cena pre zákazníka)**

**Metódy tvorby ceny**, medzi ktorými si firma pri zákazkovej montáži vyberá:

| Metóda | Podstata | Vhodnosť pre montáž dátovej zásuvky |
| --- | --- | --- |
| **Nákladová – prirážková** | K vlastným nákladom na jednotku (materiál + mzda + réžia) sa pripočíta percentuálna prirážka na zisk | **Áno** – najčastejšia metóda pri zákazkových prácach, keďže náklady na jednu zásuvku sú presne vyčísliteľné |
| **Nákladová – analytická** | Cena sa odvodí z nulového bodu (bodu zvratu) pri danom objeme výroby | Nevhodná – zásuvka je jednorazová zákazka, nie sériová výroba s fixným objemom |
| **Podľa dopytu** | Cena sa odvíja od ochoty zákazníka platiť a elasticity dopytu | Doplnkovo – pri väčších zákazkách (napr. 50 zásuviek naraz) môže firma cenu prispôsobiť |
| **Podľa konkurencie** | Cena sa porovnáva s cenami iných montážnych firiem v regióne | Doplnkovo – slúži na overenie konkurencieschopnosti výslednej ceny |

Pre výpočet ceny jednej dátovej dvojzásuvky sa preto použije **nákladová prirážková metóda**, doplnená o kontrolu voči cenám [[Konkurencia|konkurencie]].

## 3. Postup / vzorce / výpočet

**Zadanie príkladu:** IT firma realizuje pre klienta montáž jednej dátovej dvojzásuvky (2× port RJ45, kategória 6) vrátane pripojenia na dátový rozvádzač v tej istej miestnosti.

**a) Materiál**

| Položka | Množstvo | Jednotková cena | Spolu |
| --- | --- | --- | --- |
| Keystone modul RJ45 Cat6 UTP | 2 ks | 3,50 €/ks | 7,00 € |
| Rámček pre 2 moduly (inštalačný systém) | 1 ks | 4,20 €/ks | 4,20 € |
| Podomietková krabica (KU68) | 1 ks | 1,80 €/ks | 1,80 € |
| Kábel UTP Cat6 (2× cca 5 m k rozvádzaču) | 10 m | 0,35 €/m | 3,50 € |
| Krycí kryt zásuvky | 1 ks | 2,50 €/ks | 2,50 € |
| Drobný spojovací materiál (úchytky, popisné štítky) | – | – | 1,00 € |
| **Materiál spolu** | | | **20,00 €** |

**b) Montáž (priama mzda)**

> [!tip] Čo povedať na skúške
> Hodinová sadzba montéra je trhová (kalkulovaná) cena práce konkrétnej firmy – zákon určuje len jej dolnú hranicu, teda minimálnu mzdu (zákon č. 663/2007 Z. z.). Na skúške dodaj, že do ceny práce patria okrem mzdy aj **odvody zamestnávateľa** za zamestnanca.
> V príklade sa preto počíta s ilustratívnou sadzbou 15 €/hod.; reálny rád veľkosti si prípadne over v platových prieskumoch na profesia.sk/platy.sk.

Predpokladaný čas práce (vŕtanie/uloženie krabice, zapojenie 2 konektorov podľa normy T568B, osadenie rámčeka a krytu, zameranie testerom): **1 hodina**.

Priama mzda montáže = 1 hod × 15,00 €/hod = **15,00 €**

**c) Priame náklady spolu**

Priame náklady = materiál + priama mzda = 20,00 € + 15,00 € = **35,00 €**

**d) Réžia**

Firma kalkuluje réžiu (doprava vozidlom, [[Odpisy|opotrebenie]] náradia a meracieho prístroja, administratíva) ako **20 %** z priamych nákladov:

Réžia = 0,20 × 35,00 € = **7,00 €**

**e) Vlastné náklady výkonu**

Vlastné náklady = priame náklady + réžia = 35,00 € + 7,00 € = **42,00 €**

**f) Zisková prirážka**

Firma pripočíta ziskovú prirážku vo výške **15 %** z vlastných nákladov:

Zisk = 0,15 × 42,00 € = **6,30 €**

**g) Cena bez DPH**

Cena bez DPH = 42,00 € + 6,30 € = **48,30 €**

**h) Cena s DPH**

> [!info] Overené
> Sadzba DPH 23 % je základná sadzba platná od 1. 1. 2025 podľa **§ 27 zákona č. 222/2004 Z. z. o dani z pridanej hodnoty** a podľa oficiálnej informácie Finančnej správy SR (financnasprava.sk, sekcia Sadzby dane) sa nemení ani od 1. 1. 2026 – zmeny k tomuto dátumu sa týkajú len zaradenia niektorých konkrétnych tovarov do znížených sadzieb (19 % a 5 %), nie výšky základnej sadzby. Napriek tomu si pred podaním reálnej cenovej ponuky over aktuálne platnú sadzbu na [financnasprava.sk](https://www.financnasprava.sk/sk/podnikatelia/dane/dan-z-pridanej-hodnoty/sadzby-dane), keďže sa zákon o DPH mení pomerne často.

Cena s DPH = 48,30 € × 1,23 = **59,41 €**

**Výsledok:** cena za materiál je 20,00 €, náklady na montáž (priama mzda) 15,00 €, konečná cena pre zákazníka po pripočítaní réžie, zisku a DPH je **59,41 €**. Použitá bola **nákladová prirážková metóda** tvorby ceny.

## 4. Príklad z praxe

IT firma zaoberajúca sa štruktúrovanou kabelážou pripravuje **cenovú ponuku** pre klienta, ktorý si pri rekonštrukcii kancelárií objednáva **50 dátových dvojzásuviek**. Firma najprv vypočíta náklady a cenu na jednu zásuvku vyššie uvedeným postupom, následne ju vynásobí počtom zásuviek a **zohľadní úsporu z rozsahu** – pri väčšom množstve klesá jednotková réžia (hromadný nákup materiálu, jedna cesta na stavbu pre celú zákazku namiesto 50 samostatných výjazdov). Zároveň si firma overí ceny konkurenčných montážnych firiem v regióne (metóda podľa [[Konkurencia|konkurencie]]), aby ponuka nebola ani stratová, ani nekonkurencieschopná. Výsledná jednotková cena v ponuke tak môže byť nižšia než 59,41 € práve vďaka rozpočítaniu réžie na väčší počet zásuviek.

## 5. Zhrnutie na ústnu odpoveď

- Kalkulácia ceny montáže = **materiál (priamy) + priama mzda + réžia = vlastné náklady**, k nim sa pripočíta **zisková prirážka** a **DPH**.
- Použitá metóda: **nákladová (prirážková) metóda tvorby ceny** – najbežnejšia pri zákazkových montážnych prácach, keďže náklady na kus sú presne vyčísliteľné.
- Doplnkovo sa cena overuje **metódou podľa konkurencie**, aby bola ponuka konkurencieschopná.
- Príklad: materiál 20,00 € + montáž 15,00 € = priame náklady 35,00 €; s réžiou (7,00 €) vlastné náklady 42,00 €; so [[Zisk|ziskom]] (6,30 €) cena bez DPH 48,30 €; s DPH cena 59,41 €.

## Súvisiace poznámky

- [[Odbytové činnosti podniku]]
- [[Podstata finančného hospodárenia podniku]]
- [[Zoznam tém – ekonomika]]
