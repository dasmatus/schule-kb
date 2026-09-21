---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T25 – Tvorba grafických rozhraní

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> TVORBA GRAFICKÝCH ROZHRANÍ - druhy grafických prostredí, vývojové prostredie v režime tvorby aplikácie, základné komponenty, základné udalosti, transportná a relačná vrstva modelu OSI

## Druhy grafických prostredí

Grafické používateľské rozhranie (GUI) umožňuje ovládať aplikáciu oknami, tlačidlami, ponukami a formulármi. **Desktopové** GUI beží v operačnom systéme a používa jeho okná a súbory, **webové** sa vykresľuje v prehliadači a komunikuje so serverom a **mobilné** je prispôsobené dotyku, menšej obrazovke a senzorom. Všetky sú zvyčajne udalosťami riadené: používateľská akcia vyvolá obsluhu udalosti.

Pri návrhu treba myslieť na prístupnosť, čitateľnosť, konzistentné rozloženie, lokalizáciu, validáciu a oddelenie používateľského rozhrania od logiky aplikácie.

## Vývojové prostredie v režime tvorby aplikácie

IDE alebo GUI framework často ponúka návrhový režim (*designer*). Vývojár vyberie komponent z palety, umiestni ho na formulár, nastaví vlastnosti a priradí udalosti. Strom komponentov opisuje vnorenie a layout manager určuje, ako sa prvky prispôsobia veľkosti okna. Zdrojový režim obsahuje logiku handlerov, dát a volaní služieb; generovaný súbor sa nemá ručne upravovať, ak to framework nepredpokladá.

Bežný cyklus je návrh → nastavenie vlastností → pripojenie udalostí → zostavenie → spustenie v debug režime → test validácie a chybových stavov. GUI vlákno sa nemá blokovať dlhým sieťovým alebo súborovým výpočtom; taká úloha patrí do asynchrónnej operácie.

## Základné komponenty

- okno/formulár a kontajnery (panel, group box, layout),
- label/textový popis,
- textové pole a viacriadkový editor,
- tlačidlo a odkaz,
- zaškrtávacie políčko a prepínač/radio button,
- combo box, zoznam a tabuľka,
- menu, toolbar, stavový riadok a dialóg,
- progress bar, obrázok a notifikačné prvky.

Komponent má identifikátor, text, veľkosť, pozíciu, viditeľnosť a povolenie; tabuľka má navyše model dát a výber riadku. Vlastnosti nastavujeme tak, aby komponenty boli použiteľné klávesnicou aj čítačkou obrazovky.

## Základné udalosti

Udalosť môže byť kliknutie, načítanie formulára, zmena textu alebo výberu, stlačenie/uvolnenie klávesu, pohyb/kliknutie myšou, zatvorenie okna alebo zmena veľkosti. Handler udalosti:

1. prečíta vstup,
2. overí formát a rozsah,
3. zavolá aplikačnú logiku,
4. zobrazí výsledok alebo zrozumiteľnú chybu.

Pri opakovanom pripojení handlera môže jedno kliknutie spustiť logiku viackrát, preto treba životný cyklus udalostí kontrolovať.

## Transportná a relačná vrstva OSI

**Transportná vrstva** poskytuje komunikáciu proces–proces. TCP vytvára spojenie, čísluje segmenty, potvrdzuje prijatie, riadi tok a pri strate opakuje dáta; UDP je bezspojový datagramový transport s menšou réžiou, ale bez zabudovanej spoľahlivosti. Porty rozlišujú aplikácie na jednom hostiteľovi. GUI klient môže napríklad odoslať HTTP požiadavku cez TCP alebo použiť UDP pre časovo citlivé dáta.

**Relačná vrstva** OSI vytvára, udržiava, synchronizuje a ukončuje logickú reláciu medzi aplikáciami; môže používať kontrolné body a obnovu. V praktickom TCP/IP modeli sa jej funkcie často spájajú s aplikačnou vrstvou a rieši ich konkrétny protokol alebo framework. Neznamená to, že relácia neexistuje, iba nie je vždy samostatná vrstva.

## Krátka ústna odpoveď

GUI môže byť desktopové, webové alebo mobilné a pracuje udalosťami. V návrhovom režime IDE rozmiestňujem komponenty, nastavujem vlastnosti a pripájam handlery; základom sú okná, labely, textové polia, tlačidlá, voľby, zoznamy a tabuľky. Udalosti sú napríklad kliknutie, zmena textu, kláves alebo zatvorenie. Transportná vrstva rieši komunikáciu procesov pomocou TCP/UDP a portov, relačná vrstva správu relácie; v TCP/IP sa často spájajú do aplikačnej vrstvy.
