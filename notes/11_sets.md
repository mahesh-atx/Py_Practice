# Python Sets — Notes

A **set** is an unordered collection of **unique** values.

> **Why this matters** — Sets answer two questions that lists answer slowly and clumsily: "does this item exist?" and "how do these two groups compare?". Membership testing on a set is near-instant regardless of size, and union/intersection/difference turn whole loops into a single operator.

### The mental model

```text
Set  →  a bag that refuses duplicates, with no fixed order

  add 4 →  {1, 2, 3}  →  {1, 2, 3, 4}
  add 2 →  {1, 2, 3}  →  {1, 2, 3}      (already there, nothing happens)
```

| Property | Sets |
| -------- | ---- |
| Ordered | **No** — never rely on the display order |
| Mutable | Yes — you can add and remove |
| Duplicates | **Not allowed** — silently collapsed |
| Indexed | **No** — `s[0]` raises `TypeError` |
| Membership test | O(1) — very fast |

---

## 1. Creating Sets

### Basic creation

```python
fruits = {"apple", "banana", "mango"}

print(fruits)
print(type(fruits))
```

Output:

```text
{'banana', 'mango', 'apple'}
<class 'set'>
```

> **Note the order** — `'banana'` printed first even though `'apple'` was written first. Sets have no guaranteed order. This is not a bug; it is the defining property.

### A set of numbers

```python
numbers = {10, 20, 30, 40}
```

### Mixed types

```python
data = {"Mahesh", 24, True}
```

### The empty-set trap

```python
empty = {}

print(type(empty))
```

Output:

```text
<class 'dict'>
```

Curly braces alone create an empty **dictionary**. To make an empty set, call `set()`:

```python
empty = set()

print(empty)
print(type(empty))
```

Output:

```text
set()
<class 'set'>
```

> **Rule** — `{}` is a dict. `set()` is an empty set. This trips up nearly everyone once.

### From a list or string

```python
print(set([1, 2, 2, 3, 3]))      # {1, 2, 3}      → duplicates removed
print(set("hello"))              # {'h', 'e', 'l', 'o'}  → 'l' appears once
print(set(range(4)))             # {0, 1, 2, 3}
```

### Duplicates are collapsed automatically

```python
numbers = {10, 20, 10, 30, 20}

print(numbers)
```

Output:

```text
{10, 20, 30}
```

No error, no warning — the extra copies simply vanish. That is the point of a set.

### Elements must be hashable

```python
valid = {1, "two", (3, 4)}        # fine — numbers, strings, tuples

invalid = {[1, 2], [3, 4]}        # TypeError: unhashable type: 'list'
```

Lists and dictionaries cannot go in a set because they are mutable. Tuples can.

### `len()` and membership

```python
numbers = {10, 20, 30}

print(len(numbers))        # 3
print(10 in numbers)       # True
print(99 not in numbers)   # True
```

### You cannot index a set

```python
numbers = {10, 20, 30}
print(numbers[0])
```

Output:

```text
TypeError: 'set' object is not subscriptable
```

There is no "first" element, because there is no order.

---

## 2. Adding and Removing Values

### `.add()`

Adds one value.

```python
fruits = {"apple", "banana"}

fruits.add("mango")

print(fruits)
```

Output:

```text
{'banana', 'mango', 'apple'}
```

Adding a value already present does nothing:

```python
numbers = {10, 20, 30}

numbers.add(20)

print(numbers)
```

Output:

```text
{10, 20, 30}
```

### `.update()`

Adds several values at once:

```python
fruits = {"apple"}
fruits.update(["banana", "mango"])

print(fruits)
```

Output:

```text
{'banana', 'mango', 'apple'}
```

### `.remove()`

Removes a specific value, raising `KeyError` if absent:

```python
fruits = {"apple", "banana", "mango"}

fruits.remove("banana")

print(fruits)
```

Output:

```text
{'mango', 'apple'}
```

```python
fruits.remove("orange")
```

Output:

```text
KeyError: 'orange'
```

### `.discard()`

Identical to `.remove()` but **silently ignores** missing values:

