---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T10 – Hardvér počítačových sietí

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> HARDVÉR POČÍTAČOVÝCH SIETÍ – typy sieťových adaptérov, MAC adresa, protokol ARP, spôsoby zapojenia RJ45, relačné a logické operátory

## Typy sieťových adaptérov

Sieťový adaptér (NIC) pripája zariadenie k prenosovému médiu a zabezpečuje funkcie fyzickej a linkovej vrstvy. Môže byť:

- **Ethernetový** — medený port RJ45, prípadne SFP/SFP+ pre optický modul,
- **bezdrôtový Wi-Fi** — rádiový adaptér s anténami,
- **optický** — integrovaný alebo modulárny adaptér pre vlákno,
- **celulárny** — modem pre mobilnú sieť,
- **virtuálny** — napríklad loopback, tunel, bridge alebo adaptér virtuálneho stroja.

Adaptér má ovládač, vyrovnávacie pamäte a konfiguráciu rýchlosti, duplexu, VLAN či offloadu. Pri výpadku treba overiť napájanie, link LED, ovládač a stav rozhrania.

## MAC adresa

MAC adresa je linková adresa rozhrania, zvyčajne 48-bitová a zapisovaná ako `00:1A:2B:3C:4D:5E` alebo s pomlčkami. Prvé tri oktety môžu označovať výrobcu (OUI), zvyšok rozhranie. Najnižší bit prvého oktetu rozlišuje unicast a multicast a ďalší bit označuje univerzálne alebo lokálne spravovanú adresu. Moderný operačný systém môže kvôli súkromiu používať náhodnú MAC pre Wi-Fi, preto MAC nie je vždy nemenný identifikátor osoby.

## Protokol ARP

ARP pre IPv4 prekladá IP adresu suseda na MAC adresu v lokálnej linke. Ak hostiteľ potrebuje poslať `192.168.1.20`, ale MAC nepozná, vyšle broadcast **ARP Request** „Kto má túto IP?“. Vlastník adresy odpovie unicastom **ARP Reply**. Výsledok sa uloží do dočasnej ARP cache s časom platnosti. Ak cieľ nie je v lokálnej podsieti, hostiteľ zisťuje MAC predvolenej brány, nie vzdialeného servera.

ARP možno zobraziť príkazom `arp -a` alebo `ip neigh`. Existuje aj gratuitous ARP na oznámenie vlastnej adresy a proxy ARP. ARP nie je kryptograficky overený, preto je možný ARP spoofing; ochranu poskytujú segmentácia, kontrola DHCP snoopingu a dynamická kontrola ARP. IPv6 nepoužíva ARP, ale Neighbor Discovery.

## Zapojenie RJ45

Konektor sa v bežnej terminológii nazýva RJ45, presnejšie ide o 8P8C. Normy T568A a T568B určujú poradie vodičov:

| Pin | T568A | T568B |
|---:|---|---|
| 1 | bielo-zelený | bielo-oranžový |
| 2 | zelený | oranžový |
| 3 | bielo-oranžový | bielo-zelený |
| 4 | modrý | modrý |
| 5 | bielo-modrý | bielo-modrý |
| 6 | oranžový | zelený |
| 7 | bielo-hnedý | bielo-hnedý |
| 8 | hnedý | hnedý |

Rovnaké zapojenie na oboch koncoch je priame (straight-through), kombinácia A–B je krížené (crossover). Moderné porty často podporujú Auto MDI-X, ale pri kabeláži treba dodržať normu, páry nerozpletať viac než je nutné a overiť testerom.

## Relačné a logické operátory

Relačné operátory porovnávajú hodnoty: `<`, `>`, `<=`, `>=`, `==` a `!=`. Výsledkom je pravdivostná hodnota. Logické operátory spájajú podmienky: AND `&&`, OR `||` a negácia `!`. Pri `&&` a `||` sa často používa skrátené vyhodnocovanie, takže druhá časť sa nemusí vykonať. To je užitočné pri bezpečnom overení, napríklad `adresa != null && adresa.length > 0`. Zátvorky odstraňujú nejasnosť v priorite.

## Sieťové zariadenia

| Zariadenie | Vrstva | Funkcia |
| --- | --- | --- |
| opakovač, **hub** | L1 | zosilní / rozošle signál na všetky porty, jedna kolízna doména |
| **switch** | L2 | posiela rámce podľa MAC tabuľky, každý port je samostatná kolízna doména |
| **router** | L3 | spája rôzne IP siete, oddeľuje broadcastové domény |
| L3 switch (MLS) | L2 + L3 | prepínanie aj smerovanie medzi VLAN |
| prístupový bod (AP) | L2 | pripojí bezdrôtových klientov do káblovej LAN |
| firewall | L3–L7 | filtruje prevádzku podľa pravidiel |
| modem | L1–L2 | prevod signálu pre linku poskytovateľa (DSL, kábel) |

