---
title: Effective CMake 
description: Better CMake for C++ Cross-Platform Development
date: August 08, 2020
---


## Introduction

In today's software landscape, building applications that run seamlessly across multiple platforms is often crucial. However, using a language that doesn't natively support cross-platform capabilities can pose significant challenges. This is where **CMake** comes into play. CMake is a powerful, open-source tool designed to simplify the complexity of managing builds in a multi-platform environment. While its extensive functionalities can be daunting to newcomers, mastering CMake can greatly enhance the efficiency and reliability of your build processes. In this article, we'll explore effective practices for using CMake, enriched with relevant code snippets to guide you through common scenarios.

## Motivation

Developing cross-platform applications involves numerous considerations from the onset, including library dependencies, packaging, and implementation details. CMake aims to simplify these complex tasks. However, its intricacies can make it challenging for developers to leverage its full potential. After numerous trials with different build environments, I discovered a valuable resource detailing effective CMake practices. While late to this knowledge, it underscored the importance of thorough initial research when adopting new tools and technologies. I recommend watching Daniel Pfeifer's enlightening talk, [C++Now 2017: "Effective CMake"](https://www.youtube.com/watch?v=bsXLMQ6WgIk), for additional insights.

## Key Concepts and Code Snippets

### Core Syntax and Variables

Variables in CMake are fundamental. They are used to store values, and understanding how to define and access them is crucial:

```cmake
set(hello "world")
message(STATUS "Value of hello is: ${hello}")
```

- **Definition:** Use `set()` to define a variable.
- **Access:** Employ `${}` to retrieve the variable's value.

### Comments

Comments are essential for maintaining readability in any script:

```cmake
# This is a single line comment in CMake
```

Use the `#` symbol to add comments and document your CMake scripts.

### Generator Expressions

Generator expressions are evaluated at build time, allowing for dynamic configuration:

```cmake
target_compile_definitions(foo PRIVATE
    "VERBOSITY=$<IF:$<CONFIG:Debug>,30,10>"
)
```

- **Usage:** The syntax `$<>` facilitates conditional statements within build rules.

### Functions and Macros

Create reusable logic with functions and macros, making your scripts more modular:

#### Function

```cmake
function(my_command input output)
    # Define a function
    set(${output} "Hello from ${input}" PARENT_SCOPE)
endfunction()

my_command(foo greet)
message(STATUS "Output from function: ${greet}")
```

- **Scope:** Functions have their own scope and require `PARENT_SCOPE` to modify global variables.

#### Macro

```cmake
macro(my_command input output)
    # Simple text replacement
    set(${output} "Hi from macro ${input}")
endmacro()

my_command(foo say_hello)
message(STATUS "Output from macro: ${say_hello}")
```

- **No scope:** Macros do not introduce a new scope, making them suitable for straightforward text replacement tasks.

### Targets and Properties

The concept of targets and properties is central to modern CMake usage:

```cmake
add_library(Foo foo.cpp)
target_link_libraries(Foo PRIVATE Bar::Bar)

if(WIN32)
    target_sources(Foo PRIVATE foo_win32.cpp)
    target_link_libraries(Foo PRIVATE Bar::Win32Support)
endif()
```

- **Modification:** Platform-specific changes can be managed through conditional logic, enhancing flexibility.

### Linking Libraries

Manage dependencies effectively by using `target_link_libraries()`:

```cmake
target_link_libraries(Foo
    PUBLIC Bar::Bar
    PRIVATE Cow::Cow
)
```

- **PUBLIC/PRIVATE:** These keywords help define how linked dependencies affect other targets.

### Interface Libraries

For header-only libraries or pure usage requirements, interface libraries are ideal:

```cmake
add_library(Bar INTERFACE)
target_compile_definitions(Bar INTERFACE BAR=1)
```

- **Usage Requirements:** Interface libraries don't have build specs, only requirements.

### Package Management

Efficiently manage third-party dependencies:

```cmake
find_package(Foo 2.0 REQUIRED)
target_link_libraries(App Foo::Foo)
```

- **Finding Packages:** The `find_package()` function is key to incorporating external libraries, ensuring they're correctly linked to your project.

### Exporting Library Interfaces

Export your project's interfaces so other projects can use them:

```cmake
install(TARGETS Foo EXPORT FooTargets
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
    RUNTIME DESTINATION bin
    INCLUDE DESTINATION include
)

install(EXPORT FooTargets
    FILE FooTargets.cmake
    NAMESPACE Foo::
    DESTINATION lib/cmake/Foo
)

include(CMakePackageConfigHelpers)
write_basic_package_version_file("FooConfigVersion.cmake"
    VERSION ${Foo_Version}
    COMPATIBILITY SameMajorVersion
)

install(FILES "FooConfig.cmake" "FooConfigVersion.cmake"
    DESTINATION lib/cmake/Foo
)
```

Ensure your library's interface is correctly exported so other developers can easily integrate it.

## Conclusion

CMake is an indispensable tool for developing cross-platform applications. By grasping its syntax, understanding targets and properties, and mastering package management, you can streamline your build process and enhance your project's portability and maintainability. With the insights and code snippets provided in this article, you're equipped to harness the full power of CMake and navigate the complexities of cross-platform development with confidence.