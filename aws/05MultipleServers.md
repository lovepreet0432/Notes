“Multiple servers” usually means multiple websites / apps on the same machine. Let’s walk through it cleanly.

🧠 What “multiple servers” means in NGINX

In NGINX:

One NGINX instance

Multiple server blocks

Each server {} = one website / app

Just like Virtual Hosts in Apache.

✅ Step 1: Folder structure (important)
/var/www/
 ├── site1
 │    └── index.html
 └── site2
      └── index.html


Create them:

sudo mkdir -p /var/www/site1 /var/www/site2
sudo chown -R $USER:$USER /var/www


Create files:

nano /var/www/site1/index.html
nano /var/www/site2/index.html


Example:

<h1>Site 1</h1>

<h1>Site 2</h1>

✅ Step 2: Create server block files

NGINX convention:

/etc/nginx/sites-available/
/etc/nginx/sites-enabled/

🔹 Server 1
sudo nano /etc/nginx/sites-available/site1

server {
    listen 80;
    server_name site1.local;

    root /var/www/site1;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

🔹 Server 2
sudo nano /etc/nginx/sites-available/site2

server {
    listen 80;
    server_name site2.local;

    root /var/www/site2;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

✅ Step 3: Enable server blocks (IMPORTANT)
sudo ln -s /etc/nginx/sites-available/site1 /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/site2 /etc/nginx/sites-enabled/


Disable default (optional but recommended):

sudo rm /etc/nginx/sites-enabled/default

✅ Step 4: Update hosts file (local only)

On Windows:

C:\Windows\System32\drivers\etc\hosts


Add:

127.0.0.1 site1.local
127.0.0.1 site2.local

✅ Step 5: Test & reload
sudo nginx -t
sudo service nginx reload


Open in browser:

http://site1.local
http://site2.local

🔥 Alternative: Multiple servers on different ports
server {
    listen 8080;
    root /var/www/site1;
}

server {
    listen 8081;
    root /var/www/site2;
}


Access:

http://localhost:8080
http://localhost:8081

⚛️ Node.js apps behind NGINX (very common)
server {
    listen 80;
    server_name api.site1.local;

    location / {
        proxy_pass http://localhost:3000;
    }
}

server {
    listen 80;
    server_name api.site2.local;

    location / {
        proxy_pass http://localhost:4000;
    }
}

🧠 How NGINX decides which server to use

Order:

listen port

server_name

Default server (first match)

❌ Common mistakes

Forgetting sites-enabled symlink

Wrong server_name

Not updating hosts

Port already in use