🔹 Round 1 – Next.js Core (Basics → Intermediate)
1️⃣ What problem does Next.js solve compared to plain React (CRA/Vite)?
2️⃣ Explain SSR, SSG, ISR in Next.js.

👉 When would you use each one in a real project?

3️⃣ What is file-based routing in Next.js?

How is it different in pages router vs app router?

4️⃣ What is getServerSideProps and getStaticProps?

Can we use them in Next.js 13 App Router?

5️⃣ What is the App Router in Next.js 13?

Why did Next.js introduce it?

6️⃣ Difference between:

pages/api/*

app/api/*/route.js

7️⃣ What are Server Components in Next.js 13?

Why are they useful?

Can they access window or localStorage?

8️⃣ What is "use client"?

When do you really need it?

9️⃣ How does data fetching work in App Router?

Explain:

fetch()

caching

revalidate

no-store

🔟 How do you handle environment variables in Next.js?

Difference between:

process.env.KEY

NEXT_PUBLIC_*

🔹 Bonus (Experience-based)
11️⃣ Have you ever faced a hydration error in Next.js?

Why does it happen?

How do you fix it?

12️⃣ How do you implement authentication in Next.js 13?

(NextAuth / custom JWT / middleware)

13️⃣ What is middleware in Next.js?

Give a real-life use case.

14️⃣ How do you optimize performance in Next.js?

(Images, fonts, bundles, caching, etc.)

15️⃣ Difference between:

next/image

normal <img />

👉 Your turn
Start answering from Q1.
I’ll behave like an interviewer:

correct you

push you deeper

and then move to advanced + system design questions (real MERN interviews 💯)

Whenever you’re ready, begin with Question 1.

give answers

Perfect 👍
I’ll give you clear, interview-ready answers for Next.js v12 → v13 (App Router), written like a 4-year MERN dev would answer. You can literally speak these.

1️⃣ What problem does Next.js solve compared to plain React?

Plain React (CRA/Vite) is client-side rendered, which causes:

Poor SEO

Slower first page load

Extra JS bundle for users

Next.js solves this by:

Server-Side Rendering (SSR)

Static Site Generation (SSG)

Built-in routing

API routes

Image & performance optimizations

👉 Result: faster, SEO-friendly, production-ready apps

2️⃣ Explain SSR, SSG, ISR
✅ SSR (Server-Side Rendering)

Page rendered on every request

Uses fresh data

Example: dashboards, user profiles

✅ SSG (Static Site Generation)

Page generated at build time

Very fast

Example: blogs, marketing pages

✅ ISR (Incremental Static Regeneration)

Mix of SSR + SSG

Page regenerates after a time

Example: product listings

3️⃣ File-based routing (Pages vs App Router)
Pages Router
pages/about.js → /about
pages/blog/[id].js → /blog/1

App Router (Next 13)
app/about/page.js → /about
app/blog/[id]/page.js → /blog/1


👉 App Router adds:

Layouts

Server Components

Streaming

Better performance

4️⃣ getServerSideProps & getStaticProps

Used only in Pages Router

❌ Not supported in App Router

App Router alternative:
const data = await fetch(url, { cache: 'no-store' });


or

fetch(url, { next: { revalidate: 60 } })

5️⃣ What is App Router & why introduced?

App Router:

Uses React Server Components

Improves performance

Reduces JS sent to browser

Supports streaming & layouts

👉 Introduced to align with modern React architecture

6️⃣ pages/api vs app/api/route.js
pages/api

Old style

Node request/response

app/api/route.js
export async function GET() {
  return Response.json({ success: true });
}


Modern

Web standard APIs

Better edge support

7️⃣ Server Components

Default in App Router

Run only on server

No access to window, document, localStorage

Smaller JS bundle

👉 Used for:

Data fetching

Database queries

Secure logic

8️⃣ "use client"

Required when:

Using useState, useEffect

Handling clicks

Accessing browser APIs

Example:

"use client";

export default function Button() {
  return <button>Click</button>;
}

9️⃣ Data Fetching in App Router
Default
fetch(url)


➡️ cached automatically

Disable cache
fetch(url, { cache: 'no-store' })

ISR
fetch(url, { next: { revalidate: 60 } })

🔟 Environment Variables
Server only
DB_URL=...

Client accessible
NEXT_PUBLIC_API_URL=...


👉 NEXT_PUBLIC_ is exposed to browser

11️⃣ Hydration Error

Happens when:

Server HTML ≠ Client HTML

Common causes:

Date.now()

Math.random()

Accessing window on server

Fix:

Use useEffect

Convert component to client component

12️⃣ Authentication in Next.js 13

Options:

NextAuth (most common)

Custom JWT

Middleware for route protection

Flow:

Login → set cookie/session

Middleware validates user

13️⃣ Middleware

Runs before request completes

Use cases:

Auth protection

Redirects

Localization

Example:

export function middleware(req) {
  if (!req.cookies.get("token")) {
    return NextResponse.redirect("/login");
  }
}

14️⃣ Performance Optimization

next/image

next/font

Server Components

Code splitting

Caching & ISR

Edge functions

15️⃣ next/image vs <img>
Feature	<img>	next/image
Lazy loading	❌	✅
Optimization	❌	✅
Resize	❌	✅
Performance	❌	✅


