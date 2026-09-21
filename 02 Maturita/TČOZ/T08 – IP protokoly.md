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

## Krátka ústna odpoveď

IPv6 má 128-bitovú adresu a používa prefix, napríklad `/64`; prefix určuje sieťovú časť. IPv4 má 32 bitov a maska `/24` je `255.255.255.0`. IPv4 adresy delíme na unicast, broadcast, multicast a smerovaním realizovaný anycast, pričom existujú aj verejné, súkromné, loopback a link-local adresy. IPv6 používa unicast, multicast a anycast, ale nemá broadcast; pri konfigurácii treba správne určiť prefix a bránu.

IPv6 má 128 bitov, zapisuje sa hexadecimálne a používa prefixy. `::` smie v adrese nahradiť iba jednu súvislú skupinu núl. Typy adries: globálna unicast, link-local `fe80::/10`, unique-local `fc00::/7`, multicast `ff00::/8` a anycast. IPv6 nemá broadcast.
