# Python Exception Handling — Notes

An **exception** is an error detected while a program runs. Exception handling lets your program respond to errors instead of crashing.

> **Why this matters** — Real programs meet bad input, missing files, and unreachable services. Handling exceptions is the difference between a program that dies with a stack trace and one that says "that file was not found, try again". It is also how you write cleanup code that always runs.

### The mental model

```text
try:      →  "attempt this, it might fail"
except:   →  "if it failed, do this instead"
else:     →  "if it succeeded, do this"
finally:  →  "always do this, whatever happened"
```

### Errors vs exceptions

| | Meaning | Example |
| - | ------- | ------- |
| Syntax error | Code cannot be parsed | `if True` (missing colon) |
| Exception | Valid code fails at runtime | `int("abc")`, `1 / 0` |

Syntax errors must be fixed. Exceptions can be handled.

---

## 1. `try`

`try` wraps code that might fail.

```python
try:
    number = int(input("Enter a number: "))
    print("You entered:", number)
except:
    print("That was not a valid number")
```

If `int()` fails, the `except` block runs instead of the program crashing.

### `try` alone is not enough

```python
try:
    print(10 / 0)
# SyntaxError — a try must have at least one except or finally
```

### What happens without `try`

```python
number = int(input("Enter a number: "))
```

If the user types `abc`:

```text
ValueError: invalid literal for int() with base 10: 'abc'
```

The program stops. With `try`/`except`, it recovers.

### Only wrap what can fail

```python
# Too broad — hides bugs elsewhere
try:
    name = input()
    age = int(input())
    save_to_database(name, age)
except:
    print("Something went wrong")

# Better — wraps only the risky line
name = input()
try:
    age = int(input())
except ValueError:
    print("Please enter a number")
    age = 0
```

> **Rule** — Keep the `try` block as small as possible. A large `try` makes it impossible to know which line failed.

---

## 2. `except`

`except` catches and handles an exception.

### Catching a specific exception

```python
try:
    number = int("abc")
except ValueError:
    print("Could not convert to a number")
```

Output:

```text
Could not convert to a number
```

> **Always catch specific exceptions.** `except ValueError` says what you expect to go wrong. A bare `except` swallows everything, including bugs you did not anticipate.

### Why bare `except` is dangerous

```python
try:
    value = data["key"]
except:                      # catches everything
    value = None
```

This also catches `KeyboardInterrupt` (Ctrl+C) and `SystemExit`, and it hides typos like `dat["key"]`. Catch what you mean:

```python
try:
    value = data["key"]
except KeyError:
    value = None
```

### Catching several exception types

```python
try:
    value = int(input("Enter a number: "))
    result = 100 / value
except ValueError:
    print("That was not a number")
except ZeroDivisionError:
    print("Cannot divide by zero")
```

Or as a tuple, when the handling is the same:

```python
try:
    value = int(input("Enter a number: "))
    result = 100 / value
except (ValueError, ZeroDivisionError):
    print("Invalid input")
```

### Getting the exception object

Use `as` to inspect the error:

```python
try:
    number = int("abc")
except ValueError as e:
    print("Error:", e)
    print("Type:", type(e).__name__)
```

Output:

```text
Error: invalid literal for int() with base 10: 'abc'
Type: ValueError
```

This is invaluable for logging and for showing the user what actually happened.

### Common exception types

| Exception | Raised when |
| --------- | ----------- |
| `ValueError` | Right type, wrong value — `int("abc")` |
| `TypeError` | Wrong type — `"10" + 5` |
| `IndexError` | Index out of range — `list[99]` |
| `KeyError` | Missing dict key |
| `ZeroDivisionError` | Division by zero |
| `FileNotFoundError` | Missing file |
| `AttributeError` | Missing attribute or method |
| `NameError` | Undefined name |
| `ImportError` | Module cannot be imported |

### Multiple `except` blocks

Order matters — Python uses the **first** matching block:

```python
try:
    values = [1, 2]
    print(values[5])
except LookupError:          # parent of IndexError and KeyError
    print("A lookup failed")
except IndexError:           # never reached
    print("Index problem")
```

Output:

```text
A lookup failed
```

> **Rule** — Put the most **specific** exception types first, the more general ones last.

### Catching everything (when you really must)

