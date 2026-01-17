import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const timerRef = useRef(null);

  const handleChange = useCallback((e) => {
    clearTimeout(timerRef.current);
    timerRef.current=setTimeout(()=>{
      setInput(e.target.value)
    },2000);
  },[]);

  return (
    <div>
      <input type='text' onChange={handleChange} />
      {input}
    </div>
  )
}

export default App
