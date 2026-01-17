1️⃣ Prevent Unnecessary Re-renders (MOST IMPORTANT)
1. React.memo

Prevents re-render if props don’t change.

const Button = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});


✔️ Use for pure components

2. useCallback

Memoizes functions so child components don’t re-render.

const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);


Use when passing callbacks to memoized children.

3. useMemo

Memoizes expensive calculations.

const total = useMemo(() => {
  return items.reduce((a, b) => a + b.price, 0);
}, [items]);


⚠️ Don’t overuse it.

2️⃣ Optimize State Management
1. Keep state local

❌ Don’t push everything to Redux / Context
✔️ Local state re-renders less

2. Split state
// ❌ bad
const [state, setState] = useState({ a: 1, b: 2 });

// ✔️ better
const [a, setA] = useState(1);
const [b, setB] = useState(2);


Reduces unnecessary updates.

3. Avoid frequent Context updates

Context re-renders all consumers.

✔️ Split contexts
✔️ Memoize provider value

3️⃣ Code Splitting & Lazy Loading
React.lazy + Suspense
const Dashboard = React.lazy(() => import("./Dashboard"));

<Suspense fallback={<Loader />}>
  <Dashboard />
</Suspense>


✔️ Loads only when needed
✔️ Reduces initial bundle size

4️⃣ Virtualization (Large Lists)

Render only what’s visible.

10,000 items → render only 20


Libraries:

react-window

react-virtualized

Huge performance win 💥

5️⃣ Optimize Rendering Patterns
1. Keys in lists (VERY IMPORTANT)
items.map(item => (
  <Item key={item.id} />
));


❌ Avoid index as key (unless static list)

2. Avoid inline functions in JSX (when needed)
// ❌
<button onClick={() => doSomething()} />

// ✔️
<button onClick={handleClick} />

6️⃣ useEffect Optimization
1. Correct dependency array

Wrong deps → infinite renders or stale data.

2. Cleanup effects
useEffect(() => {
  const id = setInterval(() => {}, 1000);
  return () => clearInterval(id);
}, []);


Avoid memory leaks.

7️⃣ Debouncing & Throttling

For:

Search input
Scroll
Resize

const debouncedSearch = useMemo(
  () => debounce(searchFn, 300),
  []
);

Prevents excessive re-renders & API calls.

8️⃣ Avoid Anonymous Objects/Arrays as Props
// ❌
<Component style={{ color: "red" }} />

// ✔️
const style = useMemo(() => ({ color: "red" }), []);


Important when using React.memo.

9️⃣ Use Production Build
npm run build


✔️ Minified
✔️ Optimized
✔️ Faster than dev mode

🔟 Server-side & Framework Optimizations

If using Next.js:

Image optimization (next/image)
Route-based code splitting
Static generation (SSG)
Server components (newer versions)

1️⃣1️⃣ Profiling & Debugging
React DevTools Profiler

Detect slow components

See re-render reasons

Interview-ready one-liners 🔥

Prevent re-renders → memo, useMemo, useCallback
Reduce bundle size → lazy loading
Large lists → virtualization
State placement matters
Context can cause performance issues

Always profile before optimizing

TL;DR (Memory Hook)

R C S L V D

Re-renders control
Code splitting
State placement
Lazy loading
Virtualization
Debounce & throttle