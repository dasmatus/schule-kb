---
title: "Základná doska"
predmet: "Informačné a sieťové technológie"
typ: "referát"
trieda: "III.IST"
ročník_teraz: "IV.IST"
dátum: 2025
zdroj: "99 Zdroje/docx/Doska.docx"
obrázky: 3
tags:
  - ist
  - hardvér
  - referát
---

# Základná doska

> [!info] Zdrojový dokument
> `Doska.docx` — [[Doska.docx|otvoriť originál]]

STREDNÁ PRIEMYSELNÁ ŠKOLA ELEKTROTECHNICKÁ

HÁLOVA 16

**Základná doska**

**Matúš Maštena**

2025

## 1 Základná doska

Základná doska je doska obsahujúca elektronické súčiastky tvoriace základné prvky osobného počítača alebo iného elektronického zariadenia založeného na procesoroch. Základná doska je zjednocujúcim prvkom v počítači, všetky ostatné moduly, súčasti, diely a periférie sa priamo alebo nepriamo vkladajú, alebo pripájajú k základnej doske.

### 1.1 Jej účel

Základná doska je hlavnou súčasťou počítača. Spája všetky jeho komponenty a umožňuje im komunikovať medzi sebou. Je to doska s elektronickými obvodmi, ktorá obsahuje sloty pre procesor, pamäť, rozširujúce karty a konektory pre pripojenie diskov, klávesnice, myši a ďalších zariadení.

### 1.2 Výrobcovia základných dosiek

Existujú rôzni výrobcovia základných dosiek, ale kvôli limitácií strán tejto práce uvediem len zopár. A sú to:

- Asus,
- MSI,
- Gigabyte
- AsRock
- Colorful
- EVGA
- a iní

### 1.3 Jej formáty

Rovnako ako pri výrobcoch základných dosiek, tak aj formátov existuje veľmi veľa. V nasledujúcom obrázku je to graficky znázornené.

![[zakladna-doska-001.png]]

Obr.1.: Diagram veľkostí základných dosiek

Ako môžete vidieť, tak tie veľkosti sú rôzne. Najmenší formát základných dosiek, ktorý je vhodný do kompaktných počítačov, je Mini-ITX, zatiaľ čo najväčší formát, ktorý bol ale v dnešnej dobe úplne nahradený formátom ATX a už sa v dnešných počítačoch nepoužíva, je AT, pomenovaný po prvom osobnom počítači IBM PC-AT. Bol ale nahradený formátom E-ATX, ktorý sa používa hlavne pri high-end zostavách.

![[zakladna-doska-002.png]]

Obr.2.: Základná doska formátu E-ATX

### 1.4 Popis komponentov na základnej doske

Základná doska obsahuje tieto komponenty, ktoré sú štandardom pri každej doske:

- Pätica pre procesor ([[CPU socket]])
- Sloty pre [[RAM|pamäť RAM]]:
- Čipová sada (chipset):
- Konektory pre disky:
- Konektory pre napájanie:
- Konektory pre externé zariadenia:
- [[BIOS]] čip:
- PCI(-e) sloty

Postupne si tieto komponenty prejdeme v nasledujúcich podkapitolách.

#### 1.4.1 Pätica pre procesor

Tu sa umiestňuje procesor, ktorý je "mozgom" počítača. CPU sockety sú rôzne, ale medzi tie najbežnejšie patria AM4, AM5, LGA 1200 a TRX40.

#### 1.4.2 RAM sloty

Do týchto slotov sa umiestňujú [[RAM|pamäte RAM]], ktorej funkcia je prechovávať dočasné dáta, ktoré sa po vypnutí počítača automaticky vymažú.

#### 1.4.3 Čipset

Je to súbor elektronických komponentov na jednom alebo viacerých integrovaných obvodoch, ktorý riadi tok dát medzi procesorom, pamäťou a periférnymi zariadeniami. Čipová súprava sa zvyčajne nachádza na základnej doske počítačov. Čipové sady sú zvyčajne navrhnuté na prácu s konkrétnou rodinou mikroprocesorov. Keďže riadi komunikáciu medzi procesorom a externými zariadeniami, [[Čipset|čipová súprava]] zohráva kľúčovú úlohu pri určovaní výkonu systému.

#### 1.4.4 Konektory pre disky

Tieto konektory sú [[SATA]], IDE a M.2 a slúžia na pripojenie [[HDD|pevných diskov]] (HDD) a na pripojenie rýchlejších [[SSD|SSD diskov]]. IDE sa už v dnešnej dobe nepoužíva, pričom ho nahradili už spomínané [[SATA]] a M.2. SATA disky sa pripájajú cez kábel, zatiaľ čo [[M.2|M.2 disky]] sa pripájajú na dosku a sú napájané priamo z dosky. Existujú dva typy dátových pripojení pre M.2: SATA a PCI-e. SATA je pomalšie, PCI-e je rýchlejšie. V nových doskách sa používa PCI-e verzia M.2., lebo ako som už spomenul, je rýchlejšia.

