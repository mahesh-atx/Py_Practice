# Python Variables — Notes

## 1. Variables

A variable is a **name used to store a value** in a program.

Think of a variable as a label attached to some data.

```python
name = "Mahesh"
age = 24
```

Here:

```text
name → "Mahesh"
age  → 24
```

The value stored in a variable can be used later.

```python
name = "Mahesh"

print(name)
```

Output:

```text
Mahesh
```

### Changing a variable

A variable's value can be changed.

```python
age = 24
print(age)

age = 25
print(age)
```

Output:

```text
24
25
```

The variable `age` first stores `24`, then stores `25`.

### Variables can store different types of values

```python
name = "Mahesh"
age = 24
height = 5.8
is_student = True
```

A variable can hold different kinds of values.

---

# 2. Creating Variables

In Python, you create a variable by assigning a value using `=`.

```python
name = "Mahesh"
```

The basic pattern is:

```text
variable = value
```

Examples:

```python
age = 24
city = "Akola"
price = 99.50
is_active = True
```

You do not need to declare the variable type separately.

For example, you don't write:

```python
int age = 24
```

Instead, simply write:

```python
age = 24
```

### Using variables

```python
name = "Mahesh"
age = 24

print(name)
print(age)
```

Output:

```text
Mahesh
24
```

### Using variables in calculations

```python
a = 10
b = 20

print(a + b)
```

Output:

```text
30
```

You can also use variables to build expressions:

```python
price = 100
quantity = 3

total = price * quantity

print(total)
```

Output:

```text
300
```

---

# 3. Naming Rules

Variable names must follow Python's naming rules.

### Rule 1: Start with a letter or `_`

Valid:

```python
name = "Mahesh"
_age = 24
```

Invalid:

```python
1name = "Mahesh"
```

A variable name cannot start with a number.

### Rule 2: Numbers can be used after the first character

Valid:

```python
age1 = 24
student2 = "Rahul"
```

Invalid:

```python
2student = "Rahul"
```

### Rule 3: No spaces

Invalid:

```python
student name = "Mahesh"
```

Use `_` instead:

```python
student_name = "Mahesh"
```

### Rule 4: Only letters, numbers, and `_`

Valid:

```python
student_name = "Mahesh"
age2 = 24
```

Invalid:

```python
student-name = "Mahesh"
```

`-` is treated as an operator, not as part of a variable name.

### Rule 5: Python is case-sensitive

These are different variables:

```python
name = "Mahesh"
Name = "Rahul"
NAME = "Amit"
```

Python treats them as three separate names.

### Rule 6: Don't use Python keywords

Python has reserved words that have special meanings.

For example:

```python
if
else
for
while
class
def
return
True
False
None
```

You should not use them as variable names.

Invalid:

```python
if = 10
```

### Good naming style

Use clear names:

```python
student_name = "Mahesh"
student_age = 24
total_price = 500
```

Avoid unclear names:

```python
x = "Mahesh"
a = 24
p = 500
```

unless the short name makes sense in that situation.

---

# 4. Multiple Assignment

Python allows you to assign values to multiple variables in one line.

### Assign the same value

```python
a = b = c = 10
```

Now:

```text
a → 10
b → 10
c → 10
```

Example:

```python
x = y = z = 0

print(x)
print(y)
print(z)
```

Output:

```text
0
0
0
```

### Assign different values

You can assign different values to different variables in one line:

```python
name, age, city = "Mahesh", 24, "Akola"
```

This is equivalent to:

```python
name = "Mahesh"
age = 24
city = "Akola"
```

Example:

```python
name, age, country = "Mahesh", 24, "India"

print(name)
print(age)
print(country)
```

Output:

```text
Mahesh
24
India
```

The number of variables and values should match.

```python
a, b, c = 10, 20, 30
```

Correct.

But:

```python
a, b = 10, 20, 30
```

causes an error because there are two variables but three values.

---

# 5. Constants

A constant is a value that **should not be changed** during a program.

Python does not have a special `constant` keyword.

Instead, Python programmers use **uppercase variable names** to show that a value is meant to stay constant.

```python
PI = 3.14159
MAX_USERS = 100
COUNTRY = "India"
```

The uppercase name tells other programmers:

> "Do not change this value."

Example:

```python
PI = 3.14159

radius = 5
area = PI * radius * radius

print(area)
```

Python technically still allows you to change it:

```python
PI = 3.14159

PI = 4
```

Python will not stop you.

So constants in Python are mainly a **programming convention**, not a protected value.

### Common style

```python
MAX_SIZE = 100
DEFAULT_TIMEOUT = 30
APP_NAME = "My App"
```

Use uppercase names for values that are intended to remain unchanged.

---

# 6. Dynamic Typing

Python is a **dynamically typed language**.

This means you don't have to specify the type of a variable when creating it.

You can simply write:

```python
age = 24
```

Python understands that `age` contains an integer.

You can later assign a different type of value to the same variable:

```python
age = 24
age = "twenty four"
```

Now `age` contains a string instead of an integer.

### Example

```python
x = 10
print(x)

x = "Hello"
print(x)

x = 5.5
print(x)
```

Output:

```text
10
Hello
5.5
```

The variable `x` can refer to values of different types at different times.

### Important idea

In Python, the **value has a type**, not a fixed type attached to the variable name.

Think of it like:

```text
x → 10
```

Later:

```text
x → "Hello"
```

Later:

```text
x → 5.5
```

The name `x` can point to different values.

### Python vs statically typed languages

In some languages, you may write:

```text
int age = 24
```

The type is declared explicitly.

In Python:

```python
age = 24
```

Python determines the type from the value.

This is one of the reasons Python code is shorter and easier to write.

## Quick Revision

| Topic               | Key idea                                               |
| ------------------- | ------------------------------------------------------ |
| Variable            | Name used to refer to a value                          |
| Creating variables  | `name = value`                                         |
| Naming rules        | Start with letter/`_`, no spaces, case-sensitive       |
| Multiple assignment | Assign multiple variables in one statement             |
| Constants           | Use uppercase names for values meant to stay unchanged |
| Dynamic typing      | Variable names don't have a fixed type                 |
