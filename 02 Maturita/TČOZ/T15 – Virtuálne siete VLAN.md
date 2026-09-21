---
okruh: "TČOZ"
stav: "vypracované"
tags: [maturita, TČOZ, IST, vypracovaná-téma]
---
# T15 – Virtuálne siete VLAN

> [!info] Oficiálne znenie okruhu (PDF sylabus)
> VIRTUÁLNE SIETE VLAN – zariadenia, na ktorých konfigurujeme VLANy, defaultné nastavenie VLAN1, konfigurácia VLAN, InterVlan routing, konštruktor, prístupové metódy v OOP

## Zariadenia a porty pre VLAN

VLAN sa konfiguruje na spravovanom switchi. Koncové zariadenie pripájame na **access port**, ktorý patrí do jednej VLAN. Prepoj medzi switchmi alebo medzi switchom a routerom je **trunk**; prenáša viac VLAN a používa značky IEEE 802.1Q. Na tretej vrstve môže VLAN obsluhovať router alebo multilayer switch pomocou SVI.

VLAN vytvára samostatnú broadcastovú doménu. Znižuje počet broadcastov a umožňuje oddeliť napríklad používateľov, telefóny, servery a správu, ale bezpečnosť treba doplniť ACL a firewallom. Hostitelia v rôznych VLAN potrebujú inter-VLAN routing.

## Predvolené nastavenie VLAN 1

VLAN 1 býva predvolená na mnohých switchoch a access porty do nej patria, kým ich správca neprekonfiguruje. Na niektorých platformách ju nemožno úplne odstrániť. Z bezpečnostných dôvodov sa bežná správa a používateľská prevádzka oddeľujú do vyhradenej VLAN; native VLAN na trunku má byť zhodná a podľa politiky nepoužívaná na koncové zariadenia. Presné obmedzenia závisia od výrobcu, preto treba overiť dokumentáciu.

## Konfigurácia VLAN v štýle Cisco IOS

```text
enable
configure terminal
vlan 10
 name STUDENTI
vlan 20
 name SERVERY
interface FastEthernet0/3
 switchport mode access
 switchport access vlan 10
interface GigabitEthernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20
end
show vlan brief
show interfaces trunk
```

Na oboch koncoch trunku treba zhodne nastaviť podporované VLAN, prípadnú native VLAN a bezpečnostné pravidlá. Príkazy sú ukážka pre Cisco IOS, nie univerzálny štandard.

## Inter-VLAN routing

Pri **router-on-a-stick** sa na jednom fyzickom porte vytvoria subrozhrania:

```text
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0
```

Switch k routeru musí mať trunk a hostitelia používajú príslušnú SVI/subinterface ako predvolenú bránu. Pri multilayer switchi sa vytvoria SVI `interface vlan 10`, nastaví sa IP adresa a zapne sa `ip routing`; switch potom smeruje medzi priamo pripojenými VLAN.

## Konštruktor a prístupové metódy v OOP

**Konštruktor** je špeciálna metóda volaná pri vytvorení objektu. Nastaví počiatočný stav a overí povinné hodnoty:

```text
trieda VLAN:
    private id
    konštruktor(id):
        ak id < 1 alebo id > 4094: chyba
        this.id = id
```

Prístupové metódy, napríklad `getId()` a `setId()`, poskytujú kontrolované čítanie a zmenu súkromných atribútov. Setter môže hodnotu validovať, prípadne sa namiesto neho použije iba getter pre nemenný údaj. Nejde o to sprístupniť všetky polia verejne, ale zachovať zapuzdrenie.

## Krátka ústna odpoveď

VLAN konfigurujeme na managed switchi; access port patrí do jednej VLAN a trunk prenáša viac VLAN s tagom 802.1Q. VLAN 1 je predvolená, no bežnú prevádzku a správu je vhodné oddeliť. Inter-VLAN routing sa robí router-on-a-stick subrozhraniami alebo SVI na multilayer switchi. Konštruktor nastaví objekt pri vytvorení a gettery/settery kontrolujú prístup k zapuzdreným údajom.
