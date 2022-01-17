---
title: All the Layers Working in Unison
tags: [ network ]
cover:
  image: https://i.imgur.com/FQKDDBP.png 
date: 2020-09-29
---

![](https://i.imgur.com/963QPcs.png)
1. 사용자가 브라우저에 [ip-address](ip-address.md) 를 입력한다. 
2. Web browser 는 전달된 IP Address와 80 포트와의 [tcp](tcp.md) 연결을 OS 에 요청한다.
3. OS 는 Network A 에는 해당 주소가 없음을 확인하고, Gateway [router](router.md) A의 주소인 10.1.1.1 의 IP 주소로 연결을 요청한다. 
4. Computer 1 은 [address-resolution-protocol](address-resolution-protocol.md) 로 10.1.1.1 의 IP 주소를 가진 Router A의 [mac-address](mac-address.md) 를 찾는다.

![](https://i.imgur.com/kivVlVP.png)  

5. Computer 1 은 발견된 MAC Address 를 통해 Outbound TCP connection 패킷을 만든다. 이때 OS 가 사용가능한 [Ephemeral port](https://en.wikipedia.org/wiki/Ephemeral_port) 를 할당해서 사용한다.  
6. Computer 1 은 [three-way-handshake](three-way-handshake.md) 를 위한 TCP IP 패킷을 만든다.   
7. Computer 1 은 Router A 의 MAC Address 를 이용해 [ethernet](ethernet.md) frame 을 포함한 패킷을 만든다.  

![](https://i.imgur.com/bkwvIy1.png)  

8. Computer 1은 완성된 패킷을 [hub-and-switch](hub-and-switch.md) 에 전달한다.  
9. Switch 는 전달받은 MAC Address 를 이용해 이를 Router A 에게 전달한다. 


![](https://i.imgur.com/4X9d4qU.png)  

10. Router A는 전달받은 패킷의 Ethernet Destination MAC Address 를 통해 해당 패킷이 본인에게 전달된 것임을 알게 된다.  
11. Router A는 패킷의 checksum 을 계산하고 이 패킷이 온전함을 확인한다.   

![](https://i.imgur.com/etugMJS.png)  

12. Router A는 패킷의 Ethernet frame 을 잘라내고 IP datagram 의 checksum 을 계산한다.  
13. Router A는 IP Datagram 의 Destincation IP address 를 확인하고, [routing](routing.md)  을 통해 Router B 로 데이터를 전송해야 함을 확인한다.   

![](https://i.imgur.com/Bt5kC3t.png)  

14. Router A는 TTL 필드를 하나 감소시키고, 새로운 checksum 을 계산한다.  
15. Router A는 [ARP Table](address-resolution-protocol.md) 을 통해 Router B의 MAC Address 를 확인하고, 이를 Destination MAC Address로 Ethernet frame 을 새로 만든다.   

![](https://i.imgur.com/IMzzkhc.png)  

17. Router B는 12 의 과정을 다시 반복한다.   
18. Router B는 IP Datagram의 Destination IP 주소가 Network C 에 존재함을 확인한다.   
19. Router B는 14의 과정을 다시 반복한다.  

![](https://i.imgur.com/7Da0K5k.png)

20. Network C는 전달받은 패킷을 Computer 2에 전달한다.  
21. Computer 2는 전달받은 패킷의 Ethernet Frame에 MAC Address를 통해 이 패킷이 자신에게 전달 되어야 했음을 확인한다.   
22. Computer 2는 IP Datagram의 CRC 를 확인하고 데이터가 잘 전달되었음을 확인한다.
23. Computer 2는 Destination IP Address를 통해 이것이 자신에게 전달 되었음을 확인한다.  
24. Computer 2는 TCP Datagram 의 checksum 을 확인한다.  
25. Computer 2는 destination port (80) 를 확인하고 이 포트에 열려있는 [tcp-socket](tcp-socket.md) 이 존재하는지 확인한다. 이 포트의 현재 상태는 LISTEN 이다.  
26. Computer 2는 TCP SYN flag 를 확인하고 [three-way-handshake](three-way-handshake.md) 를 위해 필요한 작업을 한다.   

# Reference
1. [All the Layers Working in Unison | Coursera](https://www.coursera.org/learn/computer-networking/lecture/BqSRb/all-the-layers-working-in-unison)
