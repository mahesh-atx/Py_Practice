# Python Comprehensions — Notes

A **comprehension** builds a new collection from an existing one in a single readable line.

> **Why this matters** — Comprehensions turn the four-line "create a list, loop, test, append" pattern into one expression. They are faster to write, faster to read once you know them, and marginally faster to run. They are also one of the most recognisably Pythonic features of the language.

### The mental model

Every comprehension is a loop in disguise:

```text
[ expression  for item in iterable  if condition ]
      ↑              ↑                    ↑
   what to keep   where from        when to keep it
```

Read it as: "give me *expression* for each *item* in *iterable*, but only if *condition*."

---

## 1. List Comprehension

### The long way

```python
numbers = [1, 2, 3, 4, 5]

squares = []

for n in numbers:
    squares.append(n ** 2)

print(squares)
```

Output:

```text
[1, 4, 9, 16, 25]
```

### The comprehension

```python
numbers = [1, 2, 3, 4, 5]

squares = [n ** 2 for n in numbers]

print(squares)
```

Output:

```text
[1, 4, 9, 16, 25]
```

### Syntax

```python
[expression for item in iterable]
```

### Building from `range()`

```python
doubles = [x * 2 for x in range(5)]

print(doubles)
```

Output:

```text
[0, 2, 4, 6, 8]
```

### Transforming strings

```python
names = ["mahesh", "nina", "rahul"]

capitalised = [name.title() for name in names]

print(capitalised)
```

Output:

```text
['Mahesh', 'Nina', 'Rahul']
```

### Converting types

```python
values = ["10", "20", "30"]

numbers = [int(v) for v in values]

print(numbers)
print(type(numbers[0]))
```

Output:

```text
[10, 20, 30]
<class 'int'>
```

This is a very common way to parse input.

### With a function call

```python
words = ["hello", "world"]

lengths = [len(w) for w in words]

print(lengths)
```

Output:

```text
[5, 5]
```

### Nested loops in a comprehension

```python
pairs = [(x, y) for x in range(3) for y in range(2)]

print(pairs)
```

Output:

```text
[(0, 0), (0, 1), (1, 0), (1, 1), (2, 0), (2, 1)]
```

The loop order matches nested `for` loops: the outer loop comes first.

### Flattening a list of lists

```python
matrix = [[1, 2], [3, 4], [5, 6]]

flat = [n for row in matrix for n in row]

print(flat)
```

Output:

```text
[1, 2, 3, 4, 5, 6]
```

---

## 2. Dictionary Comprehension

Builds a dictionary with the same idea.

### Syntax

```python
{key_expression: value_expression for item in iterable}
```

### From a list

```python
names = ["Mahesh", "Nina", "Rahul"]

lengths = {name: len(name) for name in names}

print(lengths)
```

Output:

```text
{'Mahesh': 6, 'Nina': 4, 'Rahul': 5}
```

### From `range()`

```python
squares = {n: n ** 2 for n in range(1, 6)}

print(squares)
```

Output:

```text
{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```

### Transforming an existing dictionary

```python
prices = {"apple": 30, "banana": 10, "mango": 80}

discounted = {item: price * 0.9 for item, price in prices.items()}

print(discounted)
```

Output:

```text
{'apple': 27.0, 'banana': 9.0, 'mango': 72.0}
```

### Swapping keys and values

```python
original = {"a": 1, "b": 2}

swapped = {value: key for key, value in original.items()}

print(swapped)
```

Output:

```text
{1: 'a', 2: 'b'}
```

> **Careful** — This only works if the values are unique. Duplicate values silently collapse, just like duplicate keys in a literal.

### Building a lookup table

```python
words = ["apple", "banana", "mango"]

by_first_letter = {w[0]: w for w in words}

print(by_first_letter)
```

Output:

```text
{'a': 'apple', 'b': 'banana', 'm': 'mango'}
```

---

## 3. Set Comprehension

Identical syntax, but with curly braces and a single expression — producing a set.

```python
{expression for item in iterable}
```

### Basic example

```python
numbers = [1, 2, 2, 3, 3, 4]

squares = {n ** 2 for n in numbers}

print(squares)
```

Output:

```text
{1, 4, 9, 16}
```

Notice duplicates are collapsed — that is the set doing its job.

### Extracting unique values

