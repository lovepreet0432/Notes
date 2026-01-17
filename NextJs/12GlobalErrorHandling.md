Global Error Handling in Next.js (App Router)
What is Global Error Handling?

Global error handling is used to catch critical errors that happen outside normal route boundaries, especially errors in:

layout.tsx

Root rendering

Errors before a route-level error.tsx can catch them

For this, Next.js provides:

app/global-error.tsx

Why do we need global-error.tsx?

Normal error.tsx:

Works per route

Needs a layout to exist

But what if:

Layout itself crashes?

Root rendering fails?

👉 error.tsx won’t work.

That’s where global-error.tsx comes in.

How global-error.tsx works

It is the last fallback

Wraps the entire app

Catches unhandled server + client errors

Replaces the whole UI

Basic example
// app/global-error.tsx
"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went seriously wrong</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>
          Reload App
        </button>
      </body>
    </html>
  );
}

Important rules 🧠

Must be a Client Component

Must return <html> and <body>

No layouts are used here

Difference: error.tsx vs global-error.tsx
Feature	error.tsx	global-error.tsx
Scope	Route segment	Whole app
Catches layout errors	❌	✅
Used for	Page-level errors	App-level crashes
UI replacement	Partial	Full app
Common usage	Very common	Rare but critical
When does global-error.tsx get triggered?

✔ Root layout throws error
✔ Rendering fails before routing
✔ No nearest error.tsx found
✔ Critical hydration failure

Error recovery
Using reset()
<button onClick={reset}>
  Reload
</button>


Re-runs the app

Attempts full recovery

Similar to page refresh

Real-world usage examples

App shell crashes

Auth provider breaks

Environment config missing

Root API failure

Hydration crash at root

Recommended error handling strategy ⭐

Route-level errors → error.tsx

404s → not-found.tsx

Loading states → loading.tsx

Critical app crash → global-error.tsx

Interview-ready definition 🧠

Global error handling in Next.js is implemented using global-error.tsx, which acts as a final fallback to catch critical application-level errors that occur outside route boundaries, including layout and root rendering failures.