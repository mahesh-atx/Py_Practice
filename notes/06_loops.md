# Python Loops — Notes

A **loop** repeats a block of code. Python has two: `for` (iterate over a sequence) and `while` (repeat while a condition holds).

> **Why this matters** — Loops are how you process collections, retry operations, and handle input of unknown length. Combined with conditions, they let a short program do a large amount of work.

### The mental model

```text
for   →  "for each item in this collection, do this"
while →  "keep doing this until the condition becomes false"
```

The key difference is *what controls the repetition*: a **sequence** for `for`, a **condition** for `while`.

---

## 1. `for` Loop

A `for` loop iterates over a sequence — a list, string, tuple, dict, or `range`.

### Basic syntax

```python
for item in sequence:
    # do something with item
```

### Looping over a list

```python
fruits = ["apple", "banana", "mango"]

for fruit in fruits:
    print(fruit)
```

Output:

```text
apple
banana
mango
```

`fruit` is a loop variable. It takes the value `"apple"`, then `"banana"`, then `"mango"`.

### Looping over a string

```python
for char in "Python":
    print(char)
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

A string is a sequence of characters, so `for` walks it one character at a time.

### Looping over a dictionary

```python
person = {"name": "Mahesh", "age": 24}

for key in person:
    print(key, "→", person[key])
```

Output:

```text
name → Mahesh
age → 24
```

Iterating a dict gives its **keys**. To get both at once, use `.items()`:

```python
for key, value in person.items():
    print(key, "→", value)
```

### Accumulating a result

A very common pattern: start with an initial value, then update it each pass.

```python
numbers = [10, 20, 30]

total = 0

for n in numbers:
    total += n

print("Total:", total)
```

Output:

```text
Total: 60
```

The pattern:

```text
total = 0                ← start
for n in numbers:        ← loop
    total += n           ← accumulate
print(total)             ← use
```

> **Note** — `total = 0` must be **before** the loop. Placing it inside resets the total on every pass, leaving you with only the last value.

### Counting with a condition

```python
numbers = [12, 45, 7, 30, 99, 3]

count = 0

for n in numbers:
    if n > 20:
        count += 1

print("Numbers greater than 20:", count)
```

Output:

```text
Numbers greater than 20: 3
```

---

## 2. `while` Loop

A `while` loop repeats as long as its condition is true.

### Basic syntax

```python
while condition:
    # repeated code
```

### A counting loop

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

Three ingredients, all mandatory:

1. An initial value before the loop (`count = 1`)
2. A condition (`count <= 5`)
3. An update inside the loop (`count += 1`)

> **Forgetting the update creates an infinite loop.** Without `count += 1`, `count` stays `1`, the condition stays true, and the program never stops. If your program hangs, this is the first thing to check.

### Looping until the user quits

```python
command = ""

while command != "quit":
    command = input("Enter a command (or 'quit'): ")
    print("You entered:", command)
```

The loop ends when the condition finally becomes false.

### Accumulating with `while`

```python
total = 0
n = 1

while n <= 10:
    total += n
    n += 1

print("Sum 1..10:", total)
```

Output:

```text
Sum 1..10: 55
```

### `for` vs `while`

| | `for` | `while` |
| - | ----- | ------- |
| Controlled by | A sequence | A condition |
| Number of passes | Known in advance | Unknown |
| Risk | Low — ends naturally | Infinite loop if you forget the update |
| Typical use | Process every item | Repeat until something changes |

```python
# for — you know how many items
for fruit in fruits:
    print(fruit)

# while — you do not know how many attempts
while not connected:
    try_connect()
```

> **Rule of thumb** — Use `for` when you are working through a collection. Use `while` when the stopping point depends on something that changes during the loop. If you can use `for`, prefer it — it cannot hang.

---

## 3. `range()`

`range()` generates a sequence of numbers, commonly used to repeat something a fixed number of times.

### Three forms

| Form | Meaning | Produces |
| ---- | ------- | -------- |
| `range(stop)` | 0 up to (not including) stop | `0, 1, ..., stop-1` |
| `range(start, stop)` | start up to stop | `start, ..., stop-1` |
| `range(start, stop, step)` | start, stepping by step | `start, start+step, ...` |

> **The stop value is never included.** `range(5)` gives `0,1,2,3,4`. This "off by one" is intentional and consistent across Python.

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

### `range(start, stop)`

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

### `range(start, stop, step)`

```python
for i in range(0, 10, 2):
    print(i)
