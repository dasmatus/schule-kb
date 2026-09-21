---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T07 – Kybernetická bezpečnosť

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> KYBERNETICKÁ BEZPEČNOSŤ – hrozby, metóda AAA, typy útokov, spôsoby zabezpečenia sietí, zariadení, dát, malvér, premenná v programovaní

## Kybernetická bezpečnosť a hrozby

Kybernetická bezpečnosť chráni systémy, siete, zariadenia a údaje pred neoprávneným prístupom, zmenou, zničením alebo výpadkom. Základné ciele sa označujú CIA triádou:

- **dôvernosť** — údaje vidí iba oprávnený subjekt,
- **integrita** — údaje neboli neoprávnene zmenené,
- **dostupnosť** — služba a údaje sú k dispozícii v potrebnom čase.

Hrozba je možný zdroj škody, zraniteľnosť je slabé miesto a riziko je kombinácia pravdepodobnosti a dopadu. Hrozby môžu byť technické, organizačné, fyzické aj ľudské: neaktualizovaný server, slabé heslo, krádež zariadenia alebo chyba používateľa.

## Metóda AAA

AAA znamená:

1. **Authentication (autentifikácia)** — overenie, kto používateľ alebo zariadenie je; heslo, certifikát, token alebo biometria,
2. **Authorization (autorizácia)** — určenie, čo overený subjekt smie robiť; roly a oprávnenia,
3. **Accounting/Auditing (účtovanie a audit)** — zaznamenanie prihlásenia, príkazov, zmien a využitia zdrojov.

Bezpečná autentifikácia používa viacfaktorové overenie a heslá sa ukladajú ako bezpečné hashované hodnoty so soľou, nie v otvorenom texte. Autorizácia má uplatniť najmenšie potrebné oprávnenie.

## Typy útokov a malvéru

Medzi časté útoky patria:

- phishing a sociálne inžinierstvo, pri ktorom útočník manipuluje človeka,
- hádanie hesiel, slovníkový útok, brute force a krádež relácie,
- spoofing a útok typu Man-in-the-Middle,
- zneužitie chyby aplikácie, napríklad injekcia alebo neoprávnené zvýšenie práv,
- DoS/DDoS, ktorý vyčerpáva dostupné zdroje,
- odpočúvanie nezabezpečenej komunikácie.

**Malvér** je škodlivý softvér. Vírus sa pripája k súborom, červ sa šíri samostatne po sieti, trójsky kôň sa vydáva za užitočný program, ransomware šifruje alebo zablokuje dáta, spyware sleduje používateľa a bot môže byť ovládaný v sieti napadnutých zariadení. Jeden program môže kombinovať viac vlastností.

## Zabezpečenie sietí, zariadení a dát

- Sieť: segmentácia pomocou VLAN a firewallu, pravidlá najmenších práv, VPN, IDS/IPS, vypnutie nepotrebných služieb a bezpečné Wi-Fi s WPA2/WPA3.
- Zariadenia: aktualizovaný firmware, silné jedinečné heslá, MFA, zamknutý boot, fyzická ochrana, zálohovaná konfigurácia a centrálne logovanie.
- Dáta: šifrovanie pri prenose (TLS, IPsec) aj v úložisku, riadenie prístupu, hashovanie na kontrolu integrity, pravidlo záloh 3-2-1 a pravidelné testovanie obnovy.

Bezpečnosť je proces: monitorujeme udalosti, aktualizujeme, školíme používateľov, reagujeme na incident a po ňom upravíme opatrenia.

## Premenná v programovaní

Premenná je pomenované miesto alebo referencia, ktorá má typ, hodnotu, rozsah platnosti a životnosť. Typ určuje, aké hodnoty môže obsahovať a aké operácie sú povolené:

```text
int pokusy = 3
bool prihlaseny = false
string pouzivatel = nacitajVstup()
```

V bezpečnom programe sa vstup validuje, premenné sa neinicializujú náhodnými hodnotami, citlivé údaje sa zbytočne nekopírujú a rozsah premennej sa obmedzí na potrebný blok. Konštanta sa po inicializácii nemení. Premenná sama o sebe bezpečnosť nezaručí, ale nesprávne typy, pretečenie alebo neoverený vstup môžu vytvoriť zraniteľnosť.

## Krátka ústna odpoveď

Kybernetická bezpečnosť chráni dôvernosť, integritu a dostupnosť. AAA znamená autentifikáciu, autorizáciu a účtovanie. Hrozby zahŕňajú phishing, sociálne inžinierstvo, malware, útoky na heslá, MitM a DoS/DDoS; malware môže byť vírus, červ, trójsky kôň alebo ransomware. Sieť zabezpečujem segmentáciou a firewallom, zariadenia aktualizáciami a MFA a dáta šifrovaním a zálohami. Premenná má typ, hodnotu a rozsah a pri bezpečnom programovaní sa jej vstup validuje.

Ochrana: aktualizácie, MFA, jedinečné heslá v správcovi hesiel, princíp najmenších oprávnení, firewall, segmentácia siete, antivírus/EDR a testované zálohy 3-2-1. Dáta pri prenose chráni TLS/VPN a pri uložení šifrovanie. Premenná v programe je pomenované miesto v pamäti s typom a hodnotou; vstupy treba validovať, aby sa predišlo chybám a útokom.
