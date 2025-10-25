// NavbarHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function NavbarHome(props) {
  const navigate = useNavigate();

  const navigateToScanPage = () => {
    navigate('/scan');
  };

  const scrollToContent = () => {
    // ... scrolling logic remains the same ...
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // Changed scroll target multiplier from 1.2 to 1.05 for a smoother, less extreme jump past the hero section
    const scrollTarget = windowHeight * 1.05; 

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth"
    });
  };

  return (
    <div 
      className="flex w-full px-4 sm:px-8 py-3 sm:py-4 justify-between items-center 
                 text-gray-200 backdrop-blur-lg bg-gray-900/60 
                 sticky top-0 z-50 transition-all duration-300 
                 shadow-2xl shadow-cyan-900/20" 
      role="navigation" // Added for accessibility
    >
      
      {/* LOGO GROUP */}
      <div 
        className="cursor-pointer flex items-center space-x-2 text-xl font-extrabold text-cyan-400 hover:text-white transition-colors" 
        onClick={scrollToContent}
        tabIndex={0} // Makes the logo clickable via keyboard
        aria-label="Attendify Home/Login section" // Accessibility
      >
        {/* Added h-7 for slightly larger logo; ensured alt text is present */}
        <img src={props.logoBlue} alt="Attendify Logo" className="h-7 w-auto" /> 
        <p>Attendify</p>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex space-x-6 sm:space-x-10 text-sm md:text-base font-medium">
        <button 
          className="text-gray-300 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded transition-colors p-1" 
          onClick={scrollToContent}
        >
          Login
        </button>
        <button 
          onClick={navigateToScanPage} 
          // Enhanced "Identify" button style to look more like a primary CTA
          className="text-white bg-cyan-600 hover:bg-cyan-500 rounded-full py-1.5 px-4 transition-colors 
                     shadow-md shadow-cyan-900/50
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-950"
        >
          Identify
        </button>
      </nav>
    </div>
  );
}

export default NavbarHome;