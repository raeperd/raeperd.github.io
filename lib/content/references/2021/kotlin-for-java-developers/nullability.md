---
title: Nullability
date: 2021-03-10T19:58:54+09:00
tags: [kotlin]
---

# Nullable types
* Answer for `NullPointerException`
* Modern approach to make NPE compile time error, not run-time error

```kotlin
val s1: String = "always String"
val s2: String? = null

s1.length // fine 
s2.length // compile error
```

## Dealing with Nullable types
```kotlin
if (s != null) {
	s.length
}

s?.legnth
```

## Safe access
* return `null` if value was `null`

## Nullability operators
```kotlin
val s: String?

val length: Int = if (s != null) s.length else 0 
// same with
val length: Int = s?.length ?: 0
```
* Use Elvis operator for sure time

## Control-flow analysis
```kotlin
val s: String?

if (s == null) return 
s.length // << smart cast 
```
* compiler knows that s is never `null`

## Making `NullPointerException`
```kotlin
val s: String?

s!! // throws NPE if is null 

s.length // << smart cast 
```
* Compiler sometime cannot infer smart cast
* Not one null assertion for one line
* Prefer `?.` `?:` `if`-check to `!!`

# Nullable types under the hood
* `@Nullable` `@NotNull`
* Nullable types ≠ Optional
	* * `Optional` without Wrapping
	* Without trivial typecasting For performance issue

![](https://i.ibb.co/xjztKpd/list-of-nullable-vs-nullable-list.png)

## Safe cast
* Type cast `as`

```kotlin
if (any is String) {
	val s = any as String
	s.toUpperCase() 
} 

if (any is String) {
	any.toUpperCase()
}

val someString: String? = any as? String
```


# Reference
1. [Nullable types | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/wM6YD/nullable-types)