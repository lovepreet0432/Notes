How to do SSR

Use server component + no cache

// app/users/page.js
export default async function UsersPage() {
  const res = await fetch('https://api.example.com/users', {
    cache: 'no-store'
  })
  const users = await res.json()

  return <pre>{JSON.stringify(users, null, 2)}</pre>
}

Why this is SSR
Server Component (default)
cache: 'no-store' → no caching

Runs every request

When to use

Auth-based pages
Dashboards

Real-time data

🧠 Example: User profile page

2️⃣ SSG in Next.js 13
What SSG means now

HTML is generated at build time and cached forever.

How to do SSG

Use default fetch behavior

// app/blog/page.js
export default async function BlogPage() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  return <pre>{JSON.stringify(posts, null, 2)}</pre>
}

Why this is SSG

fetch() is cached by default

Page built once
Served from CDN
When to use
Blogs
Docs

Marketing pages

🧠 Example: Blog articles

3️⃣ ISR in Next.js 13
What ISR means now
Static page that rebuilds after some time.

How to do ISR

Use revalidate

// app/products/page.js
export default async function ProductsPage() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 } // seconds
  })
  const products = await res.json()

  return <pre>{JSON.stringify(products, null, 2)}</pre>
}

How it works
First user → static HTML
After 60 sec → page regenerates in background
Next user → updated HTML

When to use

Product lists
News pages

Semi-dynamic content

🧠 Example: E-commerce product listing

4️⃣ CSR in Next.js 13
What CSR means now

HTML is generated in the browser.

How to do CSR

Add "use client"

'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <p>Loading...</p>

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

Why this is CSR

Runs in browser
Data fetched after JS loads
No server HTML for data

When to use

Interactive UI
Charts
Modals, filters

🧠 Example: Chat apps, Admin dashboards

⚠️ Important Default Behavior in Next 13
Feature	Default
Components	Server Components
fetch()	SSG (cached)
Page rendering	Static by default
Client rendering	Only with "use client"

👉 SSR is opt-in, not default.

🔥 One-Line Interview Answers

Q: How SSR works in Next 13 without getServerSideProps?
👉 By using Server Components with fetch({ cache: 'no-store' })

Q: How ISR works in App Router?
👉 Using fetch() with next.revalidate

Q: What controls rendering in Next 13?
👉 Server Components + fetch caching

🧠 Mental Model (Super Important)
Server Component + cached fetch → SSG
Server Component + revalidate → ISR
Server Component + no-store → SSR
Client Component → CSR


If you want next, I can explain:

Server Components vs Client Components

Streaming & Suspense

How SEO works in App Router

Common mistakes devs make in Next 13