---
title: "Kybernetická bezpečnosť – SOC a kariéra"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/pdf/2 Bojovníci vo vojne proti počítačovej kriminalite.pdf"
tags:
  - ist
  - tcoz
  - kybernetická-bezpečnosť
  - poznámky
---

# Kybernetická bezpečnosť – SOC a kariéra

> [!info] Zdrojový dokument
> `2 Bojovníci vo vojne proti počítačovej kriminalite.pdf` — NetAcad,
> modul *Bojovníci vo vojne proti počítačovej kriminalite* (CyberOps).
> Rozširuje [[T07 – Kybernetická bezpečnosť]] o SOC a kariéru v
> kybernetickej bezpečnosti.

## 1. Moderné SOC

**SOC** (*Security Operations Center*) je formalizovaný, štruktúrovaný a
disciplinovaný prístup k obrane. Hlavné prvky: **ľudia, procesy a
technológie**. SOC môže byť interný alebo outsourcovaný (managed).

### Roly v SOC

- **Tier 1 – Analytik výstrah** (Cybersecurity Analyst / CyberOps
  Associate): monitoruje front výstrah, overuje, či ide o skutočný
  incident, otvára lístky, základné zmierňovanie.
- **Tier 2 – Respondent na incidenty**: dôkladné vyšetrovanie, náprava.
- **Tier 3 – Lovec hrozieb (Threat Hunter)**: expert na sieť, endpoint,
  spravodajstvo o hrozbách, reverzné inžinierstvo malvéru; hľadá
  skryté hrozby.
- **Manažér SOC**: spravuje zdroje, kontaktný bod pre organizáciu.

### Proces v SOC

Analytik začína monitorovaním frontu výstrah (ticketing). Overí, či
výstraha predstavuje skutočný incident; ak nie, zruší ju ako falošný
poplach. Nevyriešený ticket postúpi Tier 2, prípadne Tier 3.

### Technológie

- **SIEM** — zber a filtrovanie údajov, detekcia a klasifikácia hrozieb,
  analýza a vyšetrovanie, správa denníkov, hodnotenie zraniteľností,
  spravodajstvo o hrozbách.
- **SOAR** — podobný SIEM, ale ide o krok ďalej: integruje
  spravodajstvo o hrozbách a **automatizuje** pracovné postupy
  vyšetrovania a reakcie na základe príručiek (playbookov).
- Systémy SIEM produkujú viac výstrah, než tímy zvládnu; SOAR ich
  spracuje automaticky.

### Metriky SOC (KPI)

- **Doba zotrvania** — ako dlho majú útočníci prístup, kým sú zistení.
- **MTTD** — stredný čas do detekcie.
- **MTTR** — stredný čas odozvy (zastavenie a náprava).
- **MTTC** — stredný čas do zadržania (aby incident nespôsobil
  ďalšie škody).
- **Čas kontroly** — zastavenie šírenia malvéru.

### Dostupnosť vs. bezpečnosť

Sieť musí byť dostupná („päť deviatok“ = 99,999 % = max. 5,26 min
výpadku ročne). Bezpečnosť nemôže byť taká silná, aby zasahovala do
práce zamestnancov a obchodných funkcií — vždy je to kompromis.

## 2. Stať sa obrancom

### Certifikácie

- **Cisco Certified CyberOps Associate**
- **CompTIA CySA+**
- **(ISC)²** (CISSP a ďalšie)
- **GIAC** (Global Information Assurance Certification)
- ďalšie podľa dodávateľov

### Vzdelanie a zručnosti

- Technický alebo bakalársky stupeň v informatike, elektrotechnike, IT
  alebo informačnej bezpečnosti.
- **Python** — open source, objektovo orientovaný, populárny u analytikov.
- **Linux** — široko používaný v SOC a sieťových prostrediach.

### Získavanie skúseností

- Pracovné portály: Indeed, CareerBuilder, USAJobs, Glassdoor, LinkedIn.
- **Stáže** (môžu prerásť do práce na plný úväzok).
- Štipendiá a ocenenia (Cisco, INFOSEC).
- Dočasné agentúry — prvý krok pri hľadaní práce.
- Prvá práca: pozícia podobná Tier 1 analytikovi; očakáva sa aspoň
  **18 mesiacov** v prvej práci (úplný cyklus kontroly).

## Súvisiace

- [[T07 – Kybernetická bezpečnosť]] — hrozby, AAA, útoky, malvér
- [[Počítačové siete – TČOZ]] — sieťové základy
- [[Informačné a sieťové technológie]] — predmet
