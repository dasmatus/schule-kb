---
title: "M10 – LAN Security Concepts"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 10
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, bezpečnosť, poznámky]
---

# M10 – LAN Security Concepts

> [!info] Súvisí s maturitou
> [[T07 – Kybernetická bezpečnosť]] (hrozby, AAA, typy útokov) · späť na [[CCNA2 – SRWE]]

## Ochrana koncových zariadení
Útoky: DDoS, úniky dát, malvér (často cez e-mail/web). Klasická ochrana hostiteľa: antivírus/antimalvér, hostiteľský firewall, **HIPS**.
Lepšie: **NAC** + **AMP** na hostiteľoch + **ESA** (Email Security Appliance) + **WSA** (Web Security Appliance).
- **ESA** – blokuje spam, phishing, malvér v pošte.
- **WSA** – blacklisty URL, filtrovanie a kategorizácia URL, skenovanie malvéru, kontrola webových aplikácií, šifrovanie/dešifrovanie webovej prevádzky.
Sieťové zariadenia: router s VPN, NGFW, NAC.

## Riadenie prístupu
- Lokálne heslo na vty (`password` + `login`) = najslabšie.
- Lepšie: SSH + lokálny používateľ (`username … secret …`, `login local`, `transport input ssh`, `crypto key generate rsa general-keys modulus 2048`).
- **AAA**:
  - **Authentication** – kto si (lokálne alebo serverom: **RADIUS / TACACS+**)
  - **Authorization** – čo smieš
  - **Accounting** – čo si robil (záznam)
- **802.1X** – autentifikácia na úrovni portu:
  - **supplicant** (klient) → **authenticator** (switch) → **authentication server** (RADIUS)

## L2 = najslabší článok
Ak je kompromitovaná L2, sú kompromitované aj všetky vrstvy nad ňou.

| Kategória útoku | Príklady | Ochrana |
|---|---|---|
| MAC tabuľka | MAC flooding | **Port security** |
| VLAN | VLAN hopping, double tagging | nastavenie trunkov (vypnúť DTP, native VLAN) |
| DHCP | starvation, spoofing | **DHCP snooping** |
| ARP | ARP spoofing / poisoning | **DAI** (Dynamic ARP Inspection) |
| Spoofing adries | MAC/IP spoofing | **IPSG** (IP Source Guard) |
| STP | falošný root bridge | **BPDU Guard**, root guard |

Zabezpečiť treba aj manažment: SSH, SCP, SFTP, SSL/TLS, SNMPv3, samostatná manažment VLAN/sieť, ACL.

## Útoky
- **MAC flooding** – útočník (nástroj **macof**) zaplaví switch falošnými zdrojovými MAC → MAC tabuľka **sa zaplní** → switch posiela všetko ako unknown unicast všade → útočník vidí prevádzku (len vo svojej VLAN).
- **VLAN hopping** – útočník sa tvári ako switch (DTP) → vytvorí trunk → dostane sa do všetkých VLAN.
- **Double tagging** – dva 802.1Q tagy; prvý (= **native VLAN**) odstráni prvý switch, druhý dopraví rámec do cieľovej VLAN. **Funguje len jedným smerom**; útočník musí byť v native VLAN trunku.
  - Prevencia: DTP vypnúť / trunky ručne, žiadny trunking na access portoch, native VLAN ≠ používateľská VLAN a len na trunkoch.
- **DHCP starvation** – vyčerpanie poolu (napr. **Gobbler**) → DoS.
- **DHCP spoofing** – podvrhnutý DHCP server rozdáva zlú bránu/DNS → MITM.
- **ARP spoofing/poisoning** – gratuitous ARP „ja som brána“ → MITM.
- **Spoofing adries** – prevzatie cudzej IP/MAC.
- **Útok na STP** – útočník ohlási nižšiu prioritu → stane sa rootom → prevádzka ide cez neho.
- **CDP prieskum** – CDP sa posiela periodicky a **nešifrovane**: IP, verzia IOS, platforma, native VLAN. Kde netreba, vypnúť: `no cdp run` (globálne), `no cdp enable` (rozhranie). Podobne LLDP: `no lldp run`, `no lldp transmit` / `no lldp receive`.
