---
title: "Packet Tracer – Physical View"
predmet: "Informačné a sieťové technológie"
typ: "prezentácia"
trieda: "III.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/ppt/PT_Physical_View_UCITEL (5)1 (1).pptx"
obrázky: 6
tags:
  - ist
  - siete
  - packet-tracer
  - prezentácia
---

# Packet Tracer – Physical View

> [!info] Zdrojový dokument
> `PT_Physical_View_UCITEL (5)1 (1).pptx` — [[PT_Physical_View_UCITEL (5)1 (1).pptx|otvoriť originál]]

## 1. Fyzické zobrazovanie sietí

- Topológie a Physical View v [[Packet Tracer|Cisco Packet Tracer]]
- Matúš Maštena | III.IST

## 2. Plán hodiny

- Časť 2 — Physical View (30 min)
- Žiaci pracujú samostatne podľa pracovného listu
- Učiteľ prechádza krokmi na projektore — žiaci opakujú
- Časť 3 — Overenie a diskusia (5 min)
- Každý otestuje sieť [[Ping|pingom]] — ukáže výsledok
- Spoločné zhrnutie — čo sme sa naučili
- Žltý banner na snímke = zastavenie, žiaci dokončia krok sami

## 3. 01

- Physical View — krok za krokom

## 4. Physical View — čo to je a kde ho nájsť?

- Logical View
- ikony zariadení na prázdnej ploche — slúži na konfiguráciu, IP, protokoly
- Physical View
- zariadenia v rackoch, miestnostiach, budovách — ako to vyzerá v reálnej serverovni
- Analógia:
- Logical View = mapa metra — farebné čiary, žiadne ulice
- Physical View = pohľad na skutočné mesto — budovy, ulice, serverovne
- Kde ho nájsť:
- Spodná lišta PT → záložka \[Physical\] (vedľa \[Logical\])
- Uvidíš modrú plochu s jednou sivou budovou — Home City
- ⏸ Žiaci: Otvorte PT, prepnite do Physical View. Čo vidíte na obrazovke?

## 5. Hierarchia Physical View — ako sa pohybovať

- Štruktúra je ako bábiky v sebe:
- Home City → Budova (Corporate Office) → Miestnosť → Rack
- Dvojklikni na budovu Corporate Office
- Uvidíš dve miestnosti: Main Wiring Closet (serverovňa) a First Floor (kancelárie)
- Dvojklikni na Main Wiring Closet
- Serverovňa — prázdny rack (sivá skriňa)
- Navigácia späť:
- tlačidlo Back vpravo hore — vráti o úroveň vyššie
- Rack je len v Main Wiring Closet — na First Floor rack nie je, tam patria PC
- ⏸ Žiaci: Navigujte do Main Wiring Closet. Vidíte prázdny rack? Zdvihnite ruku.

## 6. KROK 0 — Horná lišta Physical View

- Add Rack
- New City — nové mesto
- New Building — nová budova
- New Closet — nová serverovňa (Wiring Closet)
- New Rack ★ — pridá rack do serverovne
- Move Object — presúvanie zariadení v racku
- Naviguj do Main Wiring Closet
- Klikni na ikonu Add Rack (zvýraznená žltým)
- Klikni do prázdnej plochy — rack sa pridá
- Presuň [[Switch]] + [[Router]] z panelu do racku
- Bez racku nemôžeš umiestniť zariadenia!
- ⏸ Žiaci: Nájdite túto lištu v PT po prepnutí do Physical View.

![[packet-tracer-physical-view-001.jpeg]]

## 7. KROK 1 — Prepni do Physical View a nájdi budovu

- ①
- ②
- Klikni záložku \[Physical\]
- Dvojklikni na budovu Corporate Office
- Uvidíš pôdorys budovy s miestnosťami
- ⏸ Žiaci: Prepnite do Physical View a dvojkliknite na Corporate Office.

![[packet-tracer-physical-view-002.jpeg]]

## 8. KROK 2 — Vojdi do Main Wiring Closet

- ②
- Si v budove Corporate Office
- Dvojklikni na ikonu Main Wiring Closet
- Vojdeš do serverovne — uvidíš rack
- Späť: tlačidlo Back vpravo hore
- ⏸ Žiaci: Nájdite ikonu Main Wiring Closet a dvojkliknite na ňu.

![[packet-tracer-physical-view-003.jpeg]]

## 9. KROK 3 — Rack: Switch, PDU a Router

- [[Switch]] 2960
- PDU — napájanie
- [[Router]] 2911
- Rack
- ⏸ Žiaci: Presuňte Switch 2960 a Router 2911 do racku. Zapojte napájanie z PDU.

![[packet-tracer-physical-view-004.jpeg]]

![[packet-tracer-physical-view-005.jpeg]]

## 10. Main Wiring Closet — ako by to malo vyzerať

- ⏸ Žiaci: Switch hore, PDU v strede, Router dole. Sem presuňte zariadenia.

![[packet-tracer-physical-view-006.jpeg]]

## 11. Pridanie zariadení — čo kam patrí

