# Python Input and Output — Notes

Programs become useful when they can **receive data** (`input()`) and **present results** (`print()`). Together these form the I/O boundary of your program.

> **Why this matters** — Every exercise on this platform follows the same shape: read input, process it, print the answer. Mastering `input()`, `print()`, and f-strings is most of what you need to solve them.

### The mental model

```text
input()  →  your program  →  print()
(read)      (process)        (write)
```

A critical detail sits at the left arrow: **`input()` always gives you a string.** Converting it is your job.

---

## 1. `input()`

`input()` pauses the program, waits for the user to type something, and returns what they typed.

### Basic syntax

```python
value = input()

print("You typed:", value)
```

If the user types `Mahesh`:

```text
You typed: Mahesh
```

### Showing a prompt

```python
name = input("Enter your name: ")

print("Hello,", name)
```

Output:

```text
Enter your name: Mahesh
Hello, Mahesh
```

The prompt string is displayed; it is **not** part of the returned value.

### Reading a number

```python
age = input("Enter your age: ")

print(age)
print(type(age))
```

If the user types `24`:

```text
24
<class 'str'>
```

> **The single most important rule in this topic** — `input()` returns a **string**, always. Even when the user types digits. `"24"` is text until you convert it.

### Converting input to an integer

```python
age = int(input("Enter your age: "))

print(age)
print(type(age))
print("Next year:", age + 1)
```

Output:

```text
Enter your age: 24
24
<class 'int'>
Next year: 25
```

### Converting input to a float

```python
price = float(input("Enter price: "))

print(price)
print(type(price))
```

Output:

```text
Enter price: 99.50
99.5
<class 'float'>
```

### What happens if you forget?

```python
a = input("First: ")      # user types 10
b = input("Second: ")     # user types 20

print(a + b)
```

Output:

```text
1020
```

Not `30`. Python received `"10"` and `"20"`, and `+` on strings **concatenates**. Convert first:

```python
a = int(input("First: "))
b = int(input("Second: "))

print(a + b)
```

Output:

```text
30
```

### Reading several values from one line

A very common pattern on this platform:

```python
a, b = map(int, input().split())

print(a + b)
```

If the input is `10 20`, the output is `30`.

**How it works, step by step:**

```text
input()          →  "10 20"
.split()         →  ["10", "20"]      splits on whitespace
map(int, ...)    →  10, 20            converts each piece
a, b = ...       →  a = 10, b = 20    unpacks into names
```

Reading into a list:

```python
numbers = list(map(int, input().split()))
```

Input `1 2 3 4 5` gives `[1, 2, 3, 4, 5]`.

> **Note** — `split()` with no argument splits on any run of whitespace, so double spaces are handled correctly. Use `split(",")` when the input is comma-separated.

---

## 2. `print()`

`print()` writes values to the screen. Section 1 of *Python Basics* covered the fundamentals; here we focus on the two parameters that control layout.

### Basic example

```python
print("Hello")
print(10)
print(3.14)
```

Output:

```text
Hello
10
3.14
```

### Printing variables

```python
name = "Mahesh"
age = 24

print(name)
print(age)
```

Output:

```text
Mahesh
24
```

### Printing multiple values

```python
name = "Mahesh"
age = 24

print("Name:", name, "Age:", age)
```

Output:

```text
Name: Mahesh Age: 24
```

Comma-separated values are joined with a space.

### `sep` — what goes between values

The default separator is a single space.

```python
print("2026", "09", "03", sep="-")
print("a", "b", "c", sep="")
print("x", "y", sep=" -> ")
```

Output:

```text
2026-09-03
abc
x -> y
```

### `end` — what goes at the end

The default is a newline.

```python
print("Loading", end="")
print("...done")

print("one", end=", ")
print("two", end=", ")
print("three")
```

Output:

```text
Loading...done
one, two, three
```

### Combining `sep` and `end`

```python
print("10", "20", "30", sep=" | ", end="  <- values\n")
```

Output:

```text
10 | 20 | 30  <- values
```

---

## 3. f-Strings

An **f-string** (formatted string literal) lets you embed values directly inside text. Put `f` before the opening quote and wrap expressions in `{}`.

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

### Why f-strings are preferred

The older approaches do the same thing but are harder to read:

```python
# Concatenation — clumsy, needs str()
print("My name is " + name + " and I am " + str(age) + " years old.")

# .format() — better, but noisier
print("My name is {} and I am {} years old.".format(name, age))

# f-string — clearest
print(f"My name is {name} and I am {age} years old.")
```

