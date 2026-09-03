# Python Strings — Notes

A **string** is text: an ordered sequence of characters, written inside quotes.

> **Why this matters** — Almost every program handles text: names, messages, file paths, user input, API responses. Strings are also the first *sequence* type you meet, so indexing and slicing here carry over directly to lists and tuples.

### The mental model

A string is an ordered row of characters, each with a position:

```text
  P    y    t    h    o    n
  ↑    ↑    ↑    ↑    ↑    ↑
  0    1    2    3    4    5     ← forward index
 -6   -5   -4   -3   -2   -1     ← negative index
```

Two things follow from this picture: you can reach any character by its position (**indexing**), and you can take a contiguous run of them (**slicing**).

---

## 1. Indexing

Indexing accesses a single character using square brackets.

### Basic indexing

```python
text = "Python"

print(text[0])
print(text[1])
print(text[5])
```

Output:

```text
P
y
n
```

> **Indexing starts at 0.** The first character is at index `0`, not `1`. This is the single most common source of beginner bugs.

### Index out of range

```python
text = "Python"

print(text[10])
```

Output:

```text
IndexError: string index out of range
```

`"Python"` has length 6, so the valid indices are `0`–`5`.

### Negative indexing

Negative indices count **from the end**:

```python
text = "Python"

print(text[-1])      # n  → last character
print(text[-2])      # o  → second from last
print(text[-6])      # P  → first
```

This is how you get the last character without knowing the length:

```python
name = "Mahesh"
print(name[-1])      # h
```

### `len()`

`len()` returns the number of characters:

```python
text = "Python"

print(len(text))          # 6
print(text[len(text) - 1])   # n  → last character
print(text[-1])           # n  → simpler
```

### The membership test

```python
text = "Python programming"

print("Python" in text)      # True
print("python" in text)      # False — case-sensitive
print("Java" not in text)    # True
```

### Iterating over a string

```python
for char in "Hi":
    print(char)
```

Output:

```text
H
i
```

---

## 2. Slicing

Slicing extracts a portion of a string.

### Basic syntax

```python
text[start:stop]
```

`start` is included; **`stop` is excluded**.

```python
text = "Python"

print(text[0:2])      # Py
print(text[1:4])      # yth
print(text[2:6])      # thon
```

Output:

```text
Py
yth
thon
```

> **Why `stop` is exclusive** — It makes `text[0:len(text)]` the whole string, and `text[a:b]` has length `b - a`. Consistent and easy to reason about once you accept it.

### Omitting start or stop

```python
text = "Python"

print(text[:3])       # Pyt  → from the beginning
print(text[3:])       # hon  → to the end
print(text[:])        # Python → the whole string (a copy)
```

### Negative slicing

```python
text = "Python"

print(text[-3:])      # hon  → last 3
print(text[:-3])      # Pyt  → everything except the last 3
print(text[-4:-1])    # tho  → from -4 up to (not including) -1
```

### Step

A third value sets the step size:

```python
text[start:stop:step]
```

```python
text = "Python"

print(text[::2])      # Pto  → every second character
print(text[1::2])     # yhn  → every second, starting at index 1
print(text[::3])      # Ph
```

### Reversing a string

This is the classic trick:

```python
text = "Python"

print(text[::-1])
```

Output:

```text
nohtyP
```

**How it works:** the default start is the beginning and the default stop is the end, but a step of `-1` makes Python walk backwards.

> **This is a common interview and exercise question.** `text[::-1]` is the idiomatic Python reverse.

### Out-of-range slices are safe

Unlike indexing, slicing never raises an error for out-of-range positions:

```python
text = "Python"

print(text[2:100])     # thon  → clamped to the end
print(text[50:100])    # (empty string)
```

### Slicing with a real example

```python
filename = "report_2026.pdf"

name = filename[:6]
year = filename[7:11]
extension = filename[-3:]

print(name, year, extension)
```

Output:

```text
report 2026 pdf
```

---

## 3. String Methods

A **method** is a function called on a value using dot notation.

```python
text.method()
```

Methods covered below: `.upper()`, `.lower()`, `.strip()`, `.replace()`, `.split()`, `.join()` — plus several more in the summary table.

> **Crucial point** — Strings are **immutable**: no method changes the original string. Every method **returns a new string**. You must assign the result.
>
> ```python
> text = "python"
> text.upper()          # computes "PYTHON" and throws it away
> print(text)           # python  ← unchanged
>
> text = text.upper()   # assign the result
> print(text)           # PYTHON
> ```

