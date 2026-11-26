---
title: "Kombinatorika"
predmet: "Matematika"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
dátum: 2026-10-26
zdroj: "EduPage – matematika, 26. 10. – 18. 11. 2026 (tabuľa a pracovné listy)"
tags:
  - "matematika"
  - "kombinatorika"
  - "poznámky"
  - "cvičenie"
aktualizované: 2026-11-26
---

# Kombinatorika

> [!info] Zdroj
> Tabuľa z hodín 26. 10., 27. 10., 4. 11. a 18. 11. 2026 a dokumenty
> `PERMUTÁCIE.docx`, `Variácia bez opakovania – skratena forma.docx`,
> `Variácie s opakovanim.docx`, `Kombinácie bez opakovania – skratena f.docx`
> a `Kombinarorika , aj faktorial PL.docx` (rovnaký list aj ako úlohy na
> písomku). Originály by patrili do `99 Zdroje/docx/`. Súvisí s pojmami
> [[Variácie]], [[Permutácie]], [[Kombinácie]] a [[Faktoriál]].

## Rozdelenie

Na poradí **záleží** pri variáciách a permutáciách, na poradí **nezáleží** pri kombináciách.

| Typ | Bez opakovania | S opakovaním |
| --- | --- | --- |
| [[Variácie]] $k$-tej triedy z $n$ prvkov | $V_k(n) = n(n-1)\cdots(n-k+1)$ | $V'_k(n) = n^k$ |
| [[Permutácie]] ($k = n$) | $P(n) = n!$ | $P'(n) = n! / (k_1! \cdots k_r!)$ |
| [[Kombinácie]] $k$-tej triedy z $n$ prvkov | $C_k(n) = n! / \bigl((n-k)! \, k!\bigr)$ | v tomto polroku sa preberali predovšetkým bez opakovania |

Pri variáciách a kombináciách bez opakovania musí byť $n \ge k$. Platí $0! = 1$.

### Príklady typov z hodín

- Osem farieb, päť políčok bez opakovania: $V_5(8) = 8 \cdot 7 \cdot 6 \cdot 5 \cdot 4 = 6720$. S opakovaním: $8^5$.
- Z 28 žiakov IV.IST vybrať predsedu, podpredsedu a pokladníka: $V_3(28) = 28 \cdot 27 \cdot 26$.
- Z 28 žiakov vybrať štvoricu na súťaž (poradie nerátame): $C_4(28) = 28! / (24! \, 4!)$.
- Päť farieb na siedmich políčkach s opakovaním: $V'_7(5) = 5^7$.
- Osem pretekárov na ôsmich dráhach: $P(8) = 8!$.
- Číslice $2,2,3,7,7$: $P'(5) = 5! / (2! \, 1! \, 2!)$.

## Slovné úlohy (pracovný list aj tabuľa 18. 11.)

Výsledky sú z vypracovaného listu; pri úlohe 9 učiteľka na fotke opravila zadanie.

1. Kód na bicyklový zámok, tri rady po desiatich čísliciach: $V'_3(10) = 10^3 = 1000$.
2. Štvorica z 33 výkresov: $C_4(33) = 40\,920$.
3. Šesťciferné čísla s opakovaním z číslic $1$ až $9$: $V'_6(9) = 9^6 = 531\,441$. (Výpočet $10^6 - 10^5$ by zahŕňal nulu a na liste je označený ako nesprávny.)
4. Päť kamarátov do jedného radu v kine: $P(5) = 5! = 120$.
5. Z 18 dievčat a 10 chlapcov skupina troch dievčat a jedného chlapca: $C_3(18) \cdot C_1(10) = 8160$.
6. Slová (aj nezmyselné) z písmen slova *ABRAKADABRA* ($n=11$, A päťkrát, B a R dvakrát): $P'(11) = 11! / (5! \, 2! \, 2!) = 83\,160$.
7. Päťciferné čísla z číslic $3,3,5,5,5$: $P'(5) = 5! / (2! \, 3!) = 10$.
8. Z mesta A do C cez B, 5 ciest A–B a 6 ciest B–C: $5 \cdot 6 = 30$.
9. Poznávacie značky. Pôvodné znenie listu: 3 písmená (24) a 2 čísla (10). Na tabuli učiteľka opravila na **4 písmená a 3 čísla**: $V'_4(24) \cdot V'_3(10) = 24^4 \cdot 10^3 = 331\,776\,000$.
10. Štvorciferné čísla bez opakovania z číslic $0$ až $9$: $V_4(10) - V_3(9) = 10\cdot9\cdot8\cdot7 - 9\cdot8\cdot7 = 4536$ (odčítajú sa zápisy s nulou na začiatku, ktoré nie sú štvorciferné).
11. Pár chlapec–dievča z 7 chlapcov a 9 dievčat: $7 \cdot 9 = 63$.

Ďalšie úlohy z tabule 26. a 27. 10.:

- 18 chlapcov a 12 dievčat, pár chlapec–dievča: $18 \cdot 12 = 216$.
- PIN zo štyroch číslic: $10^4 = 10\,000$.
- Z A do C cez B, 4 a 5 ciest: $4 \cdot 5 = 20$.
- Heslo z 8 znakov pri 64 povolených znakoch: $64^8$.
- ŠPZ v tvare dve písmená (24) a tri čísla: $24 \cdot 24 \cdot 10 \cdot 10 \cdot 10 = 576\,000$.
- Družstvo na 4 posty z 10 hráčov: $10 \cdot 9 \cdot 8 \cdot 7$.
- Číslice $1$ až $9$: trojciferné bez opakovania $9\cdot8\cdot7 = 504$; štvorsciferné s opakovaním $9^4$; šesťciferné s opakovaním deliteľné piatimi (posledná cifra iba $5$) $9^5$; desatciferné bez opakovania z deviatich číslic sa nedajú zostaviť.

## Rovnice na typ kombinatoriky (z listu)

Tieto úlohy list uvádza bez výsledku (iba text zadania):

- Variácií z $n$ prvkov druhej triedy bez opakovania je $650$. Koľko je prvkov?
- Ak sa zväčší počet prvkov o $2$, zväčší sa počet permutácií $30$-krát. Koľko je prvkov?
- Ak zväčšíme počet prvkov o jeden, zväčší sa počet kombinácií druhej triedy bez opakovania o $21$. Koľko je prvkov?
- Kombinácií z $n$ prvkov druhej triedy je $120$. Koľko je prvkov?

Teoretické listy obsahujú aj ďalšie vyriešené príklady (permutácie slova *PRAHA* = $60$, *MISSISSIPPI* = $34\,650$, *MATEMATIKA* = $151\,200$; šesť lístkov z urny $6! = 720$; sedem detí v rade $7! = 5040$).

## Súvisiace

- [[Variácie]] · [[Permutácie]] · [[Kombinácie]] · [[Faktoriál]]
- [[Faktoriál – úpravy a rovnice]]
- [[Matematika]] — predmet

> [!info] Naposledy aktualizované
> 2026-11-26 — Poznámky z matematiky – postupnosti a kombinatorika (1. polrok 2026/27)
