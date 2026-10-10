---
title: "ENSA 09 – Koncepty QoS"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 9
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 9: QoS Concepts"
tags:
  - ist
  - siete
  - ccna3
  - qos
---

# ENSA 09 – Koncepty QoS (Quality of Service)

> [!abstract] Ciele modulu
> Kvalita prenosu · požiadavky hlasu, videa a dát · algoritmy front (queuing) · QoS modely · techniky implementácie QoS.

## 1. Kvalita prenosu

- **Preťaženie (congestion)** vzniká, keď sa viac liniek zbieha na jedno zariadenie a dáta odchádzajú menším počtom/pomalšími rozhraniami, alebo keď **požiadavka na šírku pásma prevýši dostupnú**.
- Bez QoS sa pakety spracúvajú v poradí príchodu (FIFO) a pri preťažení sa zahadzujú – aj hlas a video.
- Plná fronta → **nové pakety sa zahodia (tail drop)**.
- **Šírka pásma (bandwidth)** – koľko bitov za sekundu.
- **Latencia / delay** – čas od zdroja k cieľu (ping meria **RTT**).
- **Jitter** – **kolísanie oneskorenia** prijatých paketov. Kompenzuje ho **playout delay (de-jitter) buffer**.
- **Packet loss** – strata paketov (pri preťažení).

### Typy oneskorenia

| Oneskorenie | Fixné/premenné | Čo to je |
| --- | --- | --- |
| Code delay | fixné | kompresia dát pri zdroji |
| Packetization delay | fixné | zapuzdrenie do paketu |
| **Queuing delay** | premenné | čakanie vo fronte |
| **Serialization delay** | fixné | vyslanie rámca na médium (z NIC na drôt) |
| **Propagation delay** | premenné | cesta medzi zdrojom a cieľom |
| De-jitter delay | fixné | bufferovanie a rovnomerné posielanie |

## 2. Charakteristika prevádzky

| | Hlas | Video | Dáta |
| --- | --- | --- | --- |
| Charakter | **plynulý (smooth), benígny** | **nárazový (bursty), „hladný“ (greedy)** | plynulý/nárazový |
| Citlivosť | na straty aj oneskorenie | na straty aj oneskorenie | necitlivé (TCP retransmisie) |
| Protokol | **UDP s prioritou** | UDP s prioritou | TCP |
| Latencia | **≤ 150 ms** | ≤ 200 – 400 ms | – |
| Jitter | **≤ 30 ms** | ≤ 30 – 50 ms | – |
| Strata | **≤ 1 %** | ≤ 0,1 – 1 % | – |
| Šírka pásma | **30 – 128 kb/s** | **384 kb/s – 20+ Mb/s** | najviac kapacity siete |

- Hlas sa pri strate **nedá retransmitovať** a spotrebuje málo zdrojov.
- Dáta: dôležité, či ide o **interaktívnu** aplikáciu a či je **mission-critical**; kvalita z pohľadu používateľa = **QoE (Quality of Experience)**.

## 3. Algoritmy front (queuing)

QoS politika sa aktivuje **až pri preťažení** linky.

| Algoritmus | Princíp |
| --- | --- |
| **FIFO** | prvý dnu, prvý von; bez priorít; vhodný pre rýchle linky bez preťaženia |
| **WFQ** (Weighted Fair Queuing) | automaticky delí prevádzku na **toky (flows)** podľa hlavičiek (IP, MAC, porty, protokol, ToS); váhy; interaktívne toky dopredu |
| **CBWFQ** (Class-Based WFQ) | **používateľom definované triedy** (podľa protokolov, ACL, vstupného rozhrania), každej garantovaná šírka pásma |
| **LLQ** (Low Latency Queuing) | CBWFQ + **striktná prioritná fronta (PQ)** → **hlas** ide vždy prvý |

## 4. QoS modely

| Model | Popis | + | − |
| --- | --- | --- | --- |
| **Best-effort** | žiadne QoS, všetky pakety rovnako | **najškálovateľnejší**, nič netreba | žiadne záruky, žiadna priorita |
| **IntServ** (Integrated Services) | aplikácia si cez signalizáciu (**RSVP**) **rezervuje** zdroje end-to-end; ak cesta nevie zaručiť QoS, dáta sa nepošlú | **najvyššia záruka**, admission control per-request | **náročný na zdroje**, neškáluje |
| **DiffServ** (Differentiated Services) | prevádzka sa rozdelí do **tried**, každá trieda iná úroveň služby na každom skoku | **vysoko škálovateľný**, veľa úrovní | bez absolútnej záruky, zložité mechanizmy |