```python
sentence = "the quick brown fox jumps over the lazy dog"

unique_letters = {char for char in sentence if char != " "}

print(len(unique_letters))
```

Output:

```text
25
```

### Unique lengths

```python
words = ["a", "bb", "ccc", "dd", "e"]

lengths = {len(w) for w in words}

print(lengths)
```

Output:

```text
{1, 2, 3}
```

### The three forms side by side

```python
data = [1, 2, 2, 3]

print([x * 2 for x in data])            # list  → [2, 4, 4, 6]
print({x * 2 for x in data})            # set   → {2, 4, 6}
print({x: x * 2 for x in data})         # dict  → {1: 2, 2: 4, 3: 6}
```

---

## 4. Conditions Inside Comprehensions

Add `if` at the end to filter.

### Syntax

```python
[expression for item in iterable if condition]
```

### Filtering even numbers

```python
numbers = [1, 2, 3, 4, 5, 6]

evens = [n for n in numbers if n % 2 == 0]

print(evens)
```

Output:

```text
[2, 4, 6]
```

### Filtering strings

```python
words = ["apple", "hi", "banana", "no", "mango"]

long_words = [w for w in words if len(w) > 2]

print(long_words)
```

Output:

```text
['apple', 'banana', 'mango']
```

### Filtering with a function call

```python
values = ["10", "abc", "25", "xyz", "30"]

numbers = [int(v) for v in values if v.isdigit()]

print(numbers)
```

Output:

```text
[10, 25, 30]
```

Without the `if`, `int("abc")` would raise a `ValueError`.

### Conditions with dictionary comprehension

```python
scores = {"Maths": 88, "Science": 92, "English": 79, "Art": 65}

passed = {subject: score for subject, score in scores.items() if score >= 75}

print(passed)
```

Output:

```text
{'Maths': 88, 'Science': 92, 'English': 79}
```

### Conditions with set comprehension

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8]

large = {n for n in numbers if n > 4}

print(large)
```

Output:

```text
{5, 6, 7, 8}
```

---

## `if-else` Inside a Comprehension

There are two distinct forms, and mixing them up is a common mistake.

### Form 1: filter (no `else`)

The `if` goes at the **end** and simply drops items:

```python
numbers = [1, 2, 3, 4, 5]

evens = [n for n in numbers if n % 2 == 0]

print(evens)      # [2, 4]
```

### Form 2: conditional expression (with `else`)

The `if/else` goes **before** the `for` and produces a value for **every** item:

```python
numbers = [1, 2, 3, 4, 5]

labels = ["even" if n % 2 == 0 else "odd" for n in numbers]

print(labels)
```

Output:

```text
['odd', 'even', 'odd', 'even', 'odd']
```

### The difference

| Form | Position | Effect |
| ---- | -------- | ------ |
| Filter | `[x for x in items if cond]` | Keeps matching items, **drops** the rest |
| Conditional | `[a if cond else b for x in items]` | Transforms **every** item one way or the other |

```python
# Filter — output is shorter than input
[n for n in range(10) if n > 5]               # [6, 7, 8, 9]

# Conditional — output is the same length
["big" if n > 5 else "small" for n in range(4)]
# ['small', 'small', 'small', 'small']
```

> **Note** — `if` at the end cannot have an `else`. `[x if cond else y for x in items]` is the conditional form; `[x for x in items if cond else y]` is a `SyntaxError`.

### A practical conditional example

```python
scores = [88, 45, 92, 61]

results = ["Pass" if s >= 50 else "Fail" for s in scores]

print(results)
```

Output:

```text
['Pass', 'Fail', 'Pass', 'Pass']
```

---

## Nested Comprehensions

A comprehension inside a comprehension.

### Building a matrix

```python
matrix = [[row * 3 + col + 1 for col in range(3)] for row in range(3)]

print(matrix)
```

Output:

```text
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

### Transposing a matrix

```python
matrix = [[1, 2, 3], [4, 5, 6]]

transposed = [[row[i] for row in matrix] for i in range(3)]

print(transposed)
```

Output:

```text
[[1, 4], [2, 5], [3, 6]]
```

> **Readability warning** — Nested comprehensions get hard to read fast. If you cannot say the meaning out loud in one breath, write nested `for` loops instead.

---

## Generator Expressions

Swap the brackets for parentheses and you get a **generator** — a lazy sequence that produces values on demand.

