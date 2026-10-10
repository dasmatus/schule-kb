---
title: "ENSA 03 – Koncepty sieťovej bezpečnosti"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 3
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 3: Network Security Concepts"
tags:
  - ist
  - siete
  - ccna3
  - bezpečnosť
  - kryptografia
---

# ENSA 03 – Koncepty sieťovej bezpečnosti

> [!abstract] Ciele modulu
> Stav kybernetickej bezpečnosti · útočníci a ich nástroje · malware · typy útokov · zraniteľnosti IP, TCP, UDP a IP služieb · best practices · kryptografia.
> Priamo pokrýva maturitnú tému [[T07 – Kybernetická bezpečnosť]].

## 1. Základné pojmy

| Pojem | Význam |
| --- | --- |
| **Asset (aktívum)** | čokoľvek hodnotné pre organizáciu – ľudia, zariadenia, zdroje, dáta |
| **Vulnerability (zraniteľnosť)** | slabina systému alebo jeho návrhu |
| **Threat (hrozba)** | potenciálne nebezpečenstvo pre aktíva, dáta, funkčnosť siete |
| **Exploit** | mechanizmus, ktorý zneužije zraniteľnosť |
| **Mitigation (zmiernenie)** | protiopatrenie, ktoré znižuje pravdepodobnosť alebo dopad hrozby |
| **Risk (riziko)** | pravdepodobnosť, že hrozba zneužije zraniteľnosť × dôsledky |

- **Attack vector** = cesta, ktorou útočník získa prístup; môže byť **zvnútra aj zvonka** siete (interné hrozby často spôsobia väčšie škody).
- **Vektory úniku dát:** e-mail/sociálne siete, nešifrované zariadenia, cloud úložiská, vymeniteľné médiá (USB), papierové kópie, slabá kontrola prístupu.

## 2. Útočníci (threat actors)

- **White hat** – etickí hackeri, penetračné testy, zraniteľnosti nahlásia.
- **Gray hat** – porušia pravidlá, ale nie pre osobný zisk; zraniteľnosť môžu zverejniť/nahlásiť po prieniku.
- **Black hat** – zločinci, osobný zisk alebo škodenie.
- Ďalej: **script kiddies** (neskúsení, cudzie nástroje), **vulnerability brokers** (gray hat, hľadajú exploity za odmenu), **hacktivisti** (gray hat, politický protest), **kyberzločinci** (black hat, podzemná ekonomika), **štátom podporovaní** (zero-day exploity, špionáž, sabotáž).
- **Zero-day** = zraniteľnosť, o ktorej výrobca ešte nevie / nemá opravu.

## 3. Nástroje útočníkov / penetračného testovania

| Kategória | Príklady |
| --- | --- |
| Password crackers | John the Ripper, Ophcrack, THC Hydra, RainbowCrack |
| Wireless hacking | Aircrack-ng, Kismet, InSSIDer |
| Network scanning | **Nmap**, SuperScan, Angry IP Scanner |
| Packet crafting (test firewallu) | Hping, Scapy, Netcat, Yersinia |
| Packet sniffers | **Wireshark**, Tcpdump, Ettercap |
| Rootkit detectors | AIDE, Netfilter |
| Fuzzers | Skipfish, Wapiti, W3af |
| Forensic tools | Sleuth Kit, Helix, Maltego, Encase |
| Debuggers (reverse engineering) | GDB, WinDbg, IDA Pro |
| Hacking OS | **Kali Linux**, Knoppix, BackBox |
| Encryption tools | VeraCrypt, OpenSSL, OpenVPN, Tor |
| Vulnerability exploitation | **Metasploit**, Sqlmap, Social Engineer Toolkit |
| Vulnerability scanners | Nessus, OpenVAS, Nipper |

Typy útokov: odpočúvanie (eavesdropping/sniffing), modifikácia dát, IP spoofing, útoky na heslá, DoS, MitM, compromised-key, sniffer.

## 4. Malware

- **Vírus** – potrebuje hostiteľský program, **spustí ho udalosť/akcia používateľa**; typy: boot sector, firmware, makro, program, script.
- **Červ (worm)** – **sám sa šíri** sieťou zneužitím zraniteľností, bez akcie používateľa; spomaľuje sieť.
- **Trójsky kôň** – **nereplikuje sa**, tvári sa ako legitímny softvér; typy: remote-access, data-sending, destructive, proxy, FTP, security software disabler, DoS, keylogger.
- **Adware** (vyskakovacie reklamy), **Ransomware** (zašifruje súbory, žiada výkupné), **Rootkit** (administrátorský prístup, ťažko odhaliteľný, backdoor), **Spyware** (zbiera info bez súhlasu).

## 5. Bežné sieťové útoky – 3 kategórie

1. **Reconnaissance (prieskum)** – mapovanie siete: info query (whois, Google) → **ping sweep** → **port scan** → vulnerability scanner → exploitation tools.
2. **Access (prístupové)** – útoky na heslá (brute force, dictionary), **spoofing** (IP, MAC, DHCP), trust exploitation, port redirection, **MitM**, **buffer overflow** (zapisovanie viac dát, než pamäť unesie).
3. **DoS / DDoS** – prerušenie služby; DDoS z **botnetu** zombie počítačov.

### Sociálne inžinierstvo (access útok)

pretexting, **phishing**, **spear phishing** (cielený), spam, quid pro quo (niečo za niečo), **baiting** (infikovaný USB kľúč), impersonation, **tailgating** (prekĺznutie za oprávnenou osobou), shoulder surfing, dumpster diving.

## 6. Zraniteľnosti IP

