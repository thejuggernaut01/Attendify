import React from "react";
import { powerSvg } from "./Svg";

const StudentSessionCard = () => {
  return (
    <>
      <section className="mt-5">
        <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <div className="flex justify-center">
            <button className="text-green-500">{powerSvg}</button>
          </div>

          <p className="text-lg font-bold italic">Join session</p>
        </div>
      </section>
    </>
  );
};

export default StudentSessionCard;
