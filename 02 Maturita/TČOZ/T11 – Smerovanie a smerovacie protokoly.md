---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T11 – Smerovanie a smerovacie protokoly

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> SMEROVANIE A SMEROVACIE PROTOKOLY – router, smerovacie protokoly, routing, routovacia tabuľka, riadiace príkazy programovacieho jazyka

## Router a smerovanie

Router prepája odlišné IP siete a na tretej vrstve rozhoduje, kam poslať paket. **Smerovanie (routing)** je výber cesty a tvorba informácie o cestách; **forwarding** je samotné odovzdanie konkrétneho paketu na výstupné rozhranie. Router oddelí broadcastové domény, zmení linkovú hlavičku na každom skoku a znižuje TTL/Hop Limit.

Pri výbere sa používa najdlhší zhodný prefix. Ak má viac ciest rovnaký prefix, rozhoduje dôveryhodnosť zdroja a metrika podľa implementácie. Paket môže byť zahodený, ak neexistuje vhodná trasa alebo je rozhranie nedostupné.

## Routovacia tabuľka

Záznam zvyčajne obsahuje:

- cieľovú sieť a prefix,
- next-hop router alebo výstupné rozhranie,
- zdroj záznamu (priamo pripojená, statická alebo dynamická trasa),
- metriku a prípadne administratívnu vzdialenosť,
- čas platnosti a informáciu o dostupnosti.

Príklad rozhodovania: pre cieľ `10.1.2.5` majú záznamy `10.0.0.0/8` a `10.1.2.0/24`; vyberie sa `/24`, pretože je presnejší. Predvolená IPv4 trasa `0.0.0.0/0` sa použije až vtedy, keď sa nezhoduje žiadna konkrétnejšia.

## Smerovacie protokoly

- **Statické smerovanie** zadáva správca ručne. Je predvídateľné a vhodné pre malé alebo okrajové siete, ale pri výpadku sa samo neprepočíta.
- **RIP** je jednoduchý distance-vector protokol; používa počet skokov a má obmedzenú škálovateľnosť.
- **OSPF** je link-state protokol. Routery si v oblasti vymieňajú stav liniek, vytvoria databázu topológie a pomocou SPF vyberú cestu podľa ceny.
- **EIGRP** je routing protokol rozšírený najmä v prostredí Cisco; používa kompozitnú metriku a rýchlu konvergenciu.
- **BGP** vymieňa trasy medzi autonómnymi systémami na internete a rozhoduje podľa politík a atribútov.

Konkrétna voľba závisí od veľkosti, politiky, požadovanej konvergencie a podpory výrobcu.

## Príklad základnej konfigurácie

Syntax sa medzi výrobcami líši; nasledujúci príklad je v štýle Cisco IOS:

```text
enable
configure terminal
interface GigabitEthernet0/0
 ip address 192.168.10.1 255.255.255.0
 no shutdown
exit
ip route 0.0.0.0 0.0.0.0 192.168.10.254
end
show ip route
```

Najprv sa nastaví rozhranie, adresa a stav `up`, potom statická alebo dynamická trasa. Konfiguráciu treba uložiť podľa platformy a overiť príkazmi `show ip interface brief`, `show interfaces` a `show ip route`.

## Riadiace príkazy programovacieho jazyka

Smerovacie rozhodovanie v programe využíva riadiace príkazy: `if/else` na výber vetvy, `switch` pri viacerých diskrétnych hodnotách, cykly `for`/`while` na opakovanie a `break`, `continue` alebo `return` na zmenu toku. Príkazy musia mať jasnú podmienku ukončenia a nemali by potláčať chyby bez záznamu.

## Krátka ústna odpoveď

Router spája IP siete a podľa routovacej tabuľky vykonáva forwarding. Tabuľka obsahuje cieľový prefix, next hop alebo rozhranie, zdroj a metriku; rozhoduje najdlhší zhodný prefix. Trasy môžu byť statické alebo získané protokolmi RIP, OSPF, EIGRP či BGP. Základná konfigurácia nastaví rozhranie a trasu a overí sa príkazmi `show`. V programe smerovacie rozhodnutia realizujú podmienky, prepínače a cykly.
