import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
// Assuming qrCode is an SVG icon component that renders a QR code symbol
import { qrCode } from "./Svg"; 
import QrScanner from 'qr-scanner';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FiCamera, FiSave, FiPlus, FiX } from 'react-icons/fi'; // Import icons for better visuals

// QrScanner.WORKER_PATH = '/qrscanner.min.js'; // Keep this line if required by your setup

const ClassRepSessionDetails = ({ data }) => {
    
  const [scanning, setScanning] = useState(false);
  // Store raw result data and a parsed list of student names/IDs
  const [scannerResults, setScannerResults] = useState([]);
  const [scannedStudents, setScannedStudents] = useState([]); 
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const qrScannerRef = useRef(null); // Ref to store the scanner instance

  const videoRef = useRef(null);

  const {
    showSessionDetails,
    setShowSessionDetails,
    setStartSession,
    showCode,
    setShowCode,
  } = useContext(AuthContext);

  // --- QR Scanner Logic ---
  const handleScanResult = (result) => {
    // Process the result immediately
    const rawData = result.data;
    
    // Attempt to parse the data
    try {
        const studentData = JSON.parse(rawData);
        
        // Basic check to ensure it's a student ID and not a duplicate
        const isDuplicate = scannedStudents.some(s => s.matricNumber === studentData.matricNumber);

        if (studentData.matricNumber && !isDuplicate) {
            setScannedStudents(prev => [...prev, studentData]);
            setSuccessMessage(`${studentData.name} recorded! Scan next...`);
        } else if (isDuplicate) {
             setSuccessMessage(`Error: ${studentData.name} already scanned.`);
        } else {
            setSuccessMessage(`Error: Invalid ID format.`);
        }
    } catch (e) {
        setSuccessMessage(`Error: Invalid QR code data.`);
    }

    // Since we want continuous scanning until stopped, we don't call qrScanner.stop() here.
    // If you only want one scan per click, call stopScanning() here.
    
    // Note: If you want the camera to run continuously, remove the useEffect's cleanup/destroy logic.
    // For simplicity, let's stop the scanner on any result and require the user to click 'Scan' again.
    stopScanning(); 
  };
  
  const stopScanning = () => {
      if (qrScannerRef.current) {
          qrScannerRef.current.stop();
          qrScannerRef.current.destroy();
          qrScannerRef.current = null;
      }
      setScanning(false);
  }

  useEffect(() => {
    const videoElem = videoRef.current;

    if (videoElem && scanning) {
        if (qrScannerRef.current) qrScannerRef.current.destroy();
        
        const qrScanner = new QrScanner(videoElem, handleScanResult, {
            highlightScanRegion: true,
            highlightCodeOutline: true,
        });

        qrScannerRef.current = qrScanner;
        qrScanner.start();

        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.destroy();
                qrScannerRef.current = null;
            }
        };
    } else if (!scanning && qrScannerRef.current) {
        stopScanning();
    }
  }, [scanning]);

  // --- Session Control Handlers ---
  const beginSessionHandler = (e) => {
    e.preventDefault();
    if (!selectedCourseCode) return; // Prevent session start if no course is selected

    // Save session details to state/context here if needed
    
    setShowSessionDetails(false);
    setStartSession(true); // Session is officially started
    setShowCode(true); // Show the QR code/scanner interface
  };

  const submitAttendance = async () => {
    if (scannedStudents.length === 0) {
        setSuccessMessage("No students scanned yet!");
        return;
    }

    const attendanceData = {
      courseCode: selectedCourseCode, 
      startTime: startTime,
      endTime: endTime,
      timestamp: new Date().toISOString(),
      // Clean data before saving
      scannedStudents: scannedStudents.map(student => ({
          name: student.name,
          matricNumber: student.matricNumber,
          email: student.email,
          scanTime: new Date().toISOString(), // You might want a better way to track this
      })),
    };

    try {
      await addDoc(collection(db, "attendanceCollection"), attendanceData);
      setSuccessMessage(`Attendance for ${scannedStudents.length} students submitted!`);
      
      // Reset state variables
      setScannedStudents([]);
      setScannerResults([]);
    } catch (error) {
      console.error("Error saving attendance data:", error);
      setSuccessMessage("Error submitting attendance. Check console.");
    }
  };

  const scanHandler = () => {
    stopScanning(); // Ensure previous scanner is destroyed
    setScanning(true);
    setSuccessMessage("");
  };

  return (
    <aside className="mt-8 px-4">
      {/* 1. Session Details Form (Initial State) */}
      {showSessionDetails && (
        <div
          className="flex items-center flex-col text-white rounded-2xl py-8 w-full max-w-lg mx-auto 
                     bg-gray-900 shadow-2xl shadow-cyan-900/30 border border-gray-800 space-y-4"
        >
          <h3 className="text-3xl font-extrabold text-cyan-400 border-b border-gray-700 pb-2 mb-4 w-3/4 text-center">
              New Session
          </h3>
          <form className="text-center w-full max-w-xs space-y-4" onSubmit={beginSessionHandler}>
            
            {/* Course Select */}
            <div className="relative">
                <select
                className="w-full px-4 py-3 border border-gray-700 rounded-lg appearance-none outline-none 
                           bg-gray-800 text-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                name="course"
                id="course"
                required
                value={selectedCourseCode}
                onChange={(e) => setSelectedCourseCode(e.target.value)}
              >
                <option value="" disabled className="text-gray-500">
                  --- Choose Course ---
                </option>
                {data.map((item) => (
                  <option
                    className="text-left bg-gray-900 text-white"
                    key={item.courseCode}
                    value={item.courseCode}
                  >
                    {item.courseCode} - {item.courseTitle}
                  </option>
                ))}
              </select>
              {/* Custom Chevron Down Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cyan-400">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Time Inputs */}
            <input 
              placeholder="Start Time (e.g., 9:00 AM)" 
              type="text" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400" 
              required
            />
            <input 
              type="text" 
              placeholder="End Time (e.g., 10:00 AM)" 
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400" 
              required
            />
            
            {/* Begin Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 font-bold text-lg rounded-lg 
                         bg-cyan-600 hover:bg-cyan-500 text-white 
                         shadow-lg shadow-cyan-900/50 transition-colors"
            >
              Begin Session
            </button>
          </form>
          {/* Close Button for the Form */}
          <button 
              onClick={() => setShowSessionDetails(false)}
              className="text-gray-500 hover:text-red-500 absolute top-3 right-3 p-1 transition-colors"
              aria-label="Close session details form"
          >
              <FiX size={24} />
          </button>
        </div>
      )}

      {/* 2. Session Inactive/Placeholder State */}
      {!showSessionDetails && !showCode && (
        <div className="flex justify-center items-center bg-gray-900 rounded-2xl py-6 w-full max-w-lg h-56 mx-auto border border-gray-800 shadow-xl shadow-black/30">
          <p className="text-gray-500 italic">Start a session using the power icon above...</p>
        </div>
      )}

      {/* 3. QR Scanner / Active Session State */}
      {showCode && (
        <div className="flex flex-col items-center bg-gray-900 rounded-2xl py-6 px-4 w-full max-w-lg mx-auto border border-gray-800 shadow-2xl shadow-cyan-900/30 space-y-6">
          
          <h3 className="text-2xl font-bold text-cyan-400">
              Attendance for {selectedCourseCode}
          </h3>
          <p className="text-gray-400 text-sm">Session: {startTime} - {endTime}</p>
          
          {/* QR Scanner / Camera Feed */}
          {scanning ? (
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/50 border-4 border-cyan-600/50">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Scanning indicator */}
                <div className="w-3/4 h-3/4 border-4 border-dashed border-cyan-400 opacity-70 animate-pulse rounded-lg"></div>
              </div>
              {/* Status Message */}
              {successMessage && (
                <p className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-medium bg-black/60 px-3 py-1 rounded-full text-green-400 border border-green-700">
                    {successMessage}
                </p>
              )}
            </div>
          ) : (
            // Control Buttons
            <div className="flex flex-col space-y-4 w-full max-w-xs">
                {/* Scan Button */}
                <button onClick={scanHandler} className="flex items-center justify-center space-x-2 py-3 px-6 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/50">
                    <FiCamera size={20} />
                    <span>Scan Student ID</span>
                </button>
                
                {/* Submit Button */}
                <button onClick={submitAttendance} disabled={scannedStudents.length === 0} 
                    className="flex items-center justify-center space-x-2 py-3 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors shadow-lg shadow-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed">
                    <FiSave size={20} />
                    <span>Submit Attendance ({scannedStudents.length})</span>
                </button>
            </div>
          )}
          
          {/* Scanned Students List */}
          {scannedStudents.length > 0 && (
              <div className="w-full max-w-md space-y-3 pt-4 border-t border-gray-700">
                  <p className="text-lg font-bold text-gray-300">Scanned Students:</p>
                  <ul className="max-h-40 overflow-y-auto space-y-2 p-2 bg-gray-800 rounded-lg">
                      {scannedStudents.map((student, index) => (
                          <li key={student.matricNumber} className="flex justify-between items-center text-sm text-gray-200 border-b border-gray-700 pb-1 last:border-b-0">
                              <span>{index + 1}. {student.name}</span>
                              <span className="text-cyan-400 font-mono text-xs">{student.matricNumber}</span>
                          </li>
                      ))}
                  </ul>
              </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default ClassRepSessionDetails;