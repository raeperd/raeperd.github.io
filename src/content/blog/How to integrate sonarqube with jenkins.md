---
title: How to integrate sonarqube with jenkins
description: with minimal settings
date: August 10, 2022
---

1. Install [SonarQube Scanner plugin](https://plugins.jenkins.io/sonar/) in jenkins
2. Sonar Server > Administration > Security > Users > Token > Update Tokens > Generate
3. Manage Jenkins > Configure System > SonarQube Servers
	- Check Environment variables injection
	- Add Sonarqube installations with Server authentication 
		- Kind: Secret text, Secret: token generated in step 2
4. Configure Jenkinsfile with `withSonarQubeEnv` step

``` groovy
node {
  stage('SCM') {
    git 'https://github.com/foo/bar.git'
  }
  stage('SonarQube analysis') {
    withSonarQubeEnv() { // Will pick the global server connection you have configured
      sh './gradlew sonarqube'
    }
  }
}
```
- Referenced from [SonarScanner for Jenkins | SonarQube Docs](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-jenkins/)

5. Sonar Server > Administration > Configuration > Webhook 
	- URL: `http://jenkins:8080/sonarqube-webhook` Secret to be empty
6. Update Jenkinsfile with following

```groovy
pipeline {
  agent { label 'linux' }
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  stages {
    stage('SonarQube analysis') {
    withSonarQubeEnv() { // Will pick the global server connection you have configured
      sh './gradlew sonarqube'
    }
  }
    stage("Quality Gate") {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
```


# Reference
1. [How to Integrate SonarQube With Jenkins - YouTube](https://www.youtube.com/watch?v=KsTMy0920go)
2. [java-web-app/Jenkinsfile-2 at sonar · darinpope/java-web-app](https://github.com/darinpope/java-web-app/blob/sonar/Jenkinsfile-2)
3. [SonarScanner for Jenkins | SonarQube Docs](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-jenkins/)