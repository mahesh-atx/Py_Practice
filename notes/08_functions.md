# Python Functions — Notes

A **function** is a named, reusable block of code that performs a specific task.

> **Why this matters** — Functions are how you stop repeating yourself. They let you give a name to an idea, test it in isolation, and build larger programs out of small, understood pieces. Good function design is most of what separates readable code from unreadable code.

### The mental model

A function is a machine with inputs and an output:

```text
  arguments  →  [  function  ]  →  return value
                 (parameters)
```

You hand values in, the body runs, and a result comes back. A function that returns nothing gives back `None`.

---

## 1. Creating Functions

Define a function with `def`, then call it by name.

### Basic syntax

```python
def function_name():
    # body
```

### A first function

```python
def greet():
    print("Hello")
    print("Welcome to Python")


greet()
```

Output:

```text
Hello
Welcome to Python
```

### Defining vs calling

Defining a function does **not** run it. Nothing happens until you call it:

```python
def greet():
    print("Hello")

# Nothing printed yet

greet()      # now it runs
greet()      # and again
```

> **Note** — The parentheses in `greet()` are the *call* operator. Writing `greet` without them refers to the function object itself and does nothing.

### Naming functions

Use `snake_case` and a verb:

```python
def calculate_total():      # good — describes the action
    ...

def data():                 # vague
    ...
```

### Docstrings

A string right after the `def` line documents the function:

```python
def calculate_area(radius):
    """Return the area of a circle with the given radius."""
    return 3.14159 * radius ** 2


print(calculate_area(5))
print(calculate_area.__doc__)
```

Output:

```text
78.53975
Return the area of a circle with the given radius.
```

Docstrings are available at runtime and are what `help()` displays.

---

## 2. Parameters

A **parameter** is the variable listed in the function definition — the placeholder that receives a value.

```python
def greet(name):
    print("Hello,", name)


greet("Mahesh")
greet("Nina")
```

Output:

```text
Hello, Mahesh
Hello, Nina
```

### Multiple parameters

```python
def add(a, b):
    print(a + b)


add(10, 20)
add(5, 3)
```

Order matters: the first argument goes to `a`, the second to `b`.

### Parameter count must match

```python
def add(a, b):
    print(a + b)

add(10)          # TypeError: missing 1 required positional argument
add(10, 20, 30)  # TypeError: takes 2 positional arguments but 3 were given
```

### Parameters are local

Names inside a function exist only inside it:

```python
def greet(name):
    print(name)

greet("Mahesh")
print(name)      # NameError: name 'name' is not defined
```

### Type hints (optional)

Modern Python lets you annotate types. They are documentation — Python does not enforce them:

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

---

## 3. Arguments

An **argument** is the actual value you pass when calling.

```python
def greet(name):        # name is a parameter
    print("Hello,", name)

greet("Mahesh")         # "Mahesh" is an argument
```

### Parameter vs argument

```text
def greet(name):     ← name is the parameter (the placeholder)
greet("Mahesh")      ← "Mahesh" is the argument (the actual value)
```

### Positional arguments

Matched by order:

```python
def describe(name, age):
    print(f"{name} is {age}")

describe("Mahesh", 24)      # name="Mahesh", age=24
describe(24, "Mahesh")      # name=24, age="Mahesh"  ← wrong order!
```

### Keyword arguments

Matched by name, so order does not matter:

```python
describe(name="Mahesh", age=24)
describe(age=24, name="Mahesh")      # same result
```

### Mixing positional and keyword

Positional arguments must come **first**:

```python
describe("Mahesh", age=24)      # valid
describe(name="Mahesh", 24)     # SyntaxError
```

### Arguments can be expressions

```python
def double(x):
    return x * 2

print(double(5 + 3))      # 16 — the expression is evaluated first
print(double(double(3)))  # 12
```

---

## 4. Return Values

`return` sends a value back to the caller and **ends the function immediately**.

### Basic example

```python
def add(a, b):
    return a + b


result = add(10, 20)
print(result)
```

Output:

```text
30
```

### `return` vs `print`

This is the most important distinction in this topic.

