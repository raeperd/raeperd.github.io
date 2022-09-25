---
title: Kotlin Conventions
date: 2021-03-16T19:58:54+09:00
tags: [kotlin]
---

## operator overloading
```kotlin
a + b 
a.plus(b)

operator fun Point.plus(other: Point): Point {
  return Point(x + other.x, y + other.y)
}
```

| expression | function name |
| ---------- | ------------- |
| a + b      | plus          |
| a - b      | minus         |
| a * b      | times         |
| a / b      | div           |
| a % b      | mod           |


## Unary operations

```kotlin
-a
a.unaryMinus()
```

| expression | function name |
| ---------- | ------------- |
| +a         | unaryPlus     |
| -a         | unaryMinus    |
| !a         | not           |
| ++a, a++   | inc           |
| --a, a--   | dec           |
|            |               |

```kotlin
val lsit = listOf(1,2,3)
val newList = list + 2

val mutableList = mutableListOf(1,2,3)
mutableList += 4 // plusAssign
```

* on immutable, create new list
* on mutable, calls `plusAssign`

## Conventions
| symbol | translated to                  |
| ------ | ------------------------------ |
| a > b  | a.comparedTo(b) > 0            |
| a >= b | a.comparedTo(b) >= 0           |
| a == b | a.equals(b) // also check null |

### Accessing elements by index: `[]`

```kotlin
class Board {}

board[1, 2] = 'x'

operator fun Board.get(x: Int, y: Int): Char { .. }
operator fun Board.set(x: Int, y: Int, value: Char) { .. }
```


## The `in` convention

```kotling
a in c 
c.contains(a)
```


## `rangeTo` convention

```kotlin
start..end 
start.rangeTo(end)
```


### The `interator` convention

```kotlin
operator fun CharSequence.iterator(): CharInterator
for (c in "abc") {}
```


## Destructuring declarations
```kotlin
val (first, second) = pair
```


![](https://i.ibb.co/19JG230/destructuring-declarations-under-the-hood.jpg)
Whenever the expression has the right number of operator competent and functions, it can be used as the right hand side for this destructuring in initialization, also in for loop or inside the lambda.


![](https://i.ibb.co/LPbQsJK/destructuring-in-lambdas.jpg)
You're always surrounded with a parenthesis of the variables which are the result of the destructuring.


![](https://i.ibb.co/myxc8QH/destructuring-declarations-and-data-classes.jpg)
Then, it takes part in destructuring, but the variable is not created.  
**For extension, use name conventions rather than interface**

# Reference
* [Operator Overloading | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/ZConz/operator-overloading)
* [Conventions | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/fZtQF/conventions)
* [Kotlin Playground: Equality | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/ungradedWidget/pTMIo/kotlin-playground-equality)
* [(Not)using operator overloading | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/a1bX5/not-using-operator-overloading)