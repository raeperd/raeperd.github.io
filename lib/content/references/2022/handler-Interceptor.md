---
title: HandlerInterceptor
tags: [spring]
date: 2022-01-04
---

# HandlerInterceptor
- Workflow interface that allows for customized handler execution chains.
- Called before the HandlerAdapter triggers execution of the handler itself
- As a basic guideline, fine-grained handler-related preprocessing tasks are candidates for HandlerInterceptor implementations, especially factored-out common handler code and authorization checks. On the other hand, a Filter is well-suited for request content and view content handling, like multipart forms and GZIP compression. This typically shows when one needs to map the filter to certain content types (e.g. images), or to all requests.
- [handler-interceptors-vs-filters-in-spring-mvc](handler-interceptors-vs-filters-in-spring-mvc.md)

# Reference
1. [HandlerInterceptor (Spring Framework 5.3.14 API)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/servlet/HandlerInterceptor.html) 