```python
# Version A: prints
def add_print(a, b):
    print(a + b)

# Version B: returns
def add_return(a, b):
    return a + b


result_a = add_print(10, 20)     # prints 30
print(result_a)                  # None  ← nothing came back

result_b = add_return(10, 20)    # prints nothing
print(result_b)                  # 30
```

| | `print()` | `return` |
| - | --------- | -------- |
| Shows a value to the user | Yes | No |
| Gives a value to the caller | No | Yes |
| Value captured in a variable | `None` | The returned value |
| Can be reused in further calculations | No | Yes |

> **Rule** — Use `return` to hand a result back to your code. Use `print()` only to show something to a human. Beginners overuse `print()` in functions and then cannot reuse the result.

### Returning lets you reuse the value

```python
def square(x):
    return x * x

print(square(5))            # 25
print(square(5) + 1)        # 26
print(square(square(2)))    # 16
```

With `print()` instead of `return`, every one of those would fail or produce `None`.

### `return` stops the function

```python
def check(n):
    if n > 0:
        return "Positive"
    return "Not positive"


print(check(5))
print(check(-1))
```

Output:

```text
Positive
Not positive
```

```python
def demo():
    return 10
    print("Never runs")     # unreachable


print(demo())
```

Output:

```text
10
```

### Returning multiple values

Separate them with commas — Python returns a tuple:

```python
def min_max(numbers):
    return min(numbers), max(numbers)


low, high = min_max([3, 1, 9, 4])
print(low, high)
```

Output:

```text
1 9
```

### No return means `None`

```python
def greet():
    print("Hello")

print(greet())
```

Output:

```text
Hello
None
```

---

## 5. Default Parameters

A default parameter supplies a value when the caller omits one.

```python
def greet(name="Guest"):
    print("Hello,", name)


greet("Mahesh")
greet()
```

Output:

```text
Hello, Mahesh
Hello, Guest
```

### Multiple defaults

```python
def power(base, exponent=2):
    return base ** exponent


print(power(5))       # 25  → exponent defaults to 2
print(power(5, 3))    # 125
```

### Defaults must come last

```python
def f(a, b=2):       # valid
    ...

def f(a=1, b):       # SyntaxError: non-default argument follows default argument
```

### The mutable default trap

This is a genuine Python gotcha worth memorising:

```python
def add_item(item, items=[]):      # ← dangerous
    items.append(item)
    return items


print(add_item("a"))
print(add_item("b"))
print(add_item("c"))
```

Output:

```text
['a']
['a', 'b']
['a', 'b', 'c']
```

**Why:** the default list is created **once**, when the function is defined — not each time it is called. Every call shares the same list.

**The fix:**

```python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items


print(add_item("a"))
print(add_item("b"))
```

Output:

```text
['a']
['b']
```

> **Rule** — Never use a mutable default (`[]`, `{}`, `set()`). Use `None` and create a fresh object inside the function.

---

## 6. Keyword Arguments

Keyword arguments are passed with `name=value`, making calls self-documenting.

```python
def create_profile(name, age, city):
    print(f"{name}, {age}, {city}")


create_profile(name="Mahesh", age=24, city="Akola")
create_profile(city="Akola", name="Mahesh", age=24)      # order irrelevant
```

Output:

```text
Mahesh, 24, Akola
Mahesh, 24, Akola
```

### Why use keyword arguments?

```python
# Positional — what do these mean?
create_user("Mahesh", True, False, 3)

# Keyword — obvious
create_user(name="Mahesh", is_admin=True, is_active=False, login_attempts=3)
```

Keyword arguments make the call site readable without opening the function.

### Mixing with defaults

```python
def send_email(to, subject="Hello", body=""):
    print(f"To: {to} | Subject: {subject}")


send_email("a@b.com")
send_email("a@b.com", subject="Update")
send_email("a@b.com", body="Hi there")
```

### Required keyword-only arguments

Everything after `*` must be passed by name:

```python
def greet(*, name, message):
    print(f"{message}, {name}")

greet(name="Mahesh", message="Hello")
greet("Mahesh", "Hello")      # TypeError
```

---

## 7. `*args`

`*args` collects any number of **positional** arguments into a tuple.

```python
def add(*args):
    print(args)
    print(type(args))


add(10)
add(10, 20)
add(10, 20, 30)
```

Output:

