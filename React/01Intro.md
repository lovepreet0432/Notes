1️⃣ React – Intro (How to explain in interview)

React is a JavaScript library for building component-based, declarative UIs.

Key ideas
-UI is broken into reusable components
-Uses Virtual DOM for efficient updates
-Unidirectional data flow
-State-driven rendering

React lets us build fast, scalable UIs by efficiently updating only what changes using a virtual DOM.


2️⃣ React Fiber Architecture (VERY IMPORTANT 🔥)
What is Fiber?
Fiber is React’s internal rendering engine, introduced in React 16.
👉 Its main goal is better performance & smoother UI.
Why Fiber was needed?

Old React (Stack Reconciler):
Synchronous
Once rendering starts → can’t stop
Big UI updates = UI freeze 😵
Fiber solves this.
What Fiber does

Breaks rendering work into small units
Can pause, resume, abort, or prioritize work
Enables Concurrent Rendering

Key Fiber features

Incremental rendering
Prioritization (user input > data fetching)
Interruptible rendering
Better error handling
Simple analogy

Old React = one long task 🧱
Fiber = small tasks + scheduler ⏱️

Interview one-liner

React Fiber is the reconciliation engine that allows React to pause, resume, and prioritize rendering work for better performance.


What are React Lifecycle Methods?

Lifecycle methods are different phases a component goes through from:
👉 creation → update → removal

There are 3 main phases:

Mounting → Updating → Unmounting


1️⃣ Mounting Phase (Component is created)
Methods (in order):

constructor()

Initialize state

Bind methods

constructor(props) {
  super(props);
  this.state = { count: 0 };
}


render()

Returns JSX

Must be pure (no side effects)
componentDidMount()
Runs once
Best place for:
API calls
Subscriptions
DOM operations

componentDidMount() {
  fetchData();
}

2️⃣ Updating Phase (Props or state change)

Triggered by:

setState
New props
forceUpdate
Methods:

shouldComponentUpdate()
Performance optimization
Decide whether to re-render

shouldComponentUpdate(nextProps, nextState) {
  return nextState.count !== this.state.count;
}


render()
Re-renders UI
componentDidUpdate()
Runs after update

Good for:

Comparing prev props/state
Conditional API calls

componentDidUpdate(prevProps, prevState) {
  if (prevState.id !== this.state.id) {
    fetchData();
  }
}

3️⃣ Unmounting Phase (Component is removed)
Method:

componentWillUnmount()

Cleanup time 🧹

Remove:
Event listeners
Timers
Subscriptions

componentWillUnmount() {
  clearInterval(this.timer);
}


Lifecycle in Functional Components (Hooks)

👉 Hooks replaced lifecycle methods

Mapping class lifecycle → hooks
Class Lifecycle	Hook Equivalent
constructor	useState
componentDidMount	useEffect(() => {}, [])
componentDidUpdate	useEffect(() => {}, [deps])
componentWillUnmount	cleanup in useEffect
Mount
useEffect(() => {
  fetchData();
}, []);

Update
useEffect(() => {
  console.log("count changed");
}, [count]);


Unmount
useEffect(() => {
  const id = setInterval(() => {}, 1000);

  return () => {
    clearInterval(id);
  };
}, []);


----------------------------------------------------------------

1️⃣ Controlled Components
What are Controlled Components?

A controlled component is a form element whose value is controlled by React state.

👉 React is the single source of truth.

Example
function Form() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

What’s happening?

Input value comes from useState

Every keystroke → state update → re-render

Pros

✅ Easy validation
✅ Easy form submission
✅ Predictable behavior
✅ Better for complex forms

Cons

❌ More re-renders
❌ More boilerplate

When to use controlled components

Login / signup forms

Validations

Dynamic UI updates

When form data affects UI

Interview one-liner

Controlled components are form elements whose value is managed by React state.

2️⃣ Uncontrolled Components
What are Uncontrolled Components?

An uncontrolled component stores its own state in the DOM, not in React.

👉 React accesses the value only when needed.

Example (using useRef)
function Form() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

Pros

✅ Fewer re-renders
✅ Less code
✅ Better performance for simple forms

Cons

❌ Harder validation
❌ Less control
❌ Not reactive

When to use uncontrolled components
Simple forms
File inputs
Third-party integrations
Performance-critical forms

Uncontrolled components rely on the DOM to manage form state instead of React.

------------------------------------------------

What is useRef?

useRef returns a mutable object with a .current property that:
Persists across renders
Does NOT cause re-render when changed

const ref = useRef(initialValue);

How useRef works internally

React creates one object

Same object is reused on every render

Updating ref.current does NOT trigger render
5️⃣ Main Use Cases of useRef

1️⃣ Accessing DOM elements (most common)
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();


Used for:
Focus
Scroll
Measure DOM

2️⃣ Persisting values between renders
const renderCount = useRef(0);

useEffect(() => {
  renderCount.current += 1;
});


👉 State would cause infinite re-render here, ref won’t.