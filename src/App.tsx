import { useState } from "react";
import "./App.css";
import { Heart, MessageSquare } from "lucide-react";

// function Checkbox(){
//   return <>
//   </>
// }

type imageBoxProps = {
  icon: string;
  name: string;
};

function ImageBox({ icon, name }: imageBoxProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="text-[#F7F7F7] text-xs">{name}</div>
        <div className="flex clip-circle bg-gray-400 w-[4rem]">
          <img src={`/src/assets/${icon}`} />
        </div>
      </div>
    </>
  );
}

type MessageBoxProps = {
  text: string;
  isCurrentUser: boolean;
  neighbor: "above" | "below" | "both" | "none";
};

function MessageBox({ text, isCurrentUser, neighbor }: MessageBoxProps) {
  const colorString = isCurrentUser ? "bg-[#D8D8D8]" : "bg-[#74C2FF]";
  let makeBorderSharp = "";
  if (neighbor !== "none") {
    console.log(neighbor + String(isCurrentUser));
    switch (neighbor + String(isCurrentUser)) {
      case "abovetrue":
        makeBorderSharp = "rounded-tl-none";
        break;
      case "belowtrue":
        makeBorderSharp = "rounded-bl-none";
        break;
      case "abovefalse":
        makeBorderSharp = "rounded-tr-none";
        break;
      case "belowfalse":
        makeBorderSharp = "rounded-br-none";
        break;
      case "bothtrue":
        makeBorderSharp = "rounded-bl-none rounded-tl-none";
        break;
      case "bothfalse":
        makeBorderSharp = "rounded-br-none rounded-tr-none";
        break;
    }
    console.log(makeBorderSharp);
  }
  const boxSpecs = `flex flex-row py-2 pr-8 rounded-[0.45em] mb-2 mr-4 ml-4 w-[70%] ${colorString} ${makeBorderSharp}`;
  return (
    <div className={boxSpecs}>
      <div className="text-[0.6rem] mt-1 ml-2">{text}</div>
    </div>
  );
}

type MessageGroupProps = { messagegroup: ConvoMessage[] };

function MessageGroup({ messagegroup }: MessageGroupProps) {
  console.log("messagegroup", messagegroup);
  let neighbors = messagegroup.map((message: ConvoMessage, index: number) => {
    console.log("neighbors", message);
    console.log(message.isCurrentUser);
    if (messagegroup.length === 1) {
      return "none";
    } else if (index === 0) {
      if (message.isCurrentUser === messagegroup[1].isCurrentUser) {
        return "below";
      } else {
        return "none";
      }
    } else if (index === messagegroup.length - 1) {
      if (
        message.isCurrentUser ===
        messagegroup[messagegroup.length - 2].isCurrentUser
      ) {
        return "above";
      } else {
        return "none";
      }
    } else {
      if (
        message.isCurrentUser === messagegroup[index - 1].isCurrentUser &&
        message.isCurrentUser === messagegroup[index + 1].isCurrentUser
      ) {
        return "both";
      } else if (
        message.isCurrentUser === messagegroup[index].isCurrentUser &&
        message.isCurrentUser === messagegroup[index + 1].isCurrentUser
      ) {
        return "below";
      } else if (
        message.isCurrentUser === messagegroup[index].isCurrentUser &&
        message.isCurrentUser === messagegroup[index - 1].isCurrentUser
      ) {
        return "above";
      } else {
        return "none";
      }
    }
  });

  const isCurrentUser = messagegroup[0].isCurrentUser;

  const leftOrRightCname = isCurrentUser
    ? "justify-end items-end"
    : "justify-start items-start";

  return (
    <>
      <div id="message-group" className={`flex flex-col ${leftOrRightCname}`}>
        {messagegroup.map((message: ConvoMessage, index: number) => {
          let include_image = false;
          if (index === 0) {
            include_image = true;
          } else if (
            message.isCurrentUser !== messagegroup[index - 1].isCurrentUser
          ) {
            include_image = true;
          } else {
            include_image = false;
          }
          const FormattedImage = ({}) => (
            <>
              <div className="flex flex-col">
                <ImageBox icon={message.icon} name={message.userName} />
              </div>
            </>
          );

          //if we are including image and we are the right-hand user...
          const BaseMessage = ({}) => (
            <MessageBox
              text={message.text}
              isCurrentUser={message.isCurrentUser}
              neighbor={neighbors[index]}
            />
          );
          console.log(BaseMessage);
          let formattedMessage = <div>error</div>;
          if (include_image && !message.isCurrentUser) {
            formattedMessage = <BaseMessage />;
          }
          //and the other cases...
          else if (!include_image && !message.isCurrentUser) {
            formattedMessage = <BaseMessage />;
          } else if (include_image && message.isCurrentUser) {
            formattedMessage = <BaseMessage />;
          }
          if (!include_image && message.isCurrentUser) {
            formattedMessage = (
              <div className="flex flex-row">
                {" "}
                <BaseMessage />{" "}
              </div>
            );
          }

          const leftAvatar = include_image && !isCurrentUser;
          const rightAvatar = include_image && isCurrentUser;

          return (
            <>
              <div className={`flex flex-1 ${leftOrRightCname}`}>
                {leftAvatar && (
                  <ImageBox
                    icon={"b0fbdd8e320622de39475b562ddad56d.png"}
                    name={"Avatar1"}
                  />
                )}
                {formattedMessage}
                {rightAvatar && (
                  <ImageBox
                    icon={"b0fbdd8e320622de39475b562ddad56d.png"}
                    name={"Avatar1"}
                  />
                )}
              </div>
            </>
          );
        })}
      </div>
      {/* for the photo */}
      <div className="flex flex-col"></div>
    </>
  );
}

