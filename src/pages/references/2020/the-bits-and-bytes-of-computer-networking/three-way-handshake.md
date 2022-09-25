---
title: Three-way Handshake
tags: [ network]
date: 2020-06-29
---

# Three-way Handshake

## Control flag
![](https://i.imgur.com/TWjp1jz.png)
- [tcp](/references/2020/the-bits-and-bytes-of-computer-networking/tcp.md) 헤더에 포함된 필드 중 하나
-   URG (Urgent)
    -   이 flag가 1이면 이 segment가 다른 것 보다 더 중요하다는 것을 의미
    -   자세한 내용은 이후의 Urgent pointer field 에서 확인할 수 있다
-   ACK (Acknowledged)
    -   Acknowledgment number field 가 검사되어야 함을 의미하는 flag
-   PSH (Push)
    -   Buffered data를 보내주기를 요청하는 flag
-   RST (Reset)
    -   데이터의 송신을 실패했음을 알리는 flag
    -   못알아듣겠으니까 다시한번만 전송해줘
-   SYN (Synchronize)
    -   처음 TCP 연결을 생성할때 사용되며 sequence number field 를 받는쪽에서 확인하도록 요청하는 flag
-   FIN (Finish)
    -   다 보냈으니 이제 통신을 끊자고 요청하는 flag

## 3-way-handshake
- 두 기기가 서로 같은 Protocol을 통해 통신하고 있고, 서로의 메시지를 이해함을 확인하는 과정.

![](https://i.ibb.co/SmGvK3T/3-way-hand-shake.png)
1. Computer A sends TCP segment to Computer B with `SYN` flag set 
2. Computer B responds with a TCP segment with a TCP segment with `SYN` and `ACK` flag set
3. Computer A response with TCP segment to Computer B with `ACK` flag set

![](https://i.imgur.com/IFgtKVk.png)


- 이 후 양쪽 모두 서로에게 메시지를 전달할 수 있으며 이에 대한 응답을 받을 수 있다.
-   보내는 쪽은 받는 쪽이 ACK 필드와 함께 응답을 보내기 때문에 어떤 메세지를 제대로 전송받았는가 역시 확인할 수 있다.

![](https://i.imgur.com/mIDcH7s.png)
-   통신을 끝내기 위해선 FIN flag를 전달하고, 이를 ACK flag로 다시 확인하면서 통신의 종료를 확인한다.
-   통신을 종료하는 과정은 **4-way-handshaking** 이라고도 한다.

# Reference

1. [TCP Control Flags and the Three-way Handshake | Coursera](https://www.coursera.org/learn/computer-networking/lecture/hGnHm/tcp-control-flags-and-the-three-way-handshake)
