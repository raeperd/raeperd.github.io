---
title: Fix the not wrapped in act warning
tags: [ react, bug ]
date: 2021-12-21
---

# Fix the not wrapped in act warning
- Component depends on promise results has to be handled with special functions like `mockResolveValueOnce`, `waitFor`, 
- Add `async` in jest test function 
- React testing library cannot this for any code running outside of it's own callstack 
- `renderHook` for testing custom hooks

# Reference
1. [Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning) 
