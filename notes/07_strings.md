# Python Strings — Notes

A string (`str`) is used to store **text**.

```python
name = "Mahesh"
city = "Akola"
message = "Hello Python"
```

Strings can use single quotes or double quotes:

```python
name = "Mahesh"
name = 'Mahesh'
```

Both are valid.

---

# 1. Indexing

Indexing means accessing individual characters from a string.

Python uses **zero-based indexing**, which means the first character has index `0`.

```python
text = "Python"
```

The indexes are:

```text
 P   y   t   h   o   n
 0   1   2   3   4   5
```

So:

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

### Negative indexing

Python also supports negative indexes.

```text
 P   y   t   h   o   n
-6  -5  -4  -3  -2  -1
```

Example:

```python
text = "Python"

print(text[-1])
print(text[-2])
```

Output:

```text
n
o
```

`-1` always means the **last character**.

### Invalid index

```python
text = "Python"

print(text[10])
```

This causes an `IndexError` because the string does not have an index `10`.

---

# 2. Slicing

Slicing is used to get a **part of a string**.

### Basic syntax

```python
string[start:stop]
```

The `start` index is included.

The `stop` index is not included.

Example:

```python
text = "Python"

print(text[0:3])
```

Output:

```text
Pyt
```

Indexes:

```text
 P   y   t   h   o   n
 0   1   2   3   4   5
 |-------|
 0       3
```

Index `3` is not included.

### More examples

```python
text = "Python"

print(text[1:4])
print(text[2:5])
```

Output:

```text
yth
tho
```

---

## Slicing from the beginning

You can leave out the start index.

```python
text = "Python"

print(text[:3])
```

Output:

```text
Pyt
```

This means:

```python
text[0:3]
```

---

## Slicing to the end

You can leave out the stop index.

```python
text = "Python"

print(text[2:])
```

Output:

```text
thon
```

This means from index `2` until the end.

---

## Copying the whole string

```python
text = "Python"

print(text[:])
```

Output:

```text
Python
```

---

## Slicing with a step

The full syntax is:

```python
string[start:stop:step]
```

Example:

```python
text = "Python"

print(text[0:6:2])
```

Output:

```text
Pto
```

It takes every second character.

Indexes used:

```text
0 → P
2 → t
4 → o
```

### Reverse a string

A step of `-1` reverses the string:

```python
text = "Python"

print(text[::-1])
```

Output:

```text
nohtyP
```

---

# 3. String Methods

String methods are built-in functions that can be used to work with strings.

They use this format:

```python
string.method()
```

Example:

```python
text = "hello"

print(text.upper())
```

Output:

```text
HELLO
```

Important: Most string methods return a **new string**. They do not change the original string.

---

# 4. `.upper()`

`.upper()` converts all letters to uppercase.

```python
text = "Hello Python"

print(text.upper())
```

Output:

```text
HELLO PYTHON
```

Example:

```python
name = "mahesh"

name = name.upper()

print(name)
```

Output:

```text
MAHESH
```

---

# 5. `.lower()`

`.lower()` converts all letters to lowercase.

```python
text = "HELLO PYTHON"

print(text.lower())
```

Output:

```text
hello python
```

Example:

```python
name = "MAHESH"

name = name.lower()

print(name)
```

Output:

```text
mahesh
```

### `.upper()` vs `.lower()`

```text
"Python".upper() → "PYTHON"

"Python".lower() → "python"
```

---

# 6. `.strip()`

`.strip()` removes spaces and certain whitespace characters from the **beginning and end** of a string.

Example:

```python
name = "   Mahesh   "

print(name.strip())
```

Output:

```text
Mahesh
```

It does not remove spaces between words.

```python
text = "  Hello Python  "

print(text.strip())
```

Output:

```text
Hello Python
```

The space between `Hello` and `Python` remains.

### Common use

It is useful when handling user input:

```python
name = input("Enter your name: ").strip()

print(name)
```

If the user enters:

```text
   Mahesh
```

the extra spaces at the beginning and end are removed.

---

# 7. `.replace()`

`.replace()` replaces one part of a string with another.

### Syntax

```python
string.replace(old, new)
```

Example:

```python
text = "I like Java"

print(text.replace("Java", "Python"))
```

Output:

```text
I like Python
```

### Replacing characters

```python
text = "banana"

print(text.replace("a", "o"))
```

Output:

```text
bonono
```

By default, it replaces all matching occurrences.

### Important

The original string does not change unless you store the result:

```python
text = "Hello Java"

text.replace("Java", "Python")

print(text)
```

