---
title: Property in Kotlin
date: 2021-03-15T19:58:54+09:00
tags: [kotlin]
---

# Properties
* Unlike java its language feature in kotlin
* access property without getter and setter
* but internal implementation is same
* `val` -> gettter
* `var` -> getter setter

## properties without field

```kotlin
class Rectangle(val height: Int, val width: Int) {
    
    val isSquare: Boolean 
    	get() {
            return height == width
        }
}
```

* everytime getter is called, operation is calculated
* access `field` in getter or setter

* inside the class  the calls are optimised

### changing visibility of a setter

```kotlin
class LenghtCounter {
    var counter: Int = 0
    	private set
    
    fun addWord(word: String) {
        counter += word.length
    }
}
```

# More about properties
interface can has property

```kotlin
interface User {
    val nickname: String
}

class FacebookUser(val accountId: Int): User {
    override val nickname = getFacebookName(accountId)
}

class SubscribingUser(val email: String): User {
    override val nickname : String
    	get() = email.substringBefore('@')
}
```

* why not ? it is just getter and setter

getter and setter cannot be smartly casted

```kotlin
interface Session {
    val user: User
}

fun analyzeUserSession(session: Session) {
    if (session.user is FacebookUser) {
        println(session.user.accountId) // Compiler error: Smart case impossible 
        								// session.user is open property
    }
}
```

* it may defined custom getter and setter
* for thread safety
* properties can be extended as other methods

# Lazy or late initialization

## Lazy property

* `by lazy`
* function takes lambda as parameter
* `lateinit`
	* cannot be `val` otherwise it could be modified from the java code
	* Not `NullPointerException` but `UninitializedPropertyException`
* can be nullable
* can't be primitive type
* `isInitialized` function can be used to check `lateinit var`

# Reference
* [Properties | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/GVJdx/properties)
* [Kotlin Playground: Unstable val | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/ungradedWidget/rLDqj/kotlin-playground-unstable-val)
* [More about Properties | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/KEgTB/more-about-properties)
* [Lazy or late initialization | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/lecture/MHhas/lazy-or-late-initialization)
* [Kotlin Playground: Using lateinit property | Coursera](https://www.coursera.org/learn/kotlin-for-java-developers/ungradedWidget/NWMX4/kotlin-playground-using-lateinit-property)