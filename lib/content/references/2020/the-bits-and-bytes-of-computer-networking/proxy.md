---
title: Proxy
tags: [ network ]
date: 2020-06-21
---

# Proxy 
- 다른 서버에 접근하기 위해 클라이언트를 대신하여 작동하는 서비스
- Proxy는 보통 아래의 이유들로 사용된다.
	- Anonymity
	- Security
	- Content filtering
	- Performance

- Proxy는 그자체로 추상화된 개념으로, 구체적인 구현을 의미하는 것이 아니다.
- Proxy는 거의 모든 Network layer에서 존재하며 수많은 예제가 존재한다.

## Web Proxy
- 웹 서비스를 위한 프록시로, 다양한 역할을 수행할 수 있다.

![](https://i.ibb.co/6rPspjL/FF727-DE8-C46-F-4163-A5-FB-BBF9-CAE31-D93.png)
- 이전에는 Web Proxy가 클라이언트와 서버 사이에서 데이터를 전달하면서 캐싱등의 역할을 하기도 했다.
- 요즘에는 네트워크도 빨라졌고, 페이지나 파일에 대한 캐싱이 큰 의미가 없어져서 큰 이득은 없다.

![](https://i.ibb.co/Cw4kGnJ/DC7-C0621-E8-A4-420-C-849-E-6-A6-D282-B6-DC1.png)
- 클라이언트와 서버 사이에 Proxy가 웹 클라이언트가 특정 사이트, 주소로의 접근을 막는 등의 용도로 사용될 수도 있다.

## Reverse proxy
- 하나의 서버를 가지는 것처럼 보이지만 여러 서버를 뒤에 두고 있는 서비스

![](https://i.ibb.co/7WHmqjN/CEF30082-A5-CC-4-BC1-82-B8-72-EE1664-E26-B.png)
- twitter 같이 트래픽이 많은 서비스는 하나의 웹서버로는 그런 트래픽을 감당할 수 없을 것이다. 
- 클라이언트의 입장에서는 모두 같은 서버에 접근하는 것으로 보이지만 Proxy 서버가 앞에서 많은 트래픽을 분산 시킴으로써 서버의 부하를 나눌 수 있다. 
- DNS Round Robin과 같이 load balancing 의 일부이다.

![](https://i.ibb.co/mJJFJJd/D9-DDFE7-D-8-E67-45-A6-A127-F8-ED4-BC14991.png)
- 요즘 전달되는 웹 트래픽 대부분은 암호화가 되어있다. 이런 암호화를 해제하는 것 또한 많은 컴퓨팅 파워를 먹게 되는데, 이런일을 하도록 Proxy를 두고 Application Server 들은 실제 컨텐츠를 처리하는 것에만 집중하도록 서버를 구조화 할 수도 있다.
- Proxy의 핵심 개념은 하나. 클라이언트와 다른 서버 사이의 중개자 역할을 하는 모든 서버는 Proxy라고 생각하면 된다.

# Reference
1. [Proxy Services | Coursera](https://www.coursera.org/learn/computer-networking/lecture/e5sGp/proxy-services)
