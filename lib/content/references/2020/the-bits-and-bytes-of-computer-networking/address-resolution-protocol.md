---
title: Address Resolution Protocol
tags: [network]
date: 2020-05-21 
---

# Address Resolution Protocol

이제까지 MAC이 어떻게 쓰이는지와 Data Link Layer가 어떻게 사용되는지를 각각 알아 보았는데, 이제 이 두 시스템이 서로 연결되는지 알아볼 차례다.

Address Resolution Protocol은  특정 [ip-address](ip-address.md)를 통해 하드웨어의 주소를 찾기 위해 사용되는 프로토콜이다.

[ip-address](ip-address.md)의 IP datagram 은 [ethernet](ethernet.md) frame 의 내부에 속하게 되므로, 패킷을 전송하는 쪽에서 패킷을 완성하려면 전송하는 쪽의 [mac-address](mac-address.md) 를 알고 있어야 한다. 거의 모든 네트워크 장비들은 [address-resolution-protocol](address-resolution-protocol.md) Table 을 가지고 있는데 이는 IP Address와 MAC Address를 연결한 테이블이다. ARP Table에 주소가 있다면 그렇게 보내면 된다. 없다면 어떻게 해야할까￼
1.  10.20.30.40 주소로 보내려는데 해당하는 MAC 주소를 알 수 없는 경우 Broadcast ARP Message를 보낸다.
2.  10.20.30.40 IP 주소를 가진 기기가 이를 받으면 ARP Response 를 보내게 되는데 이 응답을 바탕으로 해당하는 MAC 주소를 알 수 있게 된다.
3.  이제 이 정보를 ARP Table에 저장하면 다음번에 이 주소가 필요한 경우 같은 과정을 반복할 필요가 없어진다.
4.  ARP Table은 자주 파기 되기 때문에 한번 저장된 주소가 앞으로도 저장되어 있을것이라고 생각할 수 없다.

# Reference

1. [Address Resolution Protocol | Coursera](https://www.coursera.org/learn/computer-networking/lecture/1NBYG/address-resolution-protocol)
