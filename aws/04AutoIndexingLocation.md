1️⃣ autoindex (directory listing)
What it does

When a folder doesn’t have index.html, NGINX can show a file list.

Default behavior

❌ Disabled (for security)

Enable autoindex
location /files/ {
    root /var/www/html;
    autoindex on;
}


Folder structure:

/var/www/html/files/
 ├── report.pdf
 ├── image.png
 └── data.json


Access:

http://localhost/files/


You’ll see a clickable file list.

Improve autoindex
location /files/ {
    root /var/www/html;
    autoindex on;
    autoindex_exact_size off;   # show KB/MB
    autoindex_localtime on;     # local time
}

Interview note

Autoindex should be enabled only for internal or download servers.

2️⃣ location directive (VERY IMPORTANT)
What it is

location tells NGINX how to handle a request path.

🔹 Basic location
location / {
    try_files $uri $uri/ =404;
}


Matches everything.

🔹 Exact match
location = /login {
    return 200 "Login page";
}


Only matches /login, not /login/abc

🔹 Prefix match
location /api/ {
    proxy_pass http://localhost:3000;
}


Matches /api/*

🔹 Regex match
location ~ \.php$ {
    return 403;
}


Matches .php files

🔹 Location priority (important)

Order:

= exact match

^~ prefix

regex ~ / ~*

normal prefix /

3️⃣ Error handling (custom error pages)
Default behavior

NGINX shows its own error pages (ugly 😅)

Custom error page
error_page 404 /404.html;
error_page 500 502 503 504 /50x.html;

location = /404.html {
    root /var/www/html;
    internal;
}


Create file:

/var/www/html/404.html

API-style error (JSON)
error_page 404 = @notfound;

location @notfound {
    return 404 '{"error":"Resource not found"}';
}

Interview line

NGINX allows centralized error handling at server or location level.

4️⃣ sendfile (performance booster)
What it is
sendfile on;


NGINX sends files directly from disk to network

No user-space copy

Less CPU

Faster static files

Where to enable
http {
    sendfile on;
}

When NOT to use

On network-mounted file systems

When files change frequently

Then:

sendfile off;

Interview line

sendfile improves static file performance by reducing context switches.

5️⃣ Combined real-world example (🔥 this is gold)
server {
    listen 80;
    server_name localhost;

    root /var/www/html;
    index index.html;

    sendfile on;

    # Static SPA
    location / {
        try_files $uri /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3000;
    }

    # File downloads
    location /downloads/ {
        autoindex on;
        autoindex_localtime on;
    }

    # Custom error page
    error_page 404 /404.html;

    location = /404.html {
        internal;
    }
}

🔁 Always test after changes
sudo nginx -t
sudo service nginx reload

🧠 One-liner summary (interview killer)

NGINX efficiently serves static files, routes requests using flexible location rules, supports directory listing with autoindex, handles errors centrally, and boosts performance using sendfile.