```python
fruits = {"apple", "banana"}

fruits.discard("banana")      # removed
fruits.discard("orange")      # no error

print(fruits)
```

Output:

```text
{'apple'}
```

### `remove()` vs `discard()`

| | Present | Absent |
| - | ------- | ------ |
| `.remove(x)` | Removes | **Raises `KeyError`** |
| `.discard(x)` | Removes | Does nothing |

> **Rule** — Use `.discard()` when a missing value is acceptable. Use `.remove()` when it indicates a bug you want surfaced.

### `.pop()`

Removes and returns **an arbitrary** element:

```python
numbers = {10, 20, 30}

item = numbers.pop()

print(item)
print(numbers)
```

Output:

```text
10
{20, 30}
```

> **Warning** — Because sets are unordered, you cannot predict which item `.pop()` returns. Never use it to retrieve a specific value. It raises `KeyError` on an empty set.

### `.clear()`

```python
numbers = {1, 2, 3}
numbers.clear()
print(numbers)          # set()
```

### Avoiding `KeyError`

```python
if "orange" in fruits:
    fruits.remove("orange")
```

Or simply:

```python
fruits.discard("orange")
```

---

## 3. Union

**Union** combines two sets: everything in either one, duplicates counted once.

```python
a = {1, 2, 3}
b = {3, 4, 5}

result = a.union(b)

print(result)
```

Output:

```text
{1, 2, 3, 4, 5}
```

### The `|` operator

```python
print(a | b)
```

Output:

```text
{1, 2, 3, 4, 5}
```

`.union()` and `|` are equivalent. The operator is more concise; the method accepts any iterable:

```python
print(a.union([7, 8]))       # {1, 2, 3, 7, 8}
print(a | [7, 8])            # TypeError — operators need a set
```

### Union does not modify

```python
a = {1, 2}
b = {3, 4}

c = a | b

print(a)      # {1, 2}  unchanged
print(b)      # {3, 4}  unchanged
print(c)      # {1, 2, 3, 4}
```

To modify in place, use `.update()`:

```python
a.update(b)
print(a)      # {1, 2, 3, 4}
```

### Visualising

```text
A = {1, 2, 3}
B = {3, 4, 5}

Union = everything in A, everything in B, counted once
      = {1, 2, 3, 4, 5}
```

---

## 4. Intersection

**Intersection** gives the values present in **both** sets.

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a.intersection(b))
print(a & b)
```

Output:

```text
{3}
{3}
```

### A realistic example

```python
python_devs = {"Mahesh", "Nina", "Rahul"}
web_devs = {"Nina", "Aman"}

print(python_devs & web_devs)
```

Output:

```text
{'Nina'}
```

Nina is the only person in both groups.

### Finding common items between lists

```python
list1 = [1, 2, 3, 4]
list2 = [3, 4, 5, 6]

common = set(list1) & set(list2)

print(common)
```

Output:

```text
{3, 4}
```

### In-place: `intersection_update()`

```python
a = {1, 2, 3}
a.intersection_update({2, 3, 4})

print(a)      # {2, 3}
```

### Visualising

```text
A = {1, 2, 3}
B = {3, 4, 5}

Only 3 appears in both
Intersection = {3}
```

---

## 5. Difference

**Difference** gives values in the first set but **not** in the second.

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a.difference(b))
print(a - b)
```

Output:

```text
{1, 2}
{1, 2}
```

### Order matters

This is asymmetric — unlike union and intersection:

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a - b)
print(b - a)
```

Output:

```text
{1, 2}
{4, 5}
```

```text
A - B  →  1 (only in A), 2 (only in A), 3 (in both → removed)
      =  {1, 2}

B - A  →  4 (only in B), 5 (only in B), 3 (in both → removed)
      =  {4, 5}
```

### In-place: `difference_update()`

```python
a = {1, 2, 3}
a.difference_update({2, 3})

print(a)      # {1}
```

### Symmetric difference

Items in **either** set but **not both**:

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a ^ b)
print(a.symmetric_difference(b))
```