With an f-string you can see the final sentence in the source, and no `str()` conversion is needed.

### Expressions inside f-strings

The braces hold a full expression, not just a name:

```python
a = 10
b = 20

print(f"{a} + {b} = {a + b}")
print(f"Next year: {age + 1}")
print(f"Upper: {name.upper()}")
```

Output:

```text
10 + 20 = 30
Next year: 25
Upper: MAHESH
```

### Multiple variables

```python
product = "Laptop"
price = 55000
quantity = 2

print(f"Item: {product}, Price: {price}, Total: {price * quantity}")
```

Output:

```text
Item: Laptop, Price: 55000, Total: 110000
```

### Calling functions inside braces

```python
items = [3, 1, 4]

print(f"Count: {len(items)}, Sum: {sum(items)}")
```

Output:

```text
Count: 3, Sum: 8
```

> **Note** — To print a literal brace, double it: `f"{{literal}}"` prints `{literal}`.

---

## 4. Formatting Output

Inside an f-string, follow an expression with `:` and a **format spec** to control how it appears.

The general shape is:

```text
{value:[[fill]align][width][,][.precision][type]}
```

You rarely need all of it at once — the sections below cover each part.

### Decimal places

`.2f` means "a float with 2 decimal places":

```python
price = 99.56789

print(f"Price: {price:.2f}")
print(f"Price: {price:.1f}")
print(f"Price: {price:.0f}")
```

Output:

```text
Price: 99.57
Price: 99.6
Price: 100
```

> **Note** — This **rounds**, it does not truncate. `99.56789` at `.2f` gives `99.57`.

Useful for currency:

```python
total = 1234.5
print(f"Total: Rs. {total:.2f}")
```

Output:

```text
Total: Rs. 1234.50
```

### Thousands separators

```python
population = 1400000000

print(f"Population: {population:,}")
```

Output:

```text
Population: 1,400,000,000
```

Combine with decimal places:

```python
revenue = 1234567.891

print(f"Revenue: Rs. {revenue:,.2f}")
```

Output:

```text
Revenue: Rs. 1,234,567.89
```

### Percentages

`.1%` multiplies by 100 and adds the sign:

```python
ratio = 0.4567

print(f"Progress: {ratio:.1%}")
print(f"Progress: {ratio:.2%}")
print(f"Progress: {ratio:.0%}")
```

Output:

```text
Progress: 45.7%
Progress: 45.67%
Progress: 46%
```

### Width and alignment

Width reserves a minimum number of characters, padding with spaces.

**Right alignment** (default for numbers):

```python
for n in [1, 10, 100]:
    print(f"|{n:>6}|")
```

Output:

```text
|     1|
|    10|
|   100|
```

**Left alignment** (default for text):

```python
for s in ["a", "bb", "ccc"]:
    print(f"|{s:<6}|")
```

Output:

```text
|a     |
|bb    |
|ccc   |
```

**Centre alignment:**

```python
print(f"|{'Hi':^10}|")
```

Output:

```text
|    Hi    |
```

**Custom fill character:**

```python
print(f"{'Hi':*^10}")
print(f"{42:0>5}")
```

Output:

```text
****Hi****
00042
```

### Building a table

Combined, these make neat columns:

```python
items = [("Apple", 30), ("Banana", 5), ("Mango", 120)]

print(f"{'Item':<10} {'Qty':>5}")
print("-" * 16)
for name, qty in items:
    print(f"{name:<10} {qty:>5}")
```

Output:

```text
Item         Qty
----------------
Apple         30
Banana         5
Mango        120
```

### Common format specs

| Spec | Meaning | Example | Result |
| ---- | ------- | ------- | ------ |
| `:.2f` | 2 decimal places | `f"{3.14159:.2f}"` | `3.14` |
| `:,` | Thousands separator | `f"{1000000:,}"` | `1,000,000` |
| `:,.2f` | Both | `f"{1234.5:,.2f}"` | `1,234.50` |
| `:.1%` | Percentage | `f"{0.456:.1%}"` | `45.6%` |
| `:>8` | Right align, width 8 | `f"{5:>8}"` | `       5` |
| `:<8` | Left align, width 8 | `f"{'hi':<8}"` | `hi      ` |
| `:^8` | Centre, width 8 | `f"{'hi':^8}"` | `   hi   ` |
| `:0>4` | Zero pad | `f"{42:0>4}"` | `0042` |
| `:b` / `:x` | Binary / hex | `f"{10:b}"` | `1010` |

