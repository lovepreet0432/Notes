🔹 Scenario Clarification

“I have an API and I don’t want to call it on every reload. I want to call it once.”

In Next.js, this usually means:

Avoid refetching on page reload

Use caching / static generation

✅ BEST ANSWER (Next.js 13 – App Router)
🟢 Use Server Component + cached fetch (Default behavior)
// app/page.js (Server Component)
export default async function Page() {
  const data = await fetch("https://api.example.com/data");

  return <div>{data.title}</div>;
}


👉 By default:

Next.js caches this request

API is called only once

Subsequent reloads use cached data

🔥 This is the interview-perfect answer

🔹 If Data Should Update Occasionally (ISR)
fetch("https://api.example.com/data", {
  next: { revalidate: 3600 }, // 1 hour
});


API called again after 1 hour

Not on every reload

❌ What NOT to do (Common Mistake)
"use client";
useEffect(() => {
  fetchData();
}, []);


❌ This runs on every page reload
❌ Bad for SEO & performance

🔹 Client Component Case (When You Must Use Client)
Option 1: LocalStorage
useEffect(() => {
  const cached = localStorage.getItem("data");

  if (cached) {
    setData(JSON.parse(cached));
  } else {
    fetch("/api/data")
      .then(res => res.json())
      .then(res => {
        setData(res);
        localStorage.setItem("data", JSON.stringify(res));
      });
  }
}, []);


⚠️ Only for non-sensitive data

Option 2: React Query / SWR (Best Client Solution)
useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  staleTime: Infinity,
});


Fetches once

Cached across reloads

Industry standard

🔥 Interviewers love this

🔹 Pages Router (Old Style)
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}


Called once at build time

🔹 Summary (Say This in Interview)

“In Next.js 13 App Router, server-side fetch is cached by default, so the API is called once and reused across reloads. If needed, I use ISR with revalidate or client-side caching using React Query.”