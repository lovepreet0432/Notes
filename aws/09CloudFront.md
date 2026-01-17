1️⃣ What is CloudFront?

CloudFront is AWS’s CDN (Content Delivery Network).

In simple words 👇

CloudFront delivers your website content faster, securely, and closer to users.

Instead of users hitting your server or S3 bucket directly, they hit CloudFront, which serves content from the nearest location.

Without CloudFront
User (India) → Server (US)


❌ Slow
❌ High latency

With CloudFront
User (India) → CloudFront Edge (India)


✅ Fast
✅ Low latency

CloudFront has hundreds of edge locations worldwide.

2️⃣ What problems does CloudFront solve?
🚀 Performance

Content served from nearest location

Massive speed improvement

🔒 Security

HTTPS (SSL)

DDoS protection (AWS Shield)

Can block countries, IPs, bots

📈 Scalability

Handles millions of requests automatically

No server scaling needed

💸 Cost optimization

Reduces load on origin (S3 / EC2 / API)

3️⃣ Where can we use CloudFront?

CloudFront can sit in front of almost anything.

Common use cases 👇
✅ Static websites

React / Vue / Angular

HTML / CSS / JS

S3 + CloudFront (most common)

✅ APIs
CloudFront → API Gateway / EC2 / ALB


Cache API responses

Reduce backend load

✅ Media delivery

Images

Videos

PDFs

Downloads

✅ Dynamic websites

Auth pages

Dashboards

E-commerce

CloudFront is not limited to static content.

4️⃣ Does CloudFront work only for static sites?

❌ NO

That’s a very common myth.

CloudFront supports:
Content Type	Supported
Static files	✅
Dynamic pages	✅
REST APIs	✅
GraphQL APIs	✅
Video streaming	✅
Authenticated content	✅

CloudFront just caches smartly:

Static → cached longer

Dynamic → cached less or not cached

5️⃣ What can be an origin for CloudFront?

CloudFront always sits in front of an origin.

Origins can be:

Origin Type	Example
S3	React build
EC2	Node / PHP app
ALB	Load balanced backend
API Gateway	Serverless APIs
Media services	Videos
6️⃣ Is CloudFront paid?
Short answer: ✅ Yes
Practical answer: 💰 Very cheap
Pricing model

You pay for:

Data transfer (GB)

Number of requests

Free Tier (important!)

AWS gives:

1 TB data transfer / month

10 million requests / month
(for first 12 months)

For most React apps:
👉 Costs almost nothing

Example:

Small to medium site: $1–5/month

Often cheaper than EC2

7️⃣ Why CloudFront + S3 is better than EC2 for React
Feature	EC2	S3 + CloudFront
Server management	❌	✅ None
Scaling	Manual	Automatic
SSL	Manual	Free
Cost	Higher	Lower
Performance	Limited	Global CDN
Downtime risk	Yes	Very low

That’s why companies prefer it.

8️⃣ Real-world examples

CloudFront is used by:

Netflix (media delivery)

Amazon.com

Airbnb

Spotify

Almost every AWS-based frontend

If a site feels fast globally → CDN is involved.

9️⃣ Interview-ready definition (memorize this)

CloudFront is AWS’s CDN that delivers content from edge locations close to users.
It improves performance, provides SSL and security, reduces backend load, and works with both static and dynamic content.

10️⃣ One-line clarity

❓ What is CloudFront? → CDN

❓ Where used? → In front of S3, APIs, servers

❓ Paid? → Yes, but cheap + free tier

❓ Static only? → No, works for dynamic & APIs too



---------------------------------------------------------------------------

1️⃣ What is CloudFront Functions?

CloudFront Functions = lightweight JavaScript code that runs at CloudFront edge locations.

Simple definition 👇

It lets you run small JS logic before the request reaches your origin (S3, API, server).

Think of it as:

Tiny JS logic at CDN level

2️⃣ Where does it run?

At CloudFront edge locations, not on:

EC2

Lambda

Your server

Flow:

User → CloudFront Function → CloudFront → Origin (S3 / API)


So decisions happen closest to the user.

3️⃣ What problems does it solve?

Without CloudFront Functions:

Every request goes to origin

Even invalid / useless requests

With CloudFront Functions:

Modify requests

Redirect users

Block traffic

Rewrite URLs

Handle headers

All before touching your backend.

4️⃣ Common use cases (very important)
🔹 1. SPA routing (React / Vue)

React routes like:

/login
/dashboard


S3 doesn’t have these files.

CloudFront Function can rewrite:

/dashboard → /index.html


🔥 Cleaner than error-page hacks.

🔹 2. Redirect HTTP → HTTPS

Force secure traffic at edge.

🔹 3. Redirect www → non-www (or vice versa)
www.example.com → example.com


SEO-friendly.

🔹 4. Geo-based logic

Example:

Block users from specific countries

Redirect based on region

🔹 5. Header manipulation

Add security headers

Remove sensitive headers

Forward custom headers

🔹 6. Simple authentication / blocking

Block bots

Block user-agents

Rate-limit logic (basic)

⚠️ Not full auth — just lightweight checks.