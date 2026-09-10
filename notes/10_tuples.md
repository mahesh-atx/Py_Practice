# Tuples

> A tuple is like a list, but **immutable** — once created, it can't change. Use it for fixed collections (coordinates, RGB colors, a row of data). Keep this one simple.

---

## 1. Creating Tuples

```python
point = (3, 5)
days = ("Mon", "Tue", "Wed")
single = (42,)          # ⚠️ comma needed for a one-item tuple
empty = ()

print(type(single))     # <class 'tuple'>
print(len(days))        # 3
```

Without the comma, `(42)` is just an int in parentheses — a classic trap.

---

## 2. Indexing and Slicing

Same as lists:

```python
days = ("Mon", "Tue", "Wed")
print(days[0])       # Mon
print(days[-1])      # Wed
print(days[0:2])     # ('Mon', 'Tue')
```

But **no modification**:

```python
days[0] = "Sun"      # ❌ TypeError: tuple does not support item assignment
```

---

## 3. Unpacking — the best part of tuples

Extract values into separate variables in one line:

```python
point = (3, 5)
x, y = point
print(x, y)          # 3 5

# swap trick (this is actually tuple unpacking under the hood!)
a, b = 1, 2
a, b = b, a
```

Sometimes you only care about the first few values and want to throw the rest into one list. A `*` before a variable name means "collect everything left over":

```python
scores = (90, 85, 78, 92, 88)
first, second, *others = scores
print(first)         # 90
print(others)        # [78, 92, 88]
```

You've already used this with `enumerate()` — each loop round produces a small tuple `(index, item)`, and unpacking splits it into two variables. That's the whole trick:

```python
for i, value in enumerate(["a", "b"]):
    print(i, value)
```

---

## 4. Tuple Methods

Tuples have only two methods (because they can't be changed):

```python
t = (1, 2, 2, 3, 2)
print(t.count(2))      # 3  → how many times 2 appears
print(t.index(3))      # 3  → index of first 3
```

Everything that just *looks* at the data still works fine — the only thing you can't do is change it:

```python
for item in (10, 20, 30):
    print(item)

print(20 in (10, 20, 30))     # True
```

---

## 5. Tuple vs List — When to Use Which?

| | List | Tuple |
|---|---|---|
| Syntax | `[1, 2, 3]` | `(1, 2, 3)` |
| Changeable? | ✅ Yes | ❌ No |
| Use for | Collections that grow/change | Fixed data, records, coordinates |
| Speed | Slightly slower | Slightly faster |

**Simple rule:** if the data shouldn't change, use a tuple. Otherwise, use a list.

Here's a nice connection: when a function returns several values separated by commas, Python actually packs them into a tuple automatically. That's why you can unpack a function's return value directly:

```python
def min_max(nums):
    return min(nums), max(nums)      # returns a tuple

lo, hi = min_max([4, 1, 9, 2])
print(lo, hi)     # 1 9
```

---

## Quick Revision

- Tuple = ordered, **immutable** collection: `(1, 2, 3)`.
- One-item tuple needs a trailing comma: `(42,)`.
- Index/slice like lists, but assignment fails.
- **Unpacking**: `x, y = point`, plus `*rest` for leftovers.
- Only two methods: `.count()` and `.index()`.
- Use tuples for fixed data; lists for changing data.

✅ Next → **11-sets.md**
