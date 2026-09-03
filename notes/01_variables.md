# Python Variables — Notes

A **variable** is a name that refers to a value stored in your program.

> **Why this matters** — Variables are how a program remembers anything. Without them, every value would have to be written twice: once to compute it and once to use it. Almost every line of real Python involves at least one variable.

### The mental model

A variable is a **label attached to a value**, not a box containing it.

```text
name  ──→  "Mahesh"
age   ──→  24
```

That distinction sounds academic, but it explains behaviour that confuses beginners — for example why two variables can end up pointing at the same list.

---

## 1. Variables

### Creating a variable

You create a variable by assigning a value with `=`:

```python
name = "Mahesh"
age = 24
```

The pattern is always:

```text
variable = value
```

More examples:

```python
city = "Akola"
price = 99.50
is_active = True
```

### Using a variable

```python
name = "Mahesh"

print(name)
```

Output:

```text
Mahesh
```

### Changing a variable

The value a label points to can be replaced:

```python
age = 24
print(age)

age = 25
print(age)
```

Output:

```text
24
25
```

The `=` sign is **assignment**, not equality. Read it as "age now refers to 25", not "age equals 25". That reading will save you confusion later.

### Variables with calculations

```python
a = 10
b = 20

print(a + b)
```

Output:

```text
30
```

A fuller example:

```python
price = 100
quantity = 3

total = price * quantity

print(total)
```

Output:

```text
300
```

### Variables can hold different types

```python
name = "Mahesh"
age = 24
height = 5.8
is_student = True
```

One variable can hold text, another a number, another a true/false value. Python does not require you to declare which.

---

## 2. Naming Rules

Variable names must follow Python's rules. These are enforced by the language — breaking them is a `SyntaxError`.

### Rule 1: Start with a letter or underscore

Valid:

```python
name = "Mahesh"
_age = 24
```

Invalid:

```python
1name = "Mahesh"
```

### Rule 2: Numbers are allowed after the first character

```python
age1 = 24
student2 = "Rahul"
```

### Rule 3: No spaces

Invalid:

```python
student name = "Mahesh"
```

Use an underscore instead:

```python
student_name = "Mahesh"
```

### Rule 4: Only letters, numbers, and underscores

```python
student_name = "Mahesh"    # valid
student-name = "Mahesh"    # invalid — the dash is read as subtraction
```

### Rule 5: Cannot use reserved keywords

Python reserves words like `if`, `for`, `while`, `class`, `def`, `return`, `import`, `True`, `False`, `None`. You cannot use them as names:

```python
class = "Python"    # SyntaxError
```

### Style conventions (not enforced, but expected)

These will not cause errors, but professional Python follows them:

| Convention | Good | Avoid |
| ---------- | ---- | ----- |
| `snake_case` for variables | `student_name` | `studentName` |
| Descriptive names | `total_price` | `tp` |
| `UPPER_CASE` for constants | `MAX_ATTEMPTS` | `maxAttempts` |
| Leading underscore for "internal" | `_count` | `count_` |

```python
# Weak — the reader has to guess
d = 45

# Strong — the meaning is obvious
elapsed_days = 45
```

> **Why this matters** — You write code once but read it many times. Names are the cheapest documentation you have.

---

## 3. Multiple Assignment

### Assigning several variables at once

```python
a, b, c = 10, 20, 30

print(a)
print(b)
print(c)
```

Output:

```text
10
20
30
```

The counts must match, or Python raises a `ValueError`:

```python
a, b = 10, 20, 30    # ValueError: too many values to unpack
```

### Assigning the same value to several variables

```python
x = y = z = 0
```

All three now refer to `0`.

> **Careful** — This is fine for immutable values like numbers. With mutable values like lists, `a = b = []` makes both names point at the *same* list, so appending to one affects the other.

### Swapping values

Python lets you swap in one line, with no temporary variable:

```python
a = 10
b = 20

a, b = b, a

print(a)
print(b)
```

Output:

```text
20
10
```

**How it works:** Python evaluates the whole right-hand side `(b, a)` *first*, producing `(20, 10)`, and only then assigns to the left. That is why nothing is lost. In most other languages this needs a third variable.

---

## 4. Constants