```text
(10,)
(10, 20)
(10, 20, 30)
<class 'tuple'>
```

### Summing any number of values

```python
def add(*args):
    total = 0
    for n in args:
        total += n
    return total


print(add(1, 2))
print(add(1, 2, 3))
print(add(1, 2, 3, 4, 5))
```

Output:

```text
3
6
15
```

You can also use the built-in `sum()`:

```python
def add(*args):
    return sum(args)
```

### `args` is just a convention

The `*` is what matters; the name is up to you:

```python
def add(*numbers):      # equally valid
    return sum(numbers)
```

### Mixing with regular parameters

```python
def introduce(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}")


introduce("Hello", "Mahesh", "Nina", "Rahul")
```

Output:

```text
Hello, Mahesh
Hello, Nina
Hello, Rahul
```

### Unpacking with `*`

The same star can spread a sequence into arguments:

```python
numbers = [1, 2, 3]

print(add(*numbers))      # same as add(1, 2, 3)
```

---

## 8. `**kwargs`

`**kwargs` collects any number of **keyword** arguments into a dictionary.

```python
def show_info(**kwargs):
    print(kwargs)
    print(type(kwargs))


show_info(name="Mahesh", age=24, city="Akola")
```

Output:

```text
{'name': 'Mahesh', 'age': 24, 'city': 'Akola'}
<class 'dict'>
```

### Iterating over kwargs

```python
def show_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")


show_info(name="Mahesh", age=24)
```

Output:

```text
name: Mahesh
age: 24
```

### Combining everything

The full parameter order is:

```python
def func(positional, *args, default=1, **kwargs):
    ...
```

```python
def order_summary(customer, *items, discount=0, **details):
    print("Customer:", customer)
    print("Items:", items)
    print("Discount:", discount)
    print("Details:", details)


order_summary("Mahesh", "Book", "Pen", discount=10, city="Akola", payment="UPI")
```

Output:

```text
Customer: Mahesh
Items: ('Book', 'Pen')
Discount: 10
Details: {'city': 'Akola', 'payment': 'UPI'}
```

### Unpacking a dict with `**`

```python
def greet(name, age):
    print(f"{name} is {age}")


data = {"name": "Mahesh", "age": 24}
greet(**data)      # same as greet(name="Mahesh", age=24)
```

---

## 9. Scope

**Scope** determines where a variable is visible.

### Local scope

A variable created inside a function is local to it:

```python
def greet():
    message = "Hello"
    print(message)


greet()
print(message)      # NameError
```

### Global scope

A variable created outside any function is global and readable inside functions:

```python
name = "Mahesh"

def greet():
    print("Hello,", name)      # reads the global


greet()
```

Output:

```text
Hello, Mahesh
```

### Local shadows global

```python
name = "Mahesh"

def greet():
    name = "Rahul"       # creates a LOCAL name
    print(name)


greet()
print(name)
```

Output:

```text
Rahul
Mahesh
```

The function's `name` is a separate variable. The global is untouched.

### Modifying a global: the `global` keyword

Assigning inside a function creates a local by default. To modify the global, declare it:

```python
count = 0

def increment():
    global count
    count += 1


increment()
increment()
print(count)
```

Output:

```text
2
```

Without `global`, this raises `UnboundLocalError`, because Python treats `count` as local as soon as it sees an assignment.

> **Use `global` sparingly.** Functions that modify global state are hard to reason about and hard to test. Prefer passing values in and returning results out.

### The LEGB rule

When you reference a name, Python searches four scopes in order:

```text
L  Local       → inside the current function
E  Enclosing   → inside any enclosing function
G  Global      → module level
B  Built-in    → names like print, len, sum
```

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)      # local

    inner()
    print(x)          # enclosing


outer()
print(x)              # global
```

Output:

```text
local
enclosing
global
```

---

## 10. Lambda Functions

A **lambda** is a small anonymous function written on one line.

```python
lambda parameters: expression
```

### Basic example

```python
square = lambda x: x * x

print(square(5))
```

Output:

```text
25
```

Equivalent to:

```python
def square(x):
    return x * x
```

### Several parameters

```python
add = lambda a, b: a + b

print(add(10, 20))
```

Output:

```text
30
```

### With no parameters

```python
greet = lambda: "Hello"

