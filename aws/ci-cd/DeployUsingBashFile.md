1️⃣ What are Bash files?

A bash file is just a script containing Linux shell commands.

File extension:

.sh


Example:

git pull
npm install
npm run build


Instead of typing commands one by one, you:

write them once

run them anytime

👉 Think of bash as automation glue for Linux servers.

Why do we need bash files?

Because servers are:

repetitive

error-prone

boring to manage manually 😄

Bash helps you:

automate deployments

standardize commands

avoid human mistakes

run jobs via cron / webhooks / CI tools

CI/CD tools internally run bash scripts anyway.

2️⃣ Where are bash files used in real life?

Very common places:

CI/CD pipelines (GitHub Actions, Jenkins)

Deployment scripts

Server startup scripts

Backup scripts

Cron jobs

Docker entrypoints

So learning bash = infra superpower 💪

3️⃣ How to create a bash file

On your EC2 server:

nano deploy.sh


Add this at the top (IMPORTANT):

#!/bin/bash


This tells Linux:

“Run this file using bash shell”

4️⃣ Make bash file executable

By default, files are NOT executable.

Run:

chmod +x deploy.sh


Check:

ls -l deploy.sh


You should see:

-rwxr-xr-x


Now you can run:

./deploy.sh

5️⃣ Your custom CI/CD requirement (clear understanding)

You want this flow 👇

Local machine → git push
        ↓
EC2 server
        ↓
bash script
        ↓
git pull
npm run build
upload dist to S3


We’ll build exactly that.

6️⃣ Folder structure on EC2 (recommended)
/home/ubuntu/
 ├── react-app/
 │    ├── package.json
 │    ├── src/
 │    ├── dist/
 │    └── deploy.sh

7️⃣ Bash file for custom CI/CD (deploy.sh)
#!/bin/bash

echo "🚀 Starting deployment..."

APP_DIR="/home/ubuntu/react-app"
S3_BUCKET="s3://my-react-app-bucket"

cd $APP_DIR || exit 1

echo "📥 Pulling latest code..."
git pull origin main || exit 1

echo "📦 Installing dependencies..."
npm install || exit 1

echo "🏗️ Building project..."
npm run build || exit 1

echo "☁️ Uploading build to S3..."
aws s3 sync dist $S3_BUCKET --delete || exit 1

echo "✅ Deployment completed successfully!"

8️⃣ Run it manually (test)
./deploy.sh