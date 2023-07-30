---
title: Gracefully handling Spring Boot exception with Factory Pattern
date: 2022-07-05
tags: [kotlin, spring, design-pattern]
description: "좋은 API를 만들기 위해서는 일관되고 쉬운 예외 응답 포맷이 필요하다. SpringBoot에는 예외를 처리할 수 있는 여러가지 방법들이 있다. 여러 프로젝트들을 구현하면서 내 생각에 최선의 예외처리 방은 Factory Pattern을 이용해 하나의 `@ExceptionHandler` 에서 예외를 처리하는 것이다."
---

좋은 API를 만들기 위해서는 일관되고 쉬운 예외 응답 포맷이 필요하다. SpringBoot에는 예외를 처리할 수 있는 여러가지 방법들이 있다. 여러 프로젝트들을 구현하면서 내 생각에 최선의 예외처리 방은 Factory Pattern을 이용해 하나의 `@ExceptionHandler`에서 예외를 처리하는 것이다.

## TL;DR

- `@RestControllerAdvice`와 `@ExceptionHandler(Exception::class)` annotation, factory pattern을 활용해 모든 예외를 하나의 함수에서 처리한다.
- `Exception`은 모두 Runtime Exception으로 처리하고, Exception 간의 상속은 한번만 하도록 제한한다.
- SpringBoot를 사용할때는 Servlet `Filter`가 아닌 `HandlerInterceptor`를 이용하는 편이 좋다.

## Problem

