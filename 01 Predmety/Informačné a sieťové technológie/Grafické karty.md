---
title: "Grafické karty"
predmet: "Informačné a sieťové technológie"
typ: "referát"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2025
zdroj: "99 Zdroje/docx/GPU.docx"
obrázky: 7
tags:
  - ist
  - hardvér
  - referát
---

# Grafické karty

> [!info] Zdrojový dokument
> `GPU.docx` — [[GPU.docx|otvoriť originál]]

STREDNÁ PRIEMYSLENÁ ŠKOLA ELEKTROTECHNICKÁ

HÁLOVA 16, BRATISLAVA

**Grafika**

Matúš Maštena

Bratislava, 2025

### Obsah

### 1.1. Princíp – účel, charakteristika a druhy kariet podľa výrobcov

Grafická karta (GPU) je kľúčový hardvérový komponent, ktorý transformuje digitálne dáta z procesora (CPU) na vizuálne informácie zobraziteľné na monitore, a to extrémne rýchlym vykresľovaním a striedaním snímok (frames). Vysoké FPS (Frames Per Second) zabezpečuje plynulý pohyb pre ľudské oko. Zatiaľ čo pre bežné úlohy postačuje integrovaná grafika, graficky náročné činnosti ako počítačové hry (pre plynulé vykresľovanie 3D prostredí, textúr, svetelných efektov vrátane Ray Tracingu a vysoké FPS) či profesionálne aplikácie (3D modelovanie, CAD/CAM, strih videa, rendering, vedecké simulácie) vyžadujú dedikovanú grafickú kartu optimalizovanú pre presnosť a stabilitu. Pri výbere grafickej karty je dôležité zohľadniť výkon GPU (taktovacia frekvencia, počet výpočtových jednotiek), veľkosť a typ [[VRAM|grafickej pamäte]] ([[VRAM]], napr. GDDR6), efektívny chladiaci systém, spotrebu energie (TDP) a možnosti pripojenia (konektivita a výstupy). Moderné karty podporujú aj pokročilé technológie ako Ray Tracing a upscaling (NVIDIA DLSS, AMD FSR) pre zvýšenie FPS. Trh s GPU primárne tvoria NVIDIA (GeForce pre hráčov, Quadro pre profesionálov, Tesla/H100/A100 pre dáta a AI), AMD (Radeon pre hráčov, Radeon Pro pre profesionálov, Instinct pre výpočty) a najnovšie aj Intel so sériou Arc (Alchemist, Battlemage) zameranou na herný segment strednej triedy s technológiou XeSS. Okrem výrobcov čipov existuje mnoho výrobcov hotových kariet (ASUS, MSI, GIGABYTE, Sapphire), ktorí používajú čipy od NVIDIE alebo AMD a dopĺňajú ich o vlastné chladiace systémy a pretaktovanie.

### 1.2. Typické parametre grafických kariet

Grafické karty sú esenciálne pre moderné výpočtové systémy a náročné grafické aplikácie. Ich výkon je definovaný následovnými kľúčovými parametrami:

- Grafický procesor (GPU): Určuje efektivitu a rýchlosť (architektúra, frekvencia, stream procesory, výrobný proces).
- Grafická pamäť (VRAM): Služi ako dočasné úložisko (kapacita, typ - GDDR/HBM) a jej priepustnosť je kľúčová pre spracovanie dát.
- Pripojenie: Karty sa integrujú cez [[PCIe slot|PCI Express]] (PCIe) a disponujú výstupnými konektormi (HDMI, DisplayPort, USB-C).
- Energetické požiadavky a chladenie: Spotreba (TDP) vyžaduje adekvátny zdroj; efektívne chladenie je nevyhnutné pre optimálny výkon.
- Podporované technológie: Zahŕňajú API (DirectX, OpenGL/Vulkan), Ray Tracing, technológie pre zvýšenie snímkovej frekvencie (NVIDIA DLSS, AMD FSR) a synchronizačné technológie (NVIDIA G-Sync, AMD FreeSync), ako aj podporu VR Ready.

### 1.3. Hlavné časti grafických kariet

![[graficke-karty-001.png]]

Obr.1.: Hlavné časti grafickej karty

### 1.4. Druhy chladenia grafických kariet

![[graficke-karty-002.png]]

Obr.2.: Vodou chladené GPU

![[graficke-karty-003.png]]

Obr.3.: Vzduchom chladené GPU

![[graficke-karty-004.png]]

Obr.4.: Pasívne chladené GPU

### 1.5. Napájanie grafických kariet

![[graficke-karty-005.png]]

Obr.5.: 12pinový konektor na napájanie RTX 4090

Grafické karty, najmä tie výkonné, potrebujú na svoj chod značné množstvo elektrickej energie. Toto napájanie sa zabezpečuje kombináciou napájania zo základnej dosky a priamych káblov z napájacieho zdroja (PSU).

Každá grafická karta sa vkladá do PCIe x16 slotu na [[Základná doska|základnej doske]]. Tento slot je prvým zdrojom energie pre grafickú kartu a dokáže sám o sebe dodať až 75 W. Pre menej výkonné alebo staršie karty to môže byť dostatočné, no väčšina moderných GPU potrebuje dodatočný prísun energie.

