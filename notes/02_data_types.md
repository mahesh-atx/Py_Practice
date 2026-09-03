# Python Data Types — Notes

A **data type** describes what kind of value a variable holds. Python's core built-in types are `int`, `float`, `str`, `bool`, and `NoneType`.

> **Why this matters** — The type of a value decides what you can do with it. `"10" + "20"` gives `"1020"`, but `10 + 20` gives `30`. Same symbol, completely different result. Nearly every beginner bug involving "why is my number wrong?" is really a type problem.

### The mental model

```text
Value  →  has a type  →  which permits certain operations

"24"   →  str         →  concatenate, slice, upper()
 24    →  int         →  add, multiply, compare
 24.0  →  float       →  same as int, but approximate
True   →  bool        →  and / or / not
None   →  NoneType    →  nothing; a placeholder
```

Python attaches the type to the **value**, not to the variable name. That is why one variable can hold an `int` now and a `str` later.

---

## 1. `int`

An **integer** is a whole number — positive, negative, or zero — with no decimal point.

```python
age = 24
temperature = -5
count = 0
```

### Checking an integer

```python
age = 24

print(age)
print(type(age))
```

Output:

```text
24
<class 'int'>
```

### What you can do with integers

```python
a = 10
b = 3

print(a + b)      # addition
print(a - b)      # subtraction
print(a * b)      # multiplication
print(a // b)     # floor division
print(a % b)      # remainder (modulo)
print(a ** b)     # power
```

Output:

```text
13
7
30
3
1
1000
```

### Integers have no size limit

Unlike many languages, Python integers can grow as large as memory allows:

```python
big = 10 ** 100

print(big)
```

Output:

```text
10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

### Underscores for readability

```python
population = 1_400_000_000

print(population)
```

Output:

```text
1400000000
```

The underscores are ignored by Python — they exist purely to help you read the number.

---

## 2. `float`

A **float** is a number with a decimal point.

```python
price = 99.50
height = 5.8
temperature = -2.5
```

### Checking a float

```python
price = 99.50

