---
title: DispatcherServlet
tags: [spring]
date: 2022-01-17
---

- `DispatcherServlet` implements [Servlet](/references/2022/servlet.md)
- `DispatcherServlet` delegates to **special beans** to process requests and render the appropriate responses. 
- **org.springframework.web.servlet** package

# Processing
1. `WebApplicationContext` is searched
2. (Optional) Resolves locale by locale resolver
3. (Optional) Resolves theme by theme resolver
4. (Optional )Resolves multipart request 
5. Handler is searched by `getHandler()` method
6. `handler.applyPreHandle()`
7. `handlerAdapter.handle()` 
8. `handler.applyPostHadnle()`
9. `this.processDispatchResult()`
	- Render view if view is returned by 7 (`handlerAdapter.handle()`)
10. Resolves exception by `HandlerExceptionResolver`

## [Interception](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-handlermapping-interceptor)
- All `HandlerMapping` implementations support handler interceptors

## Exceptions
- If an exception occurs during request mapping or is thrown from a request handler (such as a `@Controller`), the `DispatcherServlet` delegates to a chain of `HandlerExceptionResolver` beans to resolve the exception and provide alternative handling, which is typically an error response.

# Implementation details
## Inheritance Structure (Bottom Up)
- `DispatcherServlet` extends `FrameworkServlet`
	- Implements `doService` method that actually performs request handling
	- Actual dispatching is delegated to `doDispatch` function
- `FrameworkServlet` extends `HttpServletBean`
	- Manages `WebApplicationContext`
	- Publish events on request processing, whether or not a request is successfully handled
	- Implements `doGet`, `doPost` ... by delegates its handling to [`proessRequest` function](https://github.com/spring-projects/spring-framework/blob/84b4cebb3913ddd4a803939fdc8dde1b0401ff35/spring-webmvc/src/main/java/org/springframework/web/servlet/FrameworkServlet.java#L988)
	- Actual event handling is performed by the abstract `doService` template method.
- `HttpServletBean` extends `HttpServlet`
	- Init() servlet using configuration parameters in type-safe manner
	- Leaves request handling to sub-classes

## [`doDispatch()`](https://github.com/spring-projects/spring-framework/blob/84b4cebb3913ddd4a803939fdc8dde1b0401ff35/spring-webmvc/src/main/java/org/springframework/web/servlet/DispatcherServlet.java#L1027)
1. Add framework objects into request instance so that it can be used
2. [`getHander()`](https://github.com/spring-projects/spring-framework/blob/84b4cebb3913ddd4a803939fdc8dde1b0401ff35/spring-webmvc/src/main/java/org/springframework/web/servlet/DispatcherServlet.java#L1258) returns `HandlerExecutionChain` from [`this.handlerMappings`](https://github.com/spring-projects/spring-framework/blob/84b4cebb3913ddd4a803939fdc8dde1b0401ff35/spring-webmvc/src/main/java/org/springframework/web/servlet/DispatcherServlet.java#L320)
3. [`getHandlerAdapter()`](https://github.com/spring-projects/spring-framework/blob/84b4cebb3913ddd4a803939fdc8dde1b0401ff35/spring-webmvc/src/main/java/org/springframework/web/servlet/DispatcherServlet.java#L1294) returns `HandlerAdapter` from `HandlerExecutionChain`
4. Actually handle request by [`hadnlerAdapter.handle()`](https://github.com/spring-projects/spring-framework/blob/84b4cebb3913ddd4a803939fdc8dde1b0401ff35/spring-webmvc/src/main/java/org/springframework/web/servlet/DispatcherServlet.java#L1067)
	1. mappedHandler.applyPreHandle()
	2. hadnlerAdapter.handle()
	3. mappedHandler.applyPostHandle()
5. `processDispatchResult()` with possible exceptions

## Special Bean Types
- `HandlerMapping`
	- Maps request to handler along with interceptors
	- `RequestMappingHandlerMapping`,  `SimpleUrlHandlerMapping`
- `HandlerAdapter`
	- Invoke a handler mapped to a request
	- For example, resolve annotations for annotated controller

# Reference
1. [Spring Reference - Dispatcher Servlet](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-servlet)
2. [DispatcherServlet (Spring Framework 5.3.15 API)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/)
3. [spring-framework/DispatcherServlet.java at 84b4cebb3913ddd4a803939fdc8dde1b0401ff35 · spring-projects/spring-framework](https://github.com/spring-projects/spring-framework/blob/84b4cebb3913ddd4a803939fdc8dde1b0401ff35/spring-webmvc/src/main/java/org/springframework/web/servlet/DispatcherServlet.java#L1027)