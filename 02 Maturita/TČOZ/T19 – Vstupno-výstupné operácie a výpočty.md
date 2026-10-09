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

## Vstup a výstup v GUI (WinForms)

```csharp
private void btnVypocitaj_Click(object sender, EventArgs e)
{
    if (double.TryParse(txtPolomer.Text, out double r) && r > 0)
    {
        double obsah = Math.PI * Math.Pow(r, 2);
        lblVysledok.Text = $"Obsah: {obsah:F2} cm²";
    }
    else
    {
        MessageBox.Show("Zadaj kladné číslo.", "Chyba",
                        MessageBoxButtons.OK, MessageBoxIcon.Warning);
    }
}
```

Vstup: `TextBox.Text`, `NumericUpDown.Value`, `CheckBox.Checked`,
`ComboBox.SelectedItem`. Výstup: `Label.Text`, `MessageBox.Show()`,
`ListBox.Items.Add()`.

## Konverzie – prehľad

| Smer | Spôsob | Pri chybe |
| --- | --- | --- |
| text → číslo | `int.Parse("42")` | výnimka `FormatException` |
| text → číslo | `int.TryParse(s, out int x)` | vráti `false` |
| text → číslo | `Convert.ToInt32(s)` | výnimka; `null` → 0 |
| číslo → text | `x.ToString()`, `$"{x}"` | – |
| desatinné → celé | `(int)3.9` | odreže → `3` |
| zaokrúhlenie | `Math.Round(3.5)` | `4` (pri .5 na párne: `Math.Round(2.5)` = `2`) |

Formátovanie: `x.ToString("F2")` → 2 desatinné miesta, `"N0"` → oddelené
tisícky, `"P"` → percentá. Slovenská kultúra používa **desatinnú čiarku**,
preto `double.Parse("12.5")` môže zlyhať; riešenie je
`CultureInfo.InvariantCulture`.

## Matematické funkcie (trieda Math)

| Volanie | Výsledok |
| --- | --- |
| `Math.Sqrt(16)` | 4 |
| `Math.Pow(2, 10)` | 1024 |
| `Math.Abs(-7)` | 7 |
| `Math.Max(3, 8)` / `Math.Min(3, 8)` | 8 / 3 |
| `Math.Floor(3.7)` / `Math.Ceiling(3.2)` | 3 / 4 |
| `Math.Sin(Math.PI / 2)` | 1 (uhol v radiánoch) |
| `Math.PI`, `Math.E` | konštanty |

Pri `int` môže nastať **pretečenie**: `int.MaxValue + 1` dá záporné číslo;
`checked { }` ho zachytí výnimkou.

## Zálohovanie – porovnanie

| Typ | Čo kopíruje | Záloha | Obnova |
| --- | --- | --- | --- |
| plná | všetko | najpomalšia, najviac miesta | najrýchlejšia (1 záloha) |
| inkrementálna | zmeny od **poslednej** zálohy | najrýchlejšia | najpomalšia (plná + všetky inkrementy) |
| diferenciálna | zmeny od **poslednej plnej** | stredná, rastie | plná + posledná diferenciálna |

- **RPO** – koľko dát najviac môžem stratiť (určuje, ako často zálohovať)
- **RTO** – za aký čas musí byť systém obnovený
- Záloha konfigurácie Cisco: `copy running-config startup-config`,
  `copy running-config tftp:`

## Konfigurácia DHCPv6 na routeri Cisco

| Spôsob | Príznaky v RA | Adresa z | DNS z |
| --- | --- | --- | --- |
| len SLAAC | A=1, O=0, M=0 | SLAAC | RA (RDNSS) |
| bezstavový DHCPv6 | A=1, O=1 | SLAAC | DHCPv6 |
| stavový DHCPv6 | M=1 | DHCPv6 | DHCPv6 |

```text
ipv6 unicast-routing
! bezstavový
ipv6 dhcp pool BEZSTAVOVY
 dns-server 2001:db8:acad:1::254
 domain-name skola.sk
interface g0/1
 ipv6 address 2001:db8:acad:1::1/64
 ipv6 nd other-config-flag
 ipv6 dhcp server BEZSTAVOVY
!
! stavový
ipv6 dhcp pool STAVOVY
 address prefix 2001:db8:acad:2::/64
 dns-server 2001:db8:acad:1::254
interface g0/2
 ipv6 address 2001:db8:acad:2::1/64
 ipv6 nd managed-config-flag
 ipv6 nd prefix default no-autoconfig
 ipv6 dhcp server STAVOVY
```

Kontrola: `show ipv6 dhcp pool`, `show ipv6 dhcp binding`.

## Krátka ústna odpoveď

Konzolový vstup číta text, napríklad cez `Console.ReadLine`, a výstup zapisuje `WriteLine`; hodnotu treba validovať cez `TryParse`. GUI používa textové polia a udalosti tlačidiel. Pri konverzii riešim formát, kultúru, rozsah a delenie nulou. Aritmetické operátory dopĺňajú funkcie `sqrt`, `pow` a `abs`. Zálohy chránim podľa 3-2-1 a testujem obnovu. DHCPv6 môže prideľovať adresu stavovo alebo iba dopĺňať SLAAC a používa Solicit–Advertise–Request–Reply.

## Súvisiace poznámky (CCNA2)

[[M08 – SLAAC and DHCPv6]] — rozcestník [[CCNA2 – SRWE]]

## Kontrolné otázky

> [!question]- Ako načítaš číslo z konzoly bezpečne?
> `string s = Console.ReadLine();` a `int.TryParse(s, out int x)` – pri
> neplatnom vstupe vráti `false` a program nespadne.

> [!question]- Aký je rozdiel medzi Parse, TryParse a Convert?
> Parse pri chybe vyhodí výnimku, TryParse vráti `false`, Convert vyhodí
> výnimku, ale `null` prevedie na 0.

> [!question]- Ako funguje vstup a výstup v GUI?
> Udalosťami: používateľ vyplní TextBox a klikne na tlačidlo, obsluha udalosti
> `Click` prečíta `Text`, overí a vypočíta, výsledok zapíše do `Label`.

> [!question]- Vymenuj matematické funkcie triedy Math.
> Sqrt, Pow, Abs, Round, Floor, Ceiling, Max, Min, Sin, Cos; konštanty PI a E.

> [!question]- Porovnaj plnú, inkrementálnu a diferenciálnu zálohu.
> Plná – všetko, rýchla obnova. Inkrementálna – zmeny od poslednej zálohy,
> rýchla záloha, pomalá obnova. Diferenciálna – zmeny od poslednej plnej,
> obnova = plná + posledná diferenciálna.

> [!question]- Čo je pravidlo 3-2-1?
> 3 kópie dát, na 2 rôznych médiách, 1 mimo pracoviska/offline.

> [!question]- Aký je rozdiel medzi stavovým a bezstavovým DHCPv6?
> Stavový (M=1) prideľuje adresu aj ďalšie parametre a eviduje ich. Bezstavový
> (O=1) – adresu si klient vytvorí cez SLAAC, DHCPv6 dodá len DNS a pod.

> [!question]- Aké správy používa DHCPv6?
> Solicit, Advertise, Request, Reply (a Renew, Rebind, Release); porty UDP 546/547.
