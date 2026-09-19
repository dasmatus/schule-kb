---
title: "E30 – Kalkulácia – počítačová zostava"
predmet: "Ekonomika"
typ: "maturitná téma"
okruh: "ekonomika"
číslo: 30
stav: "vypracované"
tags:
  - maturita
  - ekonomika
  - vypracovaná-téma
---

# E30 – Kalkulácia – počítačová zostava

> [!abstract] Zadanie
> dokáže vypočítať pre navrhnutú počítačovú zostavu náklady na dodávku hardvérového zariadenia potrebného pre aplikácie, ktoré umožňujú: prehrávať multimediálny obsah pamäťových médií, upravovať fotografie a video, hranie nenáročných počítačových hier

## 1. Vymedzenie pojmu

**Kalkulácia** je spôsob zisťovania alebo predbežného stanovenia [[Náklady|nákladov]], marže a ceny na kalkulačnú jednotku – v tomto prípade na jednu zostavenú počítačovú zostavu (hardvérové zariadenie). Základom je **[[Kalkulácia|kalkulačný vzorec]]**, ktorý postupne pripočítava jednotlivé druhy nákladov k priamemu materiálu, až kým sa nedospeje k predajnej cene.

Typický [[Kalkulácia|kalkulačný vzorec]]:

1. priamy materiál,
2. priame [[Mzda|mzdy]],
3. ostatné [[Náklady|priame náklady]],
4. výrobná (prevádzková) réžia,
5. **vlastné náklady výroby** (súčet položiek 1 až 4),
6. správna réžia,
7. **vlastné náklady výkonu** (súčet položiek 1 až 6),
8. zisk (zisková prirážka),
9. **predajná cena bez DPH**,
10. DPH,
11. **predajná cena s DPH**.

Pri tvorbe ceny podľa nákladov sa najčastejšie používa **prirážková metóda** – podnik vyčísli celkové náklady na jednotku výkonu a k nim pripočíta ziskovú prirážku.

## 2. Členenie a charakteristika

Zadanie požaduje navrhnúť hardvér pre tri typy úloh, z ktorých vyplývajú nároky na komponenty:

- **prehrávanie multimediálneho obsahu** (video, hudba z pamäťových médií) – nízke nároky na výkon, dôležitá je len dostatočná pripojiteľnosť a stabilný výkon procesora a grafiky pre dekódovanie videa,
- **úprava fotografií a videa** – vyššie nároky na **procesor (CPU)**, **operačnú pamäť (RAM)** a rýchle **úložisko (SSD)**, pri strihu videa pomáha aj výkonnejšia grafická karta (hardvérová akcelerácia),
- **hranie nenáročných počítačových hier** – vyžaduje samostatnú (dedikovanú) **grafickú kartu** aspoň nižšej strednej triedy, keďže integrovaná grafika procesora by na plynulý chod hier nestačila.

