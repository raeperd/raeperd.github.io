---
title: SQL Basic Part 2
date: 2020-09-25
tags: [database]
showToc: true
---

[SQL II 1 4](https://www.youtube.com/watch?v=YWBJMGibSbs&list=PLzzVuDSjP25QapEtTMxw56ZtKRf62lkL_&ab_channel=CS186Berkeley)

# Contents

## Conceptual SQL Evaluation

1. FROM
2. WHERE
3. SELECT
4. GROUP BY
5. HAVING
6. DISTINCT
7. (ORDER BY)
8. (LIMIT)

## Putting it all together

```sql
SELECT S.dept, AVG(S.gpa), COUNT(*)
FROM Students S
WHERE S.gender = 'F'
GROUP BY S.dept 
HAVING COUNT(*) >= 2
ORDER BY S.dept;
```

이제까지는 하나의 테이블에서만 했는데 여러 테이블에 대한 쿼리를 할 수도 있다.

## Join Queries

```sql
SELECT [DISTINCT] <column expression list>
FROM <table1 [AS t1], ... , tableN [AS tn]>
[WHERE <predicate>]
[GROUP BY <column list>[HAVING <predicate>] ]
[ORDER BY <column list>];
```

* Likely a terribly inefficient startegy
* Query optimizer will find more efficient plans

## Cross(Cartesian) Product

* All pairs of tuples, concatenated

```sql
SELECT S.sid
FROM Sailors AS S, Reserves AS R
WHERE S.sid=R.sid;

SELECT x.sname, x.age, 
	y.sname AS sname2, 
	y.age AS age2
FROM Sailors AS x, Sailors AS y
WHERE x.age > y.age;
```

## String Comparisons

### Old school SQL

```sql
SELECT S.sname
FROM   Sailors S
WHERE  S.sname LIKE 'B_%’;
```

### Standard Regular Expressions

```sql
SELECT S.sname
FROM   Sailors S
WHERE  S.sname ~ 'B.*’;
```

## Compining Predicates

```sql
SELECT R.sid
FROM   Boats B, Reserves R
WHERE  R.bid=B.bid AND
(B.color='red' OR B.color='green');
```

### Order matters

```sql
SELECT R.sid
FROM Boats B,Reserves R
WHERE R.bid=B.bid AND 
(B.color='red’ AND B.color='green');
```

```sql
SELECT R.sid
FROM Boats B, Reserves R
WHERE R.bid=B.bid AND B.color='red'
INTERSECT
SELECT R.sid
FROM Boats B, Reserves R
WHERE R.bid=B.bid AND B.color='green';
```

## Set Semantics

* Set: a collection of distinct elements
* Standard ways of manipulating/combining sets
	* Union
	* Intersect
	* Except
* Treat tuples within a relation as elements of a set

## Default: Set Semantics
R = {A, A, A, A, B, B, C, D}S = {A, A, B, B, B, C, E}

* UNION
	* {A, B, C, D, E}
* INTERSECT
	* {A, B, C}
* EXCEPT
	* {D}

## “ALL”: Multiset Semantics
R = {A, A, A, A, B, B, C, D} = {A(4), B(2), C(1), D(1)}

S = {A, A, B, B, B, C, E} = {A(2), B(3), C(1), E(1)}

* UNION ALL: sum of cardinalities
	* {A(4+2), B(2+3), C(1+1), D(1+0), E(0+1)} = {A, A, A, A, A, A, B, B, B, B, B, C, C, D, E}
* INTERSECT ALL: min of cardinalities
	* {A(min(4,2)),B(min(2,3)),C(min(1,1)),D(min(1,0)),E(min(0,1))}= {A, A,B, B,C}
* “EXCEPT ALL”: Multiset Semantics
	* {A(4-2),B(2-3),C(1-1),D(1-0),E(0-1)}= {A, A,D,}

## Nested Queries: IN

### Names of sailors who’ve reserved boat #102:

```sql
SELECT S.sname
FROM   Sailors S
WHERE  S.sid IN 
(SELECT  R.sid
FROM    Reserves R
WHERE   R.bid=102);
```

### Names of sailors who’ve not reserved boat #103:

```sql
SELECT  S.sname
FROM  Sailors S
WHERE  S.sid NOT IN 
(SELECT  R.sid
FROM  Reserves R
WHERE  R.bid=103)
```

## ARGMAX

* Correct or Incorrect?

```sql
SELECT MAX(S.rating)
FROM Sailors S;
```

vs

```sql
SELECT S.*, MAX(S.rating)
FROM Sailors S;
```

* First query doesn't have any information about sailors
* Second query selects all sailors

```sql
SELECT *
FROM   Sailors S
WHERE  S.rating >= ALL 
(SELECT  S2.rating
FROM  Sailors S2)
```

vs

```sql
SELECT *
FROM   Sailors S
WHERE  S.rating = 
(SELECT  MAX(S2.rating)
FROM  Sailors S2)
```

* All sailors that has max ratings ( ≥ 1 )
* First saliors that has max ratings ( = 1 )

## "Inner" Joins: Another Syntax

```sql
SELECT s.*, r.bid
FROM Sailors s, Reserves r
WHERE s.sid = r.sid
AND ...

SELECT s.*, r.bid
FROM Sailors s INNER JOIN Reserves r
ON s.sid = r.sid
WHERE ...
```

## Join Variants

```sql
SELECT <column expression list>
FROM table_name
[INNER | NATURAL
 | {LEFT |RIGHT | FULL } {OUTER}] JOIN table_name
ON <qualification_list>
WHERE …;
```

* INNER is default
* Inner Join what we've learned so far
	* Same thing, just with different syntax

## Inner / Natural Joins

```sql
SELECT s.sid, s.sname, r.bid
FROM Sailors s, Reserves r
WHERE s.sid = r.sid
AND s.age > 20;

SELECT s.sid, s.sname, r.bid
FROM Sailors s INNER JOIN Reserves r
ON s.sid = r.sid
WHERE s.age > 20;

SELECT s.sid, s.sname, r.bid
FROM Sailors s NATURAL JOIN Reserves r
WHERE s.age > 20;
```

* All 3 are equivalent
* "NATURAL" means equal-join for pairs of attributes with the same name
	* **natrual join은 피하는게 좋다.**
	* 컬럼이름이 바뀌거나 할 수 있는데, 그럴때마다 결과가 변할 것이다.

## Outer Join

### Left Outer Join

* Returns all matched rows,
and preserves all unmatched rows from the table on the left
of the join table on the left of the join clause
	* use nulls in field of non-matching tuples

### Right Outer Join

* Returns all matched rows,
and preserves all unmatched rows from the table on the right
of the join clause
	* use nulls in fields of non-matching tuples

### Full Outer Join

* **Returns all (matched or unmatched) rows from the tables on both sides** of the join clause

## Views: Named Queries

```sql
CREATE VIEW view_name AS select_statement;
```

* Makes development simpler
* Often used for security
	* Allow access for speicific columns
* Not “materialized”
	* View is not a snapshot
	* Alias for statements

### Views Instead of Relations in Queries

```sql
CREATE VIEW Redcount
AS SELECT B.bid, COUNT(*) AS scount
FROM Boats2 B, Reserves2 R
WHERE R.bid=B.bid AND B.color='red'
GROUP BY B.bid;

SELECT * from redcount;

SELECT bname, scount
FROM Redcount R, Boats2 B
WHERE R.bid=B.bid
AND scount < 10;
```

### View on the fly

```sql
SELECT  bname, scount
FROM Boats2 B,
(SELECT B.bid, COUNT (*)
FROM Boats2 B, Reserves2 R
WHERE R.bid = B.bid AND B.color = 'red'
GROUP BY B.bid) AS Reds(bid, scount)
WHERE  Reds.bid=B.bid
AND scount < 10
WITH Reds(bid, scount) AS
(SELECT B.bid, COUNT (*)
FROM Boats2 B, Reserves2 R
WHERE R.bid = B.bid AND B.color = 'red'
GROUP BY B.bid)
SELECT bname, scount
FROM Boats2 B, Reds
WHERE Reds.bid=B.bid
AND scount < 10
WITH Reds(bid, scount) AS
(SELECT B.bid, COUNT (*)
FROM Boats2 B, Reserves2 R
WHERE R.bid = B.bid AND B.color = 'red'
GROUP BY B.bid),
UnpopularReds AS
(SELECT bname, scount
FROM Boats2 B, Reds
WHERE Reds.bid=B.bid
AND scount < 10)
SELECT * FROM UnpopularReds;
```

### Argmax using view

```sql
WITH maxratings(age, maxrating) AS
(SELECT age, max(rating) 
FROM Sailors
GROUP BY age)
SELECT S.*
  FROM Sailors S, maxratings m
 WHERE S.age = m.age
   AND S.rating = m.maxrating;
```

## Null values

[SQL 2 58 66](https://www.youtube.com/watch?v=wTdfbRuJbps&list=PLzzVuDSjP25QapEtTMxw56ZtKRf62lkL_&index=12)

### Brief detour: Null values

* Field values are sometimes unknown
	* SQL provides a special value NULL for such situations.
	* Every data type can be NULL
* The presence of null complicates many issues. E.g.:
	* Selection predicates (WHERE)
	* Aggregation
* But NULLs comes naturally from Outer joins

### NULL in the WHERE clause

* Consider tuple where rating is NULL

```sql
INSERT INTO sailors VALUES
(11, 'Jack Sparrow', NULL, 35);
SELECT * FROM sailors 
WHERE rating > 8;
```

* Should db select Jack Sparrow?

### NULL in comparators

* Rule (x op NULL) evaluates to NULL!

### Explicit NULL Checks

```sql
SELECT * FROM sailors WHERE rating IS NULL;
SELECT * FROM sailors WHERE rating IS NOT NULL;
```

### NULL at top of WHERE

* Rule: Do not output a tuple WHERE NULL

```sql
SELECT * FROM sailors;
SELECT * FROM sailors WHERE rating > 8;
SELECT * FROM sailors WHERE rating <= 8;
```

* 아래 두 쿼리의 결과로 나온 row의 수의 합이 처음 쿼리의 갯수와 다를 수도 있다.
* null value 때문에

### NULL in boolean logic
| NOT | T | F | N | 
| --- | --- | --- | --- |
| | F |  T | N | 

| AND | T | F | N | 
| --- | --- | --- | --- | 
| T | T | F | N |
| F | F | F | F |
| N | N | F | N | 

| OR | T | F | N | 
| --- | --- | --- | --- | 
| T | T | T | T |
| F | T | F | N |
| N | T | N | N |

### NULL and Aggregation

```sql
SELECT count(*) FROM sailors;
SELECT count(rating) FROM sailors;
SELECT sum(rating) FROM sailors;
SELECT avg(rating) FROM sailors;
```

* General rule: NULL **column values** are ignored by aggregate functions

### NULLs: Summary

* NULL op NULL is NULL
* WHERE NULL: do not send to output
* Boolean connectives: 3-valued logic
* Aggregates ignore NULL-valued inputs

## Testing SQL Queries

* SQL Fiddle pages we provide in this class will typically help you answer the questions in the worksheets and vitamins.
* But in real life:
	* not every database instance will reveal every bug in your query.
		* Eg: database instance without any rows in it!
	* Need to debug your queries
	* reasoning about them carefully
	* constructing test data.

# Reference
1. [SQL II 1 4 - YouTube](https://www.youtube.com/watch?v=YWBJMGibSbs&list=PLzzVuDSjP25QapEtTMxw56ZtKRf62lkL_)