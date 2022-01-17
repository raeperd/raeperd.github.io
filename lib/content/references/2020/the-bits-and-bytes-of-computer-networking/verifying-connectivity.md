---
tags: [ network ]
date: 2020-06-21
---

# Verifying Connectivity 

## Ping
- [icmp](icmp.md) 의 패킷을 보낼 수  있다. 

## Traceroute
- an awesome utility that lets you discover the paths between two nodes, and gives you information about each hop along the way.
-   ping 은 특정 주소가 접근 가능한지 확인이 가능하다.
-   연결 까지의 많은 라우터들 중 어떤 라우터가 문제의 원인인지 알기 위해서는 Traceroute를 사용할 수 있다.
-   TTL field가 0이 되면 ICMP Time Exceeded message가 원래 주소로 전달된다.
-   Traceroute는 첫 패킷은 TTL을 1로, 두번째는 TTL을 2로 하는 방법을 사용해, 어떤 라우터가 문제를 일으키는지 확인할 수 있다.
-   `traceroute` on linux and Mac, `tracert` on Windows
-   시간에 걸친 결과 변화를 확인하기 위해서는 `mtr` (linux, mac) 나 `pathping` (windows)를 사용할 수 있다.

## Testing Port Connectivity
- transport layer에서 오류가 발생한다면 ?

### netcat
`$ nc google.com 80$ nc -z -v google.com 80`

### Test-NetConnection
`$ Test-NetConnection google.com # ICMP Ping` `$ Test-NetConnection -port 80 google.com`

## Digging into DNS

### Name Resolution Tools
#### nslookup
`$ nslookup twitter.com`
-   nslookup 만 사용하면 interactive mode
-   도메인 내임을 입력하면 ip 주소를 얻을 수 있다.
-   server 명령으로 ip 주소를 지정할 수 있다.
-   set type=MX 와 같은 명령으로 레코드 타입을 지정할 수도 있다.
-   set debug 모든 패킷을 확인 할 수 있다.
    
![](https://i.ibb.co/d4X5327/2-DE5-ED89-8-AEF-4801-A3-BE-952-B2154-E482.png)

#### Public DNS Servers
Name servers specifically set up so that anyone can use them for free
-   public DNS 서버를 통해 네트워크 연결 여부를 판단하면 편하다.
-   ping 8.8.8.8을 이래서 해보는 거구나 !
-   대부분의 public DNS server 들은 anycast 를 이용해 어디서든 사용할 수있다.
-   DNS server를 조작해서 악의적인 행동을 하는 것이 대표적이다. DNS server 주소를 조심해야한다.

#### Level 3
One of ISP provide public dns severs like
- 4.2.2.1, 4.2.2.2, 4.2.2.3, 4.2.2.4, 4.2.2.5, 4.2.2.6
- 공식적으로 문서화 되지는 않았지만 운영되고 있다.
    
#### 8.8.8.8
- Google이 운영하는 public DNS server
- 공식적으로 문서화 되어있다.
- 8.8.4.4 를 사용해도 된다.
    

### DNS Registration and Expiration

Domain Name은 전세계적으로 고유해야하는데, 각자가 원하는 이름을 할당할 수 있으면 난리가 날 것이다.

#### Registar
- An organization responsible for assigning individual domain names to other organizations or individuals.
-   원래는 몇 Registar 가 없었다.
-   Registar에 가입하고, 원하는 기간동안 비용을 지불하면 된다.
-   Registar의 name serve가 authoritative name server의 역할을 하게 하거나, 직접 개발할 수 있다.
-   한번 등록된 Domain name은 다른 Registar 에도 알려야한다.
-   Registar에서 발급받은 특수한 string과 domain 설정을 TXT record에 기록하곤 한다.
    
#### Hosts Files
- A host file is a flat file that contains on each line a network address followed by the host name it can be referred to as

#### Loopback address
-   A loopback address always points to itself
-   Almost every hosts file in existence will in the very least contain a line that reads “127.0.0.1 localhost,” most likely followed by “::1 localhost, " where “::1” is the loopback address for IPV6
-   Host file을 통한 redirection을 통해 악성행위를 할 수도 있다.

# Reference
1. [Traceroute | Coursera](https://www.coursera.org/learn/computer-networking/lecture/jlDtC/traceroute)
2. [Testing Port Connectivity | Coursera](https://www.coursera.org/learn/computer-networking/lecture/i6q7W/testing-port-connectivity)
3. [Supplemental Reading for Testing Port Connectivity | Coursera](https://www.coursera.org/learn/computer-networking/supplement/Sv5vu/supplemental-reading-for-testing-port-connectivity)
4. [Name Resolution Tools | Coursera](https://www.coursera.org/learn/computer-networking/lecture/FaM1l/name-resolution-tools)
5. [Public DNS Servers | Coursera](https://www.coursera.org/learn/computer-networking/lecture/lDV9b/public-dns-servers)
6. [DNS Registration and Expiration | Coursera](https://www.coursera.org/learn/computer-networking/lecture/HKxzz/dns-registration-and-expiration)
7. [Hosts Files | Coursera](https://www.coursera.org/learn/computer-networking/lecture/5m0GY/hosts-files)
