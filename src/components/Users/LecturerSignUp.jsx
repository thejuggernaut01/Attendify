import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../store/AuthContext";
import Loader from "../helpers/Loader";

function LecturerSignUp() {
  // States
  const [lecturer_full_name, set_lecturer_full_name] = useState("");
  const [lectuer_department, set_lecturer_department] = useState("");
  const [lecturer_email, set_lecturer_email] = useState("");
  const [lecturer_phone_number, set_lecturer_phone_number] = useState("");
  const [lecturer_password, set_lecturer_password] = useState("");
  const [lecturer_re_password, set_lecturer_repassword] = useState("");

  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const lecturerCollection = collection(db, "lecturerCollection");

  const navigate = useNavigate();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail|yahoo|icloud|hotmail|outlook|aol|protonmail|zoho)+\.(com|net|org|edu|info|co|gov)$/;

  const lecturerSignUpData = [
    {
      placeholder: "Full Name", // Simplified placeholder
      value: lecturer_full_name,
      type: "text",
      stateManager: set_lecturer_full_name,
      name: "fullName",
    },
    {
      placeholder: "Department", // Simplified placeholder
      value: lectuer_department,
      type: "text",
      stateManager: set_lecturer_department,
      name: "department",
    },
    {
      placeholder: "Email Address", // More descriptive
      value: lecturer_email,
      type: "email",
      stateManager: set_lecturer_email,
      name: "email",
    },
    {
      placeholder: "Phone Number",
      value: lecturer_phone_number,
      type: "tel", // Use 'tel' type for better mobile support
      stateManager: set_lecturer_phone_number,
      name: "phoneNumber",
    },
    {
      placeholder: "Password",
      value: lecturer_password,
      type: "password",
      stateManager: set_lecturer_password,
      name: "password",
    },
    {
      placeholder: "Verify Password",
      value: lecturer_re_password,
      type: "password",
      stateManager: set_lecturer_repassword,
      name: "verifyPassword",
    },
  ];

  const resetAllFields = () => {
    lecturerSignUpData.forEach((data) => {
      data.stateManager("");
    });
  };

  const lecturerSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!emailRegex.test(lecturer_email) || lecturer_email.trim() === "") {
      setError("Enter a valid email address");
      setLoading(false);
      return;
    }

    if (lecturer_password !== lecturer_re_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    // Check if any field is empty (basic validation)
    const isAnyFieldEmpty = lecturerSignUpData.some(data => !data.value.trim());
    if (isAnyFieldEmpty) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
    }

    try {
      await signUp(lecturer_email, lecturer_password);

      await addDoc(lecturerCollection, {
        name: lecturer_full_name,
        department: lectuer_department,
        email: lecturer_email,
        phoneNumber: lecturer_phone_number,
      });

      navigate("/lecturer");
      resetAllFields();
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("weak-password")) {
        setError("Password should be at least 6 characters.");
      } else if (error.message.includes("email-already-in-use")) {
        setError("This email is already registered.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setLoading(false); // Make sure to set loading to false on error
    }
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
        onSubmit={lecturerSignUp}
        className="text-center text-white space-y-4" // Use space-y for vertical rhythm
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Responsive Grid Layout */}
          {lecturerSignUpData.map((data, index) => (
            <input
              key={index}
              type={data.type}
              name={data.name} // HTML5 addition
              id={`lecturer-signup-${data.name}`} // HTML5 addition
              placeholder={data.placeholder}
              value={data.value}
              onChange={(e) => {
                data.stateManager(e.target.value);
              }}
              // Sleek, dark input field with cyan focus
              className="bg-gray-800/60 
                         border border-gray-700 
                         rounded-lg p-3 w-full 
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
          {loading ? <Loader /> : "Register"}
        </button>
      </form>
    </div>
  );
}

export default LecturerSignUp;