---
date: 2024-01-07
tags:
  - docker
---
## Issue
[Watchtower](https://containrrr.dev/watchtower/) fails to pull private repo by default

## Solution
- mount credential
	- `~/.docker/config.json:/config.json`

## Reference
- [Private registries - Watchtower](https://containrrr.dev/watchtower/private-registries/)
