---
date: 2024-01-08
tags:
  - linux
url: https://www.phind.com/search?cache=ybpelijh2jqjj0e6rsfoq6f5
---
`setsid` is a command in Unix and Unix-like operating systems that runs a program in a new session. The command calls `fork()` if it is already a process group leader. Otherwise, it executes a program in the current process. This behavior can be overridden using the `--fork` option

Here is an example of how to use `setsid`:

```bash
setsid [options] program [arguments]
```

In this command, `program` is the process you want to run. The `[arguments]` are optional parameters for the program [^Source 0^].

There are several options you can use with `setsid`:

- `-c, --ctty`: Set the controlling terminal to the current one.
- `-f, --fork`: Always create a new process.
- `-w, --wait`: Wait for the execution of the program to end, and return the exit status of this program as the exit status of `setsid`.
- `-V, --version`: Display version information and exit.
- `-h, --help`: Display help text and exit [^Source 0^].

Here is an example of using these options:

```bash
sudo setsid -c ./add.sh
```

In this example, the current terminal is set to be the controlling terminal. If the process takes some time to execute, you can use the `-w` option to wait for it to finish and get the exit value:

```bash
setsid -w ./add.sh
```

Remember that `setsid` creates a new session if the calling process is not a process group leader. The calling process becomes the leader of the new session and also becomes the process group leader of a new process group in the session [^Source 2^].