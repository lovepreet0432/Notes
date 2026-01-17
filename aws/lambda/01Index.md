1️⃣ What is Computing?

Computing simply means:

Using a machine (computer/server) to process data and run instructions

Examples:

Calculating totals in an app

Handling an API request

Saving data to DB

Sending emails

Running a background job

Whenever code runs and does work → that’s computing.

2️⃣ What is Compute?

In cloud terms, Compute = resources that run your code

Examples:

CPU

Memory (RAM)

Runtime (Node.js, Python, Java)

In AWS:

EC2 → virtual machines

ECS / EKS → containers

Lambda → functions

So:

Compute is how and where your code runs

3️⃣ What is Cloud Computing?

Cloud Computing means:

Renting computing resources over the internet instead of owning physical servers

Instead of:

Buying servers

Setting up data centers

Managing hardware

You:

Pay only for what you use

Scale up/down anytime

Deploy globally in minutes

Cloud provides:

Compute (run code)

Storage (S3, EBS)

Database (RDS, DynamoDB)

Networking

Example
Running a Node.js API on AWS instead of your laptop or office server.

4️⃣ Traditional Server-Based Model (Problem)

Before serverless, we had servers.

Example:

You deploy an Express app on EC2.

Problems:

You must:

Create server

Install Node

Configure ports

Handle crashes

Scale manually

Server runs 24/7, even if:

No users

No traffic

💸 You pay even when idle
😫 You manage infra instead of writing code

5️⃣ What is Serverless Computing?

Serverless ≠ no servers

It means:

You don’t manage servers. Cloud provider does.

You only:

Write code

Upload it

Define when it runs

AWS handles:

Server creation

Scaling

Patching

Availability

Key idea:

Focus on code, not infrastructure

6️⃣ Why Serverless is Needed?

Because developers were tired of:

Managing servers

Overpaying for idle resources

Scaling headaches

Infrastructure complexity

Serverless solves:

✔ No server management
✔ Auto scaling
✔ Pay per execution
✔ Faster development
✔ Great for microservices & APIs

7️⃣ What is AWS Lambda?

AWS Lambda is:

A serverless compute service that runs your code in response to events

You write functions, not servers.

Example events:

HTTP request (via API Gateway)

File upload to S3

Database change

Cron job (schedule)

Lambda basics:

Supports Node.js, Python, Java, Go, etc.

Runs code only when triggered

Stops automatically after execution

8️⃣ How AWS Lambda Resolves Problems
Before (EC2):

App running 24/7

Manual scaling

Fixed cost

With Lambda:

Code runs only when needed

Auto scales from 1 to 1M requests

Pay only for execution time (ms)

Example:

1 million requests

Each runs for 100ms

You pay only for those milliseconds

No traffic = ₹0 cost

9️⃣ Why Serverless is Perfect for APIs & Microservices

Small independent functions

Easy to deploy

Independent scaling

Faster development

Example:

login function

payment function

image upload function

email function

Each is a separate Lambda.

🔟 AWS Lambda & Rise of Serverless
Why Lambda became popular:

Explosive growth of:

APIs

Microservices

Event-driven systems

Startups wanted:

Low cost

Fast scaling

No ops team

Lambda enabled:

Backend without servers

Pay-as-you-go architecture

Faster MVPs

This led to:

Serverless architecture becoming mainstream

🔑 One-Line Summary Notes (Exam/Interview)

Computing: Running code to process data

Compute: Resources that execute code

Cloud Computing: Renting computing over internet

Serverless: No server management by developers

AWS Lambda: Event-driven serverless function service

Why Lambda: Auto scale, low cost, no infra headache