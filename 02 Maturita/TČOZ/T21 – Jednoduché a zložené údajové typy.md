---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T21 – Jednoduché a zložené údajové typy

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> JEDNODUCHÉ A ZLOŽENÉ ÚDAJOVÉ TYPY - reťazce, klasické pole, vytvorenie poľa z hľadiska pamäte, úložiská údajov, kolekcie, kontajnery, DualStack

## Jednoduché údajové typy a reťazce

Jednoduchý (primitívny) typ reprezentuje jednu hodnotu a určuje jej veľkosť, rozsah a povolené operácie. Patria sem celé čísla, desatinné čísla, znak a logická hodnota `boolean`. Treba rozlišovať rozsah typu, pretečenie a presnosť desatinných čísel; peniaze sa preto často ukladajú ako celé najmenšie jednotky alebo desatinný typ s definovanou presnosťou.

**Reťazec** je postupnosť znakov. V moderných jazykoch môže byť uložený ako objekt s dĺžkou a kódovaním Unicode. Operácie sú dĺžka, indexovanie, spájanie, vyhľadanie podreťazca, porovnanie, nahradenie a rozdelenie. Reťazec je často nemenný, takže opakované spájanie v cykle môže vytvárať mnoho dočasných objektov; vhodný je builder alebo kolekcia. Pri vstupe treba rozlišovať prázdny reťazec, biele znaky a kódovanie.

## Klasické pole

Klasické pole je súvislý blok prvkov rovnakého typu, ku ktorým pristupujeme indexom. Pri nulovom indexovaní má pole dĺžky `n` platné indexy `0` až `n-1`; prístup mimo hraníc je chyba. Výhodou je `O(1)` prístup podľa indexu a dobrá lokalita v pamäti, nevýhodou pevná veľkosť a nákladné vloženie uprostred.

### Vytvorenie poľa z hľadiska pamäte

Pri vytvorení sa rezervuje súvislý priestor pre `n` prvkov a vypočíta sa adresa prvku približne `adresa(A[i]) = základ + i·veľkosť_prvku`. Statické pole môže byť súčasťou zásobníka alebo dátovej oblasti, dynamicky vytvorené pole býva na halde a premenná drží referenciu; presné umiestnenie závisí od jazyka a runtime. Inicializácia nastaví prvky na predvolené hodnoty alebo na zadané hodnoty. Pri veľkom poli treba sledovať pamäť a životnosť objektu.

## Úložiská údajov, kolekcie a kontajnery

Údaje môžu byť uložené v operačnej pamäti, v textových/binárnych súboroch, v relačnej alebo dokumentovej databáze, na blokovom úložisku alebo v objektovom úložisku. Rozhoduje sa podľa trvácnosti, objemu, rýchlosti, súbežného prístupu, zálohovania a konzistencie.

Kolekcie flexibilnejšie spravujú viac prvkov:

- zoznam (`List`) zachováva poradie a umožňuje duplicity,
- množina (`Set`) udržiava jedinečné prvky a rýchlo testuje členstvo,
- mapa/slovník (`Dictionary`, `Map`) spája kľúč s hodnotou,
- front (`Queue`) pracuje FIFO, zásobník (`Stack`) LIFO.

Kontajner môže znamenať dátovú štruktúru, ale v prevádzke aplikácií aj izolované prostredie s programom a závislosťami (napr. kontajnerová platforma). Význam treba vyvodiť z kontextu; v tejto téme ide o oba bežné významy.

## Dual Stack

Dual Stack prevádzkuje IPv4 aj IPv6 súčasne na rovnakom zariadení a rozhraní. DNS môže vrátiť `A` aj `AAAA`; hostiteľ sa pokúsi použiť IPv6 a pri zlyhaní môže použiť IPv4 podľa algoritmu operačného systému. Sieť preto potrebuje adresy, routing, firewall a monitorovanie pre oba protokoly. Dual Stack uľahčuje postupný prechod, ale dočasne zdvojuje konfiguráciu a bezpečnostné pravidlá.

## Jednoduché typy v C#

| Typ | Veľkosť | Rozsah / presnosť | Príklad |
| --- | --- | --- | --- |
| `byte` | 1 B | 0 až 255 | `byte oktet = 192;` |
| `short` | 2 B | −32 768 až 32 767 | |
| `int` | 4 B | ≈ ±2,1 miliardy | `int port = 443;` |
| `long` | 8 B | ≈ ±9,2·10¹⁸ | `long bajty = 5_000_000_000;` |
| `float` | 4 B | ~7 platných číslic | `float t = 21.5f;` |
| `double` | 8 B | ~15–16 platných číslic | `double pi = 3.14159;` |
| `decimal` | 16 B | 28–29 číslic, presný | `decimal cena = 19.99m;` (peniaze) |
| `char` | 2 B | jeden znak Unicode | `char c = 'A';` |
| `bool` | 1 B | `true` / `false` | `bool up = true;` |

`string` nie je jednoduchý typ – je to **referenčný** typ (objekt), ale
správa sa „hodnotovo“ (je nemenný).

## Reťazce v C#

