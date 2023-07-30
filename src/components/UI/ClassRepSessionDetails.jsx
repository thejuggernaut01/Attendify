import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { qrCode } from "./Svg";

const ClassRepSessionDetails = ({ data }) => {
  const {
    showSessionDetails,
    setShowSessionDetails,
    setStartSession,
    showCode,
    setShowCode,
  } = useContext(AuthContext);

  const beginSessionHandler = () => {
    setShowSessionDetails((prevState) => !prevState);
    setStartSession((prevState) => !prevState);
    setShowCode((prevState) => !prevState);
  };

  // console.log(data);

  return (
    <>
      <aside className="mt-8">
        {showSessionDetails ? (
          <div
            className="flex items-center flex-col text-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-85 mx-auto"
            style={{ backgroundColor: "#101218" }}
          >
            <h3 className="text-3xl">Session Details</h3>

            <select
              className="text-[#b7b7b7] mt-7 px-16 py-2 border border-white rounded-full appearance-none outline-white text-center bg-black"
              name="course"
              id="course"
            >
              <option className="text-left" value="">
                Choose Course
              </option>
              {data.map((data) => (
                <option
                  className="text-left"
                  key={data.courseCode}
                  value={data.courseCode}
                >
                  {data.courseCode}
                </option>
              ))}
            </select>

            <button className="text-[#b7b7b7] mt-5 px-[5.3rem] py-2 border border-white rounded-full appearance-none outline-white text-left bg-black">
              Start Time
            </button>

            <button className="text-[#b7b7b7] mt-5 px-[5.3rem] py-2 border border-white rounded-full appearance-none outline-white text-left bg-black">
              Stop Time
            </button>

            <p
              onClick={beginSessionHandler}
              className="mt-8 border-b-4 cursor-pointer"
            >
              Begin Session
            </p>
          </div>
        ) : !showCode ? (
          <div className="flex justify-center items-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-80 mx-auto">
            <p>Session Details will appear here...</p>
          </div>
        ) : showCode ? (
          <div className="flex justify-center items-center flex-col bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-80 mx-auto">
            <p>{qrCode}</p>
            <p>Click to scan</p>
          </div>
        ) : (
          ""
        )}
      </aside>
    </>
  );
};

export default ClassRepSessionDetails;
