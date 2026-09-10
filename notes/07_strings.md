# Strings

> A string is a sequence of characters — text. Strings are used everywhere (names, messages, files, web data), so know indexing, slicing, and the key methods well.

---

## 1. Creating Strings

```python
s1 = "hello"          # double quotes
s2 = 'hello'          # single quotes — identical
s3 = """multi
line text"""          # triple quotes: multi-line strings
```

**Strings are immutable** — once created, they can't be changed. Every "modification" method returns a *new* string.

```python
name = "Ravi"
name[0] = "K"     # ❌ TypeError: strings do not support item assignment
```

---

## 2. Indexing

Each character has a position. Indexing starts at **0**, and negative indices count from the end.

```python
s = "Python"
# P  y  t  h  o  n
# 1  2  3  4  5
# -6 -5 -4 -3 -2 -1

print(s[0])      # P
print(s[5])      # n
print(s[-1])     # n   (last character — very handy)
print(s[-2])     # o
```

`len()` gives the length: `len("Python")` → `6`.

---

## 3. Slicing

Extract a part of a string: `s[start:stop:step]` — **start included, stop excluded**.

```python
s = "Python"

print(s[0:3])     # Pyt      (index 0,1,2)
print(s[2:])      # thon     (from index 2 to end)
print(s[:3])      # Pyt      (from start to index 2)
print(s[:])       # Python   (full copy)
print(s[::2])     # Pto      (every 2nd character)
print(s[::-1])    # nohtyP   (reverse — classic trick!)
```

Slicing never raises an error for out-of-range indices — it just gives what's available.

---

## 4. String Methods

Methods return **new strings** (original is untouched).

### .upper() / .lower()

These convert the whole string to uppercase / lowercase. Remember: the original string is **not** changed — you get a new string back.

```python
msg = "Hello World"
print(msg.upper())       # HELLO WORLD
print(msg.lower())       # hello world
print(msg)               # Hello World — unchanged!
```

Great for case-insensitive comparisons:

```python
answer = input("Quit? (yes/no): ")
if answer.lower() == "yes":
    print("Bye!")
```

### .strip() — remove whitespace from both ends

Users often type extra spaces by accident (`"  Ravi  "`). `.strip()` removes whitespace (spaces, tabs, newlines) from both ends. It's good habit to strip almost every `input()`.

```python
raw = "   hello   "
print(raw.strip())        # "hello"

name = input("Name: ").strip()     # clean up user input
```

Also `lstrip()` (left only) and `rstrip()` (right only).

### .replace()

Replaces **every** occurrence of one substring with another, and returns a new string.

```python
text = "I like tea"
print(text.replace("tea", "coffee"))   # I like coffee
```

### .split() — string → list

Splits on a separator (default: whitespace).

```python
sentence = "Python is awesome"
words = sentence.split()               # ['Python', 'is', 'awesome']

csv_line = "Ravi,21,Nashik"
parts = csv_line.split(",")            # ['Ravi', '21', 'Nashik']
```

### .join() — list → string

The reverse of split. Syntax: `separator.join(list)`.

```python
words = ["Python", "is", "awesome"]
print(" ".join(words))        # Python is awesome
print("-".join(words))        # Python-is-awesome
print(", ".join(["a","b"]))   # a, b
```

### Other useful methods

A quick tour — each returns a new value and never changes the original. You don't need to memorize these; just know they exist so you can search for them when needed.

```python
txt = "hello world"

txt.startswith("hello")   # True
txt.endswith("rld")       # True
txt.find("world")         # 6  (index of first match; -1 if not found)
txt.count("l")            # 3

"abc123".isdigit()        # False
"123".isdigit()           # True
"hello".isalpha()         # True
"hello world".title()     # Hello World
"hello world".capitalize()# Hello world
" hi ".center(10, "-")    # --- hi ---
```

---

## 5. f-strings with Strings (recap)

F-strings work great with strings too. Inside `{ }` you can even add alignment codes like `:<10` (left-align in a column of width 10) — useful for printing neat tables.

```python
name, score = "Ravi", 87
print(f"{name} scored {score} marks")
print(f"Name: {name:<10} | Score: {score}")   # padding/alignment
```

---

## 6. Common Patterns

These three show up constantly in real code. Notice the first one: methods can be **chained** — each returns a string, so the next method just continues.

```python
text = "  Hello, World!  "

# clean → transform → split, a typical pipeline:
words = text.strip().lower().split()     # ['hello,', 'world!']

# loop over characters
for ch in "abc":
    print(ch)

# check membership
if "World" in "Hello World":
    print("found")
```

---

## Quick Revision

- Strings are **immutable**; methods return new strings.
- Indexing from 0; `s[-1]` = last character.
- Slicing `s[start:stop]` — stop excluded; `s[::-1]` reverses.
- `.strip()` cleans input; `.split()` → list; `",".join(list)` → string.
- `.upper()/.lower()` for case-insensitive comparisons.

### Practice
1. Take a word and print it reversed using slicing.
2. Count the number of vowels in a sentence.
3. Take a full name, `.strip()` it, and print it in title case.

✅ Next → **09-lists.md**
