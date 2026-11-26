---
title: "Geometrická postupnosť – poznámky"
predmet: "Matematika"
typ: "poznámky"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
dátum: 2026-10-12
zdroj: "EduPage – matematika, 12. 10. – 20. 10. 2026 (tabuľa)"
tags:
  - "matematika"
  - "postupnosti"
  - "poznámky"
  - "cvičenie"
aktualizované: 2026-11-26
---

# Geometrická postupnosť – poznámky

> [!info] Zdroj
> Tabuľa z hodín 12. 10. – 20. 10. 2026 a pracovné listy z 14. 10. 2026.
> Pojem: [[Geometrická postupnosť]]. Desať vyriešených úloh je v
> [[Geometrická postupnosť – pracovný list č. 21]]; odkazy na interaktívne
> cvičenia sú v [[Geometrická postupnosť – pracovný list č. 2]].

## Vzorce

$$a_{n+1} = a_n \cdot q, \qquad q = \frac{a_{n+1}}{a_n} \text{ (kvocient, } q \neq 0\text{)}$$

$$a_n = a_1 \cdot q^{n-1}, \qquad a_k = a_n \cdot q^{k-n}$$

$$s_n = a_1 \cdot \frac{q^n-1}{q-1}, \qquad q \neq 1$$

## Typy podľa kvocientu

Z prvého člena $2$ (alebo $-2$):

| $q$ | Začiatok postupnosti | Poznámka |
| --- | --- | --- |
| $3$ | $2,\ 6,\ 18,\ 54,\ 162,\ 486,\ 1458,\ 4374,\ 13\,122$ | rastúca |
| $-3$ | $2,\ -6,\ 18,\ -54,\ 162,\ \dots$ | strieda znamienko |
| $3$ | $-2,\ -6,\ -18,\ -54,\ \dots$ | klesajúca (členy sú záporné) |
| $-3$ | $-2,\ 6,\ -18,\ 54,\ -162$ | strieda znamienko |

## Výpis členov a určenie $q$

1. $a_1 = 3$, $a_2 = 3/2$, $q = 1/2$: $3,\ \tfrac32,\ \tfrac34,\ \tfrac38,\ \tfrac3{16}$.
2. $a_1 = -1/2$, $q = 2$: $-\tfrac12,\ -1,\ -2,\ -4,\ -8$.
3. $a_1 = 1/4$, $q = -2$: $\tfrac14,\ -\tfrac12,\ 1,\ -2,\ 4$.
4. $a_3 = \sqrt{3}$, $a_2 = -1$: $q = -\sqrt{3}$. Prvých päť členov: $\tfrac{\sqrt{3}}{3},\ -1,\ \sqrt{3},\ -3,\ 3\sqrt{3}$.
5. $a_2 = -1$, $a_4 = -1/4$: $q^2 = 1/4$, teda $q = \pm 1/2$.
   - $q = 1/2$: $-2,\ -1,\ -\tfrac12,\ -\tfrac14,\ -\tfrac18$;
   - $q = -1/2$: $2,\ -1,\ \tfrac12,\ -\tfrac14,\ \tfrac18$.
6. $a_4 = \sqrt{2}$, $a_2 = 2\sqrt{2}$: $q = \pm \sqrt{2}/2$, $a_1 = 4$ (pre kladný kvocient). Kladné riešenie: $4,\ 2\sqrt{2},\ 2,\ \sqrt{2},\ 1$. Záporný kvocient ostal na tabuli ako ďalšie riešenie.
7. $a_1 = -3$, $q = 6$: $a_7 = a_1 q^6 = -3 \cdot 6^6 = -139\,968$.
8. $a_8 = -4374$, $a_4 = -54$: $q^4 = 81$, $q = \pm 3$. Pre $q = 3$ je $a_1 = -2$; pre $q = -3$ je $a_1 = 2$.
9. $a_5 = 162$, $a_8 = 4374$: $q^3 = 27$, $q = 3$, $a_1 = 2$.
10. $a_4 = 8/3$, $a_6 = -32/3$: $q^2 = 4$, $q = \pm 2$. Pre $q = 2$ je $a_1 = -1/3$; pre $q = -2$ je $a_1 = 1/3$.
11. $a_5 = 100$, $a_2 = -12\,500$: $q = -1/5$, $a_1 = 62\,500$.

