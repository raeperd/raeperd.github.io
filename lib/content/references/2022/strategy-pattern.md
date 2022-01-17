---
title: Strategy pattern
tags: [ programming   ]
date: 2022-01-03
---

# Strategy pattern
- Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
- Can select algorithm at runtime
- This can be achieved by mechanism such as function pointer, first-class function, class

## Implementations
```kotlin
abstract class Duck(
    var flyBehavior: FlyBehavior,
    private val quarkBehavior: QuarkBehavior
) {
    abstract fun display()

    fun performFly() {
        flyBehavior.fly()
    }

    fun performQuark() {
        quarkBehavior.quark()
    }
}

interface FlyBehavior {
    fun fly()
}

interface QuarkBehavior {
    fun quark()
}
```

```kotlin
class FlyWithWings : FlyBehavior {
    override fun fly() {
        println("Fly with wings")
    }
}

class FlyNoWay : FlyBehavior {
    override fun fly() {
        println("I can't fly")
    }
}

class Quark : QuarkBehavior {
    override fun quark() {
        println("Quark")
    }
}

class Squeak : QuarkBehavior {
    override fun quark() {
        println("Squeak")
    }
}
```

```kotlin
class MallardDuck : Duck(FlyNoWay(), Quark()) {
    override fun display() {
        println("MallardDuck")
    }
}

class ModelDuck : Duck(FlyWithWings(), Squeak()) {
    override fun display() {
        println("ModelDuck")
    }
}

```

```kotlin
val mallard: Duck = MallardDuck()
mallard.display()
mallard.performQuark()
mallard.performFly()

val model: Duck = ModelDuck()
model.display()
model.performQuark()
model.performFly()

model.flyBehavior = FlyNoWay() // choose algorithm at runtime
model.performFly()
```

```plaintext
MallardDuck
Quark
I can't fly
ModelDuck
Squeak
Fly with wings
I can't fly
```


# Reference
1. Freeman, Eric; Robson, Elisabeth. Head First Design Patterns (p. 76). O'Reilly Media. Kindle Edition. 
2. [Strategy pattern - Wikipedia](https://en.wikipedia.org/wiki/Strategy_pattern) 
