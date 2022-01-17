---
title: Operating System Introduction
date: 2019-07-27
tags: [os]
---

# Motivation
- 운영체제의 역할을 사용자 프로그램에게 더 간단하고 깨긋한 인터페이스를 제공하고, 하드웨어 자원들을 관리하는 것이다.
- 다른 프로그램과 다르게, 운영체제의 일부를 사용자가 변경할 수 없다.

### kernel mode (or supercisor mode)
- 이 모드에서 운영체제는 모든 하드웨어에 대한 완전한 접근이 가능하고, 프로세서가 수행할 수 있는 모든 명령을 시행할 수 있다.

### user mode
- 이 모드에서는 오직 명령의 일부분만을 사용할 수 있다. 

# 1.1 WHAT IS AN OPERATING SYSTEM?

## 1.1.1 The operating system as an Extended machine
- 운영체제의 역할을 사용자에게 좋은 추상화를 제공하고 그 추상화된 객체들을 잘 관리하는 것이다.
- 사용자에게 제공되는 인터페이스는 GUI로부터 다시한번 추상화 된 인터페이스다.

### disk driver
- 실제로 하드웨어를 다룸. 디테일을 모르고도 사용할 수 있는, 디스크를 읽고 쓰는 인터페이스를 제공한다. 

### file
- 디스크 드라이버가 제공하는 인터페이스도 너무 low-level이다. 
- 그래서 모든 운영체제가 제공하는 다른 레벨의 추상화가 파일이다. 

## 1.1.2 The Operating system as a Resource manager
- 프로그램이 사용하는 리소스를 추적하고, 리소스의 요청과 빠른 사용 그리고 다른 프로그램으로 부터의 중복된 요청을 처리하는 것이다.
- 리소스를 관리하는 것에는 시간과 공간의 관점에서 리소스를 공유하는 것을 포함한다.
- its primary task is to keep track of which programs are using which resource, to grant resource requests, to account for usage, and to mediate conflicting requests from different programs and users.
- Resource management includes multiplexing (sharing) resources in two different ways: in time and in space.

# 1.3 COMPUTER HARDWARE REVIEW
## 1.3.1 Processors
- The brain of the computer
- fetch → decode → execute
- Because accessing memory to get an instruction or data word takes
- much longer than executing an instruction, all CPUs contain some registers inside to hold key variables and temporary results

### program counter:
- contains the memory address of the next instruction to be fetched

### stack pointer:
 - points to the top of the current stack in memory

