---
title: The Application Layer and OSI Model
tags: [ network  ]
date: 2020-04-29
---

# The Application Layer and OSI Model
- 이제까지 5 Layer Model 로 네트워크 구조에 대해 공부해 봤는데 일반적으로 많이 쓰이는 모델은 OSI 7 Layer Model 도 많이 사용된다.

## Session Layer
![](https://i.imgur.com/MN8fWmz.png)
-   Application Layer 와 Transport Layer 사이의 통신을 가능하게 한다.
-   TCP Segment로 부터 Application Layer의 데이터를 추출하고 이를 Presentation Layer에 전달한다.

## Presentation Layer
![](https://i.imgur.com/1hd5uuS.png)
-   Session Layer로 부터 전달받은 Application Layer의 데이터가 application이 이해할 수 있도록 하는 역할을 한다.

![](https://i.imgur.com/kSkcQez.png)
-   Session Layer와 Presentation Layer는 운영체제의 일부로 새로운 단계의 캡슐화가 이루어지는 것은 아니다. 그래서 두 Layer를 Application Layer와 같이 이해해도 큰 무리는 없다.
-   프로그래머가 직접 개입할 일은 잘 없을 Layer 이다. 

# Reference
1. [The Application Layer and the OSI Model | Coursera](https://www.coursera.org/learn/computer-networking/lecture/mNwFu/the-application-layer-and-the-osi-model)