## 5. Techniky implementácie QoS

### 3 kategórie nástrojov

1. **Klasifikácia a značkovanie (classification & marking)** – zistiť triedu prevádzky a označiť paket.
2. **Vyhýbanie sa preťaženiu (congestion avoidance)** – **WRED** (Weighted Random Early Detection) – náhodne zahadzuje TCP pakety skôr, než sa fronta zaplní → TCP spomalí.
3. **Riadenie preťaženia (congestion management)** – fronty (CBWFQ, LLQ).

- **Shaping** – nadbytočné pakety **podrží vo fronte** a pošle neskôr (výstup).
- **Policing** – prekročenie maximálnej rýchlosti → **zahodí / premarkuje** (vstup aj výstup).

### Klasifikácia

- Podľa rozhraní, ACL, class-map (L2/L3); L4 – L7 pomocou **NBAR** (Network Based Application Recognition).

### Značkovanie

| Technológia | Vrstva | Pole | Bity |
| --- | --- | --- | --- |
| Ethernet 802.1Q/802.1p | L2 | **CoS** | 3 |
| 802.11 Wi-Fi | L2 | TID | 3 |
| MPLS | L2 | EXP | 3 |
| IPv4/IPv6 | L3 | IP Precedence | 3 |
| IPv4/IPv6 | L3 | **DSCP** | **6** (64 tried) |

- CoS hodnoty: **0** best effort, 3 signalizácia hovoru, 4 videokonferencia, **5 hlas**, 6–7 rezervované.
- **DSCP** je v poli **ToS (IPv4)** / **Traffic Class (IPv6)**. Kategórie: **BE** (best effort, 0), **EF** (Expedited Forwarding, 46 – hlas), **AF** (Assured Forwarding, AFxy), **CS** (Class Selector – prvé 3 bity).
- **Trust boundary** – prevádzku značkuj **čo najbližšie k zdroju**; dôveryhodné koncové zariadenie = napr. **IP telefón**.

## Krátka ústna odpoveď

QoS zabezpečuje, aby dôležitá prevádzka (hlas, video) dostala prednosť pri preťažení siete. Kvalitu ovplyvňuje šírka pásma, oneskorenie, jitter (kolísanie oneskorenia) a strata paketov; hlas potrebuje latenciu do 150 ms, jitter do 30 ms a stratu do 1 %. Fronty: FIFO, WFQ, CBWFQ (vlastné triedy) a LLQ (striktná priorita pre hlas). Modely: best-effort (bez QoS), IntServ (rezervácia zdrojov, neškáluje) a DiffServ (triedy, škálovateľný). Nástroje: klasifikácia a značkovanie (CoS na L2, DSCP na L3), congestion avoidance (WRED) a congestion management (fronty), plus shaping a policing.

## Kvíz – kľúčové otázky z kurzu

- Kolísanie oneskorenia → **jitter**; čas tam a späť pri pingu → **latencia**.
- Premenný čas cesty medzi zdrojom a cieľom → **propagation delay**; vyslanie rámca z NIC na drôt → **serialization delay**.
- Kedy vzniká preťaženie → **dopyt po šírke pásma > dostupná**; plná fronta → **nové pakety sa zahodia**.
- Najväčšiu časť kapacity spotrebúvajú → **dáta**; min. 384 kb/s, nárazové → **video**; plynulá, nedá sa retransmitovať → **hlas**.
- Používateľské triedy → **CBWFQ**; hlas pred ostatnými → **LLQ**; toky podľa hlavičiek → **WFQ**; veľké linky bez preťaženia → **FIFO**.
- Per-request admission control, najvyššia záruka, náročný → **IntServ**; najškálovateľnejší s mnohými úrovňami → **DiffServ**; bez klasifikácie → **best-effort**.
- Pridanie hodnoty do hlavičky → **marking**; zahodenie nad limit → **policing**; podržanie a neskoršie odoslanie → **shaping**; TCP spomalí pred zaplnením → **WRED**.
- Trusted endpoint → **IP telefón**; do PQ pri LLQ → **hlas**.
- Kompenzácia jitteru → **playout delay buffer**.

Predchádzajúci: [[ENSA 08 – VPN a IPsec]] · Ďalej: [[ENSA 10 – Správa siete]] · Späť: [[CCNA3 – ENSA]]
