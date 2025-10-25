import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

import { AuthContext } from "../../store/AuthContext";
import Loader from "../helpers/Loader";
import { db } from "../../firebase";

function StudentLogin() {
  const [student_login_email, set_student_login_email] = useState("");
  const [student_login_password, set_student_login_password] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const studentCollection = collection(db, "studentCollection");

  const studentLoginData = [
    {
      placeholder: "Enter Student Email",
      value: student_login_email,
      type: "email",
      stateManager: set_student_login_email,
      name: "email", // HTML5 addition
    },
    {
      placeholder: "Enter Password",
      value: student_login_password,
      type: "password",
      stateManager: set_student_login_password,
      name: "password", // HTML5 addition
    },
  ];

  const resetAllFields = () => {
    // Resetting fields only on successful login is often better UX
    studentLoginData.forEach((data) => {
      data.stateManager("");
    });
  };

  const studentLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // It's good practice to rename this query variable if you're querying students
      const studentQuery = query(
        studentCollection,
        where("email", "==", student_login_email)
      );
      const querySnapshot = await getDocs(studentQuery);

      if (!querySnapshot.empty) {
        await login(student_login_email, student_login_password);
        navigate("/student");
        resetAllFields(); // Reset only upon successful navigation
      } else {
        setError("Student Login Details Not Found!");
      }
    } catch (error) {
      console.log(error.message);
      // Detailed error messages for better user feedback
      if (error.message.includes("user-not-found") || error.message.includes("auth/user-not-found")) {
        setError("User Not Found");
      } else if (error.message.includes("wrong-password") || error.message.includes("auth/wrong-password")) {
        setError("Wrong Password");
      } else if (error.message.includes("auth/invalid-email")) {
        setError("Invalid Email Format");
      } else {
        setError("An unexpected error occurred");
      }
    }
    setLoading(false);
  };

  return (
    <div className="mt-8"> {/* Adjusted margin for better spacing within AuthUI card */}
      {/* Error Message - Use stark red for visibility */}
      {error && (
        <p 
          className="text-red-500 text-sm font-medium text-center mb-6 p-2 rounded bg-red-900/30 border border-red-900 mx-auto max-w-sm"
          role="alert" // Accessibility
        >
          {error}
        </p>
      )}

      <form
        onSubmit={studentLogin}
        className="text-center text-white space-y-6" // Use space-y for vertical rhythm
      >
        <div className="w-full space-y-4">
          {studentLoginData.map((data, index) => (
            <input
              key={index}
              type={data.type}
              name={data.name} // HTML5 addition
              id={`student-login-${data.name}`} // HTML5 addition
              placeholder={data.placeholder}
              value={data.value}
              onChange={(e) => {
                data.stateManager(e.target.value);
              }}
              // Sleek, dark input field with cyan focus
              className="bg-gray-800/60 
                         border border-gray-700 
                         rounded-lg p-3 w-full max-w-sm m-auto block 
                         text-gray-200 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400
                         transition-all duration-300" 
              required
              aria-label={data.placeholder} // Accessibility
            />
          ))}
        </div>
        
        {/* BUTTON - Sleek, accent-colored button with loading state */}
        <button 
          type="submit"
          className="relative 
                     w-full max-w-sm m-auto block
                     mt-6 p-3 rounded-lg 
                     bg-cyan-600 hover:bg-cyan-500 
                     text-white font-bold text-lg 
                     shadow-lg shadow-cyan-900/50
                     transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? <Loader /> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default StudentLogin;