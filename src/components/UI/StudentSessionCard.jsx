import React, { useState } from "react";
import { powerSvg } from "./Svg";
import QRCode from "react-qr-code";

const StudentSessionCard = ({ onClick }) => {
  const [showBarcode, setShowBarcode] = useState(false);
  const [timestamp, setTimestamp] = useState(null);

  const handleJoinSessionClick = () => {
    const now = new Date();
    setTimestamp(now);
    setShowBarcode(true);
  };

  return (
    <>
      <section className="mt-5">
        <div onClick={handleJoinSessionClick} className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <div className="flex justify-center">
            <button className="text-green-500">
              {powerSvg}
            </button>
          </div>

          <p  className="text-lg font-bold italic">
            Join session
          </p>
        </div>
      </section>

      <aside className="mt-6">
      <div className="flex justify-center items-center flex-col bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-80 mx-auto">
      
    {showBarcode ? 
      <div>
      <QRCode value={timestamp.toISOString()} /> 
    </div>
    : null}
      </div>
      </aside>
    </>
  );
};

export default StudentSessionCard;
