1️⃣ layout.js (Layout File)
What is layout.js?

layout.js is a persistent wrapper for pages inside a route segment.

📌 It does not re-render on navigation (unless data changes).

Example
app/
 ├─ layout.js        ← root layout
 ├─ page.js
 └─ dashboard/
     ├─ layout.js    ← dashboard layout
     └─ page.js

Root layout (required)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

Why layout exists?

✔ Shared UI (navbar, sidebar)
✔ Better performance
✔ State preserved (no remount)

2️⃣ Metadata (SEO, title, description)

Next.js handles metadata on the server.

Static Metadata
export const metadata = {
  title: "Blog Page",
  description: "All blogs here"
}


📌 Runs at build time for static pages

Dynamic Metadata
export async function generateMetadata({ params }) {
  return {
    title: `Blog ${params.id}`
  }
}


📌 Runs on the server per request

Why metadata is powerful in Next?

No client JS
SEO friendly
Faster TTFB

3️⃣ 404 Page (not-found.js)
Create a 404 page
app/
 └─ not-found.js

export default function NotFound() {
  return <h2>Page not found 😢</h2>
}

How it works?

Automatically shown for invalid routes

Server-rendered

SEO safe (returns 404 status)

4️⃣ notFound() function

Used when data is missing.

Example
import { notFound } from 'next/navigation'

export default async function Blog({ params }) {
  const blog = await getBlog(params.id)

  if (!blog) {
    notFound()
  }

  return <h1>{blog.title}</h1>
}

What happens?

Stops execution
Shows not-found.js
Sends proper 404 HTTP status

🔥 Much better than redirecting manually

5️⃣ usePathname()
What is it?

Client-side hook to get current URL path.

'use client'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  return <p>Current path: {pathname}</p>
}

Common use cases

✔ Active menu highlight
✔ Conditional UI
✔ Breadcrumbs

📌 Client component only

6️⃣ Private folders (underscore _ folders)
What are private folders?
Folders starting with _ are not included in routing.

Example
app/
 ├─ _components/
 │   └─ Navbar.js
 ├─ page.js


URL ❌ /components
File used internally ✔

Why use them?

Organize code
Avoid accidental routes

Clean URLs

7️⃣ What is %5f ? (VERY IMPORTANT)

%5f = URL encoded value for _ (underscore)

_  → %5f

Why does Next.js block this?

If someone tries:

/_components


Browser encodes it as:

/%5fcomponents


Next.js blocks access to prevent:

Private folder exposure
Internal logic leaks
Security issues

Result

❌ 404
✔ Folder stays private

8️⃣ Quick Comparison Table
Feature	Purpose
layout.js	Persistent UI
metadata	SEO
not-found.js	Custom 404
notFound()	Programmatic 404
usePathname()	Get current route
_folder	Private routing
%5f	Encoded underscore