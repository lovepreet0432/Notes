🔹 What is a Lambda Function?

A Lambda function is:

A single-purpose piece of code that runs in response to an event

Example:

Handle API request

Process file upload

Send email

Resize image

It has:

Handler function (entry point)

Runtime (Node.js, Python…)

Memory & timeout settings

🔹 Lifecycle of an AWS Lambda Function

Let’s understand lifecycle step by step when you hit a URL.

1️⃣ When You Hit the URL (API Gateway → Lambda)

Typical flow:

Client → API Gateway → Lambda → Response

Step-by-step:

User hits API URL

API Gateway receives request

API Gateway triggers Lambda

Lambda executes your function

Lambda returns response

API Gateway sends response to client

This entire process happens in milliseconds.

2️⃣ Lambda Execution Lifecycle (Internals)

Lambda lifecycle has 3 major phases:

🔸 1. Initialization Phase (Init)

AWS:

Creates execution environment

Allocates memory & CPU

Starts runtime (Node.js, Python)

Loads your code

Runs outside handler code

Example (Node.js):

const db = connectDB(); // runs once during init


👉 Happens only during cold start

🔸 2. Invocation Phase

Lambda calls your handler function

Event & context passed

Your logic runs

Response returned

Example:

exports.handler = async (event) => {
  return { statusCode: 200, body: "Hello" };
};


This phase happens every request.

🔸 3. Shutdown Phase (Optional)

If environment is idle for some time:

AWS freezes or destroys it

No guarantee when shutdown happens

🔹 Cold Start vs Warm Start (Very Important 🔥)

This is a frequently asked interview topic.

❄ Cold Start

A cold start happens when:

Lambda is called for the first time

Or after being idle

Or during scale-out (new instance)

What happens:

Create new execution environment

Load runtime

Load code

Initialize dependencies

⏱ Takes more time (100ms to few seconds)

Example:

First API call after deployment

First request in the morning

🔥 Warm Start

A warm start happens when:

Lambda execution environment already exists

AWS reuses it

What happens:

Skips initialization

Directly invokes handler

⏱ Much faster (few milliseconds)

🔁 Visual Flow
Cold Start:
Request → Create Env → Load Code → Run Handler → Response

Warm Start:
Request → Run Handler → Response

🔹 Why Cold Start Happens?

Because:

Lambda is not always running

AWS optimizes cost by freezing environments

New traffic spikes create new instances

🔹 How to Reduce Cold Start?

Best practices:

Keep function lightweight

Move heavy code outside handler

Use smaller dependencies

Choose right runtime (Node.js is faster)

Use Provisioned Concurrency (paid option)

🔹 Simple Node.js Example (Lifecycle Aware)
// runs during INIT (cold start)
const db = connectDB();

exports.handler = async (event) => {
  // runs every invocation
  return {
    statusCode: 200,
    body: "Lambda Response"
  };
};

🔹 Real-World Example

Imagine a login API:

First user hits login → cold start

Next 100 users → warm starts

Night time → Lambda sleeps

Morning → cold start again