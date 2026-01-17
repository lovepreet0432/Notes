1️⃣ What is Hydration?
Short definition

👉 Hydration is the process where React attaches JavaScript behavior to server-rendered HTML.

Hydration in Next.js is the process where React attaches JavaScript event handlers and state to server-rendered HTML, making the page interactive in the browser.


Step-by-step (what actually happens)
1. Server renders HTML

Next.js runs Server Components and sends ready-made HTML:

<button>0</button>


At this point:

Page is visible
Page is NOT interactive

2. Browser loads JavaScript

React JS bundle downloads
Client Components JS is loaded

3. Hydration starts

React:

Reads existing HTML

Matches it with React component tree

Attaches:

event listeners (onClick)

state

effects

👉 No new HTML is created, React just “wires it up”.

After hydration
<button>0</button>


Now:
✅ Button is clickable
✅ State updates work
✅ Page becomes interactive

Simple analogy 🧠

Server HTML = body

JavaScript = soul

Hydration = soul entering body

2️⃣ Why hydration is needed in Next.js

Next.js uses:

SSR / SSG → fast first paint

CSR → interactivity

Hydration connects both worlds.

3️⃣ When does a Hydration Error occur?
Definition

👉 A hydration error occurs when HTML generated on the server does NOT match what React renders in the browser.

React expects:

<button>0</button>

But browser renders:

<button>1</button>


❌ Mismatch → hydration error

4️⃣ Most Common Causes of Hydration Errors
1️⃣ Using browser-only values during render
'use client'

export default function Page() {
  return <p>{window.innerWidth}</p>
}

Why it fails

Server: window doesn’t exist → different output

Client: real value exists

❌ Mismatch

2️⃣ Using Math.random() or Date.now()
<p>{Math.random()}</p>


Server value ≠ Client value

React sees mismatch

❌ Hydration error

3️⃣ Reading localStorage during render
'use client'

const theme = localStorage.getItem('theme')


Server → no localStorage

Client → value exists

❌ Hydration error

4️⃣ Conditional rendering based on window
if (typeof window !== 'undefined') {
  return <Mobile />
}


Still causes mismatch because:

Server rendered something else

Client rendered differently

5️⃣ Different markup due to environment differences

Examples:

Timezone differences

Locale differences

User agent based rendering

6️⃣ Server vs Client data mismatch
// Server
count = 0

// Client fetch
count = 1

5️⃣ Correct Way to Avoid Hydration Errors
Use useEffect for browser-only logic
'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const [width, setWidth] = useState(null)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  if (!width) return null

  return <p>{width}</p>
}

Use useId() for stable IDs
const id = useId()

Use dynamic import with SSR disabled (if needed)
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map'), {
  ssr: false
})

Use suppressHydrationWarning (last resort)
<p suppressHydrationWarning>{time}</p>

Dynamic import with ssr: false is used to load a component only on the client side when it depends on browser-only APIs or should not be rendered on the server.

⚠️ Hides warning, does NOT fix issue.

6️⃣ How to Debug Hydration Errors

Read the error message carefully

Check first mismatched element

Ask:

Is this value deterministic?

Is it browser-only?

Move logic to useEffect

7️⃣ Interview One-Liner 🔥

“Hydration is the process where React attaches interactivity to server-rendered HTML, and hydration errors occur when the server-generated HTML doesn’t match what React renders in the browser.”

dynamic() with ssr: false — What does it actually do?
Short answer

👉 It tells Next.js:

“Do NOT render this component on the server at all.
Load and render it only in the browser.

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map'), {
  ssr: false
})

export default function Page() {
  return <Map />
}

What happens step by step
1️⃣ On the server

Next.js skips rendering Map

No HTML is generated for it

Server sends a placeholder

Example server HTML:

<div></div>

2️⃣ In the browser

JS loads

Map component is dynamically imported

Component renders only in the browser

👉 No hydration needed for this component
👉 No server/client mismatch possible


Why this exists (real reasons)
1️⃣ Fix hydration errors

If a component:

Uses window, document

Uses localStorage during render

Depends on browser-only APIs

Produces different HTML on client vs server

👉 ssr: false avoids server rendering completely.

2️⃣ Load heavy libraries only in browser

Examples:

Maps (Google Maps, Leaflet)

Charts (Chart.js, D3)

Rich editors (Quill, Draft.js)

This:

Reduces server work

Shrinks initial HTML complexity