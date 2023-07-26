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
      placeholder: "Enter Full Name",
      value: student_full_name,
      type: "text",
      stateManager: set_student_full_name,
    },
    {
      placeholder: "Enter Matric Number",
      value: student_matric_number,
      type: "text",
      stateManager: set_student_matric_number,
    },
    {
      placeholder: "Enter Department",
      value: student_department,
      type: "text",
      stateManager: set_student_department,
    },
    {
      placeholder: "Enter Level",
      value: student_level,
      type: "number",
      stateManager: set_student_level,
    },
    {
      placeholder: "Enter Email",
      value: student_email,
      type: "email",
      stateManager: set_student_email,
    },
    {
      placeholder: "Enter Password",
      value: student_password,
      type: "password",
      stateManager: set_student_password,
    },
    {
      placeholder: "Verify Password",
      value: student_re_password,
      type: "password",
      stateManager: set_student_re_password,
    },
  ];

  const resetAllFields = () => {
    // Iterate through the lecturerLoginData array and reset each state to empty
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
      return;
    }

    if (student_password !== student_re_password) {
      setError("Password does not match");
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
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("weak-password")) {
        setError("Password should be at least 6 characters ");
      }
    }
    setLoading(false);
    resetAllFields();
  };

  return (
    <div className="mt-14">
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form
        onSubmit={studentRegister}
        className="text-center pt-8 text-white space-x-4 space-y-8 m-auto"
      >
        <div className="w-full md:w-1/2 p-2 space-y-8 w-100 m-auto">
          {studentSignUpData.map((data, index) => (
            <input
              key={index}
              type={data.type}
              name={data.value}
              placeholder={data.placeholder}
              value={data.value}
              onChange={(e) => {
                data.stateManager(e.target.value);
              }}
              className="bg-transparent border mx-2  rounded-full p-4 pl-6 w-72"
              required
            />
          ))}
        </div>
        <button className="mt-8">
          {loading ? <Loader /> : "Register"}
          <hr className="mt-2 w-20 border" />
        </button>
      </form>
    </div>
  );
}

export default StudentSignUp;
