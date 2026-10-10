---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T20 – Riadiace príkazy

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> RIADIACE PRÍKAZY – PODMIENENÉ PRÍKAZY, PREPÍNAČ, CYKLY - relačné a logické operátory, podmienené výrazy, cykly, MLS – funkcia, konfigurácia

## Relačné a logické operátory

Relačné operátory porovnávajú hodnoty: `<`, `>`, `<=`, `>=`, `==` a `!=`. Výsledkom je `true` alebo `false`. Logické operátory sú AND `&&`, OR `||` a NOT `!`. Pri `&&` a `||` sa často používa skrátené vyhodnocovanie, preto možno najprv overiť, že referencia nie je prázdna. Zátvorkami sa podmienka sprehľadní.

Pravdivostne platí: `true && true` je `true`, OR je `true`, ak je pravdivá aspoň jedna časť, a `!true` je `false`. Pozor na rozdiel medzi priradením `=` a porovnaním `==`, ktorý sa podľa jazyka prejaví chybou alebo nesprávnym výsledkom.

## Podmienené výrazy a príkazy

`if` vykoná blok, ak je podmienka pravdivá; `if/else` vyberie jednu z dvoch vetiev a `else if` umožní viac postupne testovaných prípadov:

```text
ak teplota > 80:
    vypni_zariadenie()
inak ak teplota < 0:
    upozorni_na_mraz()
inak:
    pokračuj()
```

`switch`/`case` je vhodný pri jednej hodnote a viacerých pevných možnostiach, napríklad pri voľbe menu. Treba ošetriť `default` a v jazykoch s implicitným priechodom použiť `break` alebo explicitný návrat.

## Cykly

- `for` sa hodí, keď poznáme počet opakovaní alebo prechádzame indexy,
- `while` testuje podmienku pred prvým vykonaním, takže telo sa nemusí vykonať ani raz,
- `do-while` testuje až na konci, preto sa telo vykoná aspoň raz,
- `foreach` prechádza prvky kolekcie bez manuálneho indexu.

Každý cyklus potrebuje inicializáciu, podmienku a zmenu riadiacej premennej. `break` cyklus ukončí a `continue` preskočí zvyšok aktuálnej iterácie. Pri čítaní vstupu je bezpečné mať aj limit počtu pokusov alebo podmienku pre koniec súboru.

## MLS – funkcia a konfigurácia

Skratka **MLS** v tomto okruhu sa interpretuje ako *multilayer switching*, teda prepínanie na L2 a routovanie na L3 v jednom zariadení. Keďže PDF uvádza iba „MLS – funkcia, konfigurácia“, presná syntax závisí od výrobcu; príklad je v štýle Cisco IOS:

```text
ip routing
vlan 10
vlan 20
interface Vlan10
 ip address 192.168.10.1 255.255.255.0
 no shutdown
interface Vlan20
 ip address 192.168.20.1 255.255.255.0
 no shutdown
show ip route
```

SVI (*Switched Virtual Interface*) je logické L3 rozhranie VLAN. Hostitelia používajú jeho adresu ako predvolenú bránu a MLS smeruje medzi VLAN hardvérovo/softvérovo podľa platformy. Treba nastaviť access/trunk porty, zapnúť routovanie a overiť stav SVI aj routovaciu tabuľku.

## Riadiace príkazy v C#

```csharp
// if – else if – else
int body = 78;
if (body >= 90)       Console.WriteLine("výborný");
else if (body >= 75)  Console.WriteLine("chválitebný");
else                  Console.WriteLine("treba sa zlepšiť");

// ternárny operátor – podmienený výraz
string stav = body >= 50 ? "prospel" : "neprospel";

// switch
int den = 6;
switch (den)
{
    case 6:
    case 7:
        Console.WriteLine("víkend");
        break;
    default:
        Console.WriteLine("pracovný deň");
        break;
}

// switch výraz (C# 8+)
int vlan = 20;
string nazov = vlan switch
{
    10 => "UCITELIA",
    20 => "ZIACI",
    _  => "INA"
};
```

## Cykly v C#

