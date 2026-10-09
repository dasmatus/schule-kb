---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T08 – IP protokoly

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> IP PROTOKOLY – IPv6, dĺžka prefixu, maska, typy adries IPv4

## IP protokoly a logické adresovanie

IP je sieťový protokol, ktorý poskytuje logické adresovanie a doručovanie paketov medzi rôznymi sieťami. Sám negarantuje doručenie, poradie ani odstránenie duplicít; spoľahlivosť môže zabezpečiť transportný protokol TCP. Router pri rozhodovaní používa cieľovú IP adresu a routovaciu tabuľku.

## IPv6

IPv6 používa 128-bitové adresy zapisované v ôsmich hexadecimálnych skupinách, napríklad `2001:db8:1:2::10/64`. Nuly na začiatku skupiny možno vynechať a jednu súvislú najdlhšiu postupnosť nulových skupín nahradiť `::`; skratka sa v jednej adrese použije iba raz.

IPv6 prináša veľký adresný priestor, automatickú konfiguráciu, Neighbor Discovery namiesto ARP a podporu rozšírených hlavičiek. Broadcast nemá; jeho funkciu v príslušných situáciách nahrádza multicast. Bežne sa používa globálna unicast adresa, link-local adresa a dočasné adresy na ochranu súkromia.

## Dĺžka prefixu a maska

Zápis `/n` určuje počet bitov sieťovej časti. Pri IPv6 je typická podsieť `/64`: prvých 64 bitov je prefix a zvyšok identifikátor rozhrania. Dve adresy patria do rovnakej podsiete, ak majú rovnaký prefix dĺžky `n`.

Pri IPv4 je prefix ekvivalentný maske v desiatkovom tvare. Napríklad `/24` znamená `255.255.255.0`, pretože prvých 24 bitov je `1`. Pre `192.168.10.37/24` je sieť `192.168.10.0`, broadcast `192.168.10.255` a použiteľný hostiteľský rozsah zvyčajne `.1` až `.254`. Počet adries podsiete s `h` hostiteľskými bitmi je `2^h`; v bežnej IPv4 podsieti sa odpočítava sieťová a broadcastová adresa.

## Typy adries IPv4

- **unicast** — jeden odosielateľ a jeden príjemca,
- **broadcast** — všetci hostitelia v lokálnej podsieti; obmedzený je `255.255.255.255`, priamy broadcast má hostiteľské bity nastavené na jednotky,
- **multicast** — skupina príjemcov, rozsah IPv4 je `224.0.0.0/4`,
- **anycast** — rovnakú adresu môže mať viac uzlov a sieť vyberie topologicky najbližší; v IPv4 sa realizuje smerovaním, nie osobitným formátom.

Podľa použitia poznáme aj verejné a súkromné adresy (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), loopback `127.0.0.0/8`, link-local/APIPA `169.254.0.0/16` a dokumentačné rozsahy. Súkromné adresy nie sú priamo smerované internetom a často sa prekladajú cez NAT.

## Praktická kontrola

Na hostiteľovi možno adresy zobraziť napríklad `ip addr` alebo `ipconfig`. IPv6 konektivitu overí `ping -6` a trasu `traceroute -6`/`tracert`; presný príkaz závisí od systému. Pri návrhu treba skontrolovať prefix, duplicitu adresy, predvolenú bránu a DNS záznamy typu A/AAAA.

## Triedy IPv4 (historické)

| Trieda | Prvý oktet | Predvolená maska | Použitie |
| --- | --- | --- | --- |
| A | 1–126 | /8 (255.0.0.0) | veľké siete |
| B | 128–191 | /16 (255.255.0.0) | stredné siete |
| C | 192–223 | /24 (255.255.255.0) | malé siete |
| D | 224–239 | – | multicast |
| E | 240–255 | – | experimentálne |

Dnes sa používa beztriedne adresovanie **CIDR** (ľubovoľný prefix). `127.x.x.x`
je loopback, preto trieda A končí 126.

## Prehľad masiek

| Prefix | Maska | Adries | Použiteľných hostí |
| --- | --- | --- | --- |
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2 (spoj medzi routermi) |

Počet hostí: `2^h − 2`, kde `h = 32 − prefix`.

## Riešený príklad podsiete

Adresa `192.168.10.37/27`:

1. maska `/27` = `255.255.255.224`, veľkosť bloku `256 − 224 = 32`
2. bloky v poslednom oktete: 0, 32, 64… → `37` leží v bloku **32**
3. **sieť** `192.168.10.32`, **broadcast** `192.168.10.63`
4. **hostia** `192.168.10.33` – `192.168.10.62` (30 adries)

