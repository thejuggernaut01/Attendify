import { useState } from "react";
import { useContext } from "react";
import { powerSvg } from "./Svg";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";
import { QrReader } from "react-qr-reader";

const ClassRepSessionCard = () => {
  const { startSession, setStartSession, setShowSessionDetails, setShowCode } = useContext(AuthContext);
  const [isScanning, setIsScanning] = useState(false);
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("No Result");

  const startSessionHandler = () => {
    setShowSessionDetails((prevState) => !prevState);
  };

  const endSessionHandler = () => {
    setStartSession((prevState) => !prevState);
    setShowCode((prevState) => !prevState);
  };

  const handleScan = async (data) => {
    if (data) {
      // Barcode/QR code data is available in 'data'
      setResult(data); // Store the scanned data in 'result' state
      setIsScanning(false); // Stop scanning
      await saveAttendance(data); // Save the scanned data to Firestore
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const toggleScanner = () => {
    setIsScanning((prev) => !prev);
    setResult("No Result"); // Clear the previous scanned data when starting a new scan
  };

  // Save attendance
  const saveAttendance = async (data) => {
    const dataToSave = {
      qrData: data,
      timestamp: new Date().toISOString(), // You can include a timestamp if needed
    };

    try {
      await saveDataToFirestore(dataToSave);
      console.log("Data saved:", dataToSave);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const saveDataToFirestore = (data) => {
    return addDoc(collection(db, "attendanceCollection"), data);
  };

  const previewStyle = {
    height: 240,
    width: 320,
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
                delay={delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
              />
              {result !== "No Result" && <p>{result}</p>} {/* Display the scanned data from 'result' state */}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ClassRepSessionCard;
