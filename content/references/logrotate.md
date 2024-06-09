---
date: 2024-01-08
tags:
  - linux
url: https://www.phind.com/search?cache=e56vydsylls97iye7hcfexa7
---
`logrotate` is a Linux utility designed to ease the administration of systems that generate large numbers of log files. It allows automatic rotation, compression, removal, and mailing of log files. Each log file may be handled daily, weekly, monthly, or when it grows too large [Source 0](https://linux.die.net/man/8/logrotate#:~:text=logrotate%20is%20designed%20to%20ease).

The primary purpose of `logrotate` is to manage the lifecycle of log files, ensuring they do not fill up the entire filesystem. When a log file reaches a certain size, `logrotate` renames it by appending a timestamp or sequence number, creates a new file with the original name, and continues writing to the new file. It can also compress the old log file, archive it, or even delete it, depending on the configuration [Source 2](https://www.redhat.com/sysadmin/setting-logrotate), [Source 4](https://www.crowdstrike.com/cybersecurity-101/observability/log-rotation/).

By default, `logrotate` operates as a daily cron job. This means it checks all configured log files and performs any necessary actions based on the conditions defined in its configuration files. The main configuration file is located at `/etc/logrotate.conf`, and additional configuration files can be added to the `/etc/logrotate.d/` directory for specific applications [Source 2](https://www.redhat.com/sysadmin/setting-logrotate).

```shell
[rooty@dnet ~]$ cat /etc/logrotate.conf
# see "man logrotate" for details
# rotate log files weekly
weekly
# keep 4 weeks worth of backlogs
rotate 4
# create new (empty) log files after rotating old ones
create
# use date as a suffix of the rotated file
dateext
# uncomment this if you want your log files compressed
#compress
# RPM packages drop log rotation information into this directory
include /etc/logrotate.d
# no packages own wtmp and btmp -- we'll rotate them here
/var/log/wtmp {
	monthly
	create 0664 root utmp
	minsize IM
	rotate 1
}

/var/log/btmp {
	missingok
	monthly
	create 0600 root utmp
	rotate 1
}
# system-specific logs may be also be configured here.
```

In summary, `logrotate` is a valuable tool for managing log files in Linux systems, helping to ensure that logs do not consume excessive disk space and that they are easily accessible for troubleshooting purposes.