A **constant** is a value meant never to change.

Python has no true constants — you cannot force a variable to be read-only. The convention is to name it in `UPPER_CASE` as a signal to other programmers:

```python
PI = 3.14159
MAX_USERS = 100
COMPANY_NAME = "PyPractice"
```

```python
PI = 3.14159
radius = 5

area = PI * radius ** 2

print(area)
```

Output:

```text
78.53975
```

> **The convention is a promise, not a lock.** Python will happily let you reassign `PI`. The capital letters tell other programmers "do not do this" — they do not stop you.

### Why use constants?

```python
# Unclear — what is 0.18?
total = price * 0.18

# Clear
TAX_RATE = 0.18
total = price * TAX_RATE
```

The second version also means that when the rate changes, you change it in one place.

---

## 5. Dynamic Typing

Python is **dynamically typed**: a variable's type is determined by the value it currently holds, and it can change.

```python
x = 10
print(type(x))

x = "Hello"
print(type(x))

x = True
print(type(x))
```

Output:

```text
<class 'int'>
<class 'str'>
<class 'bool'>
```

The same name `x` held an integer, then a string, then a boolean.

### Contrast with static typing

In languages like Java or C++, you declare the type and it cannot change:

```java
int age = 24;      // Java: age is an int, permanently
```

In Python you simply write:

```python
age = 24
```

### Advantages and trade-offs

| | Dynamic typing (Python) |
| --- | --- |
| Advantage | Less code, faster to write, flexible |
| Advantage | Easy to experiment in the REPL |
| Trade-off | Type mistakes surface at runtime, not before |
| Trade-off | Larger codebases need tests or type hints |

```python
age = "24"        # perfectly legal — age is now a string
print(age + 1)    # TypeError at runtime
```

Python only discovers the problem when that line actually runs.

> **Practical advice** — Dynamic typing is a strength while learning and a responsibility in production. Just because a variable *can* change type does not mean it *should*. Keep a variable's type stable and your code stays predictable.

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| Using a variable before assigning it | `NameError` | Assign first: `x = 0` |
| Spaces or dashes in a name | `SyntaxError` | Use `student_name` |
| Starting a name with a digit | `SyntaxError` | Use `age1`, not `1age` |
| Using a keyword like `class` | `SyntaxError` | Choose another name |
| Mismatched counts in multiple assignment | `ValueError` | `a, b = 1, 2` not `a, b = 1, 2, 3` |
| Reassigning a constant | Works, but breaks the contract | Treat `UPPER_CASE` as fixed |

---

## Quick Revision

| Topic | Key point | Example |
| ----- | --------- | ------- |
| Creating | Assign with `=` | `name = "Mahesh"` |
| Reading | Use the name | `print(name)` |
| Reassigning | Same name, new value | `age = 25` |
| Naming | Letters, digits, `_`; cannot start with a digit | `student_name` |
| Style | `snake_case` | `total_price` |
| Multiple assignment | Match counts | `a, b, c = 1, 2, 3` |
| Same value | Chain the assignment | `x = y = z = 0` |
| Swapping | Tuple unpacking | `a, b = b, a` |
| Constants | `UPPER_CASE` by convention | `PI = 3.14159` |
| Dynamic typing | Type follows the value | `x = 10` then `x = "hi"` |

### Core patterns

```python
name = "Mahesh"                  # create
age = 24                         # create
age = age + 1                    # update
a, b = 10, 20                    # multiple assignment
a, b = b, a                      # swap
MAX_USERS = 100                  # constant (by convention)
x = 10; x = "ten"                # dynamic typing
```

### The main idea

```text
Variable
 ├── A name pointing at a value
 ├── Created by assignment (=)
 ├── Can be reassigned at any time
 ├── Name it clearly — snake_case
 └── Type comes from the value, not the name
```

---

## Self-Check

- [ ] What is the difference between `=` in Python and `=` in mathematics?
- [ ] Is `student_name` valid? Is `student-name`? Is `2students`?
- [ ] How do you swap two variables without a temporary one, and why does it work?
- [ ] Does `UPPER_CASE` actually prevent reassignment in Python?
- [ ] What does `type(x)` tell you, and how can it change during a program?
