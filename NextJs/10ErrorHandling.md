Error Handling in Next.js Server Components

In the App Router, Next.js has a file-based error handling system.

You don’t use try/catch everywhere in JSX.
Instead, Next.js catches errors for you and shows special UI.

1️⃣ How errors happen in Server Components

Common reasons:

API fails

Database error

throw new Error()

Invalid data

fetch() fails

// Server Component
export default async function Page() {
  const res = await fetch("https://api.example.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return <div>Users</div>;
}


⬆️ This error is caught by Next.js automatically.

2️⃣ error.tsx – Main Error Boundary

To handle errors, create:

app/error.tsx


or inside any route folder.

Example
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

Important points 🧠

error.tsx must be a client component

It catches server + client component errors

reset() re-tries rendering

3️⃣ Recovering from Errors (Very Important ⭐)
Use reset()

When user clicks Try Again:

Server component re-runs

Data refetches

Page recovers

<button onClick={() => reset()}>
  Retry
</button>


This is how you recover from server errors.

4️⃣ Error handling in Nested Routes

Each route segment can have its own error boundary.

Folder structure
app/
 ├── dashboard/
 │    ├── error.tsx
 │    ├── page.tsx
 │    └── settings/
 │         ├── error.tsx
 │         └── page.tsx
 └── error.tsx

How it works
Error location	Which error UI shows
dashboard/page.tsx	dashboard/error.tsx
settings/page.tsx	settings/error.tsx
No local error	Nearest parent error
No parent	app/error.tsx

👉 Errors bubble up until an error.tsx is found.

5️⃣ Partial UI still works (Big advantage)

If settings crashes:

Dashboard layout stays

Only settings area shows error UI

This is called error isolation.

6️⃣ Handling expected errors (optional pattern)

Sometimes you don’t want full error UI.

export default async function Page() {
  try {
    const data = await fetchData();
    return <Data data={data} />;
  } catch {
    return <p>Failed to load data</p>;
  }
}


⚠️ Use this only for expected errors
Real crashes → use error.tsx

7️⃣ Special error files (notes friendly)
File	Purpose
error.tsx	Catch runtime errors
not-found.tsx	404 handling
loading.tsx	Loading state
global-error.tsx	Errors outside layout
8️⃣ Interview-ready definition 🧠

Next.js handles server component errors using file-based error boundaries (error.tsx) that catch runtime failures and allow recovery using the reset() function, even in nested routes.