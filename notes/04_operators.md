# Python Operators — Notes

Operators are symbols or keywords used to perform operations on values and variables.

Example:

```python
a = 10
b = 5

print(a + b)
```

Here, `+` is an operator.

Python has several types of operators.

---

# 1. Arithmetic Operators

Arithmetic operators are used for mathematical calculations.

| Operator | Name           | Example   | Result |
| -------- | -------------- | --------- | -----: |
| `+`      | Addition       | `10 + 5`  |   `15` |
| `-`      | Subtraction    | `10 - 5`  |    `5` |
| `*`      | Multiplication | `10 * 5`  |   `50` |
| `/`      | Division       | `10 / 5`  |  `2.0` |
| `//`     | Floor division | `10 // 3` |    `3` |
| `%`      | Modulus        | `10 % 3`  |    `1` |
| `**`     | Power          | `2 ** 3`  |    `8` |

### `+` Addition

Adds two values.

```python
a = 10
b = 5

print(a + b)
```

Output:

```text
15
```

It can also join strings:

```python
first = "Hello"
second = " World"

print(first + second)
```

Output:

```text
Hello World
```

---

### `-` Subtraction

Subtracts the second value from the first.

```python
a = 10
b = 5

print(a - b)
```

Output:

```text
5
```

---

### `*` Multiplication

Multiplies values.

```python
a = 10
b = 5

print(a * b)
```

Output:

```text
50
```

It can also repeat strings:

```python
print("Hi " * 3)
```

Output:

```text
Hi Hi Hi
```

---

### `/` Division

Divides one value by another.

```python
print(10 / 2)
```

Output:

```text
5.0
```

Important: `/` normally returns a `float`.

```python
print(type(10 / 2))
```

Output:

```text
<class 'float'>
```

---

### `//` Floor Division

Performs division and returns the floor value.

```python
print(10 // 3)
```

Output:

```text
3
```

Normal division:

```python
10 / 3
```

gives:

```text
3.3333333333333335
```

Floor division:

```python
10 // 3
```

gives:

```text
3
```

---

### `%` Modulus

Returns the **remainder** after division.

```python
print(10 % 3)
```

Output:

```text
1
```

Because:

```text
10 ÷ 3 = 3 remainder 1
```

A common use is checking whether a number is even:

```python
number = 10

print(number % 2)
```

Output:

```text
0
```

If the remainder is `0`, the number is divisible by 2.

---

### `**` Power

Raises a number to a power.

```python
print(2 ** 3)
```

Output:

```text
8
```

Because:

```text
2 × 2 × 2 = 8
```

Another example:

```python
print(5 ** 2)
```

Output:

```text
25
```

---

# 2. Comparison Operators

Comparison operators compare two values.

The result is always:

```python
True
```

or:

```python
False
```

| Operator | Meaning                  |
| -------- | ------------------------ |
| `==`     | Equal to                 |
| `!=`     | Not equal to             |
| `>`      | Greater than             |
| `<`      | Less than                |
| `>=`     | Greater than or equal to |
| `<=`     | Less than or equal to    |

### `==` Equal to

Checks whether two values are equal.

```python
print(10 == 10)
```

Output:

```text
True
```

```python
print(10 == 5)
```

Output:

```text
False
```

### Important

`=` means assignment:

```python
x = 10
```

`==` means comparison:

```python
x == 10
```

---

### `!=` Not equal to

```python
print(10 != 5)
```

Output:

```text
True
```

```python
print(10 != 10)
```

Output:

```text
False
```

---

### `>` Greater than

```python
print(10 > 5)
```

Output:

```text
True
```

```python
print(5 > 10)
```

Output:

```text
False
```

---

### `<` Less than

```python
print(5 < 10)
```

Output:

```text
True
```

```python
print(10 < 5)
```

Output:

```text
False
```

---

### `>=` Greater than or equal to

```python
print(10 >= 10)
```

Output:

```text
True
```

```python
print(10 >= 5)
```

Output:

```text
True
```

---

### `<=` Less than or equal to

```python
print(5 <= 5)
```

Output:

```text
True
```

```python
print(5 <= 10)
```

Output:

```text
True
```

---

# 3. Logical Operators

Logical operators are used to combine or reverse conditions.

Python has:

```text
and
or
not
```

## `and`

`and` returns `True` only when **both conditions are true**.

```python
age = 20

print(age > 18 and age < 30)
```

Output:

```text
True
```

