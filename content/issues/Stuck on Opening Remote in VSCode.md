---
date: 2024-01-03
tags:
  - linux
  - ssh
  - vscode
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