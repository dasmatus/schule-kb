---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T14 – Architektúra počítača a operačné systémy

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> ARCHITEKTÚRA POČÍTAČA A OPERAČNÉ SYSTÉMY – základné komponenty PC, operačné systémy, blokové schémy rôznych architektúr počítača, druhy pamätí v počítači, aplikačné programy, druhy adries IPv6, objektovo orientované programovanie – trieda, objekt, ...

## Základné komponenty počítača

Osobný počítač tvoria najmä:

- **CPU** — riadiaca jednotka načítava a dekóduje inštrukcie, ALU vykonáva aritmetické a logické operácie, registre držia malé množstvo okamžitých údajov a cache zrýchľuje prístup k často používaným dátam,
- **základná doska** — prepája komponenty, obsahuje čipset, sloty, zbernice, firmware UEFI a konektory,
- **RAM** — pracovná, rýchla a spravidla volatilná pamäť,
- **úložisko** — SSD alebo HDD pre trvalé programy a dáta,
- **GPU** — vykonáva grafické a paralelné výpočty,
- **zdroj (PSU)** — mení sieťové napätie na stabilné jednosmerné napätia,
- vstupno-výstupné zariadenia, sieťový adaptér a chladiaci systém.

## Architektúry a blokové schémy

Vo **von Neumannovej architektúre** sú program aj dáta v spoločnej pamäti a komunikujú s CPU po spoločnej zbernici. Jednoduchá bloková schéma je `CPU ↔ zbernica ↔ pamäť + vstup/výstup`. Výhodou je flexibilita, nevýhodou zdieľaná cesta a takzvané von Neumannovo hrdlo.

V **Harvardskej architektúre** sú programová a dátová pamäť oddelené a môžu mať samostatné zbernice. Modifikovaná Harvardova architektúra kombinuje princípy; používa sa v mnohých procesoroch s oddelenými cache pre inštrukcie a dáta. Pri návrhu blokovej schémy treba označiť CPU, pamäť, zbernice, radiče a I/O, nie iba jednotlivé periférie.

## Druhy pamätí

Hierarchia od najrýchlejšej po pomalšiu je približne registre → cache → RAM → SSD/HDD. Registre a cache sú malé a volatilné, RAM po vypnutí stráca obsah. ROM, EEPROM a flash sú nevolatilné; firmware sa uchová aj bez napájania. SSD používa flash bez mechanických častí, HDD magnetické platne a hlavičky. Pri pamäti posudzujeme kapacitu, latenciu, priepustnosť, cenu a volatilitu.

## Operačné systémy a aplikačné programy

Operačný systém spravuje procesy a vlákna, virtuálnu pamäť, súborový systém, ovládače, používateľov, oprávnenia, sieť a bezpečnosť. Poskytuje služby, ktoré aplikácia využíva cez API. Poznáme desktopové, serverové, mobilné, embedded a real-time operačné systémy; rozdiel je v účele a požiadavkách na odozvu.

Aplikačný program rieši konkrétnu úlohu používateľa, napríklad kancelársky editor, prehliadač, databázový klient, CAD alebo vývojové prostredie. Nie je to to isté ako ovládač či jadro operačného systému.

## Druhy adries IPv6

IPv6 používa 128-bitové adresy. **Global unicast** je verejne smerovateľná, **link-local** `fe80::/10` platí iba na lokálnom linku a **unique local** `fc00::/7` je určená pre interné použitie. **Multicast** začína `ff00::/8` a nahrádza broadcast. **Anycast** priraďuje rovnakú adresu viacerým uzlom a smerovanie vyberie najbližší. `::1` je loopback a `::` je neurčená adresa.

## OOP: trieda a objekt

V objektovo orientovanom programovaní je **trieda** predloha so stavom a správaním; **objekt** je konkrétna inštancia. Atribúty uchovávajú stav a metódy definujú správanie. Zapuzdrenie obmedzuje priamy prístup, abstrakcia ukazuje podstatné vlastnosti, dedičnosť zdieľa spoločný základ a polymorfizmus umožňuje rovnaké rozhranie s rôznou implementáciou.

## Bloková schéma a zbernice

```text
          ┌───────────────────────┐
          │          CPU          │
          │ riadiaca jednotka,    │
          │ ALU, registre, cache  │
          └───────────┬───────────┘
                      │  dátová + adresová + riadiaca zbernica
      ┌───────────────┼────────────────┐
┌─────┴─────┐   ┌─────┴─────┐   ┌──────┴──────┐
│  pamäť    │   │  vstup    │   │  výstup     │
│  RAM, ROM │   │ klávesnica│   │ monitor     │
└───────────┘   └───────────┘   └─────────────┘
```

| Zbernica | Smer | Čo prenáša |
| --- | --- | --- |
| **dátová** | obojsmerne | samotné dáta a inštrukcie |
| **adresová** | z CPU | adresu pamäťového miesta alebo zariadenia |
| **riadiaca** | obojsmerne | signály čítaj/zapíš, hodiny, prerušenia |

Šírka adresovej zbernice určuje adresovateľnú pamäť: **32 bitov → 2³² B = 4 GB**,
preto 32-bitové systémy nevyužijú viac než 4 GB RAM.

## Cyklus procesora

1. **Fetch** – načítanie inštrukcie z pamäte na adrese v **programovom čítači (PC)**
2. **Decode** – riadiaca jednotka inštrukciu dekóduje
3. **Execute** – ALU ju vykoná
4. (**Write back**) – výsledok sa zapíše do registra alebo pamäte, PC sa posunie

