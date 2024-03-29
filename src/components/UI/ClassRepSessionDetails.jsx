import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { qrCode } from "./Svg";
import QrScanner from 'qr-scanner';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ClassRepSessionDetails = ({ data }) => {
  QrScanner.WORKER_PATH = '/qrscanner.min.js';

  const [scanning, setScanning] = useState(false);
  const [scannerResults, setScannerResults] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCourseCode, setSelectedCourseCode] = useState("");

  const videoRef = useRef(null);

  useEffect(() => {
    const videoElem = videoRef.current;

    if (videoElem && scanning) {
      const qrScanner = new QrScanner(videoElem, result => {
        setScannerResults(prevResults => [...prevResults, result]);
        qrScanner.stop();
        setSuccessMessage("Attendance Recorded Successfully");
        setScanning(false);
      });

      qrScanner.start();

      return () => {
        qrScanner.destroy();
      };
    }
  }, [scanning]);

  const {
    showSessionDetails,
    setShowSessionDetails,
    setStartSession,
    showCode,
    setShowCode,
  } = useContext(AuthContext);

  const beginSessionHandler = (e) => {
    e.preventDefault();
    setShowSessionDetails((prevState) => !prevState);
    setStartSession((prevState) => !prevState);
    setShowCode((prevState) => !prevState);
  };

  const submitAttendance = async () => {
    if (scannerResults.length > 0) {
      const courseCode = selectedCourseCode; // Replace with the actual selected course code
      const attendanceData = {
        courseCode,
        scannedStudents: scannerResults,
      };
  
      try {
        await addDoc(collection(db, "attendanceCollection"), attendanceData);
        // Clear scanner results and any other necessary state variables
        setScannerResults([]);
        // Any other cleanup or state updates you need
      } catch (error) {
        console.error("Error saving attendance data:", error);
      }
    }
  };
  

  const scanHandler = () => {
    setScanning(true);
    setSuccessMessage("");
  };

  const addAnotherStudent = () => {
    setScanning(true);
    setSuccessMessage("");
  };

  
  
  // Check Scanned Student List
//  useEffect(() => {
//   if (scannerResults != ""){
//     console.log(scannerResults)
//   }
//  }, [scannerResults])


  return (
    <>
      <aside className="mt-8">
        {showSessionDetails ? (
          <div
            className="flex items-center flex-col text-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-85 mx-auto"
            style={{ backgroundColor: "#101218" }}
          >
            <h3 className="text-3xl">Session Details</h3>
          <form className="text-center w-64" onSubmit={beginSessionHandler}>
          <select
          className="text-[#b7b7b7] text-center mt-7 px-16 py-2 border border-white rounded-full appearance-none outline-white m-auto bg-black"
          name="course"
          id="course"
          required
          value={selectedCourseCode}
          onChange={(e) => setSelectedCourseCode(e.target.value)}
        >
          <option className="" value="">
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
        

            <input placeholder="Start Time" type="text"  className="bg-black rounded-full w-64 mt-4 text-center py-2 text-[#B7B7B7] border" required/>

            <input type="text" placeholder="End Time" className="bg-black rounded-full w-64 mt-4 text-center py-2 text-[#B7B7B7] border" required/>
            <button
            type="submit"
              className="text-center mt-8 border-b-4 cursor-pointer"
            >
              Begin Session
            </button>
            </form>
          </div>
        ) : !showCode ? (
          <div className="flex justify-center items-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-80 mx-auto">
            <p>Session Details will appear here...</p>
          </div>
        ) : showCode ? (
          <div className="flex justify-center items-center flex-col bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-80 mx-auto">
            {scanning ? 
              // QRScanner
              <div>
              <video ref={videoRef} className="w-full max-w-md" />
              <p className="text-center text-green-800">{successMessage}</p>
              </div>
              
              : 
              <div className="space-x-4 text-center m-auto w-fit">
              <button onClick={scanHandler} className="p-2 px-6 bg-green-700 text-white rounded-full">Scan</button>
              <button onClick={submitAttendance} className="p-2 bg-red-700 text-white rounded-full">Submit Attendance</button>
              </div>
            }
          </div>
        ) : (
          ""
        )}
      </aside>
    </>
  );
};

export default ClassRepSessionDetails;