```

Output:

```text
0
2
4
6
8
```

### Counting backwards

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

### Repeating an action N times

```python
for i in range(3):
    print("Hello")
```

Output:

```text
Hello
Hello
Hello
```

When you do not need the counter itself, the convention is to name it `_`:

```python
for _ in range(3):
    print("Hello")
```

### Converting to a list

```python
print(list(range(5)))
print(list(range(2, 10, 3)))
```

Output:

```text
[0, 1, 2, 3, 4]
[2, 5, 8]
```

`range` is lazy — it generates values on demand and uses almost no memory, even for `range(10**9)`. Convert it to a list only when you need the whole thing.

### `range` with `len()` — and the better way

```python
fruits = ["apple", "banana", "mango"]

# Works, but not idiomatic
for i in range(len(fruits)):
    print(i, fruits[i])
```

Output:

```text
0 apple
1 banana
2 mango
```

If you also need the index, use `enumerate()`:

```python
for i, fruit in enumerate(fruits):
    print(i, fruit)
```

Same output, and it reads better.

### Looping over two lists at once

```python
names = ["Mahesh", "Rahul", "Nina"]
scores = [88, 92, 79]

for name, score in zip(names, scores):
    print(name, "→", score)
```

Output:

```text
Mahesh → 88
Rahul → 92
Nina → 79
```

`zip()` stops at the shorter list.

---

## 4. `break`

`break` exits a loop **immediately**, skipping any remaining passes.

### Basic example

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

The loop stops the moment `i` reaches `5`.

### Searching for an item

```python
fruits = ["apple", "banana", "mango"]

for fruit in fruits:
    if fruit == "banana":
        print("Found:", fruit)
        break
```

Output:

```text
Found: banana
```

Once the item is found there is no reason to keep looking, so `break` stops the search.

### `break` in a `while` loop

```python
while True:
    command = input("Enter command (or 'quit'): ")

    if command == "quit":
        break

    print("Running:", command)
```

> **The `while True:` idiom** — An intentionally infinite loop, exited with `break` when the real condition is met. This is the standard way to write "repeat until the user quits", because it lets you check the condition *after* reading input rather than before.

### `break` only exits one loop

```python
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(i, j)
```

Output:

```text
0 0
1 0
2 0
```

The inner `break` exits the inner loop only; the outer loop keeps going.

---

## 5. `continue`

`continue` skips the **rest of the current pass** and moves to the next one. The loop itself keeps running.

### Basic example

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

`2` is missing because `continue` skipped the `print` for that pass.

### `break` vs `continue`

| Keyword | Effect |
| ------- | ------ |
| `break` | Exit the loop entirely |
| `continue` | Skip to the next pass |

```python
for i in range(5):
    if i == 2:
        break
    print(i)
# 0 1

for i in range(5):
    if i == 2:
        continue
    print(i)
# 0 1 3 4
```

### Filtering with `continue`

```python
numbers = [12, 45, 7, 30, 99, 3]

for n in numbers:
    if n <= 20:
        continue
    print("Large:", n)
```

Output:

```text
Large: 45
Large: 30
Large: 99
```

> **Careful with `while`** — `continue` jumps to the condition check, skipping the rest of the body. If your update statement is after the `continue`, it never runs and the loop hangs:
>
> ```python
> count = 0
> while count < 5:
>     if count == 2:
>         continue      # ← skips the update below
>     print(count)
>     count += 1        # never reached when count == 2
> ```
>
> This is an infinite loop. In `while` loops, make sure the update happens on every path.

---

## 6. `pass`

`pass` is a statement that does **nothing**. It exists to satisfy Python's syntax where a statement is required but you have nothing to say.

### As a placeholder

```python
for i in range(5):
    pass        # TODO: implement later
```

Without `pass`, an empty block is a syntax error:

```python
for i in range(5):
    # nothing here yet
# IndentationError: expected an indented block
```

### In conditionals

```python
age = 20

if age >= 18:
    pass        # adults need no special handling
else:
    print("Minor")
```

### Where it differs from `continue`

| | `pass` | `continue` |
| - | ------ | ---------- |
| Effect | Do nothing, keep going | Skip to the next pass |
| Loop impact | None — the rest of the body still runs | Rest of the body is skipped |

```python
for i in range(3):
    if i == 1:
        pass
    print(i)
# 0 1 2        ← pass does nothing, all three print

for i in range(3):
    if i == 1:
        continue
    print(i)
