---
title: DNS Zone
tags: [network]
date: 2020-06-29
---

# DNS Zone
DNS Zone은 Domain namesapce의 고유한 부분으로 DNS Zone을 유지 및 관리를 하는 개인, 조직, 회사에 위임된 도메인 네임 스페이스다.
-   통상 DNS 서버 하나가 책임이나 권한을 가지는 영역을 말한다
-   여러 레벨의 도메인 네임을 더 다루기 쉽게 해주는 것이 목적
-   zone 은 겹치지 않는다. 

  
![](https://i.ibb.co/7G2k4z0/8-D93-F3-FB-EF8-C-4988-A125-7-B398723-B0-E4.png)
-   3개의 zone 과 하나의 대표 zone 으로 분리하면, 하나의 zone과 600개의 A record를 쓰는 것보다는 낫다.
    -   largecompany.com
    -   la.largecompany.com
    -   pa.largecompany.com
    -   sh.largecompany.com

## Root name server (Root zone)
- 각각의 TLD 서버들은 특정 TLD의 zone들을 커버한다.
- Authoritative name server 들은 더 세분화된 zone들을 커버한다.

## Zone files
- 특정 zone에 대한 모든 resource record를 저장하고 있는 configuration file

## SOA record (Start of authority)
- zone과 해당 zone을 관리하는 name server의 이름이 저장되어 있는 record
- **Zone file** 이 가지고 있다.

## NS record
- 이 zone을 책임지는 또 다른 name server 들을 가리키는 레코드
- single point of failure 를 피하기위해 하나의 zone 을 여러 물리적 서버에서 관리할 수 있다.

## Reverse lookup zone files
- IP에 해당하는 FQDN(Full Qualified Domain Name)을 가지고 있는 파일

## Pointer resource record
- Resolves ip to a name.

# Reference
1. [DNS Zones | Coursera](https://www.coursera.org/learn/computer-networking/lecture/pX127/dns-zones)
