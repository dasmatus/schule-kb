---
title: "Postupnosti"
predmet: "Matematika"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
dátum: 2026-09-08
zdroj: "EduPage – matematika, 8. 9. – 15. 9. 2026 (tabuľa)"
tags:
  - "matematika"
  - "postupnosti"
  - "poznámky"
aktualizované: 2026-11-26
---

# Postupnosti

> [!info] Zdroj
> Tabuľa z hodín Kataríny Baškovej (8. 9., 14. 9. a 15. 9. 2026).
> Fotografie sú v `/workspace/edupage-homework/matematika/`; do
> `90 Prílohy/obrazky/` zatiaľ nie sú pridané. Súvisí s pojmom
> [[Postupnosť]].

## Čo je postupnosť

Na úvodnej hodine sa postupnosť odlíšila od lineárnej funkcie. Funkcia $y = x+4$ má spojitý graf v rovine $[x,y]$; postupnosť $a_n = n+4$ s $n \in \mathbb{N}$ je **diskrétna**: bodový graf v súradniciach $[n, a_n]$.

Príklad: $n=1 \Rightarrow a_1 = 5$ (bod $[1,5]$), $n=2 \Rightarrow a_2 = 6$ (bod $[2,6]$).

Konečný a nekonečný súčet sa zapisuje

$$\sum_{n=1}^{5}(n+4), \qquad \sum_{n=1}^{\infty}(n+4).$$

Čísla $21,\ 19,\ 27,\ 30,\ 67,\ 43,\ 54,\ 28,\ 5$ tvoria **konečnú** postupnosť s deviatimi členmi. Vzostupne usporiadaná je $5,\ 19,\ 21,\ 27,\ 28,\ 30,\ 43,\ 54,\ 67$.

## Výpočet členov z predpisu

Z hodiny 14. 9. 2026 (a doplňujúce predpisy z 15. 9.):

| Predpis | Prvé členy / vybrané členy |
| --- | --- |
| $a_n = 5-2n$ | $3,\ 1,\ -1,\ -3,\ -5$; $a_{22} = -39$, $a_{101} = -197$ |
| $a_n = 1/n$ | $1,\ \tfrac12,\ \tfrac13,\ \tfrac14,\ \tfrac15$ |
| $a_n = (-1)^n + 10$ | $9,\ 11,\ 9,\ 11,\ 9$ |
| $a_n = \log_2 n$ | $a_1=0$, $a_2=1$, $a_4=2$, $a_8=3$, $a_{16}=4$ |
| $a_n = 2^n$ | $2,\ 4,\ 8,\ 16,\ 32$ (pre $n=1,2,\dots$) |
| $a_n = (3-n)/n$ | $2,\ \tfrac12,\ 0,\ -\tfrac14,\ -\tfrac25$ |
| $a_n = -4$ | $-4,\ -4,\ -4,\ -4,\ -4$ |
| $a_n = (-1)^n / n$ | $-1,\ \tfrac12,\ -\tfrac13,\ \tfrac14,\ -\tfrac15$ |
| $a_n = \tfrac12\bigl(1+(-1)^n\bigr)$ | $0,\ 1,\ 0,\ 1,\ 0$ |
| $a_n = 3^{\lvert n-3\rvert}$ | $9,\ 3,\ 1,\ 3,\ 9$ |
| $a_n = 0{,}1^{n-1}$ | $1,\ 0{,}1,\ 0{,}01,\ 0{,}001,\ 0{,}0001$ |
| $a_n = 4-2n$ | $2,\ 0,\ -2,\ -4,\ -6$ |
| $a_n = -2n+3$ | $1,\ -1,\ -3,\ -5,\ -7$ |
| $a_n = 7\cdot\bigl(\tfrac12\bigr)^{n-1}$ | $7,\ \tfrac72,\ \tfrac74,\ \tfrac78,\ \tfrac7{16}$ |
| $a_n = 2\cdot 3^{n-1}$ | $2,\ 6,\ 18,\ 54,\ 162$ |
| $a_n = (-1)^n /(n+1)$ | $-\tfrac12,\ \tfrac13,\ -\tfrac14,\ \tfrac15,\ -\tfrac16$ |
| $a_n = (n-3)/n$ | $-2,\ -\tfrac12,\ 0,\ \tfrac14,\ \tfrac25$ |

Na tabuli ostali ako ďalšie predpisy aj $a_n = (n+2)/n$ a $a_n = 5n+1$ (bez vypísaných členov).

## Monotónnosť

Postupnosť je **rastúca**, ak $a_{n+1}-a_n > 0$, a **klesajúca**, ak $a_{n+1}-a_n < 0$. Dôkaz sa robí úpravou tohto rozdielu.

**Príklad 1.** $a_n = 1/n$. Potom

$$a_{n+1}-a_n = \frac{1}{n+1}-\frac{1}{n} = \frac{-1}{n(n+1)} < 0,$$

teda postupnosť je klesajúca.

**Príklad 2.** $a_n = 4n-1$. Potom $a_{n+1} = 4n+3$ a $a_{n+1}-a_n = 4 > 0$, teda postupnosť je rastúca (členy $3,\ 7,\ 11,\ \dots$).

## Súvisiace

- [[Postupnosť]] — pojem
- [[Rekurentné postupnosti]]
- [[Aritmetická postupnosť – poznámky]]
- [[Geometrická postupnosť – poznámky]]
- [[Matematika]] — predmet

> [!info] Naposledy aktualizované
> 2026-11-26 — Poznámky z matematiky – postupnosti a kombinatorika (1. polrok 2026/27)
