---
title: "ENSA 10 – Správa siete"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 10
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 10: Network Management"
tags:
  - ist
  - siete
  - ccna3
  - správa-siete
  - konfigurácia
  - packet-tracer
---

# ENSA 10 – Správa siete (Network Management)

> [!abstract] Ciele modulu
> CDP a LLDP na mapovanie topológie · NTP · SNMP · Syslog · záloha a obnova konfigurácie · správa IOS image.
> Súvisí s [[T12 – Diagnostika sietí]], [[T17 – Robotika a softvérové aplikácie]] (sieťová dokumentácia) a [[T19 – Vstupno-výstupné operácie a výpočty]] (zálohovanie dát).

## 1. CDP – Cisco Discovery Protocol

- **Cisco proprietárny L2** protokol – zisťuje info o **susedných Cisco zariadeniach na tej istej linke**.
- Pomáha zrekonštruovať topológiu, keď chýba dokumentácia.
- Na Cisco zariadeniach je **zapnutý defaultne**. Bezpečnosť: na rozhraniach smerom von ho vypni.

```text
Router(config)# no cdp run            ! globálne vypnúť
Router(config)# cdp run               ! globálne zapnúť
Router(config-if)# no cdp enable      ! na rozhraní
Router# show cdp
Router# show cdp neighbors            ! Device ID, lokálne rozhranie, capability, platforma, port suseda
Router# show cdp neighbors detail     ! + IP adresa suseda a verzia IOS
Router# show cdp interface
```

## 2. LLDP – Link Layer Discovery Protocol

- **Otvorený štandard (IEEE 802.1AB)**, funguje naprieč výrobcami; na Cisco **defaultne vypnutý**.

```text
Switch(config)# lldp run
Switch(config-if)# lldp transmit
Switch(config-if)# lldp receive
Switch# show lldp
Switch# show lldp neighbors [detail]
```

## 3. NTP – Network Time Protocol

- Správny čas je nutný pre logy, certifikáty, korelovanie udalostí. Čas sa dá nastaviť ručne (`clock set`) alebo cez NTP.
- NTP používa **UDP 123**; hierarchia úrovní **stratum**:
  - **stratum 0** – autoritatívny zdroj (atómové hodiny, GPS),
  - **stratum 1** – priamo pripojené k stratum 0,
  - **stratum 2** – synchronizujú sa zo stratum 1 … (max. 15; 16 = nesynchronizované).

```text
R1(config)# ntp server 209.165.200.225   ! klient
R2(config)# ntp master 1                 ! router ako autoritatívny NTP server
R1# show clock detail
R1# show ntp associations
R1# show ntp status
```

## 4. SNMP – Simple Network Management Protocol

- Aplikačný protokol (**UDP 161**, trapy **UDP 162**) na správu routerov, switchov, serverov…
- 3 prvky: **SNMP manager** (časť **NMS**), **SNMP agent** (softvér na spravovanom zariadení), **MIB** (databáza objektov, hierarchická, objekty identifikuje **OID**).
- Operácie: `get-request`, `get-next-request`, `get-bulk-request` (od v2), `get-response`, `set-request`.
  - **get** – manažér číta (polling), **set** – manažér mení konfiguráciu,
  - **trap** – **nevyžiadaná** správa od agenta (napr. vysoké CPU) → netreba neustále pollovať.
- Verzie:
  - **SNMPv1** – zastaraná, community strings,
  - **SNMPv2c** – **community strings** (nešifrované), bulk retrieval, rozšírené chybové kódy,
  - **SNMPv3** – **autentifikácia, integrita, šifrovanie**; security modely aj úrovne (noAuthNoPriv, authNoPriv, authPriv).
- **Community strings:** **read-only (ro)** – len čítanie, **read-write (rw)** – aj zápis.
- Nástroje: `snmpget`, Cisco SNMP Navigator (vyhľadanie OID).

## 5. Syslog

- Najbežnejší spôsob zberu systémových správ; posiela ich na **syslog server cez UDP 514**.
- Ciele: logging buffer (RAM), konzola, terminálové linky (VTY), syslog server.
- Formát: **`%FACILITY-SEVERITY-MNEMONIC: popis`** (napr. `%LINK-3-UPDOWN`).