---

## 4. `.upper()`

Converts all characters to uppercase.

```python
text = "python"

print(text.upper())
```

Output:

```text
PYTHON
```

The original is unchanged:

```python
text = "python"
result = text.upper()

print(text)        # python
print(result)      # PYTHON
```

### Case-insensitive comparison

```python
answer = "YES"

if answer.upper() == "YES":
    print("Confirmed")
```

Output:

```text
Confirmed
```

This lets you accept "yes", "Yes", and "YES" with one check.

### Related methods

```python
print("python".capitalize())      # Python → first letter uppercase
print("python programming".title())   # Python Programming
print("Python".swapcase())        # pYTHON
```

---

## 5. `.lower()`

Converts all characters to lowercase.

```python
text = "PYTHON"

print(text.lower())
```

Output:

```text
python
```

### Normalising user input

```python
command = input("Continue? (yes/no): ")

if command.lower() == "yes":
    print("Continuing")
else:
    print("Stopping")
```

Lowercasing input before comparing makes your program forgiving of "YES", "Yes", and "yes".

### Case-insensitive search

```python
text = "Python Programming"

print("python" in text)                  # False
print("python" in text.lower())          # True
```

---

## 6. `.strip()`

Removes whitespace from the **beginning and end** of a string.

```python
text = "   Hello   "

print(text.strip())
```

Output:

```text
Hello
```

> **Why this matters** — Input read from a file or the user often carries stray spaces or a trailing newline. Stripping before comparing prevents bugs that are nearly invisible: `"yes\n" == "yes"` is `False`.

```python
name = input("Name: ")      # user types "  Mahesh  "
name = name.strip()         # "Mahesh"
```

### Variants

```python
text = "   Hello   "

print(text.lstrip())     # "Hello   "  → left side only
print(text.rstrip())     # "   Hello"  → right side only
print(text.strip())      # "Hello"     → both sides
```

### Stripping specific characters

`.strip()` accepts a set of characters to remove:

```python
text = "***Hello***"

print(text.strip("*"))      # Hello

price = "Rs. 500"
print(price.strip("Rs. "))  # 500
```

> **Note** — The argument is a *set of characters*, not a prefix or suffix. `strip("Rs. ")` removes any leading/trailing `R`, `s`, `.`, or space.

---

## 7. `.replace()`

Replaces occurrences of one substring with another.

```python
text.replace(old, new)
```

```python
text = "I like Java"

print(text.replace("Java", "Python"))
```

Output:

```text
I like Python
```

### Replacing all occurrences

```python
text = "a-b-c-d"

print(text.replace("-", "/"))
```

Output:

```text
a/b/c/d
```

### Limiting the number of replacements

The optional third argument caps the count:

```python
text = "one one one"

print(text.replace("one", "two", 2))
```

Output:

```text
two two one
```

### Removing characters

Replace with an empty string to delete:

```python
text = "Hello, World!"

print(text.replace(",", ""))
print(text.replace(" ", ""))
```

Output:

```text
Hello World!
Hello,World!
```

### It returns a new string

```python
text = "I like Java"
text.replace("Java", "Python")

print(text)      # I like Java  ← unchanged
```

Assign the result:

```python
text = text.replace("Java", "Python")
```

---

## 8. `.split()`

Splits a string into a **list** of parts.

```python
text = "Python is fun"

print(text.split())
```

Output:

```text
['Python', 'is', 'fun']
```

### Splitting on a specific character

```python
data = "apple,banana,mango"

print(data.split(","))
```

Output:

```text
['apple', 'banana', 'mango']
```

### Default behaviour

With no argument, `.split()` splits on **any run of whitespace** and discards empty pieces:

```python
text = "Python    is   fun"

print(text.split())
```

Output:

```text
['Python', 'is', 'fun']
```

Compare with splitting on a single space:

```python
print(text.split(" "))
```

Output:

```text
['Python', '', '', '', 'is', '', '', 'fun']
```

> **Use `.split()` with no argument** unless you specifically need to preserve empty fields.

### Splitting lines

```python
data = "line1\nline2\nline3"

print(data.splitlines())
```

Output:

```text
['line1', 'line2', 'line3']
```

### Limiting the number of splits

