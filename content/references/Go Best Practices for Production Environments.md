---
tags:
  - go
date: 2024-01-11
url: https://peter.bourgon.org/go-in-production
---
## Configuration
- flags inside main

```go
func main() {
    var (
        payload = flag.String("payload", "abc", "payload data")
        delay   = flag.Duration("delay", 1*time.Second, "write delay")
    )
    flag.Parse()
    // ...
}
```

## Logging and telemetry 
- push based telemetry is straightforward, but does not scale
- [expvar](https://pkg.go.dev/expvar) with pull based telemetry scales

## Testing and validation
```go
// +build integration

var fooAddr = flag.String(...)

func TestToo(t *testing.T) {
    f, err := foo.Connect(*fooAddr)
    // ...
}
```
- `go test -tags=integration`

## Interlude
- std lib based conventions scale to large group of developers 

## Dependency Management
- use vendor for executables 
- don't use vendor for package 

## Conclusion 
- The ultimate best practice is to embrace simplicity

## Reference
- [Peter Bourgon · Go: Best Practices for Production Environments](https://peter.bourgon.org/go-in-production/)