| Úroveň | Názov | Význam |
| --- | --- | --- |
| **0** | Emergency | systém nepoužiteľný (**najzávažnejšie**) |
| 1 | Alert | treba okamžite konať |
| 2 | Critical | kritický stav |
| 3 | Error | chyba |
| 4 | Warning | varovanie |
| 5 | Notification | normálne, ale významné |
| 6 | Informational | informačné |
| 7 | Debugging | ladiace (**najmenej závažné**) |

> [!tip] Pomôcka
> „**E**very **A**wesome **C**isco **E**ngineer **W**ill **N**eed **I**ce cream **D**aily“ → 0–7.

- Facility príklady: IP, OSPF, SYS, IPSEC, IF.
- Časové razítka: `service timestamps log datetime`.
- Logovanie na server: `logging host <IP>`, `logging trap <úroveň>` – posiela úroveň a všetky **numericky nižšie** (závažnejšie).

## 6. Údržba súborov routera/switcha

- **Cisco IFS** (IOS File System): `show file systems`, `dir`, `cd`, `pwd`, `more`.
- Úložiská: flash, NVRAM, USB (`usbflash0:`), TFTP server.

```text
R1# copy running-config startup-config
R1# copy running-config tftp          ! záloha na TFTP server
R1# copy startup-config tftp          ! záloha konfigurácie z NVRAM
R1# copy tftp running-config          ! obnova z TFTP do RAM (merge)
R1# copy running-config usbflash0:/
R1# dir usbflash0:
```

- Konfiguráciu možno uložiť aj ako text (Tera Term – log) a vložiť späť.

### Obnova hesla (password recovery)

1. Pripoj sa konzolou, reštartuj router a počas bootu stlač **Break** → **ROMMON**.
2. `confreg 0x2142` (ignorovať startup-config) → `reset`.
3. `copy startup-config running-config`, nastav nové heslo (`enable secret …`).
4. `config-register 0x2102` (normálny boot) → `copy running-config startup-config`.

## 7. Správa IOS image

1. Vyber správny IOS (platforma, funkcie), stiahni ho na **TFTP server**.
2. `ping` na TFTP server, over voľnú flash: `show flash:`.
3. `copy tftp: flash:` – skopíruj image.
4. `boot system flash0:<image.bin>` – nastav boot.
5. `copy running-config startup-config`, `reload`.
6. Over: `show version`.

## Krátka ústna odpoveď

Správa siete využíva CDP (Cisco, L2, defaultne zapnutý) a LLDP (otvorený štandard) na zistenie susedov a mapovanie topológie, NTP na synchronizáciu času v hierarchii stratum, SNMP (manažér, agent, MIB; get, set, trap; v2c s community strings, v3 so šifrovaním a autentifikáciou) na monitoring a Syslog (UDP 514, úrovne 0 – 7, 0 je najzávažnejšia) na zber správ. Konfigurácie sa zálohujú na TFTP alebo USB príkazmi copy a IOS image sa aktualizuje cez TFTP, boot system a reload.

## Kvíz – kľúčové otázky z kurzu

- Info o Cisco zariadeniach na tej istej linke → **CDP**; naprieč výrobcami → **LLDP**.
- `show cdp neighbors detail` navyše ukáže → **IP adresu suseda**.
- Autoritatívny NTP server → `ntp master 1`.
- Nevyžiadané upozornenie (vysoké CPU) → **SNMP trap**; agent = **softvér na spravovanom zariadení**.
- Zabezpečenie prístupu k MIB vo v1/v2 → **community strings**; v3 → autentifikácia zdroja a integrita.
- MIB → **OID sú usporiadané hierarchicky**.
- Úroveň 0 → **najzávažnejšia**.
- `copy running-config tftp` → **uloženie konfigurácie na vzdialený server**; `copy tftp running-config` → **z TFTP do RAM**; `copy startup-config tftp` → **konfigurácia z NVRAM na TFTP**.
- Obnova IOS image → `copy tftp: flash0:`.

Predchádzajúci: [[ENSA 09 – Koncepty QoS]] · Ďalej: [[ENSA 11 – Návrh siete]] · Späť: [[CCNA3 – ENSA]]