#### 1.4.5 Konektory pre napájanie

Konektory pre napájanie sú len dva. Jeden dvadsaťštyri pinový (ATX) konektor sa používa na napájanie základnej dosky, pričom druhý osem pinový sa používa na napájanie CPU. Čo sa týka konektorov na doske, ktoré niečo napájajú, tak je tam jeden štvorpinový, ktorý sa vo väčšine prípadov označuje ako CPU\_FAN.

#### 1.4.6 Konektory pre porty na prednej strane PC skrine

Ako už názov napovedá, tak ide o konektory, ktoré slúžia na pripojenie konektorov a tlačidiel, ktoré nájdeme na prednej strane počítačovej skrine. To zahŕňa USB porty, A/V porty (HDMI, 3,5mm jack), tlačidlo napájania a LED diódy pre stav počítača a stav [[HDD|pevného disku]].

#### 1.4.7 BIOS čip

Tento čip obsahuje binárny operačný systém, skrátene [[BIOS]]. V moderných doskách sa ale používa UEFI, čo je BIOS, ktorý podporuje niektoré moderné funkcie, ako napríklad vlastné moduly alebo Secure Boot.

#### 1.4.8 PCI(-e) sloty

Tieto sloty slúžia na rozšírenie počítača rôznymi rozširujúcimi kartami. Tieto rozširujúce karty sú hlavne externé [[Grafická karta|grafické karty]], HBA karty, ktoré slúžia na pripojenie viacej diskov ako daná doska podporuje; a aj [[SSD|SSD disky]], ktoré sa pripájajú do M.2 slotu.

### 1.5 Charakteristika a podpora funkcií na základnej doske

![[zakladna-doska-003.png]]

Obr.3.: MSI MPG B550 Gaming Edge WiFi

Na [[opis]] funkcií som si zvolil dosku MSI MPG B550 Gaming Edge WiFi. Zvolil som si ju preto, lebo ju mám aj ja vo svojom počítači, ktorý som si poskladal počas pandémie COVID-19. Jej hlavnými funkciami sú čipset B550, ktorý obsahuje aj špecifikáciu [[PCIe slot|PCIe]] Gen. 4 (marketingovo označovaná LIGHTNING GEN 4), ktorá zo sebou prináša prenosové rýchlosti až 64 Gb/s aj pri M.2, zabudovanú Ethernet kartu, ktorá dokáže preniesť až 2,5 Gb/s, RGB LED, ktoré sa skrývajú pod pasívnym chladičom, a automatické pretaktovanie CPU a RAM samotnou doskou. Zároveň prvý [[PCIe slot|PCI-e slot]] je vyrobený z kovu, čo zaručuje pevnejší úchyt [[Grafická karta|grafickej karty]].

### 1.6 Zdroje

- \[1\] Základná Doska (počítač). In *Wikipedia* \[online\]. 2024. \[cit. 2025-02-11\]. Dostupné na internete: \<https://sk.wikipedia.org/wiki/Z%C3%A1kladn%C3%A1\_doska\_(po%C4%8D%C3%ADta%C4%8D)\>.
- \[2\] File:ATX ITX at motherboard compatible Dimensions.svg. In *Wikimedia Commons* \[online\]. \[cit. 2025-02-11\]. Dostupné na internete: \<https://commons.wikimedia.org/wiki/File:ATX\_ITX\_AT\_Motherboard\_Compatible\_Dimensions.svg\>.
- \[3\] [https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmicroless.com%2Fcdn%2Fproducts%2F866f093ea6fcdd8d7ceced5cd24f8305-hi.jpg&f=1&nofb=1&ipt=7ec037a6c93d6c17ee7c66a0c22a1ad8786c861bb97a42cf59cdfed1e24c2271&ipo=images](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmicroless.com%2Fcdn%2Fproducts%2F866f093ea6fcdd8d7ceced5cd24f8305-hi.jpg&f=1&nofb=1&ipt=7ec037a6c93d6c17ee7c66a0c22a1ad8786c861bb97a42cf59cdfed1e24c2271&ipo=images)
- \[4\] Chipset. In *Wikipedia* \[online\]. 2024. \[cit. 2025-02-11\]. Dostupné na internete: \<https://en.wikipedia.org/wiki/Chipset\>.
- \[5\] [https://storage-asset.msi.com/global/picture/image/feature/mb/B550/MPG/edge-wifi/b550-lighting_img.png](https://storage-asset.msi.com/global/picture/image/feature/mb/B550/MPG/edge-wifi/b550-lighting_img.png)
- \[6\] MSI MPG B550 gaming edge WIFI AMD AM4 [[DDR SDRAM|DDR4]] m.2 USB 3.2 gen 2 HDMI ATX gaming motherboard. In *MSI* \[online\]. \[cit. 2025-02-11\]. Dostupné na internete: \<https://www.msi.com/Motherboard/MPG-B550-GAMING-EDGE-WIFI\>.
