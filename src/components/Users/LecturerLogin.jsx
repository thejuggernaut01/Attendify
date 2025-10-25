import React, { useState, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../store/AuthContext";
import Loader from "../helpers/Loader";
import { db } from "../../firebase";

function LecturerLogin() {
  const [lecturer_login_email, set_lecturer_login_email] = useState("");
  const [lecturer_login_password, set_lecturer_login_password] = useState("");

  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const lecturerCollection = collection(db, "lecturerCollection");

  const lecturerLoginData = [
    {
      placeholder: "Enter Email",
      value: lecturer_login_email,
      type: "email",
      stateManager: set_lecturer_login_email,
      name: "email", // Added name attribute for accessibility/form
    },
    {
      placeholder: "Enter Password",
      value: lecturer_login_password,
      type: "password",
      stateManager: set_lecturer_login_password,
      name: "password", // Added name attribute for accessibility/form
    },
  ];

  const resetAllFields = () => {
    lecturerLoginData.forEach((data) => {
      data.stateManager("");
    });
  };

  const lecturerLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const lecturerQuery = query(
        lecturerCollection,
        where("email", "==", lecturer_login_email)
      );
      const querySnapshot = await getDocs(lecturerQuery);

      if (!querySnapshot.empty) {
        await login(lecturer_login_email, lecturer_login_password);
        navigate("/lecturer");
      } else {
        setError("Lecturer Login Details Not Found!");
      }
    } catch (error) {
      console.log(error.message);
      // More specific error handling
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

    // resetAllFields(); // Commenting this out: It's usually better UX to keep fields filled if login fails due to wrong password/email
  };

  return (
    <div className="mt-8"> {/* Adjusted margin for better spacing within AuthUI card */}
      {/* Error Message - Use stark red for visibility */}
      {error && (
        <p 
          className="text-red-500 text-sm font-medium text-center mb-6 p-2 rounded bg-red-900/30 border border-red-900 mx-auto max-w-xs md:max-w-sm"
          role="alert" // Accessibility
        >
          {error}
        </p>
      )}

      <form
        onSubmit={lecturerLogin}
        className="text-center text-white space-y-6" // Use space-y for vertical rhythm
      >
        <div className="w-full space-y-4">
          {lecturerLoginData.map((data, index) => (
            <input
              key={index}
              type={data.type}
              name={data.name} // HTML5 addition
              id={`lecturer-login-${data.name}`} // HTML5 addition for labels if needed
              placeholder={data.placeholder}
              value={data.value}
              onChange={(e) => {
                data.stateManager(e.target.value);
              }}
              className="bg-gray-800/60 
                         border border-gray-700 
                         rounded-lg p-3 w-full max-w-sm m-auto block 
                         text-gray-200 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400
                         transition-all duration-300" // Sleek, dark input field with cyan focus
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
          {/* Replaced <hr> with a cleaner button design */}
          {loading ? <Loader /> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LecturerLogin;