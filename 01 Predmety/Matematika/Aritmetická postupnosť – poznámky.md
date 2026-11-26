---
title: "Aritmetická postupnosť – poznámky"
predmet: "Matematika"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
dátum: 2026-09-28
zdroj: "EduPage – matematika, 28. 9. – 5. 10. 2026 (tabuľa)"
tags:
  - "matematika"
  - "postupnosti"
  - "poznámky"
  - "cvičenie"
aktualizované: 2026-11-26
---

# Aritmetická postupnosť – poznámky

> [!info] Zdroj
> Tabuľa z hodín 28. 9., 29. 9., 30. 9. a 5. 10. 2026 (Katarína Bašková). Pojem: [[Aritmetická postupnosť]].

## Vzorce

$$a_{n+1} = a_n + d, \qquad d = a_{n+1}-a_n \text{ (diferencia)}$$

$$a_n = a_1 + (n-1)d, \qquad a_k = a_n + (k-n)d$$

$$s_n = \frac{n}{2}(a_1 + a_n)$$

Príklady posunu indexov z tabule: $a_{27} = a_1 + 26d$, $a_{102} = a_{100} + 2d$, $a_{77} = a_1 + 76d$, $a_{666} = a_{66} + 600d$.

## Členy a diferencia

1. $a_1 = -4$, $d = 2$ dáva $-4,\ -2,\ 0,\ 2,\ 4$.
2. $a_1 = -5/6$, $d = 7/6$ dáva $-\tfrac56,\ \tfrac26,\ \tfrac32,\ \tfrac83,\ \tfrac{23}{6}$.
3. $a_5 = 0$, $a_4 = -2/3$, teda $d = -2/3$. Postupnosť končí $\dots,\ \tfrac83,\ 2,\ \tfrac43,\ \tfrac23,\ 0$.
4. $a_3 = 8$, $d = -3$. Z $a_5 = a_3 + 2d$ je $a_5 = 2$. Členy: $14,\ 11,\ 8,\ 5,\ 2$.
5. $a_3 = 126$, $a_{10} = 146$. Z $a_{10} = a_3 + 7d$ je $d = 10$, $a_1 = 56$, $a_9 = 136$.
6. $1,\ 3,\ 5,\ 7,\ \dots$ je AP s $a_1 = 1$, $d = 2$.
7. $90,\ 80,\ 70,\ \dots$ je AP s $a_1 = 90$, $d = -10$. Overenie: $a_{11} = 90 + 10\cdot(-10) = -10$.
8. Dané $a_{11} = -10$, $a_5 = 50$. Z $a_{11} = a_5 + 6d$ je $d = -10$, z $a_5 = a_1 + 4d$ je $a_1 = 90$ a $a_{27} = a_{11} + 16d = -170$.

## Sústavy

**Sústava 1.** $a_2 + a_6 = 32$, $a_4 + a_5 = 36$.

$$2a_1 + 6d = 32, \qquad 2a_1 + 7d = 36 \Rightarrow d = 4,\ a_1 = 4.$$

Členy: $4,\ 8,\ 12,\ 16,\ 20,\ 24$.

**Sústava 2.** $a_2 + a_5 - a_3 = 10$, $a_4 + a_6 = 17$.

$$a_1 + 3d = 10, \qquad 2a_1 + 5d = 17 \Rightarrow d = 3,\ a_1 = 1.$$

Členy: $1,\ 4,\ 7,\ 10,\ 13,\ 16$.

**Sústava 3.** $a_{47} = 64$, $a_{74} = 47$. Z $a_{74} = a_{47} + 27d$ je $d = -17/27$ a $a_1 = a_{47} - 46d$.

**Sústava 4.** $a_1 + a_7 = 42$ a $a_{10} - 21 = a_3$ dáva $d = 3$, $a_1 = 12$.

**Sústava 5.** $a_2 + a_4 = 7$, $a_6 + a_8 = 23$. Potom $d = 2$, $a_2 = 3/2$, $a_3 = 7/2$, $a_7 = 23/2$ a $a_3 + a_7 = 15$.

## Ďalšie úlohy z tabule

- $a_1 = 4$, $d = -5$. Člen $a_n = -121$ nastane pri $n = 26$. Člen $-53$ v tejto AP nie je (vyšlo by necelé $n$).
- Medzi čísla $-5$ a $1$ vložiť štyri členy tak, aby vznikla AP: $a_1 = -5$, $a_6 = 1$, $d = 6/5$. Vložené členy sú $-\tfrac{19}{5},\ -\tfrac{13}{5},\ -\tfrac{7}{5},\ -\tfrac{1}{5}$.
- Pravouhlý trojuholník, v ktorom strany tvoria AP a dlhšia odvesna meria $12\,\mathrm{cm}$: strany sú $9,\ 12,\ 15$ ($d = 3$), obsah $S = 54$.

## Súčet členov

**Úloha.** $s_n = 245$, $a_n = 47$, $d = 5$. Z $47 = a_1 + (n-1)\cdot 5$ a zo vzorca pre $s_n$ vyšlo $a_1 = 2$, $n = 10$.

**Úloha.** $a_1 = 1$, $d = 1$, $s_{100} = ?$

$$s_{100} = \frac{100}{2}(1+100) = 5050.$$

**Úloha.** $a_1 = 5$, $d = 7$, $s_{44} = ?$

$$s_{44} = \frac{44}{2}\bigl(5 + 5 + 43\cdot 7\bigr) = 22 \cdot 311 = 6842.$$

**Úloha.** $a_1 = 5$, $d = 7$, $s_n = 182$. Z $s_n = n/2 \cdot (10 + (n-1)\cdot 7)$ je kvadratická rovnica $7n^2 + 3n - 364 = 0$. Diskriminant $D = 10\,201 = 101^2$, korene $n_1 = 7$ a $n_2 = -52/7$ (zamietnutý). Teda $n = 7$.

## Súvisiace

- [[Aritmetická postupnosť]] — pojem
- [[Postupnosti]]
- [[Geometrická postupnosť – poznámky]]
- [[Matematika]] — predmet

> [!info] Naposledy aktualizované
> 2026-11-26 — Poznámky z matematiky – postupnosti a kombinatorika (1. polrok 2026/27)
