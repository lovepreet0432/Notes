What is a Promise in JavaScript?

A Promise represents a value that will be available in the future.

Think of it like ordering food online 🍔

You place the order → Promise created
Food arrives → fulfilled
Restaurant cancels → rejected
While waiting → pending

Promise states

A promise can be in only one of these states:
pending – still running
fulfilled – success
rejected – failed

Once fulfilled or rejected → it’s settled (cannot change again).

Basic Promise example
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data received");
    // reject("Error occurred");
  }, 1000);
});

fetchData
  .then(data => console.log(data))
  .catch(err => console.log(err))
  .finally(() => console.log("Done"));

Key methods

.then() → success
.catch() → error
.finally() → runs no matter what

Why Promises exist (very important)

Before promises, JS used callbacks → callback hell 😵

doA(() => {
  doB(() => {
    doC(() => {
      doD();
    });
  });
});


Promises solve this by:

Better readability
Proper error handling
Easy chaining
Works perfectly with async/await


Promise.all()
What it does
Runs multiple promises in parallel and:
Resolves only if ALL succeed
Rejects immediately if ANY fails

Syntax
Promise.all([p1, p2, p3])

Example
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3])
  .then(result => {
    console.log(result); // [10, 20, 30]
  })
  .catch(err => {
    console.log(err);
});

Failure case
const p1 = Promise.resolve("OK");
const p2 = Promise.reject("FAILED");

Promise.all([p1, p2])
  .then(console.log)
  .catch(err => console.log(err)); // FAILED
⛔ Even if others succeed, one failure kills everything

When to use Promise.all
Fetch multiple APIs where all data is required
Parallel DB calls
Loading app data on page load

Promise.allSettled()
What it does
Runs all promises in parallel
Waits for all to finish
Never rejects

Gives status + value/error for each promise

Syntax
Promise.allSettled([p1, p2, p3])

Example
const p1 = Promise.resolve("Success");
const p2 = Promise.reject("Error");

Promise.allSettled([p1, p2]).then(result => {
  console.log(result);
});

Output
[
  { status: "fulfilled", value: "Success" },
  { status: "rejected", reason: "Error" }
]

When to use Promise.allSettled

Dashboards
Analytics
Multiple APIs where partial success is okay
You want complete results, not fail-fast behavior

Promise.all vs Promise.allSettled (Quick comparison)
Feature	         Promise.all	Promise.allSettled
Fails fast	       ✅ Yes	   ❌ No
Waits for all    	❌ No	✅ Yes
Rejects	           ✅ Yes	❌ Never
Partial results	    ❌ No	✅ Yes
Best for    	Critical tasks	Reporting / dashboards

With async/await (real-world style)
Promise.all
const results = await Promise.all([
  fetch("/users"),
  fetch("/products")
]);

Promise.allSettled
const results = await Promise.allSettled([
  fetch("/users"),
  fetch("/ads")
]);

results.forEach(r => {
  if (r.status === "fulfilled") {
    console.log("Success", r.value);
  } else {
    console.log("Failed", r.reason);
  }
});

Interview-ready one-liner answers

Promise → handles async operations and avoids callback hell
Promise.all → fails fast, all-or-nothing
Promise.allSettled → waits for all, gives detailed results

--------------------------------------------------------------

🔥 Promise.all / race / any / allSettled
1️⃣ Promise.all() (Most Used)
👉 What it does

Runs promises in parallel
Resolves only if all promises succeed
Rejects immediately if any one fails

Example
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log(err));

✅ Output:
[10, 20, 30]

❌ Failure case
Promise.all([
  Promise.resolve("A"),
  Promise.reject("Error"),
  Promise.resolve("B")
]);

❌ Result:
Rejected → "Error"


🧠 Others are ignored once one fails.

📌 Where used

Multiple API calls (all required)
Load dashboard data
Parallel DB queries

2️⃣ Promise.race()
👉 What it does
Returns first settled promise
Can be resolve or reject

Example
Promise.race([
  new Promise(res => setTimeout(res, 1000, "A")),
  new Promise(res => setTimeout(res, 500, "B"))
]).then(console.log);


✅ Output:

B

❌ Reject wins too
Promise.race([
  Promise.reject("Fail fast"),
  Promise.resolve("Success")
]).catch(console.log);


✅ Output:
Fail fast

📌 Where used
Timeout logic
Fallback APIs
Performance optimization

3️⃣ Promise.any() (🔥 Newer & Tricky)
👉 What it does
Resolves when any promise resolves
Ignores rejected promises
Rejects only if all fail

Example
Promise.any([
  Promise.reject("Fail"),
  Promise.resolve("Success"),
  Promise.resolve("Another")
]).then(console.log);


✅ Output:
Success

❌ All fail case
Promise.any([
  Promise.reject("A"),
  Promise.reject("B")
]).catch(err => console.log(err));


❌ Output:
AggregateError: All promises were rejected


🧠 Error contains .errors array.

📌 Where used

Redundant APIs
CDN fallback

Load fastest successful response

4️⃣ Promise.allSettled() (Very Practical)
👉 What it does

Waits for all promises
Never rejects
Returns status of each promise

Example
Promise.allSettled([
  Promise.resolve("A"),
  Promise.reject("B"),
  Promise.resolve("C")
]).then(console.log);


✅ Output:

[
  { status: "fulfilled", value: "A" },
  { status: "rejected", reason: "B" },
  { status: "fulfilled", value: "C" }
]

📌 Where used

Show partial results

Bulk uploads
Reports / dashboards
Best UX scenarios

🔥 Comparison Table (Interview Gold)
Method	Fails fast	Waits all	Resolves on	Rejects on
all	✅ Yes	❌ No	All success	First failure
race	❌ No	❌ No	First settled	First settled
any	❌ No	❌ No	First success	All fail
allSettled	❌ No	✅ Yes	Always	Never
🧠 Tricky Interview Question
Promise.all([
  Promise.resolve(1),
  Promise.reject(2),
  Promise.resolve(3)
]).catch(console.log);


✅ Output:

2

Promise.any([
  Promise.reject("A"),
  Promise.resolve("B"),
  Promise.resolve("C")
]).then(console.log);


✅ Output:

B

🏆 Interview One-Liners (Use These)

Promise.all fails fast
Promise.race returns first settled promise
Promise.any returns first fulfilled promise
Promise.allSettled gives status of all promises

any throws AggregateError if all fail