SpringBoot로 개발하는 대부분의 RESTful API는 일정한 형식의 에러 응답을 구현해야 한다. Layerd Pattern 의 API 개발은 많이들 사용해 많은 프로젝트들이 대체로 비슷한 구조를 가지지만 예외처리만큼은 프로젝트마다 개발자마자 큰 차이가 난다. Controller level 에서 `@ExceptinoHandler`를 사용하는 경우, `HandlerExceptionResolver`를 이용하는 경우, `@ControllerAdvice`, `ResponseStatusException`등 너무 많은 방법이 있어서 오히려 혼란스럽다. ([reference in Baeldung](https://www.baeldung.com/exception-handling-for-rest-with-spring))

나도 여러가지 방법들을 고민해보고 사용해 봤지만 **가장 코드가 간결하고 이해하기 쉬운 구조는 `@ControllerAdvice`와 함께 하나의 `@ExceptionHandler`만을 사용하는 것이다.**

## Solution

### Factory Pattern

Factory Pattern에서 Factory는 object 생성의 디테일을 처리한다. object 의 초기화는 항상 구체적인 구현 디테일을 포함하게 되는데, Factory Pattern은 이를 추상화 해 구체적인 구현이 아닌 인터페이스에 의존성을 가지게 된다.

대략적인 구현은 아래와 같다. Factory Pattern을 이용해 exception으로부터 그에 알맞은 `ErrorModel`과 status code를 만들어 내 반환한다.

### RestControllerAdvice

```kotlin
@RestControllerAdvice
class RestControllerAdvice {

    @ExceptionHandler(Exception::class)
    fun handleException(exception: Exception): ResponseEntity<ErrorModel>
	    = ResponseEntity(ErrorModel(exception), statusFrom(exception))

    private fun statusFrom(exception: Exception): HttpStatus =
        when (exception) {
            is NoSuchElementException -> NOT_FOUND
            is IllegalArgumentException -> BAD_REQUEST
            is JWTDeserializationException -> BAD_REQUEST
            is NotAuthorizedException -> FORBIDDEN
            is NoJWTAuthenticationFound -> FORBIDDEN
            else -> INTERNAL_SERVER_ERROR
        }
}

data class ErrorModel(val message: String) {
	constructor(exception: Exceptino): this(exception.message)
}
```

이런 구현을 따랐을 때 장점이 여러가지가 있다. 먼저 모든 예외가 (`@RestController`에서 발생하는) 이곳에서 처리되기 때문에 각종 디버깅이나 테스트 등이 훨씬 편해진다. JVM Application 버그의 대부분은 예외로 발견되고 시작되기 때문에 한 곳에서 모든 예외를 처리하는 것은 생각보다 큰 장점을 가진다. 여러 곳에서 예외를 처리한다면 브레이킹 프인트를 잡는 것부터가 피곤한 일이 되는데, **한 곳에서 예외응답을 처리하면 `handleException`함수에서 브레이킹 포인트를 걸고, exception 의 stack trace를 확인하는 것만으로 예외의 큰 흐름을 한번에 파악할 수 있다.**

또한 새로운 예외처리나 기능을 추가할 때에도 일관된 방법으로 예외처리를 할 수 있게 된다. Application 전체에서 예외를 처리하는 곳은 이곳 뿐이기 때문에 예외상황의 추가 삭제가 서비스 코드와 의존성을 가지지 않으며, 독립적으로 수정과 구현이 가능해진다. 예외를 던지면 이곳에서 반드시 처리되기 때문에 서비스 로직을 구현할 때 마음 편하게(?) 예외를 던질 수 있다.

테스트와 테스트 커버리지를 확인하기도 좋아진다. Application 전체 코드의 테스트 커버리지를 확인하는 대신, `@ExceptionHandler` 의 커버리지만을 확인하는 것으로 어떤 예외처리가 테스트 되었는지 확인할 수 있게 된다. 또한 `@WebMvcTest` 는 `@ControllerAdvice` bean 도 테스트에 로드하기 때문에 복잡한 설정없이 깔끔한 테스트가 가능하다.

### Adding another factory

예외마다 다른 형태로 ErrorModel 을 작성해야하는 경우, exception 으로부터 status code를 factory pattern 으로 만들어낸 것 처럼, exception 으로 부터 ErrorModel 을 만드는 factory 를 새로 만들어 다양한 예외 처리를 구현 할 수 있다.

```kotlin
@RestControllerAdvice
class RestControllerAdvice {

    @ExceptionHandler(Exception::class)
    fun handleException(exception: Exception): ResponseEntity<ErrorModel>
	    = ResponseEntity(ErrorModel(exception), statusFrom(exception))

    private fun statusFrom(exception: Exception): HttpStatus =
        when (exception) {
	        // same as above
	        is NotAuthorizedException -> FORBIDDEN
            else -> INTERNAL_SERVER_ERROR
        }

	private fun errorModelFrom(exception: Exception): ErrorModel =
		when(exception) {
			// ....
			is NotAuthorizedException -> ErrorModel("Not authorized: " + exception.message)
			else -> ErrorModel(exception)
		}
}

data class ErrorModel(val message: String) {
	constructor(exception: Exceptino): this(exception.message)
}
```

엄밀하게 말하면 이 패턴은 Factory Pattern이라기 보다는 Abstract Factory Pattern 이지만 굳이 이를 엄밀하게 구분할 필요는 없는 것 같다. Http Status Code 와 Response 각각을 Factory Method 를 이용해 구현했다. 예외처리 로직은 충분히 유연해서 여러 추가 구현이 가능하다. 비즈니스 로직에 따라 추가적인 처리가 필요하다면 , 다른 Factory 를 추가하가나, `ErrorModel` 을 Generic 으로 만드는 방법등이 있다.

장점이 많은 구조라 [여러 코드에 적용해 보았는데](https://github.com/raeperd/realworld-springboot-kotlin/commit/b08af624c44f53e5de7ae5415365ad6795b87a86), 한가지 주의할 점이 있다.

### Exception in `Fitler` is not captured

`@RestController` 뿐 아니라 `Filter` 등에서 비즈니스 로직이나 필요한 기능을 구현하는 경우도 많이 있는데, Filter 에서 던져진 예외는 `@RestControllerAdvice`에서 확인할 수 없다. Servlet Filter는 모두 `DispatcherServlet`보다 먼저 실행되기 때문에 SpringBoot 내부의 코드인 `@RestControllerAdvice`와 `@ExceptionHandler`에서 예외를 처리할 방법이 없는 것이다.

이런 경우 Filter에서 Response를 직접 만들어서 반환헤야만 하는데 예외처리를 여러 군데에서 해야하는 복잡성 뿐만 아니라 불편한 `HttpServletResponse`의 API 직접 사용해야만 한다.

대부분의 경우 `DispatcherServlet`과 `Controller`사이에서 요청을 처리할 수 있는 `HandlerInterceptor`를 이용하는 경우 `Controller`에서와 마찬가지로 예외처리를 할 수 있다. 이런 수정은 생각보다 어렵지 않게 [이 PR](https://github.com/raeperd/realworld-springboot-kotlin/pull/66)을 따라 구현할 수 있다. 만약 이렇게 구현 할 수 없다면 `Filter` 레벨에서 발생하는 예외처리 함수를 별도로 분리하고, `@RestControllerAdvice`와 `Filter`에서 같이 사용하도록 구현할 수도 있다. 그래도 역시 SpringBoot에서 Servlet API를 직접 사용하는건 여러므로 좋은 선택은 아니다.

## Exception Inheritance

Kotlin의 `is` operator는 상속 여부 또한 확인한다. 하나의 `Exception`이 `when`문의 여러 `Exception`을 상속하는 경우 의도치 않은 예외처리가 발생할 수 있다. 그렇기 때문에, 예외는 최대 하나의 예외만을 상속하도록 구현해야 하고, `RuntimeException`과 같은 General 한 예외를 `when`문에 포함하면 안된다. (한다면 가장 마지막 부분에 위치하도록 구현해야 한다.)

```kotlin
open class BaseClass

class DerivedClass : BaseClass()

fun main() {
    val obj1: BaseClass = BaseClass()
    val obj2: BaseClass = DerivedClass()

    println(obj1 is BaseClass) // true
    println(obj1 is DerivedClass) // false

    println(obj2 is BaseClass) // true
    println(obj2 is DerivedClass) // true
}
```

```bash
true
false
true
true
```

사실 하나의 예외가 여러 종류의 예외를 상속받는 경우는 드물고, 좋은 구조가 아니기 떄문에 처음부터 이런 구현은 피해야한다고 생각하지만, 만약 기존의 코드베이스에 이런 예외 구조가 있다면 이 글에서 제시하는 예외처리 방법은 적절하지 않을 수 있다.

## Conclusion

SpringBoot 에서는 에러를 처리하는 다양한 방법을 제공하지만, `@RestController`를 이용한 API 개발을 할 때는 Factory Pattern을 이용해 하나의 `@RestControllerAdvice`와 하나의 `@ExceptionHandler`를 통해 처리하면 에러 처리를 깔끔하게 할 수 있다.

## Reference

- [Error Handling for REST with Spring | Baeldung](https://www.baeldung.com/exception-handling-for-rest-with-spring)
- Freeman, Eric; Robson, Elisabeth. Head First Design Patterns (p. 201). O'Reilly Media. Kindle Edition.
- [Refactor JWT Filter with HandlerInterceptor by raeperd · Pull Request #66 · raeperd/realworld-springboot-kotlin · GitHub](https://github.com/raeperd/realworld-springboot-kotlin/pull/66)
