---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T23 – Súbory – zápis a čítanie

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> SÚBORY - ZÁPIS A ČÍTANIE - typy súborov, serializácia a deserializácia objektov

## Typy súborov

Súbor je pomenovaná postupnosť dát uložená v súborovom systéme. **Textový súbor** obsahuje znaky v určitom kódovaní, napríklad UTF-8; človek ho môže čítať a upravovať. **Binárny súbor** obsahuje bajty v štruktúre určenej programom, napríklad obrázok, zvuk alebo kompilovaný program. Ďalšie členenie je podľa formátu: CSV tabuľka, JSON/XML štruktúrované údaje, log, konfigurácia, archív alebo databázový súbor.

Formát určuje, ako sa bajty interpretujú. Pri prenose treba riešiť kódovanie, endianitu, verziu formátu a prípadnú kontrolu integrity. Prípona je iba pomôcka, nie dôkaz skutočného obsahu.

## Zápis a čítanie

Bezpečný pracovný postup je:

1. overiť cestu a oprávnenie,
2. otvoriť súbor v správnom režime,
3. čítať po riadkoch, blokoch alebo celej dĺžke,
4. validovať a spracovať obsah,
5. zápis dokončiť a zdroj korektne zavrieť.

Pri zápise rozlišujeme vytvorenie alebo prepísanie (`create/overwrite`) a pripojenie na koniec (`append`). Pri dôležitom súbore je bezpečnejšie zapísať do dočasného názvu v rovnakom súborovom systéme, overiť a potom vykonať atomické premenovanie; tým sa obmedzí poškodenie pri výpadku. Cesty treba skladať pomocou knižnice, nie nekontrolovaným spájaním vstupu používateľa.

Program musí ošetriť neexistujúci súbor, nedostatok oprávnení, plný disk, zámok iným procesom, nesprávne kódovanie a chybný formát. `using`/automatické spravovanie zdrojov alebo `try/finally` zabezpečí zatvorenie aj pri výnimke. Pri veľkých súboroch je vhodné streamovanie, aby sa celý obsah nemusel načítať do pamäte.

## Serializácia objektov

**Serializácia** prevádza objekt v pamäti na reprezentáciu vhodnú na uloženie alebo prenos. Ukladajú sa hodnoty a podľa formátu aj názvy vlastností a typové informácie. JSON je čitateľný a vhodný na výmenu, XML podporuje značky a schémy, binárny formát býva menší alebo rýchlejší, ale závisí od implementácie.

Príklad JSON reprezentácie objektu:

```json
{"meno":"Eva","vek":18,"aktivny":true}
```

**Deserializácia** načíta reprezentáciu, overí jej štruktúru a vytvorí objekt. Treba kontrolovať povinné polia, rozsah, verziu a typy; neznáme polia možno ignorovať alebo odmietnuť podľa politiky. Deserializácia nedôveryhodného vstupu sa nesmie používať na spustenie ľubovoľného kódu. Nebezpečné univerzálne binárne deserializéry sú rizikové; bezpečnejší je obmedzený dátový formát s validáciou.

## Textový súbor v C#

```csharp
using System.IO;

string cesta = Path.Combine("data", "zariadenia.txt");

// zápis – prepíše súbor (append: true pripája na koniec)
using (StreamWriter sw = new StreamWriter(cesta, append: false))
{
    sw.WriteLine("R1;192.168.10.1");
    sw.WriteLine("SW1;192.168.10.2");
}   // using súbor zavrie aj pri výnimke

// čítanie po riadkoch
using (StreamReader sr = new StreamReader(cesta))
{
    string riadok;
    while ((riadok = sr.ReadLine()) != null)
    {
        string[] casti = riadok.Split(';');
        Console.WriteLine($"{casti[0]} má IP {casti[1]}");
    }
}

// skrátené statické metódy triedy File
File.WriteAllText(cesta, "obsah");
File.AppendAllText(cesta, "ďalší riadok\n");
string[] riadky = File.ReadAllLines(cesta);
bool existuje = File.Exists(cesta);
```

## Ošetrenie chýb

```csharp
try
{
    string text = File.ReadAllText("konfig.txt");
}
catch (FileNotFoundException)        { Console.WriteLine("Súbor neexistuje."); }
catch (UnauthorizedAccessException)  { Console.WriteLine("Nemáš oprávnenie."); }
catch (IOException ex)               { Console.WriteLine("Chyba: " + ex.Message); }
```

## Binárny súbor

