---
date: 2024-06-12
tags:
  - programming
---
Referenced [Original Article from Joel on Software](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

# Summary
- **There Ain’t No Such Thing As Plain Text.** If you have a string, in memory, in a file, or in an email message, you have to know what encoding it is in or you cannot interpret it or display it to users correctly.
- **Encoding** is the process of putting a sequence of characters (letters, numbers, punctuation, and certain symbols) into a specialized format for efficient transmission or storage. Decoding is the opposite process
- **Unicode** is like ASCII, give letter to unique number(code). A is U+0041.

## Notes
- ASCII code was for 0-127 in 1 bytes, lots of people used 128-255 code with their own idea (a.k.a. code pages)
- Unicode can be written in different endianess. So Unicode **Byte Order Mark(BOM)** needed.
- UTF8 is asccii code with variable length bytes for other codes. 
- UTF8 can have BOM but not required since it has always same endianess

# Quotes

## Intro
> So I have an announcement to make: if you are a programmer working in 2003 and you don’t know the basics of characters, character sets, encodings, and Unicode, and I catch you, I’m going to punish you by making you peel onions for 6 months in a submarine. I swear I will.
> And one more thing:
> **IT’S NOT THAT HARD.**

> In this article I’ll fill you in on exactly what every working programmer should know. All that stuff about “plain text = ascii = characters are 8 bits” is not only wrong, it’s hopelessly wrong, and if you’re still programming that way, you’re not much better than a medical doctor who doesn’t believe in germs. Please do not write another line of code until you finish reading this article.

## A Historical Perspective
> Eventually this OEM free-for-all got codified in the ANSI standard. In the ANSI standard, everybody agreed on what to do below 128, which was pretty much the same as ASCII, but there were lots of different ways to handle the characters from 128 and on up, depending on where you lived. These different systems were called code pages. So for example in Israel DOS used a code page called 862, while Greek users used 737. They were the same below 128 but different from 128 up, where all the funny letters resided.

> Because bytes have room for up to eight bits, lots of people got to thinking, “gosh, we can use the codes 128-255 for our own purposes.” The trouble was, lots of people had this idea at the same time, and they had their own ideas of what should go where in the space from 128 to 255.

> Programmers were encouraged not to use s++ and s– to move backwards and forwards, but instead to call functions such as Windows’ AnsiNext and AnsiPrev which knew how to deal with the whole mess.

## Unicode
> Every platonic letter in every alphabet is assigned a magic number by the Unicode consortium which is written like this: U+0639.  This magic number is called a code point. The U+ means “Unicode” and the numbers are hexadecimal. U+0639 is the Arabic letter Ain. The English letter A would be U+0041. You can find them all using the charmap utility on Windows 2000/XP or visiting the Unicode web site.

## Encodings
> in fact, early implementors wanted to be able to store their Unicode code points in high-endian or low-endian mode, whichever their particular CPU was fastest at, and lo, it was evening and it was morning and there were already two ways to store Unicode. So the people were forced to come up with the bizarre convention of storing a FE FF at the beginning of every Unicode string; this is called a Unicode Byte Order Mark and if you are swapping your high and low bytes it will look like a FF FE and the person reading your string will know that they have to swap every other byte. Phew. Not every Unicode string in the wild has a byte order mark at the beginning.
 
> But those Californian wimps couldn’t bear the idea of doubling the amount of storage it took for strings, and anyway, there were already all these doggone documents out there using various ANSI and DBCS character sets and who’s going to convert them all? Moi? For this reason alone most people decided to ignore Unicode for several years and in the meantime things got worse.
> Thus was invented the brilliant concept of UTF-8.

> In UTF-8, every code point from 0-127 is stored in a single byte . Only code points 128 and above are stored using 2, 3, in fact, up to 6 bytes.This has the neat side effect that English text looks exactly the same in UTF-8 as it did in ASCII, so Americans don’t even notice anything wrong.

## The Single Most Important Fact About Encodings
> If you completely forget everything I just explained, please remember one extremely important fact. It does not make sense to have a string without knowing what encoding it uses.
 
> **There Ain’t No Such Thing As Plain Text.**
> 
> If you have a string, in memory, in a file, or in an email message, you have to know what encoding it is in or you cannot interpret it or display it to users correctly.
 
> But that meta tag really has to be the very first thing in the `<head>` section because as soon as the web browser sees this tag it’s going to stop parsing the page and start over after reinterpreting the whole page using the encoding you specified.
