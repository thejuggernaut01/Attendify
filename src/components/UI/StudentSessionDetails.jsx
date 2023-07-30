import React from "react";
import { qrCode } from "./Svg";

const StudentSessionDetails = () => {
  return (
    <>
      <aside className="mt-6">
        <div className="flex justify-center items-center flex-col bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-80 mx-auto">
          <p>{qrCode}</p>
          <p>Generate QR Code</p>
        </div>
      </aside>
    </>
  );
};

export default StudentSessionDetails;
