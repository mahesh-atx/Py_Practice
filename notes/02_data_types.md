# Data Types

> Every value in Python has a **type**, and the type decides what you can do with it. You can't do math on text or uppercase a number — types keep things sane.

---

## 1. The 5 Fundamental Types

| Type | What it is | Examples |
|------|-----------|----------|
| `int` | Whole numbers | `5`, `-3`, `1000000` |
| `float` | Decimal numbers | `3.14`, `-0.5`, `2.0` |
| `str` | Text | `"hello"`, `'Ravi'` |
| `bool` | True / False | `True`, `False` |
| `None` | "No value" / empty | `None` |

### int — whole numbers

Numbers without a decimal point — counts, IDs, ages. Positive, negative, or zero.

```python
age = 21
count = -7
big = 10_000_000        # underscores are just for readability
```

Python ints can be **arbitrarily large** — no overflow like in C/Java.

### float — decimal numbers

Numbers *with* a decimal point — prices, measurements, percentages. Any division with `/` also produces a float.

```python
price = 99.5
pi = 3.14159
```

⚠️ **Float precision quirk:** some decimals can't be stored exactly.

```python
print(0.1 + 0.2)            # 0.30000000000000004 (not exactly 0.3!)
print(round(0.1 + 0.2, 2))  # 0.3 — use round() for display
```

### str — text

Any text wrapped in quotes — names, messages, even digits inside quotes (`"21"` is text, not a number!).

```python
name = "Ravi"
greeting = 'Hello'          # single or double quotes — same thing
```

(Covered deeply in **08-strings.md**.)

### bool — True or False

The simplest type: exactly two possible values. Bools are what every condition in your program boils down to.

```python
is_logged_in = True
has_errors = False
```

Only two values exist: `True` and `False` (capital T and F — they're keywords).

### None — absence of a value

`None` means "nothing here yet". Functions that don't `return` anything give back `None`.

```python
result = None
print(result)           # None

def do_nothing():
    pass
print(do_nothing())     # None
```

---

## 2. Checking Types with type()

Not sure what type something is? Ask Python directly. `type()` works on any value or variable — it tells you the class the value belongs to.

```python
print(type(5))          # <class 'int'>
print(type(3.14))       # <class 'float'>
print(type("hi"))       # <class 'str'>
print(type(True))       # <class 'bool'>
print(type(None))       # <class 'NoneType'>

x = [1, 2, 3]
print(type(x))          # <class 'list'>
```

---

## 3. Type Conversion (Casting)

Python **does not mix types automatically**. This fails:

```python
age = "21"
print(age + 1)          # ❌ TypeError: can only concatenate str to str
```

You convert explicitly with constructor functions:

### int()

Converts to a whole number. Watch the two quirks in the example below — truncating instead of rounding, and refusing decimal strings.

```python
int("25")       # 25
int(3.9)        # 3   ⚠️ truncates — does NOT round
int("3.9")      # ❌ ValueError — do float("3.9") first
```

### float()

Converts to a decimal number. It accepts both strings and whole numbers, and it's more forgiving than `int()`.

```python
float("3.14")   # 3.14
float(5)        # 5.0
float("7")      # 7.0
```

### str()

Converts *anything* to its text form. You need this whenever you want to join a number with text using `+`.

```python
str(25)         # "25"
str(3.14)       # "3.14"
str(True)       # "True"
```

### bool()

Almost everything is `True`. Only the "empty" values are `False`:

```python
bool(0)         # False
bool(0.0)       # False
bool("")        # False   (empty string)
bool(None)      # False

bool(1)         # True
bool(-5)        # True    (any non-zero number)
bool("hi")      # True    (any non-empty string)
bool([1, 2])    # True    (any non-empty list)
```

**Rule of thumb:** empty/zero → `False`, anything else → `True`. This idea is called *truthiness* and you'll use it constantly in `if` conditions.

---

## 4. A Very Common Pattern: input() Gives Strings

`input()` **always** returns a string. Convert before doing math:

```python
age = input("Enter age: ")     # user types 21 → age is "21" (str!)
age = int(age)                 # now it's the number 21
print(age + 1)                 # 22 ✅
```

---

## Quick Revision

- Core types: `int`, `float`, `str`, `bool`, `None`.
- Check with `type()`; convert with `int()`, `float()`, `str()`, `bool()`.
- `int(3.9)` → `3` (truncates); `int("3.9")` raises an error.
- `bool()`: empty/zero things are `False`, everything else is `True`.
- `input()` always returns a string — convert it before math.

### Practice
1. Take a number as input and print its square.
2. Print `bool("")`, `bool(" ")`, and `bool(0)` — predict before running.
3. Convert `price = "149.99"` to float, add 50, then print as a string.

✅ Next → **04-operators.md**
