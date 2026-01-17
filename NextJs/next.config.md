🔹 What is next.config.js?

next.config.js is the configuration file for Next.js.

It allows us to:
Customize Next.js behavior
Enable / disable features
Optimize performance
Configure build & runtime settings

👉 It runs only on the server, never in the browser.

🔹 Basic Structure
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

🔹 Common & Important Config Options (Interview Focus)
1️⃣ reactStrictMode
reactStrictMode: true
Enables React strict mode in development
Helps catch side effects & bad practices
Does not affect production

👉 Good practice to keep it enabled

2️⃣ images (Very Important)
Used to configure next/image
images: {
  domains: ['res.cloudinary.com', 'cdn.example.com'],
}

Why needed?
Next.js blocks external images by default

Prevents security issues

3️⃣ env
Expose environment variables at build time

env: {
  API_URL: process.env.API_URL,
}


⚠️ Not recommended for secrets
Prefer .env.local

4️⃣ rewrites

Used to mask API URLs

async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'https://backend.com/:path*',
    },
  ];
}


Use cases:

Avoid CORS issues

Clean URLs

Proxy backend APIs

5️⃣ redirects
async redirects() {
  return [
    {
      source: '/old-page',
      destination: '/new-page',
      permanent: true,
    },
  ];
}


Use cases:

SEO redirects

URL restructuring

6️⃣ headers

Set HTTP headers

async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
      ],
    },
  ];
}


Used for:

Security headers
CORS
Cache control

7️⃣ output
output: 'standalone'


Used when:

Deploying with Docker

Smaller production bundle

Easier server deployment

🔥 Interview favorite for DevOps discussions

8️⃣ compiler
compiler: {
  removeConsole: process.env.NODE_ENV === 'production',
}


Removes console.log in production

9️⃣ experimental (Advanced)
experimental: {
  serverActions: true,
}


Enables experimental features

Used cautiously

May break in upgrades

🔹 Real-Life Use Case Example

“In my project, we used next.config.js to allow Cloudinary images, proxy backend APIs using rewrites, remove console logs in production, and generate a standalone build for Docker deployment.”