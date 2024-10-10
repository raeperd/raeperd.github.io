---
title: Stuck on Opening Remote in VSCode
description: config on sshd
date: Jan 10, 2024
---

## Isssue
- sshd configuration for port forwarding

## Solution
```shell 
$ sudo vim /etc/ssh/sshd_config
```
- and set `AllowTcpForwarding` to yes
- restart sshd 

```shell
$ sudo systemctl restart sshd
```

## Referenced
1. [Stuck on "Opening Remote..." · Issue #195 · microsoft/vscode-remote-release · GitHub](https://github.com/microsoft/vscode-remote-release/issues/195)