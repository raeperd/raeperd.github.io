---
title: Observer Pattern
tags: [programming]
date: 2022-01-14
---

# Observer Pattern
- The Observer Pattern defines a one-to-many dependency between objects so that when one object changes state, all of its dependents are notified and updated automatically.
	- Subject: Object changes state
	- Observers: Dependents 

## Implementation
### Push or Pull
1. Push changed state to Observer
2. Pull changed state from Subject (This is better in many cases)

```kotlin
interface Subject {
    fun registerObserver(observer: Observer)
    fun removeObserver(observer: Observer)
    fun notifyObservers()
}

interface Observer {
    fun update()
}
```

```kotlin
class WeatherData(
    temperature: Double, humidity: Double, pressure: Double,
    observers: List<Observer> = emptyList()
) :
    Subject {
    private val observers = mutableListOf(*observers.toTypedArray())
    var temperature = temperature
        private set
    var humidity = humidity
        private set
    var pressure = pressure
        private set

    override fun registerObserver(observer: Observer) {
        observers.add(observer)
    }

    override fun removeObserver(observer: Observer) {
        observers.remove(observer)
    }

    override fun notifyObservers() {
        observers.forEach { observer -> observer.update() }
    }

    fun updateWeather(temperature: Double, humidity: Double, pressure: Double) {
        this.temperature = temperature
        this.humidity = humidity
        this.pressure = pressure
        notifyObservers()
    }
}
```

```kotlin
interface Display {
    fun display()
}

class CurrentConditionDisplay(private val weatherData: WeatherData) : Observer, Display {
    private var temperature = weatherData.temperature
    private var humidity = weatherData.humidity

    init {
        weatherData.registerObserver(this)
    }

    override fun update() {
        this.temperature = weatherData.temperature
        this.humidity = weatherData.humidity
        display()
    }

    override fun display() {
        println("temperature: $temperature humidity: $humidity")
    }
}
```

```kotlin
val weather = WeatherData(0.0, 0.0, 0.0)
val display = CurrentConditionDisplay(weather)
// add more observers ... 

weather.updateWeather(80.0, 10.0, 20.0)
weather.updateWeather(70.0, 10.0, 20.0)
weather.updateWeather(30.0, 10.0, 20.0)

weather.removeObserver(display)
weather.updateWeather(0.0, 0.0, 0.0)
```

```plaintext
temperature: 80.0 humidity: 10.0
temperature: 70.0 humidity: 10.0
temperature: 30.0 humidity: 10.0
```


# Reference
1. Freeman, Eric; Robson, Elisabeth. Head First Design Patterns (p. 93). O'Reilly Media. Kindle Edition. 
2. [Observer pattern - Wikipedia](https://en.wikipedia.org/wiki/Observer_pattern)
