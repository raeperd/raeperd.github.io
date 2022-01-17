---
title: Lambda with receiver
date: 2021-03-20T19:58:54+09:00
tags: [kotlin]
---

# Lambda with receiver
- Extension Function & Lambda => Lambda with receiver
- a.k.a. Extension lambda

## `with`
``` kotlin
val sb = StringBuilder()
sb.appendln("something")
for (c in 'a'..'z') {
	sb.append(c)
}
sb.toString()
```

``` kotlin
val sb = StringBuilder()
with (sb) {
	appendln("something")
	for (c in 'a'..'z') {
		append(c)
	}
	toString()
}
```
- it is library function not a language spec
- To implement function like this, we need lambda with receiver

![](https://i.ibb.co/ryKc20T/lambda-with-receiver.jpg)

``` kotlin
val s: String = buildString {
	appendln("something")
	for (c in 'a'..'z') {
		append(c)
	}
}
```


## Extension function vs lambda with receiver 
![](https://i.ibb.co/vvW02ds/extension-function-vs-lambda-with-receiver.jpg)

## Lambda vs lambda with receiver
![](https://i.ibb.co/ZMbCkW0/lambda-vs-lambda-with-receiver.jpg)

# More useful library functions 
## `with`
``` kotlin
with (window) {
	width = 300
	height = 200
	isVisible = true
}
```

## `run` 
``` kotlin
val windowOrNull = windowById["main"]
windowOrNull?.run {
	width = 300
	height = 200
	isVisible = true
}
```
- like `with`, but extension
- Can be used with safe access

## `apply`
``` kotlin
val mainWindow =
	windowById["main"]?.apply {
		width = 300
		height = 200
		isVisible = true
} ?: return
```
- return receiver as result

## `also`
``` kotlin
val mainWindow =
	windowById["main"]?.apply {
		width = 300
		height = 200
		isVisible = true
}?.also {
	showWindow(it)
}
```

## Summary
![](https://i.ibb.co/mXMTtMt/this-vs-it.jpg)

## Playground: Member extensions
``` kotlin
class Words {
    private val list = mutableListOf<String>()

    fun String.record() = list.add(this)

    operator fun String.unaryPlus() = record()

    override fun toString() = list.toString()
}

fun main(args: Array<String>) {
    val words = Words()
    with(words) {
        // The following two lines should compile:
        "one".record()
        +"two"
    }
    words.toString() eq "[one, two]"
}
```

# Reference
* [Lambda with receiver | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/FNQGO/lambda-with-receiver)
* [More useful library functions | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/pCrW2/more-useful-library-functions)
* [Kotlin Playground: Working with auxiliary functions | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/ungradedWidget/SVZzI/kotlin-playground-working-with-auxiliary-functions)
* [Kotlin Playground: Member extensions | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/ungradedWidget/VazrU/kotlin-playground-member-extensions)