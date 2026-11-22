---
title: "Pokročilý počítačový hardvér"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/pdf/3 Pokročilý počítačový hardvér.pdf"
tags:
  - ist
  - hardvér
  - poznámky
---

# Pokročilý počítačový hardvér

> [!info] Zdrojový dokument
> `3 Pokročilý počítačový hardvér.pdf` — PC Essentials, kap. 3
> *Pokročilý počítačový hardvér*. Nadväzuje na
> [[Elektrická bezpečnosť a hardvér PC]] a [[Zostavenie PC]]; patrí k
> maturitnej téme [[T14 – Architektúra počítača a operačné systémy]].

Táto kapitola ide za hranicu „poskladať PC“: vysvetľuje štart systému,
firmvér, elektrické základy, ochranu napájania, RAID, porty, monitory,
upgrade a bezpečnú likvidáciu.

## 1. Štart počítača: POST, BIOS, CMOS, UEFI

Pri zapnutí vykoná **BIOS** hardvérovú kontrolu hlavných komponentov —
**POST** (*Power-On Self-Test*). Ak je problém, objaví sa chyba alebo
séria pípnutí; kódy sa líšia podľa výrobcu a treba ich hľadať v manuáli
k základnej doske.

**BIOS** je program v **ROM** čipe na základnej doske. Riadi komunikáciu
medzi operačným systémom a hardvérom a pri štarte zisťuje:

- ktoré disky sú dostupné a ktorý je bootovací,
- ako je nakonfigurovaná pamäť a kedy sa dá použiť,
- konfiguráciu PCIe/PCI slotov a SATA/USB portov,
- funkcie správy napájania.

Nastavenia BIOSu sa ukladajú do čipu **CMOS**, ktorý je napájaný batériou.
Ak batéria zlyhá, nastavenia sa môžu stratiť — preto sa odporúča ich
zdokumentovať (napr. odfotiť). Nesprávny dátum a čas často znamená práve
vybitú CMOS batériu.

**UEFI** je moderná náhrada BIOSu. Zvládne 32-bit aj 64-bit systémy,
podporuje väčšie bootovacie disky, má lepšie rozhranie a pridáva
**Secure Boot**. Výrobcovia často svoje UEFI naďalej nazývajú „BIOS“,
preto sa v nastavení stretneš s označením **BIOS/UEFI**.

## 2. Zabezpečenie BIOS/UEFI

- **Heslá** — heslo správcu dáva prístup ku všetkým nastaveniam a heslám
  používateľov; heslo používateľa obmedzuje prístup podľa definovanej
  úrovne. Najprv sa nastavuje heslo správcu.
- **Šifrovanie disku** — dáta sa zmenia na kód; bez hesla sa počítač
  nespustí a disk sa nedá prečítať ani v inom počítači.
- **LoJack** — modul *Persistence* je súčasťou BIOSu a nedá sa vypnúť;
  aplikačný agent pravidelne hlási polohu zariadenia. Slúži na ochranu
  proti krádeži.
- **TPM** (*Trusted Platform Module*) — čip na ukladanie šifrovacích
  kľúčov, certifikátov, hesiel a dát; v Windows podporuje **BitLocker**.
- **Secure Boot** — povolí spustenie iba operačného systému, ktorému
  dôveruje výrobca dosky; bráni načítaniu neautorizovaného OS.

## 3. Aktualizácia firmvéru

Výrobcovia vydávajú nové verzie BIOSu kvôli stabilite, kompatibilite a
výkonu. Aktualizácia je však **riskantná** — prerušená alebo nesprávna
inštalácia môže počítač znefunkčniť.

- Staršie BIOSy boli v **ROM** a museli sa fyzicky vymeniť.
- Moderné BIOSy sú v **EEPROM**, takže sa dajú preflashovať bez otvorenia
  skrine.
- Pred aktualizáciou si zapíš **výrobcu BIOSu** a **model základnej dosky**,
  súbory ber iba z oficiálnej stránky výrobcu.
- Firmvér aktualizuj len pri probléme s hardvérom alebo keď chceš pridať
  novú funkciu.

## 4. Elektrické základy

Zdroj sa udáva vo **wattoch (W)**. Základné veličiny:

