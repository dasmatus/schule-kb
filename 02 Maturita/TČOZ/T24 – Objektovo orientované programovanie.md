---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T24 – Objektovo orientované programovanie

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> OBJEKTOVO ORIENTOVANÉ PROGRAMOVANIE - základné pojmy, prístupové modifikátory, statické a nestatické členy tried, dedičnosť, základná konfigurácia sieťových zariadení

## Základné pojmy OOP

Objektovo orientované programovanie modeluje problém pomocou objektov. **Trieda** je predloha s atribútmi a metódami, **objekt** je konkrétna inštancia. Atribúty opisujú stav a metódy správanie. Konštruktor vytvorí platný počiatočný stav; objekt môže komunikovať cez verejné rozhranie.

Základné princípy:

- **zapuzdrenie** skryje reprezentáciu a povoľuje iba kontrolované operácie,
- **abstrakcia** ponechá podstatné vlastnosti a skryje zbytočné detaily,
- **dedičnosť** umožní odvodenému typu rozšíriť spoločný základ,
- **polymorfizmus** umožní volať rovnaké rozhranie s rôznou implementáciou.

Dedičnosť treba používať tam, kde platí vzťah „je typom“. Pri čisto opakovane používanom správaní môže byť vhodnejšia kompozícia.

## Prístupové modifikátory

V jazykoch typu C#/Java sa používajú najmä:

- `private` — člen je prístupný iba v triede,
- `public` — prístupný cez verejné rozhranie,
- `protected` — trieda a jej potomkovia,
- `internal` alebo package-private — podľa jazyka v rámci modulu/balíka.

Polia bývajú súkromné a čítanie či zmena prebieha cez metódy alebo vlastnosti, ktoré overia rozsah a zachovajú invarianty. Verejné rozhranie nemá odhaľovať viac, než klient potrebuje.

## Statické a nestatické členy

Statický člen patrí triede a existuje v jednej zdieľanej kópii; možno ho použiť bez objektu, napríklad `Math.PI`. Nestatický člen patrí konkrétnej inštancii a každý objekt má vlastnú hodnotu. Statická metóda nemá implicitnú referenciu na `this`, preto nemôže priamo používať inštančné členy. Pri statickom stave treba zohľadniť súbežnosť a životnosť aplikácie.

## Dedičnosť a polymorfizmus

Odvodená trieda zdedí dostupné členy rodiča a môže pridať vlastné alebo predefinovať virtuálnu metódu. Napríklad `Zariadenie` môže mať metódu `pripoj()` a `Router` či `Switch` ju implementujú odlišne. Kód môže pracovať s typom `Zariadenie`, pričom počas behu sa zvolí implementácia konkrétneho objektu. Pri dedení treba rešpektovať modifikátory, kontrakt rodiča a substitúciu; nie každý spoločný atribút znamená vhodnú dedičnosť.

## Základná konfigurácia sieťového zariadenia

Ukážka v štýle Cisco IOS:

```text
enable
configure terminal
hostname SW1
enable secret <silné-heslo>
interface Vlan 1
 ip address 192.168.1.2 255.255.255.0
 no shutdown
ip default-gateway 192.168.1.1
ip domain-name skola.example
crypto key generate rsa
line vty 0 4
 login local
 transport input ssh
end
copy running-config startup-config
show running-config
show ip interface brief
```

Na routeri sa namiesto manažérskej SVI nastavujú IP adresy fyzických rozhraní a podľa potreby statické alebo dynamické routovanie. Pri reálnom nasadení sa nepoužíva heslo z príkladu, zakáže sa nepotrebný HTTP/Telnet prístup, obmedzia sa VTY účty a overí sa konfigurácia aj logy. Príkazy sú vendorovo špecifické.

## Celý príklad OOP v C#

```csharp
abstract class Zariadenie                       // abstraktná – nedá sa vytvoriť priamo
{
    private string ip;                          // zapuzdrenie
    protected string Meno { get; }              // vidia potomkovia
    public static int Pocet { get; private set; }   // statický člen

    protected Zariadenie(string meno, string ip)
    {
        Meno = meno;
        Ip = ip;
        Pocet++;
    }

    public string Ip
    {
        get => ip;
        set
        {
            if (!System.Net.IPAddress.TryParse(value, out _))
                throw new ArgumentException("Neplatná IP");
            ip = value;
        }
    }

    public abstract string Vrstva();            // musí implementovať potomok
    public virtual void Info() =>               // potomok môže prepísať
        Console.WriteLine($"{Meno} ({Ip}) – vrstva {Vrstva()}");
}

class Router : Zariadenie                       // dedičnosť
{
    public Router(string meno, string ip) : base(meno, ip) { }
    public override string Vrstva() => "L3";
}

class Switch : Zariadenie
{
    public int Porty { get; }
    public Switch(string meno, string ip, int porty) : base(meno, ip) { Porty = porty; }
    public override string Vrstva() => "L2";
    public override void Info()
    {
        base.Info();                            // zavolá verziu rodiča
        Console.WriteLine($"  portov: {Porty}");
    }
}

// polymorfizmus – jeden typ premennej, rôzne správanie
List<Zariadenie> siet = new List<Zariadenie>
{
    new Router("R1", "192.168.10.1"),
    new Switch("SW1", "192.168.10.2", 24)
};
foreach (Zariadenie z in siet) z.Info();
Console.WriteLine(Zariadenie.Pocet);            // 2
```

