---
title: DHCP
tags: [ network ]
date: 2020-06-21
---

# DHCP 
## Overview of DHCP
-   IP
-   Subnet mask
-   Gateway
-   Name server 
- 네트워크 설정을 할떄, 반드시 설정해야하는 것들은 위 4가지 인데 여러 기기에 모두 설정하려면 귀찮은 일이 될 것 이다. 마지막 3개는 같은 네트워크 안이라면 보통 같을 것이다. 
- 하지만 IP는 달라져야 한다.
- DHCP는 이런 귀찮은 일을 해주기 위해 필요하다.

### DHCP (Dynamic Host Configuration Protocol)
- 호스트에서 네트워크 설정들을 자동으로 하게 해주기 위한 application layer protocol
- 기기가 DHCP 서버에 네트웤 설정을 요청하면 네트웤 설정들을 한번에 받아올 수 있다.
- 관리자의 일을 줄여줄 뿐만 아니라 어떤 IP를 어떤 기기에 할당하는지 정하는 것도 설정할 수 있다.
- DHCP가 네트워크 관리자가 해야하는 설정들을 자동으로 해주는 것 뿐만 아니라 IP를 어떻게 할당하는가에 대한 문제도 해결해 준다.
    
**모든 기기의 모든 IP 들이 외부 네트워크로부터 공개될 필요는 없다. 서버 장비나 게이트웨이 라우터의 IP는 static 하고 public한 형태로 관리되어야 한다.**

예를 들면 같은 네트워크의 장비들은 게이트웨이의 주소를 항상 알고 있을 필요가 있다.

만약 로컬 DNS 서버가 동작하지 않는다고 해보자. 네트워크 관리자는 새로운 DNS 주소를 통해 문제를 해결 할 수 있을 것이다. DNS 서버를 static 하게 설정하지 않는다면, DNS 서버가 동작하지 않을때 문제점을 확인하는 것이 어려울 것이다.

그러나 다른 클라이언트 기기들은 올바른 네트워크 안에서 올바른 IP 주소를 가지고 있는가만 중요한 문제가 된다. 정확히 어떤 IP 주소를 가지느냐는 별로 중요하지 않다. DHCP를 사용하면 이러한 클라이언트 기기들을 위한 IP 주소들을 따로 할당해 둘 수 있다. 이런 방식으로 클라이언트 기기들은 필요할 때마다 IP 주소를 할당받을 수 있다. 그러면 모든 네트워크 장비들과 해당하는 IP 의 목록들을 관리할 필요가 없다.

### **DHCP dynamic allocation**
A range of IP addresses is set aside for client devices and one of these IPs is issued to these devices when they request one.

### **DHCP automatic allocation**
Automatic allocation is very similar to dynamic allocation, in that a range of IP addresses is set aside for assignment purposes. The main difference here is that the DHCP server is asked to keep track of which IPs it’s assigned to certain devices in the past. Using this information, the DHCP server will assign the same IP to the same machine each time, if possible.

(해석하는 것보다 원본이 더 의미를 잘 전달하는 것 같다)

### **DHCP fixed allocation**
- Fixed allocation requires a manually specified list of MAC address and the corresponding IPs.
- 보안상의 목적으로 이렇게 쓰일 수 있다.
- NTP 서버를 할당하는 등에도 사용할 수 있다.

## DHCP in Action
- DHCP는 application layer 프로토콜이지만 DHCP의 포인트는 이 자체로 네트워크 레이어의 특징들을 결정하는데 있다. 아래와 같은 과정으로 설정을 공유할 수 있다.

### DHCPDISCOVER
![](https://i.ibb.co/KNmvpw7/4-D4-D4921-4-BBF-49-CB-8-E7-A-45-DD6-A3-EAF72.png)
- 네트워크 설정을 얻기 위해 클라이언트의 시도
- 최초의 클라이언트는 항상 68포트로부터 67포트에게 브로드캐스트로 DHCPDISCOVER 메시지를 보낸다. 
- Transport layer의 프로토콜은 UDP를 사용한다. 이런 메시지는 네트웤의 모든 노드에 전달되며 만약 DHCP 서버가 있다면 서버는 DHCPOFFER 메세지를 보낸다.

### DHCPOFFER
![](https://i.ibb.co/0tZxKrP/6-E3798-BF-CCD6-4476-9215-5-C7760249-D38.png)
- 서버는 DHCPOFFER 메세지를 통해 클라이언트에게 IP 주소를 전달하는데 이 메세지의 패킷은 브로드캐스트로 전달된다. 
- 최초의 DHCPDISCOVER 를 전송한 클라이언트는 DHCPOFFER 메세지에 포함되어있는, 요청을 보낸 클라이언트의 MAC 주소로부터 해당 DHCPOFFER 메시지가 자신에게 보내진 것임을 알 수 있다.
- 이떄 서버가 할당하는 IP 주소는 앞에서 알아본 allocation 설정이 어떻게 되어있느냐에 따라 할당된다.
- 클라이언트는 이런 DHCPOFFER 를 거절할 수 있는데, 여러 DHCP 서버가 네트워크에 있는 환경에서 특정 IP 주소를 거절하는 식으로 구현되기도 한다. 그러나 드문 케이스다. 
- 클라이언트는 DHCPOFFER 메시지의 응답으로 DHCPREQUEST 메시지를 보낸다.

### DHCPREQUEST
![](https://i.ibb.co/kJ3wdg7/A6-DAB9-A7-2-D87-47-C9-80-CF-17373-D2-B2244.png)
- 이 메시지는 보통 앞선 DHCPOFFER를 통해 할당된 IP 주소를 사용하겠다는 동의 의사를 전달하는데, 아직 IP의 할당이 완전하게 이루어진 것은 아니기 때문에 0.0.0.0:68 의 주소로, 브로드캐스트로 전달한다. 
- 이후 서버는 DHCPACK 메시지로 응답한다.

### DHCPACK
![](https://i.ibb.co/6DSGcmq/D3-CD8-DF4-6-EB6-4-EB7-9055-A6-F5-C03-BC5-A0.png)
- DHCPOFFER와 마찬가지로 메시지에 포함되어 있는 MAC 주소를 통해 클라이언트는 본인에게 보내는 메시지임을 확인할 수 있다. 이제 클라이언트는 이제 DHCP Server를 통해 네트워크 설정을 할 수 있다.
- 이 단계에서 DHCP 클라이언트 역할을하는 컴퓨터에는 연결된 네트워크에서 본격적으로 작동하는 데 필요한 모든 정보가 있어야 한다. 이런 정보를 **DHCP lease** 라고 한다.
- DHCP lease 는 expire time 을 가지고 있는데, 클라이언트가 가지고있는 lease가 파기되면 DHCP Discovery 부터 시작해서 다시 DHCP의 모든 과정을 반복해야한다.
- 클라이언트 또한 DHCP Server에게 lease 를 생성할 수 있는데, 네트워크로부터 disconnect를 할때 사용한다. 이 정보를 통해 DHCP server는 할당되었던 IP를 다시 재할당 가능한 IP pool에 추가할 수 있다.

# Reference
1. [Overview of DHCP | Coursera](https://www.coursera.org/learn/computer-networking/lecture/FmEsd/overview-of-dhcp)
2. [DHCP in Action | Coursera](https://www.coursera.org/learn/computer-networking/lecture/NU8C2/dhcp-in-action)
