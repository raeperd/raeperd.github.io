---
title: TCP
tags: [network]
date: 2020-06-29
---

# TCP
- TCP 는 Transport Layer 에서 동작하는 프로토콜이다.
- [tco-ip-5-layer-network-model](/references/2020/the-bits-and-bytes-of-computer-networking/tco-ip-5-layer-network-model.md) 의 Physical, Data Link, Network Layer 의 프로토콜로 하나의 노드에서 다른 노드로의 통신이 가능하다. 
- 그러나 실제로 전달되는 정보를 사용하는 것은 네트워크 기기 안에서 동작하는 프로그램들이며, 특정 프로그램이 요청한 정보는 해당 프로그램에 전달되도록 보장되어야 한다. 크롬 브라우저가 보낸 요청을 워드 프로세스가 받으면 곤란할 것
- 이렇게 Process 간의 통신은 어떻게 이루어지는지 확인하지 못했는데, 이제부터 다뤄볼 Transport Layer와 Application Layer에서 이를 확인 할 수 있다. 어떻게 보면 이것이 컴퓨터 네트워크의 최종적인 목적이라 할 수 있다. 

## The Transport Layer
- 앞서 언급한 기능을 위해서 Transport Layer는 multiplex 와 demultiplex 를 할 수 있어야 한다.
- TCP 가 이런 역할을 해준다. 

![](https://i.ibb.co/pbryNw0/multiplexer-and-demultiplexer.png)

### Multiplex
- 여러 프로세스가 하나의 ip 주소를 이용해 패킷을 외부로 보낼 수 있게 하는 기능

### Demultiplex
- demultiplex 는 반대로, 하나의 입력을 여러 프로세스에 적절하게 분류해서 전달하는 기능이다. 이런 기능을 Port 를 통해 구현할 수 있다.

## TCP Segment
- TCP header + TCP datagram

### Encapsulation
![](https://i.imgur.com/k5t6UcW.png)
- [ethernet](/references/2020/the-bits-and-bytes-of-computer-networking/ethernet.md) payload 에 IP Datagram 이 포함되는 것처럼, [IP](/references/2020/the-bits-and-bytes-of-computer-networking/ip-address.md) Datagram 의 payload 에 TCP Segment 가 포함된다. 이도 마찬가지로 header와 payload 를 가진다.

### Destination Port / Source Port
![](https://i.imgur.com/AO4n9EQ.png)
- 이름 그대로의 의미를 가진다.

![](https://i.imgur.com/mhqpfbo.png)
-  Source Port를 알아야 응답을 하는 쪽에서 어떤 어플리케이션에 응답을 전송해야하는지 알 수 있을 것이다.

### Sequence number
![](https://i.imgur.com/gYyMYWj.png)
- TCP Segment가 어떤 순서로 전송되었는지를 나타내는 필드

### Acknowledgment number
![](https://i.imgur.com/aruszEm.png)
- 다음에 올 Sequence를 나타내는 필드
- TCP 통신에서 사용되는 패킷은 보통 여러 패킷에 걸쳐 전달되는데, 이때 수신하는 쪽에서 메세지를 재조합하기 위해서 이 필드를 사용한다. 

### Header Length
![](https://i.imgur.com/VNHR3Kd.png)
- payload가 어디있는지를 가리키는 오프셋 필드

### Control flags
- The way TCP establishes a connection, is through the use of different TCP control flags, used in a very specific order.
- [three-way-handshake](/references/2020/the-bits-and-bytes-of-computer-networking/three-way-handshake.md) 에 사용되는 주요한 필드

### TCP Windows
- Acknowledgement 필드의 값을 읽기 전에 필요한 sequence number의 범위

### Checksum
- IP datagram 의 checksum과 같은 역할

### Urgent pointer field
- TCP Control flag 와 함께 특정 segment가 다른것 보다 중요하다는 것을 알리는 필드. 최근에는 잘 사용되지는 않는 field 다.

### Options
- 복잡한 흐름의 프로토콜에서 사용되는 필드. 최근의 네트워크에서는 잘 사용하지 않는다.

### Pading
- Data payload 가 의도한 offset에서 시작하도록 조절하는 0의 나열.

# Reference
1. [Dissection of a TCP Segment | Coursera](https://www.coursera.org/learn/computer-networking/lecture/EYfgW/dissection-of-a-tcp-segment) 
