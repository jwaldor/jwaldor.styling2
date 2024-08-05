type HeatType = Array<Array<0 | 1 | 2 | 3>>;
type HeatProps = { heatvalues: HeatType };

function HeatGrid({ heatvalues }: HeatProps) {
  console.log("heatvalues", heatvalues);
  const weekdays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  const heatmap = {
    0: "bg-gray-100",
    1: "bg-blue-200",
    2: "bg-blue-500",
    3: "bg-blue-800",
  };
  return (
    <>
      <div className="flex flex-row">
        {heatvalues.map((arr, index) => {
          return (
            <>
              <div className="flex flex-col text-center">
                <div className="text-xs">{weekdays[index]}</div>
                {arr.map((val) => {
                  return (
                    <>
                      <div
                        className={`background ${heatmap[val]} aspect-square w-[2.3rem] m-[0.22rem]`}
                      ></div>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default HeatGrid;
