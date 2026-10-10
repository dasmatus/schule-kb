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

## Metódy riešenia problémov

| Metóda | Postup |
| --- | --- |
| **zdola nahor** (*bottom-up*) | od fyzickej vrstvy nahor – keď je podozrenie na kábel |
| **zhora nadol** (*top-down*) | od aplikácie nadol – keď ide o jednu službu |
| **rozdeľ a panuj** | začne sa v strede (napr. ping = L3) a podľa výsledku sa ide hore alebo dole |
| **sledovanie cesty** | po trase paketu od zdroja k cieľu |
| **výmena** | nahradí sa podozrivý komponent funkčným |
| **porovnanie** | porovná sa s funkčnou konfiguráciou |
| **odhad** | podľa skúseností, rýchle, ale neisté |

## Čítanie výsledkov ping a traceroute

Na Cisco zariadení: `!` odpoveď prišla · `.` vypršal čas · `U` cieľ
nedosiahnuteľný (router poslal ICMP *unreachable*).

Ak sa `traceroute` zastaví na niektorom skoku, problém je za posledným
routerom, ktorý odpovedal (chýbajúca trasa, ACL, vypnuté rozhranie).

| Príznak | Pravdepodobná príčina | Čím overím |
| --- | --- | --- |
| rozhranie `down/down` | kábel, port, druhá strana vypnutá | `show ip interface brief`, LED |
| `administratively down` | chýba `no shutdown` | `show ip interface brief` |
| adresa `169.254.x.x` | nedostupný DHCP server | `ipconfig /all` |
| ping na IP funguje, na meno nie | DNS | `nslookup` |
| ping v rámci VLAN funguje, inde nie | brána, trunk, inter-VLAN routing | `show vlan brief`, `show interfaces trunk` |

## Kryptografické algoritmy

| Typ | Príklady | Použitie |
| --- | --- | --- |
| symetrické | **AES**, (3DES – zastaraný) | šifrovanie dát, VPN, Wi-Fi WPA2/3 |
| asymetrické | **RSA**, ECC | certifikáty, digitálny podpis, SSH kľúče |
| výmena kľúča | Diffie-Hellman | dohoda na spoločnom kľúči cez nezabezpečený kanál |
| hash | **SHA-256**, (MD5 – nebezpečný) | kontrola integrity, ukladanie hesiel |

Pri **digitálnom podpise** odosielateľ zašifruje hash správy svojím
**súkromným** kľúčom, príjemca ho overí **verejným** kľúčom odosielateľa.

Heslá na Cisco: `enable password` je uložené čitateľne (alebo slabo typom 7
po `service password-encryption`), `enable secret` ako hash – vždy používaj
`secret`.

## Pole v C# – vyhodnotenie meraní pingu

```csharp
int[] odozvy = { 12, 15, 11, 40, 13 };        // ms

int min = odozvy[0], max = odozvy[0], sucet = 0;
for (int i = 0; i < odozvy.Length; i++)
{
    if (odozvy[i] < min) min = odozvy[i];
    if (odozvy[i] > max) max = odozvy[i];
    sucet += odozvy[i];
}
double priemer = (double)sucet / odozvy.Length;   // 18.2
Console.WriteLine($"min {min} ms, max {max} ms, priemer {priemer} ms");
```

- deklarácia s veľkosťou: `int[] pole = new int[5];` (prvky majú hodnotu 0)
- indexy idú od `0` po `Length − 1`; `odozvy[5]` vyhodí
  `IndexOutOfRangeException`
- dvojrozmerné pole: `int[,] tabulka = new int[3, 4];`
- prechod bez indexu: `foreach (int x in odozvy) { ... }`

## Krátka ústna odpoveď

Sieť diagnostikujem od fyzickej vrstvy cez linkovú a IP až po DNS a aplikáciu. Parametre zobrazím cez `ipconfig /all`, `ip addr` alebo príkazy `show` na zariadení; spojenie overím `ping`, trasu `traceroute`, DNS `nslookup` a porty `netstat`/`ss`. Wireshark ukáže pakety. Kryptovanie chráni obsah, hash kontroluje integritu. Pole je indexovaná kolekcia rovnakých prvkov, pri ktorej musím kontrolovať hranice.

## Súvisiace poznámky (CCNA2)

[[M01 – Basic Device Configuration]] · [[M13 – WLAN Configuration]] · [[M16 – Troubleshoot Static and Default Routes]] — rozcestník [[CCNA2 – SRWE]]

## Pozri aj – CCNA3 ENSA

- [[ENSA 12 – Riešenie problémov v sieti]]
- [[ENSA 10 – Správa siete]]

## Kontrolné otázky

> [!question]- Aký postup zvolíš, keď PC nemá internet?
> Fyzika (kábel, LED) → `ipconfig /all` (adresa, maska, brána, DNS) → ping na
> bránu → ping na vzdialenú IP (8.8.8.8) → ping na meno (DNS) → aplikácia.

> [!question]- Aké metódy riešenia problémov poznáš?
> Zdola nahor, zhora nadol, rozdeľ a panuj, sledovanie cesty, výmena,
> porovnanie, odhad.

> [!question]- Čo znamená adresa 169.254.x.x?
> APIPA – PC nedostal adresu z DHCP servera a priradil si ju sám.

> [!question]- Na čo slúži ping, traceroute a nslookup?
> Ping – dosiahnuteľnosť a odozva (ICMP). Traceroute – cesta po skokoch.
> nslookup – overenie preložení DNS mena na IP.

> [!question]- Ktoré príkazy show použiješ na switchi a routeri?
> `show running-config`, `show ip interface brief`, `show interfaces`,
> `show ip route`, `show vlan brief`, `show mac address-table`,
> `show interfaces trunk`.

> [!question]- Porovnaj symetrické a asymetrické šifrovanie.
> Symetrické (AES) – jeden kľúč, rýchle, problém s doručením kľúča.
> Asymetrické (RSA) – verejný a súkromný kľúč, pomalšie, rieši výmenu kľúčov
> a podpis. TLS kombinuje obe.

> [!question]- Aký je rozdiel medzi šifrovaním a hashom?
> Šifrovanie je vratné (s kľúčom). Hash je jednosmerný odtlačok pevnej dĺžky,
> slúži na kontrolu integrity a ukladanie hesiel.

> [!question]- Čo je pole a aké má vlastnosti?
> Kolekcia prvkov rovnakého typu s pevnou veľkosťou, prístup cez index od 0.
> Prístup mimo rozsahu spôsobí výnimku.
