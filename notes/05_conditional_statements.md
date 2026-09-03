# Python Conditions — Notes

Conditional statements let a program **choose** what to do: run this code only if something is true.

> **Why this matters** — Without conditions, a program is a fixed list of instructions that always does the same thing. Conditions are what make software respond to input, handle errors, and make decisions. This is where programs stop being scripts and start being useful.

### The mental model

```text
Is this condition true?
        │
   ┌────┴────┐
  Yes       No
   │         │
 Run this   Run that (or nothing)
```

Every conditional is a fork in the road. Python evaluates a boolean expression and takes one branch.

---

## 1. `if`

`if` runs a block of code only when its condition is true.

```python
age = 20

if age >= 18:
    print("You are an adult")
```

Output:

```text
You are an adult
```

### The structure

```python
if condition:
    # code that runs when condition is True
```

Three parts are mandatory:

1. The `if` keyword
2. A condition that evaluates to `True` or `False`
3. A colon `:` at the end, followed by an **indented** block

> **The colon is not optional.** Forgetting it is the single most common syntax error for beginners: `if age >= 18` alone raises `SyntaxError`.

### When the condition is false

```python
age = 15

if age >= 18:
    print("You are an adult")

print("Program continues")
```

Output:

```text
Program continues
```

The indented block is skipped, and execution continues after it.

### Any value can be a condition

You are not restricted to comparisons — Python uses the *truthiness* of any value:

```python
name = "Mahesh"

if name:
    print("Name provided")
```

Empty strings, `0`, `None`, and empty collections are falsy; everything else is truthy.

---

## 2. `elif`

`elif` ("else if") checks another condition when the previous ones were false.

```python
marks = 75

if marks >= 90:
    print("Grade A")
elif marks >= 75:
    print("Grade B")
elif marks >= 60:
    print("Grade C")
```

Output:

```text
Grade B
```

### Order matters — the first match wins

Python checks conditions **top to bottom** and runs only the **first** true block:

```python
marks = 95

if marks >= 60:
    print("Grade C")
elif marks >= 90:
    print("Grade A")
```

Output:

```text
Grade C
```

Even though `95 >= 90` is also true, it is never reached. The first matching branch wins and the rest are skipped.

> **Practical rule** — Put the **most specific** conditions first and the broadest ones last. The example above is buggy for exactly this reason.

### `elif` is optional — and so is a final catch-all

```python
temperature = 30

if temperature > 40:
    print("Very hot")
elif temperature > 30:
    print("Hot")
elif temperature > 20:
    print("Warm")
```

Output:

```text
Warm
```

### Many separate `if`s vs `if`/`elif`

These look similar but behave differently:

```python
x = 5

# Separate ifs — each is checked independently
if x > 0:
    print("Positive")
if x < 10:
    print("Less than 10")

# if/elif — stops after the first match
if x > 0:
    print("Positive")
elif x < 10:
    print("Less than 10")
```

First version output:

```text
Positive
Less than 10
```

Second version output:

```text
Positive
```

> **Rule of thumb** — Use `elif` when the cases are **mutually exclusive** (grades, categories). Use separate `if`s when several things can be true at once (validation checks).

---

## 3. `else`

`else` catches everything the previous conditions did not.

```python
age = 15

if age >= 18:
    print("Adult")
else:
    print("Minor")
```

Output:

```text
Minor
```

### `else` takes no condition

`else` means "in every other case". It must come last and cannot have its own test:

```python
else age < 18:      # SyntaxError
```

### The complete ladder

```python
marks = 45

if marks >= 90:
    print("Grade A")
elif marks >= 75:
    print("Grade B")
elif marks >= 60:
    print("Grade C")
else:
    print("Fail")
```

Output:

```text
Fail
```

The flow:

```text
marks >= 90?  →  no
marks >= 75?  →  no
marks >= 60?  →  no
else          →  run this
```

> **Why always include `else`** — An `else` guarantees something happens. Without one, a value that matches nothing silently does nothing, and silent no-ops are hard to debug.

---

## 4. Nested Conditions

A conditional inside another conditional.

```python
age = 25
has_ticket = True

if age >= 18:
    if has_ticket:
        print("You may enter")
    else:
        print("You need a ticket")
else:
    print("Too young")
```

Output:

```text
You may enter
```

Each level adds indentation:

```text
if age >= 18:              ← level 1
    if has_ticket:         ← level 2
        print(...)         ← level 3
```

### Nesting vs `and`

Nested conditions can usually be flattened, and flattened code is easier to read:

```python
# Nested — three levels deep
if age >= 18:
    if has_ticket:
        if not is_banned:
            print("Enter")

# Flat — one level
if age >= 18 and has_ticket and not is_banned:
    print("Enter")
```

> **Rule of thumb** — If you are nesting more than two levels, look for a way to flatten it with `and`/`or`, or extract the inner logic into a function.

---

## 5. Multiple Conditions

Combine conditions with `and`, `or`, and `not`.

### `and` — all must be true

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

### `or` — at least one must be true

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

### `not` — reverse the meaning

```python
is_weekend = False

if not is_weekend:
    print("It is a working day")
```