| Veličina | Jednotka | Význam |
| --- | --- | --- |
| **napätie** | volt (V) | práca potrebná na presun náboja |
| **prúd** | ampér (A) | množstvo elektrónov za sekundu |
| **odpor** | ohm (Ω) | odpor proti toku prúdu |
| **výkon** | watt (W) | práca za sekundu |

**Ohmov zákon:** `V = I · R` — napätie sa rovná prúdu krát odpor.

**Výkon:** `P = V · I` — výkon sa rovná napätiu krát prúd.

Niektoré zdroje majú na zadnej strane **prepínač napätia** (115 V / 230 V).
Nesprávne nastavenie môže zdroj a počítač poškodiť. Zdroj bez prepínača
zisťuje napätie automaticky.

> [!warning] Neotvárať zdroj
> Kondenzátory vnútri zdroja si môžu dlho udržať náboj aj po odpojení
> zo siete.

## 5. Kolísanie napájania a ochrana

Nestabilné napätie sa nazýva **kolísanie napájania**. Môže spôsobiť stratu
dát alebo zlyhanie hardvéru.

| Porucha | Čo sa deje |
| --- | --- |
| **Výpadok prúdu** (blackout) | úplná strata napájania — poistka, transformátor, sieť |
| **Výpadok napätia** (brownout) | napätie klesne pod ~80 % normálu, často pri preťažení |
| **Hluk** (noise) | rušenie z generátorov a bleskov, zlá kvalita energie |
| **Špička** (spike) | krátke zvýšenie nad 100 % normálu, napr. po výpadku |
| **Prepätie** (surge) | dramatický nárast napätia na nanosekundy |

Ochranné zariadenia:

- **Prepäťová ochrana** — odvádza prebytočné napätie do zeme. Účinnosť sa
  udáva v **jouloch**; po absorbovaní danej energie ju treba vymeniť.
- **UPS** (*Uninterruptible Power Supply*) — batéria sa neustále nabíja a
  pri výpadku dodáva energiu. Vie komunikovať s OS a bezpečne vypnúť PC
  pred vybitím.
- **SPS** (*Standby Power Supply*) — batéria je v pohotovosti a pri poklese
  napätia sa prepne cez menič. Je menej spoľahlivý ako UPS, pretože
  prepnutie môže zlyhať.

> [!warning] Laserová tlačiareň
> Výrobcovia UPS neodporúčajú pripájať laserovú tlačiareň k UPS — mohla
> by ju preťažiť.

## 6. CPU: architektúry a výkon

Program je postupnosť inštrukcií, ktoré CPU vykonáva podľa **inštrukčnej
sady**:

- **RISC** (*Reduced Instruction Set Computer*) — malá sada, inštrukcie sa
  vykonávajú veľmi rýchlo; napr. **PowerPC** a **ARM**.
- **CISC** (*Complex Instruction Set Computer*) — široká sada, menej krokov
  na operáciu; napr. **Intel x86** a **Motorola 68k**.

Počas vykonávania jednej inštrukcie sú ďalšie inštrukcie a dáta uložené
v rýchlej **vyrovnávacej pamäti (cache)**.

**Zvyšovanie výkonu:**

- **Hyper-Threading** (Intel) — CPU spracúva viac vlákien súčasne; OS ho
  vidí akoby ako dva procesory.
- **HyperTransport** (AMD) — vysokorýchlostné spojenie CPU so severným
  mostíkom.
- **Frekvencia** v MHz/GHz udáva počet cyklov za sekundu.
- **Šírka FSB** v bitoch udáva, koľko dát prejde naraz (32 alebo 64 bitov).
- **Pretaktovanie** (overclocking) — CPU beží nad špecifikáciou; môže ho
  poškodiť.
- **Obmedzovanie výkonu** (throttling) — CPU beží pod nominálnou rýchlosťou
  kvôli úspore energie alebo menšiemu teplu; bežné v notebookoch.
- **Virtualizácia CPU** — jeden procesor sa správa ako viacero; umožňuje
  paralelne prevádzkovať viac OS vo virtuálnych počítačoch. V BIOSu býva
  niekedy vypnutá.

## 7. Chladenie

Teplo vzniká tokom prúdu v elektronike. Ak sa neodvádza, počítač spomalí
alebo sa poškodí.

- **Pasívne chladenie** — chladič alebo zníženie rýchlosti; nepotrebuje
  energiu.
- **Aktívne chladenie** — ventilátory v skrini a na chladiči; vyžaduje
  energiu.