- Pravidlo:
- Switch a Router → DO RACKU | PC → na poschodie (First Floor)
- Si v Main Wiring Closet — vľavo dole panel Network Devices
- Switches → 2960-24TT → presuň do racku myšou
- Routers → 2911 → presuň do racku rovnako
- Switch a router zaberajú sloty v racku (1–2U každý)
- Back → vojdi do First Floor → presuň 3× PC na plochu
- PC sú na poschodí pri stoloch — správne rozmiestnenie
- PC do racku = chyba. Switch na poschodie = chyba. Skontroluj pracovný list.
- ⏸ Žiaci: Pridajte Switch 2960, Router 2911 do racku a 3× PC na First Floor.

## 12. Napájanie — PDU

- PDU = [[PDU|Power Distribution Unit]]
- napájacia lišta v racku — ako predlžovačka pre serverovňu
- bez napájania zariadenie v PT nefunguje — simulácia reálneho prostredia
- V racku nájdi PDU — hnedá lišta dole
- Klikni na switch → záložka Physical → uvidíš PWR port
- Presuň napájací kábel z PDU na PWR port switchu
- To isté zopakuj pre router
- LEDky sa rozsvietia nazeleno — zariadenia zapnuté a funkčné
- Zabudol si na PDU? [[Ping]] nebude fungovať — najčastejšia chyba v PT
- ⏸ Žiaci: Zapojte napájanie z PDU na switch aj router. Svietia LEDky nazeleno?

## 13. Výber správneho kábla

- Copper Straight-Through — modrý
- PC → Switch, Switch → Router (rôzne typy zariadení)
- pravidlo: ak spájaš rôzne zariadenia = modrý priamy kábel
- Copper Crossover — červený
- Switch → Switch, PC → PC (rovnaké typy zariadení)
- Serial — hrubý červený
- Router → Router — simuluje linku od ISP (internetového poskytovateľa)
- Console — plochý tmavomodrý
- nastavenie zariadenia cez COM port — bez siete
- Pre dnešnú úlohu: vždy Copper Straight-Through (modrý)
- PC→Switch = modrý | Switch→Router = modrý | ostatné dnes nepoužívame

## 14. Zapojenie káblov

- Panel nástrojov → Copper Straight-Through (modrý kábel)
- Klikni na Switch v racku → port FastEthernet0/1
- Klikni na PC0 na First Floor → port FastEthernet0
- Zelená čiara = spojenie OK, port svieti nazeleno
- Zopakuj: PC1 → Switch Fa0/2, PC2 → Switch Fa0/3
- Switch GigabitEthernet0/1 → Router GigabitEthernet0/0 (tiež modrý)
- Všetky káble zelené — fyzická [[Topológia siete|hviezdicová topológia]] je hotová!
- Oranžová = port sa štartuje (počkaj 30 s), Červená = zlý kábel alebo vypnutý port
- ⏸ Žiaci: Zapojte všetky káble. Máte 5 zelených spojení? (PC0,1,2 → Switch → Router)

## 15. Konfigurácia IP adries

- Dvojklikni na PC0 → Desktop → IP Configuration
- IP: 192.168.1.10 Maska: 255.255.255.0 Gateway: 192.168.1.1
- PC1: 192.168.1.11 / 255.255.255.0 / GW: 192.168.1.1
- PC2: 192.168.1.12 / 255.255.255.0 / GW: 192.168.1.1
- Router → CLI → zadaj riadok po riadku:
- enable → configure terminal → interface GigabitEthernet0/0
- ip address 192.168.1.1 255.255.255.0 → no shutdown → end
- Bez no shutdown je interface vypnutý — ping bude padať!
- Router má IP 192.168.1.1 — to je brána pre všetky PC
- ⏸ Žiaci: Nastavte IP na všetkých PC a nakonfigurujte router CLI.

## 16. Testovanie siete — ping

- PC0 → Desktop → Command Prompt → zadaj: ping 192.168.1.11
- Reply from 192.168.1.11 — 4× odpoveď = sieť funguje!
- Skús tiež: ping 192.168.1.1 (overenie spojenia na router)
- Nefunguje? Postup:
- Request timeout → skontroluj [[IP adresa|IP adresy]] a masky na oboch PC
- Destination unreachable → skontroluj Gateway alebo kábel
- Prvý ping môže zlyhať (ARP) — skús znova, druhý funguje
- Stále nefunguje? Skontroluj PDU napájanie a no shutdown na routeri
- ⏸ Žiaci: Urobte ping 192.168.1.11 z PC0. Kto má 4× Reply? Zdvihnite ruku!

## 17. Ďakujem za pozornosť

- Zdroje
- [[Packet Tracer|Cisco Packet Tracer]] — zabudovaná nápoveda (Help → Contents)
- https://www.netacad.com/cisco-packet-tracer
- https://www.netacad.com/courses/getting-started-cisco-packet-tracer
- https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/fundamentals/configuration/15mt/fundamentals-15-mt-book/cf-cli-basics.html
- https://en.wikipedia.org/wiki/Network\_topology
- https://www.geeksforgeeks.org/computer-networks/types-of-network-topology/
