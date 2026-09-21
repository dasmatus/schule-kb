---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T22 – Funkcie a metódy

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> BEZPARAMETRICKÉ A PARAMETRICKÉ FUNKCIE A METÓDY - parametre, návratová hodnota, preťažovanie funkcií, preddefinované metódy, statické a nestatické metódy, OSPF

## Funkcia, metóda a parametre

Funkcia je pomenovaný znovupoužiteľný blok kódu, ktorý rieši jednu úlohu; metóda je funkcia patriaca triede alebo objektu. Deklarácia určuje návratový typ, názov a parametre. **Bezparametrická funkcia** nemá explicitné vstupy a pracuje iba s lokálnymi alebo objektovými údajmi. **Parametrická funkcia** prijíma argumenty, vďaka čomu je všeobecnejšia:

```text
funkcia plochaObdlznika(sirka, vyska):
    vráť sirka * vyska
```

Parametre môžu byť odovzdané hodnotou, referenciou alebo výstupným mechanizmom podľa jazyka. Pred volaním treba určiť, či funkcia môže meniť odovzdaný objekt; nečakané vedľajšie účinky sťažujú testovanie.

## Návratová hodnota

Návratová hodnota je výsledok odovzdaný volajúcemu cez `return`. Funkcia s typom `void` výsledok nevracia, môže však meniť stav alebo vykonať I/O. Všetky vetvy funkcie s neprázdnym návratovým typom musia skončiť platným výsledkom a chybový stav má byť riešený výnimkou, návratovým typom alebo explicitným výsledkom.

## Preťažovanie funkcií

Preťažovanie znamená viac funkcií s rovnakým názvom, ale odlišným zoznamom parametrov (počet, typ alebo poradie):

```text
vypis(text)
vypis(text, pocetOpakovani)
```

Kompilátor vyberá najvhodnejšiu signatúru. Samotný návratový typ zvyčajne na rozlíšenie nestačí. Preťažovanie treba používať zrozumiteľne; pri nejednoznačných implicitných konverziách môže vzniknúť chyba.

## Preddefinované metódy

Knižnica jazyka poskytuje hotové metódy, napríklad `ToString()` na textový opis, `Parse`/`TryParse` na konverziu, `String.Length`, `String.Contains`, `List.Add`, `Math.Sqrt` a `Math.Abs`. Pred použitím treba poznať, či vracajú nový objekt alebo menia pôvodný, aké majú výnimky a aké typy prijímajú.

## Statické a nestatické metódy

**Statická** metóda patrí triede a volá sa bez konkrétnej inštancie, napríklad `Math.Sqrt(9)`. Nemá implicitné `this` a nemôže priamo používať nestatické členy. **Nestatická (inštančná)** metóda sa volá na objekte a môže pracovať s jeho stavom:

```text
objekt.meranie()
Trieda.pomocnaFunkcia()
```

Statické údaje sú zdieľané triedou; treba zvážiť súbežnosť a životnosť. Inštančné členy patria každému objektu samostatne.

## OSPF

OSPF je vnútorný link-state smerovací protokol. Routery si vymieňajú stav liniek, vytvoria databázu topológie a každý router spustí SPF/Dijkstrov algoritmus. Cena (*cost*) sa viaže na priepustnosť rozhrania a cesta s najnižšou súčtovou cenou je preferovaná. OSPF podporuje oblasti; chrbticová je area 0. Na broadcastových sieťach sa volí DR/BDR, aby sa zmenšil počet susedstiev.

Ukážka konfigurácie v štýle Cisco IOS:

```text
router ospf 1
 router-id 1.1.1.1
 network 192.168.10.0 0.0.0.255 area 0
```

Overuje sa `show ip ospf neighbor`, `show ip ospf interface` a `show ip route ospf`. Wildcard maska v príklade je doplnková k `/24`; presná konfigurácia závisí od platformy.

## Krátka ústna odpoveď

Funkcia je znovupoužiteľný blok, metóda patrí triede alebo objektu. Bezparametrická nemá explicitné vstupy, parametrická prijíma argumenty a `return` odovzdá výsledok, kým `void` nič nevracia. Preťažovanie používa rovnaký názov s inou signatúrou. Statická metóda patrí triede, nestatická objektu; preddefinované metódy poskytuje knižnica. OSPF je link-state protokol s databázou topológie, oblasťami a SPF podľa costu.
