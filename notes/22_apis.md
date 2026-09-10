# Working with APIs

> This is where Python starts doing **real things**: pulling live data from servers across the internet — weather, news, prices, anything with an API. Everything you've learned connects here: **pip + venv** to install the library (file 17), **JSON** to read the responses (file 22), and **requests** to make it happen.

---

## 1. Setup — Install `requests` in a Virtual Environment

`requests` is third-party, so install it with pip — inside a venv, one per project (full details in **17-modules-and-packages.md**):

```bash
python -m venv .venv

# Windows: .venv\Scripts\activate     macOS/Linux: source .venv/bin/activate

pip install requests
```

Then in your code:

```python
import requests
```

---

## 2. What Is an API?

An **API** (Application Programming Interface) is how programs talk to each other over the internet. Think of a **restaurant**:

- **You** = your program (the *client*)
- **The kitchen** = a server holding data (weather, users, prices...)
- **The waiter** = the API — carries your request to the kitchen and brings the response back

You don't walk into the kitchen; you order from the menu through the waiter. Same here: you request a specific **URL** (called an **endpoint**) and get an answer back — almost always **JSON**.

---

## 3. The Main HTTP Methods

| Method | Meaning | Example |
|--------|---------|---------|
| `GET` | fetch data (read-only) | get today's weather |
| `POST` | send/create data | submit a signup form |
| `PUT` / `PATCH` | update existing data | edit your profile |
| `DELETE` | remove data | delete a post |

While learning you'll spend 90% of your time on `GET`.

---

## 4. Status Codes — the API's Answer in One Number

Every response carries a code. Check it before trusting the data:

| Code | Meaning |
|------|---------|
| `200` | OK — success ✅ |
| `201` | Created (after a POST) |
| `400` | Bad request — you sent something wrong |
| `401` / `403` | Not allowed / not authenticated |
| `404` | Not found — wrong endpoint |
| `500` | Server error — their problem, not yours |

**Rule of thumb:** codes starting with `2` = good, `4` = your mistake, `5` = their mistake.

---

## 5. Your First GET Request — Real Live Data, No API Key

We'll use **Open-Meteo**, a free weather API that needs no signup:

```python
import requests

url = "https://api.open-meteo.com/v1/forecast"
params = {
    "latitude": 18.52,        # Pune
    "longitude": 73.86,
    "current_weather": "true",
}

response = requests.get(url, params=params)
print(response.status_code)   # 200 → all good

data = response.json()        # parse the JSON body straight into a dict!
print(data)
```

**Three lines to remember:**
1. `requests.get(url)` → sends the request, returns a `Response` object.
2. `response.status_code` → the number; check it first.
3. `response.json()` → the JSON body, already converted to Python dicts/lists (it runs `json.loads` for you).

`params` becomes the `?latitude=18.52&longitude=73.86` part of the URL — much cleaner than building the URL string yourself.

### Digging into the response

The response is nested JSON, so use the **chain trick** from file 22 — one bracket per level:

```python
weather = data["current_weather"]

print("Temperature:", weather["temperature"], "°C")
print("Wind speed:", weather["windspeed"], "km/h")
```

---

## 6. Sending Data with POST

For practice, **JSONPlaceholder** is a fake API that accepts anything and echoes it back — perfect for experimenting:

```python
import requests

new_post = {
    "title": "Learning APIs",
    "body": "My first POST request!",
    "userId": 1,
}

response = requests.post("https://jsonplaceholder.typicode.com/posts", json=new_post)
print(response.status_code)       # 201 → created
print(response.json())            # your data + a new "id" field
```

Notice `json=new_post` — `requests` converts your dict to JSON automatically and sets the right headers.

---

## 7. Handling Failures Properly

The internet is unreliable — servers go down, networks drop. Real code expects trouble:

```python
import requests

try:
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()          # raises an error for 4xx/5xx codes
except requests.exceptions.Timeout:
    print("The server took too long to respond")
except requests.exceptions.ConnectionError:
    print("No internet connection?")
except requests.exceptions.HTTPError as e:
    print("HTTP problem:", e)
else:
    data = response.json()
```

Three habits that separate real code from toy code:
- **`timeout=10`** — never wait forever for a dead server. Always set a timeout.
- **`raise_for_status()`** — turns bad status codes (404, 500...) into exceptions you can catch.
- **`try/except`** around anything network-related.

---

## 8. Mini Project — Weather Checker

Everything from this roadmap section, combined into one useful script:

```python
import requests

def get_weather(city_name, lat, lon):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {"latitude": lat, "longitude": lon, "current_weather": "true"}

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Could not fetch weather: {e}")
        return

    w = response.json()["current_weather"]
    print(f"Weather in {city_name}:")
    print(f"  Temperature: {w['temperature']}°C")
    print(f"  Wind speed:  {w['windspeed']} km/h")

get_weather("Pune", 18.52, 73.86)
get_weather("Mumbai", 19.08, 72.88)
```

You just built a program that talks to a live server across the world and makes sense of its answer. That's a real milestone. 🎉

---

## Quick Revision

- An **API** is a program-to-program conversation: you request an **endpoint**, you get a response (usually JSON).
- `GET` fetches, `POST` creates; status `2xx` good, `4xx` your bug, `5xx` their bug.
- Install `requests` in a venv → `requests.get(url, params=...)`.
- `response.status_code`, then `response.json()` → Python dicts.
- POST data with `json=your_dict`.
- Always: `timeout=`, `raise_for_status()`, and `try/except`.

### Practice
1. Modify the weather script to ask the user for latitude/longitude.
2. `GET https://jsonplaceholder.typicode.com/users` and print every user's name and email.
3. Fetch `https://jsonplaceholder.typicode.com/posts` and count how many posts belong to `userId` 1.
4. Save a weather response to a `.json` file using `json.dump` (file 16).

🎉 **That's the entire roadmap — from `print("Hello")` to talking to live APIs.** Now build something: a weather dashboard, a news fetcher, a quiz app. Projects teach what notes can't.
