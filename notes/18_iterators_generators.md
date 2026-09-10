# Iterators & Generators

> You've used iterators all along without knowing it — **every `for` loop is one**. Here you learn what they really are, and their super-powered cousin, the **generator**, which can produce huge (even infinite) sequences while using almost no memory. This is an intermediate topic — go step by step.

---

## 1. Iterables vs Iterators

Two words that sound the same but mean different things:

- **Iterable** — anything you can loop over: list, string, dict, range. It can *hand you* an iterator.
- **Iterator** — the object that actually keeps track of "where am I" and produces the **next** value on demand.

The protocol is two functions: `iter()` gets an iterator from an iterable, and `next()` asks it for the next value.

```python
nums = [10, 20, 30]          # iterable
it = iter(nums)              # get an iterator from it

print(next(it))              # 10
print(next(it))              # 20
print(next(it))              # 30
print(next(it))              # ❌ StopIteration — nothing left!
```

When the iterator runs out of items it raises `StopIteration` — that's not a bug, that's the signal meaning "done".

---

## 2. How for Loops Actually Work

A `for` loop is just sugar over exactly that process: get an iterator, keep calling `next()` until `StopIteration`, and silently stop. This code:

```python
for x in [10, 20, 30]:
    print(x)
```

is roughly equivalent to:

```python
it = iter([10, 20, 30])
while True:
    try:
        x = next(it)
    except StopIteration:
        break
    print(x)
```

This also explains a subtle difference you may have noticed:

```python
nums = [1, 2]
for n in nums: pass
for n in nums: print(n)   # works again — a list gives a FRESH iterator every time

it = iter(nums)
print(list(it))           # [1, 2] — consumed
print(list(it))           # []  — an iterator is one-shot; it's exhausted
```

**Rule:** an *iterable* can be looped forever; an *iterator* can only be consumed once.

---

## 3. Generators — iterators you can write easily

Building a proper iterator by hand needs a class and bookkeeping. A **generator function** gives you an iterator for free: write an ordinary function, but replace `return` with `yield`.

```python
def countdown(n):
    while n > 0:
        yield n        # produce a value, then PAUSE right here
        n -= 1

for num in countdown(3):
    print(num)         # 3, then 2, then 1
```

---

## 4. yield vs return — the key idea

- `return` sends a value back and **ends** the function forever.
- `yield` sends a value back but **pauses** the function. All its local variables stay alive, and the next `next()` call resumes exactly where it paused.

Watch the prints to see the pausing:

```python
def gen():
    print("start")
    yield 1
    print("middle")
    yield 2
    print("end")

g = gen()          # nothing prints yet! the body hasn't run
print(next(g))     # prints "start", gives 1
print(next(g))     # prints "middle", gives 2
print(next(g))     # prints "end", then StopIteration
```

Notice: calling `gen()` didn't run the body — it gave you a generator object. Work happens only when values are requested. This is called **lazy evaluation**, and it's the whole point.

---

## 5. Why Generators Matter: Memory

A list of a million numbers keeps all million in memory at once. A generator produces them one at a time and forgets each one immediately — memory stays tiny no matter the size.

```python
# heavy: a million numbers stored at once
big_list = [x * x for x in range(1_000_000)]     # list comprehension

# light: values produced one at a time
big_gen = (x * x for x in range(1_000_000))      # generator expression (parens!)
```

The only difference is brackets `[ ]` vs parentheses `( )`. **Anywhere you'd write a list comprehension but only need to loop over the result once, use a generator expression** — same syntax, far cheaper.

Built-in functions accept generators directly:

```python
print(sum(x * x for x in range(10)))    # 285 — no list ever created
```

---

## 6. Real Examples

### An infinite sequence — Fibonacci

```python
def fibonacci():
    a, b = 0, 1
    while True:            # infinite loop... but that's fine!
        yield a
        a, b = b, a + b

for i, num in enumerate(fibonacci()):
    if i == 10:
        break
    print(num, end=" ")    # 0 1 1 2 3 5 8 13 21 34
```

An infinite sequence in constant memory — impossible with a list, natural with a generator. You decide how many you want; the generator produces on demand.

### Processing in batches

A pattern you'll really use — split any stream into chunks:

```python
def batches(items, size=3):
    batch = []
    for item in items:
        batch.append(item)
        if len(batch) == size:
            yield batch        # hand over a full batch
            batch = []
    if batch:                  # don't forget the leftover
        yield batch

for group in batches([1, 2, 3, 4, 5, 6, 7], 3):
    print(group)
# [1, 2, 3]
# [4, 5, 6]
# [7]
```

### Reading a huge file without loading it

```python
def non_empty_lines(path):
    with open(path) as f:
        for line in f:               # files are already lazy iterators!
            line = line.strip()
            if line:
                yield line

for line in non_empty_lines("big_log.txt"):
    ...  # process one line at a time, however big the file is
```

---

## Quick Revision

- **Iterable** = loopable thing; **iterator** = one-shot "next value" machine. Get one with `iter()`, pull values with `next()`.
- `for` loops are just `iter()` + `next()` + catching `StopIteration`.
- **Generator:** a function using `yield` — pauses and resumes, producing values lazily.
- `yield` pauses; `return` ends.
- Generator expressions `(x for x in ...)` = list comprehensions without the memory cost.
- Use generators for large/infinite data, batching, and streaming file processing.

### Practice
1. Write a generator `evens(n)` that yields the first n even numbers.
2. Build `fibonacci()` and print the first value over 1000.
3. Use a generator expression to find the sum of squares of 1–1,000,000 and notice how fast it starts.

✅ Next → **20-decorators.md**
