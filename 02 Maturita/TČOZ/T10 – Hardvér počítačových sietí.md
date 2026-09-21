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

## Krátka ústna odpoveď

Sieťový adaptér môže byť Ethernet, Wi-Fi, optický, celulárny alebo virtuálny. Na linkovej vrstve má MAC adresu. ARP zistí MAC adresu známej IPv4 adresy pomocou broadcast požiadavky a odpovede a výsledok uloží do cache. Pri RJ45 sa používajú normy T568A/B; rovnaké konce tvoria priamy kábel. Relačné operátory porovnávajú hodnoty a logické operátory skladajú podmienky.