```csharp
using (var bw = new BinaryWriter(File.Open("data.bin", FileMode.Create)))
{
    bw.Write(42);          // int – 4 bajty
    bw.Write(3.14);        // double – 8 bajtov
    bw.Write("R1");        // reťazec s dĺžkou
}
using (var br = new BinaryReader(File.Open("data.bin", FileMode.Open)))
{
    int a = br.ReadInt32();
    double b = br.ReadDouble();
    string c = br.ReadString();   // čítať treba v rovnakom poradí ako zápis
}
```

| Režim `FileMode` | Význam |
| --- | --- |
| `Create` | vytvorí nový, existujúci prepíše |
| `CreateNew` | vytvorí nový, ak existuje → výnimka |
| `Open` | otvorí existujúci, ak neexistuje → výnimka |
| `OpenOrCreate` | otvorí alebo vytvorí |
| `Append` | otvorí a zapisuje na koniec |

## Serializácia do JSON a XML v C#

```csharp
using System.Text.Json;

public class Zariadenie
{
    public string Meno { get; set; }
    public string Ip { get; set; }
    public int Porty { get; set; }
}

var r = new Zariadenie { Meno = "R1", Ip = "192.168.10.1", Porty = 4 };

// serializácia: objekt → text
string json = JsonSerializer.Serialize(r);
// {"Meno":"R1","Ip":"192.168.10.1","Porty":4}
File.WriteAllText("r1.json", json);

// deserializácia: text → objekt
Zariadenie nacitany = JsonSerializer.Deserialize<Zariadenie>(
    File.ReadAllText("r1.json"));
```

XML: `new XmlSerializer(typeof(Zariadenie))` a metódy `Serialize(stream, objekt)`
/ `Deserialize(stream)`. Trieda musí byť `public` a mať konštruktor bez parametrov.

| Formát | Čitateľný | Veľkosť | Použitie |
| --- | --- | --- | --- |
| JSON | áno | malá | web API, konfigurácie |
| XML | áno | väčšia (značky) | staršie systémy, dokumenty, schémy |
| CSV | áno | najmenšia pre tabuľky | export do Excelu |
| binárny | nie | najmenšia | rýchle ukladanie, hry |

## Krátka ústna odpoveď

Súbor je pomenovaná postupnosť dát; môže byť textový alebo binárny, prípadne JSON, XML, CSV či iný štruktúrovaný formát. Pri čítaní a zápise ho otvorím v správnom režime, spracujem, korektne zavriem a ošetrím neexistenciu, práva, plný disk a chybný formát. Serializácia uloží objekt do JSON/XML alebo binárnej reprezentácie a deserializácia ho obnoví; nedôveryhodný vstup vždy validujem a nepoužívam nebezpečnú binárnu deserializáciu.

## Kontrolné otázky

> [!question]- Aký je rozdiel medzi textovým a binárnym súborom?
> Textový obsahuje znaky v kódovaní (UTF-8), dá sa čítať v editore. Binárny
> obsahuje bajty v štruktúre programu (obrázky, exe), je menší a rýchlejší.

> [!question]- Ako zapíšeš a prečítaš textový súbor v C#?
> Zápis `StreamWriter` + `WriteLine` alebo `File.WriteAllText`. Čítanie
> `StreamReader` + `ReadLine` v cykle alebo `File.ReadAllLines`. Všetko v `using`.

> [!question]- Prečo sa používa blok using?
> Automaticky zavrie súbor (uvoľní zdroj) aj pri výnimke.

> [!question]- Aké chyby môžu nastať pri práci so súborom?
> Súbor neexistuje, chýba oprávnenie, plný disk, súbor je zamknutý iným
> procesom, zlé kódovanie alebo formát.

> [!question]- Aký je rozdiel medzi prepísaním a pripojením (append)?
> Prepísanie zmaže pôvodný obsah, append zapisuje na koniec existujúceho súboru.

> [!question]- Čo je serializácia a deserializácia?
> Serializácia – prevod objektu na reťazec bajtov/textu (JSON, XML) na
> uloženie alebo prenos. Deserializácia – opačný prevod späť na objekt.

> [!question]- Aké formáty serializácie poznáš?
> JSON, XML, CSV, binárny.

> [!question]- Prečo je deserializácia nedôveryhodných dát nebezpečná?
> Útočník môže podvrhnúť dáta, ktoré vytvoria nečakané objekty alebo spustia
> kód. Treba používať bezpečné formáty (JSON) a údaje validovať.
