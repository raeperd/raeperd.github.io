---
title: Introduction to Coroutines and Channels
description: in Kotlin
date: April 4, 2022
---


# [Blocking request](https://play.kotlinlang.org/hands-on/Introduction%20to%20Coroutines%20and%20Channels/02_BlockingRequest)
``` kotlin
fun loadContributorsBlocking(service: GitHubService, req: RequestData) : List<User> {
    val repos = service
        .getOrgReposCall(req.org)
        .execute() // Executes request and blocks the current thread
        .also { logRepos(req, it) }
        .body() ?: listOf()

    return repos.flatMap { repo ->
        service
            .getRepoContributorsCall(req.org, repo.name)
            .execute() // Executes request and blocks the current thread
            .also { logUsers(repo, it) }
            .bodyList()
    }.aggregate()
} 
```

![](https://i.imgur.com/dA76Ewg.png)
- UI will freeze and won't react to input until the loading is finished. 

# [Using callbacks](https://play.kotlinlang.org/hands-on/Introduction%20to%20Coroutines%20and%20Channels/03_UsingCallbacks)
## Calling `loadContributors` in the background thread
``` kotlin
fun loadContributorsBackground(service: GitHubService, req: RequestData, updateResults: (List<User>) -> Unit) {
    thread {
        loadContributorsBlocking(service, req)
            .let(updateResults)
    }
} 
```

![](https://i.imgur.com/QsDT1UA.png)
- UI is not freezing, but all the loading requests go sequential

## Using Retrofit callback API
``` kotlin

fun loadContributorsCallbacks(service: GitHubService, req: RequestData, updateResults: (List<User>) -> Unit) {
    service.getOrgReposCall(req.org).onResponse { responseRepos ->
        logRepos(req, responseRepos)
        val repos = responseRepos.bodyList()
        val allUsers = synchronizedList(mutableListOf<User>())
        val countDownLatch = CountDownLatch(repos.size)
        for (repo in repos) {
            service.getRepoContributorsCall(req.org, repo.name).onResponse { responseUsers ->
                logUsers(repo, responseUsers)
                val users = responseUsers.bodyList()
                allUsers += users
                countDownLatch.countDown()
            }
        }
        countDownLatch.await()
        updateResults(allUsers.aggregate())
    }
}

inline fun <T> Call<T>.onResponse(crossinline callback: (Response<T>) -> Unit) {
    enqueue(object : Callback<T> {
        override fun onResponse(call: Call<T>, response: Response<T>) {
            callback(response)
        }

        override fun onFailure(call: Call<T>, t: Throwable) {
            log.error("Call failed", t)
        }
    })
}
 
```

![](https://i.imgur.com/YJbBaVC.png)
- Have to wait for loaded result
- No one guarantees that the result for the last one comes last
- Writing the right code with callbacks might be non-trivial and error-prone, especially when there're several underlying threads and synchronization takes place

# [Using `suspend` functions](https://play.kotlinlang.org/hands-on/Introduction%20to%20Coroutines%20and%20Channels/04_Suspend)
``` kotlin
suspend fun loadContributorsSuspend(service: GitHubService, req: RequestData): List<User> {
    val repos = service
        .getOrgRepos(req.org)
        .also { logRepos(req, it) }
        .body() ?: listOf()

    return repos.flatMap { repo ->
        service
            .getRepoContributors(req.org, repo.name)
            .also { logUsers(repo, it) }
            .bodyList()
    }.aggregate()
} 
```
- [Coroutines](Coroutine%20Basics.md) are computations that run on top of threads and can be suspended
- This code is similar with previous blocking version
	- block -> suspend
	- thread -> coroutine

![](https://i.imgur.com/yewpie1.png)
- Each request now waits for the result via suspension mechanism 
	1. Request sent 
	2. Whole suspend function is suspended
	3. Coroutine resumes only after the response is received
- This does not block it for "waiting", but it does not yet bring concurrency to the picture 

# [Concurrency](https://play.kotlinlang.org/hands-on/Introduction%20to%20Coroutines%20and%20Channels/05_Concurrency)
``` kotlin
suspend fun loadContributorsConcurrent(service: GitHubService, req: RequestData): List<User> = coroutineScope {
    val repos = service
        .getOrgRepos(req.org)
        .also { logRepos(req, it) }
        .bodyList()

    repos.map { repo -> async(Dispatchers.Default) { service.getRepoContributors(req.org, repo.name).also { logUsers(repo, it) }.bodyList() } }
        .awaitAll()
        .flatten().aggregate()
}
```
- `Dispathcers.Default` use thread from shared pool of threads on JVM
	- By adding this in `async` coroutine builders, coroutine uses thread not from outer scope (which is main UI thread)
- To run the coroutine only one the main UI thread, use `Dispathcers.Main`
- Since dispatcher can be defined in caller side, using the dispatcher from the outer scope's context is more flexible way to define new coroutine

``` kotlin
launch(Dispatchers.Default) {
    val users = loadContributorsConcurrent(service, req)
    withContext(Dispatchers.Main) {
        updateResults(users, startTime)
    }
}
```

![](https://i.imgur.com/9sJ5XyQ.png)
- `launch` returns Job
- `async` returns Deferred
	- If we don't specify one as an argument, then async will use the dispatcher from the outer scope.
- `runBlocking` is used as bridge between blocking and non-blocking worlds.
- it's considered good practice to use the dispatcher from the outer scope rather than to explicitly specify it on each end-point.

# [Structured Concurrency](https://play.kotlinlang.org/hands-on/Introduction%20to%20Coroutines%20and%20Channels/06_StructuredConcurrency)
- *Coroutine scope* is responsible for structure and parent-child relationships between different coroutines.
- *Coroutine context* stores additional technical information used to run a given coroutine like name, dispatcher
- *Coroutine scope* inherits *coroutine context* from outer scope
- `GlobalScope.async` has no structure. Started from the global scope, their lifetime is limited only by the whole application

# Reference
1. [Welcome to Kotlin hands-on](https://play.kotlinlang.org/hands-on/Introduction%20to%20Coroutines%20and%20Channels/01_Introduction)