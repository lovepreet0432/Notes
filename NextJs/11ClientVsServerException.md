Client-Side vs Server-Side Exceptions in Next.js

In Next.js (App Router), errors can happen in two places:

Server Side (Server Components / server code)

Client Side (Client Components / browser code)

They are handled differently.

1️⃣ Server-Side Exceptions (Server Components)
What are they?

Errors that occur on the server before HTML is sent.

Common causes

API failure

Database error

Invalid response from fetch

Throwing an error in a Server Component

Using process.env incorrectly

// Server Component
export default async function Page() {
  const res = await fetch("https://api.example.com/data");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return <div>Data</div>;
}

How Next.js handles it

Error is caught by error.tsx

Page rendering stops

Fallback UI is shown

How to resolve server-side exceptions ✅
1. Use error.tsx
"use client";

export default function Error({ error, reset }) {
  return (
    <>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </>
  );
}

2. Validate responses
if (!res.ok) throw new Error("API failed");

3. Use try/catch for expected failures
try {
  const data = await fetchData();
  return <Data data={data} />;
} catch {
  return <p>Failed to load</p>;
}

2️⃣ Client-Side Exceptions (Client Components)
What are they?

Errors that occur in the browser after hydration.

Common causes

undefined access

window usage errors

State bugs

Event handler crashes

Third-party JS issues

"use client";

export default function Button() {
  const user = null;
  return <button onClick={() => user.name}>Click</button>;
}


⬆️ This crashes in the browser.

How Next.js handles it

React error boundary catches it

error.tsx is shown

Server is not re-executed automatically

How to resolve client-side exceptions ✅
1. Defensive coding
user?.name

2. Local try/catch in handlers
const handleClick = () => {
  try {
    riskyCode();
  } catch (e) {
    console.error(e);
  }
};

3. Use error.tsx

Works for both server & client errors.

3️⃣ Key Differences (Notes-ready table)
Topic	Server-Side Exception	Client-Side Exception
Where it happens	Server	Browser
Before HTML sent	✅	❌
Uses browser APIs	❌	✅
Affects SEO	✅	❌
Handled by	error.tsx	error.tsx
Recoverable with reset()	✅	Partial
Debug via	Server logs	Browser console
4️⃣ Error recovery difference (important ⭐)
Server error recovery

reset() re-runs server component

Refetches data

Full recovery possible

Client error recovery

reset() re-mounts component

State resets

Bug must be fixed in code

5️⃣ Nested routes behavior

Client or server error

Nearest error.tsx handles it

Parent layout stays alive

Only failed route is replaced

6️⃣ Interview-ready answer 🧠

Server-side exceptions occur during data fetching or rendering on the server and are handled using Next.js error boundaries like error.tsx, with full recovery using reset().
Client-side exceptions happen in the browser after hydration due to UI or state issues and are resolved using defensive coding, local try/catch, and error boundaries.