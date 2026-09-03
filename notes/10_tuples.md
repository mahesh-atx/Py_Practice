# Python Tuples — Notes

A **tuple** is an ordered, **unchangeable** collection, written in parentheses.

> **Why this matters** — Tuples answer a question lists cannot: "how do I guarantee this data will not be modified?" They are used for fixed records (coordinates, RGB colours, database rows), dictionary keys, and multiple return values. Choosing a tuple over a list is a way of stating intent.

### The mental model

```text
Tuple  →  a sealed box: ordered, but the contents cannot be swapped out
List   →  an open box:  ordered, and you can add, remove, and replace
```

| Property | Tuple | List |
| -------- | ----- | ---- |
| Syntax | `(1, 2, 3)` | `[1, 2, 3]` |
| Ordered | Yes | Yes |
| Mutable | **No** | Yes |
| Duplicates allowed | Yes | Yes |
| Can be a dict key | Yes | No |
| Performance | Slightly faster | Slightly slower |

---

## 1. Creating Tuples

### Basic creation

```python
fruits = ("apple", "banana", "mango")

print(fruits)
print(type(fruits))
```

Output:

```text
('apple', 'banana', 'mango')
<class 'tuple'>
```

### Mixed types

```python
person = ("Mahesh", 24, "Akola")
```

### The single-item trap

This is the classic tuple gotcha:

```python
not_a_tuple = (10)

print(not_a_tuple)
print(type(not_a_tuple))
```

Output:

```text
10
<class 'int'>
```

The parentheses are just grouping here, not a tuple. You need a **trailing comma**:

```python
single = (10,)

print(single)
print(type(single))
```

Output:

```text
(10,)
<class 'tuple'>
```

> **Rule** — A tuple is made by the **comma**, not the parentheses. `(10,)` is a tuple; `(10)` is an integer.

### Parentheses are optional

Because the comma does the work, these are equivalent:

```python
a = (1, 2, 3)
b = 1, 2, 3        # "tuple packing"

print(a == b)      # True
```

Most code includes the parentheses for readability, but you will see the bare form when returning multiple values.

### Empty tuple

```python
empty = ()
```

### From another sequence

```python
print(tuple([1, 2, 3]))        # (1, 2, 3)
print(tuple("Python"))         # ('P', 'y', 't', 'h', 'o', 'n')
```

---

## 2. Indexing and Slicing

Tuples support the same indexing and slicing as lists.

### Indexing

```python
fruits = ("apple", "banana", "mango")

print(fruits[0])       # apple
print(fruits[1])       # banana
print(fruits[-1])      # mango  → last item
print(fruits[-2])      # banana
```

### Slicing

```python
numbers = (10, 20, 30, 40, 50)

print(numbers[1:4])       # (20, 30, 40)
print(numbers[:2])        # (10, 20)
print(numbers[3:])        # (40, 50)
print(numbers[::2])       # (10, 30, 50)
print(numbers[::-1])      # (50, 40, 30, 20, 10)
```

> **Note** — Slicing a tuple returns a **tuple**, not a list.

### Membership and length

```python
fruits = ("apple", "banana", "mango")

print("apple" in fruits)       # True
print(len(fruits))             # 3
```

### Iterating

```python
for fruit in fruits:
    print(fruit)
```

Output:

```text
apple
banana
mango
```

With an index:

```python
for i, fruit in enumerate(fruits):
    print(i, fruit)
```

---

## 3. Immutability

Tuples **cannot be changed** after creation.

```python
fruits = ("apple", "banana")

fruits[0] = "orange"
```

Output:

```text
TypeError: 'tuple' object does not support item assignment
```

There is no `.append()`, `.insert()`, `.remove()`, or `.pop()` on a tuple.

### What immutability really means

The tuple's structure is fixed: you cannot replace, add, or remove elements. But if an element is itself mutable, that element can still change inside:

```python
record = (1, [2, 3])

record[1].append(4)      # allowed — the list is mutable

print(record)
```

Output:

```text
(1, [2, 3, 4])
```

The tuple still holds the same list object; the list simply changed its contents.

