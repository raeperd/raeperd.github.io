---
title: Developing with Spring Boot
tags: [spring]
date: 2022-01-09
---

# Developing with Spring Boot
## 1. Build Systems
- Starters are a set of convenient dependency discriptors that developers can include in application

## 3. Configuration Classes
- Spring boot favors Java-based configuration

## 4. Auto-Configuration
- If you need to find out what auto-configuration is currently being applied, and why, start your application with `--debug` switch. 

## 5. Spring Beans and Dependency Injection 
- Recommend constructor injection to wire up dependency 
- If a bean has more than one constructor, you will need to mark the one you want Spring to use with `@Autowired`

## 8. Developer tools 
- The spring-boot-devtools module can be included in any project to provide additional development-time features.
- Disable caches 
- Automatic restarts when files on classpath changed

```groovy
dependencies {
    developmentOnly("org.springframework.boot:spring-boot-devtools")
}
```

# Reference
1. [Developing with Spring Boot](https://docs.spring.io/spring-boot/docs/2.6.2/reference/html/using.html#using)