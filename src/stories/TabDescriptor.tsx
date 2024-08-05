import { useState } from "react";

type TabType = { name: string; picture: string; description: string };
type TabProps = { tabs: [TabType, TabType, TabType] };

function TabDescriptor({ tabs }: TabProps) {
  const [currtab, setCurrTab] = useState(0);
  return (
    <>
      <div className="flex flex-col w-[90%] max-w-sm text-center">
        <div className="flex flex-row bg-[#eeecec] justify-around rounded-lg m-3">
          {tabs.map((atab, index) => (
            <button
              onClick={() => setCurrTab(index)}
              className={`w-[30%] py-1 my-2 rounded-md ${
                index !== currtab ? "hover:bg-gray-200" : ""
              } ${index === currtab ? "bg-white" : ""}`}
            >
              {atab.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col bg-white m-3 rounded-lg items-center p-1">
          {/*  */}
          <img
            className="rounded-full w-40 h-40 object-cover mt-3 mb-3"
            src={tabs[currtab].picture}
          ></img>
          <div className="mt-3 mb-4 mx-4">{tabs[currtab].description}</div>
        </div>
      </div>
    </>
  );
}

export default TabDescriptor;