```text
record ──→ ( 1 , ──→ [2, 3, 4] )
                        ↑
              the list is mutable, even inside a tuple
```

### Reassigning is not mutating

```python
point = (1, 2)
point = (3, 4)        # this is allowed

print(point)
```

Output:

```text
(3, 4)
```

The name `point` now refers to a **different** tuple. The original `(1, 2)` was never modified.

### Working around immutability

To "change" a tuple, build a new one:

```python
point = (1, 2)
point = point + (3,)       # concatenation creates a new tuple

print(point)
```

Output:

```text
(1, 2, 3)
```

Or convert, modify, and convert back:

```python
items = (1, 2, 3)

temp = list(items)
temp.append(4)
items = tuple(temp)

print(items)
```

Output:

```text
(1, 2, 3, 4)
```

### Why immutability is useful

1. **Safety** — data cannot be changed by accident elsewhere in the program.
2. **Hashability** — tuples can be dictionary keys; lists cannot.
3. **Intent** — a tuple signals "this is a fixed record".
4. **Performance** — Python can optimise immutable objects.

```python
# Works — tuples are hashable
locations = {
    (28.61, 77.20): "Delhi",
    (19.07, 72.87): "Mumbai",
}

print(locations[(28.61, 77.20)])
```

Output:

```text
Delhi
```

A list key raises `TypeError: unhashable type: 'list'`.

---

## 4. Tuple Methods

Tuples have only two methods, because they cannot be modified.

| Method | Purpose |
| ------ | ------- |
| `.count(x)` | Count occurrences of `x` |
| `.index(x)` | Index of the first occurrence of `x` |

### `.count()`

```python
numbers = (1, 2, 2, 3, 2)

print(numbers.count(2))
print(numbers.count(5))
```

Output:

```text
3
0
```

### `.index()`

```python
fruits = ("apple", "banana", "mango")

print(fruits.index("banana"))
```

Output:

```text
1
```

`.index()` raises `ValueError` if the item is absent:

```python
print(fruits.index("orange"))      # ValueError: tuple.index(x): x not in tuple
```

Guard it:

```python
if "orange" in fruits:
    print(fruits.index("orange"))
```

### Built-in functions work on tuples

```python
numbers = (4, 2, 9, 1)

print(len(numbers))        # 4
print(sum(numbers))        # 16
print(min(numbers))        # 1
print(max(numbers))        # 9
print(sorted(numbers))     # [1, 2, 4, 9]  → returns a LIST
```

> **Note** — `sorted()` always returns a list, even when given a tuple.

---

## 5. Unpacking

**Unpacking** assigns the elements of a tuple to separate variables in one step.

```python
point = (10, 20)

x, y = point

print(x)
print(y)
```

Output:

```text
10
20
```

### The count must match

```python
a, b = (1, 2, 3)       # ValueError: too many values to unpack
a, b, c = (1, 2)       # ValueError: not enough values to unpack
```

### Unpacking a record

```python
person = ("Mahesh", 24, "Akola")

name, age, city = person

print(name)
print(age)
print(city)
```

Output:

```text
Mahesh
24
Akola
```

### Swapping variables

Unpacking is what makes Python's swap work:

```python
a = 10
b = 20

a, b = b, a

print(a, b)
```

Output:

```text
20 10
```

The right side `(b, a)` is evaluated first, producing `(20, 10)`, then unpacked into `a, b`.

### Ignoring values with `_`

```python
person = ("Mahesh", 24, "Akola")

name, _, city = person      # age is discarded
print(name, city)
```

Output:

```text
Mahesh Akola
```

### Extended unpacking with `*`

Star one name to collect the remainder into a list:

```python
numbers = (1, 2, 3, 4, 5)

first, *rest = numbers
print(first)       # 1
print(rest)        # [2, 3, 4, 5]

*beginning, last = numbers
print(beginning)   # [1, 2, 3, 4]
print(last)        # 5

first, *middle, last = numbers
print(first)       # 1
print(middle)      # [2, 3, 4]
print(last)        # 5
```

> **Note** — The starred name always collects a **list**, even when unpacking a tuple.

