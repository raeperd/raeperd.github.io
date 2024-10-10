---
title: Where to store logs in linux application
description: with log rotations
date: Jan 15, 2024
---

## Issue
- `/var/log/application-name` is to go
- Rotating log file is solved problem. Use logrotate
- Should consider permission of that directory

## Solution

### Should I save application log files in /var/log dir? 

Yes, you should save application log files in the `/var/log` directory. This is a standard location for log files on Unix-like systems, including Linux distributions, which is widely accepted by the community. This directory is intended for log files produced by various system processes, including those of your application.

However, it's a good practice to create a dedicated subdirectory for your application under `/var/log`. This is especially useful if your application generates multiple log files or if you have multiple instances of the application running. Having a dedicated directory makes it easier to locate the log files for a specific application instance.

For example, if your application is named `myapp`, you could create a directory `/var/log/myapp` and save all your application logs there.

Here's an example of how you might structure your logs:

```bash
/var/log/myapp/
├── myapp.log
└── myapp-error.log
```

Remember to set appropriate permissions for your application to write to this directory.

Also, consider using tools like `logrotate` to manage your log files. This tool can automatically rotate, compress, remove, and mail system logs to prevent them from consuming too much disk space.

Finally, if your application is compromised, you may want to mark the log file as append-only. This ensures that even if your application is compromised, it won't be able to erase past logs, which can be very useful for forensic analysis.

## Referenced
- [should i save application log files in /var/log dir?](https://www.phind.com/search?cache=w6bnwpavdptp22mkkq8ypi6n)
- [python - Where to keep application specific log file - Stack Overflow](https://stackoverflow.com/questions/30024243/where-to-keep-application-specific-log-file)
- [scripting - Where are userspace programs supposed to save their logs? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/65389/where-are-userspace-programs-supposed-to-save-their-logs)
- [Managing Linux Logs - The Ultimate Guide To Logging](https://www.loggly.com/ultimate-guide/managing-linux-logs/)
