# Regular Expressions (Regex)

> Regular expressions are a mini-language for describing **patterns in text** — "a 10-digit phone number", "anything that looks like an email", "all prices in ₹". Python's `re` module lets you search, extract, and replace using those patterns. You don't need to master all of regex — just the core pieces you'll actually use.

---

## 1. Setup — the re Module and Raw Strings

```python
import re
```

**Always write patterns as raw strings** — `r"\d+"` instead of `"\d+"`. Raw strings pass backslashes through untouched; without the `r`, Python's own string escaping gets in the way and you'd need double backslashes everywhere.

We'll use this one text for all examples:

```python
text = "Order 3 items: pencil ₹10, pen ₹5, eraser ₹8. Call 9876543210 for help."
```

---

## 2. The 4 Functions You'll Actually Use

### re.search() — find the FIRST match anywhere

Returns a **match object** (or `None` if nothing matched):

```python
m = re.search(r"\d+", text)      # \d = digit, + = one or more
print(m.group())                 # '3' — the matched text
print(m.start())                 # 6  — where it starts
```

Since it can return `None`, check before using:

```python
m = re.search(r"cat", text)
if m is None:
    print("not found")
```

### re.findall() — ALL matches, as a list

No match objects — just the strings. The workhorse for extraction:

```python
prices = re.findall(r"₹(\d+)", text)
print(prices)                    # ['10', '5', '8']

numbers = re.findall(r"\d+", text)
print(numbers)                   # ['3', '10', '5', '8', '9876543210']
```

### re.sub() — replace by pattern

Like `str.replace()`, but the "what to find" is a pattern:

```python
print(re.sub(r"\d+", "X", text))
# 'Order X items: pencil ₹X, pen ₹X, eraser ₹X. Call X for help.'

print(re.sub(r"Call \d+ for help", "Contact support", text))
# 'Order 3 items: pencil ₹10, pen ₹5, eraser ₹8. Contact support.'
```

### re.match() — only at the START of the string

```python
re.match(r"Order", text)     # ✅ match — text starts with "Order"
re.match(r"pencil", text)    # None — pencil is not at the start
```

Most of the time you want `search` (or `findall`), not `match`.

---

## 3. The Pattern Alphabet — Symbols to Learn

**Character classes** (match one character each):

| Pattern | Matches | Example |
|---------|---------|---------|
| `\d` | any digit | `7` in `"abc7"` |
| `\w` | letter, digit, or `_` | `name_1` |
| `\s` | any whitespace (space, tab, newline) | |
| `.` | any character except newline | |
| `[abc]` | any ONE of these characters | `a`, `b` or `c` |
| `[0-9]` | any digit (same as `\d`) | |
| `[^aeiou]` | anything EXCEPT these | |
| `^` | start of the string | |
| `$` | end of the string | |

**Quantifiers** (how many of the previous thing):

| Pattern | Meaning | Example matches |
|---------|---------|-----------------|
| `*` | 0 or more | `ab*c` → `ac`, `abc`, `abbbc` |
| `+` | 1 or more | `ab+c` → `abc`, `abbc` (not `ac`) |
| `?` | 0 or 1 (optional) | `colou?r` → `color`, `colour` |
| `{3}` | exactly 3 | `\d{3}` → `123` |
| `{2,4}` | between 2 and 4 | |
| `{2,}` | 2 or more | |

Combine them freely: `\d+` = "a run of digits", `[a-z]+` = "a lowercase word".

---

## 4. Real-World Examples

### Extract Indian mobile numbers

```python
text = "Reach Ravi at 9876543210 or the office at 020-1234567."

# digits, first digit 6-9 (Indian mobile rule), word boundaries \b on both sides
phones = re.findall(r"\b[6-9]\d{9}\b", text)
print(phones)          # ['9876543210']
```

`\b` = word boundary — it stops us matching the last 10 digits of a longer number.

### Check something looks like an email

```python
pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

print(bool(re.match(pattern, "ravi@gmail.com")))    # True
print(bool(re.match(pattern, "not-an-email")))      # False
```

Reading it: some allowed characters, then `@`, then a domain name, then a dot and 2+ letters, and `^...$` anchors it to the *whole* string.

### Groups — capture pieces separately

Parentheses capture parts of the match. `group(1)` is the 1st pair, `group(2)` the 2nd:

```python
email = "ravi.kumar@gmail.com"

m = re.search(r"(.+)@(.+)", email)
print(m.group(1))      # ravi.kumar   (username)
print(m.group(2))      # gmail.com    (domain)

# with findall, groups come back as tuples:
print(re.findall(r"(\w+) ₹(\d+)", text))
# [('pencil', '10'), ('pen', '5'), ('eraser', '8')]
```

That last one is genuinely powerful — text turned into structured data in one line.

---

## 5. When NOT to Use Regex

Regex is for **patterns**. For plain literal work, string methods are faster to write and read:

```python
"₹" in text                    # instead of re.search(r"₹", ...)
text.startswith("Order")       # instead of re.match(r"Order", ...)
" a b c ".split()              # instead of re.split(r"\s+", ...)
text.replace("pencil", "pen")  # instead of re.sub(...)
```

**Rule of thumb:** if the thing you're searching for is a fixed string, use string methods. Reach for regex only when there's a pattern (digits, positions, alternatives).

---

## Quick Revision

- `import re`; always write patterns as raw strings `r"..."`.
- `search` (first match), `findall` (all matches), `sub` (replace), `match` (start only).
- Learn these 12 first: `\d \w \s . [ ] ^ $ * + ? {n}`.
- `\b` = word boundary; `( )` = capture group → `group(1)`, or tuples from `findall`.
- Prefer plain string methods for literal searches.

### Practice
1. Extract all numbers from `"There are 3 cats and 12 dogs"`.
2. Find all words starting with a capital letter: `r"\b[A-Z]\w*"`.
3. Mask all phone numbers in a text with `XXXXX` using `re.sub`.
4. Write a pattern that matches dates like `05-09-2026` (`\d{2}-\d{2}-\d{4}`).

✅ Next → **22-json.md**
