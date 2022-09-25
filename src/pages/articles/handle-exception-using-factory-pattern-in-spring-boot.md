---
title: Handle Exception using Factory Pattern in Spring Boot
tags: [ kotlin, spring, design-pattern ]
date: 2022-07-05
---

- [RESTful API](references/2022/rest-api.md) usually needs common error response format with http status code 
- There are many ways to handle errors in spring boot, But most cleaner way to handle exception is `@ExceptionHandler` with `@ControllerAdvice` with [Factory Pattern](references/2022/factory-pattern.md)

# Implementation
## RestControllerAdvice
```kotlin
@RestControllerAdvice
class RestControllerAdvice {

    @ExceptionHandler(Exception::class)
    fun handleException(exception: Exception): ResponseEntity<ErrorResponseDTO> =
        createErrorResponseEntity(exception)

    private fun createErrorResponseEntity(exception: Exception): ResponseEntity<ErrorResponseDTO> =
        ResponseEntity(ErrorResponseDTO(exception), createErrorResponseStatus(exception))

    private fun createErrorResponseStatus(exception: Exception): HttpStatus =
        when (exception) {
            is NoSuchElementException -> NOT_FOUND
            is IllegalArgumentException -> BAD_REQUEST
            is JWTDeserializationException -> BAD_REQUEST
            is NotAuthorizedException -> FORBIDDEN
            is NoJWTAuthenticationFound -> FORBIDDEN
            else -> INTERNAL_SERVER_ERROR
        }
}
```
- Returns `ResponseEntity` with corresponding response status code 

## ErrorResponseDTO
``` kotlin
data class ErrorResponseDTO(
    val errors: ErrorResponseDTONested
) {
    constructor(exception: Exception) : this(ErrorResponseDTONested(exception.message?.let { listOf(it) }
        ?: emptyList()))

    data class ErrorResponseDTONested(
        val body: Collection<String>
    )
} 
```
- Customize this response data class 

# Caution
- Prefer [`HandlerInterceptor` to `Filter`](references/2022/handler-interceptors-vs-filters-in-spring-mvc.md)
	-  [Servlet `Filter`'s exception is not propagates to `@ExceptionHandler`](references/2022/error-handling-in-servlet-filters.md)
- `Exception` inherits another `Exception` may result in different error state

# Reference
1. [Refactor exception handler using factory pattern · raeperd/realworld-springboot-kotlin@b08af62](https://github.com/raeperd/realworld-springboot-kotlin/commit/b08af624c44f53e5de7ae5415365ad6795b87a86)
2. [#65 Refactor JWT Filter with HandlerInterceptor · raeperd/realworld-springboot-kotlin@cffbe6d](https://github.com/raeperd/realworld-springboot-kotlin/commit/cffbe6d247664e3c1057fd5f6740a04f5a75336b)