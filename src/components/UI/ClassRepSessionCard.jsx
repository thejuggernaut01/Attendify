import { useState } from "react";
import { useContext } from "react";
import { powerSvg } from "./Svg";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";

const ClassRepSessionCard = () => {
  const { startSession, setStartSession, setShowSessionDetails, setShowCode } = useContext(AuthContext);

  const startSessionHandler = () => {
    setShowSessionDetails((prevState) => !prevState);
  };

  const endSessionHandler = () => {
    setStartSession((prevState) => !prevState);
    setShowCode((prevState) => !prevState);
  };

  return (
    <>
      <section className="mt-5">
        <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <div className="flex justify-center">
            {startSession ? 
              <button className="text-red-500" onClick={endSessionHandler}>
                {powerSvg}
              </button>
              :  
               <button onClick={startSessionHandler} className="text-green-500">
                    {powerSvg}
                  </button>
                }
              
            
          </div>
          {startSession ? (
            <p className="text-lg font-bold italic">End session</p>
          ) : (
            <p className="text-lg font-bold italic">Start a session</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ClassRepSessionCard