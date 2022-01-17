---
title: Evolution of HTTP
tags: [ network ]
date: 2022-01-13
---

# Evolution of HTTP
## Invention of World Wide Web
- Build over existing [TCP/IP](../2020/the-bits-and-bytes-of-computer-networking/tco-ip-5-layer-network-model.md).
- Textual format to represent hypertext documents, [HTML](../2020/html-basic.md)
- Simple protocol to exchange these documents
- Client to display these documents, browser 
- Server to give access to the document, httpd

## HTTP/0.9
- GET method only
- No header
- No status code
- HTML only 

```plaintext
GET /mypage.html
```

```html
<html>
A very simple HTML page
</html>
```

## HTTP/1.0
- Building extensibility
- Versioning information was sent within each request
- Status code allows browser works smart
- HTTP header for request and responses
- Content-Type for documents other than HTML

```plaintext
GET /mypage.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html
<HTML>
A page with an image
  <IMG SRC="/myimage.gif">
</HTML>
```

## HTTP/1.1
- Clarified ambiguities 
- A connection could be reused
- Pipelining was added
- Chunked responses
- Additional cache control mechanisms
- Content negotiations
- Host header, to serve multiple host in one IP address

## More than 15 years of extensions 
- Using HTTP for secure transmissions
	- SSL 3.0 allowed this 
- Using HTTP for complex applications
	- REST was proposed in 2000, and very common in 2010s
- Same-Origin Policy, Cross Origin Resource Sharing, Content Security Policy

## HTTP/2.0
- Protocol for greater performance
- Binary protocol rather than a text protocol
- Multiplexed protocol. Parallel requests can be made over the same connection 
- Compress header 

# Reference
1. [Evolution of HTTP - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#invention_of_the_world_wide_web)
