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

## Parametre a tvary signálov

| Parameter | Význam | Jednotka |
| --- | --- | --- |
| amplitúda | najväčšia odchýlka od strednej hodnoty | V |
| perióda `T` | čas jedného opakovania | s |
| frekvencia `f = 1/T` | počet periód za sekundu | Hz |
| fáza | posun priebehu v čase | ° alebo rad |
| strieda (*duty cycle*) | podiel času v log. 1 k perióde | % |

Základné tvary: **sínusový** (sieťové napätie 230 V, 50 Hz), **obdĺžnikový**
(hodinový signál, PWM), **trojuholníkový** a **pílový** (časová základňa
osciloskopu). Pri sieťovom napätí je `230 V` efektívna hodnota; amplitúda je
`230 · √2 ≈ 325 V`.

## A/D a D/A prevodníky

**A/D prevodník (ADC)** mení napätie na číslo, **D/A prevodník (DAC)** číslo
späť na napätie.

| Typ ADC | Princíp | Vlastnosti |
| --- | --- | --- |
| paralelný (*flash*) | `2ⁿ − 1` komparátorov naraz | najrýchlejší, drahý, málo bitov |
| postupná aproximácia (SAR) | porovnáva bit po bite od najvyššieho | stredná rýchlosť, mikrokontroléry |
| sigma-delta | rýchle 1-bitové vzorkovanie a filtrácia | vysoká presnosť, audio |

DAC sa často robí ako **rezistorová sieť R-2R**.

**Kvantizačný krok** (rozlíšenie): `Q = U_rozsah / 2ⁿ`.
Pre 10-bitový ADC a rozsah 5 V: `Q = 5 / 1024 ≈ 4,88 mV`. Hodnota ADC 512
zodpovedá približne `512 · 4,88 mV ≈ 2,5 V`. Každý ďalší bit zlepší odstup
signálu od kvantizačného šumu asi o **6 dB**.

## Výpočet objemu dát

Audio CD: `fₛ = 44,1 kHz`, `n = 16 bitov`, 2 kanály (stereo).

- bitová rýchlosť: `44 100 · 16 · 2 = 1 411 200 b/s ≈ 1,41 Mb/s`
- jedna minúta: `1 411 200 · 60 / 8 ≈ 10,6 MB`

Preto sa používa **kompresia**: bezstratová (FLAC, ZIP, PNG) dáta presne
obnoví, stratová (MP3, JPEG, H.264) odstráni časť informácie, ktorú človek
nevníma.

## Výpočet časovača

Mikrokontrolér s `fclk = 16 MHz` a deličkou `p = 64`:

- frekvencia tikov `16 000 000 / 64 = 250 000 Hz`, jeden tik trvá `4 µs`
- na interval `1 ms` treba `N = 0,001 · 250 000 = 250` tikov

**Obvod 555** je klasický hardvérový časovač:

- monostabilný režim (jeden impulz): `t ≈ 1,1 · R · C`
- astabilný režim (oscilátor): `f ≈ 1,44 / ((R1 + 2·R2) · C)`

## Časovač v programe (C#)

```csharp
// WinForms: Timer vyvolá udalosť Tick každých 1000 ms
var timer = new System.Windows.Forms.Timer();
timer.Interval = 1000;
timer.Tick += (s, e) => labelCas.Text = DateTime.Now.ToString("HH:mm:ss");
timer.Start();
```

Na Arduine sa namiesto blokujúceho `delay()` používa `millis()`: program si
zapamätá čas poslednej akcie a v cykle kontroluje, či už uplynul interval.

## Krátka ústna odpoveď

Analógový signál je spojitý, digitálny používa vzorky a konečné úrovne. Digitalizácia zahŕňa vzorkovanie, kvantovanie a kódovanie; podľa Nyquista musí byť `fₛ` najmenej dvojnásobná oproti najvyššej frekvencii. Časovač počíta impulzy hodín a po nastavenom počte tikov vyvolá udalosť, prerušenie alebo PWM. Dôležité je správne nastaviť frekvenciu, deličku, interval, pretečenie a neblokovať zbytočne celý program.

## Kontrolné otázky

> [!question]- Porovnaj analógový a digitálny signál.
> Analógový je spojitý v čase aj amplitúde a šum sa k nemu pripočíta natrvalo.
> Digitálny má diskrétne vzorky a konečný počet úrovní, dá sa obnoviť a
> spracovať procesorom, ale potrebuje prevodníky.

> [!question]- Aké sú kroky digitalizácie?
> Vzorkovanie (v čase), kvantovanie (amplitúda na úrovne) a kódovanie (do
> binárnych čísel).

> [!question]- Čo hovorí Nyquistova veta?
> Vzorkovacia frekvencia musí byť aspoň dvojnásobok najvyššej frekvencie
> signálu, `fₛ ≥ 2·fmax`; inak vznikne aliasing.

> [!question]- Aké je rozlíšenie 10-bitového ADC s rozsahom 5 V?
> `5 / 1024 ≈ 4,88 mV`.

> [!question]- Koľko dát zaberie minúta CD zvuku?
> `44 100 · 16 · 2 · 60 / 8 ≈ 10,6 MB`.

> [!question]- Čo je PWM a na čo sa používa?
> Obdĺžnikový signál s meniteľnou striedou. Stredná hodnota napätia závisí od
> striedy, takže sa ním reguluje jas LED alebo otáčky motora.

> [!question]- Prečo je lepší časovač s prerušením ako delay?
> `delay` zablokuje celý program. Prerušenie (alebo kontrola `millis()`)
> umožní medzitým obsluhovať vstupy a komunikáciu.

> [!question]- Koľko tikov treba na 1 ms pri 16 MHz a deličke 64?
> Tik trvá 4 µs, teda 250 tikov.
