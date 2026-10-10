---
title: "M12 – WLAN Concepts"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 12
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, wlan, poznámky]
---

# M12 – WLAN Concepts

> [!info] Súvisí s maturitou
> [[T09 – Siete LAN, WAN, VLAN]] · [[T07 – Kybernetická bezpečnosť]] · späť na [[CCNA2 – SRWE]]

## Typy bezdrôtových sietí
**WPAN** (Bluetooth, ~10 m) · **WLAN** (802.11, ~100 m) · **WMAN** (mesto) · **WWAN** (krajina/kontinent)
Technológie: Bluetooth (BLE + BR/EDR), WiMAX (802.16), mobilné siete (4G/5G), satelit.

## Štandardy 802.11
| Štandard | Pásmo | Max. rýchlosť | Poznámka |
|---|---|---|---|
| 802.11 | 2,4 GHz | 2 Mbps | |
| 802.11a | **5 GHz** | 54 Mbps | nekompatibilný s b/g |
| 802.11b | 2,4 GHz | 11 Mbps | |
| 802.11g | 2,4 GHz | 54 Mbps | kompatibilný s b |
| 802.11n | 2,4 + 5 GHz | 150–600 Mbps | **MIMO** (do 4 antén) |
| 802.11ac | **5 GHz** | 450 Mbps – 1,3 Gbps | MIMO do 8 antén |
| 802.11ax (Wi-Fi 6) | 2,4 + 5 GHz | – | 2019, High-Efficiency Wireless |

- **2,4 GHz** = väčší dosah, viac rušenia. **5 GHz** = rýchlejšie, menší dosah, viac kanálov.
- Organizácie: **ITU-R** (prideľovanie spektra), **IEEE** (štandardy 802.11), **Wi-Fi Alliance** (certifikácia kompatibility).

## Komponenty
- **Bezdrôtová NIC**, **domáci bezdrôtový router** (= AP + switch + router + DHCP + NAT).
- **Kategórie AP:**
  - **autonómne** – každý sa konfiguruje zvlášť (CLI/GUI), vhodné pre malé siete; domáci router je tiež autonómny
  - **controller-based** (lightweight) – bez lokálnej konfigurácie, centrálne ich riadi **WLC** cez **LWAPP/CAPWAP**
- **Antény:** **všesmerové** (360°, domácnosti/kancelárie), **smerové** (Yagi, parabolické – point-to-point), **MIMO** (viac antén → väčšia šírka pásma).

## Topologické režimy
- **Ad hoc** – peer-to-peer bez AP (IBSS). **Tethering** = mobil ako hotspot (forma ad hoc).
- **Infrastructure** – cez AP.
  - **BSS** – jeden AP + klienti; identifikuje ho **BSSID** = MAC AP. Pokrytie = **BSA**.
  - **ESS** – viac BSS spojených drôtovým **distribučným systémom (DS)**; rovnaké SSID, klienti roamujú. Pokrytie = **ESA**.

## Rámec 802.11
Frame Control · Duration · **Address 1–4** · Sequence Control · Payload · FCS (≠ Ethernet: 4 adresy).

## CSMA/CA
Wi-Fi je **half duplex**, zdieľané médium → **predchádzanie kolíziám**:
1. Počúvaj – je kanál voľný?
2. Ak nie → počkaj náhodný čas (backoff).
3. Ak áno → pošli (prípadne najprv RTS/CTS).
4. Čakaj na **ACK**; bez ACK → predpokladaj kolíziu a pošli znova.

## Klient ↔ AP
Discover → **authenticate** → **associate**.
Musí sedieť: **SSID**, **heslo**, **network mode** (a/b/g/n/ac/ax), **security mode** (WEP/WPA/WPA2/WPA3), **kanál**.
- **Pasívne hľadanie** – AP posiela **beacony** so SSID, podporovanými štandardmi a zabezpečením.
- **Aktívne hľadanie** – klient pošle **probe request** (aj na skryté SSID), AP odpovie probe response.

## CAPWAP
IEEE štandardný protokol, ktorým **WLC riadi viac AP/WLAN** (nástupca LWAPP). IPv4/IPv6, UDP **5246** (riadenie) / **5247** (dáta).
**Split MAC:**
| Robí AP | Robí WLC |
|---|---|
| beacony, probe responses | **autentifikácia** |
| ACK a opakované vysielanie | asociácia / reasociácia (roaming) |
| fronty rámcov, priorizácia | preklad rámcov na iné protokoly |
| šifrovanie/dešifrovanie na MAC vrstve | ukončenie 802.11 prevádzky na drôtovej strane |

- **DTLS** – šifruje CAPWAP tunel AP↔WLC: **riadiaci** predvolene, **dátový** voliteľne.
- **FlexConnect** – AP v pobočke riadené cez WAN bez lokálneho WLC. Režimy: **connected** (WLC dostupný) a **standalone** (WLC nedostupný, AP obsluhuje klientov ďalej).

## Kanály
Metódy: **DSSS**, **FHSS** (Bluetooth), **OFDM**.
- **2,4 GHz:** kanály po **22 MHz**, rozostup 5 MHz → prekrývajú sa. **Neprekrývajúce sa: 1, 6, 11** (Severná Amerika); aj pre 802.11n väčšinou 1/6/11.
- **5 GHz:** veľa neprekrývajúcich sa kanálov (napr. 36, 40, 44, 48, 52, 56, 60, 64…).
- Plánovanie: susedné AP na rôznych kanáloch, prekryv buniek ~10–15 %, počet AP a pokrytie (kruhy).

## Hrozby
- **Odpočúvanie dát**, **neoprávnení používatelia**, **DoS** (zlá konfigurácia, úmyselné rušenie, náhodné rušenie mikrovlnkou, bezdrôtovými telefónmi…), **rogue AP**.
- **Rogue AP** – neautorizovaný AP v sieti → zachytávanie MAC/dát, prístup k zdrojom, MITM. Ochrana: rogue AP politiky na WLC + monitoring.
- **MITM / „evil twin“** – rogue AP s rovnakým SSID ako legitímny (často so silnejším signálom).

## Zabezpečenie
- **Skrytie SSID** (SSID cloaking) a **MAC filtrovanie** – slabé, ľahko sa obídu.
- Autentifikácia: **Open** (bez hesla) vs **Shared key**:
| Metóda | Šifrovanie | Poznámka |
|---|---|---|
| **WEP** | RC4 | prelomené, nepoužívať |
| **WPA** | **TKIP** | prechodné, stále slabé |
| **WPA2** | **AES-CCMP** | súčasný štandard |
| **WPA3** | AES-GCMP… | **SAE** namiesto PSK, PMF povinné |

- Domácnosť: **WPA2-Personal (PSK)** – spoločné heslo.
- Firma: **WPA2-Enterprise** – **802.1X + RADIUS** (AAA), každý používateľ má vlastné prihlásenie. RADIUS potrebuje: IP servera, UDP **1812** auth / **1813** accounting, zdieľaný kľúč.
- **WPA3:** Personal (**SAE** – ochrana proti offline brute force), Enterprise (192-bit), **Open (OWE – Enhanced Open)**, **IoT onboarding (DPP)**.
