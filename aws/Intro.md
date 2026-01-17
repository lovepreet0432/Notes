1️⃣ What is AWS EC2 (simple words)

EC2 (Elastic Compute Cloud) = a virtual computer (server) running in AWS cloud.

Instead of buying a laptop/server:

AWS gives you a remote machine

You control OS, CPU, RAM, disk

You access it via SSH

You deploy backend apps (Node, PHP, Java, etc.)

Think of EC2 as:

“A Linux machine running somewhere on AWS that I control”

2️⃣ Steps to Create an EC2 Instance (Real Flow)
Step 1: Login to AWS Console

Go to AWS Console

Search for EC2

Click Launch Instance

Step 2: Choose AMI (Operating System)

Choose:

Amazon Linux 2 ✅ (best for beginners)
OR

Ubuntu (also fine)

AMI = pre-installed OS image

Step 3: Choose Instance Type

Select:

t2.micro (Free tier eligible)

Instance Type = CPU + RAM config
t2.micro → 1 CPU, 1 GB RAM

Step 4: Key Pair (IMPORTANT)

You’ll see:

Create a new key pair

Name: my-ec2-key

Type: RSA

Format: .pem

Download it ⚠️ (You cannot download again)

👉 This file is your login password, but much more secure.

Step 5: Network & Security Group

Allow:

SSH – Port 22 → from My IP

HTTP – Port 80 → from Anywhere

Custom TCP – Port 3000 → from Anywhere (for Node app)

Security Group = Firewall

Step 6: Launch Instance 🚀

After launch:

Instance state → Running

You’ll see Public IP

3️⃣ What are Keys (Very Important Concept)
🔐 Key Pair = Authentication system

Private Key (.pem) → stays with YOU

Public Key → stored on EC2

When you SSH:

AWS checks if your private key matches the public key

If yes → login allowed

❌ No password
✅ Much more secure

4️⃣ Connect to EC2 via SSH
Step 1: Go to folder where .pem exists
cd Downloads

Step 2: Set permission (Linux / Mac / Git Bash)
chmod 400 my-ec2-key.pem

Step 3: Connect via SSH
ssh -i my-ec2-key.pem ec2-user@PUBLIC_IP


Example:

ssh -i my-ec2-key.pem ec2-user@13.233.xxx.xxx


👉 ec2-user is default username for Amazon Linux

If Ubuntu:

ssh -i key.pem ubuntu@PUBLIC_IP

5️⃣ Install Node.js on EC2

After SSH login:

sudo yum update -y


Install Node:

curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs -y


Verify:

node -v
npm -v

6️⃣ Create Node Server File

Create file:

mkdir app
cd app
nano server.js


Paste this:

const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from AWS EC2 🚀");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});


Save: CTRL + X → Y → Enter

7️⃣ Run Node App
node server.js


Visit in browser:
http://PUBLIC_IP:3000


🎉 Your Node server is LIVE on AWS!

8️⃣ Keep Server Running (Important)

If you close SSH, Node stops. Use PM2:

sudo npm install pm2 -g
pm2 start server.js
pm2 save

9️⃣ Public IP vs Private IP (VERY IMPORTANT)
🌍 Public IP

Used from internet
Browser, Postman, frontend apps
Example: 13.233.xx.xx

Changes when instance stops (unless Elastic IP)

🏠 Private IP
Used inside AWS network
EC2 ↔ EC2 communication
Not accessible from internet
Example: 172.31.0.15

Think:

Public IP → Outside world
Private IP → Internal AWS network

🔟 Summary (Perfect Notes)

EC2

Virtual server on AWS

Key Pair

Private key → with you
Public key → on EC2
SSH

Secure login using key
No password
Security Group
Firewall rules
Must open ports (22, 80, 3000)
Public IP
Internet access
Private IP
Internal AWS communication