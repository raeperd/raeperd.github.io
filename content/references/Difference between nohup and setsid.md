---
date: 2024-01-08
tags:
  - linux
url: https://www.phind.com/search?cache=df4wi3cs35u5vitul7y5tusg
---
- [nohup](nohup.md)과 [setsid](setsid.md) 모두 터미널이 종료된 이후에도 process가 background에서 동작하도록 하는데 사용하는 command이다.
- [nohup](nohup.md)은 `SIGHUP` signal을 무시하도록 해 프로세스가 백그라운드에서 동작하도록 한다.
- [setsid](setsid.md)는 system call을 통해 새로운 session을 만들고 해당 프로세스가 session leader가 되게 함으로써 process의 종료를 막는다.
- [setsid](setsid.md) does not redirect the output to file

## What is difference between nohup and setsid

Both `nohup` and `setsid` are used to keep a process running in the background even after the terminal is closed. They differ mainly in their approach and usage.

`nohup` is a command that comes with Unix-like operating systems. It stands for "no hangup". When you prefix a command with `nohup`, the system ignores the HUP (hangup) signal, allowing the command to continue running after the terminal is closed. Here's how you use it:

```bash
nohup command
```

This command will create a `nohup.out` file in the current directory where the standard output and standard error of the command will be redirected [Source 0](https://www.sobyte.net/post/2022-04/linux-nohup-setsid-disown/), [Source 2](https://unix.stackexchange.com/questions/3886/difference-between-nohup-disown-and).

On the other hand, `setsid` is a system call that creates a new session and makes the process the leader of that session. This effectively detaches the process from the terminal. Unlike `nohup`, `setsid` does not redirect the output to a file. Here's how you use it:

```bash
setsid command
```

In this case, the process that calls the `setsid` function will create a new session if it is not the leader of a process group. The process becomes the session leader of the new session, which is the only process in the new session. The process also becomes the leader process of a new process group, and the new process group ID is the PID of the process [Source 0](https://www.sobyte.net/post/2022-04/linux-nohup-setsid-disown/).

In summary, the key differences between `nohup` and `setsid` are:

- `nohup` ignores the HUP signal, allowing the command to continue running after the terminal is closed. It also redirects the output to a file.
- `setsid` creates a new session and makes the process the leader of that session, effectively detaching the process from the terminal. It does not redirect the output to a file.

## About `&`
- In fact, on newer versions of bash, bash does not send SIGHUP commands to background programs. That means that any process running in the background ending with & will not be exited by the SIGHUP signal for terminal exit.

## Reference
- [The difference between nohup, setsid and disown - SoByte](https://www.sobyte.net/post/2022-04/linux-nohup-setsid-disown/)