```csharp
string ip = "192.168.10.37";
ip.Length;                    // 13
ip[0];                        // '1'
ip.Contains("10");            // true
ip.IndexOf('.');              // 3
ip.Substring(0, 7);           // "192.168"
ip.Replace(".", "-");         // "192-168-10-37"
string[] oktety = ip.Split('.');   // {"192","168","10","37"}
ip.ToUpper(); ip.Trim();      // veľké písmená, odstránenie medzier
string spojene = string.Join(":", oktety);

// veľa spájaní v cykle – StringBuilder namiesto +
var sb = new System.Text.StringBuilder();
for (int i = 0; i < 1000; i++) sb.Append(i).Append(',');
string vysledok = sb.ToString();
```

## Pole v pamäti

```csharp
int[] a = new int[4];          // 4 × 4 B = 16 B súvislej pamäte, prvky = 0
int[] b = { 5, 8, 2, 9 };      // inicializácia hodnotami
int[,] m = new int[2, 3];      // obdĺžnikové 2D pole
int[][] z = new int[3][];      // zubaté pole (pole polí)
```

```text
zásobník (stack)         halda (heap)
┌───────────┐            ┌────┬────┬────┬────┐
│ b ─────────────────────▶│ 5  │ 8  │ 2  │ 9  │
└───────────┘            └────┴────┴────┴────┘
                          adresa b[i] = začiatok + i · 4 B
```

Premenná `b` v zásobníku drží len **odkaz**; samotné prvky sú na **halde**.
Preto `int[] c = b;` neskopíruje pole – `c` a `b` ukazujú na to isté.

## Kolekcie v C#

```csharp
var zoznam = new List<string> { "R1", "R2" };
zoznam.Add("SW1"); zoznam.Remove("R2"); int pocet = zoznam.Count;

var mac = new Dictionary<string, int>();      // MAC → port
mac["00:1A:2B:3C:4D:5E"] = 3;
if (mac.TryGetValue("00:1A:2B:3C:4D:5E", out int port)) { /* port = 3 */ }

var front = new Queue<string>();              // FIFO – prvý dnu, prvý von
front.Enqueue("paket1"); front.Dequeue();

var zasobnik = new Stack<int>();              // LIFO – posledný dnu, prvý von
zasobnik.Push(1); zasobnik.Pop();

var unikatne = new HashSet<int> { 10, 20, 10 }; // {10, 20}
```

| | Pole | List |
| --- | --- | --- |
| veľkosť | pevná | mení sa podľa potreby |
| počet prvkov | `Length` | `Count` |
| pridanie | nedá sa | `Add`, `Insert` |

## Dual Stack na routeri Cisco

```text
ipv6 unicast-routing
interface g0/0
 ip address 192.168.10.1 255.255.255.0
 ipv6 address 2001:db8:acad:10::1/64
 ipv6 address fe80::1 link-local
 no shutdown
!
ip route 0.0.0.0 0.0.0.0 10.0.0.2
ipv6 route ::/0 2001:db8:acad:ff::2
```

Kontrola: `show ip interface brief` aj `show ipv6 interface brief`,
`ping` a `ping ipv6`.

## Krátka ústna odpoveď

Jednoduché typy uchovávajú jednu hodnotu, reťazec je postupnosť znakov a klasické pole je súvislý blok rovnakých prvkov s indexom od nuly. Pri vytvorení poľa sa rezervuje súvislá pamäť a treba kontrolovať hranice. Kolekcie zahŕňajú zoznam, množinu, mapu, front a zásobník; úložisko môže byť pamäť, súbor alebo databáza. Dual Stack znamená súčasnú prevádzku IPv4 a IPv6.

## Súvisiace poznámky (CCNA2)

[[M01 – Basic Device Configuration]] · [[M15 – IP Static Routing]] — rozcestník [[CCNA2 – SRWE]]

## Kontrolné otázky

> [!question]- Aké jednoduché údajové typy poznáš v C#?
> Celočíselné byte, short, int, long; desatinné float, double, decimal; char;
> bool. Líšia sa veľkosťou a rozsahom.

> [!question]- Prečo sa na peniaze používa decimal a nie double?
> double je binárne desatinné číslo a niektoré hodnoty (0,1) neuloží presne.
> decimal je desiatkový a presný na 28 číslic.

> [!question]- Aké operácie s reťazcom poznáš?
> Length, indexovanie, Contains, IndexOf, Substring, Replace, Split, Join,
> ToUpper, Trim, porovnanie, spájanie (+, StringBuilder).

> [!question]- Ako vzniká pole v pamäti?
> Pri `new` sa na halde vyhradí súvislý blok pre n prvkov rovnakej veľkosti,
> prvky dostanú predvolenú hodnotu; premenná drží odkaz. Adresa prvku =
> začiatok + index · veľkosť prvku.

> [!question]- Aký je rozdiel medzi poľom a kolekciou List?
> Pole má pevnú veľkosť, List rastie podľa potreby a má metódy Add, Remove,
> Insert.

> [!question]- Vysvetli FIFO a LIFO.
> FIFO – front (Queue): prvý vložený ide prvý von. LIFO – zásobník (Stack):
> posledný vložený ide prvý von.

> [!question]- Kedy použiješ Dictionary?
> Keď potrebuješ rýchlo nájsť hodnotu podľa kľúča (MAC → port, meno → IP).

> [!question]- Čo je Dual Stack?
> Súčasná prevádzka IPv4 a IPv6 na tom istom zariadení a rozhraní – postupný
> prechod na IPv6.
