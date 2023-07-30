---
title: How To Clean Up Database Tables After Each Integration Test
date: 2022-06-20
tags: [spring, jpa, test, kotlin]
description: "@Transactional 을 테스트 코드에 추가하면 테스트가 하나의 persistence context 에 속하도록 정의할 수 있다. 테스트가 Deterministic 하고 독립적임을 보장할 수 있을 것이라고 착각했는데, 발견하기 어려운 버그를 최근에 확인했다."
---

Spring Boot와 Spring Data JPA를 사용하는 환경에서 Deterministic test를 작성하기 위해 `@Transactinoal` 어노테이션을 작성하곤 했었다. `@Transactional` 을 테스트 코드에 추가하면 테스트가 하나의 persistence context 에 속하도록 정의할 수 있다. 그래서 테스트 코드에서 데이터베이스를 초기화하는 코드를 추가로 작성하지 않고도 각 테스트가 Deterministic 하고 독립적임을 보장할 수 있을 것이라고 착각했는데, 발견하기 어려운 버그를 최근에 확인했다.

## TL;DR

- Deterministic 한 테스트를 위해 모든 통합 테스트에서는 데이터베이스를 초기화 할 필요가 있다.
- **`@Transactional` 을 테스트 코드에 작성하면 어플리케이션의 persistence context로 인해 생기는 여러가지 버그를 테스트 코드에서 확인할 수 없다. (auto-commit, lazy loading exception 등)**
- junit의 Callback을 구현해서 각각의 테스트 이후에 데이터베이스를 초기화 하는 것이 더 concise 하고 reliable 한 방법이다.

## The Problem

