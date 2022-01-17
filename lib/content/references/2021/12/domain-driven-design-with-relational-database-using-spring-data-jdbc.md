---
title: Domain Driven Design with Relational Database Using Spring Data JDBC
tags: [ database ]
date: 2021-12-08
---

# Domain Driven Design with Relational Database Using Spring Data JDBC

## The ORM Disaster

## Mapping 
- Entity <-> Table
- Property <-> Column 
- Reference <-> Foreign key ?? 

## Lazy Loading 
- For effective reference to foreign key 
- Load only when its is needed
- Distance between codes and actual SQL query 
	- Accessing member variable vs Query SELECT

## Eager Loading 
- Everything is now on our memory
- Out of memory ... 

- JPA gives us choices between lazy loading and eager loading 
- Can achieve pros for both?, but maybe cons for both

## Optimistic Locking

## Integration Tests
- Data initialization for integration tests quite cumbersome
- DDD for rescue

## Persisting / Deleting 
- By not using reference it becomes easy


![](https://i.imgur.com/hGYTF6p.png)

```java
public class Brick {
	@Id 
	Long id;
	prviate String description; 
	
	Brick(String description) {
		this.description = description
	}
}
```

```java
public class LegoModel {
	@Id
	private Long id;
	private String name;
	private List<Manual> manuals = new ArrayList<>();
	
	/* maps the id of a brick to number of pieces contained */
	private Set<BrickContents> content = new HashSet<>();
	
	public LegoModel(String name) {
		this.name = name
	}
	
	public void add(Brick brick, Integer amount) {
		val brickId = brick.Id; // extract id
		content.add(new BrickContentItem(brickId, amount))
	}
}
```

```java
public class Manual {
	String language;
	String content;
	
	public Manual(String language, String content) {
		this.language = language;
		this.content = content;
	}
}

```

```java
@Table("Content")
public class BrickContentItem {
	final Long brickId;
	final Integer amount;
	
	public BrickContentItem(Long brickId, Integer amount) {
		this.brickId = brickId;
		this.amount = amount;
	}
}
```



# Reference
1. [Domain-Driven Design with Relational Databases Using Spring Data JDBC - YouTube](https://www.youtube.com/watch?v=GOSW911Ox6s&t=556s)
2. [Spring Data JDBC, References, and Aggregates](https://spring.io/blog/2018/09/24/spring-data-jdbc-references-and-aggregates)
