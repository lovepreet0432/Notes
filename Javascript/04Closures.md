🔥 Closures 

1️⃣ What is a Closure?
👉 A closure is when a function remembers variables from its lexical scope even after the outer function has finished execution.

Closures are used for data hiding, maintaining state, callbacks, event handlers, React hooks, memoization, currying, and module patterns.

📌 One-liner (memorize):

Closure gives you access to an outer function’s variables even after the outer function has returned.

2️⃣ Basic Closure Example
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const fn = outer();
fn();
fn();
fn();


✅ Output:

1
2
3


🧠 count is preserved — this is closure.

3️⃣ Why Closures Exist?

Data hiding
State management
Callbacks
Event handlers
Memoization
Currying

👉 Real-world JS is impossible without closures.

4️⃣ Tricky Closure Question 🔥
❓ Q1
function x() {
  let a = 10;
  return function y() {
    console.log(a);
  };
}

const z = x();
z();


✅ Output:
10
🧠 a stays alive because y() needs it.

5️⃣ Closure + Loop (VERY COMMON)
❌ Using var
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

✅ Output:
4 4 4
🧠 One shared i (function scoped).

✅ Using let
for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}


✅ Output:
1 2 3
🧠 New block scope each iteration.

✅ Fix with Closure (Interview Gold)
for (var i = 1; i <= 3; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}

6️⃣ Closure with Parameters
function multiply(x) {
  return function (y) {
    return x * y;
  };
}

const double = multiply(2);
console.log(double(5));


✅ Output:
10
🧠 x is remembered.

7️⃣ Data Hiding using Closure
function counter() {
  let count = 0;

  return {
    inc() {
      count++;
      console.log(count);
    },
    dec() {
      count--;
      console.log(count);
    }
  };
}

const c = counter();
c.inc();
c.inc();
c.dec();

🧠 count is private.

8️⃣ Tricky Output Question 🔥
❓ Q2
let x = 10;

function outer() {
  let x = 20;
  function inner() {
    console.log(x);
  }
  return inner;
}

outer()();

✅ Output:
20
🧠 Lexical scope > global scope.

9️⃣ Closure + setTimeout
function test() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), i * 1000);
  }
}
test();


✅ Output:

0
1
2

10️⃣ Common Interview Traps ❌

❌ “Closure stores a copy of variable”
✅ No, it stores a reference

11️⃣ Memory & Closures (Senior-Level)

⚠️ Closures can cause memory leaks if:

Large objects are captured
Event listeners not removed

function leak() {
  const bigData = new Array(1000000).fill("*");
  return function () {
    console.log(bigData.length);
  };
}

12️⃣ Interview One-Liners 🏆

Closures are created every time a function is created
Closures remember lexical scope
let solves many closure loop bugs
Closures are used heavily in React hooks

---------------------------------------------------------------------


Let’s talk where closures are actually used in real life, not just theory.

1️⃣ Data Hiding / Encapsulation (Very Common)

Closures let you create private variables.

function createCounter() {
  let count = 0;

  return {
    inc() { count++; },
    get() { return count; }
  };
}

const counter = createCounter();
counter.inc();
console.log(counter.get()); // 1


👉 Used in:

Libraries
SDKs
State management

2️⃣ Callbacks & Async Code

Closures remember values even after function execution.

function fetchData(id) {
  setTimeout(() => {
    console.log("Fetched ID:", id);
  }, 1000);
}

fetchData(42);


👉 Used in:

setTimeout
fetch
Event listeners
Promises

3️⃣ Event Handlers (Browser)
function attachHandler(buttonId) {
  let clicks = 0;

  document.getElementById(buttonId).addEventListener("click", () => {
    clicks++;
    console.log(clicks);
  });
}


👉 Each button keeps its own state.

4️⃣ React (🔥 Super Important)

Closures are everywhere in React.

Example: useState
function Counter() {
  const [count, setCount] = React.useState(0);

  function increment() {
    setCount(count + 1);
  }

  return <button onClick={increment}>+</button>;
}


🧠 increment closes over count.

⚠️ Stale Closure (Tricky React Bug)
setCount(count + 1); // may use old count

✅ Fix:
setCount(prev => prev + 1);

5️⃣ Currying & Partial Application

function discount(rate) {
  return function (price) {
    return price - price * rate;
  };
}

const tenPercentOff = discount(0.1);
console.log(tenPercentOff(500));


👉 Used in:

Functional programming

Utility libraries (Lodash)

6️⃣ Memoization (Performance)
function memoizedAdd() {
  const cache = {};

  return function (n) {
    if (cache[n]) return cache[n];
    return cache[n] = n + 10;
  };
}

const add = memoizedAdd();
add(5);
add(5); // cached


👉 Used in:

Heavy calculations

Optimization

7️⃣ Once Function (Interview Favorite)
function once(fn) {
  let called = false;

  return function () {
    if (!called) {
      called = true;
      fn();
    }
  };
}

const init = once(() => console.log("Init"));
init();
init();


👉 Used for:

Initialization

Preventing duplicate API calls

8️⃣ Module Pattern (Classic JS)
const userModule = (function () {
  let user = "Admin";

  return {
    getUser() {
      return user;
    }
  };
})();


👉 Before ES6 modules, this was huge.

9️⃣ Maintaining State Without Globals
function createIdGenerator() {
  let id = 0;
  return () => ++id;
}

const genId = createIdGenerator();
genId();
genId();

