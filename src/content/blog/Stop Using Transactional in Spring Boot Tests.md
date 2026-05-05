---
title: Stop Using Transactional in Spring Boot Tests
description: Clean the database instead of hiding integration test bugs behind rollback
date: June 20, 2022
---

`@Transactional` makes Spring Boot integration tests convenient. It can also make them lie.

I stopped using it for controller and API-level integration tests because it changes the transaction boundary. The test passes inside a transaction that does not exist in the same shape when the application handles a real request.

That difference is enough to hide bugs.

## The problem

A common Spring Boot test looks like this:

```kotlin
@SpringBootTest
@Transactional
class ArticleFavoriteIntegrationTest {
    // tests
}
```

It is convenient because Spring rolls back the database after each test. The database stays clean without extra code.

But the test now runs with a transaction owned by the test, not by the application flow. That can change behavior in ways that matter:

- Lazy loading can work in tests and fail in the real application.
- Entities can be saved automatically through dirty checking even when production code misses an explicit save.
- Database state disappears after rollback, which makes failed tests harder to debug.
- The test no longer represents the transaction scope of a real HTTP request.

The result is worse than a failing test. It is a passing test that gives false confidence.

## Prefer real transaction boundaries

For integration tests, I want the application to own the transaction boundary.

The test should:

1. send a request or call the application entry point,
2. let production code open and close transactions,
3. assert the result,
4. clean the database after the test.

That makes the test slower than rollback-based tests, but more honest.

## Clean the database after each test

Instead of relying on `@Transactional`, use a JUnit extension that truncates tables after each test.

```kotlin
class JpaDatabaseCleanerExtension : AfterEachCallback {
    private lateinit var tableNames: List<String>

    override fun afterEach(context: ExtensionContext?) {
        if (context == null) {
            throw IllegalStateException("No extension context found")
        }

        val applicationContext = SpringExtension.getApplicationContext(context)

        if (!this::tableNames.isInitialized) {
            tableNames = applicationContext
                .getBean(EntityManager::class.java)
                .metamodel
                .managedTypes
                .mapNotNull { it.javaType.kotlin.findAnnotation<Table>() }
                .map { it.name }
        }

        applicationContext.getBean(DataSource::class.java).connection.use { connection ->
            connection.prepareStatement("SET REFERENTIAL_INTEGRITY FALSE").executeUpdate()
            tableNames.forEach { tableName ->
                connection.prepareStatement("TRUNCATE TABLE $tableName").executeUpdate()
            }
            connection.prepareStatement("SET REFERENTIAL_INTEGRITY TRUE").executeUpdate()
        }
    }
}
```

Use it at the test class level:

```kotlin
@ExtendWith(JpaDatabaseCleanerExtension::class)
@AutoConfigureMockMvc
@SpringBootTest
class ArticleFavoriteIntegrationTest(
    @Autowired private val mockMvc: MockMvc,
) {
    @Test
    fun `unfavorite article`() {
        // create user, login, create article, and favorite article first

        mockMvc.perform(
            delete("/articles/{slug}/favorite", "how-to-train-your-dragon")
                .header("Authorization", "Token $token")
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("article.favorited").value(false))
    }
}
```

The test should go through the same HTTP boundary as production code. It should not call repository methods to make the assertion easier.

The Java RealWorld project had this shape. The integration test logged in, created an article, favorited it through the API, then unfavorited it through the API:

```java
@Order(12)
@Test
void post_favorite_article() throws Exception {
    mockMvc.perform(post("/articles/{slug}/favorite", "how-to-train-your-dragon")
            .header(AUTHORIZATION, "Token " + token))
            .andExpect(status().isOk())
            .andExpect(validSingleArticleModel());
}

@Order(14)
@Test
void unfavorite_article() throws Exception {
    mockMvc.perform(delete("/articles/{slug}/favorite", "how-to-train-your-dragon")
            .header(AUTHORIZATION, "Token " + token))
            .andExpect(status().isOk())
            .andExpect(validSingleArticleModel())
            .andExpect(jsonPath("article.favorited", is(false)));
}
```

That is the important part: the test sends real requests and lets the application service own the transaction. The cleaner extension makes the next test start from an empty database without wrapping the current test in a transaction.

## PostgreSQL version

For PostgreSQL, I usually load table names from database metadata and truncate them in one statement.

```kotlin
class PostgresDbCleanerExtension : BeforeEachCallback {
    companion object {
        private val TABLES_TO_IGNORE = listOf(
            TableData("databasechangelog"),
            TableData("databasechangeloglock"),
        )
    }

    override fun beforeEach(context: ExtensionContext) {
        val dataSource = SpringExtension
            .getApplicationContext(context)
            .getBean(DataSource::class.java)

        dataSource.connection.use { connection ->
            connection.autoCommit = false

            val tables = loadTablesToClean(connection)
            if (tables.isNotEmpty()) {
                val tableNames = tables.joinToString(", ") { it.fullyQualifiedTableName }
                connection.prepareStatement("TRUNCATE $tableNames RESTART IDENTITY CASCADE").execute()
            }

            connection.commit()
        }
    }

    private fun loadTablesToClean(connection: Connection): List<TableData> {
        val resultSet = connection.metaData.getTables(
            connection.catalog,
            null,
            null,
            arrayOf("TABLE"),
        )

        val tables = mutableListOf<TableData>()
        while (resultSet.next()) {
            val table = TableData(
                schema = resultSet.getString("TABLE_SCHEM"),
                name = resultSet.getString("TABLE_NAME"),
            )

            if (table !in TABLES_TO_IGNORE) {
                tables += table
            }
        }

        return tables
    }

    data class TableData(
        val name: String,
        val schema: String? = "public",
    ) {
        val fullyQualifiedTableName = if (schema != null) "$schema.$name" else name
    }
}
```

The important part is not the exact implementation. The important part is the rule: clean data explicitly, but do not change the application transaction boundary to make cleanup easier.

## Tradeoffs

Database cleanup is not free.

It can be slower than rollback. It also needs care around foreign keys, migration tables, seed data, and parallel tests.

But those are visible problems. You can measure and fix them.

A hidden transaction boundary is worse because it changes what the test means.

## My rule

Use `@Transactional` for repository-level tests when the transaction itself is not what I am testing.

Avoid it for API-level integration tests.

For those tests, let the application behave like production, then clean the database directly.

## See also

- [realworld-springboot-java](https://github.com/raeperd/realworld-springboot-java) — the RealWorld Spring Boot implementation that shaped this testing style.
- [Favorite Article issue](https://github.com/raeperd/realworld-springboot-java/issues/26) and [Unfavorite Article issue](https://github.com/raeperd/realworld-springboot-java/issues/27) — the API flow behind the article favorite example.

## References

- [Don’t Use @Transactional in Tests](https://dev.to/henrykeys/don-t-use-transactional-in-tests-40eb)
- [Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html)
- [Original issue from realworld-springboot-kotlin](https://github.com/raeperd/realworld-springboot-kotlin/issues/33)
