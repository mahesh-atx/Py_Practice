# Comprehensions

> Comprehensions build a list/dict/set **in one clean line** instead of a loop + `.append()`. They're a signature Python feature — learn to read and write them.

---

## 1. List Comprehension

The classic loop way to build a list:

```python
squares = []
for x in range(1, 6):
    squares.append(x * x)
```

Same thing as a comprehension:

```python
squares = [x * x for x in range(1, 6)]
print(squares)      # [1, 4, 9, 16, 25]
```

Read it as: *"for each x in range, give me x*x"* — put the result expression **first**.

```
[ expression  for item in iterable ]
```

More examples:

```python
names = ["ravi", "asha", "kiran"]
upper = [n.upper() for n in names]          # ['RAVI', 'ASHA', 'KIRAN']

lengths = [len(n) for n in names]           # [4, 4, 5]

# transform strings to ints (e.g., cleaning input):
raw = ["10", "20", "30"]
nums = [int(x) for x in raw]                # [10, 20, 30]
```

---

## 2. Conditions Inside Comprehensions

**Filter** — keep only items that pass a test (condition goes at the **end**):

```python
nums = [1, 2, 3, 4, 5, 6]
evens = [n for n in nums if n % 2 == 0]
print(evens)        # [2, 4, 6]
```

**Transform based on condition** — if/else goes at the **front** (like a ternary):

```python
labels = ["even" if n % 2 == 0 else "odd" for n in nums]
# ['odd', 'even', 'odd', 'even', 'odd', 'even']
```

The two positions look similar but mean different things:
```
[n for n in nums if n > 2]                    # filter: which items to keep
[n if n > 0 else 0 for n in nums]             # transform: change each value
```

---

## 3. Dictionary Comprehension

Same idea, with `key: value`:

```python
squares = {x: x * x for x in range(1, 6)}
print(squares)      # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# flip a dictionary (swap keys and values)
ages = {"Ravi": 21, "Asha": 19}
flipped = {v: k for k, v in ages.items()}
# {21: 'Ravi', 19: 'Asha'}

# with condition:
marks = {"math": 85, "sci": 45, "eng": 92}
passed = {sub: m for sub, m in marks.items() if m >= 50}
# {'math': 85, 'eng': 92}
```

---

## 4. Set Comprehension

Works exactly the same; duplicates collapse automatically:

```python
words = ["apple", "banana", "apple", "mango"]
unique_lengths = {len(w) for w in words}
print(unique_lengths)     # {5, 6, 5} → {5, 6}
```

---

## 5. When NOT to Use Comprehensions

They're for **building collections**. If you're just doing a side effect (printing, writing), use a normal loop:

```python
# ❌ Don't do this
[print(x) for x in range(5)]

# ✅ Just loop
for x in range(5):
    print(x)
```

Also avoid deeply nested comprehensions — if it needs a second to read, split it into a loop. Clarity beats cleverness.

---

## Quick Revision

- `[expr for x in iterable]` builds a list in one line.
- Filter with a trailing `if`: `[x for x in nums if x > 0]`.
- Ternary style goes first: `["even" if x % 2 == 0 else "odd" for x in nums]`.
- Dict: `{k: v for ...}`, Set: `{expr for ...}`.
- Use loops for side effects and complex logic; comprehensions for clean collection-building.

### Practice
1. Build a list of squares of even numbers from 1–20.
2. From `["  Ravi ", "asha", " KIRAN "]` build a cleaned, uppercased list.
3. From a marks dict, build a dict of only failed subjects (< 50) with a "FAIL" tag.

✅ Next → **15-exception-handling.md**