Output:

```text
It is a working day
```

### Mixing `and` / `or`

```python
age = 70
is_member = True

if (age >= 65 or is_member) and age >= 18:
    print("Discount applies")
```

Output:

```text
Discount applies
```

> **Always parenthesise mixed `and`/`or`.** `and` binds tighter than `or`, so `a or b and c` means `a or (b and c)`. Parentheses make the intent obvious to every reader.

### Chained comparisons

```python
age = 25

if 18 <= age <= 65:
    print("Working age")
```

Output:

```text
Working age
```

Cleaner than `age >= 18 and age <= 65`.

### Membership in conditions

```python
day = "Sunday"

if day in ("Saturday", "Sunday"):
    print("Weekend")
```

Cleaner than a chain of `or` equality checks.

---

## 6. Ternary Expressions

A **ternary** is a one-line `if`/`else` that produces a value.

```python
value_if_true if condition else value_if_false
```

### Basic example

```python
age = 20

status = "Adult" if age >= 18 else "Minor"

print(status)
```

Output:

```text
Adult
```

Compare with the long form:

```python
if age >= 18:
    status = "Adult"
else:
    status = "Minor"
```

### Another example

```python
marks = 45

result = "Pass" if marks >= 40 else "Fail"

print(result)
```

Output:

```text
Pass
```

### Nesting ternaries — do not

```python
# Technically valid, genuinely unreadable
grade = "A" if m >= 90 else "B" if m >= 75 else "C" if m >= 60 else "F"
```

If a ternary needs nesting, use a normal `if`/`elif`/`else` block. Readability beats brevity.

> **When to use a ternary** — For short, simple either/or assignments. If the line is longer than about 60 characters, use the block form.

---

## Important: Indentation

Indentation defines what belongs to which block. It is syntax, not style.

```python
age = 20

if age >= 18:
    print("Adult")
    print("Can vote")
print("Always runs")
```

Output:

```text
Adult
Can vote
Always runs
```

Only the indented lines are conditional. The last line is at the left margin, so it runs unconditionally.

### A common logical error

```python
age = 15

if age >= 18:
    print("Adult")
    print("Can vote")
```

Output:

```text
(nothing)
```

Both lines are inside the block, so both are skipped. Beginners often expect the second line to run because it "looks like a separate statement" — it is not, because it is at the same indentation level as the first.

### Same level = same block

```python
if condition:
    print("A")      # in the if
    print("B")      # in the if
print("C")          # outside the if
```

---

## Condition Flow

A full decision ladder, traced:

```python
score = 82

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print("Grade:", grade)
```

Output:

```text
Grade: B
```

The path taken:

```text
score = 82
    │
    ├─ score >= 90?  False
    ├─ score >= 80?  True  →  grade = "B"  →  stop
    ├─ score >= 70?  (never checked)
    └─ else          (never reached)
```

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| Forgetting the colon | `SyntaxError` | `if x > 5:` |
| No indentation after the colon | `IndentationError` | Indent by 4 spaces |
| Using `=` instead of `==` | `SyntaxError` | `if x == 5:` |
| Broad condition before specific | Wrong branch taken | Order specific → general |
| `else` with a condition | `SyntaxError` | `else:` takes no test |
| Assuming later `elif`s are checked | They are skipped after a match | Understand first-match-wins |
| Deeply nested conditions | Hard to read | Flatten with `and`/`or` |

---

## Quick Revision

| Concept | Syntax | Purpose |
| ------- | ------ | ------- |
| `if` | `if cond:` | Run when true |
| `elif` | `elif cond:` | Another case, checked in order |
| `else` | `else:` | Everything else |
| `and` | `a and b` | Both true |
| `or` | `a or b` | Either true |
| `not` | `not a` | Negate |
| Chained | `18 <= age <= 65` | Range test |
| Membership | `x in ("a", "b")` | One of these |
| Ternary | `a if cond else b` | One-line either/or |
| Nesting | `if` inside `if` | Prefer flattening |

### Core patterns

```python
if age >= 18:
    print("Adult")

if age >= 18:
    print("Adult")
else:
    print("Minor")

if m >= 90:
    g = "A"
elif m >= 75:
    g = "B"
else:
    g = "F"

if age >= 18 and has_ticket:
    print("Enter")

if day in ("Sat", "Sun"):
    print("Weekend")

status = "Adult" if age >= 18 else "Minor"
```

### The main idea

```text
Conditions
 ├── if    → check a condition
 ├── elif  → check another (first match wins)
 ├── else  → catch everything else
 ├── Combine with and / or / not
 ├── Indentation defines the block
 └── Ternary for short either/or assignment
```

---

## Self-Check

- [ ] Why does `if age >= 18` without a colon fail?
- [ ] In an `if`/`elif`/`else` chain, how many blocks can run?
- [ ] Why does putting `marks >= 60` before `marks >= 90` produce wrong grades?
- [ ] What is the difference between nested `if`s and using `and`?
- [ ] What does `"Adult" if age >= 18 else "Minor"` evaluate to when `age` is `12`?
- [ ] Which lines run unconditionally in an `if` block, and how can you tell?
