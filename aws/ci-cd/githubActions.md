First: What is GitHub Actions?

GitHub Actions = built-in automation tool in GitHub

It lets you say:

“When this happens in my repo → do that automatically.”

Examples:

When I push code → run tests

When I open a PR → check lint + build

When I merge to main → deploy to server / S3 / EC2

This automation is called CI/CD (Continuous Integration / Continuous Deployment).

Big Picture (mental model)

Think of GitHub Actions like a factory:

Event → presses the start button

Workflow → the factory blueprint

Job → one machine inside the factory

Runner → the computer that runs the machine

Keep this picture in mind 👇

Event → Workflow → Job(s) → Runner executes steps


Now let’s go one by one.

1️⃣ Workflow (Blueprint)
What is a workflow?

A workflow is a YAML file that defines:

WHEN to run

WHAT to run

HOW to run it

📍 Location (very important):

.github/workflows/deploy.yml


If the file is not here → GitHub Actions won’t see it.

Example workflow (simple)
name: Build React App

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm run build

In simple words:

“When someone pushes code, run these commands on a Linux machine.”

2️⃣ Events (Trigger / Switch)
What is an event?

An event is what triggers the workflow.

No event → workflow never runs.

Common events
Event	Meaning
push	Someone pushed code
pull_request	PR opened / updated
workflow_dispatch	Manual run (button click)
schedule	Cron job (time based)
release	New release created
Example: run only on main branch
on:
  push:
    branches:
      - main


Meaning:

“Only run when code is pushed to main”

Manual trigger (very useful)
on:
  workflow_dispatch:


This gives you a Run workflow button in GitHub UI.

Perfect for:

Manual deployments

Practice CI/CD

Emergency runs

3️⃣ Job (A Unit of Work)
What is a job?

A job is a set of steps that run together on the same machine.

A workflow can have multiple jobs

Jobs can run parallel or one after another

Example with 2 jobs
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build


Here:

test job runs

build job runs

By default → parallel

Sequential jobs (very important)
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying..."


Meaning:

“Deploy ONLY if tests pass”

4️⃣ Runner (The Machine)
What is a runner?

A runner is the computer that actually executes your job.

It:

Downloads your code

Runs commands

Uploads logs/results

Types of runners
1. GitHub-hosted runner (most common)
runs-on: ubuntu-latest


GitHub gives you:

Linux

Windows

macOS

You don’t manage anything.
GitHub spins it up → runs → destroys it.

2. Self-hosted runner (advanced)

This is:

Your own server (EC2, laptop, VM)

You install a GitHub runner on it

Used when:

You need private network access

Heavy builds

Custom tools

Example:

runs-on: self-hosted

How everything connects (Real example)

Let’s say you want:

“When I push to main, build React app and deploy to S3”

Flow in plain English:

Event: push to main

Workflow: deploy.yml wakes up

Job: build-and-deploy

Runner: Ubuntu machine

Steps:

Checkout code

Install dependencies

Build app

Upload to S3

Full simple example
name: Deploy React App

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Get code
        uses: actions/checkout@v4

      - name: Install deps
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        run: echo "Upload build to S3"

One more important thing: Steps

Inside a job, you have steps.

Two types:

uses → reuse someone else’s action

run → run shell command

steps:
  - uses: actions/checkout@v4   # reusable action
  - run: npm install            # shell command