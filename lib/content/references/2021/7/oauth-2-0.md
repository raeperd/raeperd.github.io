---
title: Oauth 2.0
tags: [network]
date: 2021-07-23
---

# Oauth 2.0

## Definitions
-   User is `Resource Owner`
-   My Service is `Client`
-   `Resource Server`
    -   Google, Facebook, Twitter
-   `Authorization Server`
    

## Create App

![oauth-create-app](https://i.ibb.co/M6gmb98/oauth-create-app.png)

## [Resource Ownwer 의 승인](https://www.youtube.com/watch?v=UH5XnjkBqKE&list=PLuHgQVnccGMA4guyznDlykFJh28_R08Q-&index=4)

![resource-owner](https://i.ibb.co/YZLfQ8h/resource-owner.png)
-   Resource Owner 가 URL 로 접근하면, Resource Server가 이 요청의 유효성을 검사한다.
-   특정 권한을 허용할 것인지에 대해 Resource Owner 가 승인한다.
    

## [Authorized by Resource Server](https://www.youtube.com/watch?v=O0Rx9SRPzs4&list=PLuHgQVnccGMA4guyznDlykFJh28_R08Q-&index=5)

![resource-server](https://i.ibb.co/D1Yk06f/resource-server.png)

-   Resource Server 는 응답에 authorization code 를 포함시켜 사용자를 redirection 시킨다.
    
-   이제 Client 은 authorization code 를 알게 된다.
    

![client-to-resource-server-with-secret](https://i.ibb.co/hX3L0f6/client-to-resource-server-with-secret.png)

-   Client는 Client Secret 과 Authorization code 를 포함한 값을 Resource Server에 전달한다.
    

## Issue Access Token

![access-token](https://i.ibb.co/9vqZWNJ/access-token.png)
-   Resource Server는 authorization code 를 삭제한다.
-   Resource Server는 Client 에게 Access Token 을 전달한다.    
-   Client 는 Access Token 을 통해 Resource Server 가 제공하는 API 를 사용할 수 있다.
    

## [Refresh token](https://www.youtube.com/watch?v=9eKIYjcPXp4&list=PLuHgQVnccGMA4guyznDlykFJh28_R08Q-&index=8)

-   Access token 은 정해진 수명이 있다. 재발급을 위해 사용자에게 다시 로그인하도록 요구하는 것은 불편할 것
    
-   federated identity


# Reference
1.[WEB2 - OAuth 2.0 : 1.수업소개 - YouTube](https://www.youtube.com/watch?v=hm2r6LtUbk8)
