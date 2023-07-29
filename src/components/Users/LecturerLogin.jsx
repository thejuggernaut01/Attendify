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
    },
    {
      placeholder: "Enter Password",
      value: lecturer_login_password,
      type: "password",
      stateManager: set_lecturer_login_password,
    },
  ];

  const resetAllFields = () => {
    // Iterate through the lecturerLoginData array and reset each state to empty
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
      if (error.message.includes("user-not-found")) {
        setError("User Not Found");
      } else if (error.message.includes("wrong-password")) {
        setError("Wrong Password");
      } else {
        setError("An unexpected error occurred");
      }
    }
    setLoading(false);

    resetAllFields();
  };

  return (
    <div className="mt-14">
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form
        onSubmit={lecturerLogin}
        className="text-center text-white space-x-4 space-y-8 m-auto"
      >
        <div className="w-full md:w-1/2 p-2 space-y-8 w-100 m-auto">
          {lecturerLoginData.map((data, index) => (
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

export default LecturerLogin;
