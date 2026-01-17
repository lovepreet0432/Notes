First: What is a Prototype?

In JavaScript, every object has a hidden property called:
[[Prototype]]  →  __proto__

This is simply a link to another object.
👉 When you try to access a property:

JS looks on the object itself
If not found → looks on its prototype
Continues up the chain
Stops at null
This lookup path is called the Prototype Chain.

Simple example
const user = {
  name: "Lovepreet"
};

console.log(user.toString());

👉 toString() is NOT in user
👉 It exists in Object.prototype
👉 That’s prototype lookup in action

__proto__ vs prototype (VERY IMPORTANT)

This confuses almost everyone.

__proto__
Exists on every object
Points to its prototype

user.__proto__ === Object.prototype // true

prototype
Exists only on constructor functions / classes
Used when creating objects via new

function Person() {}
Person.prototype.sayHi = function () {
  console.log("Hi");
};

How objects get a prototype
Using new
function Person(name) {
  this.name = name;
}

const p1 = new Person("Aman");

JS does this internally:

Creates empty object {}

Sets p1.__proto__ = Person.prototype

Calls Person() with this = p1

Prototype in action
Person.prototype.greet = function () {
  console.log("Hello " + this.name);
};

p1.greet(); // Hello Aman


greet is NOT inside p1

It’s shared via the prototype
Saves memory ✔️

Prototype Chain (visual)
p1
 ↓
Person.prototype
 ↓
Object.prototype
 ↓
null

🔥 Inheritance (Modern class)

Inheritance means:

One object can access properties/methods of another object

class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Dog barks");
  }
}

const d = new Dog();
d.speak();
d.bark();


🧠 class is just syntactic sugar over prototypes.

🏆 Interview Lines

JS uses prototype-based inheritance
Methods are shared via prototype
class ≠ classical inheritance internally

------------------------------------------------------------------


2️⃣ Debouncing vs Throttling (🔥 Very Common)
🔹 Debouncing

👉 Execute function after user stops triggering

Example: Search input
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


📌 Use cases:
    Search box
    Resize events
    Auto-save

🔹 Throttling
👉 Execute function at most once in given interval

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

Usage
const throttledScroll = throttle(handleScroll, 300);

window.addEventListener("scroll", throttledScroll);

function throttle(fn, limit) {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;
    fn(...args);
    setTimeout(() => flag = true, limit);
  };
}

📌 Use cases:
    Scroll events
    Button clicks
    Mouse move


- Debounce delays execution, throttle limits execution.


--------------------------------------------------------------------

3️⃣ Shallow Copy vs Deep Copy
🔹 Shallow Copy
👉 Copies reference for nested objects.

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 };

obj2.b.c = 5;
console.log(obj1.b.c); // 5 😵


📌 Methods:

Spread (...)

Object.assign

🔹 Deep Copy

👉 Copies entire structure

Option 1 (Simple but limited)
const deep = JSON.parse(JSON.stringify(obj));

❌ Loses:
functions
dates
undefined

Option 2 (Best)
const deep = structuredClone(obj);

🏆 Interview Line

Shallow copy copies references; deep copy copies values recursively.

----------------------------------------------------------------

4️⃣ Memoization (Performance Booster)
🔹 What is Memoization?
👉 Caching function results to avoid recomputation.

Example
function memoize(fn) {
  const cache = {};
  return function (x) {
    if (cache[x]) return cache[x];
    return cache[x] = fn(x);
  };
}

const square = memoize(n => n * n);

square(4); // calculated
square(4); // cached


📌 Used in:

Heavy calculations
Recursive problems
React (useMemo)

🔥 Memoization Interview Trap

❌ Overusing memoization → memory issues
✅ Use only for expensive functions

🏆 Final Rapid-Fire Interview Answers

Prototype enables method sharing
JS uses prototype-based inheritance
Debounce waits, throttle limits
Shallow copy shares nested references
Deep copy duplicates entire object
Memoization improves performance via caching


---------------------------------------------------------------


What is Currying? 🧠

Currying is a technique where a function with multiple arguments is transformed into a sequence of functions, each taking one argument at a time.

Instead of this 👇

add(2, 3)


You do this 👇

add(2)(3)

Simple Example
Normal function
function add(a, b) {
  return a + b;
}

Curried version
function add(a) {
  return function (b) {
    return a + b;
  };
}

add(2)(3); // 5


👉 First call stores a
👉 Second call uses it and returns result
👉 Closure magic ✨

Why Currying Exists (Real Reason)

Currying helps with:
Reusability
Partial application
Cleaner & readable code
Functional programming patterns

Real-World Use Cases 💡
1️⃣ Reusability / Partial application
const multiply = a => b => a * b;

const double = multiply(2);
const triple = multiply(3);

double(5); // 10
triple(5); // 15


👉 Create specialized functions easily

2️⃣ Configuration first, data later

Very common in real projects:

const fetchWithAuth = token => url =>
  fetch(url, {
    headers: { Authorization: token }
  });

const api = fetchWithAuth("Bearer abc123");

api("/users");
api("/products");

3️⃣ Event handling (React / JS)
const handleClick = id => event => {
  console.log(id, event.target);
};

<button onClick={handleClick(10)}>Click</button>

4️⃣ Validation functions
const isGreaterThan = min => value => value > min;

const isAdult = isGreaterThan(18);

isAdult(20); // true