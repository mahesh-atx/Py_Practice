# Python Data Types — Notes

A data type tells Python **what kind of value** a piece of data is.

For example:

```python
age = 24
name = "Mahesh"
height = 5.8
is_student = True
```

Here, each value has a different data type.

---

## 1. `int`

`int` means **integer**.

It represents whole numbers without a decimal point.

Examples:

```python
age = 24
marks = 85
temperature = -5
zero = 0
```

Positive, negative, and zero are all integers.

```python
print(10)
print(-20)
print(0)
```

Output:

```text
10
-20
0
```

### Checking an integer

```python
age = 24

print(type(age))
```

Output:

```text
<class 'int'>
```

---

## 2. `float`

`float` is used for numbers containing a decimal point.

Examples:

```python
price = 99.50
height = 5.8
temperature = -2.5
```

```python
print(10.5)
print(-3.14)
print(0.5)
```

Output:

```text
10.5
-3.14
0.5
```

### Checking a float

```python
price = 99.50

print(type(price))
```

Output:

```text
<class 'float'>
```

### Integer vs float

```python
x = 10
y = 10.0
```

`x` is an `int`.

`y` is a `float`.

Even though both represent the number 10, their types are different.

---

## 3. `str`

`str` means **string**.

A string is a sequence of text characters.

Strings are written inside quotes.

```python
name = "Mahesh"
city = "Akola"
message = "Hello Python"
```

You can use single quotes:

```python
name = 'Mahesh'
```

or double quotes:

```python
name = "Mahesh"
```

Both are valid.

### Strings can contain numbers

```python
age = "24"
```

Here `24` is **text**, not a number.

Therefore:

```python
age = "24"
```

is a `str`, while:

```python
age = 24
```

is an `int`.

### Checking a string

```python
name = "Mahesh"

print(type(name))
```

Output:

```text
<class 'str'>
```

---

## 4. `bool`

`bool` means **Boolean**.

It has only two possible values:

```python
True
False
```

Notice that `True` and `False` start with capital letters.

Example:

```python
is_student = True
is_logged_in = False
```

### Checking a Boolean

```python
is_student = True

print(type(is_student))
```

Output:

```text
<class 'bool'>
```

### Important

These are Boolean values:

```python
True
False
```

These are strings:

```python
"True"
"False"
```

For example:

```python
x = True
y = "True"

print(type(x))
print(type(y))
```

Output:

```text
<class 'bool'>
<class 'str'>
```

---

## 5. `None`

`None` represents **no value** or **no value currently available**.

Example:

```python
result = None
```

This means `result` currently has no value.

`None` has its own data type:

```python
result = None

print(type(result))
```

Output:

```text
<class 'NoneType'>
```

### Example

Imagine a program that is waiting for a result:

```python
result = None

print(result)
```

Output:

```text
None
```

Later, the value can be changed:

```python
result = None

result = 100

print(result)
```

Output:

```text
100
```

### Important

`None` is different from:

```python
0
```

```python
""
```

```python
False
```

They are different values.

```python
x = None
y = 0
z = ""
a = False
```

---

# 6. Checking Types with `type()`

Python provides the `type()` function to find the type of a value.

### Basic syntax

```python
type(value)
```

Example:

```python
age = 24

print(type(age))
```

Output:

```text
<class 'int'>
```

### More examples

```python
x = 10
y = 10.5
name = "Mahesh"
is_student = True
result = None

print(type(x))
print(type(y))
print(type(name))
print(type(is_student))
print(type(result))
```

Output:

```text
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
<class 'NoneType'>
```

### Quick way to remember

```text
10        → int
10.5      → float
"Hello"   → str
True      → bool
None      → NoneType
```

---

# 7. Type Conversion

Type conversion means **changing a value from one data type to another**.

Python provides functions such as:

```python
int()
float()
str()
bool()
```

---

## `int()`

`int()` converts a value into an integer when the conversion is valid.

### Float to int

```python
x = 10.8

y = int(x)

print(y)
```

Output:

```text
10
```

The decimal part is removed. It does **not** round the number.

```python
print(int(10.9))
```

Output:

```text
10
```

### String to int

```python
age = "24"

age = int(age)

print(age)
print(type(age))
```

Output:

```text
24
<class 'int'>
```

This is useful when numbers come from user input as text.

---

## `float()`

`float()` converts a value into a floating-point number.

### Integer to float

```python
x = 10

y = float(x)

print(y)
```

Output:

```text
10.0
```

### String to float

```python
price = "99.50"

price = float(price)

print(price)
```

Output:

```text
99.5
```

---

## `str()`

`str()` converts a value into a string.

### Integer to string

```python
age = 24

age = str(age)

print(age)
print(type(age))
```

Output:

```text
24
<class 'str'>
```

### Float to string

```python
price = 99.5

price = str(price)

print(type(price))
```

Output:

```text
<class 'str'>
```

### Boolean to string

```python
x = True

x = str(x)

print(x)
print(type(x))
```

Output:

```text
True
<class 'str'>
```

---

## `bool()`

`bool()` converts a value into `True` or `False`.

Some values are treated as `False`, while most other values are treated as `True`.

### Numbers

```python
print(bool(1))
print(bool(10))
print(bool(0))
```

Output:

```text
True
True
False
```

So:

```python
bool(0)     # False
bool(10)    # True
```

### Strings

```python
print(bool("Hello"))
print(bool(""))
```

Output:

```text
True
False
```

A non-empty string is `True`.

An empty string is `False`.

### `None`

```python
print(bool(None))
```

Output:

```text
False
```

---

# Type Conversion Examples

### `int()` → integer

```python
int("25")       # 25
int(10.9)       # 10
```

### `float()` → floating-point number

```python
float("25.5")   # 25.5
float(10)       # 10.0
```

### `str()` → string

```python
str(25)         # "25"
str(10.5)       # "10.5"
```

### `bool()` → Boolean

```python
bool(1)         # True
bool(0)         # False
bool("Hello")   # True
bool("")        # False
```

---

## Important Difference

Look carefully at these two:

```python
age = 24
```

and:

```python
age = "24"
```

The first is an integer:

```text
24 → int
```

The second is a string:

```text
"24" → str
```

You can convert the string into an integer:

```python
age = "24"

age = int(age)

print(age + 1)
```

Output:

```text
25
```

Without conversion, `"24"` is text, not a number.

---

## Quick Revision

| Data type  | Example         | Meaning             |
| ---------- | --------------- | ------------------- |
| `int`      | `24`            | Whole number        |
| `float`    | `24.5`          | Decimal number      |
| `str`      | `"Hello"`       | Text                |
| `bool`     | `True`          | True/False          |
| `NoneType` | `None`          | No value            |
| `type()`   | `type(x)`       | Checks the type     |
| `int()`    | `int("10")`     | Converts to integer |
| `float()`  | `float("10.5")` | Converts to float   |
| `str()`    | `str(10)`       | Converts to string  |
| `bool()`   | `bool(1)`       | Converts to Boolean |
