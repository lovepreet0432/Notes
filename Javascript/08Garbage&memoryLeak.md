🧹 Garbage Collection (GC) in JavaScript
1️⃣ What is Garbage Collection?

👉 Garbage collection is the process by which JavaScript automatically frees memory that is no longer reachable or needed.

📌 JS is garbage-collected, so developers don’t manually free memory.

2️⃣ How GC Works (Important)
🔥 Mark-and-Sweep Algorithm (Main One)

JS starts from root objects
Global objects (window, global)
Currently executing functions
Marks all reachable objects
Unmarked objects are garbage
Memory is freed

let obj = { name: "JS" };
obj = null; // now eligible for GC


🧠 If nothing can reach an object → it gets collected.

3️⃣ What Prevents Garbage Collection?

An object will NOT be garbage-collected if:

It’s referenced by a variable

It’s inside a closure

It’s attached to the DOM

It’s inside a global variable

💣 Memory Leaks in JavaScript
What is a Memory Leak?

👉 Memory leak happens when memory is no longer needed but still referenced, so GC cannot free it.

4️⃣ Common Causes of Memory Leaks (🔥 Interview Must-Know)
1️⃣ Global Variables (Very Common)
leak = "I am global"; // ❌


🧠 Accidental globals stay forever.

✅ Fix:

let leak = "safe";

2️⃣ Closures Holding Large Data
function leak() {
  const bigData = new Array(1e6).fill("*");
  return function () {
    console.log(bigData.length);
  };
}


🧠 bigData stays in memory.

✅ Fix: clean references when done.

3️⃣ Unremoved Event Listeners
button.addEventListener("click", handleClick);


❌ If element removed but listener not cleaned → leak.

✅ Fix:

button.removeEventListener("click", handleClick);

4️⃣ setInterval / setTimeout
setInterval(() => {
  console.log("running");
}, 1000);


❌ Runs forever unless cleared.

✅ Fix:

const id = setInterval(...);
clearInterval(id);

5️⃣ Detached DOM Elements (Very Common in React)
let div = document.createElement("div");
document.body.appendChild(div);
document.body.removeChild(div);

// div still referenced ❌


🧠 DOM removed but reference still exists.

6️⃣ Caching Without Limits
const cache = {};
function memoize(key, value) {
  cache[key] = value;
}


❌ Cache grows endlessly.

✅ Fix:

Size limit

TTL

WeakMap

5️⃣ WeakMap & WeakSet (🔥 Interview Favorite)
Why WeakMap?

👉 Keys are weakly referenced → GC can clean them.

const wm = new WeakMap();

let obj = {};
wm.set(obj, "data");

obj = null; // GC can clean it


📌 Use cases:

Caching

Private data

DOM-related storage

6️⃣ Memory Leaks in React (Very Important)
❌ Bad
useEffect(() => {
  setInterval(() => {
    console.log("tick");
  }, 1000);
}, []);

✅ Good
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(id);
}, []);

7️⃣ How to Detect Memory Leaks?

Chrome DevTools → Memory tab

Heap snapshots

Performance profiling

Look for:

Growing heap size

Detached DOM nodes

Retained closures