Výkon zvyšuje frekvencia, počet jadier, veľkosť cache a **pipelining**
(prekrývanie fáz viacerých inštrukcií).

## CISC a RISC

| | CISC | RISC |
| --- | --- | --- |
| inštrukcie | veľa zložitých, rôznej dĺžky | málo jednoduchých, rovnakej dĺžky |
| príklad | x86 (Intel, AMD) | ARM (mobily, Apple M), RISC-V |
| spotreba | vyššia | nižšia |

## Druhy pamätí – prehľad

| Pamäť | Volatilná | Rýchlosť | Použitie |
| --- | --- | --- | --- |
| registre | áno | najvyššia | operandy v CPU |
| cache L1/L2/L3 (SRAM) | áno | veľmi vysoká | kópie často používaných dát |
| RAM (DRAM, DDR4/DDR5) | áno | vysoká | bežiace programy |
| ROM / flash (UEFI) | nie | nízka | firmvér |
| SSD (flash, NVMe) | nie | stredná | trvalé úložisko |
| HDD | nie | nízka | lacná veľká kapacita |

Podrobnosti o moduloch, kanáloch a ECC: [[Pamäť, adaptérové karty a rozširujúce sloty]].

## Operačné systémy – príklady a funkcie

| Typ | Príklady |
| --- | --- |
| desktopové | Windows 11, macOS, Linux (Ubuntu, Fedora) |
| serverové | Windows Server, Linux (Debian, RHEL) |
| mobilné | Android, iOS |
| sieťové / embedded | Cisco IOS, firmvér routerov, RTOS v mikrokontroléroch |

**Spustenie PC:** zapnutie → **POST** (test hardvéru) → **UEFI/BIOS** nájde
zavádzač → **bootloader** (napr. Windows Boot Manager, GRUB) → **jadro OS** →
služby → prihlásenie.

- **Proces** = spustený program s vlastnou pamäťou; **vlákno** = časť procesu,
  vlákna zdieľajú pamäť procesu.
- **Súborové systémy:** NTFS (Windows), FAT32 (max. súbor 4 GB), exFAT
  (USB kľúče), ext4 (Linux), APFS (macOS).
- **Softvér:** systémový (OS, ovládače, utility) vs. aplikačný (kancelária,
  prehliadač, hry).

## Trieda a objekt v C#

```csharp
class Pocitac
{
    public string Nazov;
    public int RamGB;

    public void Vypis()
    {
        Console.WriteLine($"{Nazov}: {RamGB} GB RAM");
    }
}

Pocitac pc1 = new Pocitac();      // objekt (inštancia) triedy
pc1.Nazov = "Učebňa 12";
pc1.RamGB = 16;
pc1.Vypis();                      // Učebňa 12: 16 GB RAM
```

Trieda je **predloha** (ako výkres), objekt je **konkrétny výrobok** podľa nej.
Z jednej triedy môže vzniknúť veľa objektov s rôznymi hodnotami atribútov.

## Krátka ústna odpoveď

PC sa skladá z CPU, základnej dosky, RAM, úložiska, zdroja, GPU, sieťového a I/O hardvéru. Von Neumannova architektúra zdieľa pamäť programu a dát, Harvardova ich oddeľuje; pamäťová hierarchia ide od registrov cez cache a RAM po SSD/HDD. OS spravuje procesy, pamäť, súbory, ovládače a bezpečnosť, aplikácie využívajú jeho služby. IPv6 pozná global unicast, link-local, unique local, multicast a anycast. OOP používa triedy, objekty, atribúty a metódy.

## Súvisiace poznámky

- Hardvér: [[Elektrická bezpečnosť a hardvér PC]] · [[Pamäť, adaptérové karty a rozširujúce sloty]] · [[Pamäte]] · [[Základná doska]]
- CCNA2: [[M08 – SLAAC and DHCPv6]] — rozcestník [[CCNA2 – SRWE]]

## Kontrolné otázky

> [!question]- Z akých komponentov sa skladá PC?
> CPU, základná doska (čipset, UEFI, sloty), RAM, úložisko SSD/HDD, zdroj, GPU,
> sieťová karta, chladenie, vstupno-výstupné zariadenia.

> [!question]- Porovnaj von Neumannovu a Harvardskú architektúru.
> Von Neumann: spoločná pamäť a zbernica pre program aj dáta, flexibilná, ale
> úzke hrdlo. Harvard: oddelená pamäť programu a dát, súčasný prístup,
> mikrokontroléry a cache L1.

> [!question]- Aké zbernice poznáš a čo prenášajú?
> Dátová (dáta), adresová (adresy, z CPU), riadiaca (riadiace signály).

> [!question]- Opíš cyklus vykonania inštrukcie.
> Fetch (načítanie podľa programového čítača), decode (dekódovanie), execute
> (vykonanie v ALU), zápis výsledku.

> [!question]- Zoraď pamäte podľa rýchlosti.
> Registre → cache → RAM → SSD → HDD. Rýchlejšie sú menšie a drahšie.

> [!question]- Aké funkcie má operačný systém?
> Správa procesov, pamäte, súborov, zariadení (ovládače), používateľov a
> oprávnení, siete a bezpečnosti; poskytuje rozhranie (GUI/CLI, API).

> [!question]- Aký je rozdiel medzi triedou a objektom?
> Trieda je predloha (atribúty a metódy), objekt je konkrétna inštancia
> vytvorená cez `new`.

> [!question]- Aké typy IPv6 adries poznáš?
> Global unicast, link-local `fe80::/10`, unique local `fc00::/7`, multicast
> `ff00::/8`, anycast, loopback `::1`.
