---
title: Timezone error on k8s cronjob
description: need config for timezone
date: June 10, 2024
---

## Issue
Found issue on timezone error. Cron expression on CronJob yaml file and pod can have different timezone.

## Solution
1. Add tzdata on alphine linux docker image 
2. Add environment variable `TZ` in cronjob's yaml file 

### dockerfile example
```dockerfile 
FROM golang:1.22-alpine3.19 as builder
WORKDIR /src
COPY . /src
RUN go build -C cmd/app -o app

FROM golang:1.22-alpine3.19
RUN apk add --no-cache tzdata
COPY --from=builder /src/cmd/app /bin/app
CMD ["/bin/app"]
```

### cronjob yaml example
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  namespace: service
  name: connector
  labels:
    app: connector
spec:
  schedule: "0 7 * * 1-5"
  jobTemplate:
    metadata:
      labels:
        app: connector
    spec:
      template:
        spec:
          containers:
          - name: connector
            image: connector:v1
            # imagePullPolicy: Always
            env: 
              - name: TZ
                value: Asia/Seoul
            command: ["/bin/sh"]
            args:
              - -c
              - 'app --partition=$(($(date +%u) - 1))'
          restartPolicy: OnFailure
```

### docker run example
```sh
$ docker run -e TZ=Asia/Seoul connector:v1
```

## Referenced
- [dockerfile - How to set timezone inside alpine base docker image? - Stack Overflow](https://stackoverflow.com/questions/68996420/how-to-set-timezone-inside-alpine-base-docker-image)
