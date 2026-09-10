# Exception Handling

> An **exception** is an error that crashes your program when it runs — bad input, missing file, division by zero. Exception handling lets you **catch** those errors and respond gracefully instead of crashing. Essential for any real program.

---

## 1. What Happens Without Handling

Here's the problem in action. One bad user input and the whole program dies — everything written below that line never runs, and the user just sees an ugly traceback.

```python
age = int(input("Age: "))     # user types "abc"
```
```
ValueError: invalid literal for int() with base 10: 'abc'
→ program CRASHES here, nothing below runs
```

---

## 2. try / except — the core pattern

Put risky code in `try`. If an error happens, Python **jumps to `except`** instead of crashing.

```python
try:
    age = int(input("Age: "))
    print("Next year you'll be", age + 1)
except ValueError:
    print("That's not a valid number. Please enter digits only.")

print("Program continues normally ✅")
```

**Always catch a specific exception** (`except ValueError`) rather than a bare `except:` — a bare except hides every error, including your own bugs.

Common exceptions you'll meet:

| Exception | When it happens |
|-----------|----------------|
| `ValueError` | wrong type of value, e.g. `int("abc")` |
| `TypeError` | wrong type operation, e.g. `"2" + 2` |
| `ZeroDivisionError` | dividing by 0 |
| `KeyError` | missing dict key |
| `IndexError` | list index out of range |
| `FileNotFoundError` | opening a file that doesn't exist |
| `NameError` | using a variable that doesn't exist |

---

## 3. Getting the Error Message with `as`

Adding `as e` captures the exception object into a variable so you can read its message — great for logging or showing the user what went wrong. You can also stack several `except` blocks to react differently to each error type; Python picks the first one that matches.

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print("Error details:", e)      # division by zero
```

Handling different errors differently:

```python
try:
    nums = [1, 2, 3]
    print(nums[5] / 0)
except IndexError:
    print("That index doesn't exist")
except ZeroDivisionError:
    print("Can't divide by zero")
except (TypeError, ValueError):     # several in one block
    print("Bad value or type")
```

---

## 4. else — runs only if NO exception happened

It feels backwards at first, but `else` belongs to `try`: it runs only when the try block survived with no errors.

```python
try:
    num = int(input("Number: "))
except ValueError:
    print("Not a number!")
else:
    print(f"Success! You entered {num}")   # only if try worked
    print("Its square is", num * num)
```

Why use `else`? It separates *"the risky part"* (try) from *"what to do with the result"* — cleaner and safer.

---

## 5. finally — runs ALWAYS, error or not

Used for cleanup that must happen no matter what (closing things, saving state).

```python
try:
    f = open("data.txt")
    content = f.read()
except FileNotFoundError:
    print("File missing")
else:
    print("Read", len(content), "characters")
finally:
    print("This runs either way")
```

The full flow: `try` → `except` (if error) / `else` (if no error) → `finally` (always).

---

## 6. raise — throw your own exceptions

Use `raise` to reject invalid situations **you** define:

```python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if not isinstance(age, int):
        raise TypeError("Age must be a whole number")
    return age

try:
    set_age(-5)
except ValueError as e:
    print("Rejected:", e)      # Rejected: Age cannot be negative
```

**Guideline:** raise for programmer/logic errors; use try/except for *external* unpredictable things (user input, files, network).

---

## 7. A Realistic Example — Safe Input Loop

Combines everything you've learned:

```python
def get_positive_number():
    while True:
        try:
            n = float(input("Enter a positive number: "))
        except ValueError:
            print("That's not a number, try again.")
            continue
        if n <= 0:
            print("Must be positive, try again.")
            continue
        return n

num = get_positive_number()
print("You entered:", num)
```

---

## Quick Revision

- `try` = risky code; `except SpecificError` = handle it without crashing.
- Catch **specific** exceptions; use `as e` to read the message.
- `else` runs when no error occurred; `finally` runs always.
- `raise` lets you throw your own errors for invalid data.
- Pattern of the road: loops + try/except for validating user input.

### Practice
1. Safely divide two user-input numbers (handle zero and non-numeric input).
2. Access a missing key in a dict inside try/except KeyError.
3. Write `withdraw(balance, amount)` that raises ValueError if amount > balance.

✅ Next → **16-file-handling.md**
