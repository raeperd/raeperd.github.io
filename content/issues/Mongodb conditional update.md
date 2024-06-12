---
date: 2024-06-10
tags:
  - mongo
  - snippet
---
- Trying to update docs matches query using Mongodb compass
- Even with `$set` (And UI showing updated docs...), Mongodb compass's aggregation tab is not updating actual documents in collection ([ref](https://www.mongodb.com/community/forums/t/mongodb-compass-are-aggregation-queries-set-executed-or-only-previewed/163821/6)) 

```shell
db.collection.aggregate(
  [
    {
      $match: {
        URL: { $regex: 'http.*instagram.com/*' }
      }
    },
    {
      $set: {
	    StatusCode: 200
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
```
- This aggregation does not affect actual docs even though UI shows you updated fields

# Solution
- [Installed mongosh](https://www.mongodb.com/try/download/shell) and copied rpm file to production server using [scp](How%20to%20copy%20a%20file%20from%20a%20remote%20server%20to%20a%20local%20machine.md)
- run `db.collection.updateMany({query}, {$set op})`

```sh
mongosh "mongodb+srv://username:password@mongo-address.com/db"
```

```sh
db.site.updateMany(
  { URL: { $regex: "http.*instagram.com/*" } },
  { $set: { StatusCode: 200} }
)
```

## Reference
- [MongoDB Compass - Are Aggregation queries $set executed or only previewed? - Working with Data / Developer Tools - MongoDB Developer Community Forums](https://www.mongodb.com/community/forums/t/mongodb-compass-are-aggregation-queries-set-executed-or-only-previewed/163821/5)
- [Welcome to MongoDB Shell (mongosh) - MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/)
- [Update Documents - MongoDB Manual v7.0](https://www.mongodb.com/docs/manual/tutorial/update-documents/)
- [Modify Multiple Documents - MongoDB Compass](https://www.mongodb.com/docs/compass/current/documents/modify-multiple/)
- [$regex - MongoDB Manual v7.0](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)
- [$set - MongoDB Manual v7.0](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set)
- [db.collection.find() - MongoDB Manual v7.0](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find)