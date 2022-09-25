---
title: Dependency Inversion Principal
tags: [design-pattern]
date: 2022-02-20
---

Depend upon abstractions. Do not depend upon concrete classes.
- High level components should not depend on low-level components

# Guidelines 
- No variable should hold a reference to a concrete class
- No class should derive from a concrete class
- No method should override an implemented method of any of its base classes

## Note
This is guideline developer should strive for, rather than a rule you should follow all the time.


# Reference
1. Freeman, Eric; Robson, Elisabeth. Head First Design Patterns (p. 241). O'Reilly Media. Kindle Edition. 
2. [Dependency inversion principle - Wikipedia](https://en.wikipedia.org/wiki/Dependency_inversion_principle)
