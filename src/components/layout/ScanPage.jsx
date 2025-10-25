import React, { useState, useEffect, useRef } from 'react';
import NavbarHome from './NavbarHome';
// Assuming LogoBlue is the icon path, now used in a dark context
import LogoBlue from '../../icons/icon_calendar_blue.png'; 
import QrScanner from 'qr-scanner';
import { FiCamera, FiCheckCircle, FiRefreshCw } from 'react-icons/fi'; // Importing relevant icons

// Note: Ensure your project setup allows resolving QrScanner.WORKER_PATH correctly.
// For modern React projects, defining a global path like this is often tricky.
// Consider using the recommended way of importing the worker file if possible.
// QrScanner.WORKER_PATH = '../UI/qrscanner.min.js'; 

function ScanPage() {
  const [scanning, setScanning] = useState(false);
  const [scannerResults, setScannerResults] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isError, setIsError] = useState(false); // New state for error handling

  const videoRef = useRef(null);
  const qrScannerRef = useRef(null); // Ref to store the scanner instance

  const startScanning = () => {
    // Reset state before starting new scan
    setScannerResults([]);
    setSuccessMessage('');
    setIsError(false);
    setScanning(true);
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
    }
    setScanning(false);
  };
  
  // Custom Handler to Parse QR Result
  const handleScanResult = (result) => {
    setScannerResults((prevResults) => [...prevResults, result.data]); // Use result.data
    stopScanning(); // Stop scanner immediately on successful read
    setSuccessMessage('Attendance ID captured!');
    
    // Auto-reset message after a short delay for better UX
    setTimeout(() => {
        setSuccessMessage('');
    }, 5000); 
  };

  // --- useEffect for Scanner Control ---
  useEffect(() => {
    const videoElem = videoRef.current;

    if (videoElem && scanning) {
      // Clean up any existing scanner instance before creating a new one
      if (qrScannerRef.current) {
          qrScannerRef.current.destroy();
      }

      try {
        const qrScanner = new QrScanner(videoElem, handleScanResult, {
          onDecodeError: error => {
            // Optional: Log errors during scanning without stopping the camera
            console.error('QR Decode Error:', error); 
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
          // Optional: Add the worker path if necessary for your build setup
          // worker: QrScanner.WORKER_PATH, 
        });
        
        qrScannerRef.current = qrScanner;
        qrScanner.start();

      } catch (e) {
        // Handle errors like camera permission denied
        console.error('Error initializing scanner:', e);
        setIsError(true);
        setScanning(false);
        setSuccessMessage('Error: Camera failed to start. Check permissions.');
      }

      return () => {
        // Cleanup on component unmount or when scanning state changes
        if (qrScannerRef.current) {
          qrScannerRef.current.destroy();
          qrScannerRef.current = null;
        }
      };
    } else if (!scanning && qrScannerRef.current) {
        stopScanning();
    }
  }, [scanning]);

  // --- Render Functions ---
  
  // Function to safely display parsed data
  const renderParsedData = (resultData, index) => {
    try {
        const data = JSON.parse(resultData);
        
        // Check if data is a valid student object
        if (!data.name || !data.matricNumber) {
            throw new Error("Invalid ID data structure.");
        }

        return (
            <div key={index} className="space-y-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-cyan-400 font-semibold text-lg border-b border-gray-700 pb-1 mb-1">Scanned Student ID</p>
                <p><strong className="text-gray-400">Name:</strong> <span className="text-gray-200">{data.name}</span></p>
                <p><strong className="text-gray-400">Matric No:</strong> <span className="text-gray-200">{data.matricNumber}</span></p>
                <p><strong className="text-gray-400">Dept:</strong> <span className="text-gray-200">{data.department}</span></p>
                <p><strong className="text-gray-400">Level:</strong> <span className="text-gray-200">{data.level}</span></p>
                <p><strong className="text-gray-400">Email:</strong> <span className="text-gray-200">{data.email}</span></p>
            </div>
        );
    } catch (e) {
        return (
            <div key={index} className="p-3 bg-red-900/30 rounded-lg border border-red-700">
                <p className="text-red-400 font-semibold">Invalid QR Code Data!</p>
                <p className="text-sm text-red-300 break-all mt-1">Raw Data: {resultData}</p>
            </div>
        );
    }
  };


  return (
    // Main Container: Deep dark background, light text
    <div className="bg-gray-950 min-h-screen text-gray-100">
        <NavbarHome logoBlue={LogoBlue} />
        
        {/* Main Content Area */}
        <div className="flex flex-col items-center p-4">
        
            {/* SCAN BUTTON SECTION */}
            <section className="mt-8">
              <button
                onClick={scanning ? stopScanning : startScanning}
                className={`flex items-center space-x-2 py-3 font-bold text-lg cursor-pointer rounded-full px-8 transition-all duration-300 
                            ${scanning 
                                ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50' 
                                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-900/50'}`
                           }
                disabled={isError}
              >
                {scanning 
                    ? <><FiRefreshCw className="animate-spin-slow" size={20} /><span>Stop Scanning</span></> 
                    : <><FiCamera size={20} /><span>Scan ID</span></>
                }
              </button>
            </section>

            {/* MESSAGE/STATUS AREA */}
            {(successMessage || isError) && (
                <div className={`mt-6 p-3 rounded-lg text-center font-medium w-full max-w-md 
                                ${isError 
                                    ? 'bg-red-900/40 text-red-400 border border-red-700' 
                                    : 'bg-green-900/40 text-green-400 border border-green-700'}`
                                }
                >
                    {successMessage}
                </div>
            )}

            {/* SCANNER VIDEO FEED */}
            {scanning && (
                <div className="relative mt-8 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/50 border-4 border-cyan-600/50">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Scanning indicator box/lines */}
                        <div className="w-3/4 h-3/4 border-4 border-dashed border-cyan-400 opacity-70 animate-pulse rounded-lg"></div>
                    </div>
                    <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-cyan-400 font-medium text-sm bg-black/50 px-2 rounded">Scanning...</p>
                </div>
            )}
            
            {/* SCAN RESULTS DISPLAY */}
            {scannerResults.length > 0 && !scanning && (
                <div className="mt-10 w-full max-w-lg space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-green-400 mb-4">
                        <FiCheckCircle size={28} />
                        <p className="text-xl font-bold">Attendance ID Captured</p>
                    </div>
                    
                    {scannerResults.map(renderParsedData)}
                    
                </div>
            )}
            
        </div>
    </div>
  );
}

export default ScanPage;