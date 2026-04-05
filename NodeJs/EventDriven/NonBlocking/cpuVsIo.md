CPU operations = work done by the processor itself

These are tasks where the CPU is actively calculating something.

Examples
Math calculations
Loops
Sorting large arrays
Hashing / encryption
JSON parsing (big JSON)
Image processing
Data compression

// CPU-bound task
function sum() {
  let total = 0;
  for (let i = 0; i < 1e9; i++) {
    total += i;
  }
  return total;
}

sum(); // CPU is busy the whole time
Key characteristics
Uses CPU cycles
Blocks the thread while running
Speed depends on CPU power
Node.js runs this on main thread

👉 If this runs in Node.js, nothing else can execute until it finishes.


What are I/O operations?
I/O = Input / Output
These are tasks where the program waits for external systems.

Examples
Reading / writing files
Database queries
API calls
Network requests
Reading from disk
Timers (setTimeout)

// I/O-bound task
fs.readFile("data.txt", "utf8", (err, data) => {
  console.log(data);
});

3. Why this difference matters so much in Node.js

Node.js is:

Single-threaded (for JS execution)

Event-driven
Non-blocking I/O
CPU-bound in Node.js ❌
Bad idea on main thread.
while (true) {} // server is DEAD

I/O-bound in Node.js ✅

Node shines here.

app.get("/users", async (req, res) => {
  const users = await db.getUsers(); // non-blocking
  res.json(users);
});


Node can handle thousands of I/O requests while waiting.


4. What happens internally in Node.js (simple mental model)
For I/O operations

JS code asks for I/O

Node hands it to:
OS kernel
libuv thread pool
JS thread is free
When done → callback / promise is queued

Event loop executes it

👉 CPU stays free while I/O is happening.


5. Real-world analogy
CPU operation

You are solving math problems
You must focus
You can’t do anything else
I/O operation
You ordered food 🍔
You are waiting
You can talk, work, watch videos meanwhile

Node.js is amazing at waiting efficiently, terrible at heavy thinking.

6. How Node.js handles CPU-heavy tasks

Node gives you options:

1. Worker Threads
Run CPU work in separate threads.
const { Worker } = require("worker_threads");

2. Child Processes
Use multiple processes.
const { fork } = require("child_process");

3. Offload to other services
Background jobs
Microservices
Queues (Bull, RabbitMQ)