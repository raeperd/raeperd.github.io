---
title: Basic
date: 2021-02-27T19:58:54+09:00
tags: [kotlin]
---

# Hello world
```kotlin
package intro 

fun main(args: Array<String>) {
	val name = if (args.size > 0) args[0] else "Kotlin"
  prinln("Hello, $name!")
}
```
* Without class
* Without args
* `if` is an expression
* String templates
	* `”…$variable..."`
	* `”…${functioncall(variable)}..."`
* Kotlin String is Java String

```kotlin
fun main() {
	println("First ${foo()} Secnd ${foo()}")
}
```
* No magic, just call `foo` twice

# Variables
* `val`
	* value
	* `final var` in Java
	* read only reference not object
* `var`
	* variable
	* Mutable variable

**Compiler infers type from context**

```kotlin
val mutableList = mutableListOf("java");
mutableList.add("Kotlin")

val readOnlyList = listOf("java")
list.add("Kotlin") // error ! 
```

# Functions
```kotlin
fun max(a: Int, b: Int): Int {
	return if (a > b) a else b
}

fun max(a: Int, b: Int) = if (a > b) a else b
```
* One expression can be used with equals sign

## Function returning `Unit`
```kotlin
fun displayMax(a: Int, b: Int) {
	println(max(a, b))
}

fun displayMax(a: Int, b: Int): Unit {
	println(max(a, b))
}
```
- Works like `void` in java

## Functions everywhere
* top level function without class
* member functions
* local function in another function

From java top level function can be called static function of class with name of file name. Names can be change with `@JvmName`

# Named & default arguments
```kotlin
println(listOf('a','b','c').joinToString(seperator="", prefix="(", postfix=")"))
```

```kotlin
fun displaySeperator(character: Char ='*', size: Int = 10) {
	repeat(size) {
		print(character)
	}
}
```
* Order matters in parameter
* No implicit conversion `String` to `Int` or `Int` to `String`
* In java we should define overload functions
* `@JvmOverloads`

```kotlin
fun sum(a: Int = 0, b: Int = 0, c: Int = 0) = a + b + c
```

* 8 possible candidates

# `if` & `when`
* `if` is an expression

## `when` as `switch`
```kotlin
enum class Color {
	A, B, C
}

fun getName(color: Color): String = 
	when (color) {
		A -> "A"
		B -> "B"
		else -> "C"
}
```
* No longer `break`

```kotlin
fun min(c1: Color, c2: Color) = 
		when (setOf(c1, c2) {
			setOf(RED, BLUE) -> ORANGE
			else -> throw Exception("Dirty color")
		}
```

## checking types
```kotlin
when (pet) {
	is Cat -> pet.meow()
	is Dog -> pet.berk() 
}
```
* **smart cast !** Inferred by compiler 

## Capturing `when` subject in variable
```kotlin
val pet = getMyFavouritePet()
when (pet) {
	is Cat -> pet.meow()
	is Dog -> pet.woof()
}

when (val pet = getMyFavouritePet()) {
	is Cat -> pet.meow()
	is Dog -> pet.woof()
}

fun getSound() : String = 
	when (val pet = getMyFavouritePet()) {
		is Cat -> pet.meow()
		is Dog -> pet.woof()
		else -> "---"
	}
```

## `when` without argument
```kotlin
fun updateWeather(degrees: Int) {
	val (description, colour) = when {
		degree < 5 -> "cold" to BLUE
		degree < 23 -> "mild" to ORANGE
		else -> "hot" to RED
	}
}
```
* Any boolean expression can be used

# Loops
* while and do while

## `for` loop
```kotlin
val list = listOf("a", "b", "c")
for (s in list) {
	print(s)
}

val map = mapOf(1 to "one")
for ((key, value) in map) {
}

val list = listOf("a", "b", "c")
for ((index, element) in list.withIndex()) {
}

for (i in 1..9) {
} // 123456789

for (i in 1 until 9) {
} // 12345678

for (i in 9 downTo 1 step 2) {
} // 97531

for (ch in "abc") {
	print(ch + 1)
} // bcd

for (c in '0' in '9') {
	print(c)
} // 0123456789
```

# Reference
1. [Kotlin for Java Developers - Home | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/nRzeO/hello-world-example)