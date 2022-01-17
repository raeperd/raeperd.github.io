---
title: Hub And Switch
tags: [network]
date: 2020-04-29
---

# Hub And Switch
## Hub
-   여러 컴퓨터를 동시에 연결하게 해주는 Physical layer 의 기기
-   각각의 컴퓨터로 같은 데이터가 전송되는데, 전송된 데이터를 사용하느냐 마느냐는 각각의 컴퓨터가 결정해야할 사항이다.
-   필요없는 통신을 해야하기 때문에 오버헤드는 물론 문제가 생기기도 한다. 대표적인 것이 [collision-domain](collision-domain.md)
    
## Switch
-   Hub 와 달리 Data Link Layer 의 기기이다.
-   Ethernet 과 같은 프로토콜을 이해할 수 있고, 연결된 여러 기기 중 정확히 어떤 기기에 데이터를 전송해야하는지 알고 있다.
-   네트워크의 [collision-domain](collision-domain.md) 과 같은 문제를 거의 해결한다. (완전히 해결하지는 못하는 모양?)
-   성능적으로 Hub 보다 더 좋다.

# Reference
1. [Hubs and Switches | Coursera](https://www.coursera.org/learn/computer-networking/lecture/8rMWU/hubs-and-switches)
