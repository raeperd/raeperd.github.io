---
title: How JVM Works
tags: [ java ]
date: 2022-01-12
---

# How JVM Works
- JVM(Java Virtual Machine) acts as a run-time engine to run Java applications.
- When we compile .java files, it is compiled to .class files

## Class Loader Subsystem
- Loading
	- Reads .class files
- Linking
	- Performs verification, preparation, and (optionally) resolution. 
- Initializing
	- Loads static variables and code blocks

## JVM Memory
- Method area
	- All class level information is stored 
- Heap area
	- Information of all objects
- Stack area
	- Run-time stack per thread
- PC registers
	- Address of current execution per thread
- Native method stacks
	- Native method information per thread

## Execution Engine 
Executes the .class. It can be classified into three parts
- Interpreter
	- Interprets bytecode line by line
- Just-In-Time Compiler
	- Compiles entire bytecode into native codes so that increase efficiency of an interpreter's repeated method calls 
- Garbage Collector
	- Destroys un-referenced objects 

# Reference
1. [How JVM Works - JVM Architecture? - GeeksforGeeks](https://www.geeksforgeeks.org/jvm-works-jvm-architecture/?ref=lbp)