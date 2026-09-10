# Variables

> A variable is a **name that refers to a value** stored in memory. This is one of the most-used concepts in all of programming — understand it well.

---

## 1. Creating Variables

In Python, you create a variable simply by assigning a value with `=`. No keywords like `int` or `var` are needed.

```python
name = "Ravi"
age = 21
price = 99.5
is_student = True

print(name)        # Ravi
print(age)         # 21
```

Think of a variable as a **name tag tied to a value**:

```
name  ──►  "Ravi"
age   ──►  21
```

When you reassign, the name tag moves to the new value:

```python
age = 21
age = 22        # name 'age' now points to 22
```

---

## 2. Naming Rules

**Must follow (or you get an error):**
- Only letters, digits, and underscore `_`
- Cannot start with a digit → `2name` ❌
- Cannot be a Python keyword → `if`, `for`, `class`, `return`, etc. ❌
- Case-sensitive → `score` and `Score` are different variables

**Conventions (follow these — every Python dev does):**
- Use `snake_case`: `total_price`, `user_name` (not `totalPrice`)
- Names must describe the value: `age` is better than `a`
- Avoid confusing names like `l` (looks like 1) or `O` (looks like 0)

```python
# Good
student_name = "Asha"
final_score = 88

# Bad / invalid
2students = "x"     # ❌ starts with digit
my-score = 10       # ❌ hyphen not allowed (Python reads it as subtraction)
```

---

## 3. Multiple Assignment

Assign several variables in one line:

```python
x, y, z = 1, 2, 3
print(x, y, z)      # 1 2 3
```

Same value to many variables:

```python
a = b = c = 0
```

**Classic trick — swapping two values without a temp variable:**

```python
a, b = 5, 9
a, b = b, a         # swap!
print(a, b)         # 9 5
```

---

## 4. Constants

Python has **no true constants**. The convention is to write the name in `ALL_CAPS` and simply agree not to change it.

```python
PI = 3.14159
MAX_USERS = 100
TAX_RATE = 0.18
```

You *can* technically reassign `PI`, but by convention you never do.

---

## 5. Dynamic Typing

Python is **dynamically typed**: a variable's type is decided by the value it holds, and the *same name* can point to different types over time.

```python
x = 10          # x is an int
x = "ten"       # now x is a str — perfectly legal
x = [1, 2, 3]   # now x is a list
```

Compare with statically typed languages (Java, C++), where you must declare `int x = 10;` and `x` can never become a string.

**Pros:** less code, faster to write, very flexible.
**Cons:** type mistakes show up only when the code *runs*, not while writing. That's why you'll learn `type()` and, later, type hints.

```python
x = 10
print(type(x))      # <class 'int'>
x = "ten"
print(type(x))      # <class 'str'>
```

---

## 6. Common Beginner Mistakes

Every beginner hits these three. Read them now so you recognize the errors instantly when they happen:

```python
# Using a variable before creating it
print(total)        # ❌ NameError: name 'total' is not defined

# Thinking variable names are case-insensitive
Age = 21
print(age)          # ❌ NameError — 'age' was never created

# Confusing = and ==
age = 20            # assignment (stores a value)
age == 20           # comparison (asks "is age equal to 20?")
```

---

## Quick Revision

- A variable is a name pointing to a value; create it with `name = value`.
- Names: letters/digits/`_`, can't start with a digit, case-sensitive, use `snake_case`.
- Multiple assignment: `x, y = 1, 2` — also the swap trick `a, b = b, a`.
- Constants are just `ALL_CAPS` names by convention.
- Dynamic typing: the same variable can hold any type, at any time.

### Practice
1. Create variables for your name, age, and city, then print them.
2. Swap two variables using one line.
3. Assign `x = 5`, then `x = "five"`, and print `type(x)` after each step.

✅ Next → **03-data-types.md**
