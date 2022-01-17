---
title: Process
date: 2019-07-27
tags: [os]
---

- 프로세스는 실행중인 파일에 대한 추상화다.
- 하나의 CPU는 한 순간에 하나의 프로세스 만을 실행한다.
- 모든 프로세스는 각자의 스택을 가지고 있다.

## The Process Model

- 시스템을 이해하기 위해서는 여러 프로세스가 병렬적으로 실행된다고 생각하는 것보다 CPU가 어떻게 프로세스 단위로 Context Switching 을 하는지 따라가는 것이 좋을 것이다.
- 이런 전환들을 multiprogramming 이라고 한다.
- 프로세스는 프로그램과 입력, 출력과 상태를 가지고 있는 활동이다.
- 프로그램은 반면에 디스크에 저장되어 있는 어떤 것으로 아무런 활동을 하지 않는다.

## Process Creation

프로세스가 생성되는 경우 

1. 시스템 초기화 
2. 실행중인 프로세스에 의한 프로세스 생성 시스템 콜
3. 유저의 요청 
4. batch 작업의 초기화

- **daemons**: 백그라운드에서 어떤 활동을 처리하기 위해 대기중인 프로세스
- 자식 프로세스는 부모로 부터 생성된 이후 독립적인 주소 공간을 가진다. 
- 곧, 어떤 메모리도 공유하지 않는다. 

## Process Termination
1. Normal Exit (자발적)
2. Error Exit (자발적)
3. Fatal Error
    - 프로그램의 에러에 의한 종료
4. Killed by another process

## Process Hierarchies
- 프로세스는 오직 하나의 부모만을 가진다. (리눅스)
- 모든 프로세스는 동등한 계층 구조를 가진다 (윈도우) (우선순위를 말하는 것이 아님)

## Process State
![](https://i.imgur.com/Ncg9X5o.png)
- 프로세스는 독립적인 것으로 보이지만 가끔 자원을 공유할 필요가 있다.
- IO Handling: 1→ 4 → 3

## Implementation of Process
### Elements of process table entry
- 프로세스 모델을 구현하기 위해서 운영체제는 프로세스 테이블을 유지한다.
- Process Management 
	- Registers
	- Program Counter
	- Program Status Word
	- Stack Pointer
	- Process State
	- Priority
	- Scheduling parameters
	- Process ID
	- Parent Process
	- Process group
	- Signals
	- Time when process started
	- CPU time used
	- Childeren's CPU time
	- Time of next alarm
- Memory Management 
	- Pointer to text segment information
	- Pointer to data segment information
	- Pointer to stack segment information
- File Management
	- Root Directory
	- Working Directory
	- File Descriptors
	- User ID
	- Group ID

### 프로세스가 인터럽트를 거치는 과정
1. Hardware stacks program counter, etc.
2. Hardware loads new program counter from interrupt vector.
3. Assembly-language procedure saves registers.
4. Assembly-language procedure sets up new stack.
5. C interrupt service runs.(typically reads and buffers input)
6. Scheduler decides which process is to run next.
7. C procedure returns to the assembly code.
8. Assembly-language procedure starts up new current process

#### **Interrupt Vector** 
- 인터럽트 서비스 과정의 주소를 가지고 있음 

## Modeling Multiprogramming

![](https://i.imgur.com/qo7dmXK.png)

- 싱글 코어에서 여러 프로세스가 동시에 실행될 수 없기 떄문에, 엄밀하게 따지면 프로세스는 독립적이지 않다.
- 메모리를 늘리는 것으로 CPU의 사용도가 올라가지만 증가율은 감소한다.