### PSW(Program Status Word)
![](https://i.imgur.com/hReML9k.png)
- This register contains the condition code bits, which are set by comparison instructions, the CPU priority, the mode (user or kernel), and various other control bits.
- The PSW plays an important role in system calls and I/O. 

### Pipeline:
- Many modern CPUs have facilities for executing more than one instruction at the same time. For example, a CPU might have separate fetch, decode, and execute units, so that while it is executing instruction n, it could also be decoding instruction n + 1 and fetching instruction n + 2. Such an organization is called a pipeline

### Superscalar CPU
- Two or more instructions are fetched at once, decoded, and dumped into a holding buffer until they can be executed.
- An implication of this design is that program instructions are often executed out of order.
- To obtain services from the operating system, a user program must make a system call, which traps into the kernel and invokes the operating system.
- The TRAP instruction switches from user mode to kernel mode and starts the operating system.
- n all cases the operating system gets control and must decide what to do.

### Multithreaded and Multicore Chips
- The obvious next step is to replicate not only the functional units, but also some of the control logic.
- what it does is allow the CPU to hold the state of two different threads and then switch back and forth on a nanosecond time scale
- Multithreading does not offer true parallelism. Only one process at a time is running, but thread-switching time is reduced to the order of a nanosecond.

## 1.3.2 Memory
- Ideally a memory should be extremely fast, abundantly large, and dirt cheap. No current technology satisfies all of these goals, so a different approach s taken. 

![memory hierarchy](https://i.imgur.com/CtBkZoa.png)
- program must manage the registers themselves, in software

### cache:
- cache is mostly controlled by the hardware
- L1 cache is always inside the CPU and usually feeds decoded instructions into the CPU's execution engine.
- The difference between the L1 and L2 caches lies in the timing
- In any caching system, several questions come up fairly soon

    1. When to put a new item into the cache.
    2. Which cache line to put the new item in.
    3. Which item to remove from the cache when a slot is needed.
    4. Where to put a newly evicted item in the larger memory

### Main memory(RAM):
- All CPU requests that cannot be satisfied out of the cache go to main memory

### ROM:
- Unlike RAM, nonvolatile memory does not lose its contents when the power is switched off. ROM (Read Only Memory) is programmed at the factory and cannot be changed afterward. 

### Flash memory:
- which is also commonly used as the storage medium in portable electronic devices. 
- Flash memory is intermediate in speed between RAM and disk

### CMOS Memory:
- which is volatile. Many computers use CMOS memory to hold the current time and date.
- it are powered by a small battery, so the time is correctly updated, even when the computer is unplugged.
- The CMOS memory can also hold the configuration parameters, such as which disk to boot from.

## 1.3.3 Disks
![](https://i.imgur.com/eI6ua5z.png)
- 디스크가 느린 이유는 기계적인 동작을 포함하기 때문임
- SSD는 기계적인 동작이 없다.
- Virtual memory 를 이용해 실제보다 큰 메모리를 사용할 수 있다.
- 이 과정은 MMU 라는 CPU의 part로 물리주소와 가상주소를 실시간으로 매핑한다.

## 1.3.4 I/O device
- I/O devices generally consist of two parts: a controller and the device

### Controller:
- Controller는 device를 물리적으로 컨트롤하는 칩 혹은 칩들의 집합이다.
- 운영체제로 부터 command 를 입력받는다. 
- device를 컨트롤 하는 것은 복잡하기 때문에 controler는 운영체제에가 간단한 인터페이스를 제공해야한다. 
- 운영체제와 의사소통하기 위한 레지스터를 가지고 있다. 

### device:
- device는 꽤 간단한 인터페이스를 가지고 있는데, 뭐 할수 있는게 별거 없어서 그렇기도 하고 표준화를 하기위해서도 그렇다. 

### device driver:
- 각 device마다 controller가 다르기때문에 다른 sw가 필요하다. 이 때 controler와 대화하는 것이 device driver
- controller의 제작자가 지원하는 OS에 따른 device driver를 제공해야 한다. 
- 실행 되기 위해서는 운영체제 안에 들어가야 하는데, 그래야 kernel mode에서 실행 될 수 있기 때문이다. 세가지 방법이 있다.

1. kernel을 새로운 driver에 새로 연결하고 reboot
2. os에게 진입점을 만들어 드라이버가 필요하다고 알리고 reboot 
3. os가 새로운 reboot 없이 드라이버를 설치하고 실행하게 하는 방법

### device register:
- controler가 가지고 있는 register
- device register가 os의 주소공간에 매핑되어 메모리처럼 읽고 쓸 수 있게 할 수 있다. 
- 아니면, device register가 port 주소와 함께 특별한 IO port space에 지정 되기도 한다.

### Input ouput을 하는 세가지 방법
#### 1. busy writing
1. user program issues a system call
2. The driver then starts the I/O and sits in a tight loop continuously polling the device to see if it is done
3. When the I/O has completed, the driver puts the data (if any) where they are needed and returns
4. The operating system then returns control to the caller

- CPU가 device를 기다려야 한다.
- 그래서 다른 방법이 필요하다. 

![](https://i.imgur.com/0PVIG9O.png)

### 2. Interrupt를 이용한 방법
1. driver가 무엇을 할지 device register에 write 함으로써 controler에게 알린다. 
2. controller가 작업을 끝내면 특정 bus line을 이용해 interrupt controler 에게 신호를 전송한다.
3. interrupt controller가 이를 받아들일 준비가 됬다면, CPU chip의 pin을 통해 알린다. 
4. interrupt controller는 device number를 bus를 통해 CPU에게 전달한다. 이를 통해 CPU는 어떤 device가 읽기 위한 작업을 막 끝냈는지 알 수 있다. 
5. PC와 PSW를 스택에 넣고 커널 모드로 전환한다. interrupt vector를 통해 interrupt handler를 호출
6. handling 이후에 최근에 실행되던 명령으로 다시 return 한다. 

- **Interrupt vector:** device number를 메모리의 주소에 대응시켜 해당 device의 interrupt handler의 주소를 찾기 위해 사용 될 수 있다. 이를 interrupt vector라 한다. 
- **Interrupt handler:** Device driver의 일부분으로 device를 interrupting 한다.

### 3. DMA (Direct Memory Access)를 사용하는 방법:
- DMA는 CPU를 방해하지 않으면서 메모리와 컨트롤러 사이의 비트 플로우를 컨트롤 할 수 있는 하드웨어
- DMA의 작업이 끝나면 인터럽트를 일으켜 CPU가 알게 한다. 
- 인터럽트는 인터럽트 핸들링을 하고 있는 와중에도 발생할 수 있다.
- 그래서 CPU는 인터럽트를 막고 다시 재 활성화 시킬 수있다. 
- 인터럽트가 막힌 동안 여러 인터럽트가 쌓여있으면 정적인 우선순위에 따라 인터럽트를 핸들링하기 시작한다. 

## 1.3.5 Buses
### shared bus architecture:
- 여러 device가 데이터를 전송하는 와이어를 같이 쓰는 구조
- PCIe는 point to point 연결임 

### parallel bus architecture:
- 데이터를 여러 와이어에 동시에 보냄
- PCIe는 serial bus architecture를 사용했다. 
