
Promises and async/await callbacks run before setTimeout because they are microtasks, and microtasks are executed immediately after synchronous code.


1?? Basic: setTimeout vs sync code
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

Output
A
C
B

Why?
Sync code runs first
setTimeout goes to Macrotask queue
Event loop runs it after call stack is empty

2?? Promise vs setTimeout
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
Output
A
D
C
B

Rule to remember ??
Sync ? Microtasks (Promises) ? Macrotasks (setTimeout)

3?? Multiple promises
Promise.resolve().then(() => console.log("A"));
Promise.resolve().then(() => console.log("B"));
console.log("C");

Output
C
A
B


Microtasks execute in order of creation.

4?? Promise inside setTimeout
setTimeout(() => {
  console.log("A");
  Promise.resolve().then(() => console.log("B"));
}, 0);

console.log("C");

Output
C
A
B

Why?
setTimeout callback runs
Inside it, promise goes to microtask
Microtask runs before next macrotask

5?? async / await basics
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

test();
console.log("C");

Output
A
C
B

Key idea ??

await pauses the function and resumes it as a microtask

6?? async + promise chain
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

Promise.resolve().then(() => console.log("C"));

test();
console.log("D");

Output
A
D
C
B


Why order?

await schedules continuation

Promises already queued run first

7?? await with setTimeout
async function test() {
  console.log("A");

  await new Promise(resolve =>
    setTimeout(() => {
      console.log("B");
      resolve();
    }, 0)
  );

  console.log("C");
}

test();
console.log("D");

Output
A
D
B
C


Why?
setTimeout ? macrotask
await waits until it resolves
After resolve ? microtask ? C

8?? VERY common interview trap ??
console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");

Output
start
end
promise
timeout

9?? Nested promises (mind-bender)
Promise.resolve().then(() => {
  console.log("A");
  Promise.resolve().then(() => console.log("B"));
});

Promise.resolve().then(() => console.log("C"));

Output
A
C
B


Why?

Microtasks are queued

Inner promise goes after current microtask

?? Golden Rule (memorize this)
Call Stack (sync)
? Microtask Queue (Promise, await)
? Macrotask Queue (setTimeout, setInterval)

