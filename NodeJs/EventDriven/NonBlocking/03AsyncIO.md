Async I/O = start an I/O task, don’t wait, move on, get notified later

Why async I/O is mandatory in Node.js

Node.js has:
Single JS thread
One event loop
If I/O was synchronous:
One slow DB query = whole server frozen ❌
Async I/O allows:
Thousands of requests
With one thread
Without blocking

Who actually does the I/O?
Task	Handled by
HTTP requests	OS kernel
Timers	OS
File system	libuv thread pool
DNS	libuv thread pool
Crypto (async)	libuv thread pool


Async I/O APIs in Node.js
Promises (modern)
const fs = require("fs/promises");

const data = await fs.readFile("data.txt", "utf8");
console.log(data);

async / await (syntax sugar)
async function read() {
  const data = await fs.readFile("data.txt", "utf8");
  console.log(data);
}

Important:

await does NOT block the event loop
It only pauses that function, not Node.

Why await is NOT blocking (very important)
This scares beginners.
await db.query();


What actually happens:
Function pauses
Control returns to event loop
Node handles other requests
When promise resolves → function resumes
Event loop keeps running 💡

Async I/O vs CPU work (again, critical)
// async I/O (non-blocking)
await fetch("https://api.example.com");

// CPU work (blocking)
for (let i = 0; i < 1e9; i++) {}


Only I/O is async by default
CPU work is always blocking unless offloaded.

libuv thread pool (important)
Default size: 4 threads

Used for:
fs
crypto
dns
zlib


Why Node is perfect for backend APIs

Because backend is mostly:
DB calls
Network calls
File access
All = async I/O 💥

That’s why Node eats traditional threaded servers alive in I/O-heavy workloads.