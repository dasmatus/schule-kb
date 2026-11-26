---
title: "Harvardská a von Neumannova architektúra"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
dátum: 2026-09-21
zdroj: "99 Zdroje/pdf/Harvardská architektúra.pdf"
tags:
  - "ist"
  - "hardvér"
  - "architektúra"
  - "poznámky"
aktualizované: 2026-11-26
---

# Harvardská a von Neumannova architektúra

> [!info] Zdrojové dokumenty
> `Harvardská architektúra.pdf` (3 strany) a `Koncepcia Johna von
> Neumanna.pdf` (1 strana), zadanie z 21. 9. 2026 (PC architektúra,
> Mário Jurik). V trezore tieto dva súbory ešte nie sú; širší
> kontext je v [[História počítačov]] a v maturitnej téme
> [[T14 – Architektúra počítača a operačné systémy]]. Atomické heslá:
> [[Harvardská architektúra]], [[Von Neumannova architektúra]].

## Von Neumannova architektúra

V roku 1946 navrhli John von Neumann a kolegovia z Princeton Institute for Advanced Studies počítač postavený na týchto pravidlách:

1. Počítač obsahuje operačnú pamäť, ALJ (aritmeticko-logickú jednotku), radič a vstupno-výstupné zariadenia.
2. Predpis na riešenie úlohy je prevedený do postupnosti inštrukcií.
3. Údaje aj inštrukcie sú vyjadrené binárne.
4. Údaje aj inštrukcie sa uchovávajú v pamäti na miestach označených adresami.
5. Na zmenu poradia inštrukcií slúžia inštrukcie podmieneného a nepodmieneného skoku.
6. Programom riadené spracovanie dát prebieha v počítači samočinne.

V strede schémy je ALJ, činnosť celého počítača riadi radič. Radič odovzdáva povely pamäti, ALJ a V/V zariadeniam a naspäť od nich dostáva stavové hlásenia; číta inštrukcie z operačnej pamäte, dekóduje ich a prevádza na postupnosť signálov. ALJ číta dáta z pamäte alebo zo vstupu a výsledky odkladá do pamäte alebo na výstup. Schéma počítača IAS je až na malé výnimky platná dodnes.

## Harvardská architektúra

Túto architektúru navrhol Howard Aiken v 30. rokoch 20. storočia na Harvardskej univerzite pri vývoji reléového počítača Harvard Mark I (1944). Ďalej sa využila na Pensylvánskej univerzite pri elektronkovom počítači ENIAC. Bola to moderná koncepcia, ale vtedajšie technické prostriedky ju neumožnili plne realizovať, a preto sa presadila von Neumannova koncepcia. Asi po štyridsiatich rokoch, keď to umožnila výroba integrovaných obvodov, sa k nej vrátili.

Na rozdiel od von Neumannovej architektúry je pamäť rozdelená na dva bloky: zvlášť pamäť pre programy a zvlášť pamäť pre dáta.

**Znaky**

1. pamäť programu je oddelená od pamäte dát;
2. oddelené zbernice;
3. riadenie procesora je oddelené od riadenia vstupných a výstupných jednotiek (nie sú napojené priamo na ALU).

**Výhody:** inštrukcie a dáta sú v rôznych pamäťových priestoroch; zbernice môžu mať rôznu šírku; inštrukcie a dáta sa môžu spracovávať súčasne; program nemôže prepísať sám seba; možnosť zreťazenia inštrukcií (pipelining) a teda rýchlejšieho spracovania väčšieho objemu dát.

**Nevýhody:** dve zbernice kladú vyššie nároky na vývoj riadiacej jednotky a zvyšujú náklady; nevyužitú časť pamäte dát nemožno použiť pre program a naopak.

**Použitie:** jednoúčelové počítače a mikrokontroléry.

## Súvisiace

- [[Harvardská architektúra]] · [[Von Neumannova architektúra]]
- [[História počítačov]]
- [[T14 – Architektúra počítača a operačné systémy]]
- [[Informačné a sieťové technológie]] — predmet

> [!info] Naposledy aktualizované
> 2026-11-26 — Doplnenie poznámok z PC architektúry a kybernetickej bezpečnosti
