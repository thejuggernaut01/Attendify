import React, { useState } from "react";
import LecturerLogin from "../Users/LecturerLogin";
import StudentLogin from "../Users/StudentLogin";
import StudentSignUp from "../Users/StudentSignUp";
import LecturerSignUp from "../Users/LecturerSignUp";

function Auth(props) {
  const [registered, setRegistered] = useState(true); // Initial state set to true for SignUp
  const [isStudent, setIsStudent] = useState(false);

  const handleLecturerClick = () => {
    setIsStudent(false);
  };

  const changeSession = () => {
    setRegistered(!registered);
  };

  const handleStudentClick = () => {
    setIsStudent(true);
  };

  const renderForm = () => {
    if (isStudent) {
      return registered ? <StudentLogin /> : <StudentSignUp />;
    } else {
      return registered ? <LecturerLogin /> : <LecturerSignUp />;
    }
  };

  const getToggleClasses = (isElementActive) => 
    isElementActive 
      ? "mt-2 bg-cyan-400 h-[3px] rounded-full m-auto w-32 transition-all duration-300"
      : "mt-2 bg-gray-700 h-[3px] rounded-full m-auto w-32 transition-all duration-300";


  return (
    <div className="w-full min-h-screen pt-8 pb-16 flex flex-col items-center">
      {/* This image is likely too large, suggesting a height limit */}
      <img className="pt-8 h-12 w-auto" src={props.logo} alt="" />

      {/* Auth Card Container */}
      <div className="mt-8 p-8 max-w-sm md:max-w-md w-full 
                      rounded-2xl bg-gray-900 
                      shadow-2xl shadow-cyan-900/20 
                      border border-gray-800/50">

        {/* TABS */}
        <div className="flex justify-around cursor-pointer text-gray-100">
          <div onClick={handleLecturerClick} className="items-center text-center">
            <p className="text-lg font-semibold">{`Lecturer ${registered ? "Login" : "Register"}`}</p>
            <div className={getToggleClasses(!isStudent)}></div>
          </div>

          <div
            onClick={handleStudentClick}
            className="items-center text-center cursor-pointer"
          >
            <p className="text-lg font-semibold">{`Student ${registered ? "Login" : "Register"}`}</p>
            <div className={getToggleClasses(isStudent)}></div>
          </div>
        </div>

        {/* FORM RENDER (Assuming internal forms use dark mode styles) */}
        <div className="mt-8">
            {renderForm()}
        </div>

      </div> {/* END Auth Card Container */}
      
      {/* Change Session Link */}
      <p
        onClick={changeSession}
        className="mt-8 cursor-pointer text-gray-400 hover:text-cyan-400 font-medium transition-colors"
      >
        {registered ? "Create new account" : "Already have an account?"}
      </p>
      
    </div>
  );
}

export default Auth;