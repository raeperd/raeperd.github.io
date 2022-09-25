---
title: Ethernet
tags: [network]
date: 2020-05-29
---

# Ethernet
- 최근에 대부분의 네트워크 기기들이 무선 연결을 사용하지만 데이터 센터와 같은 곳에서는 여전이 유선 연결을 사용한다. 유선으로 연결한 대부분의 네트워크 장비들은 Ethernet 프로토콜을 따른다.
- Physical layer 를 추상화해 하드웨어와 관계 없는 일관된 네트워킹을 할 수 있도록 구현한다.

![](https://i.ibb.co/1bxH3c1/data-link-layer-in-layer-model.jpg) Data-Link-Layer의 가장 주된 목적은 Physical-Layer의 구체적인 구현에 대해 추상화를 하는 것이다.

## CSMA / CD (Carrier sense multiple access with collision detection)
-   통신 채널이 언제 사용가능한지 확인하고 가능할때만 데이터를 전송하게 한다.
-   채널에 데이터가 전송되고 있지 않으면 노드는 데이터를 보낸다.
-   어떤 컴퓨터가 데이터를 보내고 있다면 이를 확인하고 데이터를 보내지 않는다.
-   이런 충돌과 관련된 모든 기기들은 랜덤한 짧은 구간동안 대기한다. 이를 통해 다음에 충돌이 또 일어나지 않도록 한다.

## Ethernet Frame
-   Ethernet level 에서의 Data Packet    
-   데이터의 구체적인 순서와 크기가 정해져 있다.
    
![](https://i.ibb.co/dk1kDhk/ethernet-frame.jpg)
### Preamble
-   8 바이트이며 자체적으로 두 구간으로 나뉘어져 있다.
-   첫 7바이트는 0과 1이 번갈아가면서 등장하는데 네트워크 프래임간의 buffer 로 사용되기도 하고 network interface가 내부 시간을 동기화하는데 사용하기도한다.
-   마지막 1바이트는 **SFD** (Start Frame Delimiter) 라하고 받는 노드에게 Preamble이 끝났음을 알린다.
    
### Destination Address / Source Address
-   말 그대로 주소를 담고 있는 부분으로 MAC address 가 저장되어있다.
    
### Ether-type
-   2바이트로 어떤 프로토콜인지 나타내기 위해 사용된다.
-   이 위치에 VLAN header 가 올 수 있으며 그럴 경우 Ether-type은 VLAN header 뒤로 온다.
    
### VLAN
-   하나의 기기이서 여러 논리적인 LAN 주소를 가질 수 있게 한다.
-   VLAN은 보통 다른 종류의 트래픽을 분류하기 위해 사용된다.
    
### PayLoad
-   46-1500 바이트
-   Transport Layer, Application Layer 에서 실질적으로 운반되는 데이터
    
### FCS (Frame Check Sequence)
-   4바이트. 전체 Ethernet 프레임에 대한 checksum
-   **CRC**(cyclical redundancy check) 를 이용해 검증한다.
-   FCS의 체크섬은 패킷을 송신할때 송신자가 한번, 수신할때 수신자가 한번 계산하게 된다. 만약 수신자가 체크섬을 계산했을때 다른값을 얻은 경우, 데이터는 전송 과정중에 손상을 받은 것으로 간주하고, 전달받은 데이터를 버린다.
-   **Ethernet 프로토콜은 전송받은 데이터의 무결성을 검증하지만 데이터를 다시 요청하거나 재전송하는 로직은 포함되지 않는다.**
-   Ethernet 프로토콜은 단지 데이터에 손상이 있었음을 알리며, 이후의 동작은 Transport Layer 나 Application Layer와 같은 상위 Layer에서 지정한대로 동작하게 된다.

# Reference
1. [Ethernet and MAC Addresses | Coursera](https://www.coursera.org/learn/computer-networking/lecture/z8FEX/ethernet-and-mac-addresses)
