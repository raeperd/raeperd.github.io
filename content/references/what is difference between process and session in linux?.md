---
tags:
  - linux
  - cs
date: 2024-01-08
url: https://www.phind.com/search?cache=cv2c7apb9c8vyxw7mrp74vr4
---
- process는 실행 중인 프로그램
- session은 관련된 process를 관리하기 위한 프로세스의 집합이다
- session leader는 세션을 시작한 첫 프로세스로, pid와 sid가 같다. 대부분 `bash` 가 이에 해당한다

In Linux, a process and a session are two different concepts related to the management of tasks and resources.

==A **process** in Linux is an instance of a program that is being executed.== It consists of the program code and its current activity. A process can be thought of as a task that is being performed by the computer. Each process in Linux has a unique process ID (PID) assigned by the system. Processes can spawn child processes, and they inherit certain attributes from their parent process, including the file descriptors, environment variables, and the controlling terminal [Source 2](https://www.elastic.co/blog/linux-process-and-session-model-as-part-of-security-alerting-and-monitoring).

On the other hand, a ==**session** is a collection of one or more processes that are grouped together.== A session is a higher-level concept that organizes related processes. When a user logs into a Linux system, a new session is created. This session contains all the processes that are started during the user's interaction with the system, up to the point when the user logs out [Source 2](https://www.elastic.co/blog/linux-process-and-session-model-as-part-of-security-alerting-and-monitoring).

The key difference between a process and a session lies in their scope and functionality. A process is focused on executing a specific task, whereas a session is designed to manage and coordinate a set of related processes. 

One important thing to note is that a session leader is the first process that starts a new session. This process has the same PID as the session ID (SID), and it remains the leader until it terminates. When the session leader process exits, all other processes in the session receive a SIGHUP signal, which usually causes them to terminate [Source 2](https://www.elastic.co/blog/linux-process-and-session-model-as-part-of-security-alerting-and-monitoring).

## Is bash is session leader in most cases?

==Yes, in most cases, a Bash shell is the session leader.== This is because when you start a Bash shell, it creates a new session and becomes the session leader. The session leader is the first process that starts a new session, and this process has the same PID as the session ID (SID) [2](https://biriukov.dev/docs/fd-pipe-session-terminal/3-process-groups-jobs-and-sessions/).

This behavior is particularly relevant when logging in a user with an interactive shell. The shell process becomes a session leader with a controlling terminal. When the shell process starts a new session with the `setsid()` system call, it becomes the session leader and starts a new process group, which it also becomes the leader of [2](https://biriukov.dev/docs/fd-pipe-session-terminal/3-process-groups-jobs-and-sessions/).

However, it's worth noting that while the Bash shell is typically the session leader, it's not always the case. Other processes can also become session leaders, especially in complex scenarios involving daemons or other services [1](https://unix.stackexchange.com/questions/18166/what-are-session-leaders-in-ps).