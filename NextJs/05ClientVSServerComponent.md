Client vs Server Components (Next.js 13+ App Router)
1️⃣ Server Components
What they are

Default in Next.js

Executed only on the server

Never shipped to the browser

// app/page.js (Server Component by default)
export default async function Page() {
  console.log("SERVER ONLY");
  return <h1>Hello</h1>;
}

Key points

✅ Run on server only
✅ Can access DB, secrets, internal APIs
✅ Smaller JS bundle
❌ No browser APIs
❌ No interactivity

What happens if you use browser-only things?
window.localStorage
useState()
onClick


❌ Not allowed in Server Components

Next.js will throw an error at build time.

2️⃣ Client Components
What they are

Components marked with:

'use client'

Important correction (very important 👇)

❌ “Client components are executed on server first and then on client”

✅ Correct statement

Client Components are:

Rendered on the server (for HTML)

Executed in the browser (for interactivity)

The JS code runs only in the browser, not on the server.

Example
'use client'

import { useState } from 'react'

export default function Counter() {
  console.log("CLIENT");

  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}

What happens

Server generates HTML

Browser receives HTML

JS bundle is downloaded

Component hydrates

console.log runs in browser

👉 Server does not run useState or onClick

3️⃣ Why we need Client Components

Whenever you need:

useState, useEffect

onClick, onChange

window, document

localStorage, sessionStorage

Browser-only APIs

👉 You must use a Client Component.

4️⃣ About typeof window !== 'undefined'
This is a React habit, NOT a Next.js solution
if (typeof window !== 'undefined') {
  localStorage.getItem('token')
}


⚠️ This does NOT make a Server Component safe

Why?
Server Components are not allowed to reference browser APIs at all
Next.js blocks it before runtime

✅ Correct approach
'use client'

useEffect(() => {
  localStorage.getItem('token')
}, [])

5️⃣ “Next.js ignores useState and onClick on server”
Clarification

Server never executes useState, onClick
Server just outputs HTML

React attaches events during hydration

So nothing is “ignored” — it’s never run there

6️⃣ How code is sent to the browser
Server Components

❌ Code is NOT sent
✅ Only HTML + RSC payload

Client Components

✅ JS code is bundled
✅ Sent to browser
✅ Visible in Network tab

You can see:

/_next/static/chunks/*.js

7️⃣ Server + Client Together (Real Example)
// Server Component
import Counter from './Counter'

export default function Page() {
  return (
    <>
      <h1>Server Content</h1>
      <Counter />
    </>
  )
}

// Counter.js
'use client'

export default function Counter() {
  return <button>Click</button>
}

What happens

Server renders page

Counter HTML is included

Counter JS is sent

Button becomes interactive

8️⃣ Comparison Table (Interview Gold)
Feature	Server Component	Client Component
Runs on server	✅	❌
Runs in browser	❌	✅
Access DB / secrets	✅	❌
useState / useEffect	❌	✅
Browser APIs	❌	✅
JS sent to client	❌	✅
9️⃣ One-Line Interview Answer 🔥

“In Next.js 13, Server Components run only on the server and never ship JS, while Client Components are rendered on the server for HTML but execute in the browser for interactivity.”

10️⃣ Final Mental Model (Remember This Forever)
Server Component → Data + HTML
Client Component → Interactivity + Browser APIs