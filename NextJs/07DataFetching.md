1️⃣ Data Fetching in Client Components

👉 Same as React

When to use

Browser-only data
User interactions
Real-time updates

localStorage / window dependent data

Example: Client Component Data Fetching
'use client'

import { useEffect, useState } from 'react'

export default function Users() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers)
  }, [])

  if (!users) return <p>Loading...</p>

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}

How it works

Page loads

JS runs in browser

useEffect fires

Data is fetched

UI updates

Downsides

❌ Slower first paint
❌ Not SEO friendly
❌ More JS shipped

2️⃣ Data Fetching in Server Components

👉 Next.js superpower

Key idea

Server Components can be async

They fetch data before HTML is sent

No loading spinners needed

Example: Server Component Data Fetching
// app/users/page.js
export default async function UsersPage() {
  const res = await fetch('https://api.example.com/users')
  const users = await res.json()

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}

What happens

Runs on server
Data fetched before render
HTML already has data

3️⃣ Next.js fetch ≠ Browser fetch

This is VERY IMPORTANT.

Next.js extends fetch with extra powers.

4️⃣ cache Option
Default behavior
fetch(url)


➡️ Cached
➡️ Enables Static Rendering

Disable caching (Dynamic Rendering)
fetch(url, { cache: 'no-store' })


➡️ Fetch runs on every request
➡️ Enables SSR

5️⃣ revalidate (ISR)
fetch(url, {
  next: { revalidate: 60 }
})


➡️ Static page
➡️ Rebuilds every 60 seconds

6️⃣ Rendering Type Decision (Mental Model)
fetch()              → Static
fetch + revalidate   → ISR
fetch + no-store     → Dynamic

7️⃣ Combining Server + Client Fetching
Real-world pattern
// Server Component
export default async function Page() {
  const products = await fetchProducts()

  return <ProductClient products={products} />
}

'use client'

export function ProductClient({ products }) {
  const [filtered, setFiltered] = useState(products)
  return <UI />
}


👉 Fetch once on server
👉 Interact on client
👉 Best performance

8️⃣ When to choose what
Scenario	Fetch where?
SEO content	Server
Dashboard	Server
Filters / search	Client
Chat / live data	Client
Auth-based data	Server
9️⃣ Common Mistakes

❌ Fetching everything in useEffect
❌ Using no-store everywhere
❌ Sending secrets to client
❌ Ignoring cache behavior