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

$$ N = aₙ·bⁿ + aₙ₋₁·bⁿ⁻¹ + ... + a₁·b + a₀ $$.

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

## Riešené príklady prevodov

**Desiatková → binárna** (delenie dvoma, zvyšky čítame zdola nahor), číslo `45`:

| Delenie | Podiel | Zvyšok |
| --- | --- | --- |
| 45 : 2 | 22 | 1 |
| 22 : 2 | 11 | 0 |
| 11 : 2 | 5 | 1 |
| 5 : 2 | 2 | 1 |
| 2 : 2 | 1 | 0 |
| 1 : 2 | 0 | 1 |

`45₁₀ = 101101₂`. Kontrola: `32 + 8 + 4 + 1 = 45`.

- **Binárna → osmičková:** trojice bitov sprava, `101 101₂ = 55₈` (`5·8 + 5 = 45`).
- **Binárna → šestnástková:** štvorice sprava, `0010 1101₂ = 2D₁₆` (`2·16 + 13 = 45`).
- **Binárne sčítanie:** `1011 + 0110 = 10001` (11 + 6 = 17). Pravidlá: `0+0=0`, `0+1=1`, `1+1=10` (zapíšem 0, prenos 1), `1+1+1=11`.
- **Dvojkový doplnok** čísla `−5` v 8 bitoch: `00000101` → invertujem `11111010` → pripočítam 1 → `11111011`.

## Logické hradlá a Booleova algebra

| A | B | AND | OR | NAND | NOR | XOR |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 |

NOT má jeden vstup a výstup neguje (`Y = ¬A`).

Pravidlá na zjednodušovanie výrazov:

- `A + 0 = A`, `A · 1 = A`, `A + 1 = 1`, `A · 0 = 0`
- `A + A = A`, `A · A = A`, `A + ¬A = 1`, `A · ¬A = 0`
- **De Morganove zákony:** `¬(A · B) = ¬A + ¬B` a `¬(A + B) = ¬A · ¬B`
- príklad: `A·B + A·¬B = A·(B + ¬B) = A·1 = A`

Na grafické zjednodušenie funkcie 3–4 premenných slúži **Karnaughova mapa**:
susedné jednotky sa združujú do skupín po 1, 2, 4 alebo 8 a z každej skupiny
ostanú len premenné, ktoré sa v nej nemenia.

## Sčítačky

- **Polovičná sčítačka:** `S = A ⊕ B`, `C = A · B` (nepočíta s prenosom zo
  zvyšku čísla).
- **Úplná sčítačka:** `S = A ⊕ B ⊕ Cin`, `Cout = A·B + Cin·(A ⊕ B)`.
  Zreťazením `n` úplných sčítačiek vznikne `n`-bitová sčítačka.

## Čítače a registre

- `n` klopných obvodov tvorí čítač, ktorý napočíta `0` až `2ⁿ − 1`
  (3 klopné obvody → 0 až 7, čítač modulo 8).
- **Asynchrónny čítač:** výstup jedného klopného obvodu taktuje ďalší; je
  jednoduchý, ale oneskorenia sa sčítavajú.
- **Synchrónny čítač:** všetky klopné obvody majú spoločné hodiny, je rýchlejší.
- **Posuvný register** posúva bity o jednu pozíciu na každú hranu hodín;
  používa sa pri sériovo-paralelnom prevode (napr. UART, SPI).
- Základný **SR obvod z hradiel NOR** má zakázaný stav `S = R = 1`; pri
  hradlách NAND sú vstupy aktívne v nule.

## Krátka ústna odpoveď

Číslicová technika pracuje s diskrétnymi bitmi a binárnymi kódmi. Čísla možno prevádzať medzi binárnou, osmičkovou, desiatkovou a šestnástkovou sústavou pomocou pozičných váh. Kombinačné obvody, napríklad sčítačky a multiplexory, nemajú pamäť a výstup určujú iba aktuálne vstupy. Sekvenčné obvody pamäť majú a používajú hodinový signál; ich základom sú SR, D, JK a T klopné obvody, z ktorých sa skladajú registre a čítače.

## Kontrolné otázky

> [!question]- Preveď 45₁₀ do dvojkovej, osmičkovej a šestnástkovej sústavy.
> `101101₂`, `55₈`, `2D₁₆`.

> [!question]- Aký je rozdiel medzi kombinačným a sekvenčným obvodom?
> Výstup kombinačného obvodu závisí len od aktuálnych vstupov, nemá pamäť ani
> hodiny (sčítačka, multiplexor). Sekvenčný obvod má pamäť, výstup závisí aj od
> predchádzajúceho stavu (klopné obvody, čítače, registre).

> [!question]- Prečo sú NAND a NOR univerzálne hradlá?
> Z jedného typu (len NAND alebo len NOR) sa dá poskladať ľubovoľná logická
> funkcia vrátane NOT, AND a OR.

> [!question]- Napíš De Morganove zákony.
> `¬(A·B) = ¬A + ¬B` a `¬(A+B) = ¬A · ¬B`.

> [!question]- Ako sa správa JK klopný obvod pri J = K = 1?
> Na každú aktívnu hranu hodín preklopí výstup na opačnú hodnotu.

> [!question]- Čo je BCD a ako zapíšeš 59?
> Každá desiatková číslica sa kóduje štyrmi bitmi: `0101 1001`.

> [!question]- Ako zapíšeš −5 v 8-bitovom dvojkovom doplnku?
> `00000101` → invertovať `11111010` → +1 → `11111011`.

> [!question]- Koľko stavov má čítač z 3 klopných obvodov?
> `2³ = 8` stavov, počíta 0 až 7.
