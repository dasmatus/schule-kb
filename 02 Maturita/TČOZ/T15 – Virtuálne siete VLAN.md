---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T15 – Virtuálne siete VLAN

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> VIRTUÁLNE SIETE VLAN – zariadenia, na ktorých konfigurujeme VLANy, defaultné nastavenie VLAN1, konfigurácia VLAN, InterVlan routing, konštruktor, prístupové metódy v OOP

## Zariadenia a porty pre VLAN

VLAN sa konfiguruje na spravovanom switchi. Koncové zariadenie pripájame na **access port**, ktorý patrí do jednej VLAN. Prepoj medzi switchmi alebo medzi switchom a routerom je **trunk**; prenáša viac VLAN a používa značky IEEE 802.1Q. Na tretej vrstve môže VLAN obsluhovať router alebo multilayer switch pomocou SVI.

VLAN vytvára samostatnú broadcastovú doménu. Znižuje počet broadcastov a umožňuje oddeliť napríklad používateľov, telefóny, servery a správu, ale bezpečnosť treba doplniť ACL a firewallom. Hostitelia v rôznych VLAN potrebujú inter-VLAN routing.

## Predvolené nastavenie VLAN 1

VLAN 1 býva predvolená na mnohých switchoch a access porty do nej patria, kým ich správca neprekonfiguruje. Na niektorých platformách ju nemožno úplne odstrániť. Z bezpečnostných dôvodov sa bežná správa a používateľská prevádzka oddeľujú do vyhradenej VLAN; native VLAN na trunku má byť zhodná a podľa politiky nepoužívaná na koncové zariadenia. Presné obmedzenia závisia od výrobcu, preto treba overiť dokumentáciu.

## Konfigurácia VLAN v štýle Cisco IOS

```text
enable
configure terminal
vlan 10
 name STUDENTI
vlan 20
 name SERVERY
interface FastEthernet0/3
 switchport mode access
 switchport access vlan 10
interface GigabitEthernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20
end
show vlan brief
show interfaces trunk
```

Na oboch koncoch trunku treba zhodne nastaviť podporované VLAN, prípadnú native VLAN a bezpečnostné pravidlá. Príkazy sú ukážka pre Cisco IOS, nie univerzálny štandard.

## Inter-VLAN routing

Pri **router-on-a-stick** sa na jednom fyzickom porte vytvoria subrozhrania:

```text
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0
```

Switch k routeru musí mať trunk a hostitelia používajú príslušnú SVI/subinterface ako predvolenú bránu. Pri multilayer switchi sa vytvoria SVI `interface vlan 10`, nastaví sa IP adresa a zapne sa `ip routing`; switch potom smeruje medzi priamo pripojenými VLAN.

## Konštruktor a prístupové metódy v OOP

**Konštruktor** je špeciálna metóda volaná pri vytvorení objektu. Nastaví počiatočný stav a overí povinné hodnoty:

```text
trieda VLAN:
    private id
    konštruktor(id):
        ak id < 1 alebo id > 4094: chyba
        this.id = id
```

Prístupové metódy, napríklad `getId()` a `setId()`, poskytujú kontrolované čítanie a zmenu súkromných atribútov. Setter môže hodnotu validovať, prípadne sa namiesto neho použije iba getter pre nemenný údaj. Nejde o to sprístupniť všetky polia verejne, ale zachovať zapuzdrenie.

## Typy a rozsahy VLAN

| Typ VLAN | Účel |
| --- | --- |
| **dátová** (používateľská) | bežná prevádzka používateľov |
| **predvolená** (default) | VLAN 1 – všetky porty po štarte |
| **natívna** (native) | netagovaná prevádzka na trunku (predvolene VLAN 1) |
| **správcovská** (management) | prístup na správu switcha (SVI s IP adresou) |
| **hlasová** (voice) | IP telefóny, s prioritou QoS |

| Rozsah | Čísla | Poznámka |
| --- | --- | --- |
| normálny | 1–1005 | uložené v súbore `vlan.dat` vo flash pamäti |
| rezervované | 1002–1005 | staré Token Ring a FDDI, nedajú sa zmazať |
| rozšírený | 1006–4094 | pre veľké siete poskytovateľov |

VLAN 1 sa **nedá zmazať ani premenovať**.

## Ďalšia konfigurácia

```text
! správcovská VLAN a SVI na switchi
vlan 99
 name MANAGEMENT
interface vlan 99
 ip address 192.168.99.2 255.255.255.0
 no shutdown
ip default-gateway 192.168.99.1
!
! hlasová VLAN na porte s IP telefónom
interface f0/5
 switchport mode access
 switchport access vlan 10
 mls qos trust cos
 switchport voice vlan 150
!
! zmena native VLAN a vypnutie DTP na trunku
interface g0/1
 switchport mode trunk
 switchport trunk native vlan 99
 switchport nonegotiate
!
! zmazanie VLAN (porty treba najprv presunúť, inak ostanú neaktívne)
no vlan 20
```

**DTP režimy:** `dynamic auto` (pasívne čaká), `dynamic desirable` (aktívne
navrhuje trunk), `trunk`, `access`. Z bezpečnostných dôvodov sa trunk
nastavuje napevno a DTP vypína.

## Inter-VLAN routing na L3 switchi

```text
ip routing
interface vlan 10
 ip address 192.168.10.1 255.255.255.0
 no shutdown
interface vlan 20
 ip address 192.168.20.1 255.255.255.0
 no shutdown
```

| Spôsob | Výhody | Nevýhody |
| --- | --- | --- |
| starý (port routera na VLAN) | jednoduchý | veľa fyzických portov |
| **router-on-a-stick** | jeden port, lacné | jedna linka = úzke hrdlo |
| **L3 switch (SVI)** | najrýchlejší, hardvérové smerovanie | drahší switch |

## Konštruktor a vlastnosti v C#

```csharp
class Vlan
{
    private int id;              // súkromný atribút
    private string nazov;

    public Vlan(int id, string nazov)          // konštruktor
    {
        if (id < 1 || id > 4094)
            throw new ArgumentException("Neplatné číslo VLAN");
        this.id = id;
        this.nazov = nazov;
    }

    public int GetId() { return id; }          // getter
    public void SetNazov(string n)             // setter s kontrolou
    {
        if (!string.IsNullOrWhiteSpace(n)) nazov = n;
    }

    public string Nazov                        // vlastnosť (property) v C#
    {
        get { return nazov; }
        set { if (value.Length <= 32) nazov = value; }
    }
}

Vlan v = new Vlan(10, "STUDENTI");   // volá sa konštruktor
v.Nazov = "ZIACI";                   // volá sa set
```

- Konštruktor má **rovnaký názov ako trieda** a **nemá návratový typ**.
- Ak žiadny nenapíšem, C# vytvorí **predvolený** konštruktor bez parametrov.
- Konštruktorov môže byť viac s rôznymi parametrami (**preťaženie**).
- V C# sa namiesto dvojice get/set metód bežne používa **vlastnosť** (*property*).

## Krátka ústna odpoveď

VLAN konfigurujeme na managed switchi; access port patrí do jednej VLAN a trunk prenáša viac VLAN s tagom 802.1Q. VLAN 1 je predvolená, no bežnú prevádzku a správu je vhodné oddeliť. Inter-VLAN routing sa robí router-on-a-stick subrozhraniami alebo SVI na multilayer switchi. Konštruktor nastaví objekt pri vytvorení a gettery/settery kontrolujú prístup k zapuzdreným údajom.

## Súvisiace poznámky (CCNA2)

[[M03 – VLANs]] · [[M04 – Inter-VLAN Routing]] — rozcestník [[CCNA2 – SRWE]]

## Kontrolné otázky

> [!question]- Čo je VLAN a aké má výhody?
> Logické rozdelenie switchovanej siete na samostatné broadcastové domény.
> Menej broadcastov, bezpečnosť (oddelenie skupín), jednoduchšia správa,
> nezávislosť od fyzického umiestnenia.

> [!question]- Aké typy VLAN poznáš?
> Dátová, predvolená (VLAN 1), natívna, správcovská, hlasová.

> [!question]- Čo platí pre VLAN 1?
> Je predvolená, všetky porty v nej sú po štarte, je natívna na trunku, nedá sa
> zmazať ani premenovať. Z bezpečnostných dôvodov sa na prevádzku nepoužíva.

> [!question]- Ako priradíš port do VLAN?
> `vlan 10` → `name ...` → `interface f0/3` → `switchport mode access` →
> `switchport access vlan 10`. Kontrola `show vlan brief`.

> [!question]- Aké spôsoby inter-VLAN routingu poznáš?
> Starý (port routera na každú VLAN), router-on-a-stick (subrozhrania s
> `encapsulation dot1Q`), L3 switch s SVI a `ip routing`.

> [!question]- Čo je konštruktor?
> Špeciálna metóda s menom triedy bez návratového typu, volá sa pri `new` a
> nastaví počiatočný stav objektu.

> [!question]- Na čo slúžia gettery a settery?
> Kontrolovaný prístup k súkromným atribútom – čítanie a zmena s overením
> hodnoty (zapuzdrenie).
