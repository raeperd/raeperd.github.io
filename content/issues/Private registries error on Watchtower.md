---
tags:
  - bug
  - docker
date: 2024-01-07
url: https://containrrr.dev/watchtower/private-registries/
---
watchtower fails to pull private repo by default

## How to fix
- mount credential
	- `~/.docker/config.json:/config.json`
