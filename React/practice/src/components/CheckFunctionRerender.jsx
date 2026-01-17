
import { useState, useRef } from "react";
import { useCallback } from "react";
function App() {
  const [count, setCount] = useState(0);
  const prevFnRef = useRef(null);

  const myFunction = () => {
    console.log("Hello");
  };

  if (prevFnRef.current) {
    console.log(
      prevFnRef.current === myFunction
        ? "🟢 Same function instance"
        : "🔴 New function instance"
    );
  }
  console.log(myFunction,'myFunciton')
  prevFnRef.current = myFunction;

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Update State
      </button>
    </div>
  );
}

export default App;