Keďže samotný [[PCIe slot]] nestačí, väčšina súčasných [[Grafická karta|grafických kariet]] využíva prídavné napájacie konektory, ktoré sa pripájajú priamo k napájaciemu zdroju. Najbežnejšie typy týchto konektorov sú:

- 6-pin konektor: Tento typ konektora dokáže dodať ďalších 75 W energie. Nájdete ho najmä na stredne výkonných a starších grafických kartách.
- 8-pin konektor: Je schopný dodať až 150 W energie. Je štandardom pre väčšinu stredne až vysoko výkonných [[Grafická karta|grafických kariet]].
- 6+2-pin konektor: Ide o univerzálny konektor, ktorý možno použiť buď ako 6-pinový alebo 8-pinový, čím poskytuje flexibilitu pri zapájaní rôznych typov grafických kariet.
- 12-pin (12VHPWR / 12V-2x6) konektor: Tento novší štandard, ktorý sa objavil s generáciami kariet NVIDIA RTX 3000 a RTX 4000, je navrhnutý pre veľmi vysoký odber prúdu a dokáže dodávať až 600 W. Jeho cieľom je zjednodušiť káblový manažment znížením počtu potrebných káblov pre extrémne výkonné GPU.

Mnohé výkonné grafické karty používajú kombináciu viacerých konektorov, napríklad dva 8-pinové konektory alebo jeden 12VHPWR konektor.

### 1.6. Vstupy - sloty grafických kariet k základnej doske

![[graficke-karty-006.png]]

Obr.6.: PCIe konektor na [[Základná doska|základnej doske]]. Do najdlhšieho slotu sa inštaluje GPU.

### 1.7. Výstupy – porty na grafických kartách

![[graficke-karty-007.jpg]]

Obr.7.: Výstupy na GPU

### 1.8. Výkonové označenie grafických kariet pre Nvidia a AMD.

Výkonové označenia grafických kariet Nvidia GeForce a AMD Radeon sa riadia systematickou logikou, ktorá umožňuje zorientovať sa v ich výkone a generácii. U Nvidie označujú prvé dve číslice generáciu (napr. RTX 40-séria), zatiaľ čo posledné dve číslice udávajú výkonnostnú triedu (napr. RTX 4060, 4070, 4080, 4090), pričom vyššie číslo znamená vyšší výkon; sufixy ako Ti (Titanium) a SUPER potom indikujú vylepšené verzie štandardných modelov. Karty RTX navyše podporujú moderné technológie ako Ray Tracing a DLSS, zatiaľ čo staršie alebo menej výkonné karty nesú označenie GTX. Na strane AMD určuje prvých pár číslic (napr. RX 7000 séria) generáciu a nasledujúce tri číslice výkonnostnú triedu (napr. RX 7700, 7800, 7900), pričom vyššie číslo taktiež znamená vyšší výkon; sufixy ako XT a XTX potom označujú výkonnejšie varianty kariet. Napriek týmto pravidlám je vždy vhodné pred kúpou skontrolovať nezávislé recenzie a benchmarky, keďže relatívny výkon sa môže medzi generáciami a konkurenčnými modelmi líšiť.

### 1.9. Zdroje

- \[1\] https://imgs.search.brave.com/LV6uI80E77YA0eljEIhUlSyXzpy3Dg4wQOde-eZDfoM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FibGVtYXR0ZXJz/LmNvbS9CbG9nL2lt/YWdlLmF4ZD9waWN0/dXJlPS9XaGF0JTIw/aXMlMjBhJTIwR1BV/L1doYXQlMjBpcyUy/MGElMjBHUFUlMjBB/biUyMEluc2lkZSUy/MExvb2slMjAwNS5q/cGc
- \[2\] https://imgs.search.brave.com/qmgaQcv\_Vp6LNgeyJ8Mgy5UBj9c01FfimTL3rifvmko/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZGF0YWNlbnRlcmZy/b250aWVyLmNvbS9m/aWxlcy9iYXNlL2Vi/bS9kYXRhY2VudGVy/ZnJvbnRpZXIvaW1h/Z2UvMjAyMi8wOS8x/NjYzMTk0MDE5MTY0/LW52aWRpYWxpcXVp/ZGNvb2xlZGdwdXBj/aWUucG5nP2F1dG89/Zm9ybWF0LGNvbXBy/ZXNzJmZpdD1maWxs/JmZpbGw9Ymx1ciZx/PTQ1Jnc9MjUwJndp/ZHRoPTI1MA
- \[3\] https://image.alza.cz/products/ECr59ra1/ECr59ra1.jpg?width=230&height=230
- \[4\] https://image.alza.cz/products/ECGT1030a/ECGT1030a.jpg?width=230&height=230
- \[5\] https://imgs.search.brave.com/l7n3bn5TVtFBV2xmKfr2Q7mD1cxu\_S9O1llJWxPbcN4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL01Rc0FB/ZVN3d2UxbnE4eG0v/cy1sNTAwLmpwZw
- \[6\] https://imgs.search.brave.com/v5KSls5nryk6y\_Fb3Um6hPYsdV3UA9sJP4nzQeOEZRo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3p5dW56ZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDYvR1BVLXBlcmZv/cm1hbmNlLWFuZC1Q/Q0llLVZlcnNpb25z/XzEud2VicA
