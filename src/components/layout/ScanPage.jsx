import React, { useState, useEffect, useRef } from 'react';
import NavbarHome from './NavbarHome';
import LogoBlue from '../../icons/icon_calendar_blue.png';
import QrScanner from 'qr-scanner';

function ScanPage() {
  QrScanner.WORKER_PATH = '../UI/qrscanner.min.js';
  const [scanning, setScanning] = useState(false);
  const [scannerResults, setScannerResults] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const videoRef = useRef(null);

  const startScanning = () => {
    setScanning(true);
  };

  useEffect(() => {
    const videoElem = videoRef.current;

    if (videoElem && scanning) {
      const qrScanner = new QrScanner(videoElem, (result) => {
        setScannerResults((prevResults) => [...prevResults, result]);
        qrScanner.stop();
        setSuccessMessage('Attendance Recorded Successfully');
        setScanning(false);
      });

      qrScanner.start();

      return () => {
        qrScanner.destroy();
      };
    }
  }, [scanning]);

  return (
    <>
      <NavbarHome logoBlue={LogoBlue} />
      <div>
        <section className="flex justify-center">
          <button
            onClick={startScanning}
            className="mt-2 m-auto inline-block py-2 font-semibold text-lg cursor-pointer rounded-lg px-5 bg-blue-500 text-white"
          >
            Scan ID
          </button>
        </section>
      </div>

      {scanning ? (
        <div className="flex mt-8 justify-center">
          <video ref={videoRef} className="w-full max-w-md" />
          <p className="text-center text-green-800">{successMessage}</p>
        </div>
      ) : scannerResults.length > 0 ? (
        <div className="flex mt-8 justify-center">
          <div className="bg-white p-4 border rounded-lg shadow-lg">
            <p className="text-center text-green-800 mb-4">Scanned ID Card</p>
            <div className="text-left">
              {scannerResults.map((result, index) => {
                const data = JSON.parse(result);
                return (
                  <div key={index}>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Matric Number:</strong> {data.matricNumber}</p>
                    <p><strong>Department:</strong> {data.department}</p>
                    <p><strong>Level:</strong> {data.level}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ScanPage;
