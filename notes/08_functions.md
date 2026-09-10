# Functions

> A function is a **named, reusable block of code**. Write logic once, call it anywhere. Functions are how programs stay small, readable, and testable — one of the most important topics in this roadmap.

---

## 1. Creating Functions

Define with `def`, then **call** it by name with `()`.

```python
def greet():
    print("Hello, welcome!")

greet()     # call it → Hello, welcome!
greet()     # call again — code runs again
```

The function body only runs when it's **called**, not when it's defined.

---

## 2. Parameters and Arguments

**Parameter** = the variable in the definition. **Argument** = the actual value you pass in.

```python
def greet(name):          # 'name' is a parameter
    print(f"Hello, {name}!")

greet("Ravi")             # "Ravi" is an argument
greet("Asha")
```

Multiple parameters:

```python
def add(a, b):
    print(f"{a} + {b} = {a + b}")

add(3, 5)                 # 3 + 5 = 8
```

By default, arguments match parameters **by position** — order matters.

---

## 3. Return Values

`return` sends a value back to the caller. This is what makes functions truly reusable — they *produce results* instead of just printing.

```python
def add(a, b):
    return a + b

result = add(3, 5)        # result = 8
total = add(10, add(1, 2))    # returns can be used anywhere
```

**Key rules:**
- A function without `return` gives back `None`.
- Code after `return` never runs (the function exits immediately).
- You can return several values (it's actually a tuple):

```python
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([4, 1, 9, 2])
print(lo, hi)             # 1 9
```

**print vs return — beginners mix these up:**
```python
def square_print(x):
    print(x * x)          # shows it, but returns None

def square_return(x):
    return x * x          # gives back the value → usable in math

y = square_return(4) * 2  # ✅ 32
y = square_print(4) * 2   # ❌ TypeError: None * 2
```

---

## 4. Default Parameters

Give a parameter a fallback value — it becomes optional.

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Ravi")                 # Hello, Ravi!
greet("Ravi", "Good morning") # Good morning, Ravi!
```

⚠️ **Classic gotcha** — don't use a mutable object (list/dict) as a default:

```python
# ❌ The SAME list is reused across calls!
def add_item(item, box=[]):
    box.append(item)
    return box

print(add_item("a"))   # ['a']
print(add_item("b"))   # ['a', 'b']  ← surprise!

# ✅ Correct version:
def add_item(item, box=None):
    if box is None:
        box = []
    box.append(item)
    return box
```

---

## 5. Keyword Arguments

Call with named arguments — order no longer matters.

```python
def create_user(name, age, city):
    print(f"{name}, {age}, from {city}")

create_user(age=21, city="Nashik", name="Ravi")   # any order ✅

# Mixing: positional first, then keywords
create_user("Ravi", age=21, city="Nashik")        # ✅
create_user(name="Ravi", 21, "Nashik")            # ❌ SyntaxError
```

---

## 6. *args — any number of positional arguments

`*args` collects extra positional arguments into a **tuple**.

```python
def total(*numbers):
    print(numbers)            # (1, 2, 3) — a tuple
    return sum(numbers)

print(total(1, 2, 3))         # 6
print(total(10, 20))          # 30
print(total())                # 0
```

Real example:

```python
def average(*numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

print(average(80, 75, 90))    # 81.666...
```

---

## 7. **kwargs — any number of keyword arguments

`**kwargs` collects extra named arguments into a **dictionary**.

```python
def profile(**info):
    print(info)               # {'name': 'Ravi', 'age': 21}
    for key, value in info.items():
        print(f"{key}: {value}")

profile(name="Ravi", age=21, city="Nashik")
```

The full signature order, when you combine everything:

```python
def func(positional, default="x", *args, **kwargs):
    ...
```

You'll see `*args, **kwargs` constantly in library code — it means "this function accepts anything and forwards it".

---

## 8. Scope — where variables live

**Rule: variables created inside a function are local — they exist only there.**

```python
def my_func():
    x = 10          # local variable
    print(x)

my_func()           # 10
print(x)            # ❌ NameError: x is not defined out here
```

Functions can **read** global variables, but assigning creates a new local one unless you say otherwise:

```python
count = 0                    # global

def increment():
    global count             # needed to MODIFY the global
    count += 1

increment()
print(count)                 # 1
```

**Best practice:** avoid `global`. Pass values in as parameters and `return` results out — it keeps functions predictable:

```python
def increment(count):
    return count + 1

count = increment(count)
```

Scope lookup order (if you're curious): **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in.

---

## 9. Lambda Functions — small anonymous functions

One-line, unnamed functions. Syntax: `lambda params: expression`

```python
square = lambda x: x * x
print(square(5))            # 25

add = lambda a, b: a + b
print(add(2, 3))            # 5
```

Their main job: quick throwaway functions passed to other functions, especially `sorted()`:

```python
students = [("Ravi", 78), ("Asha", 92), ("Kiran", 85)]

# sort by marks (2nd item of each tuple)
students.sort(key=lambda s: s[1])
print(students)     # [('Ravi', 78), ('Kiran', 85), ('Asha', 92)]
```

If the logic needs more than one expression, write a normal `def` instead — it's more readable.

---

## Quick Revision

- `def name(params):` defines; `name(args)` calls.
- `return` sends a value back; no return → `None`. **Prefer return over print** for results.
- Defaults make parameters optional; never use `[]` as a default.
- Keyword arguments make calls readable; positional args must come first.
- `*args` → tuple of extras; `**kwargs` → dict of named extras.
- Variables inside a function are local; avoid `global`, pass & return instead.
- `lambda x: expr` for tiny one-line functions, mostly as `key=` for sorting.

### Practice
1. Write `is_even(n)` that returns True/False; test it in a loop over 1–10.
2. Write `calculate(a, b, op="add")` supporting add/sub/mul via keyword argument.
3. Write `stats(*numbers)` returning min, max and average.
4. Sort a list of `(name, marks)` tuples by marks using a lambda.

✅ Next → **14-comprehensions.md**
