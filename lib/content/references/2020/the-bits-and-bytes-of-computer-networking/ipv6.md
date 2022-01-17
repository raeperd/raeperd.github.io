---
title: IPv6
tags: [ network ]
date: 2020-06-21
---

# IPv6 
-   IPv4는 32bit 주소 공간을 사용했지만, IPv6는 128bit 다.
-   16bit를 8그룹으로 나눠 표기한다.
    
## IPv6 notation
1.  Can remove any leading zero
2.  Any number of consecutive groups composed of just zeros can be replaced with two colons
    -   이 규칙은 한번만 사용할 수 있다.
-   2001:0db8:
    -   documentation, education 용으로 사용
-   ::1
    -   loopback address
-   FF00::
    -   multicast
-   FE80::
    -   link-local unicast address
    -   Allow for local network segment communications and are configured based upon a host’s MAC address
-   첫 64bit는 네트워크 ID이고, 다음 64bit는 호스트 ID로 사용한다.
-   subnet은 IPv4와 같은 CIDAR notation을 사용한다.
    
## IPv6 Headers
![](https://i.ibb.co/KVJmWPy/FF9-BB3-AF-B066-4701-9695-0554-C1-EACC29.png)
-   IPv4와 달리 주소가 길어서 header를 간소화 하려는 노력이 들어갔다.
-   Next Header를 사용해 optional한 field는 필요하다면 따로 전달하도록 구현되어 있다.
    
## IPv6 and IPv4 Harmony
- 모든 인터넷이 IPv4에서 IPv6로 한번에 이동하는 것은 불가능 할 것 이다. IPv6와 IPv4가 공존할 방법이 필요하다.

## IPv4 Mapped Address space
-   0:0:0:0:0:ffff:
    -   남아있는 32bit가 IPv4 주소와 같은 역할을 하게된다.
    -   IPv4 패킷이 IPv6 network을 돌아다닐 수 있다.

## IPv6 tennels
-   IPv6 패킷이 IPv4 네트워크를 돌아다니게 할 수 있는 기술
-   Servers take incoming IPv6 traffic and encapsulate it within traditional IPv4 datagram
-   보내는 쪽과 받는쪽에서 encapsulation 과정을 거친다.
    
## IPv6 tunnel broker
These are companies that provide IPv6 tunneling endpoints for you, so you don’t have to introduce additional equipment to your network.

# Reference
1. [IPv6 Addressing and Subnetting | Coursera](https://www.coursera.org/learn/computer-networking/lecture/MOcQY/ipv6-addressing-and-subnetting)
