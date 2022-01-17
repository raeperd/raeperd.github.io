---
title: CIDR
tags: [network]
date: 2020-05-21
---

# CIDR (Classless Inter-Domain Routing)

[ip-address-class](ip-address-class.md) 를 이용해 [ip-address](ip-address.md) 를 잘 나눌 수 있었다. [subnetting](subnetting.md)은 Address class로 나누어진 network 를 기존의 규칙을 유지하면서 네트워크를 더 작게 분할할 수 있게 해줬다. 그런데 인터넷이 더 커지면서 Subnetting 도 충분하지 않게 되었다.

![](https://i.imgur.com/WskKnPp.png)
254 개의 호스트를 사용할 수 있는 class C 네트워크는 너무 적고, 65534 개의 호스트를 사용할 수 있는 class B 네트워크는 너무 많다고 느껴지면 어떻게 할까? 
- class C 네트워크 여러 개를 사용하는 방법이 있다. 
- 다만 이런 현상이 반복되면, [router](router.md) Table의 Class C 여러 네트워크들은 다른 주소를 가지고 있지만, 실제로는 같은 장소로 라우팅되는 비효율적인 구조를 가지게 된다. CIDR 가 이를 해결해 줄 수있다.

CIDR 는 [subnetting](subnetting.md) 확장해 네트워크를 구분할 수 있게 했다. 

## Demarcation point
-   To describe where one network or system ends and another one begins
    
- CIDR 에서는 Network ID와 Subnet ID는 하나로 통합된다. CIDR는 기존의 [ip-address-class](ip-address-class.md) 의 규칙을 무시한 새로운 규칙이다. 
- 단순히 address class 를 무시했기 때문에, subnet mask로 사용되는 만큼 network ID를 부여할 수있고, 그만큼 호스트 아이디를 가질 수 있다.
-  규칙이 간단해서 이해하고 적용하기도 쉬운반면 기존의 address class 보다 효율적인 면도 있다. ￼ 

![](https://i.imgur.com/WKHZv1h.png)
-  Class C를 두개 쓰면 508개의 호스트를 가져야만 254개 이상의 IP Address를 할당받을 수 있지만  CIDR 를 이용한 /23 network 는 Class C보다 단지 하나의 비트를 호스트에 더 할당함으로써 510개의 호스트를 가질 수 있다.
-  -2 는 localhost 통신과 braodcast 통신을 위해 빼고 계산하는게 일반적이다. 

# Reference
1. [CIDR | Coursera](https://www.coursera.org/learn/computer-networking/lecture/4mPiD/cidr)