- Ventilátory musia spolupracovať: studený vzduch nasávať dnu, horúci
  vyfukovať von. Pri montáži ďalších ventilátorov sa vyhni tomu, aby dva
  blízke ventilátory fúkali proti sebe.

## 8. RAID

**RAID** (*Redundant Array of Independent Disks*) zoskupuje viac diskov do
jedného logického zväzku. Pre OS sa javí ako jeden disk. Dôvody: dostupnosť,
spoľahlivosť, kapacita, redundancia a/alebo výkon. Pole menších diskov môže
byť ekonomickejšie než jeden veľký disk.

| Technika | Čo robí | Výhoda / riziko |
| --- | --- | --- |
| **Pruhovanie** (striping) | dáta rozdelí na viac diskov | vyšší výkon, ale zlyhanie jedného disku = strata dát |
| **Zrkadlenie** (mirroring) | duplicitné dáta na ďalší disk | redundancia; po výmene disku sa zrkadlo obnoví |
| **Parita** | kontrolné súčty oddelene od dát | rekonštrukcia dát bez straty rýchlosti a kapacity |
| **Dvojitá parita** | odolnosť až pri dvoch chybných diskoch | vyššia ochrana, viac miesta na paritu |

Bežné úrovne: **RAID 0** = pruhovanie, **RAID 1** = zrkadlenie,
**RAID 5** = parita, **RAID 6** = dvojitá parita. **Hot swap** umožňuje
vymeniť pokazený disk bez vypnutia poľa — nie všetky disky a typy RAID to
podporujú.

> [!note] RAID nie je záloha
> Chráni pred poruchou disku, nie pred omylom, ransomvérom alebo požiarom.
> Záloha musí byť na inom médiu.

## 9. Porty, konektory a káble

- **Staršie porty** — sériový, paralelný, PS/2, VGA; väčšinou ich nahradilo
  USB.
- **Video porty** — VGA (analóg), DVI, HDMI, DisplayPort.
- **USB** — vyvíjal sa od 1,5 Mbps (USB 1.0 low speed) cez 480 Mbps
  (USB 2.0) po 5 Gbps (USB 3.0), 10 Gbps (USB 3.1) a 20 Gbps
  (USB 3.2 / USB-C).
- **SATA** — tenký 7-pinový konektor, kábel do 1 m; pripája HDD, SSD a
  optické mechaniky.
- **Krútená dvojlinka** — páry vodičov sú skrútené, čím sa znižuje
  presluch a elektromagnetická indukcia; používa sa v Ethernete a starších
  telefónnych sieťach.
- **Koaxiálny kábel** — stredový vodič, dielektrická izolácia, fóliové
  tienenie (vonkajší vodič) a PVC plášť; tienenie chráni pred EMI.
- **SCSI** — zbernica, zariadenia sa reťazia; **IDE** — starší štandard
  pre HDD a optické mechaniky.

## 10. Monitory

- **Veľkosť** — uhlopriečka v palcoch (bežne 19–24″, ultraširoké 30″+).
- **Rozlíšenie** — počet horizontálnych × vertikálnych pixelov, napr.
  1920 × 1080 (1080p).
- **Natívne rozlíšenie** — najlepšie rozlíšenie konkrétneho monitora;
  vo Windows je označené ako *(Odporúčané)*.
- **Natívny režim** — obraz z grafickej karty presne zodpovedá natívnemu
  rozlíšeniu.
- **Pripojenie** — staršie VGA/DVI, novšie HDMI a DisplayPort; DisplayPort
  podporuje vyššie rozlíšenia a obnovovacie frekvencie.
- **Viac monitorov** — zväčší pracovnú plochu; treba podporu v počítači,
  káble a zapnutie v nastaveniach zobrazenia.

## 11. Upgrade počítača

Počítač treba aktualizovať, keď sa zmenia požiadavky používateľa, nový
softvér žiada novší hardvér alebo nový hardvér ponúka lepší výkon. Vždy
porovnaj **efektívnosť a náklady** modernizácie vs. výmeny.

### Základná doska

Pri výmene dosky často treba vymeniť aj **CPU, chladič, ventilátor a RAM**.
Nová doska sa musí zmestiť do skrine a zdroj ju musí podporiť.

Postup:

