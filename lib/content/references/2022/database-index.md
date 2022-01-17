---
title: Database index
tags: [ database  ]
date: 2022-01-03
---

# Database index
- Database index is a data structure that improves the speed of data retrieval operations on a database at the cost of additional storage to maintain the index data structure.
- Index is copy of columns of data from a table, that is designed to enable very efficient search

# Usage
- Support for fast lookup
- Policing the database constraints
	- UNIQUE, PRIMARY KEY, FOREIGN KEY

# Index architecture
## Non-clustered
- The physical order of the row is not the same as the index order
- The indexed columns are typically non-primary key columns used in JOIN, WHERE, ORDER BY clauses
- There can be more than one non-clustered index on a database index

## Clustered
- Clustering alters the data block into a certain distinct order to match the index, resulting in the row data being stored in order
- Only one clustered index can be created on a given database table

# Pros and cons
## pros 
- Improve read operation on columns 
- Improve join operation on columns
## cons 
- More storage
- Update query can be slower

# Application and limitations 
- With wildcard at the beginning of the search-term, the database software is unable to use the underlying index data structure
	- Create index on `revers(email_address)`
	- `SELECT email_address FROM customers WHERE reverse(email_address) LIKE reverse('%@wikipedia.org');`

# Implementation
- Popular indices include balanced trees, B+ tress and hashes



# Reference
1. [Database index - Wikipedia](https://en.wikipedia.org/wiki/Database_index#:~:text=A+database+index+is+a,maintain+the+index+data+structure.)
