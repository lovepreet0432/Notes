import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (timer.current) return;
    timer.current = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);
      return () => {
      clearInterval(timer.current); // cleanup
    };
  }, []);
  const handleClick = () => {
    if (timer.current) return;
    timer.current = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);
  }

  const handleStop = () => {
    clearInterval(timer.current);
    timer.current = null;
  }

  return (
    <>
      {counter}
      <button onClick={handleClick}>Start</button>
      <button onClick={handleStop}>Stop</button>

    </>
  )
}

export default App
