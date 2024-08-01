import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Checkbox(){
  return <>
  <input type="checkbox" className='appearance-none w-4 h-4 bg-white border-green-800 mx-5 checked:bg-green-700 rounded-[0.25rem]' />
  </>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex flex-row'>
        <div className='bg-green-200  p-3'>
          <Checkbox/>
        </div>
        <div className='flex flex-col items-start  bg-green-200'>
          <div className='text-xl '>
            Sweep the Kitchen
          </div>
          <div className='text-sm text-gray-400'>
            Get under the cabinets, do a good job
          </div>
        </div>
    </div>

    </>
  )
}

export default App
