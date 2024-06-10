---
date: 2024-01-08
tags:
  - linux
url: https://www.phind.com/search?cache=ybpelijh2jqjj0e6rsfoq6f5
---
- `nohup` is a command in Unix and Unix-like operating systems that allows a process to keep running after the terminal session has ended. It stands for "No Hangups". 
- The `nohup` command prevents the process from receiving the `SIGHUP` (Signal Hang UP) signal, which is sent when the terminal session ends. By default, this signal causes the process to terminate[^Source 1^][^Source 3^].

Here is an example of how to use `nohup`:

```bash
nohup command &
```

In this command, `command` is the process you want to run. The `&` at the end puts the command in the background, freeing up the terminal for other commands.

The output of the process is usually directed to a file named `nohup.out`. If you want to redirect the output to a different file, you can use the `>` operator:

```bash
nohup command > outputfile &
```

In this command, `outputfile` is the name of the file where you want to store the output[^Source 3^].

It's important to note that `nohup` is different from a daemon. While both allow a process to run in the background, `nohup` is designed for processes that need to run to completion, whereas a daemon is designed for processes that run continuously in the background[^Source 0^].

Finally, remember that if a process started with `nohup` tries to interact with the terminal (for example, by asking for input), it will fail because the terminal is no longer available[^Source 4^].