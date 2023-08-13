import React from "react";
import { useNavigate } from "react-router-dom";
function NavbarHome(props) {
  const navigate = useNavigate()

  const navigateToScanPage = () => {
    navigate('/scan')
  }

  const scrollToContent = () => {
    // Calculate the target position for scrolling based on 60% of the window height
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollTarget = windowHeight * 1.2;

    // Scroll to the target position
    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth" // Add smooth scrolling behavior
    });
  };

  return (
    <div className="flex m-auto justify-around space-x-10 p-6">
      <div className="cursor-pointer flex space-x-2" onClick={scrollToContent}>
        <img src={props.logoBlue} alt="Logo" />
        <p>Attendify</p>
      </div>

      <div className="flex space-x-10">
        <p className="cursor-pointer" onClick={scrollToContent}>Login</p>
        <p onClick={navigateToScanPage} className="cursor-pointer">Identify</p>
      </div>
    </div>
  );
}

export default NavbarHome;
