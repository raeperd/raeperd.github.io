---
title: MAC Address
tags: [ network  ]
date: 2020-05-29
---

# MAC Address
-   A globally unique identifier attached to an individual network interface
    
![](https://i.ibb.co/vVBrrNP/mac-address.jpg)
-   네트워크 기기에 부여되는 고유한 48bit의 주소(globally)

## OUI(Organizationally Unique Identifier)
-   MAC Address의 첫 3바이트는 로 IEEE 에서 제조사별로 부여한다.
	-   그렇게 함으로써 MAC Address가 globally unique 함을 보장한다. 

-   다음 3바이트는 제조사가 직접 정의한다.. Ethernet 은 MAC Address 를 사용한다. 보낸 기기와 받는 기기를 이때 명시함으로써 collision domain 과 같은 네트워크에서도 각각의 노드들은 어떤 트래픽이 자신의 트래픽인지 알 수 있게 된다.

# Reference
1. [Ethernet and MAC Addresses | Coursera](https://www.coursera.org/learn/computer-networking/lecture/z8FEX/ethernet-and-mac-addresses)