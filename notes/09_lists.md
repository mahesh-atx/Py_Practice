# Python Lists — Notes

A **list** is an ordered, changeable collection of items, written in square brackets.

> **Why this matters** — Lists are the workhorse collection type. They hold rows of data, results of a loop, lines of a file, and almost everything else. Lists also introduce the idea of **mutability**, which changes how you think about assignment.

### The mental model

```text
["apple", "banana", "mango"]
    ↑         ↑         ↑
    0         1         2      ← index (0-based)
   -3        -2        -1      ← negative index
```

| Property | Lists |
| -------- | ----- |
| Ordered | Yes — items keep their position |
| Mutable | Yes — you can change, add, remove |
| Duplicates allowed | Yes |
| Indexed | Yes — by position |
| Mixed types allowed | Yes |

---

## 1. Creating Lists

### Basic creation

```python
fruits = ["apple", "banana", "mango"]

print(fruits)
```

Output:

```text
['apple', 'banana', 'mango']
```

### An empty list

```python
items = []
```

### Mixed types

```python
data = ["Mahesh", 24, 5.8, True]
```

Lists can hold anything, including other lists:

```python
matrix = [[1, 2, 3], [4, 5, 6]]
```

### From `range()`

```python
numbers = list(range(5))

print(numbers)
```

Output:

```text
[0, 1, 2, 3, 4]
```

### From a string

```python
print(list("Python"))          # ['P', 'y', 't', 'h', 'o', 'n']
print("a,b,c".split(","))      # ['a', 'b', 'c']
```

### `len()`

```python
fruits = ["apple", "banana", "mango"]

print(len(fruits))
```

Output:

```text
3
```

---

## 2. Indexing and Slicing

Lists use the same indexing and slicing syntax as strings.

### Indexing

```python
fruits = ["apple", "banana", "mango"]

print(fruits[0])      # apple
print(fruits[1])      # banana
print(fruits[-1])     # mango  → last item
print(fruits[-2])     # banana
```

### Out of range

```python
print(fruits[5])      # IndexError: list index out of range
```

### Slicing

```python
numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])       # [20, 30, 40]
print(numbers[:3])        # [10, 20, 30]
print(numbers[3:])        # [40, 50]
print(numbers[:])         # [10, 20, 30, 40, 50]  → a copy
print(numbers[::2])       # [10, 30, 50]
print(numbers[::-1])      # [50, 40, 30, 20, 10]  → reversed
```

> **`numbers[:]` is the idiomatic way to copy a list.** See the aliasing section below for why that matters.

### Changing items — lists are mutable

Unlike strings, you can assign to a position:

```python
fruits = ["apple", "banana", "mango"]

fruits[0] = "orange"

print(fruits)
```

Output:

```text
['orange', 'banana', 'mango']
```

This is the key difference from strings, which raise `TypeError` on item assignment.

### Replacing a slice

```python
numbers = [1, 2, 3, 4, 5]

numbers[1:3] = [20, 30]

print(numbers)
```

Output:

```text
[1, 20, 30, 4, 5]
```

### Membership

```python
fruits = ["apple", "banana", "mango"]

print("apple" in fruits)         # True
print("orange" not in fruits)    # True
```

### Useful built-ins

```python
numbers = [4, 2, 9, 1]

print(len(numbers))      # 4
print(sum(numbers))      # 16
print(min(numbers))      # 1
print(max(numbers))      # 9
print(sorted(numbers))   # [1, 2, 4, 9]  → new sorted list
```

---

## Aliasing and Copying — Read This Carefully

This is the single most consequential thing to understand about lists.

### Assignment does not copy

```python
a = [1, 2, 3]
b = a            # b is another name for the SAME list

b.append(4)

print(a)         # [1, 2, 3, 4]   ← a changed too!
print(b)         # [1, 2, 3, 4]
print(a is b)    # True — same object
```

```text
a ──→ [1, 2, 3] ←── b      both names point at one list
```

### How to actually copy

```python
a = [1, 2, 3]

b = a[:]                 # slice copy
c = a.copy()             # method
d = list(a)              # constructor

b.append(4)
print(a)                 # [1, 2, 3]  ← untouched
print(b)                 # [1, 2, 3, 4]
```

### Shallow copies and nested lists

`copy()` is **shallow** — nested lists are still shared:

```python
a = [[1, 2], [3, 4]]
b = a.copy()

b[0].append(99)

print(a)        # [[1, 2, 99], [3, 4]]   ← the inner list changed!
```

