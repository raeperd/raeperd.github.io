---
title: Error Handling in Servlet Filters
tags: [ spring, servlet, kotlin ]
date: 2022-05-28
---

- Servlet Filters are executed before [DispatcherServlet](/references/2022/DispatcherServlet.md) 
	- So that error handling mechanisms like `@RestControllerAdvice` or `@ExceptionHandler` is not working 
	- Instead, We need to build response in the filter itself and build the WebServletResponse 
- Check out [JWTAuthenticationFilter on gist](https://gist.github.com/raeperd/c9d54828c60dc345cd8eae4d73921926) 


# Reference
1. [Error Handling in (Spring) Servlet Filters · Jamie Tanna | Software Engineer](https://www.jvt.me/posts/2022/01/17/spring-servlet-filter-error-handling/)
2. [Implements deserialization logic for jwt · Issue #13 · raeperd/realworld-springboot-kotlin](https://github.com/raeperd/realworld-springboot-kotlin/issues/13)
3. [#13 Refactor JWTAuthenticationFilter · raeperd/realworld-springboot-kotlin@7de1aef](https://github.com/raeperd/realworld-springboot-kotlin/commit/7de1aefb6828f6db2e5410c437c82b4ae6f4fef1)