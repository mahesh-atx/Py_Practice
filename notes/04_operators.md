# Operators

> Operators are symbols that perform operations on values. Most of this will feel familiar — but **floor division, modulo, and the difference between `==` and `is`** are worth real attention.

---

## 1. Arithmetic Operators

| Op | Name | Example | Result |
|----|------|---------|--------|
| `+` | Addition | `7 + 3` | `10` |
| `-` | Subtraction | `7 - 3` | `4` |
| `*` | Multiplication | `7 * 3` | `21` |
| `/` | Division | `7 / 2` | `3.5` (always a float!) |
| `//` | Floor division | `7 // 2` | `3` (drops the decimal) |
| `%` | Modulo | `7 % 2` | `1` (the remainder) |
| `**` | Power | `7 ** 2` | `49` |

**`/` vs `//`:**
```python
print(7 / 2)      # 3.5   → normal division, always float
print(7 // 2)     # 3     → rounds DOWN to whole number
print(8 / 2)      # 4.0   → still a float!
```

**Modulo `%` is extremely useful:**
```python
num = 10
if num % 2 == 0:
    print("even")     # remainder 0 when divided by 2 → even
```

---

## 2. Comparison Operators

These return a **boolean** (`True` / `False`). They are the heart of every `if` statement.

| Op | Meaning | Example | Result |
|----|---------|---------|--------|
| `==` | equal to | `5 == 5` | `True` |
| `!=` | not equal | `5 != 3` | `True` |
| `>` | greater than | `5 > 3` | `True` |
| `<` | less than | `5 < 3` | `False` |
| `>=` | greater or equal | `5 >= 5` | `True` |
| `<=` | less or equal | `4 <= 3` | `False` |

```python
age = 20
print(age >= 18)      # True
print(age == 21)      # False
```

⚠️ **`=` vs `==`** — the #1 beginner bug:
- `=` assigns: `x = 5`
- `==` compares: `x == 5`

Python lets you chain comparisons naturally:
```python
x = 15
print(10 < x < 20)        # True — reads like math
```

---

## 3. Logical Operators

Combine multiple boolean expressions.

| Op | Meaning | Example |
|----|---------|---------|
| `and` | both must be True | `age >= 18 and has_id` |
| `or` | at least one True | `is_weekend or is_holiday` |
| `not` | flips the boolean | `not is_logged_in` |

```python
age = 20
has_ticket = True

if age >= 18 and has_ticket:
    print("Allowed in")     # both True → runs

if not has_ticket:
    print("Buy a ticket")   # not True → False → skipped
```

Remember **truthiness** from data types — empty/zero values count as `False`:

```python
name = ""
if not name:
    print("Name is empty")   # runs, because "" is falsy
```

---

## 4. Assignment Operators

Updating a variable is so common (counters, totals, scores) that Python gives shortcuts: `x += 5` means "take x, add 5, store back in x". Read each line below as "take the current value, apply the operation, save the result".

```python
x = 10
x += 5      # x = x + 5  → 15
x -= 3      # x = x - 3  → 12
x *= 2      # x = x * 2  → 24
x /= 4      # x = x / 4  → 6.0
x //= 2     # floor-divide assign
x %= 3      # modulo assign
x **= 2     # power assign
```

`+=` is the one you'll use constantly (counters, totals):

```python
total = 0
for price in [100, 250, 50]:
    total += price
print(total)     # 400
```

> Note: Python has **no `x++` or `x--`**. Use `x += 1`.

---

## 5. Membership Operators: `in`, `not in`

Check whether a value exists inside a sequence (string, list, tuple, dict keys).

```python
fruits = ["apple", "mango", "banana"]
print("mango" in fruits)          # True
print("grapes" not in fruits)     # True

print("a" in "Ravi")              # True (substring check)
```

---

## 6. Identity Operators: `is`, `is not`

⚠️ **Important distinction:**
- `==` checks if two values are **equal** (same content).
- `is` checks if two names point to the **exact same object in memory**.

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)     # True  → same content
print(a is b)     # False → two different list objects
print(a is c)     # True  → c points to the very same list as a
```

**Practical rule:** use `is` almost only for `None`:

```python
result = None
if result is None:
    print("No result yet")     # ✅ the correct way
```

For everything else, use `==`.

---

## 7. Operator Precedence (quick view)

When operators mix, Python decides the order: `**` → unary `-` → `* / // %` → `+ -` → comparisons → `not` → `and` → `or`.

```python
print(2 + 3 * 4)      # 14, not 20
print((2 + 3) * 4)    # 20 — parentheses win
```

**Advice:** when in doubt, add parentheses. They cost nothing and make intent clear.

---

## Quick Revision

- `/` always returns float; `//` drops the decimal; `%` gives the remainder.
- Comparisons return `True`/`False`; never confuse `=` with `==`.
- `and`, `or`, `not` combine conditions; empty/zero values are falsy.
- `+=`, `-=`, etc. update a variable in place; no `++` in Python.
- `in` / `not in` check membership in sequences.
- `==` compares values; `is` compares object identity — use `is` mainly with `None`.

### Practice
1. Check if a number is divisible by both 3 and 5 using `%` and `and`.
2. Predict, then verify: `10 / 4`, `10 // 4`, `10 % 4`.
3. Create two lists with the same items; check `==` and `is` on them.

✅ Next → **05-input-and-output.md**
