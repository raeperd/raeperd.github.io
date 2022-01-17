---
title: Name Resolution
tags: [ network ]
date: 2020-06-21
---

# Name Resolution
- [dns](dns.md)를 사용해 [domain-name](domain-name.md) 을 [ip-address](ip-address.md)로 변환하는 과정
- DNS 없이도 네트워크는 동작하지만, 사용하는 사람이 많이 불편할 것. 
- 원할하게 네트워크를 사용하기 위해허는 아래의 것들이 설정되어야 한다.
	- [ip-address](ip-address.md)
	- [Subnet mask](subnetting.md)
	- Gateway for a host ([router](router.md)) 
	- [dns](dns.md) server 

## DNS Server
### Caching name servers
![](https://i.imgur.com/vIJUsSz.png)
- 알려진 Domain name 을 특정 시간동안 저장한다. 
- 같은 서버를 사용하는 컴퓨터들은 캐싱된 결과를 공유할 수 있다. 

### Recursive name servers
- Domain Name Resolution 에 필요한 요청을 수행한다.
- 보통 하나의 서버가 Caching name servers 의 역할과 Recursive name server 의 역할을 동시에 한다. 

#### TTL
- 초 단위로 Domain name을 얼마나 오래 저장할지를 나타낸다. Domain name 의 소유자가 이를 설정할 수 있다.  
- 인터넷이 더 빨라지면서 몇분이나 몇시간 정도의 수준으로 설정하는게 보통이다. 

#### Anycast 
-   위치나 네트워크 상태등을 바탕으로 트래픽을 다른 목적지로 라우팅하는 기술이다.
-   이를 이용해 하나의 IP로 전달하는 패킷이 실제로는 다른 도착지로 전달될 수 있다.

### Root name servers
### TLD name servers
### Authoritative name servers

## Name Resolution Process  
![](https://i.imgur.com/hsaZRyD.png)
1.  Root Server 로부터 TLD name server 의 주소를 전달 받는다.
2.  TLD Name Server 로부터 authoritative name server의 주소를 전달 받는다.
3.  Query
-   Root Server와 TLD Name Server를 운영하는 곳은 적지만 Anycast와 같은 기술을 통해 물리적으로는 다른 주소로 트래픽이 redirect 된다.
-   이렇게 도메인 네임을 여러 단계로 얻어와야만 악의적인 공격자로 부터 안전하게 DNS 를 사용할 수 있다.

# Reference
1. [The Many Steps of Name Resolution | Coursera](https://www.coursera.org/learn/computer-networking/lecture/D6Kti/the-many-steps-of-name-resolution)
