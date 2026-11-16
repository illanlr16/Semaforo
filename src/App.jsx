import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mt-5">
      <Semaforo></Semaforo>
    </div>
  )
}

export default App
