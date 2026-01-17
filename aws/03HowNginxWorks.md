🧠 Big Picture: How NGINX works

NGINX uses a master–worker architecture:

           MASTER PROCESS
                |
        ---------------------
        |        |         |
     Worker   Worker    Worker


Master process → controls everything

Worker processes → handle client requests

📄 nginx.conf structure (high level)
user www-data;
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    # server blocks live here
}

🔹 master_process
What it is
master_process on;


Enables master process

Default is on (you rarely change it)

What master process does

Starts worker processes

Reads & validates config

Reloads config (nginx -s reload)

Handles graceful shutdown

Does NOT handle client traffic

👉 Think of it as manager, not a worker.

Interview line:

Master process manages workers and config reloads without downtime.

🔹 worker_processes
What it is
worker_processes auto;

What it controls

Number of worker processes

Each worker handles many connections asynchronously

Recommended values
worker_processes auto;   # best


or manually:

worker_processes 4;


💡 Rule:

Usually = number of CPU cores

Why it matters

Too few → CPU underused

Too many → context switching overhead

Interview line:

Worker processes define how many OS-level processes handle incoming requests.

🔹 events { } block (VERY IMPORTANT)
What it is
events {
    worker_connections 1024;
}

What it controls

How workers handle connections

Low-level networking settings

worker_connections
worker_connections 1024;


Max connections per worker

Total max connections:

worker_processes × worker_connections

Example
worker_processes 4;
worker_connections 1024;


👉 Max connections = 4096

Why NGINX solves C10k problem

Uses event-driven, non-blocking I/O

One worker can handle thousands of connections

No “one thread per request” like Apache

🔥 How NGINX vs Apache differs here
Feature	NGINX	Apache
Architecture	Event-driven	Process/thread based
Memory usage	Low	High
C10k	Solved	Struggles
Static files	Very fast	Slower
⚙️ How Node.js relates to this

Node.js → single-threaded event loop

NGINX → multi-process + event-driven

NGINX sits in front of Node:

Handles SSL

Handles static files

Load balances

Proxies requests

👉 Perfect combo for production.

🧪 Real-life flow

Request hits NGINX

Master assigns worker

Worker:

Serves static file OR

Proxies to Node.js

Response sent back

✅ Safe minimal config (remember this)
worker_processes auto;

events {
    worker_connections 1024;
}


If you want, next we can:

Deep dive into http {} block

Explain server {} vs location {}

Build a Node.js reverse proxy

Optimize NGINX for production

Just tell me 🔥

how to serve static file in nginx

Alright, this is one of the BEST things NGINX does — super fast static file serving.
Let’s do it step-by-step, real-world style 👌

🧠 What “serve static files” means

NGINX directly serves:

.html

.css

.js

images

build files (React / Vite / Next export)

👉 No Node.js involved → faster + less load

✅ METHOD 1: Serve static files using default web root
1️⃣ Put files in default directory
/var/www/html


Example:

sudo nano /var/www/html/index.html

<h1>Hello from NGINX 🚀</h1>

2️⃣ Default NGINX config
server {
    listen 80;
    server_name localhost;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}


This is already present in:

/etc/nginx/sites-available/default

3️⃣ Test & reload
sudo nginx -t
sudo service nginx reload


Open:

http://localhost

✅ METHOD 2: Serve static files from custom folder (recommended)
1️⃣ Create your own directory
sudo mkdir -p /var/www/myapp
sudo chown -R $USER:$USER /var/www/myapp

nano /var/www/myapp/index.html

2️⃣ Update NGINX config
server {
    listen 80;
    server_name localhost;

    root /var/www/myapp;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

3️⃣ Reload
sudo nginx -t
sudo service nginx reload

🔥 Serve static files on specific route (/static)
Example folder
/var/www/assets/logo.png

Config
location /static/ {
    alias /var/www/assets/;
}


Access:

http://localhost/static/logo.png


⚠️ alias ≠ root

alias replaces the path

root appends the path

⚡ Performance tweaks (important)
Cache static files
location ~* \.(jpg|png|css|js|ico|woff2)$ {
    expires 30d;
    add_header Cache-Control "public";
}

⚛️ Serve React / Vite build (very common)
Build app
npm run build

Copy build files
sudo cp -r dist/* /var/www/html/


or for React:

sudo cp -r build/* /var/www/html/

SPA routing fix (IMPORTANT)
location / {
    try_files $uri /index.html;
}


This fixes page refresh on routes like /login

🧠 Interview-ready explanation

NGINX serves static files directly from disk using an event-driven model, which is faster and more memory-efficient than app servers like Node.js.