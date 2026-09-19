---
title: "Cacheovanie a monitoring databázy"
predmet: "Informačné a sieťové technológie"
typ: "prezentácia"
trieda: "III.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/ppt/Cacheovanie_a_Monitoring_DB.pptx"
obrázky: 1
tags:
  - ist
  - databázy
  - prezentácia
---

# Cacheovanie a monitoring databázy

> [!info] Zdrojový dokument
> `Cacheovanie_a_Monitoring_DB.pptx` — [[Cacheovanie_a_Monitoring_DB.pptx|otvoriť originál]]

## 1. Cacheovanie a Monitoring databázy

- Matúš Maštena | III.IST

## 2. Obsah prezentácie

- Cacheovanie
- Čo je cache
- Vrstvy cache
- Stratégie vyradenia (LRU, LFU, [[FIFO]])
- Cachovacie systémy ([[Redis]], Memcached, sccache)
- Databázová cache a invalidácia
- Monitoring [[Databáza|databázy]]
- Kľúčové metriky
- [[Slow Query Log]] a [[EXPLAIN]]
- Nástroje (Grafana, Prometheus, PMM)
- Alerting

## 3. 01

- Cacheovanie

## 4. Čo je Cache?

- Základná myšlienka:
- uchovaj výsledok na rýchlejšom mieste, aby si ho nemusel počítať znova
- [[Cache]] hit
- dáta sú v cache → odpoveď okamžite, bez čítania z disku
- [[Cache]] miss
- dáta chýbajú → načítajú sa zo zdroja a uložia do cache pre ďalšie použitie
- Prečo to funguje?
- väčšina aplikácií číta tie isté dáta znova a znova (napr. homepage, profil)
- Analógia:
- cache = poznámky v zošite; databáza = celá knižnica — poznámky nájdeš oveľa rýchlejšie
- Číslo:
- RAM je ~100× rýchlejšia ako SSD, SSD je ~10× rýchlejšia ako HDD

## 5. Prečo cachujeme?

- Rýchlosť
- dotaz do DB trvá 50–200 ms; z cache menej ako 1 ms — 100× rýchlejšie
- Škálovateľnosť
- server zvládne oveľa viac používateľov naraz, keď nemusí zakaždým čítať z disku
- Menej záťaže na DB
- rovnaký dotaz sa nevykoná tisíckrát — databáza dostane len zlomok požiadaviek
- Reálny príklad:
- Instagram cachuje počty likov — číta z cache, do DB zapisuje len občas
- Ďalší príklad:
- Google vyhľadávanie — výsledky populárnych dopytov sú cachované, nie vždy počítané

## 6. Vrstvy cache

- CPU cache (L1/L2/L3)
- priamo v procesore, ~1 ns — najrýchlejšia, ale len pár MB
- RAM
- [[RAM|operačná pamäť]], ~100 ns — rýchla, desiatky GB, stratená po vypnutí
- Aplikačná cache
- [[Redis]], Memcached — ukladá výsledky dotazov v RAM servera, ~1 ms
- Databázová cache
- [[Buffer Pool]] v MySQL — DB si drží v pamäti dáta, ktoré číta najčastejšie
- CDN ([[CDN|Content Delivery Network]])
- servery po svete cachujú obrázky a videá — YouTube, Netflix to tak robia
- Zákon:
- čím bližšie k procesoru = rýchlejšie, drahšie, menšie

## 7. Stratégie vyradenia z cache

- Problém:
- cache má obmedzenú veľkosť — keď je plná, niečo musí vyletieť
- LRU — [[LRU|Least Recently Used]]
- vyhodí sa záznam, ku ktorému sa najdlhšie nepristupovalo
- predstav si to ako pracovný stôl — čo si dlho nepoužíval, odložíš do šuplíka
- LFU — [[LFU|Least Frequently Used]]
- vyhodí sa záznam, ktorý bol použitý najmenej krát
- spotify analógia: piesne, ktoré si počúval len raz, sa vypnú z offline zoznamu
- FIFO — [[FIFO|First In First Out]]
- vyhodí sa najstarší záznam, bez ohľadu na to, či ho používaš
- TTL — [[TTL|Time To Live]]
- záznam má nastavenú platnosť (napr. 5 minút) — potom automaticky vyprší

## 8. Cachovacie systémy

- Redis
- ukladá dáta priamo v RAM ako dvojice kľúč–hodnota
- príklady použitia: ukladanie prihlásení, počítadlá, rýchle vyhľadávanie
- Twitter, GitHub, Stack Overflow — všetci používajú Redis
- Memcached
- jednoduchší ako Redis, veľmi rýchly — len základný kľúč-hodnota cache
- vhodný keď nepotrebuješ nič extra — len rýchlo uložiť a načítať
- sccache
- cache pre kompilátor kódu — ukladá výsledky prekladu Rust/C/C++ súborov
- RUSTC\_WRAPPER=sccache — compiler skontroluje cache pred každým prekladom
- veľké projekty: namiesto 10 minút kompilácia trvá 30 sekúnd

## 9. Cache v databáze

- [[Buffer Pool]] (InnoDB/MySQL)
- databáza si drží časti dát priamo v RAM, aby nemusela čítať z disku
- cieľ: väčšina dotazov by mala nájsť dáta v pamäti, nie na disku
- nastavuje sa na 60–80 % RAM servera — najdôležitejší parameter MySQL
- Query Cache
- databáza si pamätá výsledok SQL dotazu — rovnaký dotaz vráti uloženú odpoveď
- v MySQL 8.0 odstránená — globálne zamykanie spôsobovalo problémy pri veľkej záťaži
- Materialized View
- uložený výsledok zložitého dotazu ako tabuľka — dotaz sa neráta zakaždým

## 10. Cache invalidácia

