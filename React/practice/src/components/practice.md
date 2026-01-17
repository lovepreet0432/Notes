1️⃣ Debounce with API Calls

Problem:
You have a search input. On every keystroke, you want to send a network request only after the user stops typing for 500ms.

Twist:

You also want to cancel any pending API call if the component unmounts.

The input must remain fully responsive while typing.

Think about:

useRef for timer

useEffect cleanup

How to store latest input value

2️⃣ Throttle for Button Click

Problem:
You have a "like" button. You want the user to click multiple times, but the state update should happen at most once every 2 seconds.

Twist:

If the user clicks during the throttle period, the last click should still trigger after the 2s.

Think about:

useRef to track last execution time

setTimeout for deferred execution

Throttle vs debounce differences

3️⃣ Timer Reset on Props Change

Problem:
You have a component that shows a message 5 seconds after it mounts.

If the message prop changes, you want the timer to reset.

Twist:

Must work correctly even if the component unmounts before 5s.

Think about:

useEffect with cleanup

useRef to store timeout ID

Dependency array pitfalls

4️⃣ Auto-increment Counter with Pause

Problem:
Implement a counter that increments every 1 second.

There’s a "pause/resume" button.

The counter should not reset when paused.

Twist:

Make sure it doesn’t create multiple intervals accidentally on re-render.

Think about:

useRef to store interval ID

useEffect for setup/cleanup

Proper dependency array

5️⃣ Stale State Bug Challenge

Problem:
You use setInterval to increment a counter every second:

useEffect(() => {
  setInterval(() => setCount(count + 1), 1000);
}, []);


Question:

Why does this counter never increment past 1?

Fix it without adding count to the dependency array.

Think about:

Closures in JS

useRef to store the latest state

6️⃣ Combined Debounce + Throttle Challenge

Problem:
You need a search input that:

Updates input state immediately

Sends API requests debounced by 500ms

Ensures API requests are throttled to at most 1 per second

Twist:

Use only React hooks + native JS, no lodash.

Think about:

Two separate timers (debounceRef, throttleRef)

Edge cases where typing is very fast

7️⃣ Dynamic Interval Challenge

Problem:
Implement a component that prints time remaining every second.

The interval speed can change dynamically via a slider (e.g., 1s → 0.5s → 2s).

Twist:

Interval must update without creating multiple intervals.

Think about:

useRef to store interval ID

useEffect cleanup

Dependencies vs refs

8️⃣ Event Listener + Debounce

Problem:
Add a window.resize listener that logs the window width debounced by 300ms.

Twist:

Must clean up correctly on unmount

Must ensure listener is never recreated unnecessarily

Think about:

useEffect for adding/removing listener

useRef for debounced function

useCallback if needed

9️⃣ Delayed Form Submission

Problem:
You have a form. When a user clicks “submit”:

Show a spinner for 3 seconds

Then mark the form as submitted

Twist:

If the user clicks again during spinner, it should restart the 3-second timer

Think about:

useRef for timeout

Handling multiple clicks safely

Cleanup on unmount

10️⃣ Fun “Cursor Jump” Trap

Problem:
You debounce updating the state of a controlled <input>:

<input value={input} onChange={debouncedHandleChange} />


Question:

Why does the cursor sometimes jump to the end or behave weirdly?

Fix it without removing debounce

Think about:

Controlled input vs debounced state

Storing value vs updating value