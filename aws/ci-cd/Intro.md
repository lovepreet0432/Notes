1️⃣ What is CI/CD (in simple words)

CI (Continuous Integration)
→ Code is automatically tested / built when you push.

CD (Continuous Deployment/Delivery)
→ Code is automatically deployed to server/cloud.

So instead of this:

git pull
npm install
npm run build
upload dist


You get this:

git push → auto build → auto deploy

2️⃣ Why CI/CD is important

Problems it solves:

❌ Manual deployment mistakes

❌ “Works on my machine”

❌ Slow releases

❌ Downtime

Benefits:

Faster delivery

Safer releases

Consistent builds

Easy rollback

3️⃣ What are GitHub Webhooks?
Definition

A GitHub Webhook is a HTTP callback sent by GitHub when something happens in a repository.

Example events:

push

pull_request

release

tag

How Webhooks work
Developer → git push
GitHub → POST request → Your server


Payload contains:

Branch

Commit ID

Author

Changed files

Where are webhooks used?

Custom CI/CD pipelines

Trigger builds

Notify Slack

Auto deploy to servers

Update Jira tickets

Basically:
👉 “Something happened in GitHub, react to it.”

4️⃣ Custom CI/CD pipeline using Node.js (DIY way)

Yes — you can build your own CI/CD system using Node.
This is educational + interview gold, but not always recommended for prod.

🔹 Architecture (custom)
GitHub
  ↓ webhook (push)
Node Server
  ↓
Build + Deploy script
  ↓
Server / S3 / CloudFront

🔹 Step 1: Node webhook server
import express from "express";
import crypto from "crypto";
import { exec } from "child_process";

const app = express();
app.use(express.json());

const SECRET = "mygithubsecret";

app.post("/webhook", (req, res) => {
  const sig = req.headers["x-hub-signature-256"];
  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (`sha256=${hmac}` !== sig) {
    return res.status(401).send("Invalid signature");
  }

  exec("npm run build && aws s3 sync dist s3://my-bucket", () => {
    console.log("Deployed!");
  });

  res.send("OK");
});

app.listen(3000);

🔹 Step 2: Configure GitHub Webhook

Repo → Settings → Webhooks

URL: https://your-server/webhook

Content type: application/json

Secret: same as Node

Event: push

🔹 Pros of custom CI/CD

✅ Full control
✅ Learn internals
✅ Lightweight
✅ Great for learning

🔹 Cons (important)

❌ Security risk if misconfigured
❌ No isolation
❌ Hard to scale
❌ No parallel jobs
❌ Manual retries

👉 Not recommended for serious production

5️⃣ What are GitHub Actions?

GitHub Actions = built-in CI/CD platform by GitHub

Instead of managing servers, GitHub runs jobs for you.

How it works
git push
  ↓
GitHub Actions runner
  ↓
Build / Test / Deploy


Defined using YAML.

🔹 Example: React → S3 + CloudFront
name: Deploy React App

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - run: npm install
      - run: npm run build

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET }}
          aws-region: us-east-1

      - run: aws s3 sync dist s3://my-bucket --delete

🔹 Why GitHub Actions is better

✅ Secure secrets
✅ Isolated runners
✅ Logs & retries
✅ Parallel jobs
✅ No server maintenance
✅ Industry standard

6️⃣ Webhooks vs GitHub Actions (clear difference)
Feature	Webhooks	GitHub Actions
Trigger	External server	GitHub internal
Infra needed	Yes	No
Security	Manual	Built-in
Ease	Medium	Easy
Production ready	⚠️	✅
7️⃣ When to use what?
Use Webhooks if:

You need custom internal systems

You want to learn internals

You already have a server

Use GitHub Actions if:

You want best practice

You want speed + safety

You are deploying to cloud

You are in interviews 😄

8️⃣ Interview-ready summary (🔥)

CI/CD automates build and deployment on code changes.
GitHub webhooks notify external systems when repo events occur.
Custom pipelines can be built using Node.js but are hard to scale.
GitHub Actions provides a secure, managed CI/CD solution directly integrated with GitHub.

9️⃣ Real-world advice (from experience)

Learning → Build webhook pipeline once

Production → GitHub Actions

Startups → GitHub Actions + Cloud

Enterprises → GitHub Actions / Jenkins / GitLab CI