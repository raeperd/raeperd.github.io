---
title: Ascending Rule for Cleaner Code
description: How to write readable code
date: Dec 7, 2021
---

The principles for clean code are usually abstract and not easy. As the famous Clean Code claims, it is harder than you think to come up with a good name and express a function with a few lines. Because it is difficult, many developers create simple names and long function codes without thinking for a long time.
  
What developers need is a little rule that is more specific and has a solid basis. Clearly there are rules that are easy to implement and have clear results. One of those little rules is what I call the **ascending rule**.

## Direction of the inequality sign

The way we perceive numbers is closely related to direction. To us, the increasing sequence of 1, 2, 3, ... , 10 feels much more natural than the decreasing sequence of 10, 9, 8, ... 1 . The watch you watch every day, the scale that measures your weight, and the playback time of YouTube videos change in this way. In the case of sorting supported by most languages, the default tries to sort in ascending order. This naturalness plays an important role in the readability of the code.

- Y is bigger than X
- X is smaller than Y

The two sentences above have the same meaning, but the first sentence reads more naturally to us. When we read a sentence that says Y is greater than X, we have to think implicitly by reversing our natural order of magnitude.

```kotlin
fun fibonacci(n: Int): Int {
   if (3 > n) {
	 return n
   }
   return fibonacci(n - 2) + fibonacci(n - 1)
}
```

Despite the simple implementation of the above code, the conditional statement of if greatly obscures the readability. Because of the unnatural direction of the inequality sign, we have to go through a process of reversing the order of our thoughts. In that respect, the code below is more readable.

```kotlin
fun fibonacci(n: Int): Int {
   if (n < 3) {
	 return n
   }
   return fibonacci(n - 2) + fibonacci(n - 1)
}

```

 This is true even when conditional statements become more complex. If we add the condition that n must be positive, the same function can be implemented as follows.
 
 ```kotlin
fun fibonacci(n: Int): Int {
   if (0 <= n && n < 3) {
      return n
   }
   return fibonacci(n - 2) + fibonacci(n - 1)
}
```

 What if we added a condition that should throw an exception if n is negative? If the same principle is applied as it is, the following implementation can be considered naturally.

```kotlin
fun fibonacci(n: Int): Int {
   if (n < 0) {
      throw IllegalArgumentException()
   }
   if (0 < n && n < 3) {
      return n
   }
   return fibonacci(n - 2) + fibonacci(n - 1)
}
```

The variable n means a larger value as it goes down the function, and it is also read as naturally as it increases from left to right.

## Vertical increasing direction
```kotlin
fun grade(score: Int): Char {
	if (90 < score) {
		return 'A'
	}
	if (80 < scroll) {
		return 'B'
	}
	return 'C'
}
```

The code satisfies the natural inequality rule so far, but the score variable has a smaller value as it goes down. A more natural way is to modify it to have a larger value as it goes down.

```kotlin
fun grade(score: Int): Char {
	if (score < 80) {
		return 'C'
	}
	if (score < 90) {
		return 'B'
	}
	return 'A'
}
```

This code likewise satisfies the natural law of inequality, but has two other advantages.

1. The score increases as you go down.
2. When reading conditional statements including if , the score variable can be read first.

#1 makes code more readable by the same principle as the natural inequality sign. In case 2, the reader's interest is generally in the variable score rather than constants such as 90 and 80 . It is more readable that the variable precedes the constant. When understanding a function, the reader first reads the input.

## Handling vertical exceptions
 In general, handling exceptions in a function at the beginning of the function makes the code more readable. This is because you do not need to think about code that changes the execution flow of a function after handling an exception once. However, if you handle the exception with the example above, the code below is created.

```kotlin
fun grade(score: Int): Char {
	if (100 < score) {
		throw IllegalArgumentException()
	}
	if (score < 80) {
		return 'C'
	}
	if (score < 90) {
		return 'B'
	}
	return 'A'
}
```

I read the two advantages of the principle that the score increases as you go down and that it is better to read the score first, but the code becomes easier to read afterwards. One improvement is to deliberately break the natural law of inequality.

```kotlin
fun grade(score: Int): Char {
	if (score > 100) {
		throw IllegalArgumentException()
	}
	if (score < 80) {
		return 'C'
	}
	if (score < 90) {
		return 'B'
	}
	return 'A'
}
```

 In the first conditional, the direction of the inequality sign is intentionally unnatural to make the reader think about the exceptional situation once more. This kind of code is inconvenient, but not unpleasant. It can also make sure you don't miss the elusive exception.
 
  Another advantage of this code is that it puts all score variables in front of it, keeping the overall code more consistent. In the case of the spring framework, it seems that most of the variables appear in front of the order of the inequality signs in this form.
 
  Another method is to maintain the natural direction of increase.
```kotlin
fun grade(score: Int): Char {
	if (score < 80) {
		return 'C'
	}
	if (score < 90) {
		return 'B'
	}
	if (score < 100 + 1) {
		return 'A'
	}
	throw IllegalArgumentException()
}
```

 There is an exception at the end of the function, but it doesn't hurt readability much. When the size of a variable has a significant effect on the flow of a function, this type of code can be read without much inconvenience.

## Note
1. It is better to write the direction of the inequality sign in a direction that increases from left to right.
2. The change in the size of a variable is more readable as it goes down.
3. In case of exception handling, there is also a method of intentionally twisting the direction of the inequality sign.

 Of course, it is difficult to say that these laws always apply in all cases. In some cases, it may be more useful to deal with large values first. However, in such a case, the first thing to do is to find a way to bypass it. In most cases, when reverse order processing is natural, the reverse order code can be avoided by changing the data structure. Still, I'd be happy to write such a code if the reverse order processing is natural.
 
