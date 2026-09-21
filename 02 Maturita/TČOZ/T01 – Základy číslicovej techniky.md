---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T01 – Základy číslicovej techniky

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> ZÁKLADY ČÍSLICOVEJ TECHNIKY – binárny kód, kombinačné a sekvenčné logické obvody, klopné obvody, číselné sústavy

## Úvod a význam číslicovej techniky

Číslicová technika spracúva informácie v diskrétnych stavoch. V praxi sa najčastejšie používajú dva logické stavy: `0` a `1`. Fyzicky ich môže reprezentovať napríklad nízke a vysoké napätie, pričom presné napäťové úrovne závisia od použitej logickej rodiny. **Bit** je najmenšia jednotka informácie, osem bitov tvorí bajt. Z takýchto bitov sa skladajú kódy, pamäte, procesory aj komunikačné rámce.

## Binárny kód

Binárny kód priraďuje údajom postupnosti núl a jednotiek. Treba rozlišovať hodnotu bitového čísla od kódu, ktorý iba reprezentuje inú informáciu:

- čisté binárne číslo vyjadruje číselnú hodnotu v sústave so základom 2,
- **BCD** kóduje každú desiatkovú číslicu samostatne štyrmi bitmi; číslo `59` je `0101 1001`, nie binárny zápis `111011`,
- znakové kódy, napríklad ASCII alebo Unicode, priraďujú bitové hodnoty znakom,
- pri prenose a ukladaní sa môžu pridávať kontrolné bity na odhalenie alebo opravu chyby.

Pri digitálnych obvodoch logické operácie realizujú hradlá. Základné hradlá sú AND, OR a NOT; často sa používajú aj XOR, NAND a NOR. NAND a NOR sú univerzálne, pretože pomocou jedného typu hradla možno zostaviť ľubovoľnú logickú funkciu.

## Číselné sústavy a prevody

V pozičnej sústave so základom `b` má číslica na pozícii `i` váhu `b^i`. Pre celé číslo platí

`N = aₙ·bⁿ + aₙ₋₁·bⁿ⁻¹ + ... + a₁·b + a₀`.

Najčastejšie sústavy sú binárna (2), osmičková (8), desiatková (10) a šestnástková (16), v ktorej číslice 10 až 15 zapisujeme `A` až `F`.

Príklady:

- `10110₂ = 1·16 + 0·8 + 1·4 + 1·2 + 0·1 = 22₁₀`,
- `3A₁₆ = 3·16 + 10 = 58₁₀`,
- desiatkové číslo na binárne prevedieme opakovaným delením dvoma a zapisovaním zvyškov zdola nahor,
- binárne číslo na šestnástkové rozdelíme sprava do štvoríc bitov; `0011 1010₂ = 3A₁₆`,
- zlomková časť sa prevádza opakovaným násobením základom; `0,01₂ = 0·2⁻¹ + 1·2⁻² = 0,25₁₀`.

Pri zápise so znamienkom sa používa napríklad dvojkový doplnok. Pri `n` bitoch je rozsah `-2ⁿ⁻¹` až `2ⁿ⁻¹ - 1`; pri pretečení sa výsledok nezmestí do prideleného počtu bitov.

## Kombinačné logické obvody

Výstup kombinačného obvodu závisí iba od aktuálnej kombinácie vstupov, nie od minulosti. Správanie sa opisuje pravdivostnou tabuľkou, logickým výrazom alebo schémou hradiel. Príklady:

- **sčítačka** sčíta bity; úplná sčítačka má vstupy `A`, `B`, `Cin` a výstupy súčet `S` a prenos `Cout`,
- **dekodér** prevedie binárny kód na aktiváciu jedného z výstupov,
- **enkodér** vykonáva opačný smer prevodu,
- **multiplexor** vyberie jeden z viacerých vstupov podľa riadiacich bitov,
- **demultiplexor** vedie jeden vstup na vybraný výstup,
- komparátor porovnáva dve binárne hodnoty.

Napríklad pre AND platí `Y = A · B`, takže výstup je `1` iba vtedy, keď sú `A` aj `B` rovné `1`. Kombinačné obvody nemajú pamäťový prvok ani hodinový signál.

## Sekvenčné logické obvody

Pri sekvenčnom obvode závisí výstup od aktuálnych vstupov aj od predchádzajúceho stavu. Obsahuje pamäť a často pracuje so synchronizačným hodinovým signálom. Stav sa môže meniť:

- synchrónne na nábežnej alebo zostupnej hrane hodinového signálu,
- asynchrónne okamžite po zmene riadiaceho vstupu,
- pomocou spätných väzieb, ktoré uchovávajú informáciu.

Medzi sekvenčné obvody patria registre, čítače, posuvné registre a klopné obvody. Pri návrhu treba zohľadniť čas nastavenia (*setup time*), čas podržania (*hold time*) a oneskorenie šírenia.

## Klopné obvody

Klopný obvod (*flip-flop*) uchováva jeden bit. Základné typy možno opísať takto:

| Typ | Funkcia pri aktívnej hrane hodín |
|---|---|
| SR | `S` nastaví `Q=1`, `R` vynuluje `Q=0`; zakázaná kombinácia závisí od realizácie |
| D | na ďalšej hrane sa do `Q` uloží hodnota `D`, teda `Q(next)=D` |
| JK | `J=1,K=0` nastaví, `J=0,K=1` vynuluje, `J=K=1` preklopí stav |
| T | pri `T=0` stav drží, pri `T=1` sa preklopí |

D-klopný obvod je vhodný do registrov, T-klopné obvody do čítačov a JK obvod odstraňuje zakázaný stav klasického SR obvodu. Viac klopných obvodov vytvorí register; kaskádou možno vytvoriť binárny čítač. Hranou riadený obvod treba odlíšiť od transparentnej západky, ktorá môže sledovať vstup počas aktívnej úrovne hodín.

## Krátka ústna odpoveď

Číslicová technika pracuje s diskrétnymi bitmi a binárnymi kódmi. Čísla možno prevádzať medzi binárnou, osmičkovou, desiatkovou a šestnástkovou sústavou pomocou pozičných váh. Kombinačné obvody, napríklad sčítačky a multiplexory, nemajú pamäť a výstup určujú iba aktuálne vstupy. Sekvenčné obvody pamäť majú a používajú hodinový signál; ich základom sú SR, D, JK a T klopné obvody, z ktorých sa skladajú registre a čítače.
