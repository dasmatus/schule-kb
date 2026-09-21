---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T02 – Digitalizácia signálu a spracovanie informácií

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> DIGITALIZÁCIA SIGNÁLU A SPRACOVANIE INFORMÁCIÍ – porovnanie rôznych druhov signálov, časovače

## Úvod: signál a digitalizácia

Signál je fyzikálna veličina, ktorá nesie informáciu, napríklad napätie, prúd, zvukový tlak alebo intenzita svetla. Pri digitalizácii sa spojitý priebeh zmení na postupnosť čísel vhodnú na spracovanie procesorom. Základné kroky sú vzorkovanie v čase, kvantovanie amplitúdy a binárne kódovanie.

## Porovnanie druhov signálov

- **Analógový signál** je spojitý v čase aj v amplitúde. Môže nadobúdať nekonečne veľa hodnôt a jeho rušenie sa so signálom často sčíta.
- **Digitálny signál** používa diskrétne časové vzorky a konečný počet úrovní. Pri prenose možno úrovne obnoviť, preto je odolnejší voči postupnému šumu, ale vyžaduje prevodníky a vhodnú vzorkovaciu frekvenciu.
- **Periodický signál** sa opakuje s periódou `T`, pričom frekvencia je `f = 1/T`; neperiodický signál túto pravidelnosť nemá.
- **Spojitý a diskrétny čas** opisuje, či je hodnota definovaná v každom okamihu alebo iba v okamžitoch vzorkovania. Digitálny systém je zvyčajne diskrétny v čase i amplitúde.
- Signál môže byť jednosmerný alebo striedavý, základný (*baseband*) alebo modulovaný na nosnú frekvenciu.

Pri digitalizácii musí byť vzorkovacia frekvencia podľa Nyquistovho pravidla aspoň dvojnásobkom najvyššej prenášanej frekvencie:

`fₛ ≥ 2·fmax`.

Pred vzorkovač sa preto dáva antialiasingový dolnopriepustný filter. Kvantovanie rozdelí rozsah na `L = 2ⁿ` úrovní pri `n` bitoch. Väčší počet bitov zmenšuje kvantizačný krok a chybu, ale zväčšuje objem dát. Pri jednom kanáli bez kompresie je približná bitová rýchlosť `Rb = fₛ · n`.

## Časovače

Časovač je obvod alebo programový prvok, ktorý odmeriava čas od hodinového signálu, vyvolá udalosť po uplynutí intervalu alebo vytvára periodický priebeh. **Čítač** zvyšuje alebo znižuje hodnotu podľa impulzov, kým časovač zvyčajne počíta impulzy interných hodín.

Typické hardvérové funkcie časovača v mikrokontroléri sú:

1. nastavenie zdroja hodín a deličky (*prescaler*),
2. načítanie počiatočnej hodnoty alebo nastavenie porovnávacieho registra,
3. počítanie do pretečenia alebo zhody,
4. vyvolanie prerušenia, jednorazovej udalosti alebo zmeny výstupu,
5. opätovné nastavenie pri periodickej činnosti.

Ak je frekvencia časovača `fclk` a delička `p`, interval jedného tiknutia je `p/fclk`. Pri počte `N` tikov je približný interval `t = N·p/fclk`. Časovač môže vytvoriť aj PWM: pomer času v logickej jednotke k perióde je strieda (*duty cycle*). PWM sa používa napríklad na reguláciu jasu LED alebo rýchlosti motora.

Softvérové `delay` iba zablokuje program a počas čakania často nevykonáva inú prácu. Prerušením riadený časovač umožní súbežne obsluhovať vstupy a komunikáciu. Pri návrhu treba riešiť pretečenie čítača, presnosť oscilátora a súťaž o spoločné premenné.

### Jednoduchý príklad

```text
nastav časovač na 1 ms
pri prerušení:
    zvýš systémový_čas
    ak systémový_čas mod 1000 = 0:
        nastav príznak_každú_sekundu
```

## Krátka ústna odpoveď

Analógový signál je spojitý, digitálny používa vzorky a konečné úrovne. Digitalizácia zahŕňa vzorkovanie, kvantovanie a kódovanie; podľa Nyquista musí byť `fₛ` najmenej dvojnásobná oproti najvyššej frekvencii. Časovač počíta impulzy hodín a po nastavenom počte tikov vyvolá udalosť, prerušenie alebo PWM. Dôležité je správne nastaviť frekvenciu, deličku, interval, pretečenie a neblokovať zbytočne celý program.
