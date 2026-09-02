# Python Object-Oriented Programming — Notes

Object-Oriented Programming, or **OOP**, is a way of organizing code using **classes and objects**.

A simple way to think about it:

```text
Class  → Blueprint
Object → Real thing created from the blueprint
```

For example, a `Student` class can describe what a student has and what a student can do.

---

# 1. Classes

A **class** is a blueprint for creating objects.

You create a class using the `class` keyword.

### Basic syntax

```python
class ClassName:
    # code
```

Example:

```python
class Student:
    pass
```

Here, `Student` is a class.

A class can contain variables and methods.

Example:

```python
class Student:
    name = "Mahesh"
    age = 24
```

The class describes what a `Student` can have.

---

# 2. Objects

An **object** is an instance of a class.

You create an object by calling the class:

```python
class Student:
    name = "Mahesh"

student1 = Student()
```

Here:

```text
Student  → Class
student1 → Object
```

You can access data using the object:

```python
print(student1.name)
```

Output:

```text
Mahesh
```

### Multiple objects

You can create many objects from the same class:

```python
class Student:
    name = "Mahesh"

student1 = Student()
student2 = Student()
```

Both objects are created from the same `Student` class.

The main idea is:

```text
Class
  ↓
Create object
  ↓
Object
```

---

# 3. `__init__`

`__init__` is a special method that runs **automatically when an object is created**.

It is commonly used to give an object its starting values.

Example:

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Now create an object:

```python
student1 = Student("Mahesh", 24)
```

When this line runs, Python automatically calls:

```python
__init__()
```

The values are stored in the object.

You can access them:

```python
print(student1.name)
print(student1.age)
```

Output:

```text
Mahesh
24
```

### Why `__init__` is useful

Without `__init__`, you would need to set values separately:

```python
student1.name = "Mahesh"
student1.age = 24
```

With `__init__`:

```python
student1 = Student("Mahesh", 24)
```

The starting values are set when the object is created.

---

# 4. Instance Variables

Instance variables are variables that belong to a **specific object**.

They are usually created inside `__init__` using `self`.

Example:

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Here:

```python
self.name
self.age
```

are instance variables.

Create two objects:

```python
student1 = Student("Mahesh", 24)
student2 = Student("Rahul", 23)
```

Now:

```text
student1
name → Mahesh
age  → 24

student2
name → Rahul
age  → 23
```

Each object has its own values.

### Changing an instance variable

```python
student1.age = 25

print(student1.age)
```

Output:

```text
25
```

The other object is not changed:

```python
print(student2.age)
```

Output:

```text
23
```

This is because the values belong to different objects.

---

# 5. Methods

A **method** is a function that is defined inside a class.

Example:

```python
class Student:

    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Hello, {self.name}!")
```

Create an object:

```python
student1 = Student("Mahesh")
```

Call the method:

```python
student1.greet()
```

Output:

```text
Hello, Mahesh!
```

### `self`

`self` refers to the **current object**.

Example:

```python
class Student:

    def __init__(self, name):
        self.name = name

    def show_name(self):
        print(self.name)
```

When you write:

```python
student1.show_name()
```

`self` refers to `student1`.

So:

```python
self.name
```

means:

```text
student1.name
```

### Method with parameters

Methods can receive additional parameters:

```python
class Calculator:

    def add(self, a, b):
        return a + b
```

Create an object:

```python
calc = Calculator()

print(calc.add(10, 20))
```

Output:

```text
30
```

---

# 6. Inheritance

Inheritance allows one class to **use the features of another class**.

The class being inherited from is called the parent class.

The new class is called the child class.

### Basic syntax

```python
class Child(Parent):
    # code
```

Example:

```python
class Animal:

    def eat(self):
        print("Eating")


class Dog(Animal):

    def bark(self):
        print("Barking")
```

Create a `Dog` object:

```python
dog = Dog()
```

The dog can use its own method:

```python
dog.bark()
```

Output:

```text
Barking
```

It can also use the method inherited from `Animal`:

```python
dog.eat()
```

Output:

```text
Eating
```

So:

```text
Animal
  │
  └── Dog
```

`Dog` gets the methods of `Animal`.

### Why inheritance is useful

It lets you **reuse code**.

Instead of writing the same method again in every class, you can put common behavior in a parent class.

---

# 7. Encapsulation

Encapsulation means **keeping data and the methods that work with that data together inside a class**.

It also means controlling how the data is accessed.

Example:

```python
class BankAccount:

    def __init__(self, balance):
        self.__balance = balance

    def get_balance(self):
        return self.__balance
```

Here:

```python
self.__balance
```

uses `__` before the variable name.

This is used to make the variable **less directly accessible from outside the class**.

You can use a method to access it:

```python
account = BankAccount(5000)

print(account.get_balance())
```

Output:

```text
5000
```

The main idea:

```text
Outside
   ↓
Method
   ↓
Data inside object
```

Instead of directly working with the internal data, the class provides methods to control access.

### Simple example

```python
class Person:

    def __init__(self, name):
        self.__name = name

    def show_name(self):
        print(self.__name)
```

Now:

```python
person = Person("Mahesh")

person.show_name()
```

Output:

```text
Mahesh
```

Encapsulation helps keep the inside of a class organized and controlled.

---

# 8. Polymorphism

Polymorphism means **the same method name can behave differently for different objects**.

Example:

```python
class Dog:

    def sound(self):
        print("Bark")


class Cat:

    def sound(self):
        print("Meow")
```

Both classes have:

```python
sound()
```

But they behave differently.

```python
dog = Dog()
cat = Cat()

dog.sound()
cat.sound()
```

Output:

```text
Bark
Meow
```

The same method name:

```text
sound()
```

does different things depending on the object.

### Another example

```python
class Dog:

    def sound(self):
        return "Bark"


class Cat:

    def sound(self):
        return "Meow"


animals = [Dog(), Cat()]

for animal in animals:
    print(animal.sound())
```

Output:

```text
Bark
Meow
```

The loop does not need to know whether the object is a `Dog` or `Cat`. It simply calls:

```python
animal.sound()
```

Each object provides its own behavior.

---

# Complete OOP Example

Here is a small example combining several concepts:

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"My name is {self.name} and I am {self.age} years old.")


student1 = Student("Mahesh", 24)
student2 = Student("Rahul", 23)

student1.introduce()
student2.introduce()
```

Output:

```text
My name is Mahesh and I am 24 years old.
My name is Rahul and I am 23 years old.
```

Here:

```text
Student
   ↓
Class

student1, student2
   ↓
Objects

__init__()
   ↓
Sets starting values

self.name, self.age
   ↓
Instance variables

introduce()
   ↓
Method
```

---

# Quick Revision

| Topic              | Main idea                                                     |
| ------------------ | ------------------------------------------------------------- |
| Class              | Blueprint for creating objects                                |
| Object             | Instance of a class                                           |
| `__init__`         | Runs automatically when an object is created                  |
| Instance variables | Data belonging to each object                                 |
| Methods            | Functions inside a class                                      |
| Inheritance        | Child class gets features from parent class                   |
| Encapsulation      | Keep data and behavior together and control access            |
| Polymorphism       | Same method name can behave differently for different objects |

### Core structure

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"{self.name} is {self.age} years old.")


student = Student("Mahesh", 24)

student.introduce()
```

The main mental model is:

```text
Class
  ↓
Blueprint
  ↓
Object
  ↓
Instance variables + Methods
```

And the four main OOP ideas are:

```text
Inheritance   → Reuse from another class
Encapsulation → Control and group data
Polymorphism  → Same interface, different behavior
```
