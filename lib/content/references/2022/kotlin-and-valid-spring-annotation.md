---
title: Kotlin and @Valid bean validation
tags: [ spring, kotlin, bug ]
date: 2022-01-09
---

# kotlin and @Valid Spring annotation
```kotlin
class SomeInfo(
    @field:NotNull
    @field:Pattern(regexp = Constraints.EMAIL_REGEX)
    var value: String
) {
    var id: Long? = null
}
```


# Reference
1. [kotlin and @Valid Spring annotation - Stack Overflow](https://stackoverflow.com/questions/36515094/kotlin-and-valid-spring-annotation)
2. [Annotations | Kotlin](https://kotlinlang.org/docs/annotations.html#annotation-use-site-targets)
