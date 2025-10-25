import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi'; // Using FiLoader for a sleeker, modern spinner

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
        <div 
          className='flex flex-col items-center justify-center 
                     min-h-screen min-w-full 
                     bg-gray-950 space-y-8 
                     text-white' // Use deep dark background and base text color
        >
          {/* Brand Identity */}
          <div className="flex flex-col items-center space-y-4">
            
            {/* Logo */}
            <div className="p-2 border-4 border-cyan-500/50 rounded-full animate-pulse-slow">
                <img 
                    src={props.logoWhite} 
                    alt="Attendify Logo" 
                    className="w-10 h-10 object-contain text-cyan-400" // Increased size
                /> 
            </div>
            
            {/* Brand Name */}
            <p 
              className="text-3xl font-extrabold tracking-widest 
                         bg-gradient-to-r 
                         from-cyan-400 to-blue-500 
                         text-transparent 
                         bg-clip-text" // Electric Gradient text
            >
              ATTENDIFY
            </p>
          </div>
          
          {/* Modern Loader */}
          {/* FiLoader is sleeker than FaSpinner. Use 'animate-spin' for rotation. */}
          <FiLoader 
            className='text-cyan-500 text-5xl animate-spin 
                       shadow-xl shadow-cyan-900/50' // Add shadow for glow effect
            aria-label="Loading application"
          />
        </div>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
}

export default Splashscreen;