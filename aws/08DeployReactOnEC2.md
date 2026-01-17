1️⃣ Development mode (Vite – npm run dev)

When you run:

npm run dev


What’s actually happening 👇

Vite starts a development server

Runs on something like:

http://localhost:5173


Features:

⚡ Super fast startup

🔥 HMR (Hot Module Replacement)

❌ No optimized bundles

❌ Not secure

❌ Not meant for production

Important

In development, your browser talks directly to the Vite dev server.

So flow looks like:

Browser → Vite Dev Server → React App


👉 This mode is ONLY for local development
You never expose this to the internet.

2️⃣ What does npm run build do? (Production build)
npm run build


This is the most important step.

It:

Converts React JSX → plain JS

Bundles everything using Rollup (Vite internally)

Minifies JS, CSS, HTML

Removes dev-only code

Optimizes assets

Creates a static build

Output:

/dist
  ├── index.html
  ├── assets/
      ├── index-xxxxx.js
      ├── index-xxxxx.css


✅ This dist folder is production-ready
❌ Node.js is NOT required to serve it

Think of it as:

“React app converted into simple static files”

3️⃣ npm run preview – what is this?
npm run preview


Starts a small local server

Serves the build output

Used to test production build locally

⚠️ Important:

It is NOT a real production server

Do not use this on EC2

Good for:

Checking routes

Checking build errors

Testing env variables

4️⃣ Do we use Vite in production?

Short answer: ❌ NO
Correct answer: Vite is a build tool, not a production server.

Vite is used for:

Development (npm run dev)

Building (npm run build)

Vite is NOT used for:

Serving production traffic

Handling SSL

Reverse proxy

Load balancing

In production, we serve the static files created by Vite.

5️⃣ Best way to deploy React (Vite) on EC2
✅ Recommended Production Architecture
User Browser
     ↓
NGINX (80/443, SSL, caching)
     ↓
React Static Files (dist/)


No Node server needed for React itself.

6️⃣ Step-by-step: Deploy React on EC2 (Best Practice)
Step 1: Build locally or on EC2
npm install
npm run build


You get:

dist/

Step 2: Install NGINX on EC2
sudo apt update
sudo apt install nginx -y

Step 3: Copy build to server
sudo rm -rf /var/www/react-app
sudo mkdir /var/www/react-app
sudo cp -r dist/* /var/www/react-app/

Step 4: Configure NGINX
sudo nano /etc/nginx/sites-available/react-app

server {
    listen 80;
    server_name your-domain.com;

    root /var/www/react-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}


Enable it:

sudo ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

7️⃣ Why NGINX is best for React

✅ Extremely fast for static files
✅ Handles thousands of users (C10K solved)
✅ SSL with Certbot
✅ Gzip & caching
✅ Reverse proxy (if backend exists)

Node.js is wasted just serving static React files.

8️⃣ When do you need Node.js in production?

Only if:

You have SSR (Next.js)

You have API backend

You are doing auth / sockets / server logic

Typical setup:

NGINX
 ├── React (static)
 └── Node API (3000)

9️⃣ Interview-ready summary (🔥 memorize this)

npm run dev → Vite dev server for development

npm run build → Creates optimized static files

npm run preview → Test production build locally

Vite is not used in production

Best deployment → NGINX serving build files

Node is optional, only for backend

------------------------------------------------------------------------

🔹 How S3 + CloudFront works (big picture)
User Browser
     ↓
CloudFront (CDN + SSL)
     ↓
S3 Bucket (static React build files)


Key idea:

React app is just static files

S3 stores those files

CloudFront delivers them fast + secure + global

No server. No Node. No PM2. No NGINX.

🔹 Step 1: Build your React (Vite) app

Inside your project:

npm install
npm run build


This creates:

dist/
 ├── index.html
 ├── assets/


👉 Only this dist folder goes to AWS.

🔹 Step 2: Create S3 bucket
AWS Console → S3 → Create bucket

Bucket name:
must be globally unique

my-react-app-prod


Region: any (same as CloudFront preferred)

❌ Disable “Block all public access”

Acknowledge warning

Create bucket

🔹 Step 3: Enable Static Website Hosting

Open the bucket → Properties

➡️ Scroll to Static website hosting
➡️ Enable

Hosting type: Static website

Index document: index.html

Error document: index.html (important for SPA)

Save.

🔹 Step 4: Upload build files

Open bucket → Upload

Upload contents of dist, not the folder itself ❗

✅ Correct:

index.html
assets/


❌ Wrong:

dist/
  index.html

🔹 Step 5: Make bucket public (policy)

Bucket → Permissions → Bucket Policy → Paste this 👇
(Replace bucket name)

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-react-app-prod/*"
    }
  ]
}


Now your site works via:

http://my-react-app-prod.s3-website-<region>.amazonaws.com


⚠️ This URL is HTTP only (no SSL)
That’s why we need CloudFront.

🔹 Step 6: Create CloudFront Distribution

AWS → CloudFront → Create distribution

Origin settings

Origin domain:
select your S3 bucket

Origin access:
Public (simple setup)

Default cache behavior

Viewer protocol policy:
✅ Redirect HTTP to HTTPS

Allowed HTTP methods:
GET, HEAD

Compress objects automatically: ✅ Yes

Default root object
index.html


Create distribution.

⏳ Takes ~5–10 minutes.

🔹 Step 7: Fix React routing (VERY IMPORTANT)

React routes like:

/login
/dashboard
/profile


CloudFront doesn’t know these exist.

Solution: Custom error response

CloudFront → Distribution → Error pages → Create

HTTP error code: 403 and 404

Response page path: /index.html

HTTP response code: 200

This enables SPA routing.

🔹 Step 8: Access your site 🎉

You’ll get a CloudFront URL like:

https://d3abcd123.cloudfront.net


✅ HTTPS
✅ Fast
✅ Production-ready

🔹 Step 9: (Optional) Custom domain + SSL

If you want:

https://app.yourdomain.com


Steps:

Route53 → Hosted zone

Create ACM certificate (us-east-1)

Attach certificate to CloudFront

Add A/AAAA record → CloudFront

This gives:

Free SSL

Custom domain

Zero downtime

🔹 How do updates work?

Every time you change code:

npm run build


Upload new dist files to S3
Then invalidate CloudFront cache:

/*


Or use versioned assets (Vite already does this).

🔹 Pros & Cons (real talk)
✅ Pros

No server cost

Auto scaling

CDN worldwide

Free SSL

Best performance

Zero maintenance

❌ Cons

No backend logic

Need API elsewhere

Slight AWS learning curve

🔹 Where does backend go?

Usually:

React → CloudFront → S3
API   → EC2 / ECS / Lambda


Frontend & backend are decoupled (modern architecture).