```csharp
for (int i = 1; i <= 5; i++)          // 1 2 3 4 5
    Console.Write(i + " ");

int n = 100;
while (n > 1) n /= 2;                 // 100 50 25 12 6 3 1

int volba;
do {
    Console.Write("Zadaj 1–3: ");
} while (!int.TryParse(Console.ReadLine(), out volba) || volba < 1 || volba > 3);

string[] vlany = { "10", "20", "99" };
foreach (string v in vlany)
{
    if (v == "99") continue;          // preskoč správcovskú VLAN
    Console.WriteLine(v);
}

for (int i = 2; i < 100; i++)
{
    if (i % 7 == 0) { Console.WriteLine(i); break; }   // prvý násobok 7 → 7
}
```

**Trasovacia tabuľka** pre `int s = 0; for (int i = 1; i <= 3; i++) s += i;`

| i | podmienka `i <= 3` | s |
| --- | --- | --- |
| 1 | true | 1 |
| 2 | true | 3 |
| 3 | true | 6 |
| 4 | false | koniec, `s = 6` |

## MLS – doplnenie

- **SVI** funguje (`up/up`), len ak VLAN existuje, aspoň jeden port vo VLAN
  je aktívny (alebo trunk ju prenáša) a SVI má `no shutdown`.
- **Routovaný port** – fyzický port L3 switcha zmenený na port routera:

```text
interface g0/1
 no switchport
 ip address 10.0.0.1 255.255.255.252
```

| | Router | L3 switch (MLS) |
| --- | --- | --- |
| počet portov | málo | veľa |
| smerovanie | softvérovo, pomalšie | hardvérovo (ASIC), rýchle |
| WAN rozhrania, NAT, VPN | áno | obmedzene |
| použitie | okraj siete, WAN | distribučná vrstva, inter-VLAN |

V Packet Traceri smeruje napr. **3560/3650**; switch 2960 je len L2.

## Krátka ústna odpoveď

Relačné operátory porovnávajú hodnoty a logické operátory tvoria zložené podmienky. `if/else` vetví program, `switch` vyberá z pevných možností a `for`, `while`, `do-while` a `foreach` opakujú kód; cyklus musí mať ukončenie. MLS je multilayer switch, ktorý prepína na L2 a smeruje medzi VLAN pomocou SVI a `ip routing`. Konkrétna konfigurácia závisí od výrobcu.

## Súvisiace poznámky (CCNA2)

[[M04 – Inter-VLAN Routing]] — rozcestník [[CCNA2 – SRWE]]

## Kontrolné otázky

> [!question]- Aké relačné a logické operátory poznáš?
> Relačné: `<`, `>`, `<=`, `>=`, `==`, `!=`. Logické: `&&` (a), `||` (alebo),
> `!` (negácia).

> [!question]- Kedy použiješ if a kedy switch?
> if pre rozsahy a zložené podmienky, switch pre jednu premennú s pevnými
> hodnotami (menu, kódy).

> [!question]- Čo je podmienený (ternárny) výraz?
> `podmienka ? hodnota1 : hodnota2` – vráti prvú hodnotu, ak podmienka platí,
> inak druhú.

> [!question]- Aký je rozdiel medzi while a do-while?
> while testuje pred telom (nemusí sa vykonať ani raz), do-while po tele
> (vykoná sa aspoň raz).

> [!question]- Kedy použiješ for a kedy foreach?
> for pri známom počte opakovaní alebo keď treba index, foreach na prechod
> všetkými prvkami kolekcie.

> [!question]- Čo robí break a continue?
> break ukončí celý cyklus (alebo case v switchi), continue preskočí zvyšok
> aktuálnej iterácie.

> [!question]- Čo je MLS a ako nakonfiguruješ smerovanie medzi VLAN?
> Multilayer switch – prepína na L2 aj smeruje na L3. `ip routing`, vytvoriť
> VLAN, `interface vlan X` s IP adresou a `no shutdown`; hostitelia majú SVI
> ako bránu.

> [!question]- Čo je routovaný port?
> Fyzický port L3 switcha s `no switchport`, ktorý má IP adresu ako port routera.
