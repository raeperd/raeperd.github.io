---
title: All the Layers Working in Unison
tags: [ network ]
date: 2020-09-29
---

# Intro
Communication between users seems so natural, but inside, quite a few network theories and promises are thoroughly followed. If we summarize the process of packet delivery from one computer to another, we can see the approximate network flow. [The Bits and Bytes of Computer Networking | Coursera](https://www.coursera.org/learn/computer-networking) was referenced.

## Computer 1 to Router A

![](https://i.imgur.com/963QPcs.png)
1. The user enters [IP address](/references/2020/the-bits-and-bytes-of-computer-networking/ip-address.md) into the browser.
2. The web browser requests the [tcp](/references/2020/the-bits-and-bytes-of-computer-networking/tcp.md) connection between the forwarded IP address and port 80 to the OS.
3. OS confirms that Network A does not have the corresponding address, and gateway [router](/references/2020/the-bits-and-bytes-of-computer-networking/router.md) which is the address of A Request a connection to the IP address of 10.1.1.1.
4. Computer 1 is [Address Resolution Protocol](/references/2020/the-bits-and-bytes-of-computer-networking/address-resolution-protocol.md) and is a Router with an IP address of 10.1.1.1 Find A's [Mac Address](/references/2020/the-bits-and-bytes-of-computer-networking/mac-address.md).

![](https://i.imgur.com/kivVlVP.png)

5. Computer 1 creates an Outbound TCP connection packet through the found MAC Address. At this time, the [Ephemeral port](https://en.wikipedia.org/wiki/Ephemeral_port) that the OS can use is allocated and used.
6. Computer 1 creates a TCP IP packet for [Three Way Handshake](/references/2020/the-bits-and-bytes-of-computer-networking/three-way-handshake.md).
7. Computer 1 uses the MAC Address of Router A to create a packet including [ethernet](/references/2020/the-bits-and-bytes-of-computer-networking/ethernet.md) frame.

![](https://i.imgur.com/bkwvIy1.png)

8. Computer 1 delivers the completed packet to [hub-and-switch](/references/2020/the-bits-and-bytes-of-computer-networking/hub-and-switch.md).
9. Switch uses the received MAC Address and forwards it to Router A.


![](https://i.imgur.com/4X9d4qU.png)

10. Router A knows that the packet has been delivered to itself through the Ethernet Destination MAC Address of the received packet.
11. Router A calculates the checksum of the packet and verifies that the packet is intact.

## Router A to Router B

![](https://i.imgur.com/etugMJS.png)

12. Router A cuts the Ethernet frame of the packet and calculates the checksum of the IP datagram.
13. Router A checks the destination IP address of IP Datagram, and sends data to Router B through [routing](/references/2020/the-bits-and-bytes-of-computer-networking/routing.md) Confirm that you need to send

![](https://i.imgur.com/Bt5kC3t.png)

14. Router A decrements the TTL field by one and computes a new checksum.
15. Router A checks the MAC Address of Router B through [ARP Table](/references/2020/the-bits-and-bytes-of-computer-networking/address-resolution-protocol.md), This creates a new Ethernet frame with the destination MAC address.

![](https://i.imgur.com/IMzzkhc.png)

17. Router B repeats step 12 again.
18. Router B confirms that the destination IP address of IP datagram exists in Network C.
19. Router B repeats step 14 again.

## Router B to Computer 2

![](https://i.imgur.com/7Da0K5k.png)

20. Network C forwards the received packet to Computer 2.
21. Computer 2 confirms that this packet should be delivered to itself through MAC Address in the Ethernet Frame of the received packet.
22. Computer 2 checks the CRC of the IP Datagram and confirms that the data has been successfully transmitted.
23. Computer 2 confirms that it has been delivered to itself through the Destination IP Address.
24. Computer 2 checks the checksum of TCP Datagram.
25. Computer 2 checks the destination port (80) and opens [TCP socket](/references/2020/the-bits-and-bytes-of-computer-networking/tcp-socket.md) on this port Check if this exists. The current state of this port is LISTEN.
26. Computer 2 checks the TCP SYN flag and the action required for [Three Way Handshake](/references/2020/the-bits-and-bytes-of-computer-networking/three-way-handshake.md) do

# Reference
1. [All the Layers Working in Unison | Coursera](https://www.coursera.org/learn/computer-networking/lecture/BqSRb/all-the-layers-working-in-unison)