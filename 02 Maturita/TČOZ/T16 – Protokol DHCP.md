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

## Krátka ústna odpoveď

DHCP prideľuje adresu, masku, bránu, DNS a prenájom. Pri IPv4 prebieha DORA: Discover, Offer, Request, Acknowledge; server používa pool, výnimky, rezervácie a relay. DNS prekladá mená na adresy pomocou záznamov A, AAAA, CNAME a MX. DHCPv6 pracuje bez broadcastu a dopĺňa SLAAC. V OOP modifikátory `public`, `private`, `protected` a podľa jazyka `internal` riadia viditeľnosť členov.
