---
title: Extensions
date: 2021-03-03T19:58:54+09:00
tags: [kotlin]
---

# Extension

# Extension functions
```kotlin
fun String.lastChar() = this.get(this.length - 1)
fun String.lastChar() = get(length - 1)

val c: Char = "abc.lastChar()
```
* `String` as receiver
* `this` can be omitted
* `import` explicitly to use in anther file
* Under the hood extension function is static function

## Calling Extension Functions from java code
* As functions, extension function is static function in java code
* By importing static function, java code can use extension function

## Examples from the standard library
* Kotlin standard lib = java standard lib + extension in Kotlin
* No kotlin SDKs
	* small runtime jar file
	* easy java interpolation

## Exampels
* `joinToString`
* `getOrNull`
* `withIndex`
* `until`
	* infix function
	* `1.until(10)`
	* `1 until 10`
* `to`
	* infix function
	* generate pair
* `isLetter` `isDigit` ..
 
   

## Extensions for `String`
### Formatting multiline strings
```kotlin
val q = """To code, 
	 or not"""

q.trimMargin()
q.trimIndent()

val regex = "\\\\d{2}".toRex()
val regex = """\\d{2}""".toRex()
```

### Conversion to numbers
```kotlin
"123".toInt()
"123.33".toDouble() 

// Excetpion ! 
```
 

# Sum as an extension function
```kotlin
fun sum(list: List<Int>): Int {
    var result = 0
    for (i in list) {
        result += i
    }
    return result
}

fun main(args: Array<String>) {
    val sum = sum(listOf(1, 2, 3))
    println(sum)    // 6
}
```
 

# Calling extensions
* For parent child class, remember extension funciton is `static`
* Extensions are `static` java functions under the hood
* No `override` for extension functions in Kotlin

## Member vs extension
```kotlin
fun String.get(index: Int) = "*"

fun main(args: Array<String>) {
  println("abc".get(1))
}
```
* "b" is printed here
* member always win
* you will get warning for that
* But overloading can be done without any problem

# Importance of extensions
* We can simplify API and Class
* User of API and Class can use it more flexabily

# Reference
1. [Extension Functions | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/i8Av9/extension-functions)