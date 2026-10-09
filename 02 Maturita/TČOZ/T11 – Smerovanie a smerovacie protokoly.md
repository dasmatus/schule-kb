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

## Administratívna vzdialenosť

Ak sa o tej istej sieti dozvie router z viacerých zdrojov, vyberie zdroj s
**najnižšou administratívnou vzdialenosťou (AD)**. Metrika rozhoduje až medzi
cestami z toho istého protokolu.

| Zdroj | AD |
| --- | --- |
| priamo pripojená sieť | 0 |
| statická trasa | 1 |
| eBGP | 20 |
| EIGRP | 90 |
| OSPF | 110 |
| RIP | 120 |
| iBGP | 200 |

## Kódy vo výpise `show ip route`

`C` priamo pripojená sieť · `L` lokálna adresa rozhrania (/32) · `S` statická ·
`O` OSPF · `D` EIGRP · `R` RIP · `*` kandidát na predvolenú trasu.

```text
S*    0.0.0.0/0 [1/0] via 10.0.0.2
C     192.168.10.0/24 is directly connected, GigabitEthernet0/0
L     192.168.10.1/32 is directly connected, GigabitEthernet0/0
O     192.168.20.0/24 [110/2] via 10.0.0.2, 00:01:12, Serial0/0/0
```

V hranatých zátvorkách je `[AD/metrika]`.

## Druhy statických trás

```text
ip route 192.168.20.0 255.255.255.0 10.0.0.2      ! štandardná (next hop)
ip route 192.168.20.0 255.255.255.0 s0/0/0        ! cez výstupné rozhranie
ip route 0.0.0.0 0.0.0.0 10.0.0.2                 ! predvolená (default)
ip route 0.0.0.0 0.0.0.0 10.0.1.2 5               ! plávajúca (záložná, AD 5)
ipv6 route ::/0 2001:db8:acad:1::2                ! predvolená IPv6
```

**Plávajúca trasa** má vyššiu AD, preto sa do tabuľky dostane, až keď hlavná
trasa vypadne.

## Porovnanie protokolov

| | RIP | OSPF | EIGRP | BGP |
| --- | --- | --- | --- | --- |
| typ | distance-vector | link-state | pokročilý distance-vector | path-vector |
| metrika | počet skokov (max 15) | cena (*cost*) z šírky pásma | šírka pásma + oneskorenie | atribúty, politiky |
| použitie | malé siete | podnikové siete, otvorený štandard | siete Cisco | medzi AS na internete |
| rozsah | IGP | IGP | IGP | EGP |

**Cena OSPF** = referenčná šírka pásma (100 Mb/s) / šírka pásma linky.
Fast Ethernet → 1, Ethernet 10 Mb/s → 10.

## Konfigurácia OSPF (jedna oblasť)

```text
router ospf 10
 router-id 1.1.1.1
 network 192.168.10.0 0.0.0.255 area 0
 network 10.0.0.0 0.0.0.3 area 0
 passive-interface g0/0
```

Za sieťou sa píše **wildcard maska** (inverzná maska: `0.0.0.255` pre /24).
`passive-interface` zastaví posielanie OSPF správ do LAN, kde nie je ďalší
router. Kontrola: `show ip ospf neighbor`, `show ip route ospf`.

## Riadiace príkazy – výber trasy v C#

```csharp
string VyberTrasu(int prefix)
{
    if (prefix == 32)
        return "host route";
    else if (prefix >= 24)
        return "konkrétna sieť";
    else if (prefix > 0)
        return "súhrnná trasa";
    else
        return "predvolená trasa";
}

switch (zdroj)
{
    case "C": ad = 0; break;
    case "S": ad = 1; break;
    case "O": ad = 110; break;
    default:  ad = 255; break;   // nedôveryhodný zdroj
}
```

## Krátka ústna odpoveď

Router spája IP siete a podľa routovacej tabuľky vykonáva forwarding. Tabuľka obsahuje cieľový prefix, next hop alebo rozhranie, zdroj a metriku; rozhoduje najdlhší zhodný prefix. Trasy môžu byť statické alebo získané protokolmi RIP, OSPF, EIGRP či BGP. Základná konfigurácia nastaví rozhranie a trasu a overí sa príkazmi `show`. V programe smerovacie rozhodnutia realizujú podmienky, prepínače a cykly.

## Súvisiace poznámky (CCNA2)

[[M09 – FHRP Concepts]] · [[M14 – Routing Concepts]] · [[M15 – IP Static Routing]] · [[M16 – Troubleshoot Static and Default Routes]] — rozcestník [[CCNA2 – SRWE]]

## Pozri aj – CCNA3 ENSA

- [[ENSA 01 – Koncepty OSPFv2]]
- [[ENSA 02 – Konfigurácia OSPFv2]]

## Kontrolné otázky

> [!question]- Čo robí router a čím sa líši routing od forwardingu?
> Router spája rôzne IP siete. Routing je tvorba a výber ciest (tabuľka),
> forwarding je odoslanie konkrétneho paketu na výstupné rozhranie.

> [!question]- Čo obsahuje záznam v routovacej tabuľke?
> Cieľovú sieť s prefixom, next hop alebo výstupné rozhranie, zdroj (kód),
> administratívnu vzdialenosť a metriku.

> [!question]- Podľa čoho router vyberá trasu?
> Najprv najdlhší zhodný prefix, pri rovnakom prefixe najnižšia AD, potom
> najnižšia metrika.

> [!question]- Aký je rozdiel medzi statickým a dynamickým smerovaním?
> Statické nastaví správca ručne – jednoduché, bezpečné, ale nereaguje na
> výpadky. Dynamické (OSPF, EIGRP) sa samo prispôsobí, ale zaťažuje router a sieť.

> [!question]- Čo je plávajúca statická trasa?
> Záložná statická trasa s vyššou AD; použije sa, až keď hlavná trasa vypadne.

> [!question]- Porovnaj RIP a OSPF.
> RIP: distance-vector, metrika počet skokov (max 15), pomalá konvergencia.
> OSPF: link-state, metrika cena podľa šírky pásma, rýchla konvergencia, oblasti.

> [!question]- Ako nakonfiguruješ predvolenú trasu?
> `ip route 0.0.0.0 0.0.0.0 <next-hop>`; pre IPv6 `ipv6 route ::/0 <next-hop>`.

> [!question]- Kedy použiješ if-else a kedy switch?
> if-else pre rozsahy a zložené podmienky, switch pri porovnaní jednej
> premennej s viacerými konkrétnymi hodnotami.
