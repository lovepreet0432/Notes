1️⃣ First: What does “rendering” mean in Next.js?

Rendering = when HTML is generated
Static rendering → HTML generated ahead of time
Dynamic rendering → HTML generated on request

Next.js decides this per route, not for the whole app.

2️⃣ Static Rendering (Default in Next.js)
What it means

Page HTML is generated at build time
Stored in cache / CDN
Same HTML served to everyone

👉 This is SSG under the hood

Static Rendering Example
// app/blog/page.js
export default async function BlogPage() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  return (
    <ul>
      {posts.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  )
}

Why this is static

Server Component (default)

fetch() is cached by default
No request-specific data

What happens in production
npm run build
→ fetch runs
→ HTML generated
→ stored in .next/
→ served instantly

When to use static rendering

Blogs
Landing pages

Docs

Public product pages

3️⃣ Dynamic Rendering
What it means

HTML generated on every request

Data fetched at request time

Can depend on cookies, headers, auth

👉 This is SSR under the hood

Dynamic Rendering Example (SSR-style)
// app/dashboard/page.js
import { cookies } from 'next/headers'

export default async function Dashboard() {
  const token = cookies().get('token')

  const res = await fetch('https://api.example.com/user', {
    cache: 'no-store'
  })

  const user = await res.json()

  return <h1>Welcome {user.name}</h1>
}

Why this is dynamic

Uses cookies() → request-specific

cache: 'no-store'

Runs per request

What happens in production
User request
→ Server runs component
→ HTML generated
→ Sent to browser

When to use dynamic rendering

Dashboards

Profile pages

Auth-based content

Real-time data

4️⃣ Forcing Static or Dynamic Rendering

Next.js can auto-detect, but you can force it.

Force Static Rendering
export const dynamic = 'force-static'


Use when:

You KNOW data is static

Want CDN caching

Force Dynamic Rendering
export const dynamic = 'force-dynamic'


Use when:

You want SSR no matter what

Request-specific logic

5️⃣ Static + Dynamic Together (Real Power)
Example: Product page
// app/products/[id]/page.js
export default async function ProductPage({ params }) {
  const res = await fetch(
    `https://api.example.com/products/${params.id}`,
    { next: { revalidate: 60 } }
  )

  const product = await res.json()

  return <h1>{product.name}</h1>
}


1️⃣ “Console will be run only at build time for static pages” — is this true?
✅ YES (in production)

If a page is statically rendered, then:

console.log("Hello")


in a Server Component runs:

👉 ONLY during npm run build
👉 NOT when users hit the page

Example (Static Page)
// app/blog/page.js
export default async function BlogPage() {
  console.log("BUILD TIME LOG")

  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  return <h1>Blog</h1>
}

What happens
next build
→ console runs
→ HTML generated
→ cached forever


When user visits /blog:
❌ console does NOT run again

⚠️ Exception: Dev Mode

In next dev:

Static pages behave like dynamic

Console runs on every refresh

👉 Always judge console behavior in production.

2️⃣ When does Static vs Dynamic rendering occur?
Next.js decides automatically based on usage
✅ Static Rendering occurs when:

No request-specific data

Cached fetch() (default)

No cookies / headers

No cache: 'no-store'

Example
const res = await fetch(url)


➡️ Static

❌ Dynamic Rendering occurs when:

You use cookies() or headers()

You use cache: 'no-store'

You force it

You access request-based data

Example
fetch(url, { cache: 'no-store' })


➡️ Dynamic

🔒 Forcing behavior
export const dynamic = 'force-static'
export const dynamic = 'force-dynamic'

3️⃣ How client-side and server-side rendering happen on the SAME page (Dynamic Rendering)

This is the most important concept.

Short answer

👉 Server renders first
👉 Client enhances later

This happens in both static and dynamic pages, but is easiest to understand in dynamic ones.

Step-by-step Example
// app/dashboard/page.js
import ClientWidget from './ClientWidget'

export default async function Dashboard() {
  const res = await fetch('https://api.example.com/user', {
    cache: 'no-store'
  })
  const user = await res.json()

  console.log("SERVER RENDER")

  return (
    <>
      <h1>Hello {user.name}</h1>
      <ClientWidget />
    </>
  )
}

// app/dashboard/ClientWidget.js
'use client'

export default function ClientWidget() {
  console.log("CLIENT RENDER")
  return <button>Click me</button>
}

What happens in production
1️⃣ Server-side rendering (SSR)

Server executes Server Component

Fetches data

Generates HTML

Logs appear in server logs

📦 Browser receives:

<h1>Hello John</h1>
<button>Click me</button>

2️⃣ Client-side hydration

Browser downloads JS for ClientWidget
React attaches event listeners
console.log("CLIENT RENDER") runs in browser

👉 Now the page becomes interactive


1️⃣ Static Site Generation (SSG) with generateStaticParams
Your code
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { blogID: "1" }
  ]
}

What this means

This is SSG for dynamic routes

Next.js will pre-build only these routes

No other route is allowed

Example folder
app/blog/[blogID]/page.js

What happens at build time
next build
→ /blog/1 is generated
→ HTML is saved
→ Any other blogID = 404

Why dynamicParams = false matters

Prevents runtime rendering

Forces strict static behavior

Similar to fallback: false in old pages router

👉 Console logs in this page run only at build time.

2️⃣ ISR – Incremental Static Regeneration
Code
export const revalidate = 5;

What this does

Page is static

But Next.js will re-generate it every 5 seconds

Happens in background

Timeline
First user → gets static HTML
After 5 sec → Next rebuilds page
Next user → gets updated HTML

Important

Still static rendering

NOT dynamic per request

Console logs run:

at build time

at revalidation time

👉 ISR = Static + freshness

3️⃣ Dynamically Rendering Static Pages

(dynamic config)

Code
export const dynamic = 'force-dynamic';
// auto | force-static | error

Options explained
auto (default)

Next decides based on usage

Smart detection

force-static

Forces build-time rendering

Even if code could be dynamic

force-dynamic

Forces SSR

Page renders on every request

error

Throws error if dynamic behavior is detected

Useful for strict static sites

Example
export const dynamic = 'force-dynamic';

export default async function Page() {
  console.log("RUNS PER REQUEST");
  return <h1>Dynamic</h1>;
}


👉 Console runs every request in prod.

4️⃣ Second Way to Make Page Dynamic: searchParams
Example
export default function Page({ searchParams }) {
  console.log("DYNAMIC");

  return <h1>{searchParams.q}</h1>;
}

Why this forces dynamic rendering

Query params are request-specific

Cannot be known at build time

Next must render per request

Result

Page becomes dynamic (SSR)

Console runs per request

5️⃣ Third Way: cookies() and headers()
Example
import { cookies, headers } from 'next/headers';

export default function Page() {
  const cookieStore = cookies();
  const headerList = headers();

  console.log("DYNAMIC PAGE");

  return <h1>Dashboard</h1>;
}

Why this forces dynamic rendering

Cookies & headers depend on incoming request

Build-time rendering is impossible

Result

Page is always SSR

Console runs on every request

6️⃣ Putting It All Together (🔥 Mental Model)
What decides rendering?
Build-time data only → Static
Revalidate → Static + refresh (ISR)
Request-specific data → Dynamic

Quick Decision Table
Feature Used	Rendering Type
generateStaticParams	Static
dynamicParams = false	Strict static
revalidate	ISR
cache: 'no-store'	Dynamic
searchParams	Dynamic
cookies()	Dynamic
headers()	Dynamic
dynamic = 'force-dynamic'	Dynamic