For nested structures, use `copy.deepcopy()`:

```python
import copy

a = [[1, 2], [3, 4]]
b = copy.deepcopy(a)

b[0].append(99)
print(a)        # [[1, 2], [3, 4]]  ← safe
```

> **Rule** — `b = a` never copies. Use `a.copy()` for flat lists and `copy.deepcopy(a)` for nested ones.

---

## 3. Adding and Removing Items

Lists are mutable, so items can be added and removed after creation.

| Method | Purpose |
| ------ | ------- |
| `.append(x)` | Add `x` to the end |
| `.insert(i, x)` | Insert `x` at index `i` |
| `.remove(x)` | Remove the first `x` by value |
| `.pop(i)` | Remove and return item at index `i` |
| `del list[i]` | Delete by index (a statement, not a method) |
| `.clear()` | Remove all items |
| `.sort()` | Sort in place |
| `.reverse()` | Reverse in place |
| `.extend(other)` | Append all items from another list |

Each is covered in detail below.

---

## 4. `.append()`

Adds **one** item to the end.

```python
fruits = ["apple", "banana"]

fruits.append("mango")

print(fruits)
```

Output:

```text
['apple', 'banana', 'mango']
```

### `.append()` modifies in place

Unlike string methods, list methods change the list and return `None`:

```python
fruits = ["apple"]
result = fruits.append("banana")

print(fruits)      # ['apple', 'banana']
print(result)      # None
```

> **Common bug** — `fruits = fruits.append("x")` sets `fruits` to `None`, destroying your list. Call `.append()` as a statement; do not assign its result.

### Appending in a loop

The standard way to build a list:

```python
squares = []

for n in range(1, 6):
    squares.append(n ** 2)

print(squares)
```

Output:

```text
[1, 4, 9, 16, 25]
```

### `.append()` vs `.extend()`

```python
a = [1, 2]
a.append([3, 4])
print(a)          # [1, 2, [3, 4]]   ← nested list

b = [1, 2]
b.extend([3, 4])
print(b)          # [1, 2, 3, 4]     ← flattened
```

`.append()` adds **one** item (even if that item is a list). `.extend()` adds **each** item from the argument.

### `+` for concatenation

```python
a = [1, 2] + [3, 4]      # [1, 2, 3, 4]  → new list
```

---

## 5. `.insert()`

Inserts an item at a specific index, shifting the rest right.

```python
fruits = ["apple", "mango"]

fruits.insert(1, "banana")

print(fruits)
```

Output:

```text
['apple', 'banana', 'mango']
```

### Inserting at the ends

```python
items = [2, 3]

items.insert(0, 1)        # at the front
items.insert(len(items), 4)   # at the end

print(items)
```

Output:

```text
[1, 2, 3, 4]
```

> **Performance note** — `.append()` is O(1), but `.insert(0, x)` is O(n) because every following item must shift. If you frequently add to the front, use `collections.deque`.

---

## 6. `.remove()`

Removes the **first** item matching a value.

```python
fruits = ["apple", "banana", "mango"]

fruits.remove("banana")

print(fruits)
```

Output:

```text
['apple', 'mango']
```

### Only the first match

```python
numbers = [1, 2, 3, 2, 1]

numbers.remove(2)

print(numbers)
```

Output:

```text
[1, 3, 2, 1]
```

### Removing a value that is absent

```python
fruits = ["apple"]
fruits.remove("orange")      # ValueError: list.remove(x): x not in list
```

Guard it:

```python
if "orange" in fruits:
    fruits.remove("orange")
```

Or use `discard`-like behaviour with a list comprehension:

```python
fruits = [f for f in fruits if f != "orange"]
```

---

## 7. `.pop()`

Removes and **returns** an item by index.

```python
fruits = ["apple", "banana", "mango"]

removed = fruits.pop(1)

print(removed)
print(fruits)
```

Output:

```text
banana
['apple', 'mango']
```

### With no index, it removes the last item

```python
numbers = [1, 2, 3]

last = numbers.pop()

print(last)        # 3
print(numbers)     # [1, 2]
```

### `.pop()` vs `.remove()`

| | `.pop(i)` | `.remove(x)` |
| - | --------- | ------------ |
| Selects by | Index | Value |
| Returns | The removed item | `None` |
| Missing item | `IndexError` | `ValueError` |

