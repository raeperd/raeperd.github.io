---
title: Factory Pattern
tags: [design-pattern]
date: 2022-02-20
---

Factories handle the details of object creation.
- Object initialization always depends on concrete implementation details
- By applying factory pattern, object creations is abstracted by factory class (or factory method) and [dependency-inversion-principal](/references/2022/dependency-inversion-principal.md)

# Simple Factory
- The Simple Factory isn’t actually a Design Pattern; it’s more of a programming idiom.

## Implementations
```kotlin
interface Pizza {
    fun prepare()
    fun bake()
    fun cut()
    fun box()
}

enum class PizzaType {
    Cheese, Pepperoni, Clam
}
```

```kotlin
fun createPizza(type: PizzaType): Pizza =
	when (type) {
		PizzaType.Cheese -> CheesePizza()
		PizzaType.Pepperoni -> PepperoniPizza()
		PizzaType.Clam -> ClamPizza()
	}
```

### Static factory method vs Factory class
```kotlin
class SimplePizzaFactory {
    fun createPizza(type: PizzaType): Pizza =
        when (type) {
            PizzaType.Cheese -> CheesePizza()
            PizzaType.Pepperoni -> PepperoniPizza()
            PizzaType.Clam -> ClamPizza()
        }
}
```
- Static factory methods do not need initialization
- Cannot change the behavior of the created method.
- Factory class can have multiple implementations

# Factory Method Pattern
- The Factory Method Pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. 

## Implementation
```kotlin
abstract class PizzaStore {
    fun orderPizza(type: PizzaType): Pizza {
        val pizza = createPizza(type)

        pizza.prepare()
        pizza.bake()
        pizza.cut()
        pizza.box()

        return pizza
    }

    abstract fun createPizza(type: PizzaType): Pizza
}
```

```kotlin
class NewYorkStyledPizzaStore : PizzaStore {
    override fun createPizza(type: PizzaType): Pizza =
        when (type) {
            PizzaType.Cheese -> NewYorkStyledCheesePizza()
            PizzaType.Pepperoni -> NewYorkStyledPeperroniPizza()
            PizzaType.Clam -> NewYorkStyledClamPizza()
        }
}

class ChicagoStyledPizzaStore : PizzaStore {
    override fun createPizza(type: PizzaType): Pizza =
        when (type) {
            PizzaType.Cheese -> ChicagoStyledCheesePizza()
            PizzaType.Pepperoni -> ChicagoStyledPeperroniPizza()
            PizzaType.Clam -> ChicagoStyledClamPizza()
        }
}
```
- Subclasses are not really "deciding" but they do determine which kind of pizza gets made
- Creator Classes
	- `NewYorkStyledPizzaStore`, `ChicagoStyledPizzaStore`
- Product Classes
	- `NewYorkStyledCheesePizza`, `NewYorkStyledPeperroniPizza`, `ChicagoStyledCheesePizza`,` ChicagoStyledPeperroniPizza` ...

## View Creators and Products in Parallel
![](https://i.imgur.com/OjyajsD.png)

![](https://i.imgur.com/XdtKd9Y.png)

# Simple Factory vs Factory Method Pattern
|             | Simple Factory | Factory Method Pattern                                                              |
| ----------- | -------------- | ----------------------------------------------------------------------------------- |
| Usage       | One-shot deal  | Creating a **Framework** that let subclass decide which implementation will be used |
| Flexibility | None           | Reusable                                                                            |


Rethinking the problem a bit, you see that what you’d really like to do is create a framework that ties the store and the pizza creation together, yet still allows things to remain flexible.

# Reference
1. Freeman, Eric; Robson, Elisabeth. Head First Design Patterns (p. 201). O'Reilly Media. Kindle Edition. 
