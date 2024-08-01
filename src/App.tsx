import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// function Checkbox(){
//   return <>
//   </>
// }

type Task = {
  id: number
  title: string
  description: string
}

type TaskListProps = {
  tasks: Task[]
}


function TaskList({tasks}: TaskListProps){
 console.log(tasks)
 return <>
 <h1>Task list</h1>
 <h3>Sorted by completion</h3>
{tasks.map((task) => {<Task title={task.title}/>})}
 </>
}

type TaskProps = {title:string,description:string}

function Task ({ title, description }: TaskProps) {
  // todo: state done
  const [done,setDone] = useState(false) //bg-[#E2FFE5]
  const colorString = done ? 'bg-[#E2FFE5]' : 'bg-white' 
  console.log(done,colorString)
  const twString = `flex flex-row py-2 pr-8 ${colorString} w-[95%] max-w-md rounded-[0.7em] border border-gray-200`
  return (
    <div className={twString}>
        <div className='flex flex-col justify-center'>
        <input checked={done} onChange={()=>setDone(!done)} type="checkbox" className='appearance-none w-5 h-5 bg-white border border-gray-200 mx-5 checked:bg-[#359845] rounded-[0.25rem]' />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <div className='text-md sm:text-lg'>
            {title}
          </div>
          <div className='text-xs sm:text-sm text-[#7D7D7D]'>
            {description}
          </div>
        </div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const tasks: Task[] = [{title:"Test",description:"description",id:1},{title:"Sweep the Kitchen",description:"Get under the cabinets, do a good job",id:2},{title:"Another one!",description:"Do it!",id:3}]
  return (
    <>
    <div className='bg-red'>
    <div className='w-full min-h-full flex flex-col items-center'>
    <TaskList tasks={tasks}/>
    <div className='my-2'></div>
    <Task />  
    <div className='my-2'></div>
    <Task />
    </div>
      
    </div>
    </>
  )
}

export default App
