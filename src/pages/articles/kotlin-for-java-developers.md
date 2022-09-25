---
title: Kotlin For Java Developers
date: 2021-03-16
tags: [kotlin]
---

# Intro
 When we first moved from C++ to Java, Java provided a much more convenient syntax and development environment. I was very impressed with the amazing tools such as gradle, Intellij, jacoco, jib, and spring-boot, which are self-allocated and deallocated memory, much more convenient than CMake.

  Still using it, however, has started to show drawbacks. After overcoming some of the shortcomings, I realized that some problems were "almost" impossible to overcome in Java, and I started looking for alternatives. Of course, I wasn't the only one like that, and the motivation for developing a programming language called Kotlin was exactly the same as my dissatisfaction with Java.

## About Course

[Kotlin For Java Developers - Coursera](https://www.coursera.org/learn/kotlin-for-java-developers)

 When I learn a new technology, my number one rule of thumb is that **the creator of that new technology is the most passionate expert on that technology**. look for it In that sense, this lecture is very attractive. This is a lecture made by JetBrain, who developed and operates the Kotlin language directly, and it was very interesting that the lead designer of Kotlin informed the development intention and usage method of some Kotlin features in the middle of the actual lecture. For example, there were these:

- [History Of Kotlin](https://coursera.org/share/c409d450006e8ec4ef6bcab109d8a04b)
- [Importance Of Extensions](https://coursera.org/share/644b310e8019df75312ead6bda248723)
- [Importance of Nullability](https://coursera.org/share/77f4ba5ec20d0f065f9ddc12620017da)

 Lectures are basically free to watch videos, but you have to pay to receive programming assignments and certificates. I remember that it was around 40,000 to 50,000 Korean won, but I think it is well worth it. Note that Korean subtitles are not supported.

![image-20210624025617605](https://i.ibb.co/BPGhTD4/image-20210624025617605.png)

 Course reviews are generally good, but many say that the speaker's English accent is awkward and difficult to listen to. In fact, the pronunciation was inconvenient to the extent that the algorithm that automatically generates English subtitles was difficult, but it was not a problem.

 The programming tasks are quite difficult, but the quality of the problems is decent. There were many problems that could be solved neatly by utilizing the new features of Kotlin rather than Java-style code. I think it was probably the instructor's intention, but I was able to solve the problem quite fun.

If you are curious about Kotlin, I recommend this video

- [What is Kotlin - Coursera](https://coursera.org/share/c34b108cce6d2645d09293f4647a334e)

# About Kotlin

![Kotlin](https://i.ibb.co/C9Y9GB8/998-A673-D5-C778-BCE13.png)

If I had to pick out the most core features that Kotlin provides, I think the following three would be the best.

- Compatibility with Java
- [Extension Function](/references/2021/kotlin-for-java-developers/extension-function.md)
- [Nullability](/references/2021/kotlin-for-java-developers/nullability.md)

Of course, all of these are great features, but the thing that struck me the most is the way variables are declared.

## Immutability

### `val`

 Complaints about Java Complaints can be made all day long, but the thing that bothered me the most is that Java is so indifferent to immutability. [I think that modern programming languages ​​should provide Immutability by default.](/references/2022/Immutability-we-can-afford.md)

 In my experience so far, almost all function arguments and variables declared by application developers should be `final`. There was never a case of assigning a new value to a function argument, and when a variable other than `final` had to be declared, we tried not to do it ourselves unless the API of a specific library forces it.
   

```java
final int x = 10;
// other codes ..
```

 What I wanted in Java was that all function arguments and variables were basically `final`, and on the contrary, keywords such as `mutable` were added to the case that new values ​​can be assigned again later. Almost all variables used by programmers are constants, and to make the compiler recognize them, you need to add the `final` keyword each time.
 
 Some developers argue that functions should be short so that they are self-evident constants without `final` , but I personally think it is better to specify `final` . In fact, no matter which one you choose, the problem is not fundamentally solved. The former has a problem in that the constant is not declared as a constant, and the latter has the disadvantage of having to repeat the self-evident declaration over and over again.

  In Kotlin, constants can be declared as `val` and variables as `var`. The length and conciseness of keywords can be simplified once more by using kotlin's type inference. Constants in Kotlin can be written much easier

``` kotlin
val x = 10
```

 In fact, I have one complaint here. Is that `val` and `var` are too similar? Of course, It is possible to make this distinction easily with the help of an IDE, but how about using a keyword such as `const ` for constants as in C++? It would have been clearer then (But Kotlin uses `const` as Java does. Java and Javascript ruined this `const` keyword)


### `fianl` class

 In Kotlin, all classes are `final` by default. This part is also an ideal feature in my opinion, but most application developers seem to be insensitive to the immutability of a class to the extent that it is awkward to add `final` in front of a class in Java. In that sense, I think it's a reasonable default that all classes are `final`.

 For more information, see [OOP Design Choices](https://coursera.org/share/1bd29c59962f74363374c39bb565ba33)
- Personally, it is unfortunate that the default access directive of a class is `public`. If I were a designer of Kotlin, I would have implemented the default access restriction of all classes as package private .
- Of course, as the Kotlin designer said, from an application developer's point of view, this part may not be very important.

## [Extension Function](/references/2021/kotlin-for-java-developers/extension-function.md)

It was very impressive. It's a minimal version of inheritance. If you are in the same OOP paradigm, I thought it would be difficult for developers to deviate from existing codes or patterns no matter how well they did, but this function supports an interface that deviated from the pattern I had in mind. If you had only used Java, you might not have thought in your life that you could use objects in this way. While using Extension Function, I thought that I was good at learning Kotlin.

 This single feature makes Kotlin a lot more flexible and allows you to keep your code clean. I have actively used extensions while doing programming assignments, and this feature makes it much cleaner to use the same function and communicates intentions more clearly when writing new functions. I don't know yet, but if I develop a full-scale application with Kotlin, I wonder if almost all possible functions will be implemented as extensions.

## [Nullability](/references/2021/kotlin-for-java-developers/nullability.md)

Since Java already has `Optional`, it is difficult to see it as a big difference, but unlike `Optional`, it is different in that there is no performance loss because it is implemented in a defined type rather than a type that creates a new instance.

## Other Features

 There are many other good points, but I don't want to list them all. For other detailed features, it would be good to refer to Google's references or lectures. Below is a summary of what I learned while watching the lecture.

- [Basic](/references/2021/kotlin-for-java-developers/basic.md)
- [Extension Function](/references/2021/kotlin-for-java-developers/extension-function.md)
- [Nullability](/references/2021/kotlin-for-java-developers/nullability.md)
- [Functional Programming in Kotlin](/references/2021/kotlin-for-java-developers/functional-programming.md)
- [Conventions](/references/2021/kotlin-for-java-developers/conventions.md)
- [Inline Function](/references/2021/kotlin-for-java-developers/Inline-function.md)
- [Sequence](/references/2021/kotlin-for-java-developers/sequence.md)
- [Lambda With Receiver](/references/2021/kotlin-for-java-developers/lambda-with-receiver.md)
- [Type In Kotlin](/references/2021/kotlin-for-java-developers/type-in-kotlin.md)

# Review

 Knowledge of a new language, such as the grammar or interface, is not of great value in itself. If you think that all the languages I'll be learning will support the `if` statement anyway, and will support the `for` statement anyway, then you may not really feel the need to learn a new language.
 
  My thoughts were not very different, but as I studied Kotlin this time, my thoughts changed a lot. When you learn a new programming language, you can read the thoughts of the person who designed it, and I think you can get a lot of new inspiration from that. **Programming language is actually another program that is written by some other programmer.**
 
 When I first saw Kotlin, I had a slightly sophisticated Java-like perception, but not much excitement, but there were also reasons behind Google's adoption as the official language of Android and the start of official support in Spring.
 
 After doing this, there seems to be no reason to use Java in a new project. The situation of having to use Java instead of Kotlin seems to have no meaning beyond consideration for existing Java developers. Even so, shouldn't all Java developers know Kotlin?

 In the future, it would be good to learn a new language that fully supports Functional Programming.

# Reference
- [Kotlin For Java Developers - Coursera](https://www.coursera.org/learn/kotlin-for-java-developers?#reviews)
- [Learn the Kotlin programming language - Android Developers](https://developer.android.com/kotlin/learn?hl=en)