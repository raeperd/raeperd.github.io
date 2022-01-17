---
title: Mastering the Vim As Language
tags: [vim, programming]
cover:
  image: https://i.imgur.com/wOOHfce.jpg
date: 2021-11-28
---

# Mastering the Vim Language

Vim's killer feature is the language it provides for making changes

## Syntax of the Language

- Verb + Noun
- `d` for delete (Verb)
- `w` for word (Noun)
- Combined to be "delete word"

## Commands are Repeatable & Undoable

- Use `.` to repeat operation
- Undoing is also possible. It operates like atomic operation

### Verbs in Vim

The operation you want to take on the text

- `d` delete
- `c` change (delete and enter insert mode)
- `>` indent
- `v` visually select
- `y` Yank (copy)

### Nouns in Vim

#### Motions

- `w` word (forward by a "word")
- `b` back (back by a "word")
- `2j` down 2 lines

#### Text Objects

- `iw` inner word (works from anywhere in a word)
- `it` inner tag (the contents of HTML tag)
- `i"` inner quotes
- `ip` inner paragraph
- `as` a sentence

#### Parameterized Text Objects

- `f`, `F` "find" the next character
- `t`, `T` "find" the next character (exclusive)
- `/` Search (up to next match)

## Combinations of Commands

- Distinct commands based on memorizing ~30 key mappings
- Memorize Verb and Noun separately

### Tips for Mastering the Language

- The `.` command
- Use the more general text objects (`iw` rather than `w` even if at beginning of word)
- Prefer text objects to motions when possible
- [tpope/vim-repeat: repeat.vim: enable repeating supported plugin maps with "."](https://github.com/tpope/vim-repeat) for plugin repeating
- Use Relative number
- Visual Mode is a Smell
  - Don't use tow sentences where one will due
  - Breaks repeatability

# Reference
1. [Mastering the Vim Language - YouTube](https://www.youtube.com/watch?v=wlR5gYd6um0)
2. [Learning Vim in 2014: Vim as Language | benmccormick.org](https://benmccormick.org/2014/07/02/learning-vim-in-2014-vim-as-language)
3. [Vim Text Objects: The Definitive Guide](https://blog.carbonfive.com/vim-text-objects-the-definitive-guide/)
4. [Vim’s Big Idea. Learning the lesson of vi | by Mike Kozlowski | Medium](https://medium.com/@mkozlows/why-atom-cant-replace-vim-433852f4b4d1)
5. [vi - What is your most productive shortcut with Vim? - Stack Overflow](https://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118)
6. [How To Enable Relative Line Numbers With IdeaVim – IDEs Support (IntelliJ Platform) | JetBrains](https://intellij-support.jetbrains.com/hc/en-us/community/posts/360008429240-How-To-Enable-Relative-Line-Numbers-With-IdeaVim)