---

## 5. Combining Input, Processing, and Output

Real programs combine all three steps. This is the pattern every problem on this platform follows.

```python
# 1. Input
name = input("Enter your name: ")
age = int(input("Enter your age: "))

# 2. Process
next_year = age + 1

# 3. Output
print(f"Hello, {name}!")
print(f"You are {age} now, and {next_year} next year.")
```

Output:

```text
Enter your name: Mahesh
Enter your age: 24
Hello, Mahesh!
You are 24 now, and 25 next year.
```

### A calculation example

```python
# Input
price = float(input("Enter price: "))
quantity = int(input("Enter quantity: "))

# Process
subtotal = price * quantity
tax = subtotal * 0.18
total = subtotal + tax

# Output
print(f"Subtotal: Rs. {subtotal:,.2f}")
print(f"Tax (18%): Rs. {tax:,.2f}")
print(f"Total:     Rs. {total:,.2f}")
```

Output:

```text
Enter price: 250
Enter quantity: 4
Subtotal: Rs. 1,000.00
Tax (18%): Rs. 180.00
Total:     Rs. 1,180.00
```

### The pattern to internalise

```text
┌─────────────┐
│  1. Input   │   input() → convert if needed
└──────┬──────┘
       ↓
┌─────────────┐
│ 2. Process  │   calculations, logic
└──────┬──────┘
       ↓
┌─────────────┐
│  3. Output  │   print() / f-strings
└─────────────┘
```

Keeping those three phases separate makes programs easier to read and debug. When output looks wrong, you know whether the bug is in what you read or what you computed.

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| Forgetting `int()` around `input()` | Numbers concatenate: `"10" + "20"` → `"1020"` | `int(input())` |
| `int(input())` when input is `24.5` | `ValueError` | Use `float(input())` |
| Using `+` to join text and a number | `TypeError` | Use an f-string |
| Forgetting the `f` prefix | Prints `{name}` literally | `f"Hello {name}"` |
| Expecting `:.2f` to truncate | It rounds | Use `math.floor` if you need truncation |
| Comparing floats for equality | Unreliable | `math.isclose()` |

---

## Quick Revision

| Task | Code | Notes |
| ---- | ---- | ----- |
| Read text | `name = input()` | Always returns `str` |
| Read with prompt | `input("Name: ")` | Prompt is not part of the result |
| Read an integer | `int(input())` | Convert explicitly |
| Read a float | `float(input())` | Accepts decimals |
| Read two ints | `a, b = map(int, input().split())` | Split then convert |
| Read a list | `list(map(int, input().split()))` | Common in exercises |
| Print several values | `print("a", "b")` | Joined by a space |
| Custom separator | `print("a", "b", sep="-")` | `a-b` |
| No trailing newline | `print("x", end="")` | Suppresses the newline |
| Embed a value | `f"Age: {age}"` | Needs the `f` prefix |
| 2 decimal places | `f"{x:.2f}"` | Rounds |
| Thousands separator | `f"{x:,}"` | `1,000,000` |
| Percentage | `f"{x:.1%}"` | Multiplies by 100 |
| Padding / alignment | `f"{x:>8}"` | Right align in width 8 |

### Core patterns

```python
name = input()                              # read text
age = int(input())                          # read a number
a, b = map(int, input().split())            # read two numbers
nums = list(map(int, input().split()))      # read many numbers

print(f"Hello {name}")                      # f-string
print(f"{price:.2f}")                       # 2 decimals
print(f"{count:,}")                         # thousands
print(f"{ratio:.1%}")                       # percentage
print(f"{name:<10}{qty:>5}")                # aligned columns
```

### The main idea

```text
Input and Output
 ├── input()  → always returns a string → convert it
 ├── print()  → sep between values, end at the end
 ├── f-strings → f"{value}" embeds values in text
 └── Format specs → {value:.2f} ,  {value:,}  {value:>8}
```

---

## Self-Check

- [ ] What does `input()` return when the user types `42`?
- [ ] What does `print("10" + "20")` produce, and why?
- [ ] Explain `a, b = map(int, input().split())` step by step.
- [ ] What is the difference between `sep` and `end`?
- [ ] How do you print `1234.5678` as `1,234.57`?
- [ ] What does `f"{0.456:.1%}"` output?
