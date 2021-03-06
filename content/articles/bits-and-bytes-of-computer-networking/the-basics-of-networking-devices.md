---
title: The Basics of Networking Devices
date: 2020-05-13
tags: ["network"]
---

프로그래밍을 하다가 네트워크 관련 문제가 발생했을 때 꼭 원인이 프로그램에 있다고 단정 지을 수는 없다. 여러가지 요인이 있을 수 있겠지만 당연하게도 하드웨어가 문제가 있을 수도 있다. 전문가 만큼은 아니더라도 간단하게 나마 어떤 하드웨어가 어떤 역할을 하는지 정도는 정리해둬서 나쁠게 없다.

## Cables
### Copper cable
* 전압의 변화로 0, 1을 구분할 수 있다.
* 케이블이 보통 한쌍이 엮여있는 형태인데 가장 보편적인 형태가 Cat5, Cat5e, Cat6 이다.
* 내부의 케이블이 어떻게 구성되어있냐에 따라 데이터의 전송 속도나 안정성에 영향을 미친다.
* 최신의 기술일수록 crosstalk 을 막기 위해 개선되어왔다.

### Fiber cable
* 사람 머리 정도 굵기의 유리로 된 케이블
* 빛의 펄스로 0, 1을 구분한다.
* 주변에 자기적으로 영향을 받는 경우 copper 보다 나은 선택이 될 것이다.
* copper 보다 빠르지만 비싸고 물리적으로 손상받기 쉽다.
* 데이터 손실 없이 copper 보다 더 멀리 데이터를 전송할 수 있다.
* CrossTalk
	* 한 선에서의 전기적 신호가 다른 선에서 감지 될 때
	* 이로인해 에러가 발생하기 마련

## Hub and Switch
Cable 은 point-to-point 통신만 가능하게 한다.

### Hub
* 여러 컴퓨터를 동시에 연결하게 해주는 Physical layer 의 기기
* 각각의 컴퓨터로 같은 데이터가 전송되는데, 전송된 데이터를 사용하느냐 마느냐는 각각의 컴퓨터가 결정해야할 사항이다.
* 필요없는 통신을 해야하기 때문에 오버헤드는 물론 문제가 생기기도 한다. 대표적인 것이 **Collision domain**

### Switch
* Hub 와 달리 Data Link Layer 의 기기이다.
* Ethernet 과 같은 프로토콜을 이해할 수 있고, 연결된 여러 기기 중 정확히 어떤 기기에 데이터를 전송해야하는지 알고 있다.
* 네트워크의 Collision domain과 같은 문제를 거의 해결한다. (완전히 해결하지는 못하는 모양?)
* 성능적으로 Hub 보다 더 좋다.

### Collision domain
* 한 순간에 하나의 기기만 통신할 수 있는 네트워크 부분
* 여러 시스템이 동시에 데이터를 전송하려고 하면 전기적인 신호가 서로 간섭될 수 있다.

### LAN : Local Area Network
* Hub와 Switch는 하나의 네트워크 안에서 기기들을 연결할때 사용된다.
* 이 때 이 하나의 네트워크를 보통 LAN 이라고 한다.
	* 스타에서의 LAN 이 이런 LAN 이었구나.. 이래서 인터넷 연결 안되도 게임 할 수 있었던 거구나

## Router
* 독립적인 네트워크 사이에서 데이터를 어떻게 전송하는지 아는 기기
* Network Layer 에서 동작한다.
* 내부에 테이블을 IP 주소를 저장하곤 한다.
* core router 라고하는 특수한 장비는 보통의 router 보다 훨씬 많은 IP를 가지고있고 많은 일을 해준다.
* router 끼리는 **BGP**(Border Gateway Protocol) 이라는 프로토콜을 통해 데이터를 주고 받는다. 이를 통해 트래픽을 가장 효율적인 경로로 가져온다.
* 단순히 집에서 인터넷만 해도 데이터는 라우터 들을 통해 멀리 멀리 알아서 잘 왔다갔다 한다.

### Servers and Clients
### Server
* 데이터를 요청하는 무언가에게 데이터를 전송하는 노드

### Client
* 연결을 시도하고, 데이터를 요청하는 노드