```python
try:
    risky_operation()
except Exception as e:        # catches all normal exceptions
    print("Failed:", e)
```

`except Exception` still lets `KeyboardInterrupt` and `SystemExit` through, so it is safer than a bare `except`.

---

## 3. `else`

`else` runs only when the `try` block completed **without** an exception.

```python
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("Invalid number")
else:
    print("Valid number:", number)
```

If the user types `42`:

```text
Valid number: 42
```

If they type `abc`:

```text
Invalid number
```

### Why use `else`?

It keeps the success path separate from the risky operation:

```python
# Without else — the second call is also protected
try:
    value = int(input())
    print("Doubled:", value * 2)      # an error here would be caught too
except ValueError:
    print("Invalid")

# With else — only the conversion is protected
try:
    value = int(input())
except ValueError:
    print("Invalid")
else:
    print("Doubled:", value * 2)      # errors here propagate normally
```

> **Rule** — Put only the code that can raise the exception you are catching inside `try`. Put everything that should run on success in `else`.

---

## 4. `finally`

`finally` runs **no matter what** — success, exception, or `return`.

```python
try:
    number = int("abc")
except ValueError:
    print("Conversion failed")
finally:
    print("This always runs")
```

Output:

```text
Conversion failed
This always runs
```

### What `finally` is for: cleanup

```python
file = open("data.txt", "r")

try:
    content = file.read()
    print(content)
except FileNotFoundError:
    print("File not found")
finally:
    file.close()          # runs whether or not reading succeeded
    print("File closed")
```

Without `finally`, an exception would skip `close()` and leak the file handle.

### `finally` runs even with `return`

```python
def test():
    try:
        return "from try"
    finally:
        print("cleanup runs before returning")


print(test())
```

Output:

```text
cleanup runs before returning
from try
```

### `finally` without `except`

A `try`/`finally` pair is legal and means "clean up, but let errors propagate":

```python
resource = acquire()

try:
    process(resource)
finally:
    release(resource)      # always released; any error still propagates
```

> **Modern alternative** — For files, the `with` statement (see *File Handling*) does this automatically and should be preferred.

---

## 5. `raise`

`raise` **throws** an exception yourself.

```python
age = int(input("Enter age: "))

if age < 0:
    raise ValueError("Age cannot be negative")

print("Age:", age)
```

If the user types `-5`:

```text
ValueError: Age cannot be negative
```

### Why raise exceptions?

To signal that something is wrong rather than continuing with bad data:

```python
def calculate_area(radius):
    if radius < 0:
        raise ValueError("radius must be non-negative")
    return 3.14159 * radius ** 2


print(calculate_area(5))       # 78.53975
print(calculate_area(-1))      # ValueError
```

### Re-raising

Catch, log, then pass the exception along:

```python
try:
    process_data()
except ValueError as e:
    print("Logging error:", e)
    raise                      # re-raises the same exception
```

Bare `raise` inside an `except` re-raises the current exception, preserving the traceback.

### Custom exceptions

Define your own by subclassing `Exception`:

```python
class InsufficientFundsError(Exception):
    """Raised when an account has insufficient balance."""
    pass


def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(
            f"Need {amount}, but only {balance} available"
        )
    return balance - amount


try:
    withdraw(100, 150)
except InsufficientFundsError as e:
    print("Transaction failed:", e)
```

Output:

```text
Transaction failed: Need 150, but only 100 available
```

Custom exceptions make error handling precise — callers can catch your error specifically.

### `raise ... from`

Chain exceptions to show cause:

```python
try:
    value = int(user_input)
except ValueError as e:
    raise ValueError(f"Invalid age: {user_input!r}") from e
```

---

## Combining `try`, `except`, `else`, and `finally`

All four in one block, showing the full flow:

```python
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Cannot divide by zero")
        return None
    except TypeError as e:
        print("Invalid types:", e)
        return None
    else:
        print("Division succeeded")
        return result
    finally:
        print("Cleanup: done")


print(divide(10, 2))
print("---")
print(divide(10, 0))
```

Output:

```text
Division succeeded
Cleanup: done
5.0
---
Cannot divide by zero
Cleanup: done
None
```

### The order is fixed

```python
try:
    ...
except SomeError:
    ...
else:
    ...
finally:
    ...
```

