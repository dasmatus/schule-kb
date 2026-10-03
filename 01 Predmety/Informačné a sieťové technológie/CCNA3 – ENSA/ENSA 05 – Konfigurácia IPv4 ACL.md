---
title: "ENSA 05 – Konfigurácia IPv4 ACL"
predmet: "Informačné a sieťové technológie"
typ: "poznámky"
kurz: "CCNA3 – ENSA (Enterprise Networking, Security, and Automation)"
modul: 5
ročník_teraz: "IV.IST"
zdroj: "Cisco NetAcad – CCNA3_IV_IST_2026_27, Module 5: ACLs for IPv4 Configuration"
tags:
  - ist
  - siete
  - ccna3
  - acl
  - konfigurácia
  - packet-tracer
---

# ENSA 05 – Konfigurácia IPv4 ACL

> [!abstract] Ciele modulu
> Štandardné ACL (číslované aj pomenované) · úprava ACL cez sekvenčné čísla · zabezpečenie VTY liniek · rozšírené ACL.
> Teória: [[ENSA 04 – Koncepty ACL]].

## 1. Štandardná číslovaná ACL

```text
Router(config)# access-list <1-99|1300-1999> {deny | permit | remark text} <zdroj> [wildcard] [log]
```

- `any` = všetci, `host 192.168.10.10` = jeden host (alebo len IP bez wildcard – default wildcard 0.0.0.0).
- `remark` – max. 100 znakov. `log` – len na troubleshooting/bezpečnosť.
- Zmazanie celej ACL: `no access-list 10`.

```text
R1(config)# access-list 10 remark ACE permits ONLY host 192.168.10.10 to the internet
R1(config)# access-list 10 permit host 192.168.10.10
R1(config)# access-list 10 remark ACE permits all host in LAN 2
R1(config)# access-list 10 permit 192.168.20.0 0.0.0.255
R1(config)# interface Serial0/1/0
R1(config-if)# ip access-group 10 out
```

## 2. Štandardná pomenovaná ACL

```text
R1(config)# ip access-list standard PERMIT-ACCESS
R1(config-std-nacl)# remark ACE permits host 192.168.10.10
R1(config-std-nacl)# permit host 192.168.10.10
R1(config-std-nacl)# permit 192.168.20.0 0.0.0.255
R1(config-std-nacl)# exit
R1(config)# interface Serial0/1/0
R1(config-if)# ip access-group PERMIT-ACCESS out
```

- Názvy sú **case-sensitive** a unikátne.
- Odstránenie: najprv `no ip access-group …` na rozhraní, potom `no ip access-list standard NAME`.

## 3. Aplikovanie na rozhranie

```text
Router(config-if)# ip access-group {číslo | názov} {in | out}
```

Overenie: `show ip interface` (či a ktorým smerom je ACL na rozhraní), `show access-lists` (obsah + počty zhôd), `show running-config`.

## 4. Úprava ACL

- **Metóda 1 – textový editor:** skopíruj ACL, uprav, zmaž starú (`no access-list 1`) a vlož novú.
- **Metóda 2 – sekvenčné čísla:** ACE dostávajú čísla 10, 20, 30…; vidno ich v `show access-lists` (**nie** v `show running-config`).

```text
R1(config)# ip access-list standard 1
R1(config-std-nacl)# no 10
R1(config-std-nacl)# 10 deny host 192.168.10.10
R1(config-std-nacl)# 15 deny 192.168.10.5        ! vloženie medzi 10 a 20
```

- Štatistiky: `show access-lists` (počty `matches`), vynulovanie: `clear access-list counters`.

## 5. Zabezpečenie VTY liniek štandardnou ACL

- Štandardná ACL môže obmedziť **vzdialený prístup (Telnet/SSH) na samotný router**.
- Aplikuje sa na **VTY linky** príkazom **`access-class`** (nie `ip access-group`!), najčastejšie smerom **`in`**.
- Rovnaké obmedzenie daj na **všetky VTY linky**.

```text
R1(config)# username ADMIN secret class
R1(config)# ip access-list standard ADMIN-HOST
R1(config-std-nacl)# remark This ACL secures incoming vty lines
R1(config-std-nacl)# permit 192.168.10.10
R1(config-std-nacl)# deny any
R1(config-std-nacl)# exit
R1(config)# line vty 0 4
R1(config-line)# login local
R1(config-line)# transport input ssh
R1(config-line)# access-class ADMIN-HOST in
```

## 6. Rozšírená ACL

```text
Router(config)# access-list <100-199|2000-2699> {deny | permit | remark text} <protokol>
   <zdroj> <zdroj-wildcard> [operátor port] <cieľ> <cieľ-wildcard> [operátor port] [established] [log]
```

