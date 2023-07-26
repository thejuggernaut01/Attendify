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
      placeholder: "Enter Full Name",
      value: lecturer_full_name,
      type: "text",
      stateManager: set_lecturer_full_name,
    },
    {
      placeholder: "Enter Department",
      value: lectuer_department,
      type: "text",
      stateManager: set_lecturer_department,
    },
    {
      placeholder: "Enter Email",
      value: lecturer_email,
      type: "email",
      stateManager: set_lecturer_email,
    },
    {
      placeholder: "Enter Phone Number",
      value: lecturer_phone_number,
      type: "number",
      stateManager: set_lecturer_phone_number,
    },
    {
      placeholder: "Enter Password",
      value: lecturer_password,
      type: "password",
      stateManager: set_lecturer_password,
    },
    {
      placeholder: "Verify Password",
      value: lecturer_re_password,
      type: "password",
      stateManager: set_lecturer_repassword,
    },
  ];

  const resetAllFields = () => {
    // Iterate through the lecturerLoginData array and reset each state to empty
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
      return;
    }

    if (lecturer_password !== lecturer_re_password) {
      setError("Password does not match");
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
        onSubmit={lecturerSignUp}
        className="text-center pt-8 text-white space-x-4 space-y-8 m-auto"
      >
        <div className="w-full md:w-1/2 p-2 space-y-8 w-100 m-auto">
          {lecturerSignUpData.map((data, index) => (
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

export default LecturerSignUp;