- **ICMP útoky** – echo request/reply (host discovery, DoS), unreachable (prieskum), mask reply (mapovanie siete), **redirect** (MitM), router discovery (falošné trasy).
- **Amplification & reflection** – DoS/DDoS, útočník spoofne IP obete, odpovede zahltia obeť.
- **Address spoofing** – blind / non-blind.
- **MitM** a **session hijacking**.

## 7. Zraniteľnosti TCP a UDP

- **TCP SYN flood** – zneužíva **3-way handshake**, polootvorené spojenia zahltia server.
- **TCP reset attack** – podvrhnutý segment s **RST** ukončí spojenie.
- **TCP session hijacking** – spoof IP + uhádnuté sekvenčné číslo.
- **UDP flood** – záplava UDP z falošného zdroja, server odpovedá ICMP port unreachable (UDP nemá šifrovanie ani kontrolu spojenia).

## 8. Zraniteľnosti IP služieb

- **ARP** – každý môže poslať **gratuitous ARP** → **ARP cache poisoning** → MitM.
- **DNS** – open resolver útoky (**cache poisoning**, amplification & reflection, resource utilization), stealth (**Fast Flux**, Double IP Flux, Domain Generation Algorithms), **domain shadowing** (kompromitovaná rodičovská doména → veľa subdomén), **DNS tunneling** (riešenie: filter, ktorý kontroluje DNS prevádzku).
- **DHCP spoofing** – podvrhnutý (rogue) DHCP server rozdáva falošnú bránu/DNS.

## 9. Best practices – obrana

- **CIA triáda**: **Confidentiality** (dôvernosť), **Integrity** (integrita), **Availability** (dostupnosť).
- **Defense-in-depth** (vrstvená obrana) – zabezpečiť routery, switche, servery, hosty.
- Zariadenia: **VPN** (šifrované tunely), **ASA firewall** (stavový – vnútorná prevádzka môže von a späť, zvonka sa spojenie nezaháji), **IPS** (deteguje a hneď blokuje podľa signatúr), **ESA/WSA** (filtrovanie e-mailu a webu), **AAA server** (kto sa smie prihlásiť a čo smie robiť).
- **Firewall** = systém, ktorý vynucuje politiku prístupu medzi sieťami. **IDS** len deteguje (pasívne, kópia prevádzky), **IPS** deteguje aj blokuje (inline).
- **AAA** = Authentication, Authorization, Accounting.

## 10. Kryptografia

- 4 ciele bezpečnej komunikácie: **integrita dát**, **autentifikácia pôvodu**, **dôvernosť**, **nepopierateľnosť (non-repudiation)**.
- **Hash** – zaručuje integritu: **MD5** (128-bit, zastaraný), **SHA-1**, **SHA-2** (SHA-256…).
- **HMAC** = hash + tajný kľúč → integrita **aj autentifikácia**.
- **Symetrické šifrovanie** (rovnaký zdieľaný kľúč, rýchle): DES (zastaraný), **3DES** (3× DES), **AES** (128/192/256 bit, odporúčaný), SEAL (160-bit, rýchly), RC4 (stream, nepoužívať).
  - **Blokové** šifry (AES, DES) vs. **prúdové (stream)** – šifrujú po bitoch/bajtoch (RC4).
- **Asymetrické šifrovanie** (verejný + súkromný kľúč, pomalšie): **RSA**, **Diffie-Hellman** (bezpečná výmena kľúča cez nezabezpečený kanál), DSA/DSS (podpisy), ElGamal, eliptické krivky (ECC – menšie kľúče). Používa **PKI** a digitálne certifikáty.

## Krátka ústna odpoveď

Sieťová bezpečnosť chráni aktíva pred hrozbami, ktoré zneužívajú zraniteľnosti; riziko je pravdepodobnosť a dopad takéhoto zneužitia. Útočníci (white/gray/black hat) používajú nástroje ako Nmap, Wireshark či Metasploit. Malware delíme na vírusy, červy, trójske kone, ransomware, spyware, adware a rootkity. Útoky delíme na prieskumné, prístupové (heslá, spoofing, MitM, sociálne inžinierstvo) a DoS/DDoS; zneužívajú sa aj ICMP, TCP SYN flood, ARP poisoning, DNS a DHCP spoofing. Obrana stavia na CIA triáde a defense-in-depth – firewall, IPS, VPN, AAA. Kryptografia zabezpečuje integritu (hash, HMAC), dôvernosť (symetrické AES, asymetrické RSA) a výmenu kľúčov (Diffie-Hellman).

## Kvíz – kľúčové otázky z kurzu

- Veľa požiadaviek na web server z rôznych miest naraz → **DDoS**; koordinovaný útok botnetu → **DDoS**.
- Buffer overflow → **zápis viac dát, než pamäťové miesto pojme**.
- Šifrovanie dát dosahuje → **dôvernosť (confidentiality)**.
- Malware s cieľom šíriť sa sieťou → **červ**; vírus → **spúšťa ho udalosť na hostiteľovi**.
- MitM patrí medzi → **access útoky**; port scanning → **reconnaissance**; tailgating → **sociálne inžinierstvo**.
- Úloha IPS → **detekovať škodlivú prevádzku pomocou signatúr**.
- Kompromitovaná rodičovská doména + subdomény → **domain shadowing**.
- Gray hat sú typicky → **hacktivisti a vulnerability brokers**.
- Útok cez 3-way handshake → **TCP SYN flood**; RST → **TCP reset**.
- Rovnaký kľúč na šifrovanie aj dešifrovanie → **symetrické**; šifrovanie po bajtoch/bitoch → **stream cipher**.

Predchádzajúci: [[ENSA 02 – Konfigurácia OSPFv2]] · Ďalej: [[ENSA 04 – Koncepty ACL]] · Späť: [[CCNA3 – ENSA]]
