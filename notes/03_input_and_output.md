# Input and Output

> Programs become useful when they can **talk to the user**: take input, show output. This is a small topic, but f-strings are something you'll use every single day.

---

## 1. input()

`input()` pauses the program and waits for the user to type something. It **always returns a string**.

```python
name = input("Enter your name: ")
print("Hello,", name)
```

The text inside `input(...)` is shown as a prompt.

**Converting input to numbers** (required before any math):

```python
age = int(input("Enter your age: "))
print("Next year you'll be", age + 1)

price = float(input("Price: "))
```

If the user types garbage (`int("abc")`), Python raises a `ValueError` — you'll learn to handle that in **15-exception-handling.md**.

---

## 2. print()

```python
print("Hello")                    # one value
print("Age:", 21)                 # multiple values → separated by space
```

Two handy optional parameters:

```python
print("A", "B", sep="-")          # A-B   (default separator is a space)
print("Loading", end="...")       # Loading...  (default end is a newline)
```

---

## 3. f-strings ⭐ (the modern way to format text)

Put `f` before the string, then embed variables/expressions inside `{ }`.

```python
name = "Ravi"
age = 21

print(f"My name is {name} and I am {age} years old.")
# My name is Ravi and I am 21 years old.

print(f"Next year: {age + 1}")            # expressions work too
print(f"Total: {100 * 1.18}")             # 118.0
```

Why f-strings win: readable, short, and you can run any expression inside `{}`.

```python
item, price = "Notebook", 49.5
print(f"{item} costs ₹{price}")
```

---

## 4. Formatting Output

Inside the `{ }` of an f-string, you can add a `:` followed by formatting codes. The most common one is `.2f` — "show as a fixed-point number with 2 decimals". Perfect for money and percentages.

**Decimal places:**
```python
pi = 3.14159
print(f"{pi:.2f}")        # 3.14
print(f"₹{99.5:.2f}")     # ₹99.50
```

The `,` adds a thousands separator (great for big numbers), and `>`, `<`, `^` align text inside a fixed width with any fill character — handy for neat columns.

**Thousands separator & padding:**
```python
print(f"{1000000:,}")     # 1,000,000
print(f"{5:>3}")          # '  5'  (right-align in width 3)
print(f"{'ok':*^7}")      # **ok***  (center with fill char)
```

**The older .format() style.** Before f-strings existed (Python < 3.6), this was the standard. You'll still see it in older code and tutorials, so recognize it — but write f-strings in new code. `{}` are placeholders filled in order.

```python
print("Hello, {}! You are {}.".format("Ravi", 21))
```

**String concatenation with +.** You can glue strings together with `+`, and it's fine for simple cases. But numbers must be converted with `str()` first, and long lines become hard to read — that's exactly why f-strings exist.

```python
print("Hello, " + name)         # fine for strings
print("Age: " + str(age))       # must convert numbers manually → f-strings are better
```

---

## 5. Reading multiple values on one line ⭐ (avoids `ValueError: invalid literal for int() with base 10: '4 6'`)

Many beginner errors come from input like `4 6` (two numbers on **one line** separated by space).

This **fails**:
```python
a = int(input())  # input() returns '4 6' -> int('4 6') raises ValueError
b = int(input())
```

`int()` cannot parse a string that contains a space. You must `split()` first:

```python
# When input is "4 6" on one line (Q5 · Read two and print sum)
a, b = map(int, input().split())  # '4 6' -> ['4', '6'] -> 4, 6
print(f"{a} + {b} = {a + b}")  # 4 + 6 = 10

# For words: x, y = input().split()  # "hello world" -> ["hello", "world"]
```

**Robust pattern** that works for both `4 6` (one line) and `4\n6` (two lines):
```python
import sys
data = sys.stdin.read().strip().split()
a, b = map(int, data[:2])
print(f"{a} + {b} = {a + b}")
```

This same fix applies to all problems where the example input shows `7 5`, `4 9`, `6 7`, etc. on one line (e.g. `Add two numbers`, `Compare values`, `Read two words`, `Read and multiply`).

---

## Quick Revision

- `input()` always returns a **string** → convert with `int()`/`float()` for math.
- `print(*values, sep=" ", end="\n")` controls separator and line ending.
- **Use f-strings** (`f"text {var}"`) for almost everything.
- Format numbers with `{x:.2f}` (decimals) and `{x:,}` (thousands).

### Practice
1. Ask for name and birth year; print the age in 2026.
2. Ask for 3 subject marks; print the average with exactly 2 decimals using an f-string.

✅ Next → **06-conditions.md**
