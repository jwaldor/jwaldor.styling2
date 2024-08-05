type imageBoxProps = {
  icon: string;
  name: string;
};

function ImageBox({ icon, name }: imageBoxProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex clip-circle bg-gray-400 w-[3rem]">
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
  const boxSpecs = `py-2 pr-8 rounded-[0.45em] mb-2 mr-4 ml-4 w-[80%] ${colorString} ${makeBorderSharp}`;
  return (
    <div className={boxSpecs}>
      <div className="text-[0.6rem] mt-1 ml-2">{text}</div>
    </div>
  );
}

type MessageGroupProps = { messagegroup: ConvoMessage[] };

function getNeighbors(messagegroup: Array<ConvoMessage>) {
  return messagegroup.map((message: ConvoMessage, index: number) => {
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
}

function MessageGroupImproved({ messagegroup }: MessageGroupProps) {
  console.log("messagegroup", messagegroup);
  let neighbors = getNeighbors(messagegroup);

  const isCurrentUser = messagegroup[0].isCurrentUser;

  const leftOrRightCname = isCurrentUser ? "items-start" : "items-end ";
  const ImageColumn = () => (
    <div>
      <ImageBox icon={messagegroup[0].icon} name={messagegroup[0].userName} />
    </div>
  );
  return (
    <>
      <div id="message-group" className={`flex flex-row w-[95%]`}>
        {isCurrentUser && <ImageColumn />}
        <div className={`flex flex-col ${leftOrRightCname}`}>
          {messagegroup.map((message: ConvoMessage, index: number) => {
            return (
              <>
                {" "}
                {/* {leftAvatar && (
                      <ImageBox
                        icon={"b0fbdd8e320622de39475b562ddad56d.png"}
                        name={""}
                      />
                    )} */}
                <MessageBox
                  text={message.text}
                  isCurrentUser={message.isCurrentUser}
                  neighbor={neighbors[index]}
                />
                {/* {rightAvatar && (
                      <ImageBox
                        icon={"b0fbdd8e320622de39475b562ddad56d.png"}
                        name={""}
                      />
                    )} */}
              </>
            );
          })}
        </div>
        {!isCurrentUser && <ImageColumn />}
      </div>
    </>
  );
}

type MessagePicProps = {
  url: string;
  name: string;
  role: number;
};

type ConvoMessage = {
  id: number;
  text: string;
  isCurrentUser: boolean;
  icon: string;
  userName: string;
};

type MessageThreadProps = { conversation: ConvoMessage[] };

function MessageThreadImproved({ conversation }: MessageThreadProps) {
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
      <div className="flex flex-col w-[90%] w-max-md">
        {groupedconvo.map((group) => (
          <MessageGroupImproved messagegroup={group} />
        ))}
      </div>
    </>
  );
}
export default MessageThreadImproved;
// export { MessageThreadImproved as MessageThread };