Both conditions are true:

```text
age > 18  → True
age < 30  → True
```

Example:

```python
print(True and True)
print(True and False)
print(False and True)
print(False and False)
```

Output:

```text
True
False
False
False
```

Think:

```text
True AND True → True
Anything else → False
```

---

## `or`

`or` returns `True` when **at least one condition is true**.

```python
age = 17

print(age < 18 or age > 60)
```

Output:

```text
True
```

The first condition is true.

Example:

```python
print(True or False)
print(False or True)
print(True or True)
print(False or False)
```

Output:

```text
True
True
True
False
```

Think:

```text
At least one True → True
Both False → False
```

---

## `not`

`not` reverses a Boolean value.

```python
print(not True)
```

Output:

```text
False
```

```python
print(not False)
```

Output:

```text
True
```

Example:

```python
is_logged_in = False

print(not is_logged_in)
```

Output:

```text
True
```

---

# 4. Assignment Operators

Assignment operators are used to assign or update values.

| Operator | Example  | Equivalent to |
| -------- | -------- | ------------- |
| `=`      | `x = 10` | `x = 10`      |
| `+=`     | `x += 5` | `x = x + 5`   |
| `-=`     | `x -= 5` | `x = x - 5`   |
| `*=`     | `x *= 5` | `x = x * 5`   |
| `/=`     | `x /= 5` | `x = x / 5`   |

### `=`

Assigns a value.

```python
x = 10
```

Now:

```text
x → 10
```

---

### `+=`

Adds a value to the existing value.

```python
x = 10

x += 5

print(x)
```

Output:

```text
15
```

It is the same as:

```python
x = x + 5
```

---

### `-=`

Subtracts from the existing value.

```python
x = 10

x -= 3

print(x)
```

Output:

```text
7
```

Same as:

```python
x = x - 3
```

---

### `*=`

Multiplies the existing value.

```python
x = 10

x *= 3

print(x)
```

Output:

```text
30
```

Same as:

```python
x = x * 3
```

---

### `/=`

Divides the existing value.

```python
x = 10

x /= 2

print(x)
```

Output:

```text
5.0
```

Same as:

```python
x = x / 2
```

---

# 5. Membership Operators

Membership operators check whether a value exists inside another object, such as a string.

Python has:

```text
in
not in
```

## `in`

Checks whether something exists.

```python
name = "Mahesh"

print("M" in name)
```

Output:

```text
True
```

Because `"M"` exists in `"Mahesh"`.

Another example:

```python
print("z" in "Python")
```

Output:

```text
False
```

### With strings

```python
text = "Python is easy"

print("Python" in text)
```

Output:

```text
True
```

---

## `not in`

Checks whether something does **not** exist.

```python
text = "Python"

print("Java" not in text)
```

Output:

```text
True
```

Because `"Java"` does not exist in `"Python"`.

Example:

```python
print("P" not in "Python")
```

Output:

```text
False
```

Because `"P"` exists.

---

# 6. Identity Operators

Identity operators check whether two variables refer to the **same object**.

Python has:

```text
is
is not
```

## `is`

Checks whether two references point to the same object.

```python
a = None

print(a is None)
```

Output:

```text
True
```

A common use of `is` is checking for `None`:

```python
result = None

if result is None:
    print("No result")
```

---

## `is not`

Checks whether two references are not the same object.

```python
result = None

print(result is not None)
```

Output:

```text
False
```

### `==` vs `is`

This is very important.

`==` checks whether **values are equal**.

`is` checks whether two variables refer to the **same object**.

Example:

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b)
print(a is b)
```

Output:

```text
True
False
```

Why?

The values are the same:

```text
a → [1, 2, 3]
b → [1, 2, 3]
```

So:

```python
a == b
```

is `True`.

But they are separate list objects, so:

```python
a is b
```

is `False`.

For normal value comparison, use `==`.

For checking identity, especially `None`, use `is`.

---

# Quick Revision

| Type       | Operators         | Main purpose                       |
| ---------- | ----------------- | ---------------------------------- |
| Arithmetic | `+ - * / // % **` | Mathematical operations            |
| Comparison | `== != > < >= <=` | Compare values                     |
| Logical    | `and or not`      | Combine/reverse conditions         |
| Assignment | `= += -= *= /=`   | Assign/update values               |
| Membership | `in`, `not in`    | Check whether a value exists       |
| Identity   | `is`, `is not`    | Check whether objects are the same |
