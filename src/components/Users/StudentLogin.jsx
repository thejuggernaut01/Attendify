import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../store/AuthContext";
import Loader from "../helpers/Loader";

function StudentLogin() {
  const [student_login_email, set_student_login_email] = useState("");
  const [student_login_password, set_student_login_password] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const studentLoginData = [
    {
      placeholder: "Enter Email",
      value: student_login_email,
      type: "email",
      stateManager: set_student_login_email,
    },
    {
      placeholder: "Enter Password",
      value: student_login_password,
      type: "password",
      stateManager: set_student_login_password,
    },
  ];

  const resetAllFields = () => {
    // Iterate through the lecturerLoginData array and reset each state to empty
    studentLoginData.forEach((data) => {
      data.stateManager("");
    });
  };

  const studentLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(student_login_email, student_login_password);

      navigate("/student");
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("user-not-found")) {
        setError("User Not Found");
      } else if (error.message.includes("wrong-password")) {
        setError("Wrong Password");
      }
    }
    setLoading(false);

    resetAllFields();
  };

  return (
    <div className="mt-14">
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form
        onSubmit={studentLogin}
        className="text-center pt-8 text-white space-x-4 space-y-8 m-auto"
      >
        <div className="w-full md:w-1/2 p-2 space-y-8 w-100 m-auto">
          {studentLoginData.map((data, index) => (
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
          {loading ? <Loader /> : "Login"}
          <hr className="mt-2 w-20 border" />
        </button>
      </form>
    </div>
  );
}

export default StudentLogin;
