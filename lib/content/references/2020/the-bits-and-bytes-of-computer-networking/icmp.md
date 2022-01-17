---
title: ICMP
tags: [ network ]
date: 2020-07-21
---

# ICMP(Internet Control Message Protocol)
![](https://i.ibb.co/sVR0Gpr/4-E2858-A2-FB74-4-A00-B1-F1-DC29852-B3-CC5.png)
-   TCP/IP에서 IP 패킷을 처리할 때 발생되는 문제를 알리거나, 진단 등과 같이 IP 계층에서 필요한 기타 기능들을 수행하기위해 사용되는 프로토콜
-   IP와 하나의 쌍을 이루면서 동작한다.
-   Data section에는 IP header와 Data payload 의 첫 8바이트가 저장되어있다.

## Ping
- Ping lets you send a special type of ICMP message called an **Echo Request**
- 운영체제에서 대부분 지원한다.
- 특정 플래그를 주면 다르게 동작하게 할 수도 있다.
    
![](https://i.ibb.co/4gpJbjm/CFCB04-A1-FB44-40-D3-9-D25-0-E088-FA2-AF14.png)
![](https://i.ibb.co/KsXDxnx/B9-C29947-49-FC-4268-970-E-50-A849-DA453-D.png)


# Reference
1. [Ping: Internet Control Message Protocol | Coursera](https://www.coursera.org/learn/computer-networking/lecture/iHEWf/ping-internet-control-message-protocol)
