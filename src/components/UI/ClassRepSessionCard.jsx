import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
// Assuming powerSvg is an SVG icon component that renders the power symbol
import { powerSvg } from "./Svg"; 

const ClassRepSessionCard = () => {
  // Destructure context values and setters
  const { startSession, setStartSession, setShowSessionDetails, setShowCode } = useContext(AuthContext);

  // Function to show the session details form before starting
  const startSessionHandler = () => {
    // Toggles the visibility of the session details form (modal)
    setShowSessionDetails((prevState) => !prevState); 
  };

  // Function to end the session
  const endSessionHandler = () => {
    // 1. Toggles startSession to false
    setStartSession(false); 
    // 2. Toggles ShowCode to hide the QR code display
    setShowCode(false);
    // Note: You may want to add logic here to save/close the session data.
  };

  // Determine the current state and corresponding styles
  const isSessionActive = startSession;
  
  const buttonStyle = isSessionActive
    ? "bg-red-900/40 hover:bg-red-900/70 border-red-700 text-red-400 shadow-lg shadow-red-900/50" // Active (Ending)
    : "bg-cyan-900/40 hover:bg-cyan-900/70 border-cyan-700 text-cyan-400 shadow-lg shadow-cyan-900/50"; // Inactive (Starting)
    
  const buttonText = isSessionActive ? "End Session" : "Start a Session";
  const clickHandler = isSessionActive ? endSessionHandler : startSessionHandler;

  return (
    <section className="mt-8 px-4">
      {/* Container Card: Dark background, centralized, shadow effect */}
      <div 
        className="text-center bg-gray-900 rounded-2xl py-8 w-full max-w-lg mx-auto 
                   shadow-xl shadow-black/30 border border-gray-800 transition-all duration-300"
      >
        <div className="flex justify-center">
          <button 
            onClick={clickHandler}
            className={`flex items-center justify-center 
                        w-24 h-24 p-5 rounded-full border-4 
                        transition-all duration-300 transform hover:scale-105 
                        ${buttonStyle}`}
            aria-label={buttonText}
          >
            {/* Power Icon: Use SVG and ensure it scales within the button */}
            <div className="w-full h-full">
                {powerSvg}
            </div>
          </button>
        </div>
        
        {/* State Indicator Text */}
        <p className={`mt-4 text-xl font-extrabold italic 
                      ${isSessionActive ? 'text-red-400' : 'text-cyan-400'}`}
        >
          {buttonText}
        </p>
      </div>
    </section>
  );
};

export default ClassRepSessionCard;