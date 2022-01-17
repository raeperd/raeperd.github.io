---
title: Type in Kotlin
date: 2021-04-06T19:58:54+09:00
tags: [kotlin]
---

# Basic Type
- kotlin doesn’t have primitive type 
- `Int` or `Int?`

## `Int` in bytecode
``` kotlin
fun foo(): Int = 1
```

``` java
public static final int foo() {
	return 1;
}
```

## `Int?` in bytecode
``` kotlin
fun bar(): Int? = 1
```

``` java
public static final Integer foo() {
	return 1;
}
```

## Primitive & wrapper types
![](https://i.ibb.co/GFn8yTB/primitive-and-wrapper-types.jpg)
![](https://i.ibb.co/WDQwQFv/arrays-of-primitive-types.jpg)

## `String`
- Kotlin `String` hides some confusing methods

## `Any`
- `Any` in Kotlin is a super type for all non-nullable types. 

![](https://i.ibb.co/tc6bsB9/any.jpg)
- Unlike `Object`, `Any` is not only super type for reference types, but it’s also super type for types like `Int` corresponding to primitives. 

``` kotlin
log(2017)

// auto boxing happend
fun log(any: Any) {
	println("Value: $any")
}

// no auto boxing now
fun log(i: Int) {
	println("Value: $i")
}
```


## Function 
![](https://i.ibb.co/4jjMG1v/function-types.jpg)

## `Array`
``` java
int[] ints1 = {1, 2,};
int[] ints2 = {1, 2,};

ints1.equals(ints2); // false
Arrays.equals(ints1, ints2) // true
```

``` kotlin
val ints1 = intArrayOf(1, 2)
val ints2 = intArrayOf(1, 2)

println(ints1 == ints2) // false
println(ints1.contentEquals(ints2) // true
```
- Prefer Lists to Arrays
	- only Kotlin, there is no reason for arrays.
	- `MutableList` is Java util `ArrayList` under the hood. `ArrayList` is very close to array in terms of performance. So, prefer `List` to `Array` by default and avoid the necessity to remember the right way to compare arrays.

# Kotlin type hierarchy
![](https://i.ibb.co/mDL1JX5/type-hierachy.jpg)

![](https://i.ibb.co/9wc5jYC/unit-vs-nothing-vs-void.jpg)

## `Unit`
- A type that allows only ::one value:: and thus can hold no information
- the function completes successfully
- `Unit` instead of `void` 

## `Nothing`
- A type that has ::no values::
- The function never completes
- This function never returns, only throws exceptions

## Why `Nothing` needs in kotlin 
![](https://i.ibb.co/VH41XRr/when-fail-function-return-unit.jpg)
![](https://i.ibb.co/dG37ccx/now-fail-function-returns-nothing.jpg)
- answer should be super type of both execution result

# Nullable types
![](https://i.ibb.co/QvXkY7b/nullability-annotations.jpg)
![](https://i.ibb.co/41KPG72/platform-type.jpg)
- Platform type `Type!` can be only seen in compiler error message
- With Java code without annotation, kotlin compiler cannot infer any nullability

## How to still prevent NPEs?
- Annotate your Java types
	- Supports many kinds of annotations from different packages
	- Can specify `@NotNull` as default, and annotate only `@Nullable` types 
	- JSR-305, `@ParametersAreNonnullByDefault`
- Specify types explicitly

``` java
public class Session {
	public String getDescription() {
	return null;
	}
}
```

``` kotlin
val session = Session()
val description: String? = session.description
println(description?.lengh) // null 
```


## Collection types
### `List` & `MutableList`
- Two interfaces declared in `kotlin.collections` package
- `MutableList` extends `List`

### Read-only != immutable 
- Read-only interface just lacks mutating methods
- The actual list can be changed by another reference

![](https://i.ibb.co/GFnFxD0/arraylist-under-the-hood.jpg)

### Read-only interfaces improve API
``` kotlin
object Shop {
	private val customers = mutableListOf<Customer>()
	fun getCustomers(): List<Customer> = customers
}

val customers = getCustomers()
customers.add() // error ! 
```


# Reference
* [Basic types | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/GzTa3/basic-types)
* [Kotlin type hierarchy | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/zxwAb/kotlin-type-hierarchy)
* [Nullable Types | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/QB15k/nullable-types)
* [Collection types | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/R3aKw/collection-types) 