# Sets

> A set is an **unordered collection of unique items**. Its superpowers: removing duplicates and doing math-like operations (union, intersection, difference). Keep this one fairly light.

---

## 1. Creating Sets

```python
colors = {"red", "green", "blue"}
nums = {1, 2, 3, 3, 3}
print(nums)           # {1, 2, 3} — duplicates removed automatically!

empty_set = set()     # ⚠️ NOT {} — that's an empty dict!
```

Sets are **unordered** (no indexing: `colors[0]` ❌) and contain only unique values.

---

## 2. Adding / Removing Values

Sets change with `.add()` and `.remove()` — but there's no "insert at position" because sets have no positions (no order). Adding something that already exists is silently ignored; that's the whole point of sets.

```python
s = {1, 2, 3}

s.add(4)              # {1, 2, 3, 4}
s.add(2)              # nothing happens — 2 already exists

s.remove(3)           # ❌ KeyError if 3 is missing
s.discard(99)         # ✅ safe — no error if missing

item = s.pop()        # removes an arbitrary item (unordered!)
s.clear()             # empty the set
```

Prefer `discard()` when the item might not be there.

---

## 3. Set Operations

These come straight from math class (Venn diagrams). Imagine two overlapping circles and ask: what's in either one, what's in the overlap, what's only in the first? Let's use these two sets for all examples:

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
```

### Union — everything from both

Combine both sets into one. Duplicates appear only once (sets can't have duplicates anyway). Each operation has a symbol version (`|`) and a method version (`.union()`) — same result, pick whichever reads better.

```python
print(a | b)              # {1, 2, 3, 4, 5, 6}
print(a.union(b))         # same
```

### Intersection — only common items

Only the items that exist in **both** sets — the overlapping middle of the Venn diagram. Extremely useful: "which friends do these two lists have in common?"

```python
print(a & b)              # {3, 4}
print(a.intersection(b))
```

### Difference — in a but NOT in b

"Give me what's in the first set, minus anything the second set also has." Note that order matters here, unlike union and intersection:

```python
print(a - b)              # {1, 2}
print(a.difference(b))    # order matters: b - a → {5, 6}
```

### Other useful checks

Three yes/no questions about the relationship between two sets:

```python
{1, 2}.issubset({1, 2, 3})       # True
{1, 2, 3}.issuperset({1})        # True
{1, 2}.isdisjoint({3, 4})        # True (nothing in common)
```

---

## 4. Removing Duplicates — the top practical use

```python
nums = [1, 2, 2, 3, 3, 3, 4]
unique = list(set(nums))
print(unique)           # [1, 2, 3, 4]  (order may vary!)
```

⚠️ Since sets are unordered, the result's order isn't guaranteed. To preserve order:

```python
unique = list(dict.fromkeys(nums))    # keeps first-occurrence order
```

Real-world example — unique emails from a list with repeats:

```python
emails = ["a@x.com", "b@x.com", "a@x.com"]
print(set(emails))      # {'a@x.com', 'b@x.com'}
```

---

## Quick Revision

- Set: `{1, 2, 3}` — unordered, unique items only; empty set is `set()`.
- `add()`, `remove()` (errors if missing), `discard()` (safe).
- Union `|`, intersection `&`, difference `-`.
- Remove duplicates: `list(set(my_list))`.

### Practice
1. Find common friends between two friend lists using intersection.
2. Take a sentence and count how many unique words it has.

✅ Next → **12-dictionaries.md**
