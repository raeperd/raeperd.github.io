---
title: Kotlin For Java Developers
date: 2021-03-16
tags: [kotlin]
cover:
  image: https://i.imgur.com/ZIfY4me.png
---

# Introduction 

 Java로 백엔드 개발을 시작한지 어느덧 1년이 지났다. 처음 C++ 개발환경에서 넘어왔을때, Java는 이전과 비교할 수 없을 만큼 편리한 문법과 개발환경들을 제공했다. 스스로 할당되고 해제되는 메모리, CMake 와 비교하면 말도 안되게 편리한 gradle 을 이용한 의존성 관리, Intellij, jacoco, jib, spring-boot 와 같은 놀라운 도구들은 굉장히 인상적이었다.

  좋은 첫인상에도 불구하고,사용하다보니 단점들이 보이기 시작했다. 느껴지는 단점들을 회피하면서 개발을 하다보면, 이 문제들이 Java 안에서 "거의" 극복이 불가능하다는 사실을 알게 되었고, 대채제를 찾기 시작했다. 당연하게도 그런 사람은 물론 나 뿐만이 아니였고, Kotlin 이라는 프로그래밍 언어의 개발 동기는 내가 Java에게 가졌던 불만들과 정확하게 일치했다. 

## About Course 

[Kotlin For Java Developers - Coursera](https://www.coursera.org/learn/kotlin-for-java-developers)

 새로운 기술을 배우는 가장 좋은 방법이 뭘까? 좋은 책을 한권 사서 꼼꼼히 읽거나, 동영상으로 된 강의 영상을 보거나, 그 기술을 사용하는 프로젝트를 처음부터 완성해보는 방법등이 있을 것 같다.
 내가 새로운 기술을 배울 때 생각하는 제 1원칙은 **그 새로운 기술을 만든 사람이야 말로 그 기술의 가장 열정적인 전문가라는 점이다.** 나는 가능하다면 항상 그 기술을 만든 사람들이 직접 만든 리소스를 먼저 찾아본다. 그런 의미에서 이 강의가 참 매력적이다. Kotlin 언어를 직접 개발하고 현재까지 운영하고 있는 JetBrain에서 만든 강의로, 실제 강의 중간 중간에 Kotlin 의 리드 디자이너가 몇몇 Kotlin의 특징에 대한 개발 의도와 사용방법을 알려주는 점들이 참 흥미로웠다. 예를 들어 이런 것들이 있었다.

- [History Of Kotlin](https://coursera.org/share/c409d450006e8ec4ef6bcab109d8a04b)
- [Importance Of Extensions](https://coursera.org/share/644b310e8019df75312ead6bda248723)
- [Importance of Nullability](https://coursera.org/share/77f4ba5ec20d0f065f9ddc12620017da)

 강의는 영상을 보는 것은 기본적으로 무료이지만, 프로그래밍 과제와 수료증을 받기 위해서는 결제를 해야한다. 한국돈으로 4~5만원 정도 였던 것으로 기억하는데 충분히 값어치를 한다고 생각한다. 참고로 한글 자막은 지원하지 않는다.

![image-20210624025617605](https://i.ibb.co/BPGhTD4/image-20210624025617605.png)

 수강평들은 대체로 괜찮지만, 강연자의 영어 악센트가 어색해 듣기 어렵다는 평이 많다. 실제로 자동으로 생성되는 영어자막을 켜놓으면 알고리즘이 힘들어 할 정도로 발음이 듣기 불편하긴 하다. 그래도 그정도는 감수할 정도로 강의 자체의 퀄리티는 좋다고 생각한다.

 프로그래밍 과제들은 꽤 난이도가 있는 편이지만 문제의 퀄리티는 준수한 편. 과제의 문제들도 Java 스타일의 코드보다 Kotlin 의 새로운 특징들을 살리면 깔끔하게 풀리는 문제들이 많았다. 아마 강의자가 의도한게 아닐까 싶은데 꽤 재밌게 문제를 풀 수 있었다.

Kotlin에 대해 궁금하다면 이 영상을 추천

- [What is Kotlin - Coursera](https://coursera.org/share/c34b108cce6d2645d09293f4647a334e)

# About Kotlin 

![Kotlin](https://i.ibb.co/C9Y9GB8/998-A673-D5-C778-BCE13.png)

Kotlin이 제공하는 가장 핵심적인 기능을 꼽으라하면 아래 3가지가 아닐까 싶다. 

- Java 와의 호환성
- [extension-function](extension-function.md) 
- [nullability](nullability.md)

물론 모두 훌륭한 기능이지만 내가 가장 중요하게 생각했던 부분은 변수를 선언하는 방식에 있다.

## Immutability

### `val`

 Java에 대한 불평 불만은 하루 종일도 할 수 있지만, 그 중 내가 가장 참기 힘들었던 부분은 Java는 immutablity 에 너무 무관심하다는 점이다. 이제까지의 내 경험으로 어플리케이션 개발자가 선언하는 거의 모든 함수의 인자, 변수는 `final` 이여야 했다. 함수의 인자에 값을 새로 대입하는 경우는 단 한번도 없었고, `final` 이 아닌 변수를 선언해야 하는 경우는 특정 라이브러리의 API 가 강요하지 않는 이상 스스로 그러지 않도록 노력했다. 

```java
final int x = 10;
// other codes .. 
```

 내가 Java 에 원했던 점은, 모든 함수의 인자와 변수가 기본적으로 `final` 이고, 반대로 추후에 다시 새로운 값이 할당 될 수 있는 경우에 `mutable` 과 같은 키워드를 붙이는 방식이었다. 프로그래머가 사용하는 거의 모든 변수는 상수인데, 이를 컴파일러가 인식하게 하기 위해서는 매번 `final` 키워드를 붙여야 한다. 어떤 개발자들은 `final` 없이도 상수임이 자명하도록 함수가 짧아야 한다고 주장하지만 나는 개인적으로 `final` 을 명시하는 편이 좋다고 생각한다. 사실 어느쪽을 선택하든 문제는 근본적으로 해결되지 않는다. 전자는 상수를 상수로 선언하지 않았음이 문제고, 후자는 자명한 선언을 계속해서 반복해야 한다는 단점이 있다.  

  Kotlin 에서는, 상수는 `val` 변수는 `var` 로 선언할 수 있다. 키워드의 길이나 간결함은 kotlin 의 type 추론을 이용하면 한번 더 간결해질 수 있다. Kotlin 에서의 상수는 아래처럼 간결하게 쓸 수 있다. 

``` kotlin
val x = 10
```

 사실 여기서도 불평을 하나 얘기하자면 `val` 와 `var` 는 너무 비슷하다. IDE 의 도움으로 이런 구분을 쉽게 할 수 있다지만, 차라리 상수에 대해서는 C++ 과 같이 `const ` 와 같은 키워드를 사용하는게 어땠을까. 그러면 더 분명했을텐데 (Kotlin 에서는 `const`를 다른 의미로 사용한다))


### `fianl` class 

 Kotlin 에서는 기본적으로 모든 클래스가 `final` 이다. 이 부분도 내가 생각하는 이상적인 특징인데, Java 에서는 클래스 앞에 final 을 붙이는게 어색할 정도로 대부분의 개발자들은 class 의 immutablity 에 대해 무감각한 것 같다. 

 더 자세한 내용은 [OOP Design Choices](https://coursera.org/share/1bd29c59962f74363374c39bb565ba33) 를 참고 

- 개인적으로 클래스의 기본 접근 지시자가 `public` 이 기본인 것은 아쉽다. 내가 Kotlin의 디자이너 였다면, 모든 클래스의 기본 접근 제한은 package private 로 구현했을 것 같다.



## [extension-function](extension-function.md) 

굉장히 인상깊었다. 상속의 미니멀 버전이랄까. 기존에 없던 혁명적인 기능은 아니지만, 같은 OOP의 패러다임에 있으면 개발자가 아무리 잘해도 기존의 코드나 패턴들에서 벗어나기 쉽지 않다고 생각했는데 이 기능은 내가 생각했던 패턴을 벗어난 인터페이스를 지원한다. 아마 Java 만을 사용했다면, 이런식으로 객체를 사용할 수 있다고는 평생 생각을 하지 못했을 수도 있을 것 같다. Extension을 써보면서 Kotlin 을 배우길 잘했다는 생각이 들었다. 

 이 기능 하나가 Kotlin을 훨씬 유연하고 깨끗한 코드를 유지할 수 있게 만들어 준다. 프로그래밍 과제를 하면서 Extension 을 적극적으로 써봤는데, 이 기능은 같은 함수를 사용할때도 훨씬 꺠끗하게 사용하게 하고, 새로운 함수를 작성할때도 더 명확하게 의도를 전달할 수 있게 한다. 아직 잘 모르지만, Kotlin 으로 본격적인 어플리케이션 개발을 하게 된다면, 가능한 거의 모든 함수는 extension으로 구현하게되지 않을까 싶다. 

## [nullability](nullability.md) 

Java에 이미 `Optional` 이 있기 때문에 큰 차별점이라고 보기는 어렵지만, `Optional` 과 달리 새로운 인스턴스를 생성하는 형식이 아니라 새로운 Type 이 정의된 형태로 구현되었기 때문에 성능상의 손실이 없다는 점이 다르다. 

## ETC

 그외에도 많은 좋은 점들이 있는데, 굳이 일일이 나열해가면서 설명하고 싶지는 않다. 다른 자세한 특징들은 구글의 레퍼런스나 강의를 참고하면 좋을 것 같다. 아래의 내용들이 내가 강의를 보면서 요약한 내용들이다.

- [basic](basic.md)
- [extension-function](extension-function.md)
- [nullability](nullability.md)
- [functional-programming](functional-programming.md)
- [conventions](conventions.md)
- [Inline-function](Inline-function.md)
- [sequence](sequence.md)
- [lambda-with-receiver](lambda-with-receiver.md)
- [type-in-kotlin](type-in-kotlin.md)

# Review 

 새로운 언어의 문법이나 인터페이스와 같은 지식은 그자체로는 큰 가치를 가지지 않는다. 내가 새로 배우게될 모든 언어들은 어차피 `if` 문을 어떻게든 지원할테고, `for` 문을 어떻게든 지원할 것이라 생각하면 사실 새로운 언어를 배울 필요성을 느끼지 못할 수도 있다. 내 생각도 크게 다르지 않았는데 이번에 Kotlin 을 공부해보면서 생각이 많이 바뀌었다. 새로운 프로그래밍 언어를 배우면 그 언어를 디자인한 사람의 프로그래밍에 대한 생각을 읽을 수 있는데, 거기서 새로운 영감을 많이 받을 수 있는 것 같다. 

 처음 Kotlin 을 봤을때는 조금 세련된 Java 정도의 인식이 있었지 별 감흥이 없었는데, Google 이 Android 의 공식 언어로 채택하고, Spring 에서 공식적으로 지원하기 시작하는 것 등에는 역시 그만한 이유들이 숨어 있었다. 이렇게까지 해보니 사실 새로 시작하는 프로젝트에서 Java 를 써야하는 이유가 없어보인다. Kotlin 이 아니라 Java 를 써야만 하는 상황은 기존의 Java 개발자들을 위한 배려 이상의 의미는 없어 보인다. 그렇기 때문에라도 모든 Java 개발자들은 Kotlin을 알아야 하지 않을까.

추후에는 Functional Programming 을 완전하게 지원하는 언어를 새로 하나 배워보면 좋을 것 같다. 

# Reference
- [Kotlin For Java Develropers - Coursera](https://www.coursera.org/learn/kotlin-for-java-developers?#reviews)
- [Kotlin 프로그래밍 언어 알아보기 - Android Developers](https://developer.android.com/kotlin/learn?hl=ko)

