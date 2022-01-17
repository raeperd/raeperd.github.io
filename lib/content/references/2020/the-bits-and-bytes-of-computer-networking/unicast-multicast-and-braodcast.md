---
title: Unicast Multicast and Braodcast
tags: [ network ]
date: 2020-06-29
---

# Unicast Multicast and Braodcast
## Unicast

![](https://i.ibb.co/j664gNH/unicast.jpg)

-   하나의 노드에게만 보내는 통신
    
-   At the [ethernet](ethernet.md)  level, this is done by looking at a special bit in the destination [mac-address](mac-address.md) **If the least significant bit in the first octet of a destination address is set to zero, it means that Ethernet frame is intended for only the destination address**
    
-   하나의 수신자만을 의도한 통신이지만 실제 패킷은 다른 네트워크 기기도 전달 받는다.
    
-   -  [ethernet](ethernet.md)  destination address의 첫 바이트의 첫 비트(LSB)가 0이다.
        

## Multicast

![](https://i.ibb.co/sFkfyfj/multicast.jpg)

-   If the least significant bit in the first octet of a destination address is set to one, it means you’re dealing with a multicast frame
-   네트워크의 모든 노드에게 보내는 통신
-   해당 통신이 수락될지 거절될지는 해당 통신을 받은 노드에서 결정한다.
-   ethernet destination address의 첫 바이트의 첫 비트(LSB)가 1이다.
    

## Broadcast

![](https://i.ibb.co/5xrZLSz/broadcast.jpg)

-   네트워크의 모든 노드에게 보내는 통신
-   이를 통해 네트워크 내부의 노드들이 서로에 대해서 알게 된다.
-   ethernet destination address의 주소가 FF:FF:FF:FF 의 형태다.

# Reference
1. [Unicast, Multicast, and Broadcast | Coursera](https://www.coursera.org/learn/computer-networking/lecture/OpIS6/unicast-multicast-and-broadcast)