```python
numbers = [1, 2, 3, 4, 5]

squares_gen = (n ** 2 for n in numbers)

print(squares_gen)            # <generator object ...>
print(list(squares_gen))      # [1, 4, 9, 16, 25]
```

### Why it matters

```python
# List comprehension — builds all million values now
total = sum([n ** 2 for n in range(1_000_000)])

# Generator — produces them one at a time
total = sum(n ** 2 for n in range(1_000_000))
```

Both give the same answer, but the generator never holds a million values in memory.

| | Syntax | Memory | Reusable |
| - | ------ | ------ | -------- |
| List comprehension | `[...]` | Builds everything | Yes |
| Generator expression | `(...)` | One item at a time | No — consumed once |

> **Note** — Inside a function call like `sum()` or `max()`, you can omit the extra parentheses: `sum(n ** 2 for n in numbers)`.

---

## Normal Loop vs Comprehension

```python
numbers = [1, 2, 3, 4, 5, 6]

# Loop
evens = []
for n in numbers:
    if n % 2 == 0:
        evens.append(n)

# Comprehension
evens = [n for n in numbers if n % 2 == 0]
```

Both produce `[2, 4, 6]`.

### When to use a comprehension

* The transformation is a single expression
* You are building a new collection from an iterable
* The result fits on one readable line

### When to use a loop

* The body needs several statements
* You need `try`/`except` inside
* You are updating something external (printing, writing to a file)
* The logic is complex enough that naming intermediate steps helps

```python
# Comprehension — perfect
squares = [n ** 2 for n in numbers]

# Loop — better, because the body has side effects
for user in users:
    send_email(user)
    log_sent(user)
```

> **Rule** — Use a comprehension for *transforming data*. Use a loop for *doing things*.

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| `[x for x in items if cond else y]` | `SyntaxError` | Move the conditional before `for`: `[x if cond else y for x in items]` |
| Expecting `if` at the end to keep all items | Non-matching items are dropped | Use the conditional form |
| Using a comprehension for side effects | Creates a wasted list | Use a `for` loop |
| Nested comprehensions three deep | Unreadable | Use loops |
| Reusing an exhausted generator | Yields nothing | Rebuild it, or use a list |
| Swapping dict keys/values with duplicates | Values silently lost | Check for uniqueness first |

---

## Quick Revision

| Form | Syntax | Produces |
| ---- | ------ | -------- |
| List | `[expr for x in items]` | list |
| List with filter | `[expr for x in items if cond]` | filtered list |
| List with conditional | `[a if cond else b for x in items]` | same-length list |
| Dict | `{k: v for x in items}` | dict |
| Set | `{expr for x in items}` | set (unique) |
| Nested | `[[...] for ...]` | nested lists |
| Generator | `(expr for x in items)` | lazy iterator |

### Core patterns

```python
[n ** 2 for n in numbers]                      # transform
[n for n in numbers if n > 0]                  # filter
["even" if n % 2 == 0 else "odd" for n in xs]  # conditional
{name: len(name) for name in names}            # dict
{len(w) for w in words}                        # set of unique values
[n for row in matrix for n in row]             # flatten
[int(v) for v in input().split()]              # parse input
sum(n ** 2 for n in numbers)                   # generator, no extra list
```

### The main idea

```text
Comprehensions
 ├── [ expr for item in iterable if condition ]
 │        ↑          ↑                ↑
 │     what       where            filter
 ├── List  [ ]   → ordered, duplicates kept
 ├── Set   { }   → unique, unordered
 ├── Dict  {k:v} → key-value pairs
 ├── if at the END   → filter (drops items)
 ├── if/else BEFORE  → transform every item
 ├── Generator ( )   → lazy, one value at a time
 └── Use for transforming; use loops for side effects
```

---

## Self-Check

- [ ] What is the difference between `[x for x in items if c]` and `[a if c else b for x in items]`?
- [ ] How do you build a dictionary of each word's length from a list of words?
- [ ] Why does `{n for n in [1, 1, 2]}` give `{1, 2}`?
- [ ] What is a generator expression, and when is it better than a list comprehension?
- [ ] How do you flatten `[[1, 2], [3, 4]]` with a comprehension?
- [ ] When should you *not* use a comprehension?
- [ ] What happens if you use a generator expression twice?