```python
numbers = [10, 20, 30]

numbers.pop(0)        # removes 10, returns it
numbers.remove(30)    # removes 30, returns nothing
```

### Using `del`

`del` removes by index or slice, and returns nothing:

```python
numbers = [1, 2, 3, 4, 5]

del numbers[0]
print(numbers)          # [2, 3, 4, 5]

del numbers[1:3]
print(numbers)          # [2, 5]
```

### `clear()`

```python
numbers = [1, 2, 3]
numbers.clear()
print(numbers)          # []
```

---

## 8. `.sort()`

Sorts the list **in place** and returns `None`.

```python
numbers = [3, 1, 4, 2]

numbers.sort()

print(numbers)
```

Output:

```text
[1, 2, 3, 4]
```

> **Common bug** — `numbers = numbers.sort()` sets `numbers` to `None`. Call `.sort()` as a statement.

### Descending order

```python
numbers = [3, 1, 4, 2]
numbers.sort(reverse=True)
print(numbers)
```

Output:

```text
[4, 3, 2, 1]
```

### Sorting strings

```python
fruits = ["mango", "apple", "banana"]

fruits.sort()
print(fruits)
```

Output:

```text
['apple', 'banana', 'mango']
```

Uppercase sorts before lowercase, so use `key=str.lower` for case-insensitive sorting:

```python
words = ["Banana", "apple", "Cherry"]
words.sort(key=str.lower)
print(words)          # ['apple', 'Banana', 'Cherry']
```

### `sort()` vs `sorted()`

| | `list.sort()` | `sorted(list)` |
| - | ------------- | -------------- |
| Changes the original? | Yes | No |
| Returns | `None` | A new sorted list |
| Use when | You do not need the original order | You need to keep it |

```python
numbers = [3, 1, 2]

sorted_numbers = sorted(numbers)
print(sorted_numbers)     # [1, 2, 3]
print(numbers)            # [3, 1, 2]  ← unchanged
```

### Custom sort keys

```python
students = [("Mahesh", 88), ("Nina", 95), ("Rahul", 79)]

students.sort(key=lambda s: s[1])      # sort by score
print(students)
```

Output:

```text
[('Rahul', 79), ('Mahesh', 88), ('Nina', 95)]
```

---

## 9. `.reverse()`

Reverses the list **in place**, returning `None`.

```python
numbers = [1, 2, 3]

numbers.reverse()

print(numbers)
```

Output:

```text
[3, 2, 1]
```

### Alternatives

```python
numbers = [1, 2, 3]

print(numbers[::-1])          # [3, 2, 1]  → new list, original kept
print(list(reversed(numbers)))# [3, 2, 1]  → new list
print(numbers)                # [1, 2, 3]
```

| Approach | Changes original? | Returns |
| -------- | ----------------- | ------- |
| `numbers.reverse()` | Yes | `None` |
| `numbers[::-1]` | No | New reversed list |
| `reversed(numbers)` | No | Iterator |

---

## 10. List Looping

### Basic iteration

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

### With an index — `enumerate()`

```python
for i, fruit in enumerate(fruits):
    print(i, fruit)
```

Output:

```text
0 apple
1 banana
2 mango
```

Start counting from 1:

```python
for i, fruit in enumerate(fruits, start=1):
    print(i, fruit)
```

Output:

```text
1 apple
2 banana
3 mango
```

> **Prefer `enumerate()` over `range(len(list))`.** It is shorter and clearer.

### Building a new list

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

The same thing as a comprehension:

```python
squares = [n ** 2 for n in numbers]
```

### Filtering

```python
numbers = [1, 2, 3, 4, 5, 6]

evens = []

for n in numbers:
    if n % 2 == 0:
        evens.append(n)

print(evens)
```

Output:

```text
[2, 4, 6]
```

As a comprehension:

```python
evens = [n for n in numbers if n % 2 == 0]
```

### Two lists together — `zip()`

```python
names = ["Mahesh", "Nina"]
scores = [88, 95]

for name, score in zip(names, scores):
    print(name, "→", score)
```

Output:

```text
Mahesh → 88
Nina → 95
```

### Do not modify a list while iterating

```python
numbers = [1, 2, 3, 4, 5]

for n in numbers:
    if n % 2 == 0:
        numbers.remove(n)      # ← mutating during iteration

print(numbers)
```

Output:

```text
[1, 3, 5]
```

That happens to work here, but it is fragile — removing items shifts the indices and causes elements to be skipped. Iterate over a copy instead:

