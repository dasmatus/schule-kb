---
title: "ENSA 08 – VPN a IPsec"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 8
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 8: VPN and IPsec Concepts"
tags:
  - ist
  - siete
  - ccna3
  - vpn
  - ipsec
  - bezpečnosť
---

# ENSA 08 – VPN a IPsec

> [!abstract] Ciele modulu
> Výhody VPN · typy VPN · rámec IPsec.
> Nadväzuje na kryptografiu z [[ENSA 03 – Koncepty sieťovej bezpečnosti]]; k maturite [[T07 – Kybernetická bezpečnosť]] a [[T09 – Siete LAN, WAN, VLAN]].

## 1. Čo je VPN

- **Virtual** – prenáša súkromné dáta, ale fyzicky cez verejnú sieť (internet).
- **Private** – prevádzka je **šifrovaná** → dôvernosť.
- **Nie každá VPN šifruje** (napr. GRE sama osebe nie).
- Výhody:

| Výhoda | Popis |
| --- | --- |
| **Cost savings** | lacnejšie než prenajaté linky, vyššia šírka pásma pre vzdialené miesta |
| **Security** | pokročilé šifrovanie a autentifikácia |
| **Scalability** | ľahko pridať nových používateľov cez internet bez novej infraštruktúry |
| **Compatibility** | funguje cez všetky broadband technológie |

## 2. Typy VPN

### Site-to-site vs. remote access

- **Site-to-site** – spája celé siete (pobočka ↔ centrála). Koncové zariadenia posielajú bežnú nešifrovanú prevádzku, šifruje **VPN gateway** (router, firewall – napr. ASA). **Pre používateľov transparentná.**
- **Remote access** – jednotlivý používateľ (teleworker, mobil) ↔ firemná sieť. Môže vyžadovať **VPN klienta** (napr. Cisco AnyConnect) alebo stačí prehliadač.

### Enterprise vs. service provider VPN

- **Enterprise (spravuje firma):** site-to-site a remote access cez **IPsec**, **SSL VPN**, **GRE over IPsec**, **DMVPN**, **IPsec VTI**.
- **Service provider (spravuje poskytovateľ):** **MPLS VPN** – **Layer 3 MPLS VPN** a **Layer 2 MPLS VPN (VPLS** – emuluje multiaccess Ethernet LAN medzi pobočkami).

### SSL VPN vs. IPsec (remote access)

| Vlastnosť | IPsec | SSL (TLS) |
| --- | --- | --- |
| Aplikácie | všetky IP aplikácie | len webové aplikácie a zdieľanie súborov |
| Autentifikácia | silná, obojsmerná (PSK, certifikáty) | stredná, jedno- aj obojsmerná |
| Šifrovanie | silné, 56 – 256 bit | stredné až silné, 40 – 256 bit |
| Zložitosť pripojenia | stredná – **treba VPN klienta** | nízka – **stačí webový prehliadač (clientless)** |
| Kto sa pripojí | len konkrétne nakonfigurované zariadenia | ktokoľvek s prehliadačom |

- SSL VPN v skutočnosti používa **TLS** a PKI s certifikátmi. **Clientless VPN** = cez prehliadač a HTTPS.

### Ďalšie typy

- **GRE (Generic Routing Encapsulation)** – **nezabezpečený** site-to-site tunel; vie prenášať multicast a routing protokoly (OSPF). V terminológii je GRE **carrier (nosný) protokol**, IPsec **transport** protokol, pôvodný paket **passenger**. Preto **GRE over IPsec**.
- **DMVPN (Dynamic Multipoint VPN)** – Cisco riešenie na **ľahké škálovanie** mnohých VPN; hub-and-spoke + dynamické **spoke-to-spoke** tunely (mGRE, NHRP, IPsec).
- **IPsec VTI** – IPsec na **virtuálnom rozhraní** namiesto fyzického; podporuje unicast aj multicast.

## 3. IPsec

- IETF štandard, ktorý chráni a autentifikuje IP pakety; chráni prevádzku **od L4 po L7**.
- Je to **rámec (framework)** – algoritmy sa dajú vymeniť bez zmeny štandardu.
- **5 stavebných blokov IPsec:**

| Blok | Možnosti |
| --- | --- |
| **IPsec protokol (zapuzdrenie)** | **AH** (autentifikácia + integrita, **bez šifrovania**) alebo **ESP** (šifrovanie + autentifikácia + integrita); AH+ESP zriedka – neprejde cez NAT |
| **Confidentiality (dôvernosť)** | DES, **3DES**, **AES**, **SEAL** (alebo bez šifrovania) |
| **Integrity (integrita)** | hash: **MD5**, **SHA** (cez **HMAC**) |
| **Authentication (autentifikácia)** | **IKE** – **PSK** (pre-shared key) alebo **RSA** (digitálne certifikáty) |
| **Diffie-Hellman** | výmena tajného kľúča; skupiny DH14, 15, 16, 19, 20, 21, 24; **DH 1, 2, 5 sa už neodporúčajú** |

- **Dĺžka kľúča:** čím dlhší kľúč, tým viac možností → ťažšie prelomenie hrubou silou.
- **PSK** – kľúč zadaný ručne na oboch stranách. **RSA** – peer zahashuje dáta, zašifruje ich svojím **súkromným kľúčom** (= podpis), druhá strana overí verejným kľúčom.

## Krátka ústna odpoveď

VPN vytvára súkromné, zvyčajne šifrované spojenie cez verejnú sieť; výhody sú nižšia cena, bezpečnosť, škálovateľnosť a kompatibilita. Site-to-site VPN spája celé siete cez VPN gateway a je pre používateľov transparentná, remote access VPN pripája jednotlivca – cez IPsec klienta alebo cez prehliadač (SSL/TLS). Ďalej existujú GRE (nešifrovaný tunel), DMVPN, IPsec VTI a VPN spravované poskytovateľom (MPLS L2/L3). IPsec je rámec s piatimi blokmi: protokol AH/ESP, dôvernosť (AES, 3DES), integrita (SHA, MD5 cez HMAC), autentifikácia (PSK, RSA) a Diffie-Hellman na výmenu kľúčov.

## Kvíz – kľúčové otázky z kurzu

- Ľahko pridať používateľov → **scalability**; viac šírky pásma bez nových liniek → **cost savings**.
- VPN pre mobilného používateľa → **remote access**; môže vyžadovať VPN klienta → **remote access**; transparentná pre používateľa → **site-to-site**.
- VPN cez prehliadač a HTTPS → **clientless (SSL) VPN**.
- GRE je → **carrier protokol** (nezabezpečený).
- Rýchle škálovanie → **DMVPN**; tunely DMVPN → **hub-to-spoke a spoke-to-spoke**.
- Emulácia Ethernet LAN medzi pobočkami → **(L2) MPLS VPN**; VPN spravovaná poskytovateľom → **Layer 3 MPLS VPN**.
- IPsec chráni vrstvy → **L4 – L7**.
- Integrita bez dôvernosti → **AH**; hash pre integritu → **HMAC**; 3DES v IPsec → **confidentiality**.
- Autentifikácia → **PSK, RSA**; nedoporučené DH skupiny → **1, 2, 5**.
- Súkromný prenos dát cez VPN zaručuje → **šifrovanie**.

Predchádzajúci: [[ENSA 07 – Koncepty WAN]] · Ďalej: [[ENSA 09 – Koncepty QoS]] · Späť: [[CCNA3 – ENSA]]