- **Protokol:** `ip` (všetko), `tcp`, `udp`, `icmp`…
- **Operátory:** `eq` (=), `neq`, `lt` (<), `gt` (>), `range`.
- Porty názvom (`www`, `ftp`, `ftp-data`, `telnet`, `smtp`, `domain`) alebo číslom (SSH **22**, HTTPS **443** – pre ne názov často nie je).
- **`established`** (len TCP) – povolí iba **návratovú** prevádzku na spojenia, ktoré iniciovala vnútorná sieť (ACK/RST bit) – jednoduchý stavový firewall.

### Príklad – povoliť LAN surfovať (HTTP/HTTPS) a len odpovede späť

```text
R1(config)# access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq www
R1(config)# access-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq 443
R1(config)# access-list 120 permit tcp any 192.168.10.0 0.0.0.255 established
R1(config)# interface g0/0/0
R1(config-if)# ip access-group 110 in
R1(config-if)# ip access-group 120 out
```

### Pomenovaná rozšírená ACL

```text
R1(config)# ip access-list extended SURFING
R1(config-ext-nacl)# remark Permits inside HTTP and HTTPS traffic
R1(config-ext-nacl)# permit tcp 192.168.10.0 0.0.0.255 any eq 80
R1(config-ext-nacl)# permit tcp 192.168.10.0 0.0.0.255 any eq 443
R1(config-ext-nacl)# exit
R1(config)# ip access-list extended BROWSING
R1(config-ext-nacl)# remark Only permit returning HTTP and HTTPS traffic
R1(config-ext-nacl)# permit tcp any 192.168.10.0 0.0.0.255 established
R1(config-ext-nacl)# exit
R1(config)# interface g0/0/0
R1(config-if)# ip access-group SURFING in
R1(config-if)# ip access-group BROWSING out
```

### Príklad – PC1 smie len vybrané služby

```text
R1(config)# ip access-list extended PERMIT-PC1
R1(config-ext-nacl)# permit tcp host 192.168.10.10 any eq 20
R1(config-ext-nacl)# permit tcp host 192.168.10.10 any eq 21
R1(config-ext-nacl)# permit tcp host 192.168.10.10 any eq 22
R1(config-ext-nacl)# permit udp host 192.168.10.10 any eq 53
R1(config-ext-nacl)# permit tcp host 192.168.10.10 any eq 80
R1(config-ext-nacl)# permit tcp host 192.168.10.10 any eq 443
R1(config-ext-nacl)# deny ip 192.168.10.0 0.0.0.255 any
```

## 7. Najčastejšie porty (treba vedieť naspamäť)

| Port | Služba | Port | Služba |
| --- | --- | --- | --- |
| 20/21 | FTP dáta/riadenie | 53 | DNS (UDP aj TCP) |
| 22 | SSH | 67/68 | DHCP (UDP) |
| 23 | Telnet | 69 | TFTP (UDP) |
| 25 | SMTP | 80 | HTTP (`www`) |
| 110 | POP3 | 143 | IMAP |
| 161/162 | SNMP (UDP) | 443 | HTTPS |
| 514 | Syslog (UDP) | 123 | NTP (UDP) |

## Typické chyby

- zlý smer (`in` vs. `out`) alebo zlé rozhranie,
- zlé poradie ACE (všeobecné pravidlo pred špecifickým),
- zabudnuté implicitné `deny any` → nič nefunguje (ani routing protokoly!),
- pri ICMP filtrovaní zablokovaný **echo-reply** → nefunguje ping späť,
- na VTY použité `ip access-group` namiesto `access-class`.

## Kvíz – kľúčové otázky z kurzu

- Len admin sieť 10.7.0.0/27 smie Telnet → `access-list 5 permit 10.7.0.0 0.0.0.31` + `access-class 5 in`.
- Počty paketov povolených/zakázaných ACL → `show access-lists`.
- Ochrana Telnetu na samotný router → ACL na **všetky VTY linky smerom in**.
- `access-list 110 permit tcp 172.16.0.0 0.0.0.255 any eq 22` → **SSH z 172.16.0.0/24 kamkoľvek**.
- ACL s jediným `deny icmp … echo-reply` aplikovaná out → **neprejde nič** (implicit deny).
- Výstup `access-class` ACL „10 permit … (2 matches)“ → **2 zariadenia sa pripojili cez SSH/Telnet**.
- Správne štandardné ACL → `access-list 90 permit 192.168.10.5 0.0.0.0`, `access-list 35 permit host 172.31.22.7`.
- Inbound ICMP, ktoré treba povoliť na troubleshooting → **echo-reply**.
- Deny IP z hosta 10.1.1.1 do 192.168.0.0/16 → `access-list 100 deny ip host 10.1.1.1 192.168.0.0 0.0.255.255`.
- Aplikovanie ACL na SSH prístup → `R1(config-line)# access-class 1 in`.

Predchádzajúci: [[ENSA 04 – Koncepty ACL]] · Ďalej: [[ENSA 06 – NAT pre IPv4]] · Späť: [[CCNA3 – ENSA]]
