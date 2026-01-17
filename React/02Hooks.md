What is useState?
useState is a React Hook that lets a functional component store and update local state.

👉 State = data that changes over time and causes UI to re-render.

Basic syntax
const [state, setState] = useState(initialValue);

2️⃣ What are Props?

Props (properties) are read-only data passed from parent → child component.

👉 Props help components communicate.

Example
function Child({ name }) {
  return <h2>Hello {name}</h2>;
}

function Parent() {
  return <Child name="Lovepreet" />;
}


name is a prop
Child cannot modify props ❌
Key characteristics of Props
Immutable (read-only)
Passed as function parameters
Used to make components reusable


What is Context API?
Context API is a React feature that lets you share data globally without passing props manually at every level.

👉 It mainly solves prop drilling.

What is Prop Drilling?
Passing props through components that don’t need them, just to reach a deep child.

App → Layout → Sidebar → Profile

Only Profile needs the data, but everyone receives it 😵

Why Context API?
Avoid prop drilling
Share common data like:
-Auth user
-Theme (dark/light)
Language
App settings

How Context API works (3 steps)
1️⃣ Create Context
import { createContext } from "react";

const UserContext = createContext();

2️⃣ Provide Context (Provider)

Wrap the component tree.

function App() {
  const user = { name: "Lovepreet" };

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

3️⃣ Consume Context (useContext)
import { useContext } from "react";

function Profile() {
  const user = useContext(UserContext);
  return <h1>{user.name}</h1>;
}

Data Flow in Context
Provider (value)
     ↓
Any deeply nested component


No middle component involvement 🎯

Context with State (REAL WORLD USE)
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


Consume it:

const { theme, setTheme } = useContext(ThemeContext);

When Context Re-renders (IMPORTANT ⚠️)

❗ Every time the Provider value changes,
👉 ALL consuming components re-render

Even if they use only part of the value.

How to optimize Context
1️⃣ Split contexts
AuthContext
ThemeContext

2️⃣ Memoize value
const value = useMemo(() => ({ user, setUser }), [user]);

3️⃣ Avoid frequently changing data

❌ mouse position
❌ typing input


Common interview questions
❓ Is Context a state management tool?
❌ No
✔️ It’s a state sharing mechanism

❓ Can Context replace Redux?

❌ Not for large apps
✔️ Good for auth, theme, settings

❓ Why Context causes performance issues?

Because all consumers re-render when value changes.

Real-world examples

AuthContext → logged-in user

ThemeContext → dark/light mode

LanguageContext → i18n

One-liner interview answer

Context API helps share global data across components without prop drilling, but should be used carefully due to re-rendering behavior.


--------------------------------------------------------------------


🔁 What is this cleanup function?
return () => {
  clearInterval(timer.current);
};


This function is called by React, not by you.

It is the cleanup function of useEffect.

⏰ When does cleanup run?
✅ 1️⃣ When the component unmounts

Example:

You navigate to another page

Component is removed from DOM

👉 React runs cleanup before destroying the component

📌 Purpose:

Stop timers
Cancel API calls
Remove event listeners

✅ 2️⃣ Before the effect runs again

If your effect has dependencies:

useEffect(() => {
  // setup
  return () => {
    // cleanup
  };
}, [count]);


Flow:

render → effect → cleanup → effect → cleanup → ...


React cleans up the previous effect before running the new one.

⚠️ In your case ([] dependency array)
useEffect(() => {
  timer.current = setInterval(...);

  return () => {
    clearInterval(timer.current);
  };
}, []);

Timeline:
Component mounts
→ effect runs (interval starts)

Component stays mounted
→ effect does NOT rerun

Component unmounts
→ cleanup runs (interval cleared)


So here, cleanup runs only once, at unmount.

🧠 Why cleanup is critical (real problem)

Without cleanup:

Interval keeps running
State updates on unmounted component
Memory leaks
Console warning:

Can't perform a React state update on an unmounted component

⚛️ React Strict Mode (important 🔥)

In development, React does this:

mount → effect → cleanup → effect


WHY?
To detect unsafe side effects

So you might see:

Interval starting
Immediately stopping
Starting again

👉 This is normal in dev only
Production runs effect once

🧪 Visual example (simple)
useEffect(() => {
  console.log("Effect started");

  return () => {
    console.log("Cleanup called");
  };
}, []);

Console output (StrictMode):
Effect started
Cleanup called
Effect started

🎯 What should go in cleanup?

✅ Things you must clean:

setInterval, setTimeout

addEventListener
WebSocket connections
Subscriptions
Observers