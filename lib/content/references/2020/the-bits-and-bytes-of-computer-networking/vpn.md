---
tags: [ network ]
date: 2020-06-21
---

# VPN (Virtual Private Network)
- 외부 host가 같은 로컬 네트워크에서 동작할 수 있도록 로컬 네트워크를 확장하는 기술
- 네트워크 보안을 위해서는 Firewall, NAT 등의 기술등을 통해 내부 망에 연결되어 있는 기기들만이 자원에 접근이 가능하도록 구현을 하는 것이 좋다. 그럼에도 외부에서도 이런 자원을 접근할 필요가 있을 수 있는데, 그럴때 VPN을 사용한다.

![](https://i.ibb.co/dBrVfMh/651-F65-E9-12-B9-4-CAA-9-B86-8-EC2-BFA7805-C.png)
- 대부분의 VPN은 **Transport Layer payload** 내부에 제2의 패킷을 담는 것으로 구현된다.
- VPN은 two-factor authentication 이 가능하게 한 첫번쨰 기술이다.

## Two-factor authentication
- 인증을 위해 username 과 패스워드 이상이 필요한 기술
- 보통은 소프트웨어나 하드웨어의 특수한 부분을 활용해 짧은 단기간 사용할 수 있는 토큰을 만들고는 한다.
- VPN은 site와 site를 연결하는데에도 사용할 수 있다.
- NAT와 같이 VPN은 기술적인 컨셉일 뿐, 구체적인 사항이 모두 정의된 기술은 아니다.
- VPN의 가장 중요한 컨셉은 암호화된 커널을 이용해 실제로는 물리적으로 연결되어 있지 않은 네트워크 기기를 연결되어 있는 것처럼 사용하게 한다는 점이다.

# Reference
1. [Virtual Private Networks | Coursera](https://www.coursera.org/learn/computer-networking/lecture/c9tV0/virtual-private-networks)
