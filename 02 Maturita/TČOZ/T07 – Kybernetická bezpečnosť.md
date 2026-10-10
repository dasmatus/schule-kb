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

## Útoky v LAN (vrstva 2)

| Útok | Princíp | Obrana |
| --- | --- | --- |
| **MAC flooding** | zaplavenie MAC tabuľky switchu, ten potom posiela rámce všade | port security |
| **VLAN hopping** | útočník vyjedná trunk alebo použije dvojitý tag | vypnúť DTP (`switchport nonegotiate`), nepoužívať VLAN 1 ako native |
| **DHCP starvation** | vyčerpanie adries DHCP servera | port security, DHCP snooping |
| **DHCP spoofing** | podvrhnutý DHCP server rozdáva falošnú bránu | DHCP snooping (dôveryhodné porty) |
| **ARP spoofing** | falošné ARP odpovede, útočník sa vloží medzi obete (MitM) | Dynamic ARP Inspection |
| **STP útok** | útočník sa vyhlási za root bridge | BPDU Guard, Root Guard |

## AAA – RADIUS a TACACS+

| | RADIUS | TACACS+ |
| --- | --- | --- |
| transport | UDP 1812/1813 | TCP 49 |
| šifrovanie | len heslo | celé telo správy |
| AAA | autentifikácia a autorizácia spolu | všetky tri časti oddelene |
| použitie | Wi-Fi (802.1X), VPN | správa sieťových zariadení |

## Zabezpečenie Cisco zariadenia

```text
enable secret Silne_Heslo1
service password-encryption
security passwords min-length 10
login block-for 120 attempts 3 within 60
!
hostname R1
ip domain-name skola.local
crypto key generate rsa general-keys modulus 2048
ip ssh version 2
username admin secret Admin_Heslo1
!
aaa new-model
aaa authentication login default local
!
line vty 0 4
 transport input ssh
 login local
 exec-timeout 5 0
```

**Port security** na prístupovom porte switchu:

```text
interface f0/1
 switchport mode access
 switchport port-security
 switchport port-security maximum 2
 switchport port-security mac-address sticky
 switchport port-security violation shutdown
```

Režimy porušenia: **protect** (zahodí rámce potichu), **restrict** (zahodí a
zaloguje), **shutdown** (port prejde do stavu *err-disabled*, predvolené).

## Premenná v C#

```csharp
int pokusy = 3;                 // celé číslo
double teplota = 21.5;          // desatinné číslo
bool prihlaseny = false;        // pravda/nepravda
char znak = 'A';                // jeden znak
string meno = "admin";          // reťazec
const int MAX_POKUSOV = 5;      // konštanta, nedá sa zmeniť
var ip = "192.168.1.1";         // typ odvodí prekladač (string)
```

- **Deklarácia** určí typ a meno, **inicializácia** priradí prvú hodnotu.
- **Rozsah platnosti** (*scope*): premenná deklarovaná v bloku `{ }` existuje
  len v ňom; lokálna premenná v metóde, atribút v triede.
- Hodnotové typy (`int`, `double`, `bool`) uchovávajú hodnotu priamo,
  referenčné (`string`, polia, objekty) odkaz na objekt v halde.
- Názov začína písmenom alebo `_`, nesmie byť kľúčové slovo, rozlišujú sa
  veľké a malé písmená.

## Krátka ústna odpoveď

Kybernetická bezpečnosť chráni dôvernosť, integritu a dostupnosť. AAA znamená autentifikáciu, autorizáciu a účtovanie. Hrozby zahŕňajú phishing, sociálne inžinierstvo, malware, útoky na heslá, MitM a DoS/DDoS; malware môže byť vírus, červ, trójsky kôň alebo ransomware. Sieť zabezpečujem segmentáciou a firewallom, zariadenia aktualizáciami a MFA a dáta šifrovaním a zálohami. Premenná má typ, hodnotu a rozsah a pri bezpečnom programovaní sa jej vstup validuje.

Ochrana: aktualizácie, MFA, jedinečné heslá v správcovi hesiel, princíp najmenších oprávnení, firewall, segmentácia siete, antivírus/EDR a testované zálohy 3-2-1. Dáta pri prenose chráni TLS/VPN a pri uložení šifrovanie. Premenná v programe je pomenované miesto v pamäti s typom a hodnotou; vstupy treba validovať, aby sa predišlo chybám a útokom.

## Súvisiace poznámky (CCNA2)

[[M10 – LAN Security Concepts]] · [[M11 – Switch Security Configuration]] · [[M12 – WLAN Concepts]] — rozcestník [[CCNA2 – SRWE]]

## Pozri aj – CCNA3 ENSA

- [[ENSA 03 – Koncepty sieťovej bezpečnosti]]
- [[ENSA 04 – Koncepty ACL]]
- [[ENSA 08 – VPN a IPsec]]

## Kontrolné otázky

> [!question]- Čo je triáda CIA?
> Dôvernosť (údaje vidí len oprávnený), integrita (údaje nie sú neoprávnene
> zmenené), dostupnosť (služba funguje, keď ju treba).

> [!question]- Vysvetli AAA na príklade prihlásenia na router.
> Autentifikácia – router overí meno a heslo. Autorizácia – určí, ktoré
> príkazy smie používateľ zadať. Účtovanie – zaznamená, kedy sa prihlásil a čo
> zmenil.

> [!question]- Aký je rozdiel medzi vírusom, červom a trójskym koňom?
> Vírus sa pripája k súborom a šíri sa ich spustením. Červ sa šíri sieťou sám.
> Trójsky kôň sa tvári ako užitočný program a skrýva škodlivú funkciu.

> [!question]- Čo je ransomware a ako sa pred ním chrániť?
> Zašifruje dáta a žiada výkupné. Ochrana: zálohy 3-2-1 (aspoň jedna offline),
> aktualizácie, opatrnosť pri prílohách, najmenšie oprávnenia.

> [!question]- Ako zabezpečíš vzdialený prístup na Cisco zariadenie?
> Hostname, doménové meno, RSA kľúče, `ip ssh version 2`, lokálny používateľ
> so `secret`, na VTY linkách `transport input ssh` a `login local`.

> [!question]- Čo robí port security a aké má režimy porušenia?
> Obmedzí počet a konkrétne MAC adresy na porte. Režimy: protect, restrict,
> shutdown.

> [!question]- Porovnaj RADIUS a TACACS+.
> RADIUS: UDP, šifruje len heslo, spája autentifikáciu a autorizáciu.
> TACACS+: TCP 49, šifruje celú správu, oddeľuje všetky časti AAA.

> [!question]- Čo je premenná a čím je určená?
> Pomenované miesto v pamäti. Má typ, meno, hodnotu, rozsah platnosti a životnosť.
