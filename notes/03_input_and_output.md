# Python Input and Output — Notes

Input and output are used to communicate between the **user and the program**.

* **Input** → Get data from the user.
* **Output** → Show data to the user.

---

# 1. `input()`

`input()` is used to take input from the user through the keyboard.

### Basic syntax

```python
input()
```

Example:

```python
name = input()

print(name)
```

If the user enters:

```text
Mahesh
```

Output:

```text
Mahesh
```

### Using a message

You can give a message inside `input()`:

```python
name = input("Enter your name: ")

print(name)
```

Example:

```text
Enter your name: Mahesh
Mahesh
```

---

## Important: `input()` returns a string

By default, everything entered using `input()` is a `str`.

```python
age = input("Enter your age: ")

print(type(age))
```

If the user enters:

```text
24
```

Output:

```text
<class 'str'>
```

Even though `24` looks like a number, Python receives it as text.

### Converting input to an integer

Use `int()`:

```python
age = int(input("Enter your age: "))

print(age)
print(type(age))
```

If the user enters:

```text
24
```

Output:

```text
24
<class 'int'>
```

### Converting input to a float

```python
price = float(input("Enter price: "))

print(price)
```

If the user enters:

```text
99.50
```

Output:

```text
99.5
```

---

# 2. `print()`

`print()` is used to display output on the screen.

### Basic example

```python
print("Hello, Python!")
```

Output:

```text
Hello, Python!
```

### Printing variables

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

### Printing multiple values

You can separate values with commas:

```python
name = "Mahesh"
age = 24

print("Name:", name, "Age:", age)
```

Output:

```text
Name: Mahesh Age: 24
```

---

## `sep`

`sep` controls what is placed between multiple values.

By default, `print()` uses a space.

```python
print("Python", "JavaScript", "Java")
```

Output:

```text
Python JavaScript Java
```

You can change it:

```python
print("Python", "JavaScript", "Java", sep=", ")
```

Output:

```text
Python, JavaScript, Java
```

Another example:

```python
print("2026", "08", "09", sep="-")
```

Output:

```text
2026-08-09
```

---

## `end`

By default, `print()` moves to a new line after printing.

```python
print("Hello")
print("World")
```

Output:

```text
Hello
World
```

You can change this using `end`:

```python
print("Hello", end=" ")
print("World")
```

Output:

```text
Hello World
```

Another example:

```python
print("Loading", end="...")
print("Done")
```

Output:

```text
Loading...Done
```

---

# 3. f-Strings

f-strings are a simple way to put variables and expressions inside strings.

An f-string starts with `f` before the string:

```python
f"..."
```

Variables are placed inside `{}`.

### Basic example

```python
name = "Mahesh"
age = 24

print(f"My name is {name} and I am {age} years old.")
```

Output:

```text
My name is Mahesh and I am 24 years old.
```

Without an f-string, you would need to join the values separately.

With f-strings, the code is cleaner.

---

## Using expressions in f-strings

You can put expressions inside `{}`.

```python
a = 10
b = 20

print(f"Sum = {a + b}")
```

Output:

```text
Sum = 30
```

Another example:

```python
price = 100
quantity = 3

print(f"Total = {price * quantity}")
```

Output:

```text
Total = 300
```

---

## Using multiple variables

```python
name = "Mahesh"
city = "Akola"
age = 24

print(f"{name} is {age} years old and lives in {city}.")
```

Output:

```text
Mahesh is 24 years old and lives in Akola.
```

---

# 4. Formatting Output

Formatting output means controlling **how the information appears** on the screen.

f-strings are commonly used for this.

## Decimal places

Suppose:

```python
price = 99.56789
```

You can display only 2 decimal places:

```python
print(f"{price:.2f}")
```

Output:

```text
99.57
```

Here:

```text
.2f
```

means:

* `.2` → show 2 digits after the decimal
* `f` → floating-point format

Example:

```python
pi = 3.14159265

print(f"{pi:.2f}")
```

Output:

```text
3.14
```

---

## Formatting numbers with commas

Large numbers can be easier to read with comma separators.

```python
number = 1000000

print(f"{number:,}")
```

Output:

```text
1,000,000
```

---

## Percentage formatting

You can format a decimal as a percentage.

```python
rate = 0.75

print(f"{rate:.0%}")
```

Output:

```text
75%
```

Another example:

```python
rate = 0.7567

print(f"{rate:.2%}")
```

Output:

```text
75.67%
```

---

## Width and alignment

You can control the space used by a value.

### Right alignment

```python
name = "Python"

print(f"{name:>10}")
```

Output:

```text
    Python
```

### Left alignment

```python
name = "Python"

print(f"{name:<10}")
```

Output:

```text
Python    
```

### Center alignment

```python
name = "Python"

print(f"{name:^10}")
```

Output:

```text
  Python  
```

The number `10` means the total width is 10 characters.

---

## Formatting currency

```python
price = 1250.5

print(f"Price: ₹{price:.2f}")
```

Output:

```text
Price: ₹1250.50
```

---

# Combining Input, Processing, and Output

A very common Python pattern is:

```text
Input → Process → Output
```

Example:

```python
name = input("Enter your name: ")
age = int(input("Enter your age: "))

next_age = age + 1

print(f"Hello {name}!")
print(f"Next year you will be {next_age}.")
```

Example run:

```text
Enter your name: Mahesh
Enter your age: 24
Hello Mahesh!
Next year you will be 25.
```

This pattern is important because many beginner Python programs follow:

```text
Take input
     ↓
Process data
     ↓
Display result
```

# Quick Revision

| Topic     | Main idea                   | Example                |
| --------- | --------------------------- | ---------------------- |
| `input()` | Takes user input            | `name = input()`       |
| `print()` | Displays output             | `print(name)`          |
| `sep`     | Changes separator           | `print(a, b, sep="-")` |
| `end`     | Changes ending              | `print("Hi", end=" ")` |
| f-string  | Inserts values into strings | `f"Hello {name}"`      |
| `.2f`     | 2 decimal places            | `f"{price:.2f}"`       |
| `:,`      | Number commas               | `f"{number:,}"`        |
| `:.2%`    | Percentage                  | `f"{rate:.2%}"`        |
| `:>10`    | Right align                 | `f"{name:>10}"`        |
| `:<10`    | Left align                  | `f"{name:<10}"`        |
| `:^10`    | Center align                | `f"{name:^10}"`        |
