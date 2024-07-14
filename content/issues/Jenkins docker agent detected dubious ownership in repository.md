---
date: 2024-07-12 17:17
tags:
  - jenkins
  - docker
---
## Issue
- Running jenkins with docker compose, using Multibranch-pipeline found issue during repository checkout
- `JENKINS_HOME` was mounted on docker volume

```
root@15136bec94a9:/var/jenkins_home/workspace/some-service# git pull
fatal: detected dubious ownership in repository at '/var/jenkins_home/workspace/some-service'
To add an exception for this directory, call:

	git config --global --add safe.directory /var/jenkins_home/workspace/some-service
```

## Solution
Found Two solution

### 1. mount /root/.gitconfig in docker-compose
According to this [comment in github](https://github.com/jenkinsci/helm-charts/issues/728#issuecomment-1584668214)
> `git config --global --add safe.directory "*"`
> You can run this command within any git repository on the Jenkins master.
> 
> Alternatively, you can achieve the same effect by creating a ~/.gitconfig file with the following content:
> 
> ```
> [safe]
> 	directory = *
> ```

This works, but mounting `.gitconfig` into jenkins master, this affects all workflows in jenkins that checking out repository. And ignoring git's safety feature also not seem to be great solution

### 2. chown -R <current_user> <repo_folder>
Inside jenkins docker container, run following commands
```
chown -R $(whoami) /var/jenkins_home
```

This was right answer. after I migrated jenkins server there was somewhat ambiguity of directory ownership of jenkins_home backup directory. This was root cause of problem for my case. After jenkins user has ownership of that repository entirely issue never happened again.

One caveat is that `JENKINS_HOME` directory mounted by host path is not accessible from outside of container. But that is desired situation for various security issues