type MessagePicProps = {
  url: string;
  name: string;
  role: number;
};

function MessagePic({ url, name, role }: MessagePicProps) {}

type ConvoMessage = {
  id: number;
  text: string;
  isCurrentUser: boolean;
  icon: string;
  userName: string;
};

type MessageThreadProps = { conversation: ConvoMessage[] };

function MessageThread({ conversation }: MessageThreadProps) {
  console.log("conversation", conversation);
  conversation.map((message: ConvoMessage) => console.log(message));
  const groupedconvo: ConvoMessage[][] = [];
  conversation.forEach((amessage) => {
    if (groupedconvo.length === 0) {
      groupedconvo.push([conversation[0]]);
    } else if (
      groupedconvo[groupedconvo.length - 1][0].isCurrentUser ===
      amessage.isCurrentUser
    ) {
      groupedconvo[groupedconvo.length - 1].push(amessage);
    } else {
      groupedconvo.push([amessage]);
    }
  });

  //
  console.log("groupedconvo", groupedconvo);
  return (
    <>
      <div className="flex flex-col w-[90%]">
        {groupedconvo.map((group) => (
          <MessageGroup messagegroup={group} />
        ))}
      </div>
    </>
  );
}

type Task = {
  id: number;
  title: string;
  description: string;
};

