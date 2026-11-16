import { useState } from 'react'
import './App.css'
import Semaforo from './components/Semaforo'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mt-5 cajonSemaforo">
      <Semaforo></Semaforo>
    </div>
  )
}

export default App
