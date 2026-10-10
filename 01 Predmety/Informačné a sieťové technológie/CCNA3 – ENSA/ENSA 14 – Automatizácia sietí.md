---
title: "ENSA 14 – Automatizácia sietí"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 14
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 14: Network Automation"
tags:
  - ist
  - siete
  - ccna3
  - automatizácia
  - api
  - programovanie
---

# ENSA 14 – Automatizácia sietí (Network Automation)

> [!abstract] Ciele modulu
> Čo je automatizácia · dátové formáty JSON, YAML, XML · API · REST · nástroje na správu konfigurácie (Ansible, Chef, Puppet, SaltStack) · IBN a Cisco DNA Center.
> Prepája siete s programovaním – hodí sa k [[T21 – Jednoduché a zložené údajové typy]], [[T23 – Súbory – zápis a čítanie]] (serializácia) a [[T24 – Objektovo orientované programovanie]].

## 1. Automatizácia

- **Automatizácia** = proces, ktorý beží sám a znižuje/odstraňuje potrebu ľudského zásahu.
- **Smart device** – koná na základe vonkajšej informácie (GPS prepočíta trasu podľa zápch, chladnička objedná mlieko, termostat podľa rutiny, roboti v nebezpečnom prostredí).
- **Nie je** automatizácia: ručné ovládanie diaľkovým ovládačom, platba cez internet banking.
- V sieťach: menej chýb, rýchlejšie nasadenie, konzistentné konfigurácie, škálovanie na tisíce zariadení.

## 2. Dátové formáty

- Spôsob ukladania a výmeny štruktúrovaných dát. **HTML** = zobrazovanie webových stránok (štandardná štruktúra dokumentu); pre automatizáciu sa používa **JSON, XML, YAML**.
- **Key/value pár** – kľúč popisuje dáta, hodnota sú samotné dáta.

### JSON (JavaScript Object Notation)

- Ľahko čitateľný, **kľúče v úvodzovkách**, páry oddelené **čiarkou**, objekty `{ }`, polia `[ ]`.
- **Biele znaky (whitespace) nie sú významné.**

```json
{
  "interface": {
    "name": "GigabitEthernet1",
    "enabled": true,
    "ipv4": { "address": "192.168.1.1", "netmask": "255.255.255.0" }
  }
}
```

### YAML (YAML Ain't Markup Language)

- **Minimalistický**, najľahšie čitateľný, **nadmnožina JSON**; **odsadenie je významné**, polia cez `-`.

```yaml
interface:
  name: GigabitEthernet1
  enabled: true
  ipv4:
    address: 192.168.1.1
    netmask: 255.255.255.0
```

### XML (eXtensible Markup Language)

- **Samopopisný** – vlastné tagy `<tag>dáta</tag>`; (HTML má pevne danú štruktúru).

```xml
<interface>
  <name>GigabitEthernet1</name>
  <enabled>true</enabled>
</interface>
```

## 3. API (Application Programming Interface)

- **API** = súbor pravidiel, ako jedna aplikácia komunikuje s inou (a inštrukcie na to). Prirovnanie: čašník medzi zákazníkom a kuchyňou.
- Typy podľa dostupnosti:
  - **Open / Public API** – verejné (napr. Cisco pre študentské laby, mapy),
  - **Internal / Private API** – len v rámci organizácie,
  - **Partner API** – medzi firmou a jej partnermi (Google ↔ Cisco, cestovka ↔ hotelový reťazec).
- **Webové API:**

| | SOAP | REST | XML-RPC | JSON-RPC |
| --- | --- | --- | --- | --- |
| Formát | XML | **JSON, XML, YAML…** | XML | JSON |
| Rok | 1998 | 2000 | 1998 | 2005 |
| Silná stránka | zavedený | **flexibilný, najpoužívanejší** | jednoduchosť | jednoduchosť |

## 4. REST

- **REST (Representational State Transfer)** – API cez **HTTP**; spĺňajúce obmedzenia REST = **RESTful**.
- Obmedzenia: **client-server**, **stateless** (bezstavové), **cacheable**, jednotné rozhranie, vrstvený systém.
- **CRUD ↔ HTTP metódy:**

| HTTP | Operácia |
| --- | --- |
| **POST** | Create |
| **GET** | Read |
| **PUT / PATCH** | Update |
| **DELETE** | Delete |

- **URI** (identifikátor) má 2 špecializácie: **URL** (lokátor – s protokolom, `https://…`) a **URN** (meno, bez protokolu). Fragment `#…` → je to URI.
- Časti RESTful požiadavky: **API server**, **resources** (cesta), **query** (`?` – formát, **kľúč**, parametre).

```text
http://www.mapquestapi.com/directions/v2/route?outFormat=json&key=KEY&from=San+Jose,Ca&to=Monterey,Ca
       └──── API server ────┘└─ resources ──┘└──────────────── query ────────────────┘
```

