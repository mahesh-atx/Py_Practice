# Python Operators — Notes

An **operator** is a symbol that performs an operation on values. Python groups them into six families: arithmetic, comparison, logical, assignment, membership, and identity.

> **Why this matters** — Operators are the verbs of programming. You cannot write a condition, a loop, or a calculation without them. Understanding precedence and short-circuiting is the difference between code that works and code that *almost* works.

### The six families

| Family | Operators | Question it answers |
| ------ | --------- | ------------------- |
| Arithmetic | `+ - * / // % **` | What is the result of this calculation? |
| Comparison | `== != > < >= <=` | How do two values relate? |
| Logical | `and or not` | Are these conditions jointly true? |
| Assignment | `= += -= *= /= //= %= **=` | Store (and update) a value |
| Membership | `in`, `not in` | Is this item inside that collection? |
| Identity | `is`, `is not` | Are these the same object? |

---

## 1. Arithmetic Operators

Arithmetic operators perform mathematical calculations.

| Operator | Meaning | Example | Result |
| -------- | ------- | ------- | ------ |
| `+` | Addition | `10 + 3` | `13` |
| `-` | Subtraction | `10 - 3` | `7` |
| `*` | Multiplication | `10 * 3` | `30` |
| `/` | Division | `10 / 3` | `3.3333...` |
| `//` | Floor division | `10 // 3` | `3` |
| `%` | Modulo (remainder) | `10 % 3` | `1` |
| `**` | Exponentiation | `2 ** 3` | `8` |

### Addition

```python
a = 10
b = 3

print(a + b)
```

Output:

```text
13
```

With strings, `+` concatenates instead:

```python
print("Hello" + " " + "World")
```

Output:

```text
Hello World
```

### Subtraction, multiplication

```python
print(10 - 3)      # 7
print(10 * 3)      # 30
print("Hi" * 3)    # HiHiHi  (string repetition)
```

### Division always gives a float

```python
print(10 / 2)
print(type(10 / 2))
print(10 / 3)
```

Output:

```text
5.0
<class 'float'>
3.3333333333333335
```

> **Note** — Even `10 / 2` gives `5.0`, a float. Use `//` when you want an integer result.

### Floor division

`//` divides and discards the remainder, rounding **down** (toward negative infinity):

```python
print(10 // 3)       # 3
print(10 // 2)       # 5
print(-10 // 3)      # -4   ← note: down, not toward zero
```

That last line surprises people: `-10 // 3` is `-4`, because floor division rounds down, and `-3.33...` rounds down to `-4`.

### Modulo

`%` gives the remainder:

```python
print(10 % 3)      # 1
print(10 % 2)      # 0
print(15 % 5)      # 0
```

**The two classic uses:**

Testing even/odd:

```python
n = 7

if n % 2 == 0:
    print("Even")
else:
    print("Odd")
```

Output:

```text
Odd
```

Extracting digits:

```python
n = 47

print(n % 10)      # 7  → last digit
print(n // 10)     # 4  → remaining digits
```

### Exponentiation

```python
print(2 ** 3)      # 8
print(5 ** 2)      # 25
print(9 ** 0.5)    # 3.0  → square root
```

### Arithmetic with mixed types

```python
print(10 + 3.5)      # 13.5   (int + float → float)
print(3 * 2.0)       # 6.0
print(True + 5)      # 6      (bool acts as 1)
```

### Operator precedence

Python follows standard mathematical order:

```text
**           highest
*  /  //  %
+  -         lowest
```

```python
print(2 + 3 * 4)        # 14, not 20
print((2 + 3) * 4)      # 20
print(2 ** 3 ** 2)      # 512 — ** is right-associative
print(10 - 2 + 3)       # 11 — left to right
```

> **Note** — `2 ** 3 ** 2` is `2 ** (3 ** 2)` = `2 ** 9` = `512`, not `(2 ** 3) ** 2` = `64`. Exponentiation is the one operator that groups right-to-left.

---

## 2. Comparison Operators

Comparison operators compare two values and produce a **boolean**.

| Operator | Meaning |
| -------- | ------- |
| `==` | Equal to |
| `!=` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |

### Basic comparisons

```python
a = 10
b = 3

print(a == b)      # False
print(a != b)      # True
print(a > b)       # True
print(a < b)       # False
print(a >= 10)     # True
print(a <= 10)     # True
```

Output:

```text
False
True
True
False
True
True
```

### `==` vs `=`

This is the most common early mistake:

```python
x = 10        # assignment: x now refers to 10
x == 10       # comparison: is x equal to 10? → True
```

| Symbol | Purpose | Used in |
| ------ | ------- | ------- |
| `=` | Assign a value | Any statement |
| `==` | Compare two values | Conditions |

```python
if x = 10:      # SyntaxError — you cannot assign in a condition
```

### Comparing different types

