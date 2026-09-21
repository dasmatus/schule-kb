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

## Krátka ústna odpoveď

Relačné operátory porovnávajú hodnoty a logické operátory tvoria zložené podmienky. `if/else` vetví program, `switch` vyberá z pevných možností a `for`, `while`, `do-while` a `foreach` opakujú kód; cyklus musí mať ukončenie. MLS je multilayer switch, ktorý prepína na L2 a smeruje medzi VLAN pomocou SVI a `ip routing`. Konkrétna konfigurácia závisí od výrobcu.
