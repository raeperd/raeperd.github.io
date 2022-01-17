---
title: Combination Java
tags: [ algorithm,java, kotlin  ]
date: 2021-12-26
---

# Combination Java
## Backtrack 
```kotlin 
fun IntArray.combination(r: Int): List<Set<Int>> {
    val results = ArrayList<Set<Int>>(size.combination(r))
    combinationInternal(BooleanArray(size) { false }, 0, size, r, results)
    return results
}

// nCr
fun IntArray.combinationInternal(visited: BooleanArray, start: Int, n: Int, r: Int, results: MutableList<Set<Int>>) {
    if (r == 0) {
        visited.withIndex()
            .mapNotNull { (index, value) -> if (value) this[index] else null }
            .toSet().also { results.add(it) }
        return
    }
    for (i in start until n) {
        visited[i] = true
        combinationInternal(visited, i + 1, n, r - 1, results)
        visited[i] = false
    }
}

private fun Int.combination(r: Int): Int =
    factorial(this) / (factorial(this - r) * factorial(r))

private tailrec fun Int.factorial(acc: Int = 1): Int {
    val accCurrent = this * acc
    return if (this < 2) {
        accCurrent
    } else {
        (this - 1).factorial(accCurrent)
    }

```

## Recursive
```kotlin 
fun IntArray.combinationRecursive(r: Int): List<Set<Int>> {
    val results = ArrayList<Set<Int>>(size.combination(r))
    combinationRecInternal(BooleanArray(size) { false }, 0, r, results)
    return results
}

private fun IntArray.combinationRecInternal(
    visited: BooleanArray,
    depth: Int,
    r: Int,
    results: MutableList<Set<Int>>
) {
    if (r == 0) {
        visited.withIndex()
            .mapNotNull { (index, value) -> if (value) this[index] else null }
            .toSet().also { results.add(it) }
        return
    }
    if (size == depth) {
        return
    }
    visited[depth] = true
    combinationRecInternal(visited, depth + 1, r - 1, results)
    visited[depth] = false
    combinationRecInternal(visited, depth + 1, r, results)
}
```

# Reference
1. [조합 Combination (Java) :: 뱀귤 블로그](https://bcp0109.tistory.com/15?category=848939) 
2. [generate-all-permutations-of-an-array](generate-all-permutations-of-an-array.md)