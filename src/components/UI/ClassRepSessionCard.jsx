import { useState } from "react";
import { useContext } from "react";
import { powerSvg } from "./Svg";
import { AuthContext } from "../../store/AuthContext";
import {QrReader} from "react-qr-reader";

const ClassRepSessionCard = () => {
  const { startSession, setStartSession, setShowSessionDetails, setShowCode } =
    useContext(AuthContext);
  const [isScanning, setIsScanning] = useState(false);
  const [qrData, setQrData] = useState("");

  const startSessionHandler = () => {
    setShowSessionDetails((prevState) => !prevState);
  };

  const endSessionHandler = () => {
    setStartSession((prevState) => !prevState);
    setShowCode((prevState) => !prevState);
  };

  const handleScan = (data) => {
    if (data) {
      // Barcode/QR code data is available in 'data'
      setQrData(data);
      setIsScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setIsScanning(false);
  };

  const toggleScanner = () => {
    setIsScanning((prev) => !prev);
  };

  return (
    <>
      <section className="mt-5">
        <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <div className="flex justify-center">
            {startSession ? (
              <button className="text-red-500" onClick={endSessionHandler}>
                {powerSvg}
              </button>
            ) : (
              <>
                {isScanning ? (
                  <button className="text-red-500" onClick={toggleScanner}>
                    Stop Scanning
                  </button>
                ) : (
                  <button className="text-green-500" onClick={toggleScanner}>
                    {powerSvg}
                  </button>
                )}
              </>
            )}
          </div>
          {startSession ? (
            <p className="text-lg font-bold italic">End session</p>
          ) : (
            <p className="text-lg font-bold italic">Start a session</p>
          )}
          {isScanning && (
            <div>
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
              <p>{qrData}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ClassRepSessionCard;