- Problém:
- dáta v databáze sa zmenili, ale cache stále vracia starú hodnotu
- TTL ([[TTL|Time To Live]])
- každý záznam má nastavenú dobu platnosti — po vypršaní sa automaticky zmaže
- príklad: cena produktu platí 5 minút, potom sa načíta znova z DB
- Aktívna invalidácia
- keď sa dáta zmenia, aplikácia okamžite zmaže zodpovedajúci záznam v cache
- príklad: používateľ zmení heslo → cache s jeho profilom sa okamžite vymaže
- Záver:
- invalidácia cache je jedna z najťažších vecí v programovaní — vždy treba vedieť kedy sú dáta neaktuálne

## 11. 02

- Monitoring [[Databáza|databázy]]

## 12. Prečo monitorovať databázu?

- Bez monitoringu:
- "aplikácia je pomalá" — nevieš prečo, nevieš kde, nevieš od kedy
- S monitoringom:
- "SELECT na tabuľke orders trvá 4 sekundy, chýba index na stĺpci user\_id"
- Včasné odhalenie problémov
- zachytíš problém skôr ako ho pocítia používatelia
- Rast dát
- sleduješ koľko miesta DB zaberá — plánuješ kedy budeš potrebovať väčší disk
- Bezpečnosť
- zachytíš neúspešné pokusy o prihlásenie alebo neobvyklé dotazy
- Reálny dôsledok:
- Amazon spočítal, že každých 100 ms oneskorenia = -1 % tržieb

## 13. Čo sledujeme pri monitoringu?

- Rýchlosť dotazov
- priemerná doba odozvy SQL dotazov — ideálne pod 100 ms
- Počet dotazov za sekundu (QPS)
- koľko dotazov DB spracuje — pomáha sledovať záťaž a rast
- CPU a RAM
- ak je CPU dlhodobo nad 90 %, niečo nie je v poriadku — pravdepodobne chýba index
- Miesto na disku
- databáza rastie — nečakane plný disk = výpadok celej aplikácie
- Počet pripojení
- každé spojenie zaberá pamäť — príliš veľa a DB odmietne ďalšie používateľov
- Chybové hlásenia
- opakujúce sa chyby naznačujú problém v kóde alebo v štruktúre databázy

## 14. Slow Query Log a EXPLAIN

- [[Slow Query Log]]
- databáza automaticky zapisuje dotazy, ktoré trvali dlhšie ako nastavený limit
- MySQL: SET GLOBAL slow\_query\_log = 1; SET GLOBAL long\_query\_time = 1;
- výsledok: log súbor so všetkými pomalými dotazmi — vieš presne čo optimalizovať
- [[EXPLAIN]]
- príkaz ukáže plán vykonania dotazu — bez toho aby ho skutočne spustil
- EXPLAIN SELECT \* FROM users WHERE email = 'matus@skola.sk';
- type: ALL
- databáza prehľadáva každý riadok tabuľky — najpomalší možný prístup
- type: ref / eq\_ref
- databáza použila index — vyhľadá len niekoľko riadkov namiesto celej tabuľky

## 15. Nástroje pre monitoring databázy

- MySQL Workbench / pgAdmin
- zadarmo, od výrobcu — grafické rozhranie, EXPLAIN vizualizácia, zoznam procesov
- Prometheus
- open-source nástroj zbierajúci metriky z databázy každých pár sekúnd
- Grafana
- vizualizuje metriky z Promethea — grafy, dashboardy, história
- Prometheus + Grafana = najrozšírenejší open-source monitoring stack vo firmách
- Percona PMM
- špeciálne navrhnutý pre MySQL a PostgreSQL — ukáže pomalé dotazy s odporúčaniami
- Datadog
- komerčný SaaS nástroj — monitoruje DB aj celú aplikáciu, pošle alert pri probléme

## 16. Alerting

- Čo je alerting?
- automatické upozornenie keď metrika prekročí nastavený prah
- bez alertingu by musel niekto pozerať na dashboardy 24/7 — čo nikto nechce
- Warning
- hodnota sa blíži k problémovej hranici — treba sledovať, zatiaľ nie je kritická
- Critical
- hodnota presiahla kritický limit — treba okamžite zasiahnuť
- Príklady prahov:
- CPU \> 90 %, voľné miesto na disku \< 10 %, dotaz trvá \> 5 sekúnd
- Kanály:
- email, SMS, Discord, Teams — upozornenie príde tam kde tím komunikuje

## 17. Zhrnutie

- CACHEOVANIE
- Cache ukladá dáta bližšie k aplikácii — dotaz z RAM je 100× rýchlejší ako z disku
- LRU, LFU, FIFO, TTL — každá stratégia rozhoduje inak čo z plnej cache vyhodiť
- Redis = de facto štandard; Buffer Pool = kľúčový cache priamo v databáze
- Invalidácia je najťažšia časť — dáta v cache musia zodpovedať realite
- MONITORING
- Bez monitoringu vieš len "niečo nefunguje" — s ním vieš presne čo a prečo
- Sledujeme: rýchlosť dotazov, CPU, RAM, disk, počet pripojení, chyby
- Slow Query Log + EXPLAIN = základné nástroje každého vývojára aj DBA
- Grafana + Prometheus = obľúbený open-source stack zadarmo

## 18. Ďakujeme za pozornosť

- Zdroje
- https://redis.io/docs
- https://github.com/mozilla/sccache
- https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool.html
- https://www.postgresql.org/docs/current/sql-explain.html
- https://grafana.com/docs
- https://prometheus.io/docs
- https://www.percona.com/software/database-tools/percona-monitoring-and-management
- https://dataintensive.net
- cachequiz.vercel.app

![[cacheovanie-a-monitoring-databazy-001.png]]
