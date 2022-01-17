---
title: IP Address Class
tags: [network]
date: 2020-05-28
---

# IP Address Class
![](https://i.ibb.co/Wyh8FC7/ip-address-classes.jpg)
-   IP Address는 network id 와 host id 로 구분될 수 있다. ￼
    

## Address class system
-   A way of defining how the global IP address space is split up
-   IP Address가 어떻게 구분되는지를 정의한 시스템.
    
![](https://i.ibb.co/8NFcgTC/ip-address-class-system.jpg)
-   Class A
    -   First 1 bytes of network ID, 3 bytes of host ID
-   Class B
    -   First 2 bytes of network ID, 2 bytes of host ID
-  Class C
    -   First 3 bytes of network ID, 1 bytes of host ID
-   [ip-address](ip-address.md) 를 보는 것만으로 어떤 클래스 인지 확인할 수 있다.
-   D class 와 E class는 특수한 목적에 사용되는 클래스로 비교적 덜 중요하다.
    -   D는 멀티 캐스팅, E는 테스트를 하는 목적으로 사용된다.
    -   실제로 이런 클래스 시스템은 대부분 **CIDR (Classless inter-domain routing)** 이라는 방법으로 대체되었다.
    -   그럼에도 Address class system은 아직 많이 있고 네트워크 시스템 전반을 이해하는데 큰 도움이 되기 때문에 이해하고 있을 필요가 있다.

# Reference
1. [IP Address Classes | Coursera](https://www.coursera.org/learn/computer-networking/lecture/FdoW7/ip-address-classes)