| Kľúčové slovo | Význam |
| --- | --- |
| `: Rodic` | trieda dedí od rodiča (C# povoľuje len **jedného** rodiča) |
| `base(...)` | volanie konštruktora alebo metódy rodiča |
| `virtual` / `override` | metóda, ktorú potomok môže prepísať / prepisuje |
| `abstract` | trieda bez inštancií alebo metóda bez tela – potomok ju musí doplniť |
| `sealed` | od triedy sa nedá dediť |
| `interface` | zoznam metód, ktoré trieda sľúbi implementovať; trieda môže mať viac rozhraní |

## Základná konfigurácia routera (doplnenie)

```text
enable
configure terminal
hostname R1
no ip domain-lookup                       ! preklep sa nebude hľadať v DNS
enable secret Silne_Heslo1
service password-encryption
banner motd # Pristup len pre opravnenych! #
line console 0
 password Konzola1
 login
 logging synchronous
interface g0/0
 description LAN ucebna
 ip address 192.168.10.1 255.255.255.0
 ipv6 address 2001:db8:acad:10::1/64
 no shutdown
interface s0/0/0
 description Linka na R2
 ip address 10.0.0.1 255.255.255.252
 no shutdown
end
copy running-config startup-config
```

| Režim | Výzva | Ako sa doň dostanem |
| --- | --- | --- |
| používateľský EXEC | `R1>` | po prihlásení |
| privilegovaný EXEC | `R1#` | `enable` |
| globálna konfigurácia | `R1(config)#` | `configure terminal` |
| konfigurácia rozhrania | `R1(config-if)#` | `interface g0/0` |
| konfigurácia linky | `R1(config-line)#` | `line vty 0 4` |

**running-config** je v RAM (aktuálna, po reštarte sa stratí),
**startup-config** v NVRAM (načíta sa pri štarte).

## Krátka ústna odpoveď

OOP používa triedy ako predlohy a objekty ako inštancie so stavom a správaním. Zapuzdrenie, abstrakcia, dedičnosť a polymorfizmus pomáhajú riadiť zložitosť. `private`, `public`, `protected` a podľa jazyka `internal` určujú prístup; statické členy patria triede, nestatické objektu. Základná konfigurácia zariadenia nastaví názov, prístup, IP, bránu alebo routovanie, SSH, uloženie a overenie príkazmi `show`.

## Súvisiace poznámky (CCNA2)

[[M01 – Basic Device Configuration]] — rozcestník [[CCNA2 – SRWE]]

## Kontrolné otázky

> [!question]- Vymenuj a vysvetli štyri piliere OOP.
> Zapuzdrenie (skrytie dát, prístup cez metódy), abstrakcia (len podstatné
> vlastnosti), dedičnosť (potomok preberá členy rodiča), polymorfizmus
> (rovnaké volanie, rôzne správanie podľa skutočného typu).

> [!question]- Aké prístupové modifikátory poznáš?
> public, private, protected, internal (a kombinácie protected internal,
> private protected).

> [!question]- Aký je rozdiel medzi statickým a nestatickým členom?
> Statický patrí triede a má jednu spoločnú kópiu (`Trieda.Pocet`).
> Nestatický patrí každému objektu zvlášť.

> [!question]- Ako funguje dedičnosť v C#?
> `class Router : Zariadenie` – potomok zdedí členy rodiča, môže pridať nové a
> prepísať `virtual` metódy cez `override`. C# má len jedného rodiča, ale viac
> rozhraní.

> [!question]- Aký je rozdiel medzi abstraktnou triedou a rozhraním?
> Abstraktná trieda môže mať atribúty, konštruktor a hotové metódy, dediť sa
> dá len od jednej. Rozhranie určuje len, čo trieda musí vedieť, a trieda ich
> môže implementovať viac.

> [!question]- Čo nastavíš pri základnej konfigurácii routera?
> Hostname, enable secret, heslá konzoly a VTY, šifrovanie hesiel, banner, IP
> adresy rozhraní s `no shutdown`, popisy, SSH, uloženie
> `copy running-config startup-config`.

> [!question]- Aký je rozdiel medzi running-config a startup-config?
> running-config je aktuálna konfigurácia v RAM, startup-config je uložená v
> NVRAM a načíta sa po reštarte.
