---
title: What is REST
tags: [ network, programming  ]
date: 2022-01-12
---

- Web API conforming the REST architectural style is a REST API

## Constrains of the RESTful API
1. Uniform interface
	-  Identification of resources
	-  Manipulation of resources through representations
	-  Self-descriptive messages
	-  Hypermedia as the engine of application state
2. Client-Server
3. Stateless
	- Each request from the client to the server must contain all of the information necessary to understand and complete the request.
	- For this reason, the client application must entirely keep the session state.
4. Cacheable
	- If the response is cacheable, the client application gets the right to reuse the response data later for equivalent requests and a specified period.
5. Layered system
6. Code on demand (optional)

## What is Resource?
- Abstraction of information in REST consists of,	
   - the data
   - the metadata
   - hypermedia links that can help the client in transition to the next desired state
- Resource should be self-descriptive

## Resource Methods
- Resource methods are used to perform the desired transition between two states of any resource
- General recommendations are HTTP methods(GET/PUT/POST/DELETE), but Roy Fielding has never mentioned any recommendations
- All he emphasizes is that it should be uniform, consistent interface

## Notes
- Typically HTTP is the most used protocol, but REST does not mandate it
- Most importantly, every interaction with the server must be stateless.

# Reference
1. [What is REST](https://restfulapi.net/)