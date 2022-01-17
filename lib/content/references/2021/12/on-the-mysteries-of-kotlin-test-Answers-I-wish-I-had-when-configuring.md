---
title: On the mysteries of kotlin.test. Answers I wish I had when configuring
tags: [programming, kotlin]
date: 2021-12-07
---

# On the mysteries of kotlin.test. Answers I wish I had when configuring

## Test Framework vs Test runner
- Test Framework, assertion library provides API to write tests
- Test runner takes those tests, runs and collects the result, possibly with addtional reports
- junit4 includes all, junit5 is not 
	- [JUnit 5 vs JUnit 4 | HowToProgram](https://howtoprogram.xyz/2016/08/10/junit-5-vs-junit-4/)
	- [JUnit 5 Architecture or "What's Jupiter?" // nipafx](https://nipafx.dev/junit-5-architecture-jupiter/)

![junit architecture](https://i.imgur.com/uFYwAEM.png)

## kotlin.test vs KotlinTest (Kotest)
- kotlin.test is part of language
- The main purpose of kotlin.test is to provide unified API for writing tests regardless of the test runner and assertion library used
	- [Asserter - Kotlin Programming Language](https://kotlinlang.org/api/latest/kotlin.test/kotlin.test/-asserter/)
	- [kotlin.test - Kotlin Programming Language](https://kotlinlang.org/api/latest/kotlin.test/kotlin.test/#annotations)
- [Kotest](https://kotest.io/)  provides Test Framework & Assertion Library. It needs test runner for addtional dependency

## kotlin-test-junit vs. kotlin-test-junit5
- junit 4 is default when using gradle init 
- To use junit 5
	- Add testImplementation: org.junit.jupiter:junit-jupiter-api 
	- Add testRuntimeOnly: org.junit.jupiter:junit-jupiter-engine
	- Configure gradle to use JUnit5 
```groovy
tasks {
  test {
    useJUnitPlatform()
  }
}
```
- Easier configuration for junit5 
	- [java - Difference between junit-jupiter-api and junit-jupiter-engine - Stack Overflow](https://stackoverflow.com/questions/48448331/difference-between-junit-jupiter-api-and-junit-jupiter-engine/55084036#55084036)
	- [junit5-samples/build.gradle at main · junit-team/junit5-samples](https://github.com/junit-team/junit5-samples/blob/main/junit5-jupiter-starter-gradle/build.gradle)
- junit4 do not need task configuration **it is monolithic**


# Reference
1. [On the mysteries of kotlin.test. Answers I wish I had when configuring… | by Gabriel Shanahan | Level Up Coding](https://levelup.gitconnected.com/on-the-mysteries-of-kotlin-test-444cf094e69f)
2.  [JUnit 5 Architecture or "What's Jupiter?" // nipafx](https://nipafx.dev/junit-5-architecture-jupiter/)
