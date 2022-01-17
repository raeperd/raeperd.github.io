---
title: An Introduction to ThreadLocal in Java
tags: [java]
date: 2022-01-12
---

# An Introduction to ThreadLocal in Java
- Global variable for specific thread
- ThreadLocal allows us to store data that will be accessible only by a specific thread
- We should be extra careful when we're using ThreadLocals and thread pools together. Remove ThreadLocal before returning thread to thread pool
- Used in spring-security, transaction manager

```java
ThreadLocal<Integer> threadLocalValue = new ThreadLocal<>();
threadLocalValue.set(1);
Integer result = threadLocalValue.get();
```

```java
ThreadLocal<Integer> threadLocal = ThreadLocal.withInitial(() -> 1);
```

```java
threadLocal.remove();
```

# Reference
1. [An Introduction to ThreadLocal in Java | Baeldung](https://www.baeldung.com/java-threadlocal)
