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

## Funkcie a metódy v C#

```csharp
class Kalkulacka
{
    // bezparametrická, bez návratovej hodnoty
    static void Pozdrav()
    {
        Console.WriteLine("Ahoj!");
    }

    // parametrická s návratovou hodnotou
    static int Sucet(int a, int b)
    {
        return a + b;
    }

    // preťaženie – rovnaký názov, iné parametre
    static double Sucet(double a, double b) => a + b;
    static int Sucet(int a, int b, int c) => a + b + c;

    // predvolená hodnota parametra
    static int PocetHosti(int prefix = 24)
    {
        return (int)Math.Pow(2, 32 - prefix) - 2;
    }

    // ref – metóda zmení premennú volajúceho; out – vráti ďalší výsledok
    static void Zdvojnasob(ref int x) { x *= 2; }
    static bool Del(int a, int b, out int vysledok)
    {
        if (b == 0) { vysledok = 0; return false; }
        vysledok = a / b; return true;
    }
}
```

| Pojem | Význam |
| --- | --- |
| **parameter** | premenná v hlavičke metódy (`int a`) |
| **argument** | konkrétna hodnota pri volaní (`Sucet(2, 3)`) |
| odovzdanie **hodnotou** | metóda dostane kópiu, originál sa nezmení (predvolené) |
| odovzdanie **referenciou** (`ref`, `out`) | metóda pracuje s originálom |
| **signatúra** | názov + počet, typy a poradie parametrov (bez návratového typu) |

## Statická vs. inštančná metóda

```csharp
class Router
{
    public static int Pocet = 0;      // statický – spoločný pre všetky routery
    public string Meno;               // inštančný – každý router má svoj

    public Router(string meno) { Meno = meno; Pocet++; }

    public void Vypis() => Console.WriteLine($"Router {Meno}");   // inštančná
    public static void VypisPocet() => Console.WriteLine(Pocet);  // statická
}

new Router("R1").Vypis();     // volanie na objekte
Router.VypisPocet();          // volanie na triede → 1
```

Preddefinované statické metódy: `Math.Sqrt()`, `Console.WriteLine()`,
`int.Parse()`, `string.IsNullOrEmpty()`. Preddefinované inštančné:
`text.ToUpper()`, `zoznam.Add()`, `cislo.ToString()`.

## OSPF podrobnejšie

**Typy paketov:** Hello (objavenie a udržiavanie susedov), DBD (súhrn
databázy), LSR (žiadosť o záznam), LSU (aktualizácia, nesie LSA), LSAck (potvrdenie).

**Stavy susedstva:** Down → Init → **2-Way** → ExStart → Exchange → Loading →
**Full**. Na broadcastovej sieti (Ethernet) ostávajú bežné routery medzi sebou
v 2-Way, úplné susedstvo (Full) majú len s DR a BDR.

**Router ID** sa určí v poradí: príkaz `router-id` → najvyššia IP loopbacku →
najvyššia IP aktívneho rozhrania.

**Voľba DR/BDR:** vyhrá najvyššia **priorita** rozhrania (predvolene 1, 0 =
nikdy nebude DR), pri zhode najvyššie **router ID**.

| Parameter | Hodnota |
| --- | --- |
| administratívna vzdialenosť | 110 |
| Hello / Dead interval (Ethernet) | 10 s / 40 s |
| algoritmus | Dijkstra (SPF) |
| multicast | 224.0.0.5 (všetky OSPF routery), 224.0.0.6 (DR/BDR) |

```text
interface g0/0
 ip ospf priority 255          ! tento router bude DR
 ip ospf cost 10               ! ručná cena rozhrania
router ospf 1
 auto-cost reference-bandwidth 1000   ! aby sa odlíšili 1 Gb/s a 100 Mb/s linky
 default-information originate       ! rozošli predvolenú trasu ostatným
```

## Krátka ústna odpoveď

Funkcia je znovupoužiteľný blok, metóda patrí triede alebo objektu. Bezparametrická nemá explicitné vstupy, parametrická prijíma argumenty a `return` odovzdá výsledok, kým `void` nič nevracia. Preťažovanie používa rovnaký názov s inou signatúrou. Statická metóda patrí triede, nestatická objektu; preddefinované metódy poskytuje knižnica. OSPF je link-state protokol s databázou topológie, oblasťami a SPF podľa costu.

## Súvisiace poznámky (CCNA2)

[[M14 – Routing Concepts]] — rozcestník [[CCNA2 – SRWE]]

## Pozri aj – CCNA3 ENSA

- [[ENSA 01 – Koncepty OSPFv2]]
- [[ENSA 02 – Konfigurácia OSPFv2]]

## Kontrolné otázky

> [!question]- Aký je rozdiel medzi funkciou a metódou?
> Funkcia je samostatný pomenovaný blok kódu, metóda patrí triede alebo
> objektu. V C# sú všetky funkcie metódy.

> [!question]- Aký je rozdiel medzi parametrom a argumentom?
> Parameter je premenná v deklarácii metódy, argument je hodnota, ktorú
> odovzdávam pri volaní.

> [!question]- Čo je preťaženie metód?
> Viac metód s rovnakým názvom, ale rôznymi parametrami (počet, typ, poradie).
> Prekladač vyberie podľa argumentov; samotný návratový typ nestačí.

> [!question]- Aký je rozdiel medzi odovzdaním hodnotou a referenciou?
> Hodnotou – metóda dostane kópiu, originál sa nezmení. Referenciou (`ref`,
> `out`) – metóda mení premennú volajúceho.

> [!question]- Aký je rozdiel medzi statickou a nestatickou metódou?
> Statická patrí triede, volá sa `Trieda.Metoda()`, nemá `this`. Nestatická
> patrí objektu, volá sa `objekt.Metoda()` a pracuje s jeho atribútmi.

> [!question]- Ako OSPF vyberá najlepšiu cestu?
> Routery si vymenia LSA, vytvoria rovnakú databázu topológie a Dijkstrovým
> algoritmom (SPF) vypočítajú cestu s najnižšou súčtovou cenou.

> [!question]- Ako sa volí DR a BDR?
> Najvyššia priorita rozhrania (predvolene 1), pri zhode najvyššie router ID.
> Priorita 0 = router nemôže byť DR.

> [!question]- Ako sa určuje router ID?
> Ručne príkazom `router-id`, inak najvyššia IP loopbacku, inak najvyššia IP
> aktívneho fyzického rozhrania.
