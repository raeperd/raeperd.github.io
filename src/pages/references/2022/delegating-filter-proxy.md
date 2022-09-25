---
title: DelegatingFilterProxy
tags: [spring]
date: 2022-01-04
---

# DelegatingFilterProxy
- Proxy for a standard Servlet Filter, delegating to a Spring-managed bean that implements the Filter interface.
- DelegatingFilterProxy's doFilter() method will delegate all calls to a Spring bean, enabling us to use all Spring features within our filter bean.
- DelegatingFilterProxy is a class in Spring's Web module. It provides features for making HTTP calls pass through filters before reaching the actual destination. With the help of DelegatingFilterProxy, a class implementing the javax.Servlet.Filter interface can be wired into the filter chain.

# Reference
1. [DelegatingFilterProxy (Spring Framework 5.3.14 API)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/filter/DelegatingFilterProxy.html)
2. [Overview and Need for DelegatingFilterProxy in Spring | Baeldung](https://www.baeldung.com/spring-delegating-filter-proxy#:~:text=The%20DelegatingFilterProxy%20is%20a%20servlet,relies%20on%20this%20technique%20heavily.)
3. [Architecture :: Spring Security](https://docs.spring.io/spring-security/reference/servlet/architecture.html)