# 0 2          ← continue skips the print for i == 1
```

> **Practical use** — `pass` is mainly for scaffolding: stubbing out functions and classes you plan to fill in later. In finished code it is usually a sign of an unfinished thought.

---

## 7. Nested Loops

A loop inside another loop. The inner loop runs **completely** for each pass of the outer one.

```python
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")
```

Output:

```text
i=0, j=0
i=0, j=1
i=1, j=0
i=1, j=1
i=2, j=0
i=2, j=1
```

Six lines total: 3 outer passes × 2 inner passes.

### A multiplication table

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(i * j, end="\t")
    print()
```

Output:

```text
1	2	3
2	4	6
3	6	9
```

The bare `print()` at the end of the outer loop moves to the next row.

### Building a pattern

```python
for row in range(1, 5):
    for col in range(row):
        print("*", end="")
    print()
```

Output:

```text
*
**
***
****
```

### Nested loops over data

```python
students = ["Mahesh", "Nina"]
subjects = ["Maths", "Science"]

for student in students:
    for subject in subjects:
        print(student, "→", subject)
```

Output:

```text
Mahesh → Maths
Mahesh → Science
Nina → Maths
Nina → Science
```

> **Performance note** — Nested loops multiply: 1,000 × 1,000 is a million operations. When processing large data, look for a way to flatten the work (often with a set or dict lookup) before nesting.

---

## Loop Control Summary

| Keyword | Effect | Use when |
| ------- | ------ | -------- |
| `break` | Exit the loop now | You found what you were looking for |
| `continue` | Skip to the next pass | You want to ignore this item |
| `pass` | Do nothing | You need a syntactic placeholder |

### `for ... else` — a lesser-known feature

A `for` loop can have an `else` that runs when the loop completes **without** hitting `break`:

```python
numbers = [2, 4, 6, 8]

for n in numbers:
    if n % 2 != 0:
        print("Found an odd number:", n)
        break
else:
    print("All numbers are even")
```

Output:

```text
All numbers are even
```

This is the cleanest way to express "search for something and report if it was not found" without a flag variable.

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| Forgetting `count += 1` in `while` | Infinite loop | Always update the condition variable |
| `continue` before the update in `while` | Infinite loop | Put the update before `continue` |
| Accumulator initialised inside the loop | Result resets each pass | Initialise before the loop |
| Modifying a list while iterating over it | Items skipped | Iterate over a copy: `for x in items[:]` |
| Off-by-one with `range()` | One item too few/many | Remember `stop` is excluded |
| Using `range(len(x))` when you need items | Unreadable | Iterate directly, or use `enumerate()` |

---

## Quick Revision

| Concept | Syntax | Purpose |
| ------- | ------ | ------- |
| `for` | `for x in items:` | Iterate over a sequence |
| `while` | `while cond:` | Repeat while true |
| `range(n)` | `range(5)` | `0..n-1` |
| `range(a, b)` | `range(2, 6)` | `2..5` |
| `range(a, b, s)` | `range(0, 10, 2)` | Step by `s` |
| `enumerate()` | `for i, x in enumerate(items):` | Index and value |
| `zip()` | `for a, b in zip(x, y):` | Two lists together |
| `break` | `break` | Exit the loop |
| `continue` | `continue` | Skip this pass |
| `pass` | `pass` | Placeholder |
| `for/else` | `else:` after `for` | Runs if no `break` |

### Core patterns

```python
for item in items:
    print(item)

for i in range(5):
    print(i)

for i, item in enumerate(items):
    print(i, item)

total = 0
for n in numbers:
    total += n

while count < 10:
    count += 1

while True:
    if done():
        break

for n in numbers:
    if n < 0:
        continue
    print(n)
```

### The main idea

```text
Loops
 ├── for    → iterate a sequence (known count)
 ├── while  → repeat while a condition holds (unknown count)
 ├── range() → generate numbers: range(start, stop, step)
 ├── break    → leave the loop
 ├── continue → skip this pass
 ├── pass     → do nothing (placeholder)
 └── Nested   → inner loop runs fully per outer pass
```

---

## Self-Check

- [ ] What are the three ingredients every `while` loop needs?
- [ ] What does `range(2, 8, 3)` produce?
- [ ] What is the difference between `break` and `continue`?
- [ ] Why does an accumulator belong *before* the loop, not inside it?
- [ ] When would you choose `while` over `for`?
- [ ] What does `pass` do, and how is it different from `continue`?
- [ ] In `for i in range(3): for j in range(2):`, how many times does the inner body run?
