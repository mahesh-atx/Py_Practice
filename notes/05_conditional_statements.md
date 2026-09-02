# Python Conditions — Notes

Conditions allow a program to **make decisions**.

For example:

```python
age = 20

if age >= 18:
    print("Adult")
```

The program checks the condition and decides whether to run the code.

The main keywords are:

```text
if
elif
else
```

---

# 1. `if`

`if` is used when you want to run code **only when a condition is true**.

### Basic syntax

```python
if condition:
    # code
```

Example:

```python
age = 20

if age >= 18:
    print("You are an adult")
```

Output:

```text
You are an adult
```

Here:

```text
age >= 18
```

is the condition.

Since it is `True`, the indented code runs.

### When the condition is false

```python
age = 15

if age >= 18:
    print("You are an adult")
```

There is no output because:

```text
15 >= 18 → False
```

---

# 2. `elif`

`elif` means **else if**.

It is used when you want to check another condition after `if`.

### Basic syntax

```python
if condition1:
    # code
elif condition2:
    # code
```

Example:

```python
marks = 75

if marks >= 90:
    print("Grade A")
elif marks >= 60:
    print("Grade B")
```

Output:

```text
Grade B
```

Python first checks:

```text
marks >= 90
```

This is false.

Then it checks:

```text
marks >= 60
```

This is true.

So it runs the `elif` block.

### Multiple `elif`

You can have multiple `elif` statements.

```python
marks = 75

if marks >= 90:
    print("A")
elif marks >= 80:
    print("B")
elif marks >= 70:
    print("C")
elif marks >= 60:
    print("D")
```

Output:

```text
C
```

Python checks conditions from **top to bottom**.

Once it finds a true condition, it runs that block and skips the remaining conditions.

---

# 3. `else`

`else` runs when **none of the previous conditions are true**.

### Basic syntax

```python
if condition:
    # code
else:
    # code
```

Example:

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

The condition:

```text
age >= 18
```

is false, so `else` runs.

### `if + elif + else`

You can combine all three:

```python
marks = 45

if marks >= 90:
    print("A")
elif marks >= 60:
    print("B")
else:
    print("C")
```

Output:

```text
C
```

The flow is:

```text
if
 ↓
False
 ↓
elif
 ↓
False
 ↓
else
 ↓
Run else
```

---

# 4. Nested Conditions

A nested condition means putting one condition **inside another condition**.

Example:

```python
age = 20
has_id = True

if age >= 18:
    if has_id:
        print("Entry allowed")
```

Output:

```text
Entry allowed
```

The program first checks:

```text
age >= 18
```

Then, if that is true, it checks:

```text
has_id
```

### Another example

```python
username = "admin"
password = "1234"

if username == "admin":
    if password == "1234":
        print("Login successful")
```

Output:

```text
Login successful
```

### Nested `if` with `else`

```python
age = 20

if age >= 18:
    if age >= 60:
        print("Senior citizen")
    else:
        print("Adult")
else:
    print("Minor")
```

Output:

```text
Adult
```

The indentation tells Python which `if` an `else` belongs to.

---

# 5. Multiple Conditions

Multiple conditions can be combined using:

```text
and
or
not
```

## Using `and`

`and` requires **both conditions to be true**.

```python
age = 25

if age >= 18 and age <= 60:
    print("Eligible")
```

Output:

```text
Eligible
```

Both are true:

```text
age >= 18 → True
age <= 60 → True
```

Another example:

```python
username = "admin"
password = "1234"

if username == "admin" and password == "1234":
    print("Login successful")
```

Output:

```text
Login successful
```

---

## Using `or`

`or` requires **at least one condition to be true**.

```python
day = "Sunday"

if day == "Saturday" or day == "Sunday":
    print("Weekend")
```

Output:

```text
Weekend
```

The second condition is true.

---

## Using `not`

`not` reverses a condition.

```python
is_logged_in = False

if not is_logged_in:
    print("Please log in")
```

Output:

```text
Please log in
```

Because:

```text
not False → True
```

---

## Combining multiple operators

You can use more than one logical operator.

```python
age = 25
has_id = True

if age >= 18 and age <= 60 and has_id:
    print("Allowed")
```

All three conditions must be true.

---

# 6. Ternary Expressions

A ternary expression is a short way to write a simple `if-else`.

### Normal `if-else`

```python
age = 20

if age >= 18:
    result = "Adult"
else:
    result = "Minor"

print(result)
```

You can write the same thing using a ternary expression:

```python
age = 20

result = "Adult" if age >= 18 else "Minor"

print(result)
```

Output:

```text
Adult
```

### Syntax

The pattern is:

```python
value_if_true if condition else value_if_false
```

Think of it as:

```text
        condition?
        /       \
     True       False
      ↓           ↓
  first value  second value
```

### Another example

```python
number = 10

result = "Even" if number % 2 == 0 else "Odd"

print(result)
```

Output:

```text
Even
```

### Simple comparison

Normal:

```python
if age >= 18:
    status = "Adult"
else:
    status = "Minor"
```

Ternary:

```python
status = "Adult" if age >= 18 else "Minor"
```

Ternary expressions are best for **short and simple conditions**. For complex logic, normal `if-else` code is easier to read.

---

# Important: Indentation

Python uses indentation to define the code inside a condition.

Correct:

```python
age = 20

if age >= 18:
    print("Adult")
```

Incorrect:

```python
age = 20

if age >= 18:
print("Adult")
```

Use **4 spaces** for the code inside the condition.

---

# Condition Flow

Consider:

```python
marks = 85

if marks >= 90:
    print("A")
elif marks >= 80:
    print("B")
elif marks >= 70:
    print("C")
else:
    print("D")
```

Python checks from top to bottom:

```text
marks >= 90  → False
       ↓
marks >= 80  → True
       ↓
print("B")
       ↓
Stop checking
```

Output:

```text
B
```

Only the **first matching branch** runs.

---

# Quick Revision

| Topic              | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `if`               | Runs code when a condition is true          |
| `elif`             | Checks another condition                    |
| `else`             | Runs when all previous conditions are false |
| Nested conditions  | Condition inside another condition          |
| `and`              | All conditions must be true                 |
| `or`               | At least one condition must be true         |
| `not`              | Reverses a condition                        |
| Ternary expression | Short form of simple `if-else`              |

### Core pattern to remember

```python
if condition:
    # code
elif another_condition:
    # code
else:
    # code
```

And for a simple one-line decision:

```python
result = value1 if condition else value2
```
