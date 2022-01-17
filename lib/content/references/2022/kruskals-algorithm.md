---
title: Kruskal's algorithm
tags: [ algorithm]
date: 2022-01-03
---

# Kruskal's algorithm
## Algorithm
1. create a forest F
2. create a set E containing all the edges in the graph
3. while E is nonempty and F is not yet spanning 
	1. remove edge with minimum weight from S
	2. if the removed edge connects two different trees then add it to the forest F, combining two tress into a single tree

```python
from dataclasses import dataclass, field
from typing import List


@dataclass
class Edge:
    u: int
    v: int
    weight: int


@dataclass
class Graph:
    vertices: List[int] = field(default_factory=list)
    edges: List[Edge] = field(default_factory=list)

    def add_edge(self, edge: Edge):
        self.vertices.append(edge.u)
        self.vertices.append(edge.v)
        self.edges.append(edge)


def root(vertex: int, parents: List[int]) -> int:
    if parents[vertex] == vertex:
        return vertex
    return root(parents[vertex], parents)


def kruskal(graph: Graph) -> Graph:
    answer = Graph()
    parents = [index for index in range(len(graph.vertices))]
    for edge in sorted(graph.edges, key=lambda edge: edge.weight):
        if root(edge.u, parents) != root(edge.v, parents):
            parents[edge.v] = parents[edge.u]
            answer.add_edge(edge)
        if len(graph.vertices) - 1 == len(answer.edges):
            break
    return graph
```

## Proof
### Spanning tree
1. Let G be a connected and let Y be subgraph of G produced by algorithm. 
2. Y cannot have a cycle by definition.
3. Y cannot be disconnected, since the first encountered edge that joins two components of Y would been added by definition
4. Thus Y is a spanning tree of G


# Reference
1. [Kruskal's algorithm - Wikipedia](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm)
2. [Prim's algorithm - Wikipedia](https://en.wikipedia.org/wiki/Prim%27s_algorithm)