Output:

```text
{1, 2, 4, 5}
{1, 2, 4, 5}
```

Think of it as `(a - b) | (b - a)`, or "union minus intersection".

---

## 6. Removing Duplicates

The most common everyday use of sets.

### Deduplicating a list

```python
numbers = [10, 20, 10, 30, 20, 40, 10]

print(numbers)
print(set(numbers))
```

Output:

```text
[10, 20, 10, 30, 20, 40, 10]
{10, 20, 30, 40}
```

### Back to a list

```python
numbers = [10, 20, 10, 30, 20, 40]

unique = list(set(numbers))

print(unique)
```

Output:

```text
[10, 20, 30, 40]
```

> **Warning** — Converting to a set **loses the original order**. For the small example above the order happens to look preserved, but that is not guaranteed and will differ for other data.

### Preserving order while deduplicating

When order matters, avoid the set round-trip:

```python
numbers = [10, 20, 10, 30, 20]

seen = set()
unique = []

for n in numbers:
    if n not in seen:
        seen.add(n)
        unique.append(n)

print(unique)
```

Output:

```text
[10, 20, 30]
```

This keeps first-appearance order while still using a set for the fast membership test.

> **Note** — Python 3.7+ also offers `dict.fromkeys(numbers)`, which deduplicates and preserves order:
>
> ```python
> unique = list(dict.fromkeys([10, 20, 10, 30, 20]))
> print(unique)      # [10, 20, 30]
> ```

### Counting distinct values

```python
words = ["apple", "banana", "apple", "mango"]

print(len(set(words)))
```

Output:

```text
3
```

---

## 7. Set Relationships

### Subset and superset

```python
a = {1, 2}
b = {1, 2, 3}

print(a.issubset(b))        # True  — a is contained in b
print(a <= b)               # True
print(b.issuperset(a))      # True  — b contains a
print(b >= a)               # True
print(a < b)                # True  — proper subset (not equal)
```

### Disjoint

No elements in common:

```python
a = {1, 2}
b = {3, 4}

print(a.isdisjoint(b))      # True
```

### Quick reference

| Operation | Method | Operator |
| --------- | ------ | -------- |
| Union | `.union()` | `\|` |
| Intersection | `.intersection()` | `&` |
| Difference | `.difference()` | `-` |
| Symmetric difference | `.symmetric_difference()` | `^` |
| Subset | `.issubset()` | `<=` |
| Proper subset | — | `<` |
| Superset | `.issuperset()` | `>=` |
| Proper superset | — | `>` |
| Disjoint | `.isdisjoint()` | — |

> **Caution** — `|`, `&`, `-`, `^` require **sets on both sides**. The named methods accept any iterable.

---

## 8. `frozenset`

A `frozenset` is an **immutable** set.

```python
locked = frozenset([1, 2, 3])

print(locked)
print(type(locked))
```

Output:

```text
frozenset({1, 2, 3})
<class 'frozenset'>
```

It has no `.add()`, `.remove()`, or `.pop()`. Because it is immutable, it is hashable — so it can be an element of another set or a dictionary key:

```python
groups = {frozenset({1, 2}), frozenset({3, 4})}
print(groups)
```

Output:

```text
{frozenset({1, 2}), frozenset({3, 4})}
```

Use a `frozenset` when you need set behaviour but the contents must never change.

---

## Union vs Intersection vs Difference

With `a = {1, 2, 3}` and `b = {3, 4, 5}`:

| Operation | Code | Result | Meaning |
| --------- | ---- | ------ | ------- |
| Union | `a \| b` | `{1, 2, 3, 4, 5}` | Everything |
| Intersection | `a & b` | `{3}` | Common to both |
| Difference | `a - b` | `{1, 2}` | Only in `a` |
| Symmetric diff | `a ^ b` | `{1, 2, 4, 5}` | In one, not both |

```text
Union        → Everything
Intersection → Common
Difference   → Only in the first set
Symmetric    → In exactly one of them
```

---

## Why Sets Are Fast

Membership on a list scans every element; a set uses a hash table and jumps straight to the answer.

