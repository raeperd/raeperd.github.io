---
title: TCP Socket
tags: [ network ]
date: 2020-06-01
---

# TCP Socket
## Socket
-  [tcp](/references/2020/the-bits-and-bytes-of-computer-networking/tcp.md) Connection의 end-point
-   실제로 Socket을 초기화(혹은 인스턴스화?) 하는 프로그램이 필요하다.
-   어떤 포트로든 TCP packet을 전달할 수 있지만, 받는쪽의 해당 port 에서 socket을 열어두었어야만 응답을 받을 수 있을 것이다.

## TCK Socket States
### LISTEN
-   A TCP socket is ready and listening for incoming connections
-   Server-side only
    
### SYN_SENT
-   A synchronization request has been sent
-   But the connection has not been established yet
-   Client-side only
    
### SYN_RECEIVED
-   A socket previously in a listener state, has received a synchronization request and sent a **SYN_ACK** back
-   But has not received SYN_ACK back.
-   Server-side only
    
### ESTABLISHED
-   This means that the TCP connection is in working order, and both sides are free to send each other data.
-   Both side

### FIN_WAIT
-   This means that a FIN has been sent, but the corresponding ACK from the other end has not been received yet.
-   Both side
    
### CLOSE_WAIT
-   This means that the connection has been closed at the TCP layer, but that the application that opened the socket has not released its hold on the socket yet.
-   Both side
    
### CLOSED
-   This means that the connection has been fully terminated, and that no further communication is possible.
-   Both side TCP를 통해 통신을 하기위해서는 양쪽다 규칙을 지켜야하지만 소켓이 정확하게 어떤 상태에 있는가는 TCP의 스펙에서 벗어난 내용이다. 곧 운영체제 마다 정의가 미묘하게 다를 수 있다. 프로그래머가 구현해서 사용할 법한 상태는 크게 `OPEN` `LISTEN` `CONNECT` `CLOSE` 정도 였던 것으로 기억한다.

# Reference
1. [TCP Socket States | Coursera](https://www.coursera.org/learn/computer-networking/lecture/1ELOr/tcp-socket-states)
