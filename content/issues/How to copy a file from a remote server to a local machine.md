---
tags:
  - linux
date: 2024-01-11
url: https://unix.stackexchange.com/questions/188285/how-to-copy-a-file-from-a-remote-server-to-a-local-machine
aliases:
  - scp
---

```shell
scp username@source:/location/to/file username@destination:/where/to/put
```
- You can read man scp to get more ideas on this.
- `scp -r` will copy recursively. 

## Example

If you are on the computer from which you want to send file to a remote computer:
```shell
scp /file/to/send username@remote:/where/to/put
```
Here the remote can be a FQDN or an IP address.

On the other hand if you are on the computer wanting to receive file from a remote computer:
```shell
scp username@remote:/file/to/send /where/to/put
```

scp can also send files between two remote hosts:
```shell
scp username@remote_1:/file/to/send username@remote_2:/where/to/put
```

# Referenced 
- [scp - How to copy a file from a remote server to a local machine? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/188285/how-to-copy-a-file-from-a-remote-server-to-a-local-machine)