Output:

```text
Hello Java
```

To change the variable:

```python
text = "Hello Java"

text = text.replace("Java", "Python")

print(text)
```

Output:

```text
Hello Python
```

---

# 8. `.split()`

`.split()` breaks a string into multiple parts and returns them as a list.

### Basic example

```python
text = "Python is easy"

words = text.split()

print(words)
```

Output:

```text
['Python', 'is', 'easy']
```

By default, `.split()` uses whitespace to separate the words.

### Split using a specific character

You can give a separator:

```python
text = "apple,banana,mango"

fruits = text.split(",")

print(fruits)
```

Output:

```text
['apple', 'banana', 'mango']
```

Here, `,` tells Python where to split.

### Another example

```python
data = "10-20-30-40"

numbers = data.split("-")

print(numbers)
```

Output:

```text
['10', '20', '30', '40']
```

Notice that the results are strings.

---

# 9. `.join()`

`.join()` does the opposite of `.split()`.

It joins multiple strings into one string.

### Basic example

```python
words = ["Python", "is", "easy"]

text = " ".join(words)

print(text)
```

Output:

```text
Python is easy
```

Here:

```python
" ".join(words)
```

means:

> Join the words using a space.

### Join using a comma

```python
fruits = ["apple", "banana", "mango"]

text = ", ".join(fruits)

print(text)
```

Output:

```text
apple, banana, mango
```

### Join using `-`

```python
parts = ["2026", "08", "09"]

date = "-".join(parts)

print(date)
```

Output:

```text
2026-08-09
```

### `split()` and `join()` together

```python
text = "Python is easy"

words = text.split()

result = "-".join(words)

print(result)
```

Output:

```text
Python-is-easy
```

Think:

```text
split() → String → List

join()  → List → String
```

---

# 10. f-Strings

f-strings are used to insert variables and expressions directly into strings.

An f-string starts with `f`.

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

The values inside `{}` are replaced with their actual values.

### Expressions

You can also put expressions inside `{}`:

```python
a = 10
b = 20

print(f"Sum = {a + b}")
```

Output:

```text
Sum = 30
```

Another example:

```python
price = 100
quantity = 3

print(f"Total = {price * quantity}")
```

Output:

```text
Total = 300
```

---

## f-String Formatting

You can control how values are displayed.

### Decimal places

```python
price = 99.5678

print(f"{price:.2f}")
```

Output:

```text
99.57
```

`.2f` means two digits after the decimal point.

### Percentage

```python
rate = 0.75

print(f"{rate:.0%}")
```

Output:

```text
75%
```

### Number formatting

```python
number = 1000000

print(f"{number:,}")
```

Output:

```text
1,000,000
```

---

# Important: Strings Are Immutable

A string cannot be changed directly after it is created.

For example:

```python
text = "Python"
```

You cannot directly change one character like:

```python
text[0] = "J"
```

This causes an error.

Instead, create a new string:

```python
text = "Python"

text = "J" + text[1:]

print(text)
```

Output:

```text
Jython
```

String methods also return new strings:

```python
text = "python"

new_text = text.upper()

print(text)
print(new_text)
```

Output:

```text
python
PYTHON
```

---

# Quick Revision

| Topic             | Example                               | Result                      |
| ----------------- | ------------------------------------- | --------------------------- |
| Indexing          | `"Python"[0]`                         | `P`                         |
| Negative indexing | `"Python"[-1]`                        | `n`                         |
| Slicing           | `"Python"[0:3]`                       | `Pyt`                       |
| Reverse           | `"Python"[::-1]`                      | `nohtyP`                    |
| `.upper()`        | `"hello".upper()`                     | `HELLO`                     |
| `.lower()`        | `"HELLO".lower()`                     | `hello`                     |
| `.strip()`        | `"  Hi  ".strip()`                    | `Hi`                        |
| `.replace()`      | `"Hi Java".replace("Java", "Python")` | `Hi Python`                 |
| `.split()`        | `"a,b,c".split(",")`                  | `['a', 'b', 'c']`           |
| `.join()`         | `"-".join(["a","b","c"])`             | `a-b-c`                     |
| f-string          | `f"Hello {name}"`                     | Inserts the value of `name` |

### Most important mental model

```text
String
  │
  ├── Indexing → get one character
  │
  ├── Slicing → get part of the string
  │
  ├── Methods → change/process the string
  │
  └── f-string → put values inside text
```

And remember:

```python
text[0]       # Indexing
text[1:4]     # Slicing
text.upper()  # Method
f"{text}"     # f-string
```
