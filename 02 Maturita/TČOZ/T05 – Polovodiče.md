---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T05 – Polovodiče

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> POLOVODIČE – rozdelenie materiálov z hľadiska elektrickej vodivosti, typy polovodičov, typy vodivosti, PN priechod, priebehy signálov po usmernení, usmerňovače, diódy, tyristory, triak, tranzistor

## Rozdelenie materiálov podľa elektrickej vodivosti

Podľa vodivosti rozlišujeme:

- **vodiče** — majú veľa voľných nosičov náboja, malý odpor a dobre vedú prúd; patria sem kovy,
- **izolanty** — elektróny sú silno viazané, vodivosť je veľmi malá; príkladom je sklo alebo plast,
- **polovodiče** — vodivosť leží medzi nimi a výrazne závisí od teploty, osvetlenia a prímesí; typické sú kremík a germánium.

Pri polovodiči sa so zvyšujúcou teplotou zvyšuje počet voľných nosičov, takže odpor má zvyčajne záporný teplotný koeficient. Vodivosť možno riadene meniť dopovaním.

## Typy polovodičov a typy vodivosti

Čistý polovodič je **vlastný (intrinzický)**. V kryštálovej mriežke vznikajú dvojice elektrón–diera. Pridaním prímesi vznikne **prímesový (extrinzický)** polovodič:

- pri type **N** sa pridáva donor s väčším počtom valenčných elektrónov; väčšinovými nosičmi sú elektróny,
- pri type **P** sa pridáva akceptor; vznikajú diery a tie sú väčšinovými nosičmi.

Elektróny aj diery sa pohybujú a vytvárajú prúd. Hovoríme teda o elektrónovej a dierovej vodivosti. Polovodičové súčiastky využívajú aj zmenu vodivosti pôsobením svetla alebo elektrického poľa.

## PN priechod

Spojením materiálu P a N vznikne PN priechod. Na rozhraní sa elektróny a diery rekombinujú a vytvorí sa ochudobnená oblasť bez voľných nosičov. V nej vzniká vnútorné elektrické pole a potenciálová bariéra.

- V **priepustnom smere** je P pripojené na kladný a N na záporný pól. Bariéra sa zmenší a po prekročení približného prahového napätia začne prúd výrazne rásť.
- V **závernom smere** sa ochudobnená oblasť rozšíri a tečie iba malý záverný prúd. Pri prekročení prierazného napätia môže prúd prudko narásť, preto treba prúd obmedziť alebo použiť súčiastku určenú na prieraz.

Voltampérová charakteristika diódy je nelineárna. Reálny prúd približne opisuje Shockleyho rovnica `I = Iₛ(e^(U/(nU_T)) - 1)`, na maturitnej úrovni je však podstatné rozlíšenie priepustného a záverného smeru.

## Usmerňovače a priebehy po usmernení

Usmerňovač mení striedavé napätie na jednosmerné, pulzujúce napätie:

- **jednocestný usmerňovač** prepustí iba jednu polvlnu; na výstupe sú kladné impulzy s frekvenciou siete,
- **dvojcestný stredovo odbočený** využije obe polvlny pomocou dvoch diód,
- **Graetzov mostík** používa štyri diódy; v každej polvlne vedú dve a polarita na záťaži ostáva rovnaká.

Pri sínusovom vstupe je po úplnom usmernení priebeh približne `|sin|`, teda frekvencia zvlnenia je dvojnásobná. Kondenzátor za usmerňovačom sa nabije k vrcholu a medzi vrcholmi sa vybíja do záťaže, čím zmenší zvlnenie. Približne platí `ΔU ≈ I_z/(f_z C)`, kde `f_z` je frekvencia zvlnenia. Za filtrom môže byť stabilizátor.

## Diódy

Dióda je dvojpólová súčiastka s PN priechodom. Typy a použitie:

- usmerňovacia dióda pre napájacie zdroje,
- signálová a rýchla dióda pre malé a rýchle prúdy,
- Zenerova dióda v závernom prieraze na stabilizáciu napätia,
- LED, ktorá pri priepustnom prúde vyžaruje svetlo,
- fotodióda, ktorá mení osvetlenie na prúd,
- Schottkyho dióda s malým priepustným úbytkom a rýchlym spínaním.

## Tyristor, triak a tranzistor

**Tyristor (SCR)** je riadený polovodičový spínač. Po privedení impulzu na hradlo sa pri priepustnom napätí otvorí a zostane vodivý, kým prúd neklesne pod prídržný prúd. Používa sa v regulátoroch výkonu a riadených usmerňovačoch.

**Triak** je obojsmerný riadený prvok pre striedavý prúd, funkčne podobný dvom antiparalelne zapojeným tyristorom. Fázovým riadením možno meniť výkon žiarovky alebo motora, pričom treba rešpektovať rušenie a bezpečné oddelenie od siete.

**Tranzistor** je trojpólová súčiastka na zosilňovanie a spínanie. BJT má emitor, bázu a kolektor; malý bázový prúd riadi väčší kolektorový prúd. MOSFET má gate, source a drain; gate riadi kanál elektrickým poľom a v ustálenom stave odoberá ideálne zanedbateľný prúd. Pri spínaní musí byť zohľadnené napätie, prúd, výkon a chladenie.

## Dôležité hodnoty

| Veličina | Hodnota |
| --- | --- |
| šírka zakázaného pásma kremíka (Si) | ≈ 1,12 eV |
| šírka zakázaného pásma germánia (Ge) | ≈ 0,66 eV |
| prahové napätie diódy Si | ≈ 0,6–0,7 V |
| prahové napätie diódy Ge | ≈ 0,2–0,3 V |
| Schottkyho dióda | ≈ 0,2–0,4 V |
| LED (podľa farby) | ≈ 1,8 V (červená) až 3,3 V (modrá, biela) |

