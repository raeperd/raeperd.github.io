---
title: Inline function in Kotlin
date: 2021-03-18T19:58:54+09:00
tags: [kotlin]
---

# Library functions looking like built-in constructs
## `run`
```kotlin
val foo = run {
  println("do something...")
  "foo"
}
```
* runs the block of code (lambda) and returns the last expression as the result

## `let`
```kotlin
fun getMail(): Email?
val email = getEmail() 
if (email != null) sendMailTo(email)

email?.let { e -> sendEmailTo(e) }
getEmail()?.let { sendEmailTo(it) }
```
* allows to check the arguments for being non-null, not only the receiver
* Its name comes from functional programming, where let is used to introduce a new variable. Kotlin is not a pure functional language, you can just declare a variable. There is a syntax for that. However, for such use cases with nullability, let is really useful.

## `takeIf` / `takeUnless`
```kotlin
issue.takeIf { it.status == FIXED }
person.patronymicName.takeIf(String::isNotEmpty)

person.patronymicName.takeUnless(String?::isNotEmpty)
```
* returns the receiver object if it satisfies the given predicate, otherwise return `null`

## `repeat`
```kotlin
repeat(10) {
  println("Welcome!")
}
```
* repeats an action for a given number of times

# The power of inline
* Inline function works as inline function in C++
* No performance overhead when you use `run`, `let`, `takeIf`, `takeUnless`, `repeat`, `withLock`, `use`
* Runtime inlining of VM is quite good. By default, do not use inline in your function
* Inline frees you from anonymous objects not speeds
* Inlining makes built jar larger than before

# Reference
* [Library functions looking like built-in constructs | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/UqKXj/library-functions-looking-like-built-in-constructs)
* [The power of inline | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/9Qmtm/the-power-of-inline)
* [Kotlin Playground: Inlining of the 'filter' function | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/ungradedWidget/lmAxP/kotlin-playground-inlining-of-the-filter-function)
* [Inline or not inline?.. | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/fvkpL/inline-or-not-inline)