---
title: Servlet
tags: [java]
date: 2022-01-17
---

- A servlet is a small Java program that runs within a Web server. 
- Servlets receive and respond to requests from Web clients, usually across HTTP, the HyperText Transfer Protocol. (using [HttpServlet)](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServlet.html))
- Servlet Container uses Servlet
	- Servlets are under the control of another Java application called a Servlet Container. When an application running in a web server receives a request, the Server hands the request to the Servlet Container – which in turn passes it to the target Servlet.

# Life cycle 
- init()
- service()
- destroy()

# How Servlet process http request?
1. Web server receives http request 
2. Web server forwards the request to Servlet container 
3. Servlet container initialize Servlet if no Servlet in container
4. Servlet container invokes Servlet.service method. 
	1. Process request 
	2. Formulate response

# Examples 
- Tomcat is implementation of Servlet API
- [DispatcherServlet](/references/2022/DispatcherServlet.md) implements Servlet

# Reference
1. [Servlet (Java(TM) EE 7 Specification APIs)](https://docs.oracle.com/javaee/7/api/javax/servlet/Servlet.html)
2. [Introduction to Java Servlets | Baeldung](https://www.baeldung.com/intro-to-servlets)
3. [What is a Servlet Container? - DZone Cloud](https://dzone.com/articles/what-servlet-container)
