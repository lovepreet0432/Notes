🔥 TRICKY QUESTIONS – TIMERS + useEffect CLEANUP

1️⃣ setInterval + stale state (classic 🔥)
❓ Code
useEffect(() => {
  const id = setInterval(() => { 
    setCount(count + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);

❓ What happens?

Counter increases only once

💥 Why?

count is captured from initial render

Closure holds count = 0

✅ Fix
setCount(prev => prev + 1);


🎯 Testing: Closure + stale state

2️⃣ Multiple intervals bug (very common)

❓ Code
const start = () => {
  setInterval(() => {
    console.log("tick");
  }, 1000);
};


User clicks Start 3 times.

❓ Output?
tick
tick tick
tick tick tick

💥 Why?

New interval created every click

Old ones never cleared

✅ Fix

Store interval in useRef

Guard before creating

🎯 Testing: Side-effect control

3️⃣ Cleanup runs immediately?! (StrictMode trap)
❓ Code
useEffect(() => {
  console.log("start");

  return () => {
    console.log("cleanup");
  };
}, []);

❓ Console output in DEV?
start
cleanup
start

💥 Why?

React StrictMode runs effect twice

Detects unsafe side effects

🎯 Testing: React internals knowledge

4️⃣ setTimeout inside useEffect without cleanup
❓ Code
useEffect(() => {
  setTimeout(() => {
    console.log("Hello");
  }, 3000);
}, []);


User navigates away in 1 second.

❓ What happens?

"Hello" still logs after 3 seconds

💥 Why?

Timeout still exists

Component already unmounted

✅ Fix
const id = setTimeout(...);
return () => clearTimeout(id);


🎯 Testing: Memory leaks

5️⃣ Cleanup uses wrong reference (subtle bug)
❓ Code
let timer;

useEffect(() => {
  timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(timer);
}, []);

❓ Why is this risky?

timer is not tied to component lifecycle

Shared across renders/components

✅ Fix
const timer = useRef(null);


🎯 Testing: Component isolation

6️⃣ setTimeout + state update after unmount
❓ Code
useEffect(() => {
  setTimeout(() => {
    setData("loaded");
  }, 2000);
}, []);


User navigates away early.

❓ Result?

React warning in console

✅ Fix
let isMounted = true;

setTimeout(() => {
  if (isMounted) setData("loaded");
});

return () => {
  isMounted = false;
};


🎯 Testing: Safe async handling

7️⃣ useEffect dependency + interval chaos
❓ Code
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);
}, [count]);

❓ What happens?

Interval recreated every second

💥 Why?

count changes → effect reruns

Cleanup + new interval repeatedly

✅ Fix

Remove count dependency

Use functional updater or ref

🎯 Testing: Dependency understanding

8️⃣ clearInterval but still running 😈
❓ Code
const stop = () => {
  clearInterval(timer);
};


Why interval doesn’t stop?

💥 Why?

timer is ref object

Interval ID is timer.current

✅ Fix
clearInterval(timer.current);


🎯 Testing: useRef basics

9️⃣ setTimeout order (JS + React mix)
❓ Code
console.log("A");

setTimeout(() => console.log("B"), 0);

useEffect(() => {
  console.log("C");
}, []);

console.log("D");

❓ Output?
A
D
C
B


🎯 Testing: Event loop + React lifecycle

🔟 Cleanup NOT running when expected
❓ Code
useEffect(() => {
  console.log("Effect");

  return () => console.log("Cleanup");
}, []);


Why cleanup doesn’t run on button click?

💥 Why?

Cleanup runs on unmount, not re-render

🎯 Testing: Lifecycle clarity

🎤 MASTER INTERVIEW ONE-LINER

Timers in React must be cleaned up using useEffect cleanup to avoid memory leaks, stale closures, and unintended multiple executions.


ULTRA-HARD TIMER + useEffect QUESTIONS
11️⃣ setTimeout + closure trap (JS + React)
❓ Code
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

❓ Output?
4
4
4

💥 Why?

var is function scoped

All callbacks share same i

Loop finishes → i = 4

✅ Fix
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}


🎯 Tests: Closures + event loop

12️⃣ React state + setTimeout (stale state)
❓ Code
const [count, setCount] = useState(0);

const handleClick = () => {
  setTimeout(() => {
    setCount(count + 1);
  }, 2000);
};


User clicks button 3 times quickly

❓ Final count?
1

💥 Why?

count captured as 0

All timeouts use same value

✅ Fix
setCount(prev => prev + 1);


🎯 Tests: Stale closure in async callbacks

13️⃣ useEffect + setInterval + dependency confusion
❓ Code
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);
}, []);

❓ What prints?
0 0 0 0 ...

💥 Why?

Effect runs once

Closure captures count = 0

✅ Fix (2 ways)

Way 1: useRef

const countRef = useRef(count);
countRef.current = count;


Way 2: dependency

useEffect(() => { ... }, [count]);


🎯 Tests: Closures vs dependencies

14️⃣ useEffect cleanup order (very tricky)
❓ Code
useEffect(() => {
  console.log("Effect", count);

  return () => {
    console.log("Cleanup", count);
  };
}, [count]);


Click button → setCount(count + 1)

❓ Output when count goes 0 → 1?
Cleanup 0
Effect 1

💥 Why?

Cleanup runs before next effect

Cleanup sees old state

🎯 Tests: Effect lifecycle order

15️⃣ setInterval + cleanup missing (memory leak)
❓ Code
useEffect(() => {
  setInterval(() => {
    console.log("tick");
  }, 1000);
}, []);


Navigate away.

❓ What happens?

Interval still runs

App logs forever

✅ Fix
const id = setInterval(...)
return () => clearInterval(id);


🎯 Tests: Memory management

16️⃣ useEffect + async function (common mistake)
❓ Code
useEffect(async () => {
  const res = await fetch("/api");
  setData(res);
}, []);

❓ Why is this wrong?

useEffect must return cleanup function

Async returns a Promise

✅ Fix
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("/api");
    setData(res);
  };

  fetchData();
}, []);


🎯 Tests: Effect contract

17️⃣ setTimeout cleanup confusion
❓ Code
useEffect(() => {
  const id = setTimeout(() => {
    console.log("Hi");
  }, 3000);

  return () => clearTimeout(id);
}, []);


User stays on page 5 seconds.

❓ Does cleanup run?

❌ NO (until unmount)

❓ Does "Hi" log?

✅ YES

🎯 Tests: Cleanup timing

18️⃣ StrictMode double interval bug 😈
❓ Code
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(id);
}, []);

❓ Why does it log twice in dev?

React StrictMode mounts → unmounts → mounts again

❓ Is this a bug?

❌ No

✅ Dev-only behavior

🎯 Tests: React internals knowledge

19️⃣ clearInterval but interval still runs
❓ Code
const timer = useRef(null);

const stop = () => {
  clearInterval(timer);
};

❓ Why not working?

timer is ref object

ID is in timer.current

✅ Fix
clearInterval(timer.current);


🎯 Tests: useRef fundamentals

20️⃣ Order of execution (🔥 favorite)
❓ Code
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

useEffect(() => {
  console.log("D");
}, []);

console.log("E");

❓ Output?
A
E
C
D
B

💥 Why?

Sync code

Microtasks (Promise)

React effects

Macrotasks (setTimeout)

🎯 Tests: Event loop mastery