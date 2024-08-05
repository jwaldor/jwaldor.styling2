import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

type TaskListProps = { initial_tasks: Array<Task> };

function TaskList({ initial_tasks }: TaskListProps) {
  const [tasks, setTasks] = useState(initial_tasks);
  function handleCheckChange(taskId: number) {
    const newTasks = [...tasks];
    let changedTask = newTasks.find((t) => t.id === taskId);
    changedTask!.done = !changedTask!.done;
    newTasks.sort((a, b) => Number(b.done) - Number(a.done));
    setTasks(newTasks);
  }
  console.log("tasks", tasks);
  const allTasks = tasks.map((task: Task) => (
    <Task
      key={task.id}
      title={task.title}
      description={task.description}
      status={task.done}
      handleChange={() => handleCheckChange(task.id)}
    />
  ));
  console.log("all", allTasks);
  return (
    <div className="flex flex-col">
      <div className="text-4xl">Task list</div>
      <div className="text-xs">Sorted by completion</div>
      {allTasks}
    </div>
  );
}

type TaskProps = {
  title: string;
  description: string;
  status: boolean;
  handleChange: Function;
};

function Task({ title, description, status, handleChange }: TaskProps) {
  // todo: state done
  const colorString = status ? "bg-[#E2FFE5]" : "bg-white";
  console.log(status, colorString);
  const twString = `flex flex-row py-2 pr-8 ${colorString} w-[95%] max-w-md rounded-[0.7em] border border-gray-200 mb-4`;
  return (
    <div className={twString}>
      <div className="flex flex-col justify-center">
        <input
          checked={status}
          onChange={() => handleChange()}
          type="checkbox"
          className="appearance-none w-5 h-5 bg-white border border-gray-200 mx-5 checked:bg-[#359845] rounded-[0.25rem]"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="text-md sm:text-lg">{title}</div>
        <div className="text-xs sm:text-sm text-[#7D7D7D]">{description}</div>
      </div>
    </div>
  );
}

export default TaskList;
