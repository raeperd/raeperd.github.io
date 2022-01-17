---
title: Connection-oriented and Connectionless Protocols
tags: [network]
date: 2020-09-12
---

# Connection-oriented and Connectionless Protocols
## Connection-oriented Protocol
- Establishes a connection, and uses this to ensure that all data has been properly transmitted
-  [ethernet](ethernet.md) frame이나 [IP Datagram](ip-address.md) 의 경우 checksum을 통해 전달받은 데이터가 유효한지 확인은 하지만 만약 전달된 패킷의 checksum이 일치하지 않는 경우 단순히 패기를 할뿐 재전송을 요청하거나 하지는 않는다. 이런 역할을 Transport layer에서 [tcp](tcp.md)에서 해주게 된다.

![](https://i.imgur.com/9skHnZa.png)
- TCP의 프로토콜상 전달받은 Sequence 에 대해서는 ACK field를 통해 전달받았음을 송신자에게 전달함으로써 어떤 정보를 받았고 못받았는지를 알 수 있다. 
- 전달받지 못한 정보에 대해서는 재전송을 하며, 메시지의 순서가 도착된 시간상의 순서와 일치하지 않더라도 받는 쪽에서는 Sequence를 확인하고 올바른 순서로 메세지를 재조합 할 수 있다.

이런 추가적인 과정은 분명 많은 컴퓨팅 파워를 사용할 수 밖에 없으며 실제 전달하고자 하는 내용보다 더 많은 정도의 트래픽을 사용할 수 밖에 없다. 모든 패킷들이 반드시 전달되어야 하는 경우에는 이런 방식의 프로토콜이 최선일 테지만, 항상 그런 것은 아니다. 일부 패킷의 손실을 감수하고서라도 빠른 전송을 위해서는 UDP 프로토콜이 사용된다.

## Connectionless Protocol - UDP
* TCP 와 달리 connection에 의존하지 않고 acknowledgement 와 같은 개념을 지원하지 않는다.
* 일부 프래임이 유실되어도 큰 무리가 없는 영상 스트리밍의 경우 UDP가 더 효율적인 프로토콜이 된다.


### List of TCP and UDP port numbers
* Port는 16비트 숫자로 0-65535의 값을 가질 수 있는데 이를 분리해서 사용한다.
* 0은 네트워크 트래픽에서는 사용되지 않지만, IPC 에서는 사용될 수 있다.
* 1-1023은 **system port** 혹은 **well-known port** 로 주요하게 알려진 네트워크 서비스를 위한 포트들이다.
* 1024-49151은 registered port로 아주 보편적이지만은 않은 서비스들 위한 포트.
  * 예로 3306은 많은 데이터베이스 어플리케이션들이 사용하는 포트다.
* 49152-65535는 private port 혹은 ephemeral port라 한다. 외부 네트워크와의 연결을 위해  [IANA](https://www.iana.org/)  에서 사용하지 않는 것을 권고하지만 모든 운영체제가 이를 따르는 것은 아니다.
  *  [Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) 
  *  [List of TCP and UDP port numbers - Wikipedia](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) 

# Reference
1. [Connection-oriented and Connectionless Protocols | Coursera](https://www.coursera.org/learn/computer-networking/lecture/mlUNd/connection-oriented-and-connectionless-protocols)
2. [Supplemental Reading for System Ports versus Ephemeral Ports | Coursera](https://www.coursera.org/learn/computer-networking/supplement/GJHb4/supplemental-reading-for-system-ports-versus-ephemeral-ports)
