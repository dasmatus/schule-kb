---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T12 – Diagnostika sietí

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> DIAGNOSTIKA SIETÍ – zásady diagnostiky sietí, nastavenie parametrov na sieťové zariadenia a ich zobrazenie, softvéry na diagnostiku siete, kryptovanie, polia v programe

## Zásady diagnostiky sietí

Diagnostika má byť systematická a reprodukovateľná:

1. presne opísať príznak, čas a rozsah výpadku,
2. overiť fyzickú vrstvu — napájanie, kábel, konektor, link LED a stav portu,
3. skontrolovať linkovú a IP konfiguráciu — VLAN, adresu, prefix/masku, bránu a DNS,
4. otestovať lokálny cieľ, bránu, vzdialenú IP a potom názov služby,
5. oddeliť problém klienta, segmentu, servera a aplikácie,
6. meniť naraz jednu vec, zapísať výsledok a po oprave overiť pôvodný scenár.

Pomáha porovnanie s funkčným zariadením a uloženou referenčnou konfiguráciou. Pri zásahu treba dbať na oprávnenie, bezpečnosť a dokumentovanie zmeny; diagnostické skenovanie sa vykonáva iba na povolených sieťach.

## Nastavenie a zobrazenie parametrov

Na hostiteľovi možno použiť:

```text
ipconfig /all        # Windows
ip addr              # Linux
ip route             # smerovacia tabuľka Linux
```

Na zariadení v štýle Cisco IOS sa konfigurácia nastavuje napríklad takto:

```text
enable
configure terminal
interface GigabitEthernet0/1
 ip address 192.168.20.1 255.255.255.0
 no shutdown
end
show running-config
show ip interface brief
show interfaces
show ip route
```

Pri switchi sú užitočné `show vlan brief`, `show interfaces status` a `show mac address-table`. Príkazy sa líšia podľa operačného systému; výpis treba čítať v súvislosti s fyzickou schémou, nie izolovane.

## Softvér a príkazy na diagnostiku

- `ping` overí dosiahnuteľnosť a približnú odozvu pomocou ICMP,
- `tracert`/`traceroute` ukáže jednotlivé skoky,
- `nslookup` alebo `dig` overí DNS,
- `arp -a`/`ip neigh` zobrazí susedov v lokálnej linke,
- `netstat` alebo `ss` zobrazí spojenia a počúvajúce porty,
- Wireshark zachytí a filtruje pakety na podrobné overenie,
- Nmap môže overovať porty a služby, ale iba s výslovným oprávnením.

Ak ping na bránu funguje, ale DNS meno nie, problém je pravdepodobne v DNS, nie v kábli. Ak nefunguje ani lokálna brána, hľadáme skôr fyziku, VLAN, adresu alebo lokálne rozhranie.

## Kryptovanie a ochrana komunikácie

**Symetrické šifrovanie** používa rovnaký tajný kľúč na šifrovanie aj dešifrovanie; je rýchle, ale kľúč treba bezpečne doručiť. **Asymetrické šifrovanie** používa verejný a súkromný kľúč; uľahčuje výmenu a podpis, ale je výpočtovo náročnejšie. V praxi TLS používa certifikáty a kombinuje asymetrickú výmenu so symetrickým šifrovaním dát. Hash nie je šifrovanie: je jednosmerný odtlačok na kontrolu integrity alebo hesiel.

## Polia v programe

Pole je súvislá kolekcia prvkov rovnakého typu s indexom, často od nuly. Napríklad `pingy[0]` môže uchovávať prvú nameranú odozvu. Pri diagnostickom programe sa pole prechádza cyklom, počíta sa minimum, maximum a priemer a treba kontrolovať hranice:

```text
súčet = 0
pre i od 0 po počet - 1:
    ak meranie[i] >= 0:
        súčet = súčet + meranie[i]
priemer = súčet / počet
```

Prístup mimo rozsahu spôsobí chybu alebo poškodenie pamäte. Pri neznámej veľkosti je vhodnejšia bezpečná kolekcia.

## Krátka ústna odpoveď

Sieť diagnostikujem od fyzickej vrstvy cez linkovú a IP až po DNS a aplikáciu. Parametre zobrazím cez `ipconfig /all`, `ip addr` alebo príkazy `show` na zariadení; spojenie overím `ping`, trasu `traceroute`, DNS `nslookup` a porty `netstat`/`ss`. Wireshark ukáže pakety. Kryptovanie chráni obsah, hash kontroluje integritu. Pole je indexovaná kolekcia rovnakých prvkov, pri ktorej musím kontrolovať hranice.
