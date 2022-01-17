---
title: NAT
tags: [ network ]
date: 2020-06-21
---

# NAT (Network Address Translation)
## Baiscs of NAT
- 게이트웨이(일반적으로 라우터 또는 방화벽)가 발신 IP 데이터 그램의 소스 IP를 다시 쓰면서 원래 IP를 유지하면서 응답에 다시 쓰도록하는 기술이다.

![](https://i.ibb.co/1s4F7s8/E9508974-9485-4-B7-B-9-C87-0-A144-A80-F846.png)
- 이런 상황에서 Router가 모든 발신 패킷에 대해 NAT를 수행하도록 설정되어있다고 가정해보자. 보통의 라우터는
- IP Datagram 의 TTL을 하나 줄이고, checksum을 다시 계산하고, 원본 데이터를 수정하지 않은체로 패킷을 전달한다.

![](https://i.ibb.co/vqRxRJx/0-BFEDD9-B-EEAC-4-DE0-B773-6-F2-EFFE84-A32.png)
- NAT가 설정된 경우, 라우터는 소스 IP를 자신의 주소로 변경하고 패킷을 전달한다. 패킷을 받은 Computer2 는 Computer 1이 아닌 라우터가 해당 패킷을 보낸 것으로 확인하며, 응답을 Router의 IP 주소로 전달하게 될 것이다.
- 라우터가 전달받은 응답이 실질적으로 Computer 1을 항햔다는 것을 안다면, 다시 Destination IP를 Computer 1의 주소로 변경하고 전달함으로써 통신이 정상적으로 동작하게 끔 할 수 있다. (다음 섹션인 NAT and the Transport Layer에서 확인)
- 이런 과정을 통해 Computer 1의 IP 주소를 Computer 2에게 숨길 수가 있는데, 이 것을 **IP masquerading** 이라고 한다. 이를 통해 네트워크의 IP 주소를 외부로부터 숨길 수 있다. 이게 굉장히 중요한 보안 기법인데, 외부에서 클라이언트의 IP 주소를 모른다면 통신을 시도조차 할 수 없기 때문이다. 이런 네트워크를 **one-to-many NAT** 이라 한다.

## NAT and the Transport Layer
- NAT이 Network Layer에서 동작하면 그 과정은 쉽게 진행될 수 있다. Transport Layer에서 동작하게 된다면 NAT가 온전하게 동작하기 위한 추가적인 과정이 필요하게 된다.
- 앞서 살핀것 처럼 단순히 외부로 나가는 OUTBOUND 패킷의 주소를 변경하는 일은 어렵지 않다. 외부로 부터 들어오는 INBOUND 패킷의 경우 모두 같은 주소 (라우터의 주소)를 통해 들어오게 되는데 이 패킷이 정확히 어떤 기기에 전달되어야 하는지 알아내야 한다.

## Port Preservation
- 클라이언트가 선택한 소스 포트가 라우터에서 사용하는 것과 동일한 포트인 기술

![](https://i.ibb.co/18Syc4c/C76218-F8-9-DF3-4777-AA6-C-B1921-BD24-BDA.png)
- (그림의 Destination IP는 Source IP로 변경되어야함. 오타)
- 네트워크 외부와의 connection은 ephemeral port의 가능한 값 중에서 랜덤하게 선택되었었다. 클라이언트가 선택한 값을 라우터가 동일하게 사용한다. 라우터는 IP 주소만을 변경한다.

![](https://i.ibb.co/m5psZnz/EF9-D68-D6-1-B23-450-C-8663-FE20-D2-EB7-B66.png)
- 전달받은 응답의 port를 통해 특정 컴퓨터에게 패킷을 전달 할 수 있다. 어떤 포트가 어떤 IP에 의해 사용되었는지는 라우터가 내부적으로 table을 통해 저장해야 할 것이다.
- ephemeral port의 가능한 값은 충분히 다양하지만, 다른 컴퓨터에서 같은 포토를, 비슷한 시간대에 사용할 수도 있다. 이런 경우 라우터는 사용되지 않고 있는 랜덤한 포트를 대신 설정하고 사용한다.

## Port forwarding
- 특정 destination port가 항상 특정 node에게 전달될 수 있도록 하는 기술
- 기술의 핵심은, public ip 주소와 포트를 private ip와 포트로 전달할 수 있다는 점이다.
-   **공유기에서** 설정을 해줘야 한다.    

![](https://i.ibb.co/nCPYhpT/BC11-F99-E-C128-4-E45-BDDC-A04-CAD01-BCFE.png)
- port forwarding 은 IP masqurading 뿐만 아니라 더 유용하게 사용될 수 있다. 웹서버와 메일서버 각각이 다른 물리적 서버에서 동작할때, port forwarding을 통해 외부에서 서비스에 접속할때 같은 IP 주소로 port만 다르게 전달 함으로써 다른 서비스를 이용할 수 있다.
- 대표적으로 같은 도메인 주소(같은 IP 주소)로 여러 서버, 여러 서비스를 운영하는 것이 가능하다. 외부에서 접근할때는 public ip (라우터 주소) 와 서비스의 포트만으로 서비스에 접근이 가능하다. (웹은 80포트, 이메일은 25포트와 같은식으로)
- OUTBOUND Packet의 경우 Port Preservation, INBOUND Packet의 경우 Port Forwarding를 이용함으로써 NAT를 통해 네트워크 통신이 가능하게 된다.

## NAT, Non routable address space and the limits of IPv4
- IPv4 주소의 갯수는 한정되어 있고 점점 고갈되고 있다. IPv6가 현실적인 대안이지만 IPv6가 널리 쓰이기전까지, IPv4를 사용하면서도, 더 많은 기기들을 네트워크에 연결 가능하게 하려면 어떻게 해야할까?
- 바로 앞에서 그것이 가능한 기술을 알아보았다. NAT 를 통해서는 하나의 public IP 주소를 통해 많은 기기들을 연결 할 수 있고, 네트워크 통신이 가능하게 한다. 네트워크 내부적으로는 Non routable address space를 사용하면서 외부에 공개된 라우터 만이 routable 한 address를 사용함으로써 이것이 가능하다.


# Reference
1. [IPv4 address exhaustion](https://en.wikipedia.org/wiki/IPv4_address_exhaustion)
2. [Basics of NAT | Coursera](https://www.coursera.org/learn/computer-networking/lecture/UnKO5/basics-of-nat)