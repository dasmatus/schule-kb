---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T25 – Tvorba grafických rozhraní

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> TVORBA GRAFICKÝCH ROZHRANÍ - druhy grafických prostredí, vývojové prostredie v režime tvorby aplikácie, základné komponenty, základné udalosti, transportná a relačná vrstva modelu OSI

## Druhy grafických prostredí

Grafické používateľské rozhranie (GUI) umožňuje ovládať aplikáciu oknami, tlačidlami, ponukami a formulármi. **Desktopové** GUI beží v operačnom systéme a používa jeho okná a súbory, **webové** sa vykresľuje v prehliadači a komunikuje so serverom a **mobilné** je prispôsobené dotyku, menšej obrazovke a senzorom. Všetky sú zvyčajne udalosťami riadené: používateľská akcia vyvolá obsluhu udalosti.

Pri návrhu treba myslieť na prístupnosť, čitateľnosť, konzistentné rozloženie, lokalizáciu, validáciu a oddelenie používateľského rozhrania od logiky aplikácie.

## Vývojové prostredie v režime tvorby aplikácie

IDE alebo GUI framework často ponúka návrhový režim (*designer*). Vývojár vyberie komponent z palety, umiestni ho na formulár, nastaví vlastnosti a priradí udalosti. Strom komponentov opisuje vnorenie a layout manager určuje, ako sa prvky prispôsobia veľkosti okna. Zdrojový režim obsahuje logiku handlerov, dát a volaní služieb; generovaný súbor sa nemá ručne upravovať, ak to framework nepredpokladá.

Bežný cyklus je návrh → nastavenie vlastností → pripojenie udalostí → zostavenie → spustenie v debug režime → test validácie a chybových stavov. GUI vlákno sa nemá blokovať dlhým sieťovým alebo súborovým výpočtom; taká úloha patrí do asynchrónnej operácie.

## Základné komponenty

- okno/formulár a kontajnery (panel, group box, layout),
- label/textový popis,
- textové pole a viacriadkový editor,
- tlačidlo a odkaz,
- zaškrtávacie políčko a prepínač/radio button,
- combo box, zoznam a tabuľka,
- menu, toolbar, stavový riadok a dialóg,
- progress bar, obrázok a notifikačné prvky.

Komponent má identifikátor, text, veľkosť, pozíciu, viditeľnosť a povolenie; tabuľka má navyše model dát a výber riadku. Vlastnosti nastavujeme tak, aby komponenty boli použiteľné klávesnicou aj čítačkou obrazovky.

## Základné udalosti

Udalosť môže byť kliknutie, načítanie formulára, zmena textu alebo výberu, stlačenie/uvolnenie klávesu, pohyb/kliknutie myšou, zatvorenie okna alebo zmena veľkosti. Handler udalosti:

1. prečíta vstup,
2. overí formát a rozsah,
3. zavolá aplikačnú logiku,
4. zobrazí výsledok alebo zrozumiteľnú chybu.

Pri opakovanom pripojení handlera môže jedno kliknutie spustiť logiku viackrát, preto treba životný cyklus udalostí kontrolovať.

## Transportná a relačná vrstva OSI

**Transportná vrstva** poskytuje komunikáciu proces–proces. TCP vytvára spojenie, čísluje segmenty, potvrdzuje prijatie, riadi tok a pri strate opakuje dáta; UDP je bezspojový datagramový transport s menšou réžiou, ale bez zabudovanej spoľahlivosti. Porty rozlišujú aplikácie na jednom hostiteľovi. GUI klient môže napríklad odoslať HTTP požiadavku cez TCP alebo použiť UDP pre časovo citlivé dáta.

**Relačná vrstva** OSI vytvára, udržiava, synchronizuje a ukončuje logickú reláciu medzi aplikáciami; môže používať kontrolné body a obnovu. V praktickom TCP/IP modeli sa jej funkcie často spájajú s aplikačnou vrstvou a rieši ich konkrétny protokol alebo framework. Neznamená to, že relácia neexistuje, iba nie je vždy samostatná vrstva.

## Technológie GUI

| Prostredie | Technológie |
| --- | --- |
| desktop (Windows) | **WinForms**, WPF (XAML), WinUI |
| multiplatformové | .NET MAUI, Avalonia, Qt, Java Swing/JavaFX |
| web | HTML + CSS + JavaScript (React, Blazor) |
| mobil | Android (Kotlin, Jetpack Compose), iOS (Swift) |

## Visual Studio – režim návrhu (WinForms)

- **Toolbox** – paleta komponentov, ťahajú sa myšou na formulár
- **Properties** – vlastnosti komponentu; ikona blesku prepne na **udalosti**
- **Solution Explorer** – súbory projektu
- `Form1.cs` – môj kód (obsluhy udalostí), `Form1.Designer.cs` – kód
  vygenerovaný návrhárom (ručne sa neupravuje)
- dvojklik na komponent vytvorí obsluhu jeho predvolenej udalosti
- spustenie **F5** (s ladením), bod prerušenia **F9**

## Komponenty a ich vlastnosti

| Komponent | Predpona | Dôležité vlastnosti |
| --- | --- | --- |
| Button | `btn` | Text, Enabled |
| Label | `lbl` | Text, ForeColor |
| TextBox | `txt` | Text, Multiline, ReadOnly, PasswordChar |
| CheckBox | `chk` | Checked |
| RadioButton | `rb` | Checked (v skupine len jeden) |
| ComboBox | `cmb` | Items, SelectedItem, SelectedIndex |
| ListBox | `lst` | Items |
| NumericUpDown | `nud` | Value, Minimum, Maximum |
| DataGridView | `dgv` | DataSource, Rows |
| PictureBox | `pic` | Image, SizeMode |
| Timer | `tmr` | Interval, Enabled |

