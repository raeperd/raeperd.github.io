---
title: DNS
tags: [ network ]
date: 2020-06-21
---

# DNS (Domain Name System)
- 문자열을 [ip-address](ip-address.md)로 변환해주는 분산된 네트워크 시스템

## Why DNS?
- 우리가 접속해야하는 사이트마다 IP 주소를 기억해야 한다고 생각하면 참 귀찮을 것이다. 사람들은 숫자를 기억하는 것보다 단어를 더 잘 기억한다. 그래서 IP 주소에 단어로 된 이름을 부여하는 것이 좋을 것.
- 모든 접속을 Domain Name으로 하도록 한다면, IP 주소가 바뀌더라도 사용자는 같은 방법으로 접근할 수 있다. 관리자는 DNS 로 해당하는 IP 주소만을 변경해주면 된다.
- 물리적으로 가까운 곳이면 당연히 통신은 빠를 것이다. 글로벌한 서비스를 제공하려면 하나의 서버가 아니라 분산되게 서버를 운영하는 것이 좋을 것. DNS는 다른 지역에서 접근하는 서비스들을 해당 지역에 맞는, 효율적인 IP 주소로 변경해줄 수 있다.

# Reference
1. [Why do we need DNS? | Coursera](https://www.coursera.org/learn/computer-networking/lecture/aZPjv/why-do-we-need-dns)
