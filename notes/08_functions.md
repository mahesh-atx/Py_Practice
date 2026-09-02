# Python Functions — Notes

A **function** is a reusable block of code that performs a specific task.

Instead of writing the same code again and again, you can put it inside a function and call the function whenever you need it.

Example:

```python
def greet():
    print("Hello!")
```

Calling the function:

```python
greet()
```

Output:

```text
Hello!
```

The main function topics are creating functions, parameters, arguments, return values, default parameters, keyword arguments, `*args`, `**kwargs`, scope, and lambda functions.

---

# 1. Creating Functions

A function is created using the `def` keyword.

### Basic syntax

```python
def function_name():
    # code
```

Example:

```python
def greet():
    print("Hello, Python!")
```

This only **creates** the function. The code inside it does not run yet.

To run it, call the function:

```python
greet()
```

Output:

```text
Hello, Python!
```

### Function can be called multiple times

```python
def greet():
    print("Hello!")

greet()
greet()
greet()
```

Output:

```text
Hello!
Hello!
Hello!
```

This is one of the main benefits of functions: **write once, use many times**.

---

# 2. Parameters

A parameter is a variable written inside the function definition.

It allows the function to receive data.

```python
def greet(name):
    print(f"Hello, {name}!")
```

Here:

```text
name
```

is a parameter.

When calling the function:

```python
greet("Mahesh")
```

Output:

```text
Hello, Mahesh!
```

Another example:

```python
def add(a, b):
    print(a + b)
```

Here:

```text
a
b
```

are parameters.

---

# 3. Arguments

An argument is the **actual value** passed to a function when calling it.

Example:

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Mahesh")
```

Here:

```text
name   → parameter
"Mahesh" → argument
```

Another example:

```python
def add(a, b):
    print(a + b)

add(10, 20)
```

Here:

```text
a → 10
b → 20
```

`10` and `20` are arguments.

### Parameter vs argument

```python
def greet(name):
    print(name)

greet("Mahesh")
```

Think:

```text
Function definition:
name → parameter

Function call:
"Mahesh" → argument
```

---

# 4. Return Values

`return` is used to send a value back from a function.

Example:

```python
def add(a, b):
    return a + b
```

Now:

```python
result = add(10, 20)

print(result)
```

Output:

```text
30
```

The function calculates:

```text
10 + 20 = 30
```

and `return` sends `30` back to the caller.

### `print()` vs `return`

This is important.

Using `print()`:

```python
def add(a, b):
    print(a + b)
```

The function displays the result.

Using `return`:

```python
def add(a, b):
    return a + b
```

The function sends the result back so you can store or use it.

For example:

```python
result = add(10, 20)

print(result * 2)
```

Output:

```text
60
```

The returned value can be used elsewhere.

### `return` stops the function

```python
def test():
    return 10
    print("Hello")

print(test())
```

Output:

```text
10
```

The `print("Hello")` is never reached because `return` ends the function.

---

# 5. Default Parameters

A default parameter has a value that is used when no argument is provided.

Example:

```python
def greet(name="Guest"):
    print(f"Hello, {name}!")
```

Calling without an argument:

```python
greet()
```

Output:

```text
Hello, Guest!
```

Calling with an argument:

```python
greet("Mahesh")
```

Output:

```text
Hello, Mahesh!
```

The given argument replaces the default value.

### Another example

```python
def power(number, exponent=2):
    return number ** exponent
```

Now:

```python
print(power(5))
```

Output:

```text
25
```

Because the default exponent is `2`.

You can also provide it:

```python
print(power(5, 3))
```

Output:

```text
125
```

---

# 6. Keyword Arguments

Normally, arguments are passed based on their position.

```python
def student(name, age):
    print(name, age)

student("Mahesh", 24)
```

Here:

```text
name → "Mahesh"
age  → 24
```

With keyword arguments, you can specify the parameter name directly.

```python
student(age=24, name="Mahesh")
```

Output:

```text
Mahesh 24
```

The order does not matter because the parameter names are given.

### Another example

```python
def introduce(name, age, city):
    print(f"{name} is {age} years old and lives in {city}.")
```

You can call:

```python
introduce(
    city="Akola",
    name="Mahesh",
    age=24
)
```

The values go to the correct parameters by name.

### Positional vs keyword arguments

Positional:

```python
introduce("Mahesh", 24, "Akola")
```

Keyword:

```python
introduce(name="Mahesh", age=24, city="Akola")
```

---

# 7. `*args`

`*args` allows a function to accept **any number of positional arguments**.

Example:

```python
def add(*args):
    print(args)
```

Now you can pass different numbers of values:

```python
add(10)
add(10, 20)
add(10, 20, 30)
```

`args` receives the values as a **tuple**.

For example:

```python
def add(*args):
    print(args)

add(10, 20, 30)
```

Output:

```text
(10, 20, 30)
```

You can loop through `args`:

```python
def add(*args):
    total = 0

    for number in args:
        total += number

    return total
