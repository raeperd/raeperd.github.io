---
title: Resource Record Type
tags: [ network ]
date: 2020-06-21
---

# Resource Record Type 
- [dns](dns.md)가 정보를 기록하는 방식 

## A record
도메인 네임은 특정한 IPv4 주소를 가리키는데 사용된다.
-   보통은 하나의 도메인 네임은 하나의 A record를 가진다.
-   하나의 도메인 네임이 여러개의 A record를 가질 수 있는데, 이를 통해 DNS Round robin이 가능하다.

## DNS Round Robin
-   여러 IP를 반복하면서 DNS Name Resolution의 트래픽을 관리하는 방법.
-   하나의 DNS, microsoft.com에 IP 주소 4개의 A record를 가지게 했다고 가정해보자. 각각의 주소는 10.0.0.1 ~ 10.0.0.4이다. Name Resolution 요청에 DNS Resolver는 모든 IP 주소를 반환한다.
-   응답을 받은 컴퓨터는 자신이 전달받은 IP 주소 중 첫번째 주소(10.0.0.1)를 이용해야 한다는 것을 알고 있다. 그러나 첫번째 주소가 응답하지 않는 경우에 대비해서 주소 4개를 모두 가지고 있는다.
-   두번째로 microsoft.com 주소를 요청하는 컴퓨터 또한 마찬가지로 4가지 주소를 모두 전달받지만, 이번에 전달받은 주소의 첫번째 값은 10.0.0.1이 아닌 10.0.0.2 이다. 이 컴퓨터는 첫 연걸을 10.0.0.2 에 시도하게 되며, 이런 방식은 모든 DNS resolution 시도에서 동작하며, 트래픽을 분산시킨다.

## Quad A record
도메인 네임을 특정한 IPv6 주소를 가리키는데 사용한다.

## CNAME record (Canonical name record)
-   하나의 도메인에 다른 이름을 부여하는 방식
-   하나의 도메인을 다른 도메인으로 redirect 하는데 사용된다.
-   하나의 IP 주소가 여러 도메인을 가지도록 설정됬다고 해보자. 만약 IP 주소가 변경된다면 각각의 도메인의 A record를 변경하는 작업을 해야한다.
-   CNAME record를 이용해 대표 도메인을 설정하고, 다른 도메인들은 CNAME record를 통해 대표 도메인을 가리키도록 설정한다면 추후에 IP 주소가 변경되더라도 하나의 A record만 변경하는 것으로 수정을 최소화 할 수 있다.
    
## MX record (Mail exchange)
-   e-mail을 올바른 서버로 전달하기 위해 사용되는 레코드
-   많은 회사들이 웹과 메일 서버를 다른 기기, 다른 IP 주소에서 서비스하게 된다. MX record 는 웹 트래픽은 웹서버, 메일 트래픽은 메일 서버에게 전달될 수 있도록 한다.

## SRV record (Service record)
-   MX record와 유사하게 여러가지 서비스들의 위치들을 알아내는데 사용된다.
-   MX record와 동일하게 동작하는 대신, SRV record는 mail 서비스이외의 다른 종류의 서비스들에게 트래픽을 전달한다.
    
## TXT record (Text record)
-   도메인 네임에 대해 사람이 읽을 수 있는 노트를 위한 record.
-   현대의 네트워크에서는 다른 컴퓨터가 처리할 수 있는 추가적인 정보를 많이 포함하기도 한다. 형식의 제한이 없는 record라 이를 이용해서 DNS가 원래 의도하지 않았던 추가적인 정보까지 전달하는 것이 가능하다.
-   신뢰된 다른 네트워크 서비스와 관련된 설정들을 공유하는데 사용되기도 한다. 예를 들면 이메일 서비스와 관련된 설정들을 공유하기도 한다고 하는데 눈으로 보고 코딩을 해보기전까지는 어떤 역할을 하는지 정확하게 감을 잡기는 힘들 것 같다.

# Reference
1. [Resource Record Types | Coursera](https://www.coursera.org/learn/computer-networking/lecture/a6Fwe/resource-record-types) 