```python
data = "a,b,c,d"

print(data.split(",", 2))
```

Output:

```text
['a', 'b', 'c,d']
```

### The classic input pattern

```python
a, b = map(int, input().split())
```

With input `10 20`, this gives `a = 10` and `b = 20`.

```python
numbers = list(map(int, input().split()))
```

With input `1 2 3`, this gives `[1, 2, 3]`.

---

## 9. `.join()`

Joins a list of strings into one string, inserting a separator between elements.

```python
separator.join(list_of_strings)
```

> **Note the direction** — `.join()` is called on the **separator**, with the list as the argument. This reads backwards to many beginners.

```python
words = ["Python", "is", "fun"]

print(" ".join(words))
```

Output:

```text
Python is fun
```

### Different separators

```python
words = ["a", "b", "c"]

print("-".join(words))       # a-b-c
print(", ".join(words))      # a, b, c
print("".join(words))        # abc
print("\n".join(words))      # each on its own line
```

### `split()` and `join()` are inverses

```python
text = "Python is fun"

parts = text.split()          # ['Python', 'is', 'fun']
back = " ".join(parts)        # 'Python is fun'

print(back)
```

Output:

```text
Python is fun
```

### All elements must be strings

```python
numbers = [1, 2, 3]

print("-".join(numbers))      # TypeError
```

Convert first:

```python
print("-".join(str(n) for n in numbers))
```

Output:

```text
1-2-3
```

---

## 10. f-Strings

An **f-string** embeds values directly inside text. Put `f` before the quote and wrap expressions in `{}`.

### Basic example

```python
name = "Mahesh"
age = 24

print(f"My name is {name} and I am {age} years old.")
```

Output:

```text
My name is Mahesh and I am 24 years old.
```

### Expressions inside braces

```python
a = 10
b = 20

print(f"{a} + {b} = {a + b}")
print(f"Next year: {age + 1}")
print(f"Shout: {name.upper()}")
```

Output:

```text
10 + 20 = 30
Next year: 25
Shout: MAHESH
```

### Formatting numbers

```python
price = 99.56789
count = 1400000

print(f"Price: {price:.2f}")
print(f"Count: {count:,}")
```

Output:

```text
Price: 99.57
Count: 1,400,000
```

### Alignment and padding

```python
print(f"|{'Hi':<10}|")      # left
print(f"|{'Hi':>10}|")      # right
print(f"|{'Hi':^10}|")      # centre
```

Output:

```text
|Hi        |
|        Hi|
|    Hi    |
```

### Escaping braces

To show a literal brace, double it:

```python
print(f"{{literal}}")
```

Output:

```text
{literal}
```

### Escape characters

Inside any string, a backslash starts an escape sequence:

| Escape | Meaning |
| ------ | ------- |
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Literal backslash |
| `\"` | Literal double quote |
| `\'` | Literal single quote |

```python
print("Line one\nLine two")
print("Col1\tCol2")
print("Path: C:\\Users\\Mahesh")
print("She said \"hello\"")
```

Output:

```text
Line one
Line two
Col1	Col2
Path: C:\Users\Mahesh
She said "hello"
```

Use a **raw string** (`r"..."`) to disable escapes — handy for Windows paths and regular expressions:

```python
print(r"C:\Users\Mahesh")
```

Output:

```text
C:\Users\Mahesh
```

---

## Important: Strings Are Immutable

Once created, a string **cannot be changed**.

```python
text = "Python"

text[0] = "J"      # TypeError: 'str' object does not support item assignment
```

### What really happens on reassignment

```python
text = "Python"
text = "Java"
```

This does not modify `"Python"`. It makes the name `text` point at a **new** string `"Java"`.

```text
Before:  text ──→ "Python"
After:   text ──→ "Java"     ("Python" is discarded)
```

### Every method returns a new string

```python
text = "python"

print(text.upper())      # PYTHON  → a new string
print(text)              # python  → original untouched
print(id(text) == id(text.upper()))   # False — different objects
```

### Building a string efficiently

Because strings are immutable, repeated `+` in a loop creates a new string every pass:

```python
# Works, but slow for large loops
result = ""
for word in words:
    result += word + " "
```

The idiomatic approach is to collect the pieces and join once:

```python
result = " ".join(words)
```

> **Note** — CPython optimises many `+=` cases, so this is rarely a real problem in small scripts. For large text-building, `join()` is both faster and clearer.