print(greet())
```

Output:

```text
Hello
```

### Lambdas with `sorted()`

The most common real use — custom sort keys:

```python
students = [("Mahesh", 88), ("Nina", 95), ("Rahul", 79)]

# Sort by score (the second element)
students.sort(key=lambda s: s[1])

print(students)
```

Output:

```text
[('Rahul', 79), ('Mahesh', 88), ('Nina', 95)]
```

### With `map()` and `filter()`

```python
numbers = [1, 2, 3, 4, 5]

doubled = list(map(lambda x: x * 2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))

print(doubled)
print(evens)
```

Output:

```text
[2, 4, 6, 8, 10]
[2, 4]
```

> **Note** — In modern Python, list comprehensions are usually preferred:
>
> ```python
> doubled = [x * 2 for x in numbers]
> evens = [x for x in numbers if x % 2 == 0]
> ```

### Lambda vs `def`

| | `lambda` | `def` |
| - | -------- | ----- |
| Name | Anonymous | Named |
| Body | One expression only | Any number of statements |
| Returns | Implicitly | Requires `return` |
| Best for | Short throwaway functions | Everything else |

```python
# Good lambda use — short and obvious
sorted(names, key=lambda n: n.lower())

# Bad lambda use — too complex, use def
process = lambda x: x ** 2 if x > 0 else (0 if x == 0 else -(x ** 2))
```

---

## Function Flow

```text
Define the function   →  def greet(name):
        ↓
Call it               →  greet("Mahesh")
        ↓
Arguments bind to parameters  →  name = "Mahesh"
        ↓
Body executes
        ↓
return sends a value back (or None)
```

```python
def multiply(a, b):
    return a * b

result = multiply(5, 4)
print(result)
```

Output:

```text
20
```

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| Using `print` where `return` is needed | Caller gets `None` | `return` the value |
| Forgetting the parentheses when calling | Nothing runs | `greet()` not `greet` |
| Wrong number of arguments | `TypeError` | Match the parameters |
| Mutable default argument | Values persist between calls | Use `None` as the default |
| Modifying a global without `global` | `UnboundLocalError` | Declare `global`, or return instead |
| Overusing lambda | Unreadable | Use `def` for anything non-trivial |
| Code after `return` | Never executes | Move it above the `return` |

---

## Quick Revision

| Concept | Syntax | Purpose |
| ------- | ------ | ------- |
| Define | `def f():` | Create a function |
| Call | `f()` | Run it |
| Parameter | `def f(a, b):` | Placeholder in the definition |
| Argument | `f(1, 2)` | Actual value passed |
| Return | `return value` | Send a value back |
| Default | `def f(a=1):` | Optional parameter |
| Keyword arg | `f(a=1)` | Pass by name |
| `*args` | `def f(*args):` | Any number of positional args (tuple) |
| `**kwargs` | `def f(**kwargs):` | Any number of keyword args (dict) |
| Docstring | `"""..."""` | Document the function |
| Scope | LEGB | Where a name is visible |
| `global` | `global x` | Modify a global variable |
| Lambda | `lambda x: x * 2` | One-line anonymous function |

### Core patterns

```python
def greet(name):
    return f"Hello, {name}"

def add(a, b=0):
    return a + b

def total(*args):
    return sum(args)

def profile(**kwargs):
    return kwargs

def safe(items=None):
    if items is None:
        items = []
    return items

sorted(data, key=lambda x: x[1])
```

### The main idea

```text
Functions
 ├── def name():        define
 ├── name()             call
 ├── parameters         receive values
 ├── arguments          pass values (positional or keyword)
 ├── return             send a result back (else None)
 ├── defaults           optional parameters — never mutable
 ├── *args / **kwargs   variable numbers of arguments
 ├── scope              LEGB rule
 └── lambda             short one-line functions
```

---

## Self-Check

- [ ] What is the difference between a parameter and an argument?
- [ ] What does a function return if it has no `return` statement?
- [ ] Why is `return` usually better than `print` inside a function?
- [ ] Why is `def f(items=[])` dangerous? What is the fix?
- [ ] What does `*args` collect? What does `**kwargs` collect?
- [ ] What does the LEGB rule stand for?
- [ ] When should you use a lambda instead of `def`?
