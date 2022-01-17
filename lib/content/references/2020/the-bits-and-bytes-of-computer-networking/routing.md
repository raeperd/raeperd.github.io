---
title: Routing
tags: [ network ]
date: 2020-07-29
---

# Routing
## Basic Routing concept
### [router](router.md)
- 네트워크 트래픽을 목적지로 전달시키는 네트워크 장비이다.
- Router는 최소한 두개의 네트워크 인터페이스와 연결되어 있어야 한다. 그래야 연결해 줄 수 있으니까. 

Router는 기본적으로 4 단계의 동작을 한다. ￼
![](https://i.imgur.com/h3KVe9K.png)
1.  연결된 네트워크 인터페이스들 중 하나로부터 패킷을 받는다.
2.  패킷의 도착 [ip-address](ip-address.md) 를 확인한다.
3.  라우팅 테이블에서 IP 주소를 확인한다.
4.  트래픽을 도착지로 전달한다.
    
### Example With 2 Router
![](https://i.imgur.com/n1Q0Jf5.png)
- [ip-address](ip-address.md) 는 네트워크에 속해있다. IP 주소 하나 하나가 하나의 네트워크를 의미하는 것이 아니다. 
1. 192.168.1.100 주소의 컴퓨터에서 10.0.0.10 의 주소로 패킷을 보낸다. 이때 컴퓨터 A는 자신이 속한 네트워크에 10.0.0.10 의 주소가 없다는 것을 알 수 있다
2. 이 패킷을 gateway router 에게 전달하는데 이 때의 전송은 gateway의 [mac-address](mac-address.md) 를 통해 한다.

![](https://i.imgur.com/tMaalK7.png)
![](https://i.imgur.com/T7hy6Lo.png)

3. 그렇게 Router는 Data link layer 의 패킷을 받게 되는데, 한번 받은 이후에는 Data-link layer의 정보를 잘라낸다. (Ethernet header와 Ethernet footer)
4.  IP datagram 에는 10.0.0.10의 주소가 기록되어있는데 Router는 routing table에서 Network B가 올바른 목적지라는 것을 알 수 있다. 실제로 Router는 Network B는 직접 연결되어 있기 때문에 router는 10.0.0.10의 MAC 주소까지 ARP 테이블에 가지고 있다.

![](https://i.imgur.com/qIjlRDK.png)
5.  이제 Router는 IP datagram의 모든 데이터를 복사하고, TTL 필드의 값을 하나 낮추며, 다시 체크섬을 계산한다.
6.  이를 새로운 Ethernet frame 으로 만드는데, 이번에 Ethernet frame의 Source MAC address 는 라우터 자신의 주소가 되고, destination MAC address는 도착지의 MAC 주소가 된다.

이정도가 기본적인 라우팅 과정인데, 좀 더 복잡한 경우가 생길 수도 있다.

### Example With 2 Router
![](https://i.imgur.com/w1CK6Un.png)

이번에는 192.168.1.100 에서 172.16.1.100 으로 패킷을 전달하려고 한다고 해보자. 앞의 과정과 같이 Network B 까지 같은 과정으로 패킷이 전달 됬을 것이다. 그러나 Router A는 이전과 달리 172.16.1.100 의 주소를 Network B에서 찾지 못한다. 위 과정에서 3번 과정을 다르게 진행해야한다. 
3. 다른 라우터를 통해야 한다는 것을 알게된 Router A는 Router B의 IP 주소로 같은 패킷을 전달한다. 마찬가지로 TTL을 감소시키고 다시 체크섬을 계산하는 과정을 거친다. 
4. Router B에 도착한 패킷은 앞에서와 같은 원리로 도착지에 전달될 수 있다.

실제로는 라우터에 더 많은 네트워크가 연결되어 있을 수 있고, 하나의 패킷이 전달되는 경로는 유일하지 않을 수 있다. 라우터가 어떻게 효율적으로 패킷의 경로를 알 수 있는지는 또 다른 복잡한 알고리즘들이 필요하겠지만 핵심은 같다.

## Routing tables

최신의 운영체제들은 대부분 라우팅 테이블을 가지고 있다. 그래서 컴퓨터와 수동으로 업데이트 되는 라우팅 테이블만 있다면 라우터를 만들어볼 수도 있다. 라우터를 어떻게 만드느냐에 따라 종류는 많지만 몇가지 공통되는 특징을 가지고 있다. 보통의 라우팅 테이블은 4개의 컬럼을 가진다.

![](https://i.imgur.com/UAvYjCW.png)
1.  Destination network
    -   여러 컬럼에 나눠 저장될수도 있고, 하나의 컬럼에 저장될 수도 있으나 본질은 같음
    -   catchall entry라는 것을 가지고 있는데 ARP 테이블에 없는 destination address의 패킷을 전달하는 곳
        
2.  Next hop
    -   도착지를 묻는데 사용될 수 있는 다음 라우터
    -   목적지까지 가기위한 바로 다음의 라우터 또는 경로
        
3.  Total hops
    -   출발지와 도착지 사이의 네트워크 장치의 수
        
4.  Interface
    -   라우터가 대상 네트워크와 트래픽을 일치시키기 위해 어떤 인터페이스를 사용해야하는지 알아야 한다.
    - Router는 최적의 경로로 데이터를 전달하고자 하겠지만, 사실 이게 쉬운일은 아니다. 최적의 경로를 찾는다 한들 이는 변할 수 있다. 새로운 라우터가 추가되거나, 없어질 수도 있으니까. 트래픽이 몰려서 정체현상 같은게 일어날수도 있고. Router는 위의 정보들과 이웃 라우터들로 부터 새로운 정보를 전달받으면서 더 나은 경로를 찾으려고 한다.
        

## Routing Protocol

간단한 라우팅 원리를 알아봤는데 라우팅의 진짜 마법은 라우터가 어떻게 도착지 경로를 알고, 다음 경로를 계산하는지이다. 라우터들은 이를 위해, 서로의 정보를 공유하는데 이때 사용되는 프로토콜이 Routing Protocol 이다.

### Interior gateway protocol

-   하나의 Autonomous system 내부에서 사용되는 프로토콜
-   Autonomous system 은 하나의 network operator에 의해 제어되는 네트워크들의 모임
    -   Internet service provider나 큰 규모의 회사들 ￼
        
-   Distance-vector protocol
    
    -   total hops 와 함께 자신의 이웃 라우터들에게 라우팅 테이블을 공유
        
    -   내가 아는 total hops 보다 니가 아는거 + 1 이 더 적구나?
        
    -   그럼 너한테 보내면 되겠네?
        
    -   많은 정보를 알고 있는건 아니라 네트워크의 변화에 적응하는데 시간이 걸릴것
        
    -   [RIP (Routing Internet Protocol)](https://en.wikipedia.org/wiki/Routing_Information_Protocol) 같은 것이 대표적 ￼
        
-   Link state routing protocol
    
    -   라우터의 상태를 모두 서로 공유하고 있는상태
        
    -   Distance vector protocol 보다 더 많은 정보를 가지고 있고 네트워크의 변화에 유연하다.
        
    -   더 많은 메모리와 컴퓨팅 파워가 필요하지만 최근의 기술로 이게 더 많이 쓰이게 됬다.
        
    -   [OSPF(Open Shortest Path First)](https://en.wikipedia.org/wiki/Open_Shortest_Path_First) 같은 것이 대표적
        

### Exterior gateway protocol

-   Exterior gateway protocols are used to communicate data between routers representing the edges of an autonomous system.
    
-   이게 중요한 역할을 한다.
    
-   하나의 프로토콜 만이 존재하는데, 이런 종류의 데이터 통신에는 어느정도의 합의가 필요했던 것 같다. [BGP (Broader Gateway Protocol)](https://en.wikipedia.org/wiki/Border_Gateway_Protocol) 라고 한다.
    

### IANA (Internet Assigned Numbers Authority)

-   IP 할당과 같은 것을 관리하는 것을 도와주는 비영리 단체
    
-   이런 단체가 없으면 본인들 마음대로 IP를 쓰게될텐데 길찾기가 영 쉽지 않을 것이다.
    
-   IP 할당뿐만 아니라 ASN(Autonomous System Number)의 할당도 관리한다.
    
    -   IP 주소처럼 32bit로, 하나의 Autunomous System에 할당되는 고유한 숫자다.
    -   IP 처럼 나뉜 숫자가 아니라 한번에 쓰이는데 IP 처럼 보통 사람의 눈에 많이 띌 숫자가 아니기 때문 Exterior gateway protocol을 이해해야만 해결할 수 있는 이슈는 많지 않을 것이다. Internet service provider 같은 곳에서 일하게된다면 많이 쓰이겠지만 일반적인 개발자는 그냥 그런게 있지~ 하고 받아들이고 사용하면 될 것 같다.
        

### Non-Routable Address Space

과거에서부터 인터넷이 더 발전하면 32 bit IP 주소는 부족할 것으로 예상됐다. 1996년에 RFC 1918이 설립되었고 이곳에서 세상의 인터넷이 잘 동작하도록 여러가지 규칙들을 만드는 기능을 한다. Non-Routable Address Space는 말그대로 라우팅이 불가능한 주소이다. 모든 네트워크 장비가 세상의 모든 네트워크 장비와 송수신이 가능할 필요는 없기 때문에 이런 주소가 필요하게 됬다. NAT라는 기술을 통해 외부와 통신할 수 있지만 나중에 배워보도록 하자. 일단 이 주소들은 통신이 불가능하다고 생각하자. 어차피 외부와 소통할 수 없는 주소이기 때문에 어떤 사람이든지 사용할 수 있는 주소다. 크게 3가지 주소가 있다.

-   10.0.0.0/8
    
-   172.16.0.0/12
    
-   192.168.0.0/16 누구나 개인 혹은 내부망으로 이런 주소들을 사용할 수 있다. 내부 게이트웨이 프로토콜은 이러한 주소 공간을 라우팅 할 수 있지만 exterior gateway protocol 들은 라우팅 할 수없다. ￼


# Reference
* [Basic Routing Concepts | Coursera](https://www.coursera.org/learn/computer-networking/lecture/eCwJA/basic-routing-concepts)
* [Routing Tables | Coursera](https://www.coursera.org/learn/computer-networking/lecture/BVuUA/routing-tables)
* [Interior Gateway Protocols | Coursera](https://www.coursera.org/learn/computer-networking/lecture/QvF9H/interior-gateway-protocols)
* [Exterior Gateway Protocols | Coursera](https://www.coursera.org/learn/computer-networking/lecture/6zn7s/exterior-gateway-protocols)
* [Supplemental Reading for Routing Protocol Examples | Coursera](https://www.coursera.org/learn/computer-networking/supplement/dyCqm/supplemental-reading-for-routing-protocol-examples)
* [Non-Routable Address Space | Coursera](https://www.coursera.org/learn/computer-networking/lecture/5S8Qc/non-routable-address-space)
* [Supplemental Reading for RFCs and Standards | Coursera](https://www.coursera.org/learn/computer-networking/supplement/HRf38/supplemental-reading-for-rfcs-and-standards)