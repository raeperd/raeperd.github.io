---
title: No Reason To Use Java After Kotlin
date: 2021-03-16
tags: [java, kotlin]
description: 개발자로서 내가 겪은 가장 큰 불행이자 행운 중 하나는 내 첫 커리어가 C++ 를 이용한 서비스 개발이었다는 점이다. 학부시절에 물론 C 언어로 프로그래밍을 하는 수업도 듣고 코딩을 해보았지만, 단순히 배우는 것과 실제 서비스 해보는 것은 아주 큰 차이가 있었다.
ogImage: https://i.ibb.co/C9Y9GB8/998-A673-D5-C778-BCE13.png
---

개발자로서 내가 겪은 가장 큰 불행이자 행운 중 하나는 내 첫 커리어가 C++를 이용한 서비스 개발이었다는 점이다. 학부시절 C로 프로그래밍을 하는 수업도 듣고 코딩도 해보았지만, 단순히 배우는 것과 실제 서비스 해보는 것은 아주 큰 차이가 있었다. 2016년 처음 C 언어 프로그래밍을 배울 때 썼던 [윤성우의 열혈 C 프로그래밍](https://www.yes24.com/Product/Goods/4333686)은 훌륭한 책이었지만, 이 책에 나오지 않은 CMake, 크로스 플랫폼 컴파일, CI/CD, Visaul Studio의 설정 지옥은 직접 경험해보지 않으면 느낄 수 없는 고통스러운 순간의 연속이었다.

그랬던 내가 Java 를 처음 접했을 때 느꼈던 안락함은 잊을 수가 없다. Window에서 개발하는 내가 더는 두개의 OS를 대상으로 컴파일 하지 않아도 되는 점과, CMake와 같은 복잡함 없이 gradle과 같은 편안한 도구를 이용해 의존성과 빌드를 설정할 수 있다는 점은 여러므로 충격적이었다. 마법같은 Garbage Collection과 심플한 문법(C++에 비해..)은 왜 많은 회사들이 Java 를 그토록 많이 쓰고 좋아하는지 알 수 있었다.

여전히 Java 는 쓸만한 언어이지만, 1년을 넘게 사용하다 보니 여러가지 단점들이 보이기 시작했다. 몇가지 단점들은 lombok, jacoco, sonarlint 등의 도구들의 도움을 받아 해결하는 것이 가능했지만, Java의 몇몇 문제들은 근본적으로 극복이 불가능함을 알게 되었다. 그렇게 새로운 대안을 찾아 나서기 시작했는데, 나처럼 생각했던 사람이 적지 않았던 것으로 보인다. Kotlin 개발의 motivation 들은 정확히 내가 Java에 가지고 있던 불만들과 일치했다.

---

## Kotlin For Java Developers

새로운 기술을 배울 때 가장 효율적인 방법은 공식 레퍼런스다. **기술을 개발한 사람이 그 기술의 가장 열정적인 전문가** 이기 때문에. 그런 점에서, 이 강의 [Kotlin For Java Developers](https://www.coursera.org/learn/kotlin-for-java-developers)는 매우 매력적이었다. 이는 Kotlin을 직접 개발하고 운영하는 Jetbrains에서 만든 강의다. 그 중에서도 가장 좋았던 점은 강의 중간에 Kotlin의 리드 디자이너(현재는 팀을 떠난 [@abreslav](https://twitter.com/abreslav?s=20))가 일부 Kotlin 개발 의도와 철학을 알려주는 것이 매우 흥미로웠다. 특히 아래의 세 영상이 인상적이다.

- [History Of Kotlin](https://coursera.org/share/c409d450006e8ec4ef6bcab109d8a04b)
- [Importance Of Extensions](https://coursera.org/share/644b310e8019df75312ead6bda248723)
- [Importance of Nullability](https://coursera.org/share/77f4ba5ec20d0f065f9ddc12620017da)

강의의 퀄리티는 훌륭하지만 화자의 영어 억양이 다소 어색하고 듣기 어렵다는 평가가 많다. 실제로 영어 자막을 자동으로 생성하는 알고리즘이 어려워 할 정도로 발음이 불편했지만 큰 문제가 되지 않았다. 프로그래밍 과제는 상당히 어렵지만 문제의 퀄리티는 괜찮은 편이다. Java 방식의 코드보다 Kotlin의 새로운 기능을 활용하면 깔끔하게 해결할 수 있는 문제가 많았다. 아마 강의에서 의도한 바 인 것 같은데 꽤 재미있게 문제를 풀 수 있었다.

---

## What is Kotlin

[이 영상](https://coursera.org/share/c34b108cce6d2645d09293f4647a334e)에서 Kotlin 팀의 개발 동기와 핵심 철학을 알 수 있다. 한마디로 말하자면 Kotlin은 Java와 호환성을 가지는 정적 타입의 프로그래밍 언어이지만, 개발자 입장에서 Kotlin은 분명 그 이상의 개발자 경험을 제공한다.

![Kotlin](https://i.ibb.co/C9Y9GB8/998-A673-D5-C778-BCE13.png)

내 생각에 Kotlin 이 제공하는 가장 핵심적인 기능은 다음 세 가지다.

1. Immutability
2. Extension Function
3. Nullability

Java와의 호환성 또한 Kotlin의 핵심 기능이지만, 이 글에서는 굳이 다루지 않겠다. 몇가지 Naming Convention만 신경쓴다면 기대하는 모든 기능은 Java에서와 마찬가지로 그냥 동작한다. 물론, 이 외에도 훌륭한 점들이 많이 있지만, 내가 가장 인상 깊었던 것은 Immutability 와 변수가 선언되는 방식이다.

---

## Immutability

### `val`

Java에 대한 불만은 하루 종일 할 수 있지만, 그중 가장 불편한 점은 자바가 불변성에 너무 무관심하다는 것이다. **Java 개발자들은 이것에 너무나 익숙해진 나머지 compile time에 보장되는 safety 를 포기하는 대신 더 간략한 코드를 작성한다. 하지만 지금까지의 내 경험으로, 애플리케이션 개발자들이 선언한 거의 모든 함수 인수와 변수는 `final` 이어야 한다.**

일부 개발자들은 모든 함수가 충분히 짧아서 `final` 없이도 함수내 모든 변수가 자명한 상수가 될 수 있다고 주장하지만, 그럼에도 나는 compile time safety를 포기하는 것보다는 다소 장황하더라도 `final` 을 사용하는 것이 좋다고 생각한다.

```java
// short
public String readFileContetns(String rawPath) {
	Path filePath = Path.of(rawPath)
    return Files.readString(filePath)
    // or Files.readString(Path.of(rawPath)) ??
}
```

```java
// verbose
public String readFileContetns(final String rawPath) {
	final Path filePath = Path.of(rawPath)
    return Files.readString(filePath)
}
```

골치 아픈 점은 개발자가 어느 쪽을 선택하든 나머지 한쪽의 문제가 근본적으로 해결되지 않는다는 것이다. 전자는 상수임에도 상수로 선언되지 않는다는 문제가 있고, 후자는 자명한 선언을 반복해야 하는 단점이 있다. 이것은 Java 의 결함에서 오는 개발자의 딜레마이지 개발자의 취향차이가 아니다. 어쩌면 Java 생태계에서 함수를 짧게 유지하는 것을 best practice로 여기는 것은 이것 때문일지도 모른다.

Kotlin에서 불변값은 `val`로, 변수는 `var`로 선언할 수 있다. 함수의 인자는 기본적으로 `val` 이므로 Java와 달리 어느쪽도 포기하지 않는 코드를 작성할 수 있다.

```kotlin
// rawPath is already immutable
fun readFileContents(rawPath: String): String {
    val filePath = Path.of(rawPath)
    return Files.readString(filePath)
}
```

Java에서 내가 원했던 것은 모든 함수 인수와 변수가 기본적으로 `final` 인 것이다. 대부분 현대적인 프로그래밍 언어는 Immutability를 기본으로 제공해야한다고 생각한다. (참고 [Immutability we can afford : Kotlin](https://www.reddit.com/r/Kotlin/comments/hvtlzd/immutability_we_can_afford/)) Java 에서는 [lombok 의 `val`](https://projectlombok.org/features/val)를 이용해 이런 점을 어느정도 극복할 수 있다.

### `final` class

Kotlin 에서는 기본적으로 모든 class가 `final`이다. 이부분 또한 내 생각에 이상적인 기본값인데, 대부분의 Java 개발자들은 그렇게 생각하지 않는 듯하다. Immutability 에 너무나 무심한 나머지, 어째서 Kotlin 에서는 JPA Entity 를 바로 적용할 수 없냐고 생각한다. 심지어 상속이 의미가 없는 대부분의 class 에서도 단지 `final` 다섯글자를 장황하게 생각해 생략하는 경우도 있다. 아주 많은 경우에 class 가 기본적으로 상속 불가능한 Kotlin 의 언어 디자인이 합리적이라고 생각한다.

Kotlin 의 class 디자인에 한가지 아쉬운점이 있다면, 모든 class가 기본적으로 public 이라는 점이다.
[OOP Design Choices](https://coursera.org/share/1bd29c59962f74363374c39bb565ba33) 에 따르면, 대부분의 개발자들이 Library 개발자가 아닌 Application 개발자이며 이들을 위해 public 을 default 로 설정했다는 점은 어느정도 납득이 가능하지만, 내가 Kotlin 의 디자이너 였다면 private 으로 하지 않았을까 싶다.

---

## Extension Function

**Kotlin 의 Extension Function은 매우 인상적이었다. 간단히 설명하자면 상속의 minimal 버전이라고 생각할 수 있다.** 나는 같은 OOP 패러다임에 있는 언어라면 개발자들이 아무리 뛰어나더라도 기존 코드나 패턴에서 크게 벗어나기 어려울 것이라고 생각했는데, 이 기능은 내가 염두에 둔 패턴에서 벗어난 새로운 코드 작성 방식을 제공한다. 만약 Java 만 사용해왔던 개발자라면 이런 방식으로 class 를 다룰 수 있을 것이라고 생각할 수 없었을 것이다. 나는 Kotlin 의 이 기능을 보면서 Kotlin 을 배우길 잘했다고 생각했다.

```kotlin
fun String.lastChar() = this.get(this.length - 1)
fun String.lastChar() = get(length - 1)

val c: Char = "abc.lastChar()
```

Extension Function은 Kotlin을 훨씬 더 유연하고 깨끗하게 코드를 작성할 수 있게 해준다. 특히 [Kotlin For Java Developers](https://www.coursera.org/learn/kotlin-for-java-developers?#reviews) 의 여러 프로그래밍 과제에서 Extension function의 유용함을 알 수 있었는데, 이 기능은 기존의 API 를 훨씬 유연하게 사용할 수 있게 해준다.

---

## Nullability

Java 에서 이미 `Optional` 을 가지고 있기 때문에 그리 대단치 않을 수 있으나, Java 의 `Optional` 과 달리 Kotlin 의 Nullability 는 compile time safety 가 보장된다. 몇가지 간단한 예만 살펴보아도 어렵지 않고, 직관적으로 이해할 수 있다.

```kotlin
// compile time safe
val s1: String = "always String"
val s2: String? = null

s1.length // fine
s2.length // compile error

// control-flow analysis
val s: String?

val length: Int = if (s != null) s.length else 0
// same with
val length: Int = s?.length ?: 0

// smart cast
val s: String?

if (s == null) return
s.length // << smart cast

// safe cast
if (any is String) {
	val s = any as String
	s.toUpperCase()
}

if (any is String) {
	any.toUpperCase()
}

val someString: String? = any as? String
```

---

## Review

문법이나 인터페이스와 같은 새로운 언어에 대한 지식은 그 자체로 큰 가치가 없다고 생각했다. 내가 앞으로 배우게 될 다른 프로그래밍 언어들이 어차피 `if` 와 `for` 를 지원하기만 하면 거기서 거기라고 생각했고, 새로운 프로그래밍 언어에서 몰랐던 인사이트를 얻을 것이라고는 생각도 하지 못했다. 이번에 Kotlin을 공부하면서 생각이 많이 바뀌었다. 새로운 프로그래밍 언어를 배울 때는 그 언어를 디자인한 사람의 생각을 읽을 수 있고, 그로부터 많은 새로운 영감을 얻을 수 있다. 프로그래밍 언어는 실제로 다른 프로그래머가 작성한 또 다른 프로그램이니까.

개인적으로 Kotlin을 처음 봤을 때는 약간 세련된 Java라는 인식이 있었지만, 이제 와서는 구글이 안드로이드 공용어로 채택하고 Spring이 Kotlin을 First-class 로 지원하는 것은 다 이유가 있어서 라는 생각이 든다.

이제는 새로운 프로젝트에서 자바를 사용할 이유가 없어 보인다. 새로운 프로젝트에서 Kotlin 대신 Java 를 써야만 한다면 아주 그럴싸한 이유가 있어야 할 것 같다. 여전히 많은 Java 개발자들이 안정성과 러닝커브와 같은 이유로 Java를 고집하는 것을 내 주변에서도 많이 보고 있는데, 솔직히 그 이유의 대부분은 전혀 납득이 되지 않는다. Kotlin은 이미 검증이 끝난 main-stream 언어다. 러닝커브는 제대로 된 Java 개발자들에게는 아주 작거나 없는 수준이다.

실제로 이 강의를 수강하고 기존에 Java 로 작성했던 많은 코드를 Kotlin 으로 작성해보았는데 (아래의 레포) 훨씬 만족스러운 개발자 경험과 생산성을 체감할 수 있었다. 아직 Kotlin을 경험해보지 못한 Java 개발자라면 꼭, Kotlin 을 공부해보고 Migration을 해보는 것을 추천한다.

- [raeperd/realworld-springboot-java](https://github.com/raeperd/realworld-springboot-java)
- [raeperd/realworld-springboot-kotlin](https://github.com/raeperd/realworld-springboot-kotlin)

---

## Reference

- [Kotlin For Java Developers - Coursera](https://www.coursera.org/learn/kotlin-for-java-developers?#reviews)
- [Learn the Kotlin programming language - Android Developers](https://developer.android.com/kotlin/learn?hl=en)
- [raeperd/realworld-springboot-java: Spring boot java implementation of realworld example.app](https://github.com/raeperd/realworld-springboot-java)
- [raeperd/realworld-springboot-kotlin: Spring boot kotlin implementation of realworld example.app](https://github.com/raeperd/realworld-springboot-kotlin)
