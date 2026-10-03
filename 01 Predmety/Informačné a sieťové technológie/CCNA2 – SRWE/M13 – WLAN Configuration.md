---
title: "M13 – WLAN Configuration"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA2 – SRWE"
modul: 13
ročník_teraz: "IV.IST"
zdroj: "NetAcad – CCNA2_opakovanie_IV_IST"
tags: [ist, siete, ccna, srwe, wlan, poznámky]
---

# M13 – WLAN Configuration

> [!info] Súvisí s maturitou
> [[T12 – Diagnostika sietí]] (postup pri riešení problémov) · späť na [[CCNA2 – SRWE]]

## Bezdrôtový router (domácnosť / pobočka)
Vstavaný switch + WAN/Internet port + Wi-Fi + DHCP + NAT.
1. **Prihlásenie** (predvolená adresa/údaje, napr. 192.168.0.1 admin/admin) → **najprv zmeň heslo správcu**.
2. **Základné nastavenie:** IP routera, rozsah DHCP, hostname, **typ internetového pripojenia** (zvyčajne *Automatic Configuration – DHCP* ku káblovému/DSL modemu).
3. **Wi-Fi:** SSID, režim (mixed/n/ac), kanál, **zabezpečenie WPA2-Personal + heslo**.
4. Dosah: približne **45 m vnútri / 90 m vonku** → ďalej pridaj AP alebo **mesh**.
- **NAT** – privátne IPv4 → verejná.
- **QoS** – hlas/video pred e-mailom/webom.
- **Port forwarding** – otvorenie portu zvonka na interný server (port triggering = otvorí sa až po odchádzajúcom spojení).

## WLC (napr. Cisco 3504) – základná WLAN s WPA2-PSK
Lightweight AP → WLC (LWAPP/CAPWAP). Konfigurácia cez GUI.
- **Monitoring → Access Points** – info a výkon AP; pokročilé nastavenia.
- **WLANs → Create New:** typ WLAN, **Profile name**, **SSID**, ID → **Enable** → **Interface: management** → záložka Security: **WPA2 + PSK**, AES → Apply.

## WLC – WPA2-Enterprise WLAN
Topológia: router-on-a-stick s novým subrozhraním (napr. F0/1.5 = VLAN 5, 192.168.5.1).
1. **SNMP server** (Management → SNMP → Trap Receivers) – WLC posiela **trapy** na SNMP server.
2. **RADIUS server** (Security → AAA → RADIUS → Authentication): IP servera, **shared secret**, port 1812.
3. **Nové rozhranie** (Controller → Interfaces → New): názov, **VLAN ID 5**, port, IP, maska, brána, **DHCP server**.
4. **DHCP scope** (Controller → Internal DHCP Server → DHCP Scope): rozsah od–do, maska, **default router**, DNS, lease.
5. **WLAN** → rozhranie = nové VLAN rozhranie → Security: **WPA2 + 802.1X** → AAA Servers: vyber RADIUS server.

## Riešenie problémov – 6 krokov
1. **Identifikuj problém**
2. **Stanov teóriu pravdepodobných príčin**
3. **Otestuj teóriu** a urč príčinu
4. **Naplánuj riešenie a zrealizuj ho**
5. **Over funkčnosť celého systému** a zaveď preventívne opatrenia
6. **Zdokumentuj** zistenia, kroky a výsledky

### Klient sa nepripojí
- `ipconfig` – má IP (nie 169.254.x.x)? Ping na bránu / na drôtové zariadenie.
- Je Wi-Fi karta zapnutá, vidí SSID, správne heslo/zabezpečenie?
- Fyzicky: je AP/router zapnutý, kábel, firewall/ovládače.
- Rušenie (mikrovlnka, bezdrôtové telefóny, Bluetooth), vzdialenosť, podpora 2,4 vs 5 GHz.

### Pomalá sieť
- Vymeň/aktualizuj klientov (staré b/g spomaľujú všetkých).
- **Rozdeľ prevádzku**: 2,4 GHz na bežnú prevádzku, **5 GHz na médiá/hlas/video**; samostatné SSID pre pásma.
- Zmena kanála, umiestnenie AP.

### Firmvér
Aktualizuj firmvér pravidelne (opravy chýb + bezpečnosti). Klienti sa počas aktualizácie odpoja → mimo pracovného času.
