1️⃣ Static Files (in AWS context)
What are Static Files?

Static files are files that don’t change dynamically:

HTML

CSS

JS

Images

PDFs

Videos

They are served as-is, no backend logic needed.

Why Lambda is NOT used for static files ❌

Lambda is for code execution, not file hosting.

Problems if you try:

Cold starts

Higher cost

Slower performance

Correct Way to Handle Static Files in AWS ✅

S3 + CloudFront

Flow:

Browser → CloudFront → S3 (static files)


Benefits:

Extremely fast

Cheap

Global CDN

No servers

👉 Lambda is used only for APIs, not static assets.

2️⃣ Max File Upload (Lambda Limitation 🔥)

This is very important.

AWS Lambda Payload Limits

Synchronous invocation: 6 MB

API Gateway payload limit: 10 MB

Lambda response size: 6 MB

So:

❌ You cannot upload large files directly through Lambda

❌ Wrong Way (Don’t Do This)
Client → API Gateway → Lambda → File Upload


Fails for large files.

✅ Correct Way (Industry Standard)

Direct upload to S3

Flow:

Client → S3 (via Pre-signed URL)


Lambda role:

Generates pre-signed URL

Handles metadata / DB entry

Example:

Client → Lambda → Get Upload URL
Client → S3 → Upload file


✔ No size issue
✔ Faster
✔ Cheaper

3️⃣ Creating Express App with Lambda Function

Yes, you can run Express inside Lambda.

Why do this?

Reuse existing Express apps

Familiar routing

Middleware support

How it Works (High Level)

Normally:

Browser → Express Server (EC2)


With Lambda:

Browser → API Gateway → Lambda → Express


API Gateway:

Converts HTTP request → Lambda event

Converts Lambda response → HTTP response

4️⃣ Express + Lambda Architecture
Client
  ↓
API Gateway (HTTP/REST)
  ↓
Lambda
  ↓
Express App

5️⃣ Express + Lambda Example (Node.js)
Install dependencies
npm init -y
npm install express serverless-http

app.js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.post("/login", (req, res) => {
  res.json({ message: "Logged in" });
});

module.exports = app;

lambda.js
const serverless = require("serverless-http");
const app = require("./app");

exports.handler = serverless(app);


✔ Your Express app now runs inside Lambda
✔ No server needed