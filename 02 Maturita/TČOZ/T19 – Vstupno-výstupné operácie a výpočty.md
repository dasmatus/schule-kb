---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T19 – Vstupno-výstupné operácie a výpočty

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> ZÁKLADNÉ VSTUPNO-VÝSTUPNÉ OPERÁCIE A VÝPOČTY - objekty a metódy pri konzolovom vstupe, vstupy a výstupy v grafických rozhraniach, konverzie medzi reťazcami a číslami, operátory, matematické funkcie, zálohovanie dát, DHCPv6

## Konzolový vstup a výstup

V konzolovom programe je štandardný vstup textový prúd a štandardný výstup prúd výsledkov. V syntaxi podobnej C# objekt `Console` poskytuje:

```csharp
Console.Write("Zadaj vek: ");
string text = Console.ReadLine();
if (int.TryParse(text, out int vek) && vek >= 0)
    Console.WriteLine($"Vek: {vek}");
else
    Console.WriteLine("Neplatná hodnota.");
```

`ReadLine()` vráti reťazec alebo označenie konca vstupu, `Write` nevkladá nový riadok a `WriteLine` áno. `TryParse` umožní odmietnuť nesprávny formát bez pádu; pri `Parse` treba ošetriť výnimku.

## Vstupy a výstupy v grafickom rozhraní

GUI prijíma vstup z komponentov, ako sú textové pole, zaškrtávacie políčko, zoznam alebo výber dátumu. Výstup sa zobrazí v labeli, textovom poli, tabuľke, dialógu alebo grafe. Aplikácia je udalosťami riadená: kliknutie na tlačidlo vyvolá obsluhu, ktorá prečíta hodnoty, overí ich, vykoná výpočet a aktualizuje výstup. Validácia má používateľovi povedať, ktoré pole je chybné, nie iba potlačiť chybu.

## Konverzie medzi reťazcami a číslami

Text `"12.5"` treba premeniť na vhodný číselný typ podľa očakávaného rozsahu. Používame `int.Parse`/`TryParse`, `double.Parse`/`TryParse`, prípadne explicitný pretypovací operátor. Treba riešiť desatinný oddeľovač a kultúru, rozsah, prázdny vstup, znamienko a zaokrúhľovanie. Pri formátovaní opačným smerom určujeme počet desatinných miest a jednotky; interný výpočet nemá byť založený na zaokrúhlenom texte.

## Operátory a matematické funkcie

Základné aritmetické operátory sú `+`, `-`, `*`, `/` a `%`; používajú sa aj priradenie, porovnanie a logické spojenie podmienok. Pri celočíselnom delení `5 / 2` môže byť výsledkom `2`, preto treba zvoliť desatinný typ. Delenie nulou a pretečenie sú chyby.

Knižnice ponúkajú funkcie `sqrt(x)` (odmocnina), `pow(x,y)` (mocnina), `abs(x)` (absolútna hodnota), `min`/`max`, `round`, `floor`, `ceil` a goniometrické funkcie. Tie často používajú radiány, preto treba pri stupňoch previesť `rad = stupne·π/180`. Pri výpočtoch sa kontroluje platný definičný obor, napríklad odmocnina nezáporného čísla.

## Zálohovanie dát

Záloha je oddelená kópia dát určená na obnovu po chybe, vymazaní, poruche alebo útoku. **Plná** záloha kopíruje všetko, **inkrementálna** iba zmeny od poslednej zálohy a **diferenciálna** zmeny od poslednej plnej. Pravidlo 3-2-1 znamená tri kópie, na dvoch rôznych médiách a jednu mimo hlavného systému/offline. Zálohy treba šifrovať, chrániť pred ransomware, evidovať retenciu a pravidelne testovať obnovu; samotné vytvorenie súboru ešte nie je overená záloha.

## DHCPv6

DHCPv6 môže byť **stavový** (server prideľuje adresu a voľby) alebo **bezstavový** (adresu vytvorí SLAAC a DHCPv6 doplní napríklad DNS). Proces používa správy:

1. `Solicit` — klient hľadá server,
2. `Advertise` — server ponúkne parametre,
3. `Request` — klient vyberie ponuku,
4. `Reply` — server potvrdí pridelenie.

Používajú sa aj `Renew`, `Rebind`, `Release` a relay. IPv6 nemá broadcast; komunikácia využíva multicast, UDP 546 pre klienta a 547 pre server/relay. Router Advertisement príznakmi M/O informuje klienta, či má použiť DHCPv6 pre adresu alebo iné parametre.

## Krátka ústna odpoveď

Konzolový vstup číta text, napríklad cez `Console.ReadLine`, a výstup zapisuje `WriteLine`; hodnotu treba validovať cez `TryParse`. GUI používa textové polia a udalosti tlačidiel. Pri konverzii riešim formát, kultúru, rozsah a delenie nulou. Aritmetické operátory dopĺňajú funkcie `sqrt`, `pow` a `abs`. Zálohy chránim podľa 3-2-1 a testujem obnovu. DHCPv6 môže prideľovať adresu stavovo alebo iba dopĺňať SLAAC a používa Solicit–Advertise–Request–Reply.
