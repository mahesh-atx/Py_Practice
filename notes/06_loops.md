# Python Loops — Notes

A loop is used to **repeat a block of code** multiple times.

For example, instead of writing:

```python
print("Hello")
print("Hello")
print("Hello")
print("Hello")
print("Hello")
```

you can use a loop:

```python
for i in range(5):
    print("Hello")
```

Output:

```text
Hello
Hello
Hello
Hello
Hello
```

The main topics are `for`, `while`, `range()`, `break`, `continue`, `pass`, and nested loops.

---

# 1. `for` Loop

A `for` loop is used to repeat code for each item in a sequence or collection.

### Basic syntax

```python
for variable in sequence:
    # code
```

Example:

```python
for i in range(5):
    print(i)
```

Output:

```text
0
1
2
3
4
```

The loop runs 5 times.

### Loop through a string

```python
name = "Python"

for character in name:
    print(character)
```

Output:

```text
P
y
t
h
o
n
```

The loop takes one character at a time.

### Loop through values

```python
for number in [10, 20, 30]:
    print(number)
```

Output:

```text
10
20
30
```

Think of a `for` loop as:

```text
Take one item
    ↓
Run the code
    ↓
Take the next item
    ↓
Run the code
    ↓
Repeat until there are no items left
```

---

# 2. `while` Loop

A `while` loop repeats code **as long as a condition is true**.

### Basic syntax

```python
while condition:
    # code
```

Example:

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

Output:

```text
1
2
3
4
5
```

### How it works

Initially:

```text
count = 1
```

Python checks:

```text
count <= 5
```

If true, the code runs.

Then:

```python
count += 1
```

changes the value.

The process continues until the condition becomes false.

### Important: update the variable

Be careful with `while` loops.

Correct:

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

If you forget:

```python
count += 1
```

the condition may remain true forever, creating an **infinite loop**.

---

# 3. `range()`

`range()` generates a sequence of numbers, commonly used with `for` loops.

### `range(stop)`

```python
for i in range(5):
    print(i)
```

Output:

```text
0
1
2
3
4
```

It starts at `0` and stops **before** `5`.

So:

```text
range(5)
```

means:

```text
0 1 2 3 4
```

Not:

```text
0 1 2 3 4 5
```

---

## `range(start, stop)`

You can specify where to start.

```python
for i in range(2, 6):
    print(i)
```

Output:

```text
2
3
4
5
```

The `stop` value is not included.

```text
range(2, 6)
      ↓  ↓
    start stop
```

---

## `range(start, stop, step)`

You can also specify how much the number should change each time.

```python
for i in range(1, 10, 2):
    print(i)
```

Output:

```text
1
3
5
7
9
```

Here:

```text
start = 1
stop  = 10
step  = 2
```

The values increase by `2`.

### Step of 1

```python
for i in range(1, 6, 1):
    print(i)
```

Output:

```text
1
2
3
4
5
```

### Negative step

You can count backwards.

```python
for i in range(5, 0, -1):
    print(i)
```

Output:

```text
5
4
3
2
1
```

---

# 4. `break`

`break` immediately **stops the loop**.

Example:

```python
for i in range(10):
    if i == 5:
        break

    print(i)
```

Output:

```text
0
1
2
3
4
```

When `i` becomes `5`, `break` stops the loop.

Flow:

```text
0 → print
1 → print
2 → print
3 → print
4 → print
5 → break → STOP
```

### `break` in a `while` loop

```python
count = 1

while count <= 10:
    if count == 5:
        break

    print(count)
    count += 1
```

Output:

```text
1
2
3
4
```

---

# 5. `continue`

`continue` skips the **current iteration** and moves to the next iteration.

Example:

```python
for i in range(5):
    if i == 2:
        continue

    print(i)
```

Output:

```text
0
1
3
4
```

When `i` is `2`, `continue` skips:

```python
print(i)
```

The loop then continues with `3`.

### Example: Print only odd numbers

```python
for i in range(1, 11):
    if i % 2 == 0:
        continue

    print(i)
```

Output:

```text
1
3
5
7
9
```

Here, even numbers are skipped.

### `break` vs `continue`

This difference is important:

```text
break
↓
Stops the entire loop
```

```text
continue
↓
Skips only the current iteration
```

Example:

```python
for i in range(5):
    if i == 2:
        break
    print(i)
```

Output:

```text
0
1
```

But:

```python
for i in range(5):
    if i == 2:
        continue
    print(i)
```

Output:

```text
0
1
3
4
```

---

# 6. `pass`

`pass` means **do nothing**.

It is used when Python requires a statement, but you don't want to write the actual code yet.

Example:

```python
for i in range(5):
    pass
```

The loop runs, but nothing happens.

### Example

```python
age = 20

if age >= 18:
    pass
else:
    print("Minor")
```

Since the condition is true, Python executes `pass`, which does nothing.

### Why use `pass`?

It is useful when you want to create the structure of your code first and add the actual code later.

```python
for i in range(10):
    pass
```

Later, you can replace it with:

```python
for i in range(10):
    print(i)
```

### Important difference

`pass` does **not** stop or skip the loop.

```text
break    → stop loop
continue → skip current iteration
pass     → do nothing
```

---

# 7. Nested Loops

A nested loop is a **loop inside another loop**.

Example:

```python
for i in range(3):
    for j in range(2):
        print(i, j)
```

Output:

```text
0 0
0 1
1 0
1 1
2 0
2 1
```

### How it works

For every one iteration of the outer loop, the inner loop runs completely.

Think of it like:

```text
Outer 0
    Inner 0
    Inner 1

Outer 1
    Inner 0
    Inner 1

Outer 2
    Inner 0
    Inner 1
```

### Example: Multiplication table

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(i * j)
```

Output:

```text
1
2
3
2
4
6
3
6
9
```

The outer loop controls `i`, while the inner loop controls `j`.

### Nested loop with a pattern

```python
for i in range(3):
    for j in range(3):
        print("*", end=" ")
    print()
```

Output:

```text
* * *
* * *
* * *
```

The inner loop prints three stars on each row.

The outer loop creates three rows.

---

# `for` vs `while`

| `for`                                              | `while`                                       |
| -------------------------------------------------- | --------------------------------------------- |
| Used when iterating over a sequence or known range | Used when repeating while a condition is true |
| Commonly used with `range()`                       | Uses a condition                              |
| Usually has a known number of iterations           | Number of iterations may not be known         |
| `for i in range(5):`                               | `while count < 5:`                            |

Example `for`:

```python
for i in range(5):
    print(i)
```

Example `while`:

```python
i = 0

while i < 5:
    print(i)
    i += 1
```

Both produce:

```text
0
1
2
3
4
```

---

# Quick Revision

| Topic        | Main purpose                     |
| ------------ | -------------------------------- |
| `for`        | Repeat for each item             |
| `while`      | Repeat while a condition is true |
| `range()`    | Generate a sequence of numbers   |
| `break`      | Stop the loop completely         |
| `continue`   | Skip the current iteration       |
| `pass`       | Do nothing                       |
| Nested loops | Put one loop inside another      |

### Core patterns

`for`:

```python
for i in range(5):
    print(i)
```

`while`:

```python
i = 0

while i < 5:
    print(i)
    i += 1
```

`break`:

```python
for i in range(10):
    if i == 5:
        break
```

`continue`:

```python
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)
```

`pass`:

```python
for i in range(5):
    pass
```

Nested loop:

```python
for i in range(3):
    for j in range(3):
        print(i, j)
```
