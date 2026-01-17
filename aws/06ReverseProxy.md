🧠 What “reverse proxy” means

Client → NGINX → Node.js backend → NGINX → Client

Why we do this:

Hide Node.js port

Use port 80 / 443

SSL termination

Load balancing

Better security & performance

✅ Step 1: Simple Node.js server (backend)
// server.js
const express = require("express");
const app = express();

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", time: new Date() });
});

app.listen(3000, () => {
  console.log("Node server running on port 3000");
});


Run it:

node server.js


Test:

http://localhost:3000/api/health

✅ Step 2: NGINX reverse proxy config

Edit:

sudo nano /etc/nginx/sites-available/nodeapp

server {
    listen 80;
    server_name localhost;

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


Enable it:

sudo ln -s /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

✅ Step 3: Test & reload
sudo nginx -t
sudo service nginx reload


Test:

http://localhost/api/health


🎉 Node is now hidden behind NGINX

🔥 Important proxy settings (WHY they matter)
Directive	Why
proxy_pass	Forwards request
proxy_set_header Host	Keeps original domain
Upgrade / Connection	WebSocket support
proxy_http_version 1.1	Required for keep-alive
⚛️ Full-stack setup (React + Node)
server {
    listen 80;
    server_name localhost;

    root /var/www/html;
    index index.html;

    # Frontend
    location / {
        try_files $uri /index.html;
    }

    # Backend
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

⚡ WebSocket support (Socket.IO etc.)
location /socket.io/ {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}


-------------------------------------------------------------------------------

🧠 1️⃣ Request headers (Client → NGINX → Backend)

These are headers NGINX sends to your Node.js backend.

✅ Set / forward headers to Node.js
location /api/ {
    proxy_pass http://localhost:3000;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

Why these matter
Header	Purpose
Host	Original domain
X-Real-IP	Client IP
X-Forwarded-For	IP chain
X-Forwarded-Proto	http / https

👉 In Node.js:

req.headers['x-real-ip']

🔥 Custom request header
proxy_set_header X-App-Source "nginx-proxy";

⚠️ Remove request header
proxy_set_header Authorization "";

🧠 2️⃣ Response headers (NGINX → Client)

These headers are sent back to the browser.

✅ Add response headers
add_header X-Server "nginx" always;
add_header X-App-Version "1.0";


Use always so it appears even on errors.

🔐 Security headers (VERY COMMON)
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

🌍 CORS headers
add_header Access-Control-Allow-Origin "*" always;
add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;

Handle preflight
if ($request_method = OPTIONS) {
    return 204;
}

❌ Remove / hide response headers
proxy_hide_header X-Powered-By;

🧠 3️⃣ Headers inside different scopes

Headers can be set at:

http {} → global

server {} → per domain

location {} → per route

Priority:

location > server > http

🔥 Real-world full example (Node.js + security)
server {
    listen 80;
    server_name localhost;

    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;

    location /api/ {
        proxy_pass http://localhost:3000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_hide_header X-Powered-By;
    }
}

🧪 Debug headers

Check headers via:

curl -I http://localhost/api/health

❌ Common mistakes

Forgetting always with add_header

Setting headers in wrong block

Overwriting Authorization accidentally

Missing OPTIONS handling for CORS

🎯 Interview-ready explanation

NGINX can modify request and response headers to control security, client metadata, CORS, and backend communication without changing application code.