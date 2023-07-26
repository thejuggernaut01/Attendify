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

  return (
    <div className="justify-center bg-gradient-to-r w-screen from-[#020443] to-[#02030C] h-[150vh]">
      <img className="m-auto pt-8" src={props.logo} alt="" />

      <div className="flex justify-around mt-2 cursor-pointer text-white">
        <div onClick={handleLecturerClick} className="items-center text-center">
          <p>Lecturer {registered ? "Login" : "Register"}</p>
          <div
            className={
              isStudent
                ? "mt-2 bg-white h-[3px] rounded-full m-auto w-32"
                : "mt-2 bg-blue-800 h-[3px] rounded-full m-auto w-32"
            }
          ></div>
        </div>

        <div
          onClick={handleStudentClick}
          className="items-center text-center cursor-pointer"
        >
          <p>Student {registered ? "Login" : "Register"}</p>
          <div
            className={
              isStudent
                ? "mt-2 bg-blue-800 h-[3px] rounded-full m-auto w-32"
                : "mt-2 bg-white h-[3px] rounded-full m-auto w-32"
            }
          ></div>
        </div>
      </div>

      {renderForm()}

      {registered ? (
        <p
          onClick={changeSession}
          className="w-48 m-auto cursor-pointer text-center text-gray-500 mt-8"
        >
          Create new account
        </p>
      ) : (
        <p
          onClick={changeSession}
          className="w-56 m-auto cursor-pointer text-center text-gray-500 mt-8"
        >
          Already have an account?
        </p>
      )}
    </div>
  );
}

export default Auth;