function TaskList() {
  const [tasks, setTasks] = useState([
    { title: "Test", description: "description", id: 1, done: false },
    {
      title: "Sweep the Kitchen",
      description: "Get under the cabinets, do a good job",
      id: 2,
      done: false,
    },
    { title: "Another one!", description: "Do it!", id: 3, done: false },
  ]);
  function handleCheckChange(taskId: number) {
    const newTasks = [...tasks];
    let changedTask = newTasks.find((t) => t.id === taskId);
    changedTask!.done = !changedTask!.done;
    newTasks.sort((a, b) => Number(b.done) - Number(a.done));
    setTasks(newTasks);
  }
  console.log("tasks", tasks);
  const allTasks = tasks.map((task) => (
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

type PostProps = {
  name: string;
  icon: string;
  group: string;
  time: number;
  description: string;
  likes: number;
  comments: number;
};

function Post({
  name,
  icon,
  group,
  time,
  description,
  likes,
  comments,
}: PostProps) {
  return (
    <>
      <div className="w-[90%] max-w-sm border border-zinc-400 rounded-md p-2 flex flex-row font-light">
        <div className="flex flex-row">
          <div className="rounded-full w-10 h-10 bg-red-200"></div>
          <div className="mr-2"></div>
        </div>
        <div className="w-[80%] self-end mr-6">
          <div className="text-xs">
            <div>
              Helena <span className="text-zinc-400">in Group name</span>
            </div>
            <div className="text-zinc-400">3 minutes ago</div>
          </div>
          <img
            className="aspect-square object-cover rounded-md border border-gray-200 my-2"
            src="https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-99573-1490908.jpg&fm=jpg"
          ></img>
          <div className="text-zinc-800">Post description</div>
          <div className="my-3"></div>
          <div className="text-zinc-800 flex flex-row text-sm">
            <div className="flex flex-row items-center">
              <Heart className="mr-1"></Heart> 21 likes
            </div>
            <span className="mx-2"></span>
            <div className="flex flex-row items-center">
              <MessageSquare className="mr-1"></MessageSquare> 4 comments
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HeatGrid({}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="background bg-blue-300 aspect-square w-[2.3rem] m-1">
          box1
        </div>
        <div className="background bg-blue-300 aspect-square w-[2.3rem] m-1">
          box2
        </div>
        <div>box3</div>
        <div>box4</div>
        <div>box5</div>
      </div>
      <span></span>
      <div className="flex flex-col">
        <div className="background bg-blue-300 aspect-square w-[2.3rem] m-1">
          box1
        </div>
        <div className="background bg-blue-300 aspect-square w-[2.3rem] m-1">
          box2
        </div>
        <div>box3</div>
        <div>box4</div>
        <div>box5</div>
      </div>
    </>
  );
}

function App() {
  const icon0 = "c3fa630880a17b97a1f864fb528f0aa2.png";
  const icon1 = "b0fbdd8e320622de39475b562ddad56d.png";
  //: Task[]
  const conversation_ex = [
    {
      text: "I just completed my first 10k run this morning, and I feel amazing! It was a bit of a struggle towards the end, but pushing through the last kilometer was so rewarding. Now, I'm enjoying a big breakfast to refuel. If anyone wants to join me for a run next week, let me know!",
      isCurrentUser: false,
      icon: icon1,
      id: 0,
      userName: "Jill",
    },
    {
      text: "I'm planning a weekend getaway to the mountains and can't wait to disconnect from the hustle and bustle of city life. I've booked a cozy cabin with a fireplace, and I'm looking forward to some hiking, stargazing, and simply enjoying the peace and quiet.",
      isCurrentUser: false,
      icon: icon1,
      id: 1,
      userName: "Jill",
    },
    {
      text: "I've decided to take up a new hobby and start learning how to play the piano. It's something I've always wanted to do, and I finally signed up for lessons. The first few sessions have been challenging, but I love the feeling of progress with each practice.",
      isCurrentUser: true,
      icon: icon0,
      id: 2,
      userName: "Alice",
    },
    {
      text: "I just completed my first 10k run this morning, and I feel amazing! It was a bit of a struggle towards the end, but pushing through the last kilometer was so rewarding. Now, I'm enjoying a big breakfast to refuel. If anyone wants to join me for a run next week, let me know!",
      isCurrentUser: false,
      icon: icon1,
      id: 3,
      userName: "Jill",
    },
  ];

  return (
    <>
      <div className="w-full min-h-full flex flex-col items-end">
        <TaskList />
        <MessageBox isCurrentUser={false} text={"hello"} neighbor={"none"} />
        <MessageBox isCurrentUser={true} text={"hello"} neighbor={"below"} />

        <ImageBox
          icon={"b0fbdd8e320622de39475b562ddad56d.png"}
          name={"Avatar1"}
        />
        <div className="my-2"></div>
        <div className="my-2"></div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <MessageThread conversation={conversation_ex} />
      <div className="w-screen flex flex-col items-center gap-2 my-2">
        <Post
          name={"name"}
          icon={"icon"}
          group={"group"}
          time={5}
          description={"description"}
          likes={3}
          comments={21}
        />
      </div>
    </>
  );
}

export default App;
