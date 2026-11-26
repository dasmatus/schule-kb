---
title: "Geometrická postupnosť – pracovný list č. 21"
predmet: "Matematika"
typ: "cvičenie"
trieda: "IV.IST"
ročník_teraz: "IV.IST"
zdroj: "99 Zdroje/pdf/PL - geometrická postupnosť č 21.docx"
tags:
  - matematika
  - postupnosti
  - cvičenie
  - riešenie
aktualizované: 2026-11-26
---

# Geometrická postupnosť – pracovný list č. 21

> [!info] Zdrojový dokument
> `PL - geometrická postupnosť č 21.docx` — pracovný list s desiatimi
> úlohami na geometrickú postupnosť. Úlohy 4–7 sú v origináli vložené ako
> obrázky; ich text je prepísaný nižšie.

## Vzorce

Pre geometrickú postupnosť $(a_n)$ s prvým členom $a_1$ a kvocientom
$q \neq 0$:

$$a_n = a_1 \cdot q^{\,n-1}$$

$$s_n = a_1 \cdot \frac{q^n-1}{q-1}, \quad q \neq 1$$

Pre tri po sebe idúce členy platí $a_2^2 = a_1 \cdot a_3$.

## Zadania

1. Nájdi prvý člen $a_1$ aj kvocient $q$:
   $$a_1 - a_2 + a_3 = 15$$
   $$a_4 - a_5 + a_6 = 120$$
2. Počet obyvateľov vzrástol za 10 rokov z 56 000 na 72 000. Aký bol
   ročný prírastok obyvateľov v %?
3. Vlož medzi čísla 6 a 1536 tri čísla tak, aby tvorili geometrickú
   postupnosť.
4. Pre danú geometrickú postupnosť platí $s_5 = 242$, $q = 3$. Urč prvý
   a piaty člen tejto postupnosti.
5. V geometrickej postupnosti je druhý člen $a_2 = 6$ a piaty člen
   $a_5 = 162$. Urč súčet prvých piatich členov tejto postupnosti.
6. V geometrickej postupnosti $(a_n)_{n=1}^{\infty}$ je štvrtý člen
   $a_4 = 54$ a kvocient $q = \frac{1}{3}$. Vypočítaj súčet prvých troch
   členov tejto postupnosti.
7. Podiel štvrtého a prvého člena istej geometrickej postupnosti sa rovná
   27. Urč kvocient tejto postupnosti.
8. Prvý člen je $-0{,}5$, štvrtý je $32$. Vypočítaj piaty člen tejto
   postupnosti.
9. Cena auta je 25 600 eur. Opotrebovaním sa ročne znehodnotí o 12 %.
   Aká bude jeho cena po 9 rokoch?
10. Ak vložím na účet 2 400 eur, za koľko rokov si vyberiem dvojnásobok
    pri ročnom úročení 1,8 %?

## Riešenia

### 1. Prvý člen a kvocient

Vyjadríme členy cez $a_1$ a $q$:

$$a_1(1 - q + q^2) = 15$$

$$a_1 q^3(1 - q + q^2) = 120$$

Delením druhej rovnice prvou (výraz v zátvorke je nenulový):

$$q^3 = 8 \Rightarrow q = 2$$

Dosadíme:

$$a_1(1 - 2 + 4) = 15 \Rightarrow 3a_1 = 15 \Rightarrow a_1 = 5$$

**Výsledok:** $a_1 = 5$, $q = 2$.

### 2. Ročný prírastok obyvateľov

Po 10 rokoch platí:

$$56\,000 \cdot (1+p)^{10} = 72\,000$$

$$(1+p)^{10} = \frac{72\,000}{56\,000} = \frac{9}{7}$$

$$1+p = \left(\frac{9}{7}\right)^{1/10} \approx 1{,}02545$$

$$p \approx 0{,}02545 = 2{,}545\ \%$$

**Výsledok:** ročný prírastok bol približne **2,55 %**.

### 3. Vloženie troch čísel

