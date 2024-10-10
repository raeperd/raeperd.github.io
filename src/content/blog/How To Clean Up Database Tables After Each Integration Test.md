---
title: How To Clean Up Database Tables After Each Integration Test
description: in springboot kotlin
date: June 20, 2022
---

- Database has to be cleaned after each integration test so that every test is independent each other 
- Sometimes [Test case is not represents real applications transaction scope](https://github.com/raeperd/realworld-springboot-kotlin/issues/33)
- Clean up database manually after each test is more concise and reliable 

# Solution
## Implementation
``` kotlin
 class JpaDatabaseCleanerExtension : AfterEachCallback {

    private lateinit var tableNames: List<String>

    override fun afterEach(context: ExtensionContext?) {
        if (context == null) {
            throw IllegalStateException("No extension context found")
        }
        if (!this::tableNames.isInitialized) {
            SpringExtension.getApplicationContext(context).getBean(EntityManager::class.java)
                .also { entityManager -> entityManager.initTableNames() }
        }
        SpringExtension.getApplicationContext(context).getBean(DataSource::class.java)
            .also { dataSource ->
                dataSource.connection.use { connection ->
                    connection.prepareStatement("SET REFERENTIAL_INTEGRITY FALSE").executeUpdate()
                    tableNames.forEach { name -> connection.prepareStatement("TRUNCATE TABLE $name").executeUpdate() }
                    connection.prepareStatement("SET REFERENTIAL_INTEGRITY TRUE").executeUpdate()
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
- Using junit `AfterEachCallback` interface
- `SET REFERENTIAL_INTEGRITY FALSE` for better performance
- Get table names using Spring application context's `EntityManager` and `@Table` annotations 
- [Bugfix/#33 test transaction by raeperd · Pull Request #39 · raeperd/realworld-springboot-kotlin](https://github.com/raeperd/realworld-springboot-kotlin/pull/39/files#diff-e34d06f7f724ee69716e5465e5822e70c0f543045ad0ec148485f84265e2aae5)

## Usage
``` kotlin
@ExtendWith(JpaDatabaseCleanerExtension::class)
@AutoConfigureMockMvc
@SpringBootTest
class ArticleFavoriteIntegrationTest(
    @Autowired private val mockMvc: MockMvc,
) {
    @Test
    fun `when post get delete articles favorite expect return valid response`() {
	    // testcodes
    }
}
```
- Just need to use `@ExtendWith` in class level
- This is much cleaner than [implementing DatabaseCleanupService, and then inject dependency](Cleaning%20up%20database%20tables%20after%20each%20integration%20test%20method%20with%20Spring%20Boot%202%20and%20Kotlin.md) 

# Reference
1. [Do not use transactional in tests](Do%20not%20Use%20Transactional%20in%20Tests.md)
2. [Cleaning up database tables after each integration test method with spring boot 2 and kotlin](Cleaning%20up%20database%20tables%20after%20each%20integration%20test%20method%20with%20Spring%20Boot%202%20and%20Kotlin.md)
3. [Test case is not represents real applications transaction scope · Issue #33 · raeperd/realworld-springboot-kotlin](https://github.com/raeperd/realworld-springboot-kotlin/issues/33)
4. [How To Clean Your Database Between JUnit 5 Tests With Spring Boot | Kotlin Tutorial - YouTube](https://www.youtube.com/watch?v=lfHG9qnSvpQ)
