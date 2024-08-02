import { useState } from 'react'
import './App.css'

// function Checkbox(){
//   return <>
//   </>
// }

type imageBoxProps = {
  icon: string
  name:string
}

function ImageBox({icon,name}:imageBoxProps) {
  return <>
  <div>{name}</div>
<div className = "flex clip-circle bg-gray-400 w-[4rem]">
      <img src={`/src/assets/${icon}`}/>
    </div>
  </>
}


type MessageBoxProps = {
  text: string
  role: number
  neighbor: "above" | "below" | "both" | "none"
}

function MessageBox({text,role, neighbor}: MessageBoxProps){
  const colorString = role===0 ? 'bg-[#D8D8D8]' : 'bg-[#74C2FF]'
  let makeBorderSharp = ""
  if (neighbor !== "none"){
    console.log(neighbor + String(role))
    switch(neighbor + String(role)){
      case "above0":
        makeBorderSharp = "rounded-tl-none"
        break
      case "below0":
        makeBorderSharp = "rounded-bl-none"
        break
      case "above1":
        makeBorderSharp = "rounded-tr-none"
        break
      case "below1":
        makeBorderSharp = "rounded-br-none"
        break
      case "both0":
        makeBorderSharp = "rounded-bl-none rounded-tl-none"
        break
      case "both1":
        makeBorderSharp = "rounded-br-none rounded-tr-none"
        break
    }
    console.log(makeBorderSharp)
  }
  const boxSpecs = `flex flex-row py-2 pr-8 w-[60%] max-w-md rounded-[0.45em] mb-4 ${colorString} ${makeBorderSharp}`
  return (
    <div className={boxSpecs}>
        <div className='text-[0.6rem]'>
        {text}
        </div>
    </div>
  )
}

type MessagePicProps = {
  url: string
  name: string
  role: number
}

function MessagePic( {url,name, role}: MessagePicProps){

}
type ConvoMessage = {text:string
role: number
icon: string
key: number
}

type MessageThreadProps = {conversation:ConvoMessage[]}

function MessageThread({conversation}:MessageThreadProps){
  console.log(conversation)
  conversation.map((message:ConvoMessage)=>console.log(message))
  return <>
  <div className = 'flex flex-col'>
    {conversation.map((message:ConvoMessage,index:number) => {
    console.log(message)
    let include_image = false
    if (index === 0){
      include_image = true
    }
    else if(message.role!==conversation[index-1].role){
      include_image = true
    }
    else {
      include_image = false
    }
    const formattedImage = <ImageBox icon={message.icon} name={message.icon}/>
    if (include_image){
      const formattedMessage = 
    }
    return <div className='flex flex-row'>


    </div>
  })}
  </div>
  </>
}


type Task = {
  id: number
  title: string
  description: string
}


function TaskList(){
  const [tasks,setTasks] = useState([{title:"Test",description:"description",id:1,done:false},{title:"Sweep the Kitchen",description:"Get under the cabinets, do a good job",id:2,done:false},{title:"Another one!",description:"Do it!",id:3,done:false}])
  function handleCheckChange(taskId:number){
    const newTasks = [...tasks]
    let changedTask = newTasks.find(t => t.id === taskId)
    changedTask!.done = !changedTask!.done
    newTasks.sort((a,b) => Number(b.done)-Number(a.done))
    setTasks(newTasks)
  }
 console.log("tasks",tasks)
 const allTasks = tasks.map((task) => <Task key = {task.id} title={task.title} description = {task.description} status={task.done} handleChange={() => handleCheckChange(task.id)}/>)
 console.log("all",allTasks)
 return <div className='flex flex-col'>
<div className='text-4xl'>Task list</div>
 <div className='text-xs'>Sorted by completion</div>
{allTasks}
 </div>
 
}

type TaskProps = {title:string,description:string,status:boolean,handleChange:Function}

function Task ({ title, description,status,handleChange}: TaskProps) {
  // todo: state done
  const colorString = status ? 'bg-[#E2FFE5]' : 'bg-white' 
  console.log(status,colorString)
  const twString = `flex flex-row py-2 pr-8 ${colorString} w-[95%] max-w-md rounded-[0.7em] border border-gray-200 mb-4`
  return (
    <div className={twString}>
        <div className='flex flex-col justify-center'>
        <input checked={status} onChange={()=>handleChange()} type="checkbox" className='appearance-none w-5 h-5 bg-white border border-gray-200 mx-5 checked:bg-[#359845] rounded-[0.25rem]' />
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
  const icon0 = ""
  const icon1 = ""
  //: Task[]
  const conversation_ex = [
    {text:"I just completed my first 10k run this morning, and I feel amazing! It was a bit of a struggle towards the end, but pushing through the last kilometer was so rewarding. Now, I'm enjoying a big breakfast to refuel. If anyone wants to join me for a run next week, let me know!",
      role: 1,
      icon: icon1,
      key: 0
    },
    {text:"I'm planning a weekend getaway to the mountains and can't wait to disconnect from the hustle and bustle of city life. I've booked a cozy cabin with a fireplace, and I'm looking forward to some hiking, stargazing, and simply enjoying the peace and quiet.",
      role: 1,
      icon: icon1,
      key: 1
    },
    {text:"I've decided to take up a new hobby and start learning how to play the piano. It's something I've always wanted to do, and I finally signed up for lessons. The first few sessions have been challenging, but I love the feeling of progress with each practice.",
      role: 0,
      icon: icon0,
      key: 2
    },
    {text:"I just completed my first 10k run this morning, and I feel amazing! It was a bit of a struggle towards the end, but pushing through the last kilometer was so rewarding. Now, I'm enjoying a big breakfast to refuel. If anyone wants to join me for a run next week, let me know!",
      role: 1,
      icon: icon1,
      key: 3
    }
  ]

  return (
    <>
    <div className='w-full min-h-full flex flex-col items-center'>
    <TaskList />
    <MessageBox role={0} text={"hello"} neighbor={"none"} />
    <MessageBox role={1} text={"hello"} neighbor={"none"} />
    <MessageBox role={0} text={"hello"} neighbor={"both"} />
    <MessageBox role={1} text={"hello"} neighbor={"both"} />
    <MessageBox role={0} text={"hello"} neighbor={"above"} />
    <MessageBox role={1} text={"hello"} neighbor={"above"} />
    <MessageBox role={0} text={"hello"} neighbor={"below"} />
    <MessageBox role={1} text={"hello"} neighbor={"below"} />
    <ImageBox icon={"b0fbdd8e320622de39475b562ddad56d.png"} name={"Avatar1"}/>
    <div className='my-2'></div>
    <div className='my-2'></div>
    </div>
      
    </>
  )
}

export default App
