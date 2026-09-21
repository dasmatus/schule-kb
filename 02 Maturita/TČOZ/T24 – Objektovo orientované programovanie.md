---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T24 – Objektovo orientované programovanie

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> OBJEKTOVO ORIENTOVANÉ PROGRAMOVANIE - základné pojmy, prístupové modifikátory, statické a nestatické členy tried, dedičnosť, základná konfigurácia sieťových zariadení

## Základné pojmy OOP

Objektovo orientované programovanie modeluje problém pomocou objektov. **Trieda** je predloha s atribútmi a metódami, **objekt** je konkrétna inštancia. Atribúty opisujú stav a metódy správanie. Konštruktor vytvorí platný počiatočný stav; objekt môže komunikovať cez verejné rozhranie.

Základné princípy:

- **zapuzdrenie** skryje reprezentáciu a povoľuje iba kontrolované operácie,
- **abstrakcia** ponechá podstatné vlastnosti a skryje zbytočné detaily,
- **dedičnosť** umožní odvodenému typu rozšíriť spoločný základ,
- **polymorfizmus** umožní volať rovnaké rozhranie s rôznou implementáciou.

Dedičnosť treba používať tam, kde platí vzťah „je typom“. Pri čisto opakovane používanom správaní môže byť vhodnejšia kompozícia.

## Prístupové modifikátory

V jazykoch typu C#/Java sa používajú najmä:

- `private` — člen je prístupný iba v triede,
- `public` — prístupný cez verejné rozhranie,
- `protected` — trieda a jej potomkovia,
- `internal` alebo package-private — podľa jazyka v rámci modulu/balíka.

Polia bývajú súkromné a čítanie či zmena prebieha cez metódy alebo vlastnosti, ktoré overia rozsah a zachovajú invarianty. Verejné rozhranie nemá odhaľovať viac, než klient potrebuje.

## Statické a nestatické členy

Statický člen patrí triede a existuje v jednej zdieľanej kópii; možno ho použiť bez objektu, napríklad `Math.PI`. Nestatický člen patrí konkrétnej inštancii a každý objekt má vlastnú hodnotu. Statická metóda nemá implicitnú referenciu na `this`, preto nemôže priamo používať inštančné členy. Pri statickom stave treba zohľadniť súbežnosť a životnosť aplikácie.

## Dedičnosť a polymorfizmus

Odvodená trieda zdedí dostupné členy rodiča a môže pridať vlastné alebo predefinovať virtuálnu metódu. Napríklad `Zariadenie` môže mať metódu `pripoj()` a `Router` či `Switch` ju implementujú odlišne. Kód môže pracovať s typom `Zariadenie`, pričom počas behu sa zvolí implementácia konkrétneho objektu. Pri dedení treba rešpektovať modifikátory, kontrakt rodiča a substitúciu; nie každý spoločný atribút znamená vhodnú dedičnosť.

## Základná konfigurácia sieťového zariadenia

Ukážka v štýle Cisco IOS:

```text
enable
configure terminal
hostname SW1
enable secret <silné-heslo>
interface Vlan 1
 ip address 192.168.1.2 255.255.255.0
 no shutdown
ip default-gateway 192.168.1.1
ip domain-name skola.example
crypto key generate rsa
line vty 0 4
 login local
 transport input ssh
end
copy running-config startup-config
show running-config
show ip interface brief
```

Na routeri sa namiesto manažérskej SVI nastavujú IP adresy fyzických rozhraní a podľa potreby statické alebo dynamické routovanie. Pri reálnom nasadení sa nepoužíva heslo z príkladu, zakáže sa nepotrebný HTTP/Telnet prístup, obmedzia sa VTY účty a overí sa konfigurácia aj logy. Príkazy sú vendorovo špecifické.

## Krátka ústna odpoveď

OOP používa triedy ako predlohy a objekty ako inštancie so stavom a správaním. Zapuzdrenie, abstrakcia, dedičnosť a polymorfizmus pomáhajú riadiť zložitosť. `private`, `public`, `protected` a podľa jazyka `internal` určujú prístup; statické členy patria triede, nestatické objektu. Základná konfigurácia zariadenia nastaví názov, prístup, IP, bránu alebo routovanie, SSH, uloženie a overenie príkazmi `show`.
