---
title: How to use the Kafka Custom Partitioner in Java Spring Boot app
description: using Kotlin 
date: Jan 10, 2023
---

# Problems with Kafka Default Partitioner
- Hashing for selecting partition is not enough sometimes 
- `DefaultPartitioner` uses total number of partitions in a topic. This can be trouble when we want to increase partitions

# Example 
## CustomPartitioner
``` java 
public final class CustomPartitioner implements Partitioner {

    private static final String KEY_CONFIGURATION = "custom.key";
    private String configuration;

    private final Partitioner defaultPartitioner = new DefaultPartitioner();

    @Override
    public void configure(Map<String, ?> configs) {
        this.configuration = (String) configs.get(KEY_CONFIGURATION);
    }

    @Override
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
        if (topic.equals(configuration)) {
            // do something and return
            return 0;
        }
        return defaultPartitioner.partition(topic, key, keyBytes, value, valueBytes, cluster);
    }

    @Override
    public void close() {
        // no resource to close
    }

}
```

## KafkaProducerConfiguration
```java
@Configuration
class KafkaProducerConfiguration implements DefaultKafkaProducerFactoryCustomizer {

    @Override
    public void customize(DefaultKafkaProducerFactory<?, ?> producerFactory) {
        val configuration = new HashMap<String, Object>();
        configuration.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, CustomPatitioner.class);
        configuration.put(CustomPatitioner.KEY_CONFIGURATION, "custom-topic");
        producerFactory.updateConfigs(configuration);
    }

}
```