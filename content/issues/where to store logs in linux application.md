---
date: 2024-01-15
tags:
  - linux
url: https://www.phind.com/search?cache=w6bnwpavdptp22mkkq8ypi6n
---
- `/var/log` 하위에 application 이름으로 디렉토리를 만들고, 이곳에 로그를 저장하는 것이 좋다.
- [logrotate](logrotate.md)등을 사용하면 손쉽게 컨트롤 할 수 있다. 
- permission을 가지고 있는지 등은 주의할 필요가 있다.

## Should I save application log files in /var/log dir?

Yes, you should save application log files in the `/var/log` directory. This is a standard location for log files on Unix-like systems, including Linux distributions, which is widely accepted by the community. This directory is intended for log files produced by various system processes, including those of your application [Source 0](https://www.loggly.com/ultimate-guide/managing-linux-logs/), [Source 1](https://unix.stackexchange.com/questions/65389/where-are-userspace-programs-supposed-to-save-their-logs), [Source 2](https://stackoverflow.com/questions/30024243/where-to-keep-application-specific-log-file).

However, it's a good practice to create a dedicated subdirectory for your application under `/var/log`. This is especially useful if your application generates multiple log files or if you have multiple instances of the application running. Having a dedicated directory makes it easier to locate the log files for a specific application instance [Source 0](https://www.loggly.com/ultimate-guide/managing-linux-logs/).

For example, if your application is named `myapp`, you could create a directory `/var/log/myapp` and save all your application logs there.

Here's an example of how you might structure your logs:

```bash
/var/log/myapp/
├── myapp.log
└── myapp-error.log
```

Remember to set appropriate permissions for your application to write to this directory.

Also, consider using tools like `logrotate` to manage your log files. This tool can automatically rotate, compress, remove, and mail system logs to prevent them from consuming too much disk space [Source 0](https://www.loggly.com/ultimate-guide/managing-linux-logs/).

Finally, if your application is compromised, you may want to mark the log file as append-only. This ensures that even if your application is compromised, it won't be able to erase past logs, which can be very useful for forensic analysis [Source 1](https://unix.stackexchange.com/questions/65389/where-are-userspace-programs-supposed-to-save-their-logs).