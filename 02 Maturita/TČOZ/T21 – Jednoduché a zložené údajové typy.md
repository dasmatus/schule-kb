---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T21 – Jednoduché a zložené údajové typy

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> JEDNODUCHÉ A ZLOŽENÉ ÚDAJOVÉ TYPY - reťazce, klasické pole, vytvorenie poľa z hľadiska pamäte, úložiská údajov, kolekcie, kontajnery, DualStack

## Jednoduché údajové typy a reťazce

Jednoduchý (primitívny) typ reprezentuje jednu hodnotu a určuje jej veľkosť, rozsah a povolené operácie. Patria sem celé čísla, desatinné čísla, znak a logická hodnota `boolean`. Treba rozlišovať rozsah typu, pretečenie a presnosť desatinných čísel; peniaze sa preto často ukladajú ako celé najmenšie jednotky alebo desatinný typ s definovanou presnosťou.

**Reťazec** je postupnosť znakov. V moderných jazykoch môže byť uložený ako objekt s dĺžkou a kódovaním Unicode. Operácie sú dĺžka, indexovanie, spájanie, vyhľadanie podreťazca, porovnanie, nahradenie a rozdelenie. Reťazec je často nemenný, takže opakované spájanie v cykle môže vytvárať mnoho dočasných objektov; vhodný je builder alebo kolekcia. Pri vstupe treba rozlišovať prázdny reťazec, biele znaky a kódovanie.

## Klasické pole

Klasické pole je súvislý blok prvkov rovnakého typu, ku ktorým pristupujeme indexom. Pri nulovom indexovaní má pole dĺžky `n` platné indexy `0` až `n-1`; prístup mimo hraníc je chyba. Výhodou je `O(1)` prístup podľa indexu a dobrá lokalita v pamäti, nevýhodou pevná veľkosť a nákladné vloženie uprostred.

### Vytvorenie poľa z hľadiska pamäte

Pri vytvorení sa rezervuje súvislý priestor pre `n` prvkov a vypočíta sa adresa prvku približne `adresa(A[i]) = základ + i·veľkosť_prvku`. Statické pole môže byť súčasťou zásobníka alebo dátovej oblasti, dynamicky vytvorené pole býva na halde a premenná drží referenciu; presné umiestnenie závisí od jazyka a runtime. Inicializácia nastaví prvky na predvolené hodnoty alebo na zadané hodnoty. Pri veľkom poli treba sledovať pamäť a životnosť objektu.

## Úložiská údajov, kolekcie a kontajnery

Údaje môžu byť uložené v operačnej pamäti, v textových/binárnych súboroch, v relačnej alebo dokumentovej databáze, na blokovom úložisku alebo v objektovom úložisku. Rozhoduje sa podľa trvácnosti, objemu, rýchlosti, súbežného prístupu, zálohovania a konzistencie.

Kolekcie flexibilnejšie spravujú viac prvkov:

- zoznam (`List`) zachováva poradie a umožňuje duplicity,
- množina (`Set`) udržiava jedinečné prvky a rýchlo testuje členstvo,
- mapa/slovník (`Dictionary`, `Map`) spája kľúč s hodnotou,
- front (`Queue`) pracuje FIFO, zásobník (`Stack`) LIFO.

Kontajner môže znamenať dátovú štruktúru, ale v prevádzke aplikácií aj izolované prostredie s programom a závislosťami (napr. kontajnerová platforma). Význam treba vyvodiť z kontextu; v tejto téme ide o oba bežné významy.

## Dual Stack

Dual Stack prevádzkuje IPv4 aj IPv6 súčasne na rovnakom zariadení a rozhraní. DNS môže vrátiť `A` aj `AAAA`; hostiteľ sa pokúsi použiť IPv6 a pri zlyhaní môže použiť IPv4 podľa algoritmu operačného systému. Sieť preto potrebuje adresy, routing, firewall a monitorovanie pre oba protokoly. Dual Stack uľahčuje postupný prechod, ale dočasne zdvojuje konfiguráciu a bezpečnostné pravidlá.

## Krátka ústna odpoveď

Jednoduché typy uchovávajú jednu hodnotu, reťazec je postupnosť znakov a klasické pole je súvislý blok rovnakých prvkov s indexom od nuly. Pri vytvorení poľa sa rezervuje súvislá pamäť a treba kontrolovať hranice. Kolekcie zahŕňajú zoznam, množinu, mapu, front a zásobník; úložisko môže byť pamäť, súbor alebo databáza. Dual Stack znamená súčasnú prevádzku IPv4 a IPv6.
