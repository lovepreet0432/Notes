1️⃣ Event-Driven Architecture (EDA)

Event-driven architecture means the flow of the program is determined by events — things that “happen” — rather than sequential instructions.

An event can be:

User clicks

File finishes reading

HTTP request arrives

Timer fires

Node.js listens for events and reacts with callbacks.

Example in Node
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

myEmitter.on("greet", name => {
  console.log(`Hello ${name}`);
});

myEmitter.emit("greet", "Alice");


Flow:

Node registers listener on("greet")

When emit("greet") happens → listener executes

✅ This is event-driven: the program doesn’t wait; it reacts when events happen.

Why it matters for servers

Multiple clients can make requests

Node doesn’t block; it reacts to each request

Memory & CPU efficient

2️⃣ Non-Blocking I/O

Non-blocking I/O means Node can start an operation (like reading a file or querying a DB) and continue executing the next line of code without waiting for it to finish.

Contrast with blocking I/O:

// Blocking (synchronous)
const data = fs.readFileSync("file.txt");
console.log("Done");  // waits for file to read

// Non-blocking (asynchronous)
fs.readFile("file.txt", (err, data) => {
  console.log("File read done");
});
console.log("Done");  // prints immediately, does not wait


Node uses callbacks / promises / async-await to handle results when they’re ready

3️⃣ How Node.js implements this

Node.js architecture = Single-threaded event loop + libuv for async operations

Step 1: Single Thread

Node runs one main JS thread

Executes your code line by line

Avoids thread management complexity

Step 2: Event Loop

Node constantly checks for events (HTTP request, timer, completed I/O)

When an event occurs, Node executes the corresponding callback

Visual:

[event queue] → [event loop] → JS thread executes callback

Step 3: libuv (C++ layer)

Handles file system, networking, DNS, timers

Uses OS threads for actual heavy I/O (thread pool)

Once operation finishes → pushes callback to event loop

Flow Example:

JS Code -> fs.readFile -> libuv threads read file -> callback queued -> event loop executes callback


Your JS thread never blocks on I/O

4️⃣ Node.js Non-blocking Example
const fs = require("fs");

console.log("Start");

fs.readFile("bigfile.txt", "utf8", (err, data) => {
  if(err) throw err;
  console.log("File done");
});

console.log("End");


Output:

Start
End
File done


✅ Node continues running, file reading happens in background.

5️⃣ Combining Event-driven + Non-blocking

Event-driven = Node reacts to events

Non-blocking I/O = Node never waits for slow operations

Together → highly scalable:

1 thread can handle thousands of requests

No wasted CPU / RAM

Ideal for I/O-heavy apps (APIs, file servers, chats)

6️⃣ Real-world analogy

Think of a restaurant waiter:

Blocking (synchronous): Waiter cooks each dish himself → customers wait → slow

Non-blocking + event-driven: Waiter puts orders to the kitchen, serves other customers, comes back when food is ready → everything moves faster

7️⃣ Key points for interviews

Node.js uses single-threaded event loop

Non-blocking I/O allows Node to scale

Events trigger callbacks

libuv handles low-level async tasks behind the scenes

Node is perfect for I/O-heavy workloads (APIs, streaming)

CPU-heavy tasks are blocking → Node may need worker threads