---

## String Methods Reference

| Method | Purpose | Example | Result |
| ------ | ------- | ------- | ------ |
| `.upper()` | Uppercase | `"py".upper()` | `"PY"` |
| `.lower()` | Lowercase | `"PY".lower()` | `"py"` |
| `.title()` | Capitalise each word | `"py code".title()` | `"Py Code"` |
| `.capitalize()` | Capitalise first | `"py code".capitalize()` | `"Py code"` |
| `.strip()` | Remove ends | `"  x  ".strip()` | `"x"` |
| `.lstrip()` / `.rstrip()` | One side | `"  x".lstrip()` | `"x"` |
| `.replace(a, b)` | Substitute | `"a-b".replace("-", "+")` | `"a+b"` |
| `.split(sep)` | String → list | `"a,b".split(",")` | `["a", "b"]` |
| `.splitlines()` | Split on newlines | `"a\nb".splitlines()` | `["a", "b"]` |
| `sep.join(list)` | List → string | `"-".join(["a","b"])` | `"a-b"` |
| `.find(x)` | Index of first match, `-1` if absent | `"abc".find("b")` | `1` |
| `.index(x)` | Like `find` but raises | `"abc".index("z")` | `ValueError` |
| `.count(x)` | Count occurrences | `"aaa".count("a")` | `3` |
| `.startswith(x)` | Prefix test | `"py".startswith("p")` | `True` |
| `.endswith(x)` | Suffix test | `"file.py".endswith(".py")` | `True` |
| `.isdigit()` | All digits? | `"123".isdigit()` | `True` |
| `.isalpha()` | All letters? | `"abc".isalpha()` | `True` |

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| Expecting methods to modify in place | String unchanged | Assign: `text = text.upper()` |
| `text[0] = "X"` | `TypeError` | Build a new string |
| Forgetting `stop` is exclusive | Off-by-one | `text[0:3]` is 3 characters |
| Index beyond the end | `IndexError` | Check with `len()` |
| Case-sensitive comparison | Unexpected `False` | Normalise with `.lower()` |
| `"-".join([1, 2])` | `TypeError` | Convert: `str(n) for n in ...` |
| Not stripping input | Invisible mismatch | `input().strip()` |

---

## Quick Revision

| Topic | Key point | Example |
| ----- | --------- | ------- |
| Creation | Quotes on either side | `"Hi"`, `'Hi'` |
| Indexing | Zero-based | `text[0]`, `text[-1]` |
| Slicing | `[start:stop]`, stop excluded | `text[1:4]` |
| Step | Third value | `text[::2]` |
| Reverse | Negative step | `text[::-1]` |
| Immutability | Never changes in place | Assign the result |
| `.upper()` / `.lower()` | Change case | `text.upper()` |
| `.strip()` | Trim ends | `text.strip()` |
| `.replace()` | Substitute | `text.replace("a", "b")` |
| `.split()` | String → list | `text.split(",")` |
| `.join()` | List → string | `"-".join(parts)` |
| f-strings | Embed values | `f"Hi {name}"` |
| Formatting | `:.2f`, `:,` | `f"{x:.2f}"` |
| `in` | Substring test | `"py" in text` |

### Core patterns

```python
text[0]                       # first character
text[-1]                      # last character
text[::-1]                    # reversed
len(text)                     # length
text.lower() == other.lower() # case-insensitive compare
input().strip()               # clean input
text.split(",")               # split into a list
"-".join(parts)               # build from a list
f"Name: {name}"               # interpolate
f"{price:.2f}"                # format
"py" in text                  # contains?
```

### The main idea

```text
Strings
 ├── Ordered sequence of characters
 ├── Indexing → one character (0-based, negatives from the end)
 ├── Slicing  → a portion [start:stop:step]
 ├── Immutable → methods return new strings
 ├── Methods: upper, lower, strip, replace, split, join
 └── f-strings embed values and format them
```

---

## Self-Check

- [ ] What is `"Python"[1:4]`?
- [ ] How do you get the last character of a string without using `len()`?
- [ ] Why does `text.upper()` alone not change `text`?
- [ ] What does `"a,b,c".split(",", 1)` return?
- [ ] How do you reverse a string in one expression?
- [ ] What is the difference between `text.find("x")` and `text.index("x")`?
- [ ] Why might `input()` return `"yes\n"`, and how do you handle it?
