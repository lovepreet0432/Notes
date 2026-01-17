🔐 What is SSL?

SSL (Secure Sockets Layer) encrypts data between a browser and your server.

In simple words:

Without SSL → data goes as plain text

With SSL → data is encrypted

That’s why:

http:// ❌ is insecure

https:// ✅ is secure

What SSL protects

Login credentials

API tokens

Payment data

Cookies & sessions

Benefits

🔒 Security

🌍 HTTPS lock icon

🚀 Better SEO (Google prefers HTTPS)

🔐 Required for modern browsers & APIs

Today, SSL technically means TLS, but everyone still calls it SSL.

📜 What is Certbot?

Certbot is a free tool that:

Automatically gets SSL certificates

Automatically installs them

Automatically renews them

It works with Let’s Encrypt, a free Certificate Authority.

So instead of buying SSL:
👉 You use Certbot + Let’s Encrypt = Free SSL

🧠 How Certbot works (simple flow)

You prove you own a domain

Let’s Encrypt verifies it

Certbot installs SSL on NGINX/Apache

Auto-renew runs every 90 days

🧰 Requirements before installing Certbot

Make sure:

You have a domain name (not IP)

Domain points to your server IP

NGINX or Apache is installed

Port 80 & 443 are open in firewall / AWS Security Group

📦 Install Certbot using SNAP (Recommended)

Snap is the official & safest way.

1️⃣ Install Snap (if not installed)
sudo apt update
sudo apt install snapd -y


Check:

snap --version

2️⃣ Install Certbot using Snap
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot

3️⃣ Make certbot command globally available
sudo ln -s /snap/bin/certbot /usr/bin/certbot


Verify:

certbot --version

🔑 Get SSL Certificate (NGINX)

If you’re using NGINX (most common):

sudo certbot --nginx


Certbot will:

Detect your server blocks

Ask for your domain

Ask email (for renewal alerts)

Auto-update NGINX config

Enable HTTPS

🎉 Done!

🔑 Get SSL Certificate (Apache)
sudo certbot --apache

🌐 If you want SSL only (manual mode)

Useful if you manage configs yourself:

sudo certbot certonly --nginx -d example.com -d www.example.com


Certificates stored at:

/etc/letsencrypt/live/example.com/

🔁 Auto-Renew SSL

Let’s Encrypt certs are valid for 90 days.

Certbot auto-renews via system timer.

Test renewal:

sudo certbot renew --dry-run


Check timer:

systemctl list-timers | grep certbot


No cron needed 👍

🧪 Common Issues (very common in interviews)
❌ Domain not pointing to server

Fix DNS A record

❌ Port 80 blocked

Open in firewall / AWS Security Group

❌ NGINX config error

Run:

sudo nginx -t

🧠 Interview-ready one-liner

SSL encrypts communication between client and server. Certbot is a tool that uses Let’s Encrypt to automatically generate, install, and renew free SSL certificates for HTTPS.