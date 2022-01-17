---
title: Generate All Permutations of an Array
tags: [ algorithm, kotlin ]
date: 2021-12-25
---

# Generate All Permutations of an Array
## Simple Recursive Algorithm
```kotlin
fun IntArray.permute(): List<IntArray> {
    val results = mutableListOf<IntArray>()
    permuteInternal(0, size, size, results)
    return results
}

// nPr
private fun IntArray.permuteInternal(depth: Int, n: Int, r: Int, results: MutableList<IntArray>) {
    if (depth == r) {
        results.add(copyOf())
        return
    }
    for (i in depth until n) {
        swap(depth, i)
        permuteInternal(depth + 1, n, r, results)
        swap(depth, i)
    }
}


private fun IntArray.swap(indexLeft: Int, indexRight: Int) {
    with(this[indexLeft]) {
        this@swap[indexLeft] = this@swap[indexRight]
        this@swap[indexRight] = this
    }
}
```

![](https://i.imgur.com/tVFsDJz.png)
- [순열 Permutation (Java) :: 뱀귤 블로그](https://bcp0109.tistory.com/14)

### Permute in order
```kotlin
fun IntArray.permuteInOrder(): List<IntArray> {
    val results = mutableListOf<IntArray>()
    permuteInOrderInternal(IntArray(size) { 0 }, BooleanArray(size) { false }, 0, size, size, results)
    return results
}

private fun IntArray.permuteInOrderInternal(
    output: IntArray,
    visited: BooleanArray,
    depth: Int,
    n: Int,
    r: Int,
    results: MutableList<IntArray>
) {
    if (depth == r) {
        results.add(output.copyOf())
        return
    }
    for (i in 0 until n) {
        if (!visited[i]) {
            visited[i] = true
            output[depth] = this[i]
            permuteInOrderInternal(output, visited, depth + 1, n, r, results)
            visited[i] = false
        }
    }
}
```
- Recursive call in order 

![](https://i.imgur.com/GpHpGLl.png)
- [순열 Permutation (Java) :: 뱀귤 블로그](https://bcp0109.tistory.com/14)


```kotlin
permuteInOrder([0, 0, 0], [x, x, x], 0, [])
permuteInOrder([1, 0, 0], [o, x, x], 1, [])
permuteInOrder([1, 2, 0], [o, o, x], 2 , [])
permuteInOrder( [1, 2, 3], [o, o, o],  3,  [])
permuteInOrder( [1, 3, 3], [o, x, o], 2, [{1,2,3}])
permuteInOrder( [1, 3, 2], [o, o, o], 3, [{1,2,3}])
permuteInOrder( [2, 3, 2], [x, o, x], 1, [{1,2,3}, {1,3,2}])
permuteInOrder( [2, 1, 3], [o, o, o],  3, [{1,2,3}, {1,3,2}])
permuteInOrder( [2, 3, 3], [x, o, o], 2, [{1,2,3}, {1,3,2}, {2,1,3}])
permuteInOrder( [2, 3, 1], [o, o, o], 3,  [{1,2,3}, {1,3,2}, {2,1,3}])
permuteInOrder( [3, 1, 1], [o, x, o], 2 , [{1,2,3}, {1,3,2}, {2,1,3}, {2,3,1}])
permuteInOrder( [3, 1, 2], [o, o, o], 3,  [{1,2,3}, {1,3,2}, {2,1,3}, {2,3,1}])
permuteInOrder( [3, 2, 2], [x, o, o], 2, [{1,2,3}, {1,3,2}, {2,1,3}, {2,3,1}, {3, 1, 2 }])
permuteInOrder( [3, 2, 1], [o, o, o], 3, [{1,2,3}, {1,3,2}, {2,1,3}, {2,3,1}, {3, 1, 2 }])
```

## Heap's Algorithm
### Recursive version
```kotlin
fun <T> heapRecursive(n: Int, elements: Array<T>, results: MutableList<Array<T>>) {
    if (n == 1) {
        results.add(elements.copyOf())
        return
    }
    for (i in 0 until n - 1) {
        heapRecursive(n - 1, elements, results)
        if (n % 2 == 0) {
            elements.swap(i, n - 1)
        } else {
            elements.swap(0, n - 1)
        }
    }
    heapRecursive(n - 1, elements, results)
}
```

### Iterative version 
```kotlin
fun <T> heapIterative(n: Int, elements: Array<T>, results: MutableList<Array<T>>) {
    results.add(elements.copyOf())
    val indexes = IntArray(n) { 0 }
    var i = 0
    while (i < n) {
        if (indexes[i] < i) {
            elements.swap(if (i % 2 == 0) 0 else indexes[i], i)
            results.add(elements.copyOf())
            indexes[i]++
            i = 0
        } else {
            indexes[i] = 0
            i++
        }
    }
}
```


# Reference
1. [Generate All Permutations of an Array | Baeldung on Computer Science](https://www.baeldung.com/cs/array-generate-all-permutations)
2. [Permutations of an Array in Java | Baeldung](https://www.baeldung.com/java-array-permutations)
3. [Why does Heap's algorithm work?](http://ruslanledesma.com/2016/06/17/why-does-heap-work.html)
4. [Heap’s Algorithm – Mike Johnson](https://mikejfromva.com/2016/10/15/heaps-algorithm/)
5. [Write a program to print all permutations of a given string - GeeksforGeeks](https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/)
6. [순열 Permutation (Java) :: 뱀귤 블로그](https://bcp0109.tistory.com/14)