```python
big_list = list(range(1_000_000))
big_set = set(big_list)

# 999_999 in big_list   → walks up to a million items
# 999_999 in big_set    → one lookup, instant
```

| Operation | List | Set |
| --------- | ---- | --- |
| `x in s` | O(n) | O(1) |
| Add | O(1) | O(1) |
| Remove by value | O(n) | O(1) |
| Index access | O(1) | Not supported |

> **Rule** — If you check membership repeatedly against a large collection, convert it to a set once, then test against the set.

---

## Common Mistakes to Avoid

| Mistake | What happens | Fix |
| ------- | ------------ | --- |
| `{}` expecting an empty set | Creates a dict | Use `set()` |
| `s[0]` | `TypeError` — sets are not indexed | Iterate or convert to a list |
| Relying on set order | Output order is unpredictable | Sort with `sorted(s)` if order matters |
| `.remove(x)` when absent | `KeyError` | Use `.discard(x)` |
| `set(list)` expecting order preserved | Order is lost | Use `dict.fromkeys()` |
| Putting a list in a set | `TypeError: unhashable` | Use a tuple |
| `{1, 2} & [2, 3]` | `TypeError` | Use `.intersection([2, 3])` |

---

## Quick Revision

| Topic | Example | Purpose |
| ----- | ------- | ------- |
| Creating | `{1, 2, 3}` | Create a set |
| Empty set | `set()` | `{}` is a dict |
| From a list | `set([1, 1, 2])` | `{1, 2}` |
| Add | `.add(4)` | Add one value |
| Add several | `.update([4, 5])` | Add many |
| Remove | `.remove(4)` | Raises if missing |
| Safe remove | `.discard(4)` | Silent if missing |
| Pop | `.pop()` | Remove an arbitrary item |
| Union | `a \| b` | Everything |
| Intersection | `a & b` | Common values |
| Difference | `a - b` | Only in the first |
| Symmetric diff | `a ^ b` | In exactly one |
| Subset | `a <= b` | Contained in |
| Disjoint | `a.isdisjoint(b)` | Nothing in common |
| Dedupe | `set(my_list)` | Unique values |
| Dedupe, keep order | `dict.fromkeys(my_list)` | Order preserved |
| Immutable set | `frozenset(...)` | Unchangeable, hashable |

### Core patterns

```python
numbers = {10, 20, 30}           # create
numbers.add(40)                  # add
numbers.discard(20)              # safe remove
unique = set(my_list)            # deduplicate
ordered = list(dict.fromkeys(my_list))   # dedupe, keep order
common = set(a) & set(b)         # shared items
only_a = set(a) - set(b)         # items in a only
either = set(a) ^ set(b)         # items in exactly one
if name in allowed_names:        # fast membership
    ...
for x in sorted(my_set):         # iterate in a stable order
    print(x)
```

### The main idea

```text
Sets
 ├── Unique values, no order, no indexing
 ├── {} is a dict — use set() for an empty set
 ├── Add:    add() / update()
 ├── Remove: remove() (raises) / discard() (safe) / pop() / clear()
 ├── Compare:
 │    ├── Union              |   → everything
 │    ├── Intersection       &   → common
 │    ├── Difference         -   → only in the first
 │    └── Symmetric diff     ^   → in exactly one
 ├── Relationships:  subset, superset, disjoint
 └── Fast O(1) membership → ideal for lookups and dedup
```

---

## Self-Check

- [ ] Why does `{}` create a dictionary rather than a set?
- [ ] Why can you not write `my_set[0]`?
- [ ] What is the difference between `.remove()` and `.discard()`?
- [ ] Given `a = {1, 2, 3}` and `b = {3, 4, 5}`, what are `a | b`, `a & b`, `a - b`, and `a ^ b`?
- [ ] Why is `a - b` different from `b - a`?
- [ ] How do you remove duplicates from a list while keeping the original order?
- [ ] Why is `x in my_set` faster than `x in my_list`?
- [ ] What is a `frozenset`, and when would you use one?
