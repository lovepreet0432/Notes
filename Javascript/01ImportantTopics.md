1️⃣ Is JavaScript Single-Threaded? Why?

Yes, JavaScript is single-threaded, meaning it can execute one task at a time on the call stack.

🧠 Why is JS Single-Threaded?

Because JS was designed for the browser:
Avoids race conditions
Prevents DOM corruption
Keeps things simple & predictable

Imagine two threads modifying the DOM at the same time → 💥 chaos.

❓ Then how is JS asynchronous?

JS uses:
Call Stack
Web APIs (setTimeout, fetch)
Callback Queue / Microtask Queue
Event Loop

👉 Long tasks are offloaded, JS itself still runs one thing at a time.

📌 Interview line:

JavaScript is single-threaded but non-blocking due to the event loop.

2️⃣ var vs let vs const (🔥 Very Important)
Feature	          var	          let	        const
Scope	          Function	      Block	       Block
Hoisted	         Yes	         Yes	           Yes
TDZ	           ❌ No	         ✅ Yes	      ✅ Yes
Re-declare	    ✅ Yes	        ❌ No	       ❌ No
Re-assign	       ✅ Yes	       ✅ Yes	    ❌ No
Global object	 Yes (window)	      No	        No

🔍 Examples
var
var a = 10;
var a = 20; // allowed

let
let b = 10;
let b = 20; // ❌ error

const
const c = 10;
c = 20; // ❌ error

❓ const with objects (tricky)
const user = { name: "JS" };
user.name = "React"; // ✅ allowed


🧠 const prevents reassignment, not mutation.

❓ What is Hoisting?
JS moves declarations to the top of their scope during compilation.

🔹 var Hoisting
console.log(a);
var a = 10;


✅ Output:

undefined


🧠 Hoisted like:

var a;
console.log(a);    // undefined
a = 10;

🔹 let & const Hoisting
console.log(b);
let b = 10;

❌ Error:
Cannot access 'b' before initialization


🧠 They ARE hoisted, but not initialized.

4️⃣ Temporal Dead Zone (TDZ)
❓ What is TDZ?

The time between:
Variable is hoisted
Variable is initialized

Accessing it → ❌ ReferenceError

🔥 Example
console.log(x); // ❌ TDZ
let x = 5;


TDZ exists from start of block → declaration line.

❓ Does TDZ apply to var?
❌ No, only let & const.

5️⃣ Tricky Interview Questions
❓ Q1
console.log(a);
let a = 10;
❌ ReferenceError (TDZ)


❓ Q2
{
  console.log(x);
  let x = 5;
}


❌ TDZ applies inside blocks too

❓ Q3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

✅ Output:
3 3 3
🧠 var is function scoped.

❓ Q4
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

✅ Output:

0 1 2


🧠 let creates a new block scope each iteration.

6️⃣ One-Line Interview Answers (Memorize 😄)

JS single-threaded?
→ Yes, to avoid race conditions and keep DOM safe.

Why async works then?
→ Event loop + Web APIs.

var issue?
→ Function scope + hoisting bugs.

Why let/const introduced?
→ Block scope, TDZ, fewer bugs.

TDZ purpose?
→ Prevent access before initialization.


🔥 What is Currying?
👉 Currying is a technique where a function with multiple arguments is converted into a sequence of functions, each taking one argument.

Normal function
function add(a, b, c) {
  return a + b + c;
}

Curried version
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

add(1)(2)(3); // 6


🧠 Each inner function remembers the previous value → closure.
🧠 One-line Interview Answer (Memorize)
Currying transforms a function with multiple parameters into nested functions that take one parameter at a time.

