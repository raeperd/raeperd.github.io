---
title: Serialization error on bson.M in Mongodb go package
description: Inconsistency in go mongodb driver in bson.M
date: Oct 10, 2024
---

## bson.D vs bson.M
from bson package go doc,
> M is an unordered representation of a BSON document. This type should be used when the order of the elements does not matter. This type is handled as a regular map[string]interface{} when encoding and decoding. Elements will be serialized in an undefined, random order. If the order of the elements matters, a D should be used instead.

But official mongodb reference uses bson.D everywhere even if order does not matter in examples.
such as docs in [Specify a Query - Go Driver v1.16](https://www.mongodb.com/docs/drivers/go/current/fundamentals/crud/read-operations/query-document/#std-label-golang-literal-values)

And using struct `bson.D` like `bson.D{{"_id", 2158}}` cause lint error `UnusedExpr`. 
IMHO in most cases `bson.M` is better choice 

## inconsistent BSONOptions
to json tag be parsed by mongodb driver, `options.BSONOptions{UseJSONStructTags: true}` must be provided when initializing mongodb client
```go
bsonOpts := &options.BSONOptions {
    UseJSONStructTags: true,
    NilSliceAsEmpty: true,
}

clientOpts := options.Client().
    ApplyURI("<connection string>").
    SetBSONOptions(bsonOpts)

client, err := mongo.Connect(context.TODO(), clientOpts)
```
- I think `UseJSONStructTags` must be default to `true` 

If you define struct with only json fields and start to query or insert, inconsistency happends
- If you want to insert struct with only json tags, you need `UseJSONStructTags` to be `true`
- If you want to query struct with only json tags, you **don't** need `UseJSONStructTags` to be true

This happens when using `bson.M` which is internally just a `map[string]any`

## struct embedding needs `bson:inline`
There is no way to embed struct without using bson tags. 
Need to add `bson:inline` if struct nesting is needed even with `UseJSONStructTags` to be true

```go
type Outer struct {
	Inner `bson:inline`
	other int `json:"other"`
}
```
- This is documented in [Work with BSON - Go Driver v1.16](https://www.mongodb.com/docs/drivers/go/current/fundamentals/bson/)