```python
print(10 == 10.0)       # True   — numerically equal
print(10 == "10")       # False  — int vs str
print("10" == "10")     # True
```

Numbers compare across `int` and `float`, but a number never equals a string.

### Comparing strings

Strings compare **lexicographically** (dictionary order, by character code):

```python
print("apple" < "banana")     # True
print("Apple" < "apple")      # True — uppercase sorts first
print("abc" < "abd")          # True
```

> **Why `"Apple" < "apple"` is True** — Uppercase letters have smaller character codes than lowercase ones. To compare case-insensitively, normalise first: `"Apple".lower() < "apple".lower()` → `False`.

### Chained comparisons

Python allows a form that most languages do not:

```python
age = 25

print(18 <= age <= 65)
```

Output:

```text
True
```

This is equivalent to `18 <= age and age <= 65`, but clearer.

---

## 3. Logical Operators

Logical operators combine boolean values.

| Operator | Meaning | True when |
| -------- | ------- | --------- |
| `and` | Both must be true | Both sides are true |
| `or` | At least one is true | Either side is true |
| `not` | Reverses the value | The value is false |

### `and`

```python
print(True and True)       # True
print(True and False)      # False
print(False and False)     # False
```

Real use:

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("Can drive")
else:
    print("Cannot drive")
```

Output:

```text
Can drive
```

### `or`

```python
print(True or False)       # True
print(False or False)      # False
```

```python
day = "Sunday"

if day == "Saturday" or day == "Sunday":
    print("Weekend")
else:
    print("Weekday")
```

Output:

```text
Weekend
```

### `not`

```python
print(not True)      # False
print(not False)     # True
```

```python
is_logged_in = False

if not is_logged_in:
    print("Please log in")
```

Output:

```text
Please log in
```

### Short-circuit evaluation

This is important and often overlooked.

**`and` stops as soon as it sees a false value:**

```python
x = 0

if x != 0 and 10 / x > 1:
    print("Large")
else:
    print("Skipped safely")
```

Output:

```text
Skipped safely
```

No `ZeroDivisionError`, because `x != 0` is `False`, so Python never evaluates `10 / x`.

**`or` stops as soon as it sees a true value.**

```python
name = "" or "Guest"

print(name)
```

Output:

```text
Guest
```

The empty string is falsy, so `or` moves on and yields `"Guest"`. This is a common way to supply a default.

> **Why this matters** — Short-circuiting is not just an optimisation. It is how Python programs avoid errors by checking a condition *before* an operation that would fail. Put the cheap, safe check first.

### `and` / `or` return values, not just booleans

```python
print(0 or "fallback")      # fallback
print(5 and "yes")          # yes
print("" or 0 or None)      # None
```

They return the operand that decided the outcome, not `True`/`False`. That is why the default-value idiom works.

---

## 4. Assignment Operators

Assignment operators store values — and several of them update a variable in place.

| Operator | Equivalent to | Example |
| -------- | ------------- | ------- |
| `=` | `x = 5` | Plain assignment |
| `+=` | `x = x + 5` | Add and assign |
| `-=` | `x = x - 5` | Subtract and assign |
| `*=` | `x = x * 5` | Multiply and assign |
| `/=` | `x = x / 5` | Divide and assign |
| `//=` | `x = x // 5` | Floor divide and assign |
| `%=` | `x = x % 5` | Modulo and assign |
| `**=` | `x = x ** 5` | Exponentiate and assign |

### Basic assignment

```python
x = 10
print(x)
```

Output:

```text
10
```

### Augmented assignment

```python
x = 10

x += 5      # x = x + 5
print(x)    # 15

x -= 3      # x = x - 3
print(x)    # 12

x *= 2      # x = x * 2
print(x)    # 24

x //= 5     # x = x // 5
print(x)    # 4
```

### With strings and lists

```python
text = "Hello"
text += " World"
print(text)          # Hello World

items = [1, 2]
items += [3, 4]
print(items)         # [1, 2, 3, 4]
```

### Multiple assignment

```python
a, b, c = 1, 2, 3
x = y = 0
```

### The walrus operator `:=` (Python 3.8+)

Assigns and returns the value in one step:

```python
values = [1, 2, 3]

if (n := len(values)) > 2:
    print(f"{n} values is a lot")
```

Output:

```text
3 values is a lot
```

Use it sparingly — it is concise but can make code harder to read.

---

## 5. Membership Operators

Membership operators test whether a value appears in a collection.

| Operator | Meaning |
| -------- | ------- |
| `in` | Value is present |
| `not in` | Value is absent |

### With lists

```python
fruits = ["apple", "banana", "mango"]

print("apple" in fruits)        # True
print("orange" in fruits)       # False
print("orange" not in fruits)   # True
```

### With strings

For strings, `in` checks for a **substring**:

```python
text = "Python programming"

print("Python" in text)      # True
print("python" in text)      # False — case-sensitive
print("Java" not in text)    # True
```

