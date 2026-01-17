import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const timerRef = useRef(0);

  const handleChange = useCallback((e) => {
    let last=Date.now();
    if(last-timerRef.current>=2000)
    {
         setInput(e.target.value);
         timerRef.current=Date.now();
    }
  },[]);

  return (
    <div>
      <input type='text' onChange={handleChange} />
      {input}
    </div>
  )
}

export default App