print(price)
print(type(price))
```

Output:

```text
99.5
<class 'float'>
```

### Integer vs float

The division operator `/` **always** produces a float, even when the result is a whole number:

```python
print(10 / 2)
print(type(10 / 2))
```

Output:

```text
5.0
<class 'float'>
```

Compare with floor division:

```python
print(10 / 3)      # 3.3333333333333335  (float)
print(10 // 3)     # 3                   (int)
print(round(10 / 3, 2))   # 3.33
```

### Floats are approximations

Floats are stored in binary, and some decimal values cannot be represented exactly:

```python
print(0.1 + 0.2)
```

Output:

```text
0.30000000000000004
```

This is not a Python bug — it is how binary floating point works in every language.

> **Practical rule** — Never compare floats with `==`. Check whether they are close enough instead:
>
> ```python
> import math
> print(math.isclose(0.1 + 0.2, 0.3))    # True
> ```
>
> For money, use integers (paise/cents) or the `decimal` module rather than floats.

### Scientific notation

Very large or small floats display using `e`:

```python
print(1.5e6)      # 1500000.0
print(2.5e-3)     # 0.0025
```

---

## 3. `str`

A **string** is text — a sequence of characters.

```python
name = "Mahesh"
city = 'Akola'
```

Double and single quotes both work. Use whichever avoids escaping:

```python
print('She said "hello"')
print("It's fine")
```

### Strings can contain digits

```python
postal_code = "400001"
```

This looks like a number but is text. You cannot do arithmetic with it:

```python
print(postal_code + 1)    # TypeError
```

### Checking a string

```python
name = "Mahesh"

print(name)
print(type(name))
```

Output:

```text
Mahesh
<class 'str'>
```

### Multi-line strings

```python
message = """Line one
Line two
Line three"""

print(message)
```

Output:

```text
Line one
Line two
Line three
```

### Common string operations

```python
text = "Python"

print(len(text))        # length
print(text + " 3")      # concatenation
print(text * 3)         # repetition
print(text[0])          # indexing
print(text.upper())     # method
```

Output:

```text
6
Python 3
PythonPythonPython
P
PYTHON
```

---

## 4. `bool`

A **boolean** is one of two values: `True` or `False`.

```python
is_active = True
has_permission = False
```

### Checking a Boolean

```python
is_active = True

print(is_active)
print(type(is_active))
```

Output:

```text
True
<class 'bool'>
```

### Booleans come from comparisons

```python
print(10 > 5)      # True
print(10 < 5)      # False
print(10 == 10)    # True
print(10 != 10)    # False
```

Output:

```text
True
False
True
False
```

> **Important** — `True` and `False` are capitalised in Python. `true` and `false` are `NameError`. This is one of the most common early mistakes.

### Booleans are also numbers

Under the hood, `True` behaves like `1` and `False` like `0`:

```python
print(True + True)      # 2
print(False + 10)       # 10
```

This is occasionally useful for counting:

```python
scores = [True, False, True, True]
print(sum(scores))      # 3 — counts the True values
```

### Truthiness

Every value has a boolean sense. These are **falsy** (behave like `False`):

```text
False, 0, 0.0, "", None, [], (), {}
```

Everything else is **truthy**. That is why this works:

```python
name = ""

if name:
    print("Hello", name)
else:
    print("No name given")
```

Output:

```text
No name given
```

---

## 5. `None`

`None` represents **no value**. It is the type `NoneType`.

```python
result = None

print(result)
print(type(result))
```

Output:

```text
None
<class 'NoneType'>
```

### Example: a function with no return

```python
def greet(name):
    print("Hello", name)


value = greet("Mahesh")
print(value)
```

Output:

```text
Hello Mahesh
None
```

`greet()` prints but never returns anything, so `value` receives `None`.

> **Important** — `None` is not `0`, not `""`, and not `False`. It is its own thing, meaning "nothing here". Always test for it with `is`:
>
> ```python
> if value is None:
>     print("No result")
> ```
>
> Use `is None`, not `== None`.

---

## 6. Checking Types with `type()`

`type()` tells you what a value is.

### Basic syntax

```python
type(value)
```

```python
print(type(10))
print(type(10.5))
print(type("Hello"))
print(type(True))
print(type(None))
```

Output:

```text
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
<class 'NoneType'>
```

### With variables

```python
name = "Mahesh"
age = 24

print(type(name))
print(type(age))
```

Output:

```text
<class 'str'>
<class 'int'>
```

### `isinstance()` — the practical alternative

`type(x) == int` fails for subclasses. `isinstance()` is the idiomatic check:

```python
age = 24

print(isinstance(age, int))      # True
print(isinstance(age, str))      # False
print(isinstance(3.14, (int, float)))   # True — matches either
```

Use `type()` when you are exploring and want to know exactly what something is. Use `isinstance()` in real code.

---

## 7. Type Conversion

Converting between types is called **type casting**. Python provides `int()`, `float()`, `str()`, and `bool()`.

### `int()`

**Float to int** — truncates toward zero, it does *not* round:

```python
print(int(3.99))      # 3
print(int(2.5))       # 2
print(int(-2.9))      # -2
```

Use `round()` if you want rounding:

```python
print(round(3.99))    # 4
```

**String to int** — only works if the string is a valid whole number:

```python
age = "24"
age_int = int(age)

print(age_int)
print(type(age_int))
```

Output:

```text
24
<class 'int'>
```

These fail with `ValueError`:

```python
int("24.5")     # not a whole number
int("abc")      # not a number at all
int("")         # empty string
```

### `float()`

**Integer to float:**

```python
print(float(10))      # 10.0
```

**String to float:**

```python
price = "99.50"
price_float = float(price)

print(price_float)
print(type(price_float))
```

Output:

```text
99.5
<class 'float'>
```

Unlike `int()`, `float()` accepts decimals:

```python
print(float("24.5"))      # 24.5
```

### `str()`

Converts almost anything to text:

```python
print(str(10))        # "10"
print(str(99.5))      # "99.5"
print(str(True))      # "True"
print(str(None))      # "None"
```

This is how you combine a number with text:

```python
age = 24

# Fails — cannot add int and str
# print("Age: " + age)

# Works
print("Age: " + str(age))
```

Output:

```text
Age: 24
```

### `bool()`

**Numbers** — `0` is false, everything else is true:

```python
print(bool(0))        # False
print(bool(1))        # True
print(bool(-5))       # True
print(bool(0.0))      # False
```

**Strings** — empty string is false, anything else is true:

```python
print(bool(""))       # False
print(bool("Hi"))     # True
print(bool("0"))      # True  ← a non-empty string!
```

> **Watch out** — `bool("0")` is `True`, because `"0"` is a non-empty string. Only the empty string `""` is false. This catches people converting user input.

**`None`:**

```python
print(bool(None))     # False
```

### Type conversion summary

| Function | Purpose | Example | Result |
| -------- | ------- | ------- | ------ |
| `int()` | Convert to integer | `int("24")` | `24` |
| `int()` | Truncate float | `int(3.99)` | `3` |
| `float()` | Convert to float | `float("24.5")` | `24.5` |
| `str()` | Convert to text | `str(24)` | `"24"` |
| `bool()` | Convert to boolean | `bool("")` | `False` |

### Important difference

Converting changes the **value**, not the original variable:

```python
age = "24"
int(age)              # result is thrown away

print(age)            # still "24"
print(type(age))      # <class 'str'>
```

You must assign the result:

```python
age = "24"
age = int(age)        # now age is the int 24

print(type(age))      # <class 'int'>
```

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| `"10" + "20"` expecting `30` | Gives `"1020"` | Convert first: `int("10") + int("20")` |
| `"Age: " + 24` | `TypeError` | `str(24)` or use an f-string |
| `int("24.5")` | `ValueError` | Use `float("24.5")` |
| `true` instead of `True` | `NameError` | Capitalise: `True` |
| Comparing floats with `==` | Unreliable | Use `math.isclose()` |
| `if x == None` | Works, but wrong style | Use `if x is None` |
| Forgetting to assign the conversion | Type stays unchanged | `age = int(age)` |

---

## Quick Revision

| Type | Meaning | Example | Notes |
| ---- | ------- | ------- | ----- |
| `int` | Whole number | `24`, `-5`, `0` | No size limit |
| `float` | Decimal number | `99.5`, `-2.5` | Approximate; do not use `==` |
| `str` | Text | `"Mahesh"`, `'Akola'` | Immutable sequence |
| `bool` | True / False | `True`, `False` | Capitalised; acts like 1 / 0 |
| `NoneType` | No value | `None` | Test with `is None` |
| `type()` | Exact type | `type(24)` | For exploring |
| `isinstance()` | Type check | `isinstance(24, int)` | Preferred in real code |
| `int()` | To integer | `int("24")` | Truncates floats |
| `float()` | To float | `float("24.5")` | Accepts decimals |
| `str()` | To text | `str(24)` | Works on anything |
| `bool()` | To boolean | `bool("")` | `""`, `0`, `None` are false |

### Core patterns

```python
type(value)                  # what type is this?
isinstance(value, int)       # is it an int?
int("24")                    # string → int
float("24.5")                # string → float
str(24)                      # int → string
bool("")                     # False
round(3.99)                  # 4
math.isclose(0.1 + 0.2, 0.3) # True
```

### The main idea

```text
Data types
 ├── int      → whole numbers
 ├── float    → decimals (approximate)
 ├── str      → text
 ├── bool     → True / False
 └── None     → no value
      ↓
 type() asks what it is
 int() / float() / str() / bool() convert it
```

---

## Self-Check

- [ ] What is the difference between `10 / 2` and `10 // 2`?
- [ ] Why does `0.1 + 0.2` not equal `0.3` exactly?
- [ ] What does `bool("0")` return, and why is that surprising?
- [ ] How do you combine the number `24` into the sentence "Age: 24"?
- [ ] What is the difference between `type()` and `isinstance()`?
- [ ] Why does `int(age)` alone not change `age`?
