import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function useDebounce(fn, delay) {
  const timer = useRef(null);

  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function App() {

  const handleChange = (e) => {
    console.log(e.target.value);
  }

  const debounceHandler = useDebounce(handleChange, 500);

  return (
    <>
      <form>
        <input onChange={(e) => debounceHandler(e)} />
      </form>
    </>
  )
}

export default App