1. Zaznamenať zapojenie zdroja, ventilátorov, LED a tlačidiel.
2. Odpojiť káble od starej dosky.
3. Vybrať rozširujúce karty a dať ich do antistatických vrecúšok.
4. Zaznamenať spôsob upevnenia dosky; pozor na izolačné skrutky a dištančné
   stĺpiky.
5. Vybrať starú dosku.
6. Skontrolovať konektory novej dosky.
7. Vymeniť I/O kryt na zadnej strane skrine.
8. Vložiť a upevniť dosku správnymi skrutkami.
9. Pripojiť zdroj, ventilátory, LED, predný panel a ďalšie káble.
10. Nainštalovať rozširujúce karty, skontrolovať uvoľnené časti a káble,
    pripojiť klávesnicu, myš, monitor a napájanie.

Pri práci používať antistatickú podložku a náramok. Pri opätovnom použití
CPU vyčistiť starú teplovodivú pastu a naniesť novú.

### CPU

Nový procesor musí:

- pasovať do existujúcej **pätice**,
- byť kompatibilný s **čipovou sadou**,
- fungovať s existujúcou **základnou doskou a zdrojom**.

Nový CPU môže vyžadovať iný chladič a ventilátor. Medzi CPU a chladič
patrí **teplovodivá pasta**. Teploty sa dajú sledovať v BIOSu alebo v
nástrojoch tretích strán.

### Disky a periférie

Dôvody na ďalší disk: viac miesta, vyššia rýchlosť, druhý OS, odkladací
súbor, odolnosť proti chybám, záloha. Postup: vložiť disk, pripojiť dátový
a napájací kábel.

Periférie sa aktualizujú pri poruche alebo kvôli výkonu a ergonómii
(ergonomická klávesnica/myš, prispôsobenie používateľom so zdravotným
postihnutím). Ak chýba port, pomôže adaptér alebo USB rozbočovač.

### Zdroj

Po upgrade sa môžu zvýšiť energetické nároky. Na internete sú kalkulačky
výkonu zdroja. Servery môžu mať **dva redundantné zdroje**; chybný zdroj sa
dá vymeniť za chodu, ale treba špeciálnu základnú dosku.

## 12. Bezpečná likvidácia

Funkčné diely sa dajú darovať alebo predať; nefunkčné treba likvidovať
zodpovedne podľa miestnych predpisov.

- **Batérie** — obsahujú kovy vzácnych zemín a ortuť; recyklovať.
- **Monitory** — CRT môžu mať vysoké napätie aj po odpojení; obsahujú sklo,
  kovy, plasty, olovo, bárium a kovy vzácnych zemín. Podľa EPA môže mať
  monitor okolo **1,8 kg olova**.
- **Tonery a kazety** — likvidovať podľa predpisov, ideálne recyklovať;
  dopĺňanie atramentových kaziet sa neodporúča (únik atramentu, strata
  záruky).
- **Chemické rozpúšťadlá a aerosóly** — odovzdať na zbernom mieste; nikdy
  nevylievať do drezu ani kanalizácie.
- **Mobilné telefóny a tablety** — obsahujú ťažké kovy; patria do
  recyklačného programu, nie na skládku.

**Karta bezpečnostných údajov (SDS)**, staršie **MSDS**, sumarizuje
nebezpečné zložky, požiarne riziká, prvú pomoc, reaktivitu, ochranné
opatrenia a postupy pri úniku či likvidácii. V EÚ od **1. júna 2007**
platí nariadenie **REACH** o registrácii, hodnotení, autorizácii a
obmedzovaní chemikálií.

## Otázky na seba

1. Aký je rozdiel medzi BIOSom a UEFI?
2. Čo je POST a ako sa prejaví chyba hardvéru pri štarte?
3. Vysvetli `V = I · R` a `P = V · I`.
4. Aký je rozdiel medzi prepäťovou ochranou, UPS a SPS?
5. Vysvetli pruhovanie, zrkadlenie a paritu v RAID.
6. Aké sú požiadavky na nový CPU pri upgrade?
7. Prečo sa laserová tlačiareň nemá pripájať k UPS?

## Súvisiace

- [[Elektrická bezpečnosť a hardvér PC]] — základy hardvéru a bezpečnosti
- [[Zostavenie PC]] — výber a montáž komponentov
- [[Základná doska]] · [[Pamäte]] · [[Pevné disky]] — referáty
- [[T14 – Architektúra počítača a operačné systémy]] — maturitná téma
