---
title: DNS and UDP
tags: [network]
date: 2020-06-21
---

# DNS and UDP 
- [dns](dns.md) 는 [tcp](tcp.md) 대신 UDP 를 많이 쓴다. [name-resolution](name-resolution.md) 에 드는 패킷의 차이가 많다.

![](https://i.ibb.co/N1rdnY7/34-D29208-AE1-B-435-A-92-F0-8-C563-E286-F77.png) 
- Name resolution의 한번의 요청과 응답의 경우, TCP connection 한번에 아래와 같은 송수신이 필요하다.
-  3 way handshake
-   요청
-   요청을 받았다는 ack
-   응답
-   응답을 받았다는 ack
-   4 way-hand shake => 3 + 2 + 2 + 4 = 11
    
![](https://i.ibb.co/3Rf0XLJ/F6560-DD6-9-ADB-4-B7-A-AD86-92-DA8-F0-E49-AC.png) 
- 반면 UDP 의 경우 주고 받는 패킷 하나씩 2번, 총 8개의 패킷 만으로 전체 Name resolution을 처리할 수 있다. 그래서 보통 DNS는 UDP를 많이 사용한다.

# Reference
1. [DNS and UDP | Coursera](https://www.coursera.org/learn/computer-networking/lecture/81nwU/dns-and-udp)