## Ktorý kábel kam

| Spojenie | Kábel |
| --- | --- |
| PC – switch, router – switch | **priamy** (T568B – T568B) |
| switch – switch, PC – PC, router – router, **PC – router** | **krížený** (T568A – T568B) |
| PC – konzolový port routera/switcha | **konzolový (rollover)** kábel |

Pravidlo: **rôzne** typy zariadení (koncové vs. prepínač) → priamy,
**rovnaké** typy → krížený. Pri 10/100 Mb/s sa používajú páry na pinoch
**1, 2, 3, 6**, pri 1 Gb/s všetky **4 páry**. Krútenie párov potláča
presluchy a rušenie; maximálna dĺžka segmentu UTP je **100 m**.

## ARP krok za krokom

PC1 (`192.168.1.10`) posiela na PC2 (`192.168.1.20`) v tej istej sieti:

1. PC1 hľadá `192.168.1.20` vo svojej ARP cache – nenájde.
2. Pošle **ARP Request** na broadcast `FF:FF:FF:FF:FF:FF`.
3. Switch ho rozošle na všetky porty vo VLAN.
4. PC2 spozná svoju IP a pošle **ARP Reply** unicastom so svojou MAC.
5. PC1 si dvojicu uloží do cache a pošle rámec.

Na Cisco zariadení: `show arp` (router), `show mac address-table` (switch).

## Relačné a logické operátory v C#

```csharp
int vek = 19;
bool maPreukaz = true;
string ip = "192.168.1.1";
int den = 6;                                 // sobota

bool dospely = vek >= 18;                    // true
bool moze = dospely && maPreukaz;            // AND – obe musia platiť
bool vikend = den == 6 || den == 7;          // OR – stačí jedna
bool neplatna = !(ip.StartsWith("192.168"));  // negácia

// skrátené vyhodnotenie: ak je ip null, druhá časť sa nevykoná
if (ip != null && ip.Length > 0) { /* ... */ }
```

Priorita (od najvyššej): `!` → `< > <= >=` → `== !=` → `&&` → `||`.
Pozor na rozdiel `=` (priradenie) a `==` (porovnanie).

## Krátka ústna odpoveď

Sieťový adaptér môže byť Ethernet, Wi-Fi, optický, celulárny alebo virtuálny. Na linkovej vrstve má MAC adresu. ARP zistí MAC adresu známej IPv4 adresy pomocou broadcast požiadavky a odpovede a výsledok uloží do cache. Pri RJ45 sa používajú normy T568A/B; rovnaké konce tvoria priamy kábel. Relačné operátory porovnávajú hodnoty a logické operátory skladajú podmienky.

## Pozri aj – CCNA3 ENSA

- [[ENSA 11 – Návrh siete]]

## Kontrolné otázky

> [!question]- Aké typy sieťových adaptérov poznáš?
> Ethernetový (RJ45, SFP), bezdrôtový Wi-Fi, optický, celulárny (4G/5G) a
> virtuálny (loopback, adaptér virtuálneho stroja).

> [!question]- Ako vyzerá MAC adresa a čo vyjadruje OUI?
> 48 bitov, 12 hexadecimálnych číslic (`00:1A:2B:3C:4D:5E`). Prvé 3 bajty
> (OUI) určujú výrobcu, zvyšok rozhranie.

> [!question]- Ako funguje ARP?
> Hostiteľ pošle broadcast ARP Request s hľadanou IP, vlastník odpovie
> unicastom ARP Reply so svojou MAC, výsledok sa uloží do ARP cache. Pre
> vzdialenú sieť sa hľadá MAC brány.

> [!question]- Kedy použiješ priamy a kedy krížený kábel?
> Priamy medzi rôznymi typmi zariadení (PC – switch). Krížený medzi rovnakými
> (switch – switch, PC – PC, PC – router).

> [!question]- Aké je poradie farieb pri T568B?
> Bielo-oranžová, oranžová, bielo-zelená, modrá, bielo-modrá, zelená,
> bielo-hnedá, hnedá.

> [!question]- Aký je rozdiel medzi hubom a switchom?
> Hub (L1) rozošle všetko na všetky porty, vznikajú kolízie. Switch (L2) sa
> učí MAC adresy a posiela rámec len na správny port.

> [!question]- Čo je skrátené vyhodnocovanie pri && a ||?
> Ak je výsledok jasný z prvej časti (false pri `&&`, true pri `||`), druhá
> časť sa nevyhodnotí. Využíva sa pri kontrole `null`.
