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

## Krátka ústna odpoveď

Polovodiče majú vodivosť medzi vodičmi a izolantmi a možno ju meniť dopovaním. Typ N vedie najmä elektrónmi, typ P dierami; ich spojením vznikne PN priechod. Dióda vedie v priepustnom smere, v závernom takmer nie, pričom diódy tvoria jednocestné, dvojcestné a mostíkové usmerňovače. Po usmernení dostaneme pulzujúce napätie a kondenzátor zmenší zvlnenie. Tyristor a triak sú riadené výkonové spínače a tranzistor sa používa ako zosilňovač alebo elektronický spínač.

Dióda usmerňuje; jednocestný usmerňovač využije jednu polvlnu, mostíkový obe. Filtračný kondenzátor vyhladzuje zvlnenie. Zenerova dióda stabilizuje napätie v závernom prieraze, LED mení energiu na svetlo. Tranzistor je spínač alebo zosilňovač (BJT: báza, kolektor, emitor; MOSFET: gate, drain, source). Tyristor sa po zapnutí drží vodivý, triak spína obe polarity striedavého prúdu.