Postupnosť má tvar $6,\ 6q,\ 6q^2,\ 6q^3,\ 1536$. Pre piaty člen:

$$6q^4 = 1536 \Rightarrow q^4 = 256 \Rightarrow q = 4 \ \text{alebo}\ q = -4$$

- Pre $q = 4$: vložené čísla sú **24, 96, 384**.
- Pre $q = -4$: vložené čísla sú **−24, 96, −384**.

**Výsledok:** úloha pripúšťa dve riešenia; v škole sa zvyčajne berie
kladný kvocient $q = 4$.

### 4. Súčet a kvocient

$$s_5 = a_1 \cdot \frac{3^5-1}{3-1} = a_1 \cdot \frac{242}{2} = 121a_1$$

$$121a_1 = 242 \Rightarrow a_1 = 2$$

$$a_5 = a_1 q^4 = 2 \cdot 3^4 = 2 \cdot 81 = 162$$

**Výsledok:** $a_1 = 2$, $a_5 = 162$.

### 5. Súčet prvých piatich členov

Zo vzťahu $a_5 = a_2 q^3$:

$$162 = 6q^3 \Rightarrow q^3 = 27 \Rightarrow q = 3$$

$$a_1 = \frac{a_2}{q} = \frac{6}{3} = 2$$

$$s_5 = 2 \cdot \frac{3^5-1}{3-1} = 2 \cdot 121 = 242$$

**Výsledok:** $s_5 = 242$.

### 6. Súčet prvých troch členov

$$a_4 = a_1 q^3 = 54$$

$$a_1 \cdot \left(\frac{1}{3}\right)^3 = 54 \Rightarrow a_1 \cdot \frac{1}{27} = 54 \Rightarrow a_1 = 1458$$

$$s_3 = 1458 \cdot \frac{1-\left(\frac{1}{3}\right)^3}{1-\frac{1}{3}}
= 1458 \cdot \frac{\frac{26}{27}}{\frac{2}{3}}
= 1458 \cdot \frac{26}{27} \cdot \frac{3}{2} = 2106$$

**Výsledok:** $s_3 = 2106$ (členy sú 1458, 486, 162).

### 7. Kvocient z podielu

$$\frac{a_4}{a_1} = \frac{a_1 q^3}{a_1} = q^3 = 27$$

$$q = 3$$

**Výsledok:** $q = 3$.

### 8. Piaty člen

$$a_4 = a_1 q^3 = -0{,}5 \cdot q^3 = 32$$

$$q^3 = -64 \Rightarrow q = -4$$

$$a_5 = a_4 \cdot q = 32 \cdot (-4) = -128$$

**Výsledok:** $a_5 = -128$.

### 9. Cena auta po 9 rokoch

Každý rok zostane 88 % ceny, teda $q = 0{,}88$:

$$a_9 = 25\,600 \cdot 0{,}88^9 \approx 25\,600 \cdot 0{,}31648
\approx 8\,101{,}85$$

**Výsledok:** auto bude mať po 9 rokoch približne **8 102 eur**
(zaokrúhlene 8 100 €).

### 10. Za koľko rokov sa vklad zdvojnásobí

$$2\,400 \cdot 1{,}018^n = 4\,800$$

$$1{,}018^n = 2$$

$$n = \frac{\ln 2}{\ln 1{,}018} \approx \frac{0{,}69315}{0{,}01784}
\approx 38{,}85$$

**Výsledok:** vklad sa zdvojnásobí po **39 rokoch** (počas 39. roka).

## Súvisiace

- [[Geometrická postupnosť]] — pojem
- [[Geometrická postupnosť – poznámky]] — teória a ďalšie úlohy z hodín
- [[Geometrická postupnosť – pracovný list č. 2]] — interaktívne testy
- [[Matematika]] — predmet
- [[Definičný obor funkcie – pracovný list]] — ďalší pracovný list

> [!info] Naposledy aktualizované
> 2026-11-26 — Poznámky z matematiky – postupnosti a kombinatorika (1. polrok 2026/27)
