---
title: Functional Programming in Kotlin
date: 2021-03-12T19:58:54+09:00
tags: [kotlin]
---

# Functional Programming

# Lambdas
```kotlin
{x: Int, y: Int -> x + y } // always need curly braces

list.any({i : Int -> i > 0})
list.any() {i : Int -> i > 0}
list.any {i : Int -> i > 0}
list.any {i  -> i > 0}
list.any {it > 0}
list.any {
	print(it)
	it > 0 
}
```
* You can move Lambda out with parentheses, if the Lambda is the last argument,
* if the parentheses are empty, you can omit them
* If the type of the argument can be inferred, if it's clear from the context, it can be omitted.
* If your Lambda has their own argument, you can replace its name with `it`.
* **The last expression of this Lambda is the result.**  
 

## Destructuring declaration
```kotlin
map.mapValues( {entry -> "${entry.key} -> ${entry.value}" })
map.mapValues( {key, value-> "$key-> $value" })
map.mapValues( {_, value-> "$value" })
```
  
 
 
# Common Operations on collections
* `associate`
* `groupBy`
* `associateBy`
* `zip`
	* `zipWithNext`
* `flatten`
* `flatmap`
* `maxBy`  
 
 

## Tips for lambdas
* Don't use `it` if it has different types in neighboring lines
* Prefer explicit parameter names if it might be confusing otherwise
* Learn the library and try to reuse the library functions as much as possible

# Function Types
## Function types and Nullability
```kotlin
() -> Int?
(() -> Int)?
```
  
# Member Reference
- function vs variable
- bound reference vs unbound reference
  
# Return from lambda
* returns from the function
* Why we need this? because of this type of code
```kotlin
fun containsZero(list: List<Int>): Booelan {
	for (i in list) {
		if (i == 0) {
			return true
		}
	}
	return false
}

fun containsZero(list: List<Int>): Boolean {
	list.forEach {
		if (it ==0) {
			return true 
		}
	}
	return false
}
```

# Reference
* [Lambdas | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/5WnAh/lambdas)
* [Common Operations on collections | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/kpua0/common-operations-on-collections)
* [Kotlin Playground: Interchangeable predicates | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/ungradedWidget/ndlIy/kotlin-playground-interchangeable-predicates)
* [Function Types | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/865m3/function-types)
* [Member References | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/vhWDv/member-references)
* [return from Lambda | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/EELeL/return-from-lambda)
* [Is Kotlin a functional language? | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/aXeag/is-kotlin-a-functional-language)