---
title: SQL Basic Part 1
date: 2020-09-25
tags: [database]
showToc: true
---

# Motivation
SQL 문법의 아주 기본적인 것부터 정리해두면 쓸 일이 많을 것 같아 정리를 시작하게 됨

# Contents

## SQL's Persistence
* Over 40 years old!
* Questioned repeatedly
	* 90’s: Object-Oriented DBMS (OQL, etc.)
	* 2000’s: XML (Xquery, Xpath, XSLT)
	* 2010’s: NoSQL & MapReduce
* SQL keeps re-emerging as the standard
	* Even Hadoop, Spark etc. mostly used via SQL
	* May not be perfect, but it is useful
## SQL Pros and Cons
* Declarative!
	* Say *what* you want, not *how* to get it
* Implemented widely
	* With varying levels of efficiency, completeness
* Constrained
	* Not targeted at Turing-complete tasks
* General-purpose and feature-rich
	* many years of added featuresextensible: callouts to other languages, data sources
> SQL is not targeted to be turing-complete programming language## Relational Terminology  
* Database: Set of named Relations
* Relation (Table):
	* Schema: description ("metadata")
	* Instance: set of data satisfying the schema
* Attribute (Column, Field)
* Tuple (Record, Row)
## Relational Tables
* Schema is fixed:
	* Unique attribute name
	* Atomic types (Not collections)
* Instance can changes often
	* a multiset of "rows"
## SQL Language
* Two sublanguages:
	* DDL - Data Definition Language
		* Define and modify schema
	* DML - Data Manipulation Language
		* Queries can be written intuitively
* RDBMS responsible for efficient evaluation
	* Choose and run algorithms for declarative queries
		* Choice of algorithm must not affect query answer

| sid | sname | rating | age |
|---|---|---|---|
| 1 | Fred | 7 | 22 |
| 2 | Jim | 2 | 39  |
| 3 | Nancy | 8 | 27 |


```sql
CREATE TABLE Sailors (
	sid INTEGER,   
	sname CHAR(20), 
	rating INTEGER, 
	age FLOAT
PRIMARY KEY (sid));
```

## Primary Key column(s)
* Provides a unique “lookup key” for the relation
* Cannot have any duplicate values
* Can be made up of >1 column


```sql
CREATE TABLE Sailors (
	sid INTEGER,   
	sname CHAR(20), 
	rating INTEGER, 
	age FLOAT
CREATE TABLE Boats (
	bid INTEGER,     	
	bname CHAR (20), 
	color CHAR(10), 
	PRIMARY KEY (bid));
CREATE TABLE Reserves (
	sid INTEGER,      
	bid INTEGER, 
	day DATE, 
PRIMARY KEY (sid, bid, day),
FOREIGN KEY (sid) REFERENCES Sailors,
FOREIGN KEY (bid) REFERENCES Boats);
```

Foreign key column by definition primary key of other table
## Basic Single-Table Queries
* **SELECT [*DISTINCT*] **FROM **[WHERE **]**
* Simplest version is straightforward
	* Produce all tuples in the table that satisfy the predicate
	* Output the expressions in the SELECT list
	* Expression can be a column reference, or an arithmetic expression over column refs
## SELCECT DISTINCT
* **SELECT DISTINCT** S.name, S.gpa **FROM** students S **WHERE** S.dept = 'CS'
* DISTINCT specifies removal of duplicate rows before output
* Can refer to the students table as “S”, this is called an alias

## ORDER BY
```sql
SELECT S.name, S.gpa, S.age*2 
AS a2FROM Students S
WHERE S.dept = 'CS'
ORDER BY S.gpa, S.name, a2;
```
* ORDER BY clause specifies output to be sorted
	* ***Lexicographic ordering***
* Obviously must refer to columns in the output
	* Note the AS clause for naming output columns!

```sql
SELECT  S.name, S.gpa, S.age*2 AS a2
FROM Students S
WHERE S.dept = 'CS'
ORDER BY S.gpa DESC, S.name ASC, a2
```
* Ascending order by default, but can be overridden
	* DESC flag for descending, ASC for ascending
	* Can mix and match, lexicographically
## LIMIT
```sql
SELECT  S.name, S.gpa, S.age*2 AS a2
FROM Students S
WHERE S.dept = 'CS'
ORDER BY S.gpa DESC, S.name ASC, a2;
LIMIT 3 ;
```
* Only produces the first  output rows
* Typically used with ORDER BY
	* Otherwise the output is ***non-deterministic***
	* Not a “pure” declarative construct in that case – output set depends on algorithm for query processing

## Aggregates
```sql
SELECT [DISTINCT] AVG(S.gpa)
FROM Students S
WHERE S.dept = 'CS'
```
* Before producing output, compute a summary (a.k.a. an aggregate) of some arithmetic expression
* Produces 1 row of output
	* with one column in this case
* Other aggregates: SUM, COUNT, MAX, MIN

## GROUP BY
```sql
SELECT [DISTINCT] AVG(S.gpa), S.dept
FROM Students S
GROUP BY S.dept
```
* Partition table into groups with same GROUP BY column values
	* Can group by a list of columns
* Produce an aggregate result per group
	* Cardinality of output = # of distinct group values
* Note: can put grouping columns in SELECT list

## HAVING
```sql
SELECT [DISTINCT] AVG(S.gpa), S.dept
FROM Students S
GROUP BY S.dept
HAVING COUNT(*) > 2
```
* The HAVING predicate filters groups
* HAVING is applied after grouping and aggregation
	* Hence can contain anything that could go in the SELECT list
	* I.e. aggs or GROUP BY columns
* HAVING can only be used in aggregate queries
* It’s an optional clause

## Putting it all together
```sql
SELECT S.dept, AVG(S.gpa), COUNT(*)
FROM Students S
WHERE S.gender = 'F'
GROUP BY S.dept 
HAVING COUNT(*) >= 2
ORDER BY S.dept;
```

1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. AVG
7. COUNT
8. ORDER BY
## DISTINCT Aggregates
Are these the same or different?
```sql
SELECT COUNT(DISTINCT S.name)
FROM Students S
WHERE S.dept = 'CS';
```
Remove duplicated name first, and then count
```sql
SELECT DISTINCT COUNT(S.name)
FROM Students S
WHERE S.dept = 'CS';
```
DISTINCT has no effect

## illegal query
```sql
SELECT S.name, AVG(S.gpa)
FROM Students S
GROUP BY S.dept;
```

# SQL DML: General Single-Table Queries
```sql
SELECT [DISTINCT] <column expression list>
FROM <single table>
[WHERE <predicate>]
[GROUP BY <column list>
[HAVING <predicate>] ]
[ORDER BY <column list>]
[LIMIT <integer>];
```
* Relational model has **well-defined query semantics**
* Modern SQL extends “pure” relational model
	* *(some extra goodies for duplicate row, non-atomic types… more in next lecture)*
* Typically, many ways to write a query
	* DBMS figures out a fast way to execute a query, regardless of how it is written.

# Reference
1. [SQL 1 Clip 1 - YouTube](https://www.youtube.com/watch?v=8Uxt9scWJBY&list=PLzzVuDSjP25R1px8yE4wJcXcRbwsCuunP)