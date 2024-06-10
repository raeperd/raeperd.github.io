---
tags:
  - bug
  - linux
date: 2024-01-08
url: https://kakaoenterprise.agit.in/g/300015037/wall/394643891?ir=false&l=agit_user_mentioned_v3&sid=394643891&tid=300061811&ts=1704693447
---
- [nohup](nohup.md)을 그냥 실행하면 디스크 full이 될 수도 있다
- [logrotate](logrotate.md)를 사용하면 사이즈 문제와 log rotation 문제를 한번에 해결할 수 있다

## How to limit size of nohup.out in linux

To limit the size of `nohup.out` in Linux, you can use either the `logrotate` utility or a custom script.

1. **Using logrotate:**
  Logrotate is a system utility designed specifically to manage the automatic rotation, compression, removal, and mailing of log files. It is typically installed by default on most Linux distributions.
  
  You can specify the size limit and how many rotations you want in `/etc/logrotate.conf`. Here is an example configuration:

  ```bash
  /path/to/your/nohup.out {
          size 1k
          rotate 4
  }
  ```
  In this example, `logrotate` will run only if the filesize is equal to (or greater than) 1 kilobyte. The `rotate 4` directive limits the number of log file rotations, so this would keep only the recent 4 rotated log files. After setting up the configuration, run `logrotate /etc/logrotate.conf` to apply the changes [Source 0](https://stackoverflow.com/questions/34139561/how-to-limit-size-of-nohup-out-logs).

2. **Using a custom script:**
  If you cannot stop the currently running script, you can use a custom script to limit the size of `nohup.out`. This script will run in the background, checking the size of `nohup.out` every 60 seconds. If the size exceeds a certain limit (e.g., 10KB), it will create a copy of `nohup.out`, clear its contents, and increment a counter.

  Here is an example of such a script:

  ```bash
  nohup sh -c 'COUNTER=1; while true; do SIZE=$(stat --printf="%s" nohup.out); if [ $SIZE -gt 10000 ]; then cp nohup.out "nohup$COUNTER.out"; echo "" > nohup.out; COUNTER=$((COUNTER + 1)); fi; sleep 60; done' >/dev/null 2>&1 &
  ```
  This script will create a backup of `nohup.out` if it's larger than 10KB and truncate `nohup.out` for new output [Source 0](https://stackoverflow.com/questions/34139561/how-to-limit-size-of-nohup-out-logs).