```python
for n in numbers[:]:
    if n % 2 == 0:
        numbers.remove(n)
```

Or build a new list:

```python
numbers = [n for n in numbers if n % 2 != 0]
```

---

## Common List Operations Together

```python
items = []

items.append(10)          # add to the end      → [10]
items.append(20)          #                     → [10, 20]
items.insert(0, 5)        # insert at index 0   → [5, 10, 20]
items.remove(10)          # remove by value     → [5, 20]
popped = items.pop()      # remove last         → returns 20, list is [5]
items.extend([1, 2])      # add several         → [5, 1, 2]
items.sort()              # sort in place       → [1, 2, 5]
items.reverse()           # reverse in place    → [5, 2, 1]
count = len(items)        # length              → 3
items.clear()             # empty the list      → []
```

---

## List Methods Reference

| Method | Purpose | Returns |
| ------ | ------- | ------- |
| `.append(x)` | Add to the end | `None` |
| `.extend(iter)` | Add several | `None` |
| `.insert(i, x)` | Insert at index | `None` |
| `.remove(x)` | Remove first match by value | `None` |
| `.pop(i)` | Remove and return by index | The item |
| `.clear()` | Empty the list | `None` |
| `.index(x)` | Index of first match | `int` |
| `.count(x)` | Count occurrences | `int` |
| `.sort()` | Sort in place | `None` |
| `.reverse()` | Reverse in place | `None` |
| `.copy()` | Shallow copy | New list |

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| `b = a` expecting a copy | Both names share one list | `b = a.copy()` |
| `items = items.append(x)` | `items` becomes `None` | Call `.append()` as a statement |
| `items = items.sort()` | `items` becomes `None` | Call `.sort()` or use `sorted()` |
| Index beyond the end | `IndexError` | Check `len()` |
| `.remove(x)` when `x` is absent | `ValueError` | Check `if x in list` first |
| Modifying while iterating | Items skipped | Iterate a copy or build a new list |
| `.append([1,2])` expecting flattening | Creates a nested list | Use `.extend([1,2])` |

---

## Quick Revision

| Topic | Key point | Example |
| ----- | --------- | ------- |
| Create | Square brackets | `[1, 2, 3]` |
| Empty | `[]` | `items = []` |
| Index | Zero-based | `items[0]`, `items[-1]` |
| Slice | `[start:stop]`, stop excluded | `items[1:3]` |
| Copy | `[:]` or `.copy()` | `b = a.copy()` |
| Mutable | Items can be reassigned | `items[0] = "x"` |
| Add | `.append(x)` | End of the list |
| Add several | `.extend([...])` | Flattens |
| Insert | `.insert(i, x)` | At a position |
| Remove by value | `.remove(x)` | First match |
| Remove by index | `.pop(i)` | Returns the item |
| Sort | `.sort()` or `sorted()` | In place vs new list |
| Reverse | `.reverse()` or `[::-1]` | In place vs new list |
| Loop | `for x in items:` | Direct iteration |
| With index | `enumerate(items)` | Index and value |

### Core patterns

```python
items = []                        # start empty
items.append(x)                   # add
items.insert(0, x)                # add at front
items.remove(x)                   # remove by value
item = items.pop()                # remove last, keep the value
items.sort()                       # sort in place
new = sorted(items)                # sorted copy
new = items.copy()                 # real copy
for i, x in enumerate(items):      # index + value
    print(i, x)
squares = [n ** 2 for n in nums]   # build a new list
```

### The main idea

```text
Lists
 ├── Ordered, mutable, duplicates allowed
 ├── Indexing and slicing (same syntax as strings)
 ├── Mutable → methods change the list and return None
 ├── b = a does NOT copy → use .copy() or [:]
 ├── Add:    append / insert / extend
 ├── Remove: remove (by value) / pop (by index) / del / clear
 ├── Order:  sort() vs sorted(), reverse() vs [::-1]
 └── Loop:   for x in items, enumerate(), zip()
```

---

## Self-Check

- [ ] Why does `b = a; b.append(1)` also change `a`?
- [ ] What does `list.append(x)` return, and why does that matter?
- [ ] What is the difference between `.append([3, 4])` and `.extend([3, 4])`?
- [ ] What is the difference between `.sort()` and `sorted()`?
- [ ] Why is `insert(0, x)` slower than `append(x)`?
- [ ] What is the risk of removing items while iterating, and how do you avoid it?
- [ ] How do you get both the index and the value while looping?