이전에 개발했던 [사이드 프로젝트](https://github.com/raeperd/realworld-springboot-kotlin)에서 탄탄한 통합 테스트와 함께 프로젝트를 모두 완성시키고 프로젝트를 릴리즈 한 뒤에 실제 서비스 환경에서 너무도 기본적인 기능이 동작하지 않는 것을 확인한 적이 있다. 너무도 기본적인 유즈케이스라 테스트를 분명히 작성했고, CI 과정에서 모든 테스트를 통과함에도 발견된 버그였기 때문에 처음에는 배포된 환경에 문제가 있는 것이 아닌가 싶었다. 그런데 그 버그는 로컬에서도 너무나 쉽게 재현이 되었다. 나는 분명 테스트를 작성했고, 지금도 그 테스트는 통과했기 때문에 심지어 Postman을 의심하기까지 했다.

버그의 원인은 어플리케이션의 persistence context를 잘못 설정했기 때문에 발생한 lazy loading exception 이였고, 테스트 환경에서 사용한 `@Transactional` annotation이 버그를 발견하는 것을 어렵게 했다. spring boot 의 test code 작성 환경은 너무나 직관적이고 기대한 대로 동작했기 때문에 `@Transactional` 또한 암묵적으로 내가 의도한 바대로 동작하기를 기대했던 것 같다. 내 의도는 테스트 전후로 데이터베이스를 초기화 하는 것이었지만, 이 `@Transactional`은 더 많은 것을 하고 있었다.

원인은 대략 아래와 같은 코드다. 문제를 재현하는 전체 코드는 [레포지토리](https://github.com/raeperd/avoid-transactional-in-test)에서 아무런 설정없이, `./gradlew test` 만으로 확인할 수 있다. 예제 코드는 모두 kotlin 으로 작성되어 있고, **spring boot 의 Open Session in view option 은 false 인 상태로 구현되어 있다.**

### Application code

```kotlin
@Entity
@Table(name = "users")
class User(
    val name: String,
    @OneToMany(fetch = LAZY, cascade = [ALL], orphanRemoval = true)
    val articles: MutableList<Article> = mutableListOf(),
) {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    val id: Long = 0
}

@Entity
@Table(name = "articles")
class Article(
    @Column val title: String,
    @Column val contents: String
) {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private val id: Long = 0
}

@Repository
interface UserRepository : JpaRepository<User, Long>
```

- 단순한 JPA entity 로 user와 article 이 1:N relation을 가지고 있다.

```kotlin
@RestController
class RestController(
    private val repository: UserRepository
) {
    @PostMapping("/users")
    fun postUsers(@RequestBody request: UserCreateRequest):
        ResponseEntity<UserDTO> {
        return ResponseEntity.status(201)
            .body(repository.save(User(request.name))
            .toDTO())
    }

    @GetMapping("/users/{id}")
    fun getUsers(@PathVariable id: Long):
        ResponseEntity<UserDTO> {
        return ResponseEntity.ofNullable(
            repository.findByIdOrNull(id)?.toDTO()
        )
    }

    @PostMapping("/users/{id}/articles")
    fun postArticles(@PathVariable id: Long,
                     @RequestBody request: ArticleCreateRequest)
        : ResponseEntity<ArticleDTO> {
        val user = repository.findByIdOrNull(id)
            ?: return ResponseEntity.notFound().build()
        val article = Article(request.title, request.contents)
        if (user.articles.add(article)) {
            return ResponseEntity.status(201).body(article.toDTO())
        }
        // userRepository.save(user)
        return ResponseEntity.badRequest().build()
    }

}
```

위 `RestController` 가 이전에 내가 작성한 코드의 오류를 포함하고 있는데, `postArticles` 함수에서 user.articles 를 업데이트 하고, 이를 저장하지 않는 문제가 있다. 이를 보통 `@Transactional` annotation 으로 처리하거나, 함수의 끝에서 explicit 하게 `repository.save(user)` 를 호출하는 방식으로 해결할 수 있다. 문제를 재현하기 위해 우선은 버그가 있는 대로 테스트 코드를 아래와 같이 작성한다.

### Test code

```kotlin
@Transactional // this line is problem
@AutoConfigureMockMvc
@SpringBootTest
class RestControllerTest(
    @Autowired private val mockMvc: MockMvc,
    @Autowired private val mapper: ObjectMapper
) {
    @Test
    fun `when post article expect to get from user`() {
        var user = mockMvc.post("/users") {
            contentType = MediaType.APPLICATION_JSON
            content = mapper.writeValueAsBytes(UserCreateRequest("test-user"))
        }.andExpect { status { isCreated() } }
            .andReturn().toJSON<UserDTO>()

        // this should be failed with LazyInitializationException
        val article = mockMvc.post("/users/{id}/articles", user.id) {
            contentType = MediaType.APPLICATION_JSON
            content = mapper.writeValueAsBytes(
                ArticleCreateRequest("test-title", "test-contents"))
        }.andExpect { status { isCreated() } }
            .andReturn().toJSON<ArticleDTO>()

        user = mockMvc.get("/users/{id}", user.id)
            .andExpect { status { isOk() } }
            .andReturn().toJSON()

        assertThat(user.articles).contains(article)
    }

    private inline fun <reified T> MvcResult.toJSON(): T {
        return mapper.readValue(response.contentAsString, T::class.java)
    }
}
```

- 주석에서 설명한 부분에서 오류가 발생되어야 하지만, 테스트 코드는 정상적으로 동작하고 통과한다. 테스트코드에서는 `mockMvc` 를 통해 어플리케이션의 외부에서만 어플리케이션의 동작을 확인한 것 처럼 보이지만 실상은 그렇지 않다.
- test class 에 있는 `@Transactional` annotation 으로 인해 `RestController` 에서 commit 하지 않는 user 인스턴스에 대한 변경사항이 auto-commit 되고, 테스트 케이스가 통과하게 된다.

**즉 어플리케이션에는 영속성과 관련된 버그가 있지만, 테스트 코드에서는 이를 잡아내지 못한다.** 이런경우, 버그는 어플리케이션 코드에만 있는 것이 아니라, 테스트 코드에도 있다고 생각해야 한다. TDD의 방식으로 **이 문제를 해결하기 위해서는 먼저, 어플리케이션의 버그를 탐지할 수 있는 테스트 코드를 작성하고, 이후에 어플리케이션 코드를 수정하는 것이 바람직하다.** 이는 이 [PR을](https://github.com/raeperd/avoid-transactional-in-test/pull/1) 통해 확인할 수 있다.

## Solution

결국엔 테스트도 수정했고 어플리케이션 코드도 수정해 배포를 할 수 있었지만, 사실 근본적인 문제는 해결되지 않았다. 위의 테스트 코드는 테스트가 끝난 뒤에도 user 인스턴스와 article 인스턴스가 데이터베이스에 저장되어 있어 다른 테스트에 영향을 줄 가능성이 있다. 결국 전체 테스트를 Deterministic 하게 유지하기 위해서는 직접 데이터베이스 초기화 작업을 구현하는 것이 최선이다. 관련된 라이브러리가 있을법도 한데 아직 찾지는 못했지만, [Junit 의 Callback 을 이용한 구현](https://www.youtube.com/watch?v=lfHG9qnSvpQ)을 찾아서 이를 JPA 버전으로 수정해 구현해보았다.

```kotlin
class JpaDatabaseCleanCallback : AfterEachCallback {

    private lateinit var tableNames: List<String>

    override fun afterEach(context: ExtensionContext?) {
        if (context == null) {
            throw IllegalStateException("No extension context found")
        }
        if (!this::tableNames.isInitialized) {
            SpringExtension.getApplicationContext(context)
                .getBean(EntityManager::class.java)
                .also { entityManager -> entityManager.initTableNames() }
        }
        SpringExtension.getApplicationContext(context).getBean(DataSource::class.java)
            .also { dataSource ->
                dataSource.connection.use { connection ->
                    connection.prepareStatement("SET REFERENTIAL_INTEGRITY FALSE")
                              .executeUpdate()
                    tableNames.forEach {
                        name -> connection.prepareStatement("TRUNCATE TABLE $name")
                                          .executeUpdate() }
                    connection.prepareStatement("SET REFERENTIAL_INTEGRITY TRUE")
                              .executeUpdate()
                }
            }
    }

    private fun EntityManager.initTableNames() {
        tableNames = metamodel.managedTypes
            .mapNotNull { it.javaType.kotlin.findAnnotation<Table>() }
            .map { table -> table.name }
    }
}
```

- `org.junit.jupiter.api.extension.AfterEachCallback` 인터페이스를 구현
- `SET REFERENTIAL_INTEGRITY FALSE` 를 이용해 성능을 개선.
- 실제 개선 코드에서의 수정은 [이 PR을 확인](https://github.com/raeperd/realworld-springboot-kotlin/pull/39/files#diff-e34d06f7f724ee69716e5465e5822e70c0f543045ad0ec148485f84265e2aae5)

### Usage

```kotlin
@ExtendWith(JpaDatabaseCleanerExtension::class)
@AutoConfigureMockMvc
@SpringBootTest
class RestControllerTest(
    @Autowired private val mockMvc: MockMvc,
    @Autowired private val mapper: ObjectMapper
) {

	// testcodes ...
}
```

- Use `@ExtendWith` in class level

EntityManager 를 이용하기 때문에, `@SpringBootTest` 혹은 `@DataJpaTest` annotation과 함께 사용하기는 해야하지만 사실 큰 제약은 아니라고 생각한다. 단순한 SQL 을 이용하는 경우는 [이 youtube 영상](https://www.youtube.com/watch?v=lfHG9qnSvpQ)을 참고하면 되고, java version은 이 아티클에 큰 영감을 준 [이 블로그 글](https://dev.to/henrykeys/don-t-use-transactional-in-tests-40eb)을 확인해보면 된다. 비슷한 방법으로 어노테이션을 이용해 구현할 수 있는데, 이 버전이 더 깔끔하고 좋은 코드라고 생각한다.

- [Cleaning up database tables after each integration test method with Spring Boot 2 and Kotlin | by Sébastien Dubois. | Medium](https://dsebastien.medium.com/cleaning-up-database-tables-after-each-integration-test-method-with-spring-boot-2-and-kotlin-7279abcdd5cc)

## Conclusion

[Deterministic test는 중요하다.](https://martinfowler.com/articles/nonDeterminism.html) 서비스가 개발자가 의도한 대로 동작하는지 확인하는 테스트는 그 자체로 중요하고 필요하지만 잘못 작성된 테스트는 오히려 발견하기 어려운 새로운 버그를 만들어 낼 수 있다. **특히 `@Transactional` 을 테스트코드에 사용하면 이런 찾기 어려운 버그를 만들 수 있기 때문에 사용을 지양해야 한다.**

## Reference

1. [Don’t Use @Transactional in Tests - DEV Community](https://dev.to/henrykeys/don-t-use-transactional-in-tests-40eb)
2. [How To Clean Your Database Between JUnit 5 Tests With Spring Boot | Kotlin Tutorial - YouTube](https://www.youtube.com/watch?v=lfHG9qnSvpQ)
3. [Cleaning up database tables after each integration test method with Spring Boot 2 and Kotlin | by Sébastien Dubois. | Medium](https://dsebastien.medium.com/cleaning-up-database-tables-after-each-integration-test-method-with-spring-boot-2-and-kotlin-7279abcdd5cc)
4. [Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html)
5. [Test case is not represents real applications transaction scope · Issue #33 · raeperd/realworld-springboot-kotlin](https://github.com/raeperd/realworld-springboot-kotlin/issues/33)
6. [raeperd/avoid-transactional-in-test: You should avoid @Transactional in test. This repo proves that.](https://github.com/raeperd/avoid-transactional-in-test)
