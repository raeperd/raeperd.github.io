---
title: Thread
date: 2019-07-27
tags: [os]
---

## Thread Usage
- 한 프로세스 내에 주소공간과 모든 자원을 공유하는 병렬적 실행 주체
- 프로세스 보다 쉽게 만들고 없앨 수 있다.
- 실제로 병렬과정이 가능한 멀티 프로세서 환경에서 효과가 좋음
- **Dispatcher thread**: 메인 쓰레드
- **Worker thread:**: 일하는 쓰레드

| Model | Characteristics |
| --- | --- |
| Threads | Parallelism, blocking system calls |
|  Single-threaded process | No parallelism, blocking system calls |
| Finite-state machine | Parallelism, nonblocking system calls, interrupts |

## The Classical Thread Model
- 프로세스 모델은 resource grouping과 execution의 두 독립적 개념에 기반해 만들어 졌다.
- 프로새스는 자원을 모아둔 그룹이고, 스레드들은 CPU의 실행을 위해 스케쥴된 엔티티다.

![](https://i.imgur.com/8TCC3KD.png)
- 한 프로세스 내의 쓰레드는 모든 자원을 공유한다.
- 한 프로세스 내의 쓰레드는 공동의 목표를 가지고 협업한다.

### Items per process and thread
#### Per-process items 
- Address space
- Global variables 
- Open files
- Child processes
- Pending alarms
- Signals and signal handlers
- Accounting information 

#### Per-thread items
- Program counter 
- Registers
- Stack
- State
- 쓰레드간의 전환이 일어날때, 프로세스가 전환 될 때와 마찬가지로 이전 상태를 저장할 필요가 있고 그래서 스택과 레지스터, 프로그램 카운터가 필요하다
- 최초의  Dispatcher Thread는 라이브러리 콜을 통해 새로운 쓰레드를 만든다.
- 쓰레드의 생성과 소멸은 프로세스의 생성 소멸과 비슷하게 동작한다.
- **Multithreading:**: 같은 프로세스 내에서 여러 쓰레드를 허용하는 상황

##  POSIX Threads
| Thread call | Description | 
| --- | --- |
| Ptread_create | Create a new thread | 
| Ptread_exit | Terminate the calling thread | 
| Ptread_join | Wait for a specific threat to exit | 
| Ptread_yield | Release the CPU to let another thread run | 
| Ptread_attr_init | Create and initialize a thread's attribute structure | 
| Ptread_attr_destroy | Remove a thread's attribute structure | 
- `Pthread_yield` 가 중요하다. 프로세스와 달리 clock_interrupt 가 없기 때문에 다른 쓰레드에게 CPU 자원을 양보를 잘 해줘야한다.

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#define NUMBER OF THREADS 10
void *pr int hello world(void *tid)
{
	/* This function prints the thread’s identifier and then exits. */
	printf("Hello World. Greetings from thread %d\n", tid);
	pthread exit(NULL);
}
int main(int argc, char *argv[])
{
	/* The main program creates 10 threads and then exits. */
	pthread t threads[NUMBER OF THREADS];
	int status, i;

	for(i=0; i < NUMBER OF THREADS; i++) {
		pr intf("Main here. Creating thread %d\n", i);
		status = pthread create(&threads[i], NULL, print hello world, (void *)i);
		
		if (status != 0) {
			printf("Oops. pthread create returned error code %d\n", status);
			exit(-1);
		}
	}
exit(NULL);
}
```
- code만 보고 실행순서는 알 수 없다. 1main, 10worker 이긴 하네

##  Implementing Threads in User Space
![](https://i.imgur.com/eyK0VP8.png)
- User-level Threads Package
    - context swtiching 을 직접 구현
    - 커널이 관리하는 것 보다 퍼포먼스에서 이득을 볼 수 있음
        - 메모리, 캐시가 초기화 될 필요가 없음
    - 쓰레드가 IO ⇒ 프로세스가 IO ⇒ Process Blocked
    - 쓰레드가 CPU를 양보하지 않으면 다른 쓰레드가 동작하지 못한다.
    - 프로그래머는 보통 쓰레드 블락이 많이오는 상황에서 쓰레드의 사용을 원한다.
    - 커널은 쓰레드의 존재를 모른다.
- Kernel-level Threads
    - 커널이 쓰레드 테이블을 가지고 시스템 내에서 이들을 추적한다.
    - Overhead
    - 쓰레드를 재활용 할 수 있다.
    - 프로세스가 시그널을 받으면 어떤 프로세스가 응답하나?

##  Hybrid Implementation
![](https://i.imgur.com/6pAznXh.png)
- 장점만 뽑아먹자.

## Scheduler Activation
###   Pop-Up Threads
![](https://i.imgur.com/8ZBjqA4.png)
- Pop-Up thread를 커널에 적용하는 것이 두는 것이 쉽고 빠르다.
- 쓰레드의 버그가 OS에 영향을 미칠 수 있다.

##  Making Single-Threaded Code Multithreaded
![](https://i.imgur.com/1eJN88l.png)
- parameter나 지역변수는 큰 문제가 안되는데 쓰레드에게는 전역이지만 전체 프로그램에서는 그렇지 않은 변수들이 문제다.

![](https://i.imgur.com/ypfGFXG.png)
- 여튼 문제임