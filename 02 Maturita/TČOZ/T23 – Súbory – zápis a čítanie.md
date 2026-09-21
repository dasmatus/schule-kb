---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T23 – Súbory – zápis a čítanie

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> SÚBORY - ZÁPIS A ČÍTANIE - typy súborov, serializácia a deserializácia objektov

## Typy súborov

Súbor je pomenovaná postupnosť dát uložená v súborovom systéme. **Textový súbor** obsahuje znaky v určitom kódovaní, napríklad UTF-8; človek ho môže čítať a upravovať. **Binárny súbor** obsahuje bajty v štruktúre určenej programom, napríklad obrázok, zvuk alebo kompilovaný program. Ďalšie členenie je podľa formátu: CSV tabuľka, JSON/XML štruktúrované údaje, log, konfigurácia, archív alebo databázový súbor.

Formát určuje, ako sa bajty interpretujú. Pri prenose treba riešiť kódovanie, endianitu, verziu formátu a prípadnú kontrolu integrity. Prípona je iba pomôcka, nie dôkaz skutočného obsahu.

## Zápis a čítanie

Bezpečný pracovný postup je:

1. overiť cestu a oprávnenie,
2. otvoriť súbor v správnom režime,
3. čítať po riadkoch, blokoch alebo celej dĺžke,
4. validovať a spracovať obsah,
5. zápis dokončiť a zdroj korektne zavrieť.

Pri zápise rozlišujeme vytvorenie alebo prepísanie (`create/overwrite`) a pripojenie na koniec (`append`). Pri dôležitom súbore je bezpečnejšie zapísať do dočasného názvu v rovnakom súborovom systéme, overiť a potom vykonať atomické premenovanie; tým sa obmedzí poškodenie pri výpadku. Cesty treba skladať pomocou knižnice, nie nekontrolovaným spájaním vstupu používateľa.

Program musí ošetriť neexistujúci súbor, nedostatok oprávnení, plný disk, zámok iným procesom, nesprávne kódovanie a chybný formát. `using`/automatické spravovanie zdrojov alebo `try/finally` zabezpečí zatvorenie aj pri výnimke. Pri veľkých súboroch je vhodné streamovanie, aby sa celý obsah nemusel načítať do pamäte.

## Serializácia objektov

**Serializácia** prevádza objekt v pamäti na reprezentáciu vhodnú na uloženie alebo prenos. Ukladajú sa hodnoty a podľa formátu aj názvy vlastností a typové informácie. JSON je čitateľný a vhodný na výmenu, XML podporuje značky a schémy, binárny formát býva menší alebo rýchlejší, ale závisí od implementácie.

Príklad JSON reprezentácie objektu:

```json
{"meno":"Eva","vek":18,"aktivny":true}
```

**Deserializácia** načíta reprezentáciu, overí jej štruktúru a vytvorí objekt. Treba kontrolovať povinné polia, rozsah, verziu a typy; neznáme polia možno ignorovať alebo odmietnuť podľa politiky. Deserializácia nedôveryhodného vstupu sa nesmie používať na spustenie ľubovoľného kódu. Nebezpečné univerzálne binárne deserializéry sú rizikové; bezpečnejší je obmedzený dátový formát s validáciou.

## Krátka ústna odpoveď

Súbor je pomenovaná postupnosť dát; môže byť textový alebo binárny, prípadne JSON, XML, CSV či iný štruktúrovaný formát. Pri čítaní a zápise ho otvorím v správnom režime, spracujem, korektne zavriem a ošetrím neexistenciu, práva, plný disk a chybný formát. Serializácia uloží objekt do JSON/XML alebo binárnej reprezentácie a deserializácia ho obnoví; nedôveryhodný vstup vždy validujem a nepoužívam nebezpečnú binárnu deserializáciu.
