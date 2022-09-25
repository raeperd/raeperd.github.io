---
title: Cleaning up database tables after each integration test method with Spring Boot 2 and Kotlin
tags: [ spring, database, kotlin, jpa ]
date: 2022-06-20
---

``` kotlin
import org.springframework.beans.factory.InitializingBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityManager
import javax.persistence.Table
import javax.persistence.metamodel.Metamodel
import kotlin.reflect.full.findAnnotation

/**
 * Test utility service that allows to truncate all tables in the test database.
 * Inspired by: http://www.greggbolinger.com/truncate-all-tables-in-spring-boot-jpa-app/
 * @author Sebastien Dubois
 */
@Service
@Profile("test")
class DatabaseCleanupService @Autowired constructor(private val entityManager: EntityManager) : InitializingBean {
    private lateinit var tableNames: List<String>

    /**
     * Uses the JPA metamodel to find all managed types then try to get the [Table] annotation's from each (if present) to discover the table name.
     * If the [Table] annotation is not defined then we skip that entity (oops :p)
     */
    override fun afterPropertiesSet() {
        val metaModel: Metamodel = entityManager.metamodel
        tableNames = metaModel.managedTypes
            .filter {
                it.javaType.kotlin.findAnnotation<Table>() != null
            }
            .map {
                val tableAnnotation: Table? = it.javaType.kotlin.findAnnotation()
                tableAnnotation?.name ?: throw IllegalStateException("should never get here")
            }
    }

    /**
     * Utility method that truncates all identified tables
     */
    @Transactional
    fun truncate() {
        entityManager.flush()
        entityManager.createNativeQuery("SET REFERENTIAL_INTEGRITY FALSE").executeUpdate()
        tableNames.forEach { tableName ->
            entityManager.createNativeQuery("TRUNCATE TABLE " + tableName).executeUpdate()
        }
        entityManager.createNativeQuery("SET REFERENTIAL_INTEGRITY TRUE").executeUpdate()
    }
} 
```

``` kotlin
...

import mu.KotlinLogging
import org.junit.jupiter.api.AfterEach
import org.springframework.beans.factory.annotation.Autowired

private val logger = KotlinLogging.logger {} // static and uses the unit name

/**
 * Makes sure that the test DB is cleaned up after each test
 * @author Sebastien Dubois
 */
open class AbstractIntegrationTest : AbstractTest() {
    @field:Autowired
    private lateinit
    var truncateDatabaseService: DatabaseCleanupService

    // TODO add @BeforeEach, BeforeClass, After... and a parameter (enum) to define if and when to perform the cleanup

    /**
     * Cleans up the test database after each test method.
     */
    @AfterEach
    fun cleanupAfterEach() {
        logger.info { "Cleanup up the test database" }
        truncateDatabaseService.truncate()
    }
} 
```

# Reference
1. [Cleaning up database tables after each integration test method with Spring Boot 2 and Kotlin | by Sébastien Dubois. | Medium](https://dsebastien.medium.com/cleaning-up-database-tables-after-each-integration-test-method-with-spring-boot-2-and-kotlin-7279abcdd5cc)