Kremík a germánium majú **4 valenčné elektróny**. Pre typ **N** sa pridáva
prvok s 5 elektrónmi (**fosfor, arzén, antimón**), pre typ **P** prvok s 3
elektrónmi (**bór, gálium, indium**).

## Priebehy po usmernení

| Zapojenie | Počet diód | Frekvencia zvlnenia pri sieti 50 Hz | Vrchol na záťaži |
| --- | --- | --- | --- |
| jednocestné | 1 | 50 Hz | `Um − 0,7 V` |
| dvojcestné so stredným vývodom | 2 | 100 Hz | `Um − 0,7 V` |
| Graetzov mostík | 4 | 100 Hz | `Um − 1,4 V` (vedú 2 diódy) |

Postup napájacieho zdroja: **transformátor** (zníži napätie) →
**usmerňovač** → **filtračný kondenzátor** (vyhladí) → **stabilizátor**
(napr. 7805 alebo Zenerova dióda).

## Riešené príklady

**Zenerov stabilizátor:** vstup `12 V`, Zenerova dióda `5,1 V`, prúd `20 mA`.
Predradný rezistor `R = (12 − 5,1) / 0,02 = 345 Ω` → zvolím 330 Ω.

**Tranzistor NPN ako spínač relé:** relé potrebuje `Ic = 100 mA`, zosilnenie
`β = 100`, riadi sa z pinu `5 V`.

- najmenší prúd bázy `Ib = Ic / β = 1 mA`; s rezervou na istú saturáciu `≈ 3 mA`
- `R_B = (5 − 0,7) / 0,003 ≈ 1,4 kΩ` → zvolím 1,2 kΩ
- paralelne k cievke relé patrí **ochranná dióda** v závernom smere, ktorá
  zachytí napäťovú špičku pri vypnutí

## Režimy tranzistora

| Režim | Stav | Použitie |
| --- | --- | --- |
| nevodivý (*cut-off*) | bázou netečie prúd, `Ic ≈ 0` | spínač vypnutý |
| aktívny | `Ic = β · Ib` | zosilňovač |
| saturácia | tranzistor plne otvorený, `U_CE` malé | spínač zapnutý |

Typy: **bipolárne** NPN a PNP (riadené prúdom) a **unipolárne** JFET a
MOSFET (riadené napätím). V značke NPN šípka emitora smeruje **von**.

## Krátka ústna odpoveď

Polovodiče majú vodivosť medzi vodičmi a izolantmi a možno ju meniť dopovaním. Typ N vedie najmä elektrónmi, typ P dierami; ich spojením vznikne PN priechod. Dióda vedie v priepustnom smere, v závernom takmer nie, pričom diódy tvoria jednocestné, dvojcestné a mostíkové usmerňovače. Po usmernení dostaneme pulzujúce napätie a kondenzátor zmenší zvlnenie. Tyristor a triak sú riadené výkonové spínače a tranzistor sa používa ako zosilňovač alebo elektronický spínač.

Dióda usmerňuje; jednocestný usmerňovač využije jednu polvlnu, mostíkový obe. Filtračný kondenzátor vyhladzuje zvlnenie. Zenerova dióda stabilizuje napätie v závernom prieraze, LED mení energiu na svetlo. Tranzistor je spínač alebo zosilňovač (BJT: báza, kolektor, emitor; MOSFET: gate, drain, source). Tyristor sa po zapnutí drží vodivý, triak spína obe polarity striedavého prúdu.

## Kontrolné otázky

> [!question]- Ako rozdeľujeme materiály podľa vodivosti?
> Vodiče (kovy, veľa voľných elektrónov), izolanty (sklo, plast), polovodiče
> (Si, Ge) – vodivosť medzi nimi, rastie s teplotou a dopovaním.

> [!question]- Ako vznikne polovodič typu N a P?
> N: dopovanie 5-mocným prvkom (fosfor, arzén), väčšinové nosiče elektróny.
> P: 3-mocným prvkom (bór, gálium), väčšinové nosiče diery.

> [!question]- Čo sa deje na PN priechode v priepustnom a závernom smere?
> Priepustný (+ na P): bariéra sa zúži, nad ~0,7 V (Si) tečie prúd. Záverný:
> ochudobnená oblasť sa rozšíri, tečie len malý záverný prúd až po prieraz.

> [!question]- Porovnaj jednocestný a mostíkový usmerňovač.
> Jednocestný (1 dióda) prepustí jednu polvlnu, zvlnenie 50 Hz. Graetzov
> mostík (4 diódy) využije obe polvlny, zvlnenie 100 Hz, ľahšie sa filtruje.

> [!question]- Na čo slúži Zenerova dióda?
> Pracuje v závernom prieraze a drží stále napätie – stabilizácia napätia.

> [!question]- Aký je rozdiel medzi tyristorom a triakom?
> Tyristor vedie len jedným smerom a po zapálení hradlom ostane vodivý, kým
> prúd neklesne pod prídržný. Triak vedie oboma smermi – striedavý prúd
> (stmievače, regulácia motorov).

> [!question]- Ako funguje tranzistor ako spínač?
> Malý prúd bázy (BJT) alebo napätie na gate (MOSFET) otvorí tranzistor do
> saturácie a cez kolektor tečie veľký prúd záťaže. Bez riadenia je zatvorený.
