import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Import the desired spinner icon from react-icons

function Splashscreen(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay of 3 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout); // Clean up the timeout on component unmount
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='flex flex-col items-center 
                      justify-center bg-gradient-to-r 
                      w-screen from-[#020443] 
                      to-[#02030C] 
                      h-screen space-y-4'
        >
          <div className="flex items-center space-x-2">
            <img src={props.logoWhite} alt="Logo" className="w-8 h-8" /> {/* Adjust the width and height as needed */}
            <p className="text-white text-xl">Attendify</p>
          </div>
          <FaSpinner className='text-white text-4xl animate-spin' /> {/* Use the spinner icon */}
        </div>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
}

export default Splashscreen;
