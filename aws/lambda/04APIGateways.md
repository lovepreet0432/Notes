What is API Gateway?

API Gateway is a managed AWS service that:

Creates, manages, and secures HTTP/HTTPS APIs and connects them to backend services like AWS Lambda

In simple words:

It gives your Lambda function a URL and turns it into a real API

Without API Gateway, Lambda is just code sitting in AWS with no public access.

Why Do We Need API Gateway?

Let’s start with the problem.

Problem: Lambda Cannot Be Accessed Directly ❌

Lambda does not have:

URL

HTTP methods (GET, POST)

Headers, query params handling

Authentication

Rate limiting

So this won’t work:

Browser ❌ → Lambda


Lambda needs something in front of it.

Solution: API Gateway ✅

API Gateway sits between client and Lambda.

Client → API Gateway → Lambda


It:

Exposes an HTTP endpoint

Handles HTTP logic

Triggers Lambda

Returns HTTP response

What API Gateway Actually Does (Key Responsibilities)
1️⃣ Provides an API URL

Example:

https://abc123.execute-api.aws.com/login


Now your frontend can call it.

2️⃣ Handles HTTP Methods

GET

POST

PUT

DELETE

PATCH

Maps each method to:

Same Lambda

Or different Lambdas

3️⃣ Converts HTTP Request → Lambda Event

API Gateway transforms:

Headers

Query params

Body

Path params

Into a Lambda event object.

Lambda doesn’t understand HTTP — API Gateway translates it.

4️⃣ Converts Lambda Response → HTTP Response

Lambda returns:

{
  statusCode: 200,
  body: JSON.stringify({ message: "OK" })
}


API Gateway converts this into:

HTTP status

Response body

Headers

5️⃣ Security & Auth (Very Important)

API Gateway can:

Enable JWT auth

Use Cognito

Validate API keys

Throttle requests

Rate limit traffic

All without writing code.

6️⃣ Scaling Automatically

1 request or 1 million requests

API Gateway scales automatically

No servers, no load balancers

Real-World Analogy 🧠

Think of API Gateway as a receptionist:

Client asks for something

Receptionist:

Checks identity

Understands request

Routes it to correct department (Lambda)

Returns response

Client never talks directly to Lambda.

What Happens When You Hit an API Gateway URL?

Step-by-step flow:

Client hits API URL

API Gateway receives HTTP request

Validates auth / rate limits

Converts request into Lambda event

Invokes Lambda

Lambda executes code

Lambda returns response

API Gateway sends HTTP response back

All this happens in milliseconds.

API Gateway vs Traditional Server
Traditional (Express on EC2)

You manage server

You manage ports

You handle scaling

You pay 24/7

API Gateway + Lambda

No server

No port management

Auto scaling

Pay per request

Types of API Gateway
HTTP API (Recommended)

Simple APIs

Lower latency

Cheaper

Perfect for Lambda

REST API

Advanced features

Request validation

API keys

Higher cost

👉 Use HTTP API unless you need advanced controls.

When Should You Use API Gateway?

Use it when:

Building serverless backend

Exposing Lambda as REST API

Building microservices

Creating public or private APIs

Handling auth & throttling easily

When NOT to Use API Gateway?

Serving static files (use S3 + CloudFront)

Very long-lived connections (use WebSockets or ALB)

Heavy binary uploads (use direct S3 upload)

One-Line Summary (Perfect for Notes)

API Gateway exposes Lambda as HTTP API

Lambda runs code, API Gateway handles HTTP

Converts HTTP ↔ Lambda format

Provides security, scaling, routing

Core component of serverless architecture