Z týchto požiadaviek vychádza návrh vyváženej zostavy strednej triedy (nie hráčsky „high-end", ale ani základný kancelársky počítač).

Náklady na dodávku hardvéru sa z pohľadu firmy (napr. IT firmy alebo e-shopu s komponentmi, ktorá zostavu zákazníkovi dodáva a montuje) delia na:

- **priamy materiál** – nákupná cena jednotlivých hardvérových komponentov,
- **priame [[Mzda|mzdy]]** – práca technika pri zostavení, inštalácii a otestovaní zariadenia,
- **réžiu** – podiel spoločných nákladov firmy (prenájom predajne/dielne, energie, správa) pripadajúci na túto zákazku,
- **zisk** – zisková prirážka firmy,
- **DPH** – daň z pridanej hodnoty, ktorú firma pripočíta k predajnej cene.

## 3. Postup / vzorce / výpočet

> [!info] Modelový výpočet
> Ceny komponentov sa v čase aj podľa dodávateľa výrazne menia, preto nasledujúca tabuľka používa ilustračné (modelové) ceny zodpovedajúce strednej triede zostavy. Postup kalkulácie (kalkulačný vzorec) zostáva rovnaký aj pri reálnych, aktuálnych cenách, ktoré treba pred použitím overiť v cenníku konkrétneho dodávateľa.

**Navrhnutá zostava a cena komponentov (priamy materiál):**

| Komponent | Modelová cena |
| --- | --- |
| Procesor (stredná trieda, 6 jadier) | 120 € |
| Základná doska | 90 € |
| Operačná pamäť 16 GB | 45 € |
| SSD disk (NVMe, 500 GB) | 35 € |
| Grafická karta (nižšia stredná trieda) | 220 € |
| Zdroj (550 W) | 45 € |
| Skriňa | 45 € |
| **Priamy materiál spolu** | **600 €** |

**Kalkulácia nákladov a ceny:**

- Priamy materiál: **600 €**
- Priama mzda (montáž, inštalácia OS a ovládačov, test – 2 hodiny × 15 €/hod): **30 €**
- Priame náklady spolu: 600 € + 30 € = **630 €**
- Výrobná a správna réžia (napr. 15 % z priamych nákladov): 630 € × 0,15 = **94,50 €**
- **Vlastné náklady výkonu:** 630 € + 94,50 € = **724,50 €**
- Zisková prirážka (napr. 10 % z vlastných nákladov): 724,50 € × 0,10 = **72,45 €**
- **Predajná cena bez DPH:** 724,50 € + 72,45 € = **796,95 €**
- DPH (základná sadzba 23 %, platná od 1. 1. 2025 aj v roku 2026): 796,95 € × 0,23 = **183,30 €**
- **Predajná cena s DPH:** 796,95 € + 183,30 € = **980,25 €**

Zákazník by za takto navrhnutú a zostavenú počítačovú zostavu zaplatil približne **980 €**, pričom firme z tejto ceny ostáva po odpočítaní nákladov zisk **72,45 €** pred zdanením jej vlastného hospodárskeho výsledku.

## 4. Príklad z praxe

Uvedený postup zodpovedá bežnej praxi malej **IT firmy alebo e-shopu s komponentmi**, ktorý zostavuje počítače na mieru podľa požiadaviek zákazníka. Zákazník príde s požiadavkou „chcem počítač na sledovanie filmov, úpravu fotiek z dovolenky, strih videa z dronu a občas si zahrať menej náročnú hru" – predajca na základe toho navrhne konkrétnu zostavu komponentov (ako v tabuľke vyššie), vypočíta jej obstarávaciu cenu, pripočíta si prácu za zostavenie a otestovanie, réžiu prevádzky a primeraný zisk, a takto stanovenú cenu (s DPH) ponúkne zákazníkovi ako konečnú cenu zostavy.

Firma pritom musí sledovať aj **ceny [[Konkurencia|konkurencie]]** (iné e-shopy s podobnou konfiguráciou) – ak by bola jej cena podstatne vyššia ako u [[Konkurencia|konkurencie]] pri porovnateľnom výkone, riskuje stratu zákazníka; ak by bola príliš nízka, mohla by nedostatočne pokryť svoje náklady a neprimerane znížiť zisk.

## 5. Zhrnutie na ústnu odpoveď

- Kalkulácia ceny hardvérovej zostavy postupuje podľa kalkulačného vzorca: priamy materiál + priame mzdy + réžia = vlastné náklady výkonu; k nim sa pripočíta zisk (predajná cena bez DPH) a napokon DPH (predajná cena s DPH).
- Voľba komponentov vychádza z požiadaviek úlohy: multimédiá a foto/video úprava kladú nároky na CPU, RAM a SSD, hranie hier vyžaduje samostatnú grafickú kartu.
- V modelovom príklade: priamy materiál 600 € + práca 30 € + réžia 94,50 € = vlastné náklady 724,50 €; po pripočítaní [[Zisk|zisku]] (10 %) a DPH (23 %) vychádza predajná cena cca 980 € s DPH.
- Použitá metóda tvorby ceny je **prirážková metóda** (náklady + prirážka na zisk), ktorú je vhodné porovnať aj s cenou konkurencie.

## Súvisiace poznámky

- [[E13 – Cenová politika podniku]]
- [[E11 – Náklady a výnosy podniku]]
- [[E31 – Kalkulácia – dátová dvojzásuvka]]
