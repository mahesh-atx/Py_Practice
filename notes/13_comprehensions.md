# Python Comprehensions — Notes

A **comprehension** is a shorter way to create a new collection from existing values.

Instead of writing several lines with a loop, you can often create the same result in one line.

Python has:

* List comprehensions
* Dictionary comprehensions
* Set comprehensions
* Conditions inside comprehensions

---

# 1. List Comprehension

A list comprehension is a short way to create a list.

### Normal way

Suppose you want a list of numbers from `0` to `4`.

```python id="n6x2qv"
numbers = []

for i in range(5):
    numbers.append(i)

print(numbers)
```

Output:

```text id="3zvr7p"
[0, 1, 2, 3, 4]
```

Using a list comprehension:

```python id="7rhv7d"
numbers = [i for i in range(5)]

print(numbers)
```

Output:

```text id="w93x9m"
[0, 1, 2, 3, 4]
```

### Basic syntax

```python id="30j1y7"
[expression for variable in sequence]
```

Example:

```python id="jshh6d"
squares = [i * i for i in range(5)]

print(squares)
```

Output:

```text id="b7et1k"
[0, 1, 4, 9, 16]
```

Here:

```text id="tq5e5h"
i → 0 → 0 * 0 → 0
i → 1 → 1 * 1 → 1
i → 2 → 2 * 2 → 4
i → 3 → 3 * 3 → 9
i → 4 → 4 * 4 → 16
```

So the expression:

```python id="yqwrqj"
i * i
```

is applied to every value.

---

# 2. Dictionary Comprehension

Dictionary comprehension is a short way to create a dictionary.

### Normal way

```python id="k8y0cu"
squares = {}

for i in range(5):
    squares[i] = i * i

print(squares)
```

Output:

```text id="cq5h7w"
{0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

Using dictionary comprehension:

```python id="m4j9g6"
squares = {i: i * i for i in range(5)}

print(squares)
```

Output:

```text id="a2b1dh"
{0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### Basic syntax

```python id="38jnfm"
{key: value for variable in sequence}
```

Example:

```python id="wvq4vz"
numbers = [1, 2, 3, 4]

squares = {number: number * number for number in numbers}

print(squares)
```

Output:

```text id="04m2lt"
{1: 1, 2: 4, 3: 9, 4: 16}
```

Here:

```text
key   → number
value → number * number
```

---

# 3. Set Comprehension

Set comprehension is a short way to create a set.

It looks similar to list comprehension, but uses `{}` instead of `[]`.

### Example

```python id="4ru0k0"
numbers = {i for i in range(5)}

print(numbers)
```

The set contains:

```text
0, 1, 2, 3, 4
```

### Applying an expression

```python id="wp0tlr"
squares = {i * i for i in range(5)}

print(squares)
```

Result:

```text
{0, 1, 4, 9, 16}
```

### Duplicate values

Because a set only keeps unique values:

```python id="1w8v41"
numbers = [1, 2, 2, 3, 3, 4]

unique = {x for x in numbers}

print(unique)
```

The result contains only:

```text
1, 2, 3, 4
```

The order should not be relied on.

---

# 4. Conditions Inside Comprehensions

You can put an `if` condition inside a comprehension.

This lets you select only the values that meet a condition.

## List comprehension with `if`

Suppose you want only even numbers.

Normal way:

```python id="w3iyu1"
even_numbers = []

for i in range(10):
    if i % 2 == 0:
        even_numbers.append(i)

print(even_numbers)
```

Using a comprehension:

```python id="ettdki"
even_numbers = [i for i in range(10) if i % 2 == 0]

print(even_numbers)
```

Output:

```text id="22l9mt"
[0, 2, 4, 6, 8]
```

### Syntax

```python id="nh4x20"
[expression for variable in sequence if condition]
```

Think of it as:

```text
Take a value
    ↓
Check condition
    ↓
True → add result
False → skip it
```

### Another example

Get numbers greater than `5`:

```python id="mnr5yd"
numbers = [1, 4, 6, 8, 3, 9]

result = [x for x in numbers if x > 5]

print(result)
```

Output:

```text
[6, 8, 9]
```

---

# Conditions with Dictionary Comprehension

You can also use conditions in dictionary comprehensions.

Example:

```python id="0ne6eu"
numbers = range(10)

even_squares = {
    x: x * x
    for x in numbers
    if x % 2 == 0
}

print(even_squares)
```

Result:

```text
{0: 0, 2: 4, 4: 16, 6: 36, 8: 64}
```

Only even numbers are included.

---

# Conditions with Set Comprehension

The same idea works with sets.

```python id="2k4rj5"
numbers = [1, 2, 3, 4, 5, 6]

even_numbers = {x for x in numbers if x % 2 == 0}

print(even_numbers)
```

Result contains:

```text
2, 4, 6
```

---

# `if-else` Inside a Comprehension

A comprehension can also use `if-else`.

The structure is different from a filtering condition.

### Example

Create `"Even"` for even numbers and `"Odd"` for odd numbers:

```python id="ye5tgc"
numbers = [1, 2, 3, 4, 5]

result = ["Even" if x % 2 == 0 else "Odd" for x in numbers]

print(result)
```

Output:

```text
['Odd', 'Even', 'Odd', 'Even', 'Odd']
```

Notice the position of the `if-else`.

It comes **before** the `for`:

```python id="kigqyd"
[expression_if_true if condition else expression_if_false for x in sequence]
```

Compare the two patterns:

### Filtering with `if`

```python id="eq4wpc"
[x for x in numbers if x > 5]
```

This means:

> Include only values where `x > 5`.

### Choosing a value with `if-else`

```python id="tm10q8"
["yes" if x > 5 else "no" for x in numbers]
```

This means:

> Include `"yes"` when `x > 5`, otherwise include `"no"`.

---

# Normal Loop vs Comprehension

### List

Normal:

```python id="j4a7d8"
numbers = []

for i in range(5):
    numbers.append(i * 2)
```

Comprehension:

```python id="n0nvvn"
numbers = [i * 2 for i in range(5)]
```

Both produce:

```text
[0, 2, 4, 6, 8]
```

---

### Filtering

Normal:

```python id="ec4m5x"
numbers = []

for i in range(10):
    if i % 2 == 0:
        numbers.append(i)
```

Comprehension:

```python id="9xrdod"
numbers = [i for i in range(10) if i % 2 == 0]
```

Both produce:

```text
[0, 2, 4, 6, 8]
```

---

# Quick Revision

| Type                     | Syntax                                      | Creates         |
| ------------------------ | ------------------------------------------- | --------------- |
| List comprehension       | `[expression for x in sequence]`            | List            |
| Dictionary comprehension | `{key: value for x in sequence}`            | Dictionary      |
| Set comprehension        | `{expression for x in sequence}`            | Set             |
| Condition/filter         | `[x for x in sequence if condition]`        | Selected values |
| `if-else`                | `[a if condition else b for x in sequence]` | Chosen values   |

### Core examples

List:

```python
squares = [x * x for x in range(5)]
```

Dictionary:

```python
squares = {x: x * x for x in range(5)}
```

Set:

```python
squares = {x * x for x in range(5)}
```

Filter:

```python
evens = [x for x in range(10) if x % 2 == 0]
```

`if-else`:

```python
result = ["Even" if x % 2 == 0 else "Odd" for x in range(5)]
```

The main idea is:

```text
Comprehension
    ↓
Loop through values
    ↓
Optionally check a condition
    ↓
Create a new collection
```

A good rule while learning: first understand the normal `for` loop version, then convert it into a comprehension. This makes comprehensions much easier to understand rather than trying to memorize the syntax.