- **API kľúč** – na **autentifikáciu** žiadateľa a **sledovanie používania** (limity, štatistiky).
- Odpoveď je typicky v **JSON**.

## 5. Nástroje na správu konfigurácie

- Pojmy: **automatizácia** = programové vykonanie úlohy (nastaviť rozhranie, VLAN); **orchestrácia** = usporiadanie automatizovaných úloh do workflow (poradie, závislosti) – riadené zmeny konfigurácie.
- Tradične: CLI, SNMP – **API a SNMP sa typicky nepoužívajú ako konfiguračné nástroje** (v zmysle tohto modulu).

| | **Ansible** | **Chef** | **Puppet** | **SaltStack** |
| --- | --- | --- | --- | --- |
| Jazyk | **Python + YAML** | Ruby | Ruby | **Python** |
| Agent | **agentless** | agent-based | oboje | oboje |
| Riadenie | ktorékoľvek zariadenie môže byť controller | Chef Master | Puppet Master | Salt Master |
| Výtvor | **Playbook** | **Cookbook** | **Manifest** | **Pillar** |

- **Agentless** = controller **posiela (push)** konfiguráciu na zariadenie (napr. cez SSH), netreba inštalovať agenta.

## 6. IBN a Cisco DNA Center

- **IBN (Intent-Based Networking)** – nadstavba nad SDN, softvérovo riadený, plne automatizovaný návrh a prevádzka siete podľa **obchodného zámeru (intent)**.
- 3 funkcie IBN:
  - **Translation** – správca vyjadrí očakávané správanie (zámer),
  - **Activation** – zámer sa automaticky nasadí do fyzickej aj virtuálnej infraštruktúry,
  - **Assurance** – priebežne overuje, či sieť zámer spĺňa.
- **Underlay** = fyzická topológia (hardvér); **overlay** = logická topológia (virtuálne prepojenie, tunely); **fabric** = overlay nad infraštruktúrou. *(Overlay – nie underlay – zmenšuje počet zariadení, ktoré treba programovať.)*
- **Cisco DNA (Digital Network Architecture)** – implementácia IBN; **Cisco DNA Center** = kontrolér a analytická platforma (provisioning, konfigurácia, assurance, analytika, automatizácia) s jedným dashboardom.
- Riešenia Cisco DNA: **SD-Access** (jednotná fabric pre LAN a WLAN, segmentácia), **SD-WAN** (centrálna správa WAN z cloudu), **DNA Assurance** (analytika, strojové učenie, root cause), **DNA Security** (sieť ako senzor, viditeľnosť aj v šifrovanej prevádzke).

## Krátka ústna odpoveď

Automatizácia siete znižuje potrebu ručných zásahov a chyby pri konfigurácii. Dáta sa vymieňajú vo formátoch JSON (kľúče v úvodzovkách, páry oddelené čiarkou), YAML (minimalistický, odsadenie je významné) a XML (samopopisné tagy). Aplikácie komunikujú cez API – verejné, interné alebo partnerské; najrozšírenejšie je REST, ktoré cez HTTP metódy POST, GET, PUT/PATCH a DELETE realizuje operácie CRUD, je bezstavové a typicky vracia JSON. Na správu konfigurácie sa používajú Ansible (Python, YAML, agentless, playbook), Chef (cookbook), Puppet (manifest) a SaltStack (pillar). Intent-based networking (Cisco DNA Center) prekladá obchodný zámer na konfiguráciu – translation, activation, assurance.

## Kvíz – kľúčové otázky z kurzu

- JSON → **dátový formát na ukladanie a prenos dát**; kľúč → **v úvodzovkách**; oddeľovač párov → **čiarka**; whitespace v JSON významný? → **nie**.
- Minimalistický, nadmnožina JSON → **YAML**; `<tag>dáta</tag>` → **XML**; zobrazovanie web stránok → **HTML**.
- Rozdiel XML a HTML → **XML je samopopisné, HTML má štandardnú štruktúru dokumentu**.
- API medzi Google a Cisco → **partner**; Cisco laby pre študentov → **public**; len vnútri Cisco → **internal**; cestovka ↔ hotely → **partner**.
- Viac formátov (JSON, XML, YAML), najpoužívanejšie → **REST**.
- RESTful vlastnosti → **stateless, cacheable, client-server**.
- `directions/v2/route` → **resources**; query obsahuje → **key, format, parameters**.
- Prečo API kľúč → **autentifikácia žiadateľa, info o používateľoch**.
- Riadené zmeny konfigurácie → **orchestrácia**; programové vykonanie úlohy → **automatizácia**.
- Ansible → **playbook**; Chef → **cookbook**; Python → **Ansible, SaltStack**; agentless → **push z controllera**.
- IBN: vyjadrenie zámeru → **translation**; nasadenie → **activation**; overovanie → **assurance**.

Predchádzajúci: [[ENSA 13 – Virtualizácia sietí]] · Späť: [[CCNA3 – ENSA]] · Príkazy: [[ENSA – Ťahák príkazov]]