## Súčet členov

1. $a_1 = -1/3$, $q = 2$: $s_{10} = -341$.
2. $a_1 = 1/3$, $q = -2$: $s_{10} = -341/3$.
3. $a_1 = 62\,500$, $q = -1/5$: $s_7 = 52\,084$.
4. $a_1 = 18$, $a_n = 13\,122$, $s_n = 19\,674$. Z podielu členov je $q^{n-1} = 729$ a zo súčtu $q = 3$. Potom $3^{n-1} = 729 = 3^6$, teda $n = 7$.
5. $a_1 = 1$, $a_m = 2401$, $s_m = 2801$. Zo súčtu je $q = 7$ a z $7^m = 16\,807 = 7^5$ je $m = 5$.

## Sústavy

**Sústava 1.** $a_7 - a_5 = 96$, $a_6 + a_5 = 96$, $s_n = 2046$. Delením rovníc je $q = 2$, potom $a_1 = 2$. Zo súčtu $2046 = 2(2^n - 1)$ je $2^n = 1024$, $n = 10$.

**Sústava 2.** $a_1 - a_2 + a_3 = 9$, $a_4 - a_5 + a_6 = 72$. Delením je $q^3 = 8$, $q = 2$, a $a_1(1 - q + q^2) = 9$ dáva $a_1 = 3$.

## Nárast a pokles v praxi

Označenie z hodiny: $a_0$ je počiatočný stav, $a_n$ konečný stav, $p$ je percento, $m$ (alebo $n$) počet rokov.

$$a_n = a_0 \left(1 + \frac{p}{100}\right)^n \quad\text{(nárast)}, \qquad a_n = a_0 \left(1 - \frac{p}{100}\right)^n \quad\text{(pokles/odpis)}.$$

**Nárast**

1. $a_0 = 37\,421$, $p = 3\,\%$, $n = 10$: $a_{10} = 37\,421 \cdot 1{,}03^{10} \approx 50\,291$.
2. $a_4 = 472$, $p = 4{,}9\,\%$, $n = 4$: $a_0 = 472 / 1{,}049^4 \approx 390$.
3. $a_{25} = 205$, $a_0 = 44$, $n = 25$: $p \approx 6{,}35\,\%$.
4. V roku 2005 bola hodnota $5$, rast $11{,}5\,\%$ ročne, cieľ $11\,000$: $n = \ln 2200 / \ln 1{,}115 \approx 70{,}7$, teda približne v roku **2075**.

**Odpis**

1. $a_0 = 15\,000\,\mathrm{€}$, $p = 14\,\%$, $n = 4$: $a_4 = 15\,000 \cdot 0{,}86^4 \approx 8205{,}12\,\mathrm{€}$.
2. $a_3 = 742\,\mathrm{€}$, $p = 11\,\%$, $n = 3$: $a_0 = 742 / 0{,}89^3 \approx 1053\,\mathrm{€}$ (na tabuli $1052$).
3. $a_0 = 1050$, $a_{12} = 470$: $p \approx 6{,}48\,\%$ (na tabuli zaokrúhlené na $7\,\%$).
4. V roku 2022: $a_0 = 5\,845\,000$, $a_n = 2\,122\,333$, $p = 21\,\%$: $n = \ln(0{,}3631)/\ln(0{,}79) \approx 4{,}30$ roka.

> [!warning] Overiť
> Pri prvej úlohe o náraste som hodnotu $a_{10}$ prepočítal na približne
> $50\,291$; na tabuli bolo iné zaokrúhlenie (okolo $49\,612$). Pri
> odpisoch ber za záväzné vzorec a dosadenie, nie nutne každé
> zaokrúhlenie z fotografie.

## Súvisiace

- [[Geometrická postupnosť]] — pojem
- [[Geometrická postupnosť – pracovný list č. 21]]
- [[Geometrická postupnosť – pracovný list č. 2]]
- [[Aritmetická postupnosť – poznámky]]
- [[Matematika]] — predmet

> [!info] Naposledy aktualizované
> 2026-11-26 — Poznámky z matematiky – postupnosti a kombinatorika (1. polrok 2026/27)
