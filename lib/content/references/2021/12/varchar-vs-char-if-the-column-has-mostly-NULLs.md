---
title: VARCHAR vs CHAR if the column has mostly NULLs
tags: [  database  ]
date: 2021-12-08
---

# VARCHAR vs CHAR if the column has mostly NULLs
- NULL has same size as any other value when saved in fixed length column 
- NULL takes up no space when the field is variable width 
	- Additional one bytes per row for check if value is null or not
- VARCHAR also stores extra 2 bytes to store length up to 65535
	- [MySQL VARCHAR size? - Stack Overflow](https://stackoverflow.com/questions/7124029/mysql-varchar-size)


# Reference
1. [VARCHAR vs. CHAR if the column has mostly NULLs? – SQLServerCentral Forums](https://www.sqlservercentral.com/forums/topic/varchar-vs-char-if-the-column-has-mostly-nulls)
2. [tsql - How much size "Null" value takes in SQL Server - Stack Overflow](https://stackoverflow.com/questions/3731172/how-much-size-null-value-takes-in-sql-server)