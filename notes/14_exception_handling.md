# Python Exception Handling — Notes

Exception handling is used to **handle errors in a controlled way** so that your program does not stop suddenly when an error happens.

For example:

```python id="m8j6q1"
number = int(input("Enter a number: "))
print(number)
```

If the user enters:

```text
hello
```

Python raises an error because `"hello"` cannot be converted into an integer.

Exception handling lets you handle this situation.

---

# 1. `try`

The `try` block contains code that **might cause an error**.

### Basic syntax

```python id="y7d4w2"
try:
    # code that might cause an error
```

Example:

```python id="4q1j5d"
try:
    number = int("hello")
```

The conversion causes an exception.

Usually, `try` is used together with `except`.

---

# 2. `except`

`except` is used to **handle an exception**.

### Basic syntax

```python id="0bqg7n"
try:
    # risky code
except:
    # code to run if an error happens
```

Example:

```python id="0v8m7h"
try:
    number = int("hello")
except:
    print("Something went wrong")
```

Output:

```text id="t7a5pg"
Something went wrong
```

Instead of the program stopping with an error message, the `except` block runs.

---

## Handling a specific exception

It is better to catch the type of error you expect.

Example:

```python id="r7c7j4"
try:
    number = int("hello")
except ValueError:
    print("Please enter a valid number")
```

Output:

```text id="n5c0y2"
Please enter a valid number
```

Here, `ValueError` is the type of exception caused by the invalid conversion.

### Another example

```python id="j4k6g3"
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
```

Output:

```text id="5asq1v"
Cannot divide by zero
```

---

# 3. `else`

The `else` block runs when **no exception occurs** in the `try` block.

### Syntax

```python id="ip7n7c"
try:
    # code
except:
    # runs if error occurs
else:
    # runs if no error occurs
```

Example:

```python id="n5o5b9"
try:
    number = int("25")
except ValueError:
    print("Invalid number")
else:
    print("Number is valid")
```

Output:

```text id="f8vwmr"
Number is valid
```

If an exception occurs:

```python id="l65s9d"
try:
    number = int("hello")
except ValueError:
    print("Invalid number")
else:
    print("Number is valid")
```

Output:

```text id="0r3fzo"
Invalid number
```

The `else` block does not run because there was an error.

### Simple idea

```text id="v7l8n3"
try
 ↓
Error?
 ├── Yes → except
 └── No  → else
```

---

# 4. `finally`

The `finally` block runs **no matter what happens**.

It runs whether an exception occurs or not.

### Syntax

```python id="3qj9w6"
try:
    # code
except:
    # error handling
finally:
    # always runs
```

Example:

```python id="2r0u4e"
try:
    number = int("25")
except ValueError:
    print("Invalid number")
finally:
    print("Program finished")
```

Output:

```text id="j0xkfc"
Program finished
```

Even if an error happens:

```python id="8q0x9s"
try:
    number = int("hello")
except ValueError:
    print("Invalid number")
finally:
    print("Program finished")
```

Output:

```text id="1t2jkc"
Invalid number
Program finished
```

The `finally` block still runs.

### Common use

`finally` is useful when something must happen at the end, such as cleanup work.

For example:

```python id="8p7hwd"
try:
    print("Doing some work")
except:
    print("An error occurred")
finally:
    print("Finished")
```

---

# 5. `raise`

`raise` is used to **manually create an exception**.

You use it when you want to stop normal execution and report a problem yourself.

### Basic syntax

```python id="a7u0x4"
raise Exception("message")
```

Example:

```python id="m0rhpx"
age = -5

if age < 0:
    raise ValueError("Age cannot be negative")
```

This raises:

```text id="3yjg4d"
ValueError: Age cannot be negative
```

Here, Python did not automatically find the problem. You chose to raise the exception because the value is not valid.

---

## `raise` with `try-except`

You can raise an exception and then handle it.

```python id="p8o5ep"
try:
    age = -5

    if age < 0:
        raise ValueError("Age cannot be negative")

except ValueError as error:
    print(error)
```

Output:

```text id="tr8h1s"
Age cannot be negative
```

The `as error` part stores the exception message in the variable `error`.

---

# Combining `try`, `except`, `else`, and `finally`

You can use all four together:

```python id="59u1qf"
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("Invalid input")
else:
    print(f"You entered {number}")
finally:
    print("Done")
```

### If the user enters `25`

```text id="t8ve0v"
Enter a number: 25
You entered 25
Done
```

### If the user enters `hello`

```text id="7f0c7o"
Enter a number: hello
Invalid input
Done
```

The flow is:

```text id="cv4zxl"
try
 │
 ├── Error → except
 │
 └── No error → else
             │
             ↓
          finally
```

`finally` runs in both cases.

---

# Multiple `except` Blocks

You can handle different exception types separately.

```python id="e8b9bt"
try:
    number = int(input("Enter a number: "))
    result = 10 / number

except ValueError:
    print("Please enter a valid number")

except ZeroDivisionError:
    print("Number cannot be zero")
```

For example, entering:

```text id="q9n1m4"
abc
```

produces:

```text id="8q4f7c"
Please enter a valid number
```

Entering:

```text id="x8z7l2"
0
```

produces:

```text id="w2y1f8"
Number cannot be zero
```

---

# Important Difference: `except` vs `raise`

`except` is used to **handle** an exception:

```python id="j15c1k"
try:
    number = int("hello")
except ValueError:
    print("Invalid number")
```

`raise` is used to **create an exception yourself**:

```python id="c0b6ny"
if age < 0:
    raise ValueError("Invalid age")
```

Think:

```text id="1z4o3c"
raise  → "There is a problem!"
except → "I will handle that problem."
```

---

# Quick Revision

| Keyword   | Purpose                                   |
| --------- | ----------------------------------------- |
| `try`     | Contains code that may cause an exception |
| `except`  | Handles the exception                     |
| `else`    | Runs when no exception occurs             |
| `finally` | Runs whether an exception occurs or not   |
| `raise`   | Manually raises an exception              |

### Core pattern

```python id="k2l9xq"
try:
    # code that may cause an error

except ValueError:
    # handle the error

else:
    # runs if there is no error

finally:
    # always runs
```

### Simple mental model

```text id="g9s4tj"
try
  ↓
Something goes wrong?
  ↓
Yes ──→ except
  │
  No
  ↓
else
  │
  ↓
finally
```

The key idea is that **exception handling lets your program deal with errors instead of stopping unexpectedly**.
