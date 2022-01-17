---
title: Ascending Rule for Cleaner Code
tags: ["programming"]
date: 2021-12-07
main: true
---

깨끗한 코드를 위한 원칙은 대체로 추상적이고 쉽지 않다. 유명한 [clean-code](../references/2020/clean-code.md)에서 주장하는 대로 좋은 이름을 짓고, 적은 수의 라인으로 함수를 표현하는 것은 생각보다 어려운 일이다. 어럽기 때문에 많은 개발자들이 오랜 고민을 하지않고 단순한 이름, 긴 함수의 코드를 만들어 버리고 만다. 
  
개발자들에게 필요한 건 더 구체적이고 확실한 근거를 가진 작은 규칙이다. 수행하기 쉬우면서도 결과가 확실한 규칙들이 분명 있다. 그 작은 규칙들 중 하나로 내가 **오름차순 법칙**이라고 부르는 법칙이 있다. 

## 부등호의 방향 

우리가 숫자를 인식하는 방법은 방향과 밀접한 연관이 있다. 우리에게는 1, 2, 3, ... , 10 의 증가수열이 10, 9, 8, ... 1 의 감소수열보다 훨씬 자연스럽게 느껴진다. 매일 바라보는 시계도, 몸무게를 제는 체중계도, 유튜브 영상의 재생시간도 이런 방식으로 변화한다. 대부분의 언어에서 지원하는 정렬의 경우도, 기본은 오름차순 정렬을 시도한다. 이 자연스러움이 코드의 가독성에 중요한 역할을 한다. 

- Y is bigger than X
- X is smaller than Y

위의 두 문장은 같은 의미를 가지지만, 첫번째 문장이 우리에겐 더 자연스럽게 읽힌다. Y가 X보다 크다고 말하는 문장을 읽을 때, 우리는 암묵적으로 우리가 생각하는 자연스러운 크기의 순서를 뒤집어서 생각을 해야한다. 

```kotlin 
fun fibonacci(n: Int): Int {
   if (3 > n) {
 	  return n
   }
   return fibonacci(n - 2) + fibonacci(n - 1)
}
```

위의 코드는 간단한 구현에도 불구하고, if 의 조건문이 가독성을 크게 흐린다. 부자연스러운 부등호의 방향 때문에, 우리는 생각의 순서를 뒤집는 과정을 거쳐야 한다. 그런면에서, 아래의 코드가 더 읽기 좋다.

```kotlin 
fun fibonacci(n: Int): Int {
   if (n < 3) {
 	  return n
   }
   return fibonacci(n - 2) + fibonacci(n - 1)
}

```

 조건문이 더 복잡해지는 경우에도 그렇다. 만약 n 이 양수여야만 한다는 조건을 추가하면 같은 함수를 아래와 같이 구현할 수 있다. 
 
 ```kotlin
fun fibonacci(n: Int): Int {
   if (0 < n && n < 3) {
      return n
   }
   return fibonacci(n - 2) + fibonacci(n - 1)
}
```

 n이 음수인 경우 예외를 던져야 하는 조건을 추가한다면 어떨까?  같은 원칙을 그대로 적용한다면 아래와 같은 구현을 자연스럽게 생각할 수 있다. 

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

변수 n은 함수의 아래로 갈수록 더 큰 값을 의미하고, 이 또한 좌에서 우로 커지는 것만큼 자연스럽게 읽힌다. 

## 수직방향 크기변화
```kotlin
fun grade(score: Int): Char {
	if (90 < score) {
		return 'A'
	}
	if (80 < scroe) {
		return 'B'	
	}
	return 'C'
}
```

이제까지의 자연스러운 부등호 법칙을 만족하는 코드이지만  아래로 갈수록 score 변수는 작은 값을 가지게 된다. 더 자연스러운 방법은 아래로 갈수록 큰 값을 가지도록 수정하는 것이다. 

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

이 코드는 마찬가지로 자연스러운 부등호 법칙을 만족하면서도 다른 두가지 장점이 있다. 

1. score 는 아래로 갈수록 커진다.
2. if 를 포함한 조건문을 읽을 때, score 변수를 먼저 읽을 수 있다. 

1번은 자연스러운 부등호 법칙과 같은 원리로 더 읽기 좋은 코드를 만든다. 2번의 경우, 일반적으로 코드를 읽는 사람의 관심은 90, 80 과 같은 상수보다 변수 score에 있다. 변수가 상수보다 앞서 있는 것이 더 읽기 편하다. 함수를 이해할 때 독자는 입력을 먼저 읽는다. 

## 수직방향 예외 처리
 일반적으로 함수의 예외처리는 함수의 시작부분에서 하는 것이 더 읽기 좋은 코드를 만든다. 한번의 예외 처리 이후에는 함수의 실행흐름을 바꾸는 코드를 생각하지 않아도 되기 때문에 그렇다. 하지만 위와 같은 예제로 예외 처리를 해보면 아래와 같은 코드를 만든다.

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

아래로 갈수록 score 값이 커진다는 원칙과 score 를 먼저 읽는 것이 더 좋다는 두개의 장점을 읽지만, 이후 코드를 읽기 쉬워진다. 한가지 개선 방안은, 의도적으로 자연스러운 부등호 법칙을 어기는 것이다. 

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

 첫번째 조건문에서 의도적으로 부등호의 방향을 부자연스럽게 해 독자로 하여금 예외상황에 대해 한번 더 생각하게 할 수 있다. 이런 코드는 불편하지만, 불쾌하지는 않다. 놓치기 쉬운 예외를 놓치지 않게 해줄 수도 있다.  
 
  이런 코드의 다른 장점은 score 변수를 모두 앞에 두면서 전체 코드가 더 일관된 형태를 유지하게 한다. spring framework의 경우 대부분 이런 형태로 부등호의 순서보다 변수가 앞에 나오는 형태를 선호하는 것처럼 보인다. 
 
  다른 방법으로 자연스러운 증가 방향을 유지하는 방법도 있다. 
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

 함수의 끝에 예외상황이 존재하지만, 가독성은 크게 해치지 않는다. 변수의 크기가 함수의 흐름에 중요한 영향을 미치는 경우에는 이런 방식의 코드도 큰 불편함 없이 읽을 수 있다. 

## Note 
1. 부등호의 방향은 좌에서 우로 커지는 방향으로 작성하는 것이 읽기 좋다
2. 변수의 크기 변화는 아래로 갈수록 커지는 형태가 읽기 좋다. 
3. 예외처리의 경우 의도적으로 부등호의 방향을 뒤트는 방법도 있다. 

 당연하게도 이런 법칙들이 모든 경우에 항상 적용된다고 말하긴 어렵다. 어떤 경우에는 큰 값을 먼저 처리하는 경우가 더 유용할 수 있다. 다만, 그런 경우에는 먼저 우회할 수 있는 방법을 찾아보곤 한다. 대부분 역순 처리가 자연스러운  경우에는 자료구조를 달리하는 방식으로 역순 코드를 피할 수 있다. 그래도 역시 역순 처리가 자연스러운 상황이라면 기꺼이 그런 코드를 작성할 수도 있다. 
 
# Reference
1. [clean-code](../references/2020/clean-code.md)
