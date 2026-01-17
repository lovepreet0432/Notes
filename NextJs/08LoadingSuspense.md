1️⃣ Handling Loading State in Next.js
loading.js
What is loading.js?

loading.js is a special file in Next.js App Router used to show a loading UI automatically while a route or segment is fetching data.

📁 Example folder structure:

app/
 └─ dashboard/
     ├─ page.js
     ├─ loading.js

Example: loading.js
export default function Loading() {
  return <h2>Loading dashboard...</h2>
}

What happens behind the scenes?

User navigates to /dashboard

Server starts fetching data

loading.js is shown immediately

Once data is ready → page.js replaces it

💡 You don’t write any state logic — Next.js handles it.

Key points about loading.js

✔ Route-level loading
✔ Works automatically
✔ Streaming-friendly
✔ No useState or useEffect

2️⃣ loading.js vs Suspense

This is where people get confused — so let’s simplify.

🧠 Mental Model
Feature	loading.js	Suspense
Scope	Whole route	Specific component
Setup	File-based	Code-based
Best for	Page-level loading	Partial UI loading
Control	Low	High


3️⃣ When to use loading.js

Use it when:

Whole page depends on data

You want simple global loading

Route transition loading

Layout-level loading

Example
/dashboard → show spinner until everything loads


✔ Clean
✔ Zero code
✔ Perfect default

4️⃣ When to use Suspense

Use it when:

Page has multiple sections

Some data is slow

You want partial rendering

You want better UX

Example: Suspense
import { Suspense } from 'react'
import Posts from './Posts'

export default function Page() {
  return (
    <>
      <h1>Dashboard</h1>

      <Suspense fallback={<p>Loading posts...</p>}>
        <Posts />
      </Suspense>
    </>
  )
}

// Posts.js (Server Component)
export default async function Posts() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  return posts.map(p => <p key={p.id}>{p.title}</p>)
}

What user sees

Page heading loads instantly

Only posts section waits

Better perceived performance 🚀

5️⃣ Can we use both together?

👉 YES (and this is common)

loading.js → route-level fallback

Suspense → component-level fallback

6️⃣ Parallel Data Fetching (IMPORTANT)
Problem: Sequential fetching ❌
const user = await fetchUser()
const posts = await fetchPosts()


⏳ Total time = user + posts

7️⃣ Parallel Fetching (Correct Way)
const userPromise = fetchUser()
const postsPromise = fetchPosts()

const [user, posts] = await Promise.all([
  userPromise,
  postsPromise
])


⏱ Total time = max(user, posts)

🔥 Faster page load

8️⃣ Parallel Fetching with Suspense (Next.js style)
export default function Page() {
  return (
    <>
      <Suspense fallback={<p>Loading user...</p>}>
        <User />
      </Suspense>

      <Suspense fallback={<p>Loading posts...</p>}>
        <Posts />
      </Suspense>
    </>
  )
}


Each component:

Fetches independently

Renders when ready

Streams to browser

9️⃣ Real-world Example

E-commerce page

Header → instant

Product list → slow

Recommendations → slower

<Suspense fallback={<Skeleton />}>
  <ProductList />
</Suspense>

<Suspense fallback={<Skeleton />}>
  <Recommendations />
</Suspense>

10️⃣ Interview Gold ✨
Q: Difference between loading.js and Suspense?

loading.js handles route-level loading automatically, while Suspense gives fine-grained control to load parts of the UI independently.

Q: Why parallel fetching?

To reduce total page load time by fetching independent data simultaneously.

Final Summary (Lock this 🔒)
loading.js → whole page loading
Suspense   → partial loading
Promise.all → faster fetch