`else` and `finally` are both optional; `except` and `else` cannot be combined without `except`.

### Execution flow

```text
try
 ├── success?
 │    ├── yes → else (if present) → finally
 │    └── no  → matching except?
 │                ├── yes → except → finally
 │                └── no  → finally → exception propagates
```

---

## Important Difference: `except` vs `raise`

| | `except` | `raise` |
| - | -------- | ------- |
| Purpose | Handle an error | Create an error |
| Effect | Program continues | Program stops unless caught |
| Used for | Recovery | Reporting invalid state |

```python
# Handling
try:
    value = int(text)
except ValueError:
    value = 0              # recover with a default

# Raising
if value < 0:
    raise ValueError("value must be positive")
```

A robust function often does both: raise on invalid input, and let the caller decide how to handle it.

```python
def get_positive_number(text):
    value = int(text)                     # may raise ValueError
    if value <= 0:
        raise ValueError("must be positive")
    return value


try:
    n = get_positive_number(input("Enter: "))
except ValueError as e:
    print("Invalid:", e)
```

---

## Best Practices

1. **Catch specific exceptions**, not bare `except`.
2. **Keep `try` blocks small** — wrap only the risky line.
3. **Use `else`** for code that should run only on success.
4. **Use `finally`** (or `with`) for cleanup.
5. **Do not silently swallow** exceptions — at minimum, log them.
6. **Raise with a message** so the error explains itself.
7. **Fail fast** — raise early rather than propagating bad data.

```python
# Poor
try:
    do_everything()
except:
    pass                     # silently ignores everything

# Good
try:
    config = load_config(path)
except FileNotFoundError:
    print(f"Config not found at {path}; using defaults")
    config = DEFAULT_CONFIG
```

---

## Common Mistakes to Avoid

| Mistake | Why it is bad | Fix |
| ------- | ------------- | --- |
| Bare `except:` | Hides real bugs, catches Ctrl+C | `except ValueError:` |
| `except:` with `pass` | Errors disappear silently | Log it or handle it |
| Catching too broad a block | Cannot tell which line failed | Narrow the `try` |
| General exception before specific | Specific handler never runs | Order specific → general |
| Using `finally` where `with` fits | More code, easy to forget | Use `with open(...)` |
| Raising without a message | Unhelpful errors | `raise ValueError("why")` |
| Using exceptions for normal control flow | Slow and confusing | Use `if`/`else` for expected cases |

---

## Quick Revision

| Block | Runs when | Purpose |
| ----- | --------- | ------- |
| `try` | Always attempted | Wrap risky code |
| `except E` | That exception occurred | Handle a specific error |
| `except (A, B)` | Either occurred | Handle several the same way |
| `except E as e` | That exception occurred | Inspect the error |
| `else` | No exception occurred | Success path |
| `finally` | Always | Cleanup |
| `raise E("msg")` | You call it | Signal an error |
| `raise` | Inside `except` | Re-raise the current error |

### Core patterns

```python
try:
    value = int(text)
except ValueError:
    value = 0

try:
    value = int(text)
except ValueError as e:
    print("Error:", e)
else:
    print("OK:", value)
finally:
    print("done")

try:
    f = open("data.txt")
    data = f.read()
except FileNotFoundError:
    data = ""
finally:
    f.close()

# Better — no manual close needed
with open("data.txt") as f:
    data = f.read()

if x < 0:
    raise ValueError("x must be non-negative")

class MyError(Exception):
    pass
```

### The main idea

```text
Exception handling
 ├── try      → attempt code that may fail
 ├── except   → handle a specific error (never bare except)
 ├── else     → run only if nothing failed
 ├── finally  → always run (cleanup)
 ├── raise    → signal an error yourself
 └── Custom exceptions → subclass Exception for precise errors
```

---

## Self-Check

- [ ] Why is a bare `except:` considered bad practice?
- [ ] What runs in `else`, and why is it better than putting that code in `try`?
- [ ] Does `finally` run if the `try` block returns a value?
- [ ] How do you catch a `ValueError` and print its message?
- [ ] What does a bare `raise` (inside `except`) do?
- [ ] Why must specific exceptions be listed before general ones?
- [ ] How do you define your own exception type?
- [ ] What is the difference between `except` and `raise`?