Binárne: sieťovú adresu dostanem logickým **AND** adresy a masky.

## Skracovanie IPv6

`2001:0db8:0000:0000:0000:ff00:0042:8329`

1. vynechám úvodné nuly v skupinách → `2001:db8:0:0:0:ff00:42:8329`
2. najdlhšiu súvislú postupnosť nulových skupín nahradím `::` →
   **`2001:db8::ff00:42:8329`**

## EUI-64 – identifikátor rozhrania z MAC

MAC `00:1A:2B:3C:4D:5E`:

1. rozdelím na polovice a vložím `FFFE` → `001A:2BFF:FE3C:4D5E`
2. preklopím 7. bit prvého bajtu (`00` → `02`) → `021A:2BFF:FE3C:4D5E`

Pri prefixe `2001:db8:1:1::/64` vznikne `2001:db8:1:1:21a:2bff:fe3c:4d5e`.

## Konfigurácia IPv6 na routeri Cisco

```text
ipv6 unicast-routing
interface g0/0
 ipv6 address 2001:db8:1:1::1/64
 ipv6 address fe80::1 link-local
 no shutdown
```

`ipv6 unicast-routing` zapne smerovanie IPv6 a router začne posielať RA správy
(SLAAC). Kontrola: `show ipv6 interface brief`.

## Prechod z IPv4 na IPv6

- **Dual stack** – zariadenie má IPv4 aj IPv6 súčasne (pozri [[T21 – Jednoduché a zložené údajové typy]])
- **Tunelovanie** – IPv6 paket sa zabalí do IPv4
- **Preklad** (NAT64) – preklad medzi IPv6 a IPv4

## Krátka ústna odpoveď

IPv6 má 128-bitovú adresu a používa prefix, napríklad `/64`; prefix určuje sieťovú časť. IPv4 má 32 bitov a maska `/24` je `255.255.255.0`. IPv4 adresy delíme na unicast, broadcast, multicast a smerovaním realizovaný anycast, pričom existujú aj verejné, súkromné, loopback a link-local adresy. IPv6 používa unicast, multicast a anycast, ale nemá broadcast; pri konfigurácii treba správne určiť prefix a bránu.

IPv6 má 128 bitov, zapisuje sa hexadecimálne a používa prefixy. `::` smie v adrese nahradiť iba jednu súvislú skupinu núl. Typy adries: globálna unicast, link-local `fe80::/10`, unique-local `fc00::/7`, multicast `ff00::/8` a anycast. IPv6 nemá broadcast.

## Súvisiace poznámky (CCNA2)

[[M08 – SLAAC and DHCPv6]] — rozcestník [[CCNA2 – SRWE]]

## Pozri aj – CCNA3 ENSA

- [[ENSA 06 – NAT pre IPv4]]

## Kontrolné otázky

> [!question]- Aký je rozdiel medzi IPv4 a IPv6?
> IPv4 má 32 bitov, desiatkový zápis, broadcast, často NAT. IPv6 má 128 bitov,
> hexadecimálny zápis, bez broadcastu (multicast), SLAAC, jednoduchšiu
> hlavičku, NDP namiesto ARP.

> [!question]- Urč sieť, broadcast a rozsah hostí pre 192.168.10.37/27.
> Sieť `.32`, broadcast `.63`, hostia `.33`–`.62` (30 hostí).

> [!question]- Ako skrátiš IPv6 adresu a aké sú pravidlá?
> Vynechám úvodné nuly v skupinách; jednu najdlhšiu súvislú postupnosť nulových
> skupín nahradím `::` – len raz v adrese.

> [!question]- Vymenuj súkromné rozsahy IPv4.
> `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.

> [!question]- Aké typy adries IPv6 poznáš?
> Global unicast (`2000::/3`), link-local (`fe80::/10`), unique local
> (`fc00::/7`), multicast (`ff00::/8`), anycast, loopback `::1`, neurčená `::`.

> [!question]- Čo vyjadruje prefix a maska?
> Počet bitov sieťovej časti adresy. `/24` = 24 jednotiek = `255.255.255.0`.

> [!question]- Ako vznikne identifikátor rozhrania metódou EUI-64?
> MAC sa rozdelí, do stredu sa vloží `FFFE` a preklopí sa 7. bit prvého bajtu.

> [!question]- Koľko použiteľných hostí má podsieť /26?
> `2⁶ − 2 = 62`.
