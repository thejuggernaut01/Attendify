import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";
import Loader from "../helpers/Loader";
import { db } from "../../firebase";

function StudentSignUp() {
  const [student_full_name, set_student_full_name] = useState("");
  const [student_matric_number, set_student_matric_number] = useState("");
  const [student_department, set_student_department] = useState("");
  const [student_level, set_student_level] = useState("");
  const [student_email, set_student_email] = useState("");
  const [student_password, set_student_password] = useState("");
  const [student_re_password, set_student_re_password] = useState("");

  const { signUp } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const studentCollection = collection(db, "studentCollection");
  const navigate = useNavigate();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail|yahoo|icloud|hotmail|outlook|aol|protonmail|zoho)+\.(com|net|org|edu|info|co|gov)$/;

  const studentSignUpData = [
    {
      placeholder: "Full Name",
      value: student_full_name,
      type: "text",
      stateManager: set_student_full_name,
      name: "fullName",
    },
    {
      placeholder: "Matric Number",
      value: student_matric_number,
      type: "text",
      stateManager: set_student_matric_number,
      name: "matricNumber",
    },
    {
      placeholder: "Department",
      value: student_department,
      type: "text",
      stateManager: set_student_department,
      name: "department",
    },
    {
      placeholder: "Level (e.g., 100)",
      value: student_level,
      type: "number",
      stateManager: set_student_level,
      name: "level",
    },
    {
      placeholder: "Email Address",
      value: student_email,
      type: "email",
      stateManager: set_student_email,
      name: "email",
    },
    {
      placeholder: "Password",
      value: student_password,
      type: "password",
      stateManager: set_student_password,
      name: "password",
    },
    {
      placeholder: "Verify Password",
      value: student_re_password,
      type: "password",
      stateManager: set_student_re_password,
      name: "verifyPassword",
    },
  ];

  const resetAllFields = () => {
    studentSignUpData.forEach((data) => {
      data.stateManager("");
    });
  };

  const studentRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!emailRegex.test(student_email) || student_email.trim() === "") {
      setError("Enter a valid email address");
      setLoading(false);
      return;
    }

    if (student_password !== student_re_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    // Basic check for required fields
    const isAnyFieldEmpty = studentSignUpData.some(data => !data.value.toString().trim());
    if (isAnyFieldEmpty) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
    }

    try {
      await signUp(student_email, student_password);

      await addDoc(studentCollection, {
        name: student_full_name,
        matricNumber: student_matric_number.toLowerCase(),
        department: student_department,
        level: student_level,
        email: student_email,
      });

      navigate("/student");
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
      setLoading(false);
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
        onSubmit={studentRegister}
        className="text-center text-white space-y-6" // Use space-y for vertical rhythm
      >
        {/* Input Grid: 2 columns on medium screens, 1 column on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentSignUpData.map((data, index) => (
            <input
              key={index}
              type={data.type}
              name={data.name} // HTML5 addition for clean forms
              id={`student-signup-${data.name}`} // HTML5 addition
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
              // The password fields should span the full width
              // Note: You can add logic here if you want password fields to span 2 cols on md
              style={ (data.name === 'password' || data.name === 'verifyPassword') && index > 4 ? {gridColumn: '1 / -1', maxWidth: '30rem', margin: 'auto'} : {} }
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

export default StudentSignUp;