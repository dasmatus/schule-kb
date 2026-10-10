---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T16 – Protokol DHCP

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> PROTOKOL DHCP – postup pri DHCP, konfigurácia, DNS, modifikátory prístupu v OOP

## Úloha a postup DHCP

DHCP automaticky prideľuje klientovi IPv4 konfiguráciu: adresu, masku, predvolenú bránu, DNS server a dobu prenájmu. Pri štarte klient často ešte nemá IP adresu, preto IPv4 používa broadcastový postup **DORA**:

1. **Discover** — klient hľadá DHCP server,
2. **Offer** — server ponúkne adresu a parametre,
3. **Request** — klient si vyberie ponuku a požiada o ňu,
4. **Acknowledge** — server prenájom potvrdí a pošle finálne voľby.

Klient neskôr obnovuje prenájom v časoch T1 a T2; pri skončení musí adresu uvoľniť alebo získať novú. Server používa **scope/pool**, z ktorého vylúči rezervované adresy. Rezervácia viaže konkrétnu adresu na MAC alebo identifikátor klienta. **DHCP relay** preposiela požiadavky medzi podsieťami, preto server nemusí byť v každej VLAN.

## Príklad konfigurácie

Ukážka v štýle Cisco IOS:

```text
ip dhcp excluded-address 192.168.10.1 192.168.10.20
ip dhcp pool STUDENTI
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 192.168.10.53
 lease 7
```

Na rozhraní inej siete sa môže nastaviť `ip helper-address 192.168.10.5`, aby router pôsobil ako relay. Overenie poskytujú príkazy `show ip dhcp binding`, `show ip dhcp pool` a výpis konfigurácie. Konkrétne príkazy sa medzi platformami líšia.

## DNS

DNS (*Domain Name System*) prekladá mená, napríklad `www.example.org`, na IP adresy a podľa záznamov aj opačne. Resolver posiela požiadavku rekurzívnemu serveru, ktorý môže kontaktovať autoritatívny server danej zóny. Záznamy `A` obsahujú IPv4, `AAAA` IPv6, `CNAME` alias a `MX` poštový server. Bežný DNS používa UDP port 53, pri veľkých odpovediach alebo prenose zóny aj TCP; šifrovaný DoT/DoH mení spôsob transportu k resolveru. DHCP často klientovi oznámi adresu DNS servera, ale DHCP a DNS sú odlišné služby.

## DHCPv6 a SLAAC

IPv6 nemá broadcastový DORA postup. DHCPv6 môže prideľovať stavové adresy a doplnkové voľby, kým SLAAC vytvorí adresu z prefixu v Router Advertisement. Router Advertisement príznakmi určuje, či má klient použiť DHCPv6 pre adresu alebo iba pre ďalšie parametre; DHCPv6 používa UDP 546 na klientovi a 547 na serveri/relayi.

## Modifikátory prístupu v OOP

Modifikátory určujú, odkiaľ možno pristupovať k triede alebo členom. V jazykoch typu C#/Java platí typicky:

- `public` — prístup z ľubovoľného povoleného kódu,
- `private` — iba v deklarujúcej triede,
- `protected` — v triede a odvodených triedach,
- `internal`/package-private — v rámci modulu alebo balíka podľa jazyka.

Používajú sa na zapuzdrenie: verejné rozhranie zostane malé a interná implementácia sa môže meniť bez rozbitia klienta.

## DORA podrobnejšie

| Správa | Od → komu | Typ | Porty |
| --- | --- | --- | --- |
| DHCPDISCOVER | klient → všetci | broadcast | UDP 68 → 67 |
| DHCPOFFER | server → klient | unicast/broadcast | UDP 67 → 68 |
| DHCPREQUEST | klient → všetci | broadcast (ostatné servery sa dozvedia, že ich ponuka neprešla) | UDP 68 → 67 |
| DHCPACK | server → klient | unicast/broadcast | UDP 67 → 68 |

**Obnovenie prenájmu:** v čase **T1 = 50 %** prenájmu klient pošle unicast
Request svojmu serveru; v čase **T2 = 87,5 %** skúša broadcastom akýkoľvek
server. Pri odmietnutí server pošle **DHCPNAK**, klient uvoľní adresu správou
**DHCPRELEASE**.

## Ďalšie príkazy

```text
! router ako DHCP klient (napr. smerom k ISP)
interface g0/1
 ip address dhcp
 no shutdown
!
! relay na rozhraní siete bez DHCP servera
interface g0/0
 ip helper-address 192.168.10.5
!
! kontrola
show ip dhcp binding
show ip dhcp pool
show ip dhcp conflict
```

Na Windows klientovi: `ipconfig /release`, `ipconfig /renew`, `ipconfig /all`.

## DNS – hierarchia a preklad

```text
                 . (root)
        ┌────────┼────────┐
       sk       com      org        ← TLD
        │        │
     skola      google              ← doména 2. úrovne
        │
       www                          ← hostiteľ
```

Preklad `www.skola.sk`:

1. PC sa spýta svojho DNS servera (resolvera) – **rekurzívny** dotaz.
2. Resolver sa pýta **root** servera → odkáže ho na server **.sk**.
3. Server .sk ho odkáže na autoritatívny server **skola.sk**.
4. Ten vráti IP adresu; resolver ju uloží do **cache** (na dobu TTL) a pošle PC.

Kroky 2–4 sú **iteratívne** dotazy. Overenie: `nslookup www.skola.sk`.

| Záznam | Obsah |
| --- | --- |
| A | meno → IPv4 |
| AAAA | meno → IPv6 |
| CNAME | alias na iné meno |
| MX | poštový server domény |
| NS | autoritatívny server zóny |
| PTR | IP → meno (spätný preklad) |

## Modifikátory prístupu v C#

| Modifikátor | Kto má prístup |
| --- | --- |
| `public` | ktokoľvek |
| `private` | len trieda, v ktorej je člen deklarovaný |
| `protected` | trieda a triedy z nej odvodené |
| `internal` | celý projekt (assembly), ale nie iné projekty |

Kombinácie: `protected internal` = projekt **alebo** odvodené triedy,
`private protected` = odvodené triedy **len** v tom istom projekte.

Predvolene sú **členy triedy `private`** a **trieda `internal`**.

```csharp
class DhcpPool
{
    private int obsadene;                 // vidí len táto trieda
    protected string siet;                // aj odvodené triedy
    public string Nazov { get; set; }     // všetci

    public bool PridelAdresu()
    {
        if (obsadene >= 254) return false;
        obsadene++;
        return true;
    }
}
```

## Krátka ústna odpoveď

DHCP prideľuje adresu, masku, bránu, DNS a prenájom. Pri IPv4 prebieha DORA: Discover, Offer, Request, Acknowledge; server používa pool, výnimky, rezervácie a relay. DNS prekladá mená na adresy pomocou záznamov A, AAAA, CNAME a MX. DHCPv6 pracuje bez broadcastu a dopĺňa SLAAC. V OOP modifikátory `public`, `private`, `protected` a podľa jazyka `internal` riadia viditeľnosť členov.

## Súvisiace poznámky (CCNA2)

[[M07 – DHCPv4]] — rozcestník [[CCNA2 – SRWE]]

## Kontrolné otázky

> [!question]- Čo všetko prideľuje DHCP klientovi?
> IP adresu, masku, predvolenú bránu, DNS server, dobu prenájmu, prípadne
> doménové meno a ďalšie voľby.

> [!question]- Opíš proces DORA.
> Discover (klient hľadá server, broadcast), Offer (server ponúkne adresu),
> Request (klient ponuku prijme), Acknowledge (server potvrdí).

> [!question]- Ktoré porty používa DHCPv4?
> UDP 67 server, UDP 68 klient.

> [!question]- Na čo slúži ip helper-address?
> Router funguje ako DHCP relay – preposiela broadcast Discover z inej siete
> ako unicast na DHCP server.

> [!question]- Ako nakonfiguruješ DHCP server na routeri Cisco?
> `ip dhcp excluded-address` (vylúčené adresy), `ip dhcp pool MENO`,
> `network`, `default-router`, `dns-server`, prípadne `lease`.

> [!question]- Ako prebieha preklad mena v DNS?
> Klient sa rekurzívne pýta resolvera, ten iteratívne root → TLD →
> autoritatívny server, výsledok uloží do cache a vráti klientovi.

> [!question]- Aké DNS záznamy poznáš?
> A, AAAA, CNAME, MX, NS, PTR.

> [!question]- Vysvetli modifikátory public, private a protected.
> public – prístupné odkiaľkoľvek; private – len vo vnútri triedy; protected –
> v triede a v odvodených triedach.