### Returning multiple values

This is one of the most common uses of tuples:

```python
def min_max(numbers):
    return min(numbers), max(numbers)      # packed into a tuple


low, high = min_max([3, 1, 9, 4])          # unpacked

print(low, high)
```

Output:

```text
1 9
```

Actually the function returns a single tuple; the unpacking on the calling line is what splits it.

---

## 6. Tuples vs Lists

| Aspect | Tuple | List |
| ------ | ----- | ---- |
| Syntax | `( )` | `[ ]` |
| Mutable | No | Yes |
| Methods | `count`, `index` only | Many |
| Dict key | Yes | No |
| Use for | Fixed records, coordinates, keys | Collections that change |
| Memory | Slightly less | Slightly more |

### When to use a tuple

* Data that should not change (constants, configuration)
* Fixed records: coordinates `(x, y)`, colours `(255, 0, 0)`, a database row
* Dictionary keys
* Returning several values from a function
* When you want to signal "this is one fixed thing"

### When to use a list

* Collections that grow, shrink, or get reordered
* Anything you need to sort, append to, or filter
* Homogeneous sequences you process item by item

```python
# Tuple — a fixed record
rgb_red = (255, 0, 0)
coordinate = (19.07, 72.87)

# List — a changing collection
todo_items = []
todo_items.append("Buy milk")
```

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| `(10)` expecting a tuple | It is an `int` | Add a comma: `(10,)` |
| Trying `t[0] = x` | `TypeError` | Build a new tuple |
| Calling `.append()` on a tuple | `AttributeError` | Convert to a list first |
| Unpacking with the wrong count | `ValueError` | Match the element count |
| Using a list as a dict key | `TypeError: unhashable` | Use a tuple |
| Expecting `sorted(t)` to give a tuple | It returns a list | `tuple(sorted(t))` |

---

## Quick Revision

| Topic | Key point | Example |
| ----- | --------- | ------- |
| Create | Parentheses | `(1, 2, 3)` |
| Single item | Needs a trailing comma | `(1,)` |
| Empty | `()` | `t = ()` |
| Index | Zero-based | `t[0]`, `t[-1]` |
| Slice | Returns a tuple | `t[1:3]` |
| Immutable | Cannot change items | `t[0] = x` → `TypeError` |
| `.count(x)` | Count occurrences | `t.count(2)` |
| `.index(x)` | Position of first match | `t.index("a")` |
| Unpack | Assign to several names | `x, y = point` |
| Extended unpack | Star collects the rest | `first, *rest = t` |
| Swap | Tuple unpacking | `a, b = b, a` |
| Multiple returns | Return a tuple | `return min(x), max(x)` |
| Dict key | Tuples are hashable | `d[(1, 2)] = "x"` |

### Core patterns

```python
point = (10, 20)                 # create
x, y = point                     # unpack
a, b = b, a                      # swap
first, *rest = items             # extended unpack
name, _, city = record           # ignore a value
count = items.count(2)           # count
pos = items.index("a")           # find position
new = items + (4,)               # "add" by making a new tuple
temp = list(items)               # convert to modify
coords = {(1, 2): "A"}           # tuple as a dict key
```

### The main idea

```text
Tuples
 ├── Ordered, immutable, duplicates allowed
 ├── Created by the COMMA — (1,) not (1)
 ├── Indexing and slicing work like lists
 ├── Cannot add, remove, or replace items
 ├── Only two methods: count() and index()
 ├── Unpacking → x, y = point  (also enables swapping)
 ├── Returning multiple values from a function
 └── Hashable → valid dictionary keys
```

---

## Self-Check

- [ ] Why is `(10)` not a tuple, and how do you fix it?
- [ ] Can you change a list that is stored inside a tuple?
- [ ] What are the only two methods tuples have, and why so few?
- [ ] How does `a, b = b, a` work?
- [ ] What does `first, *rest = (1, 2, 3)` assign to `rest`, and what type is it?
- [ ] Why can a tuple be a dictionary key but a list cannot?
- [ ] What does `sorted((3, 1, 2))` return?