Spoločné vlastnosti: `Name`, `Text`, `Location`, `Size`, `Visible`,
`Enabled`, `BackColor`, `Font`, `Anchor`/`Dock` (správanie pri zmene veľkosti okna).

## Udalosti

| Udalosť | Kedy nastane |
| --- | --- |
| `Click` | kliknutie |
| `Load` | načítanie formulára (pred zobrazením) |
| `TextChanged` | zmena textu v TextBoxe |
| `SelectedIndexChanged` | zmena výberu v ComboBoxe / ListBoxe |
| `CheckedChanged` | zaškrtnutie / odškrtnutie |
| `KeyDown`, `KeyPress` | stlačenie klávesu |
| `MouseMove`, `MouseClick` | pohyb / klik myšou |
| `Tick` | uplynutie intervalu Timera |
| `FormClosing` | zatváranie okna (dá sa zrušiť) |

```csharp
private void Form1_Load(object sender, EventArgs e)
{
    cmbPrefix.Items.AddRange(new object[] { 24, 25, 26, 27, 28 });
    cmbPrefix.SelectedIndex = 0;
}

private void btnVypocitaj_Click(object sender, EventArgs e)
{
    int prefix = (int)cmbPrefix.SelectedItem;
    int hostia = (int)Math.Pow(2, 32 - prefix) - 2;
    lblVysledok.Text = $"/{prefix} → {hostia} hostí";
}

private void Form1_FormClosing(object sender, FormClosingEventArgs e)
{
    if (MessageBox.Show("Naozaj zavrieť?", "Koniec",
        MessageBoxButtons.YesNo) == DialogResult.No)
        e.Cancel = true;
}
```

`sender` je komponent, ktorý udalosť vyvolal, `e` nesie údaje o udalosti
(napr. stlačený kláves).

## Transportná vrstva – doplnenie

**Nadviazanie TCP spojenia** (*3-way handshake*): klient → `SYN`, server →
`SYN-ACK`, klient → `ACK`. **Ukončenie** štyrmi správami: `FIN` → `ACK` →
`FIN` → `ACK`.

Polia hlavičky TCP: zdrojový a cieľový port, poradové číslo (*sequence*),
číslo potvrdenia (*acknowledgment*), príznaky (SYN, ACK, FIN, RST), veľkosť
okna (*window* – riadenie toku), kontrolný súčet.

| Rozsah portov | Čísla | Príklad |
| --- | --- | --- |
| známe (*well-known*) | 0–1023 | 80 HTTP, 443 HTTPS, 22 SSH |
| registrované | 1024–49151 | 3306 MySQL, 3389 RDP |
| dynamické (klientske) | 49152–65535 | náhodný zdrojový port klienta |

**Socket** = IP adresa + port (napr. `192.168.10.5:51234`). Spojenie je
jednoznačne určené dvojicou socketov klienta a servera.

## Relačná vrstva – príklady

Udržiavanie relácie: prihlásenie do webovej aplikácie (session cookie), RPC
(vzdialené volanie procedúr), NetBIOS, kontrolné body pri dlhom prenose
(po výpadku sa pokračuje od posledného bodu), riadenie dialógu (simplex,
half-duplex, full-duplex).

## Krátka ústna odpoveď

GUI môže byť desktopové, webové alebo mobilné a pracuje udalosťami. V návrhovom režime IDE rozmiestňujem komponenty, nastavujem vlastnosti a pripájam handlery; základom sú okná, labely, textové polia, tlačidlá, voľby, zoznamy a tabuľky. Udalosti sú napríklad kliknutie, zmena textu, kláves alebo zatvorenie. Transportná vrstva rieši komunikáciu procesov pomocou TCP/UDP a portov, relačná vrstva správu relácie; v TCP/IP sa často spájajú do aplikačnej vrstvy.

## Kontrolné otázky

> [!question]- Aké druhy grafických prostredí poznáš?
> Desktopové (WinForms, WPF), webové (HTML/CSS/JS), mobilné (Android, iOS).
> Všetky sú riadené udalosťami.

> [!question]- Ako vyzerá práca vo Visual Studiu v režime návrhu?
> Z Toolboxu ťahám komponenty na formulár, v okne Properties nastavujem
> vlastnosti a cez ikonu blesku priraďujem udalosti; kód obsluhy píšem do Form1.cs.

> [!question]- Vymenuj základné komponenty GUI.
> Form, Button, Label, TextBox, CheckBox, RadioButton, ComboBox, ListBox,
> DataGridView, PictureBox, MenuStrip, Timer.

> [!question]- Vymenuj základné udalosti.
> Click, Load, TextChanged, SelectedIndexChanged, CheckedChanged, KeyDown,
> MouseMove, Tick, FormClosing.

> [!question]- Čo sú parametre sender a e v obsluhe udalosti?
> `sender` – objekt, ktorý udalosť vyvolal; `e` – dodatočné údaje o udalosti.

> [!question]- Aké úlohy má transportná vrstva?
> Komunikácia proces–proces cez porty, segmentácia, pri TCP spoľahlivosť
> (potvrdzovanie, opakovanie), poradie a riadenie toku.

> [!question]- Ako prebieha nadviazanie TCP spojenia?
> 3-way handshake: SYN → SYN-ACK → ACK.

> [!question]- Akú úlohu má relačná vrstva?
> Vytvorenie, udržiavanie, synchronizácia (kontrolné body) a ukončenie relácie
> medzi aplikáciami; v TCP/IP je súčasťou aplikačnej vrstvy.