```

Now:

```python
print(add(10, 20))
print(add(10, 20, 30, 40))
```

Output:

```text
30
100
```

### Important

The name `args` is only a common convention.

The `*` is what matters:

```python
def add(*numbers):
    print(numbers)
```

This works too.

---

# 8. `**kwargs`

`**kwargs` allows a function to accept **any number of keyword arguments**.

The values are stored as a **dictionary**.

Example:

```python
def show_info(**kwargs):
    print(kwargs)
```

Call:

```python
show_info(name="Mahesh", age=24, city="Akola")
```

Output:

```text
{'name': 'Mahesh', 'age': 24, 'city': 'Akola'}
```

You can loop through it:

```python
def show_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")
```

Calling:

```python
show_info(name="Mahesh", age=24, city="Akola")
```

Output:

```text
name: Mahesh
age: 24
city: Akola
```

### `*args` vs `**kwargs`

```text
*args
→ Multiple positional arguments
→ Stored as a tuple

**kwargs
→ Multiple keyword arguments
→ Stored as a dictionary
```

Example:

```python
def example(*args, **kwargs):
    print(args)
    print(kwargs)
```

Calling:

```python
example(10, 20, name="Mahesh", age=24)
```

Output:

```text
(10, 20)
{'name': 'Mahesh', 'age': 24}
```

---

# 9. Scope

Scope determines **where a variable can be accessed**.

The two basic scopes you need to know here are:

```text
Local scope
Global scope
```

## Local Scope

A variable created inside a function is usually local to that function.

```python
def greet():
    name = "Mahesh"
    print(name)

greet()
```

This works because `name` is used inside the function.

But:

```python
def greet():
    name = "Mahesh"

greet()

print(name)
```

This causes an error because `name` exists only inside the function.

Think:

```text
Function
└── name → available here

Outside
└── name → not available
```

---

## Global Scope

A variable created outside a function is in the global scope.

```python
name = "Mahesh"

def greet():
    print(name)

greet()
```

Output:

```text
Mahesh
```

The function can read the global variable.

### Local and global variables with the same name

```python
name = "Mahesh"

def greet():
    name = "Rahul"
    print(name)

greet()

print(name)
```

Output:

```text
Rahul
Mahesh
```

The local `name` is different from the global `name`.

---

# 10. Lambda Functions

A lambda function is a small function written in a single line.

### Normal function

```python
def square(x):
    return x * x
```

Equivalent lambda:

```python
square = lambda x: x * x
```

Now:

```python
print(square(5))
```

Output:

```text
25
```

### Syntax

```python
lambda parameters: expression
```

Example:

```python
double = lambda x: x * 2

print(double(5))
```

Output:

```text
10
```

Another example:

```python
add = lambda a, b: a + b

print(add(10, 20))
```

Output:

```text
30
```

### Lambda with no parameters

```python
greet = lambda: "Hello"

print(greet())
```

Output:

```text
Hello
```

Lambda functions are useful for **small, simple functions**.

For larger or more complex logic, a normal `def` function is easier to read.

---

# Function Flow

A useful way to understand functions is:

```text
Create function
      ↓
Define parameters
      ↓
Call function
      ↓
Pass arguments
      ↓
Function runs
      ↓
Return value
```

Example:

```python
def multiply(a, b):
    return a * b

result = multiply(5, 4)

print(result)
```

Flow:

```text
a → 5
b → 4
   ↓
5 * 4
   ↓
20
   ↓
return 20
   ↓
result = 20
```

---

# Quick Revision

| Topic              | Main idea                             | Example                   |
| ------------------ | ------------------------------------- | ------------------------- |
| Creating functions | Define reusable code                  | `def greet():`            |
| Parameters         | Variables in the function definition  | `def greet(name):`        |
| Arguments          | Values passed to a function           | `greet("Mahesh")`         |
| Return values      | Send a result back                    | `return result`           |
| Default parameters | Use a value when no argument is given | `def greet(name="Guest")` |
| Keyword arguments  | Pass values by parameter name         | `greet(name="Mahesh")`    |
| `*args`            | Accept many positional arguments      | `def add(*args)`          |
| `**kwargs`         | Accept many keyword arguments         | `def info(**kwargs)`      |
| Scope              | Controls where variables can be used  | Local / Global            |
| Lambda             | Small one-line function               | `lambda x: x * 2`         |

### Most important patterns

Create:

```python
def greet():
    print("Hello")
```

Parameter:

```python
def greet(name):
    print(name)
```

Argument:

```python
greet("Mahesh")
```

Return:

```python
def add(a, b):
    return a + b
```

Default parameter:

```python
def greet(name="Guest"):
    print(name)
```

Keyword argument:

```python
greet(name="Mahesh")
```

`*args`:

```python
def add(*args):
    return sum(args)
```

`**kwargs`:

```python
def show(**kwargs):
    print(kwargs)
```

Lambda:

```python
square = lambda x: x * x
```

A good mental model is:

```text
def       → create function
parameter → receives data
argument  → sends data
return    → sends result back
*args     → many positional values
**kwargs  → many named values
scope     → where a variable exists
lambda    → small one-line function
```