### With sets — the fast case

```python
allowed = {"admin", "editor"}

print("admin" in allowed)      # True
```

> **Performance note** — `in` on a **set** or **dict** is O(1): it takes roughly the same time regardless of size. On a **list** or **string** it is O(n): it scans item by item. If you check membership repeatedly on a large collection, convert it to a set first.

```python
# Slow for large lists
if name in big_list:      # scans every element
    ...

# Fast
if name in big_set:       # direct lookup
    ...
```

---

## 6. Identity Operators

Identity operators check whether two names point at the **same object** — not merely equal values.

| Operator | Meaning |
| -------- | ------- |
| `is` | Same object |
| `is not` | Different objects |

### `is` vs `==`

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b)      # True  — same contents
print(a is b)      # False — two separate lists
```

| Comparison | Asks |
| ---------- | ---- |
| `==` | Do these have the same value? |
| `is` | Are these the same object in memory? |

### When to use `is`

Use `is` for **singletons**: `None`, `True`, `False`.

```python
value = None

if value is None:
    print("No value")
```

Output:

```text
No value
```

Always use `is None`, never `== None`.

### A subtle trap: small integer caching

Python caches small integers (typically -5 to 256), which produces surprising results:

```python
a = 100
b = 100
print(a is b)      # True  — both point at the cached object

x = 1000
y = 1000
print(x is y)      # False — two separate objects
print(x == y)      # True
```

> **Rule** — Never use `is` to compare numbers or strings. Use `==` for values and `is` only for `None`, `True`, and `False`.

---

## Operator Precedence

When several operators appear in one expression, Python applies this order (highest first):

| Level | Operators |
| ----- | --------- |
| 1 | `**` |
| 2 | `*`, `/`, `//`, `%` |
| 3 | `+`, `-` |
| 4 | `in`, `not in`, `is`, `is not`, `<`, `<=`, `>`, `>=`, `!=`, `==` |
| 5 | `not` |
| 6 | `and` |
| 7 | `or` |

```python
print(2 + 3 * 4)                    # 14
print((2 + 3) * 4)                  # 20
print(10 > 5 and 3 < 4)             # True
print(not True or True)             # True — (not True) or True
print(1 + 2 == 3)                   # True — (1 + 2) == 3
```

> **Practical advice** — Do not memorise the table. Use parentheses when an expression is not instantly obvious. `if (a or b) and c:` is clearer than relying on precedence, and it costs you nothing.

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| `=` instead of `==` in a condition | `SyntaxError` or always-true | Use `==` to compare |
| `10 / 3` expecting `3` | Gives `3.333...` | Use `//` for integer division |
| `"10" + 5` | `TypeError` | Convert: `int("10") + 5` |
| `x is 1000` | Unreliable | Use `x == 1000` |
| `x == None` | Works, but poor style | Use `x is None` |
| Assuming `and` short-circuits silently | Later code skipped | Intentional — order your checks |
| `not a == b` | Confusing | Write `a != b` |

---

## Quick Revision

| Operator | Purpose | Example |
| -------- | ------- | ------- |
| `+ - * /` | Basic arithmetic | `10 + 3` |
| `//` | Floor division (int) | `10 // 3` → `3` |
| `%` | Remainder | `10 % 3` → `1` |
| `**` | Power | `2 ** 3` → `8` |
| `== !=` | Equality | `a == b` |
| `> < >= <=` | Ordering | `a >= 18` |
| `and` | Both true | `a and b` |
| `or` | Either true | `a or b` |
| `not` | Negate | `not a` |
| `+= -= *=` | Update in place | `x += 5` |
| `in` | Membership | `"a" in items` |
| `is` | Identity (use for `None`) | `x is None` |

### Core patterns

```python
n % 2 == 0                    # even?
n // 10, n % 10               # split off the last digit
18 <= age <= 65               # chained comparison
x != 0 and 10 / x > 1         # short-circuit guard
name = "" or "Guest"          # default value
value is None                 # identity check for None
if item in my_set:            # fast membership
```

### The main idea

```text
Operators
 ├── Arithmetic  → calculate   (+ - * / // % **)
 ├── Comparison  → compare     (== != > < >= <=)
 ├── Logical     → combine     (and or not) — short-circuit
 ├── Assignment  → store       (= += -= *= ...)
 ├── Membership  → contains    (in, not in) — O(1) on sets
 └── Identity    → same object (is) — only for None/True/False
```

---

## Self-Check

- [ ] What is the difference between `10 / 3`, `10 // 3`, and `10 % 3`?
- [ ] Why does `10 == 10.0` return `True` but `10 == "10"` return `False`?
- [ ] Why does `x != 0 and 10 / x > 1` not crash when `x` is `0`?
- [ ] When should you use `is` instead of `==`?
- [ ] Why is `in` faster on a set than on a list?
- [ ] What is `2 ** 3 ** 2` and why?
