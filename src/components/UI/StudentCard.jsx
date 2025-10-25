import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";
import { db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../helpers/Loader"; // Assuming you have your custom Loader

const StudentCard = () => {
  const [studentData, setStudentData] = useState(null); // Use null for initial state
  const [loading, setLoading] = useState(true); // Start loading immediately
  const [avatarLetter, setAvatarLetter] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const studentCollection = collection(db, "studentCollection");

  useEffect(() => {
    // Redirect if the user is not logged in
    if (!currentUser) {
      const timeout = setTimeout(() => {
        if (!currentUser) {
          navigate("/home");
        }
      }, 500);
      return () => clearTimeout(timeout);
    }

    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const studentsQuery = query(
          studentCollection,
          where("email", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(studentsQuery);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setStudentData(data);
          // Set avatar to the first letter of the name for a better visual
          setAvatarLetter(data.name ? data.name.charAt(0).toUpperCase() : 'S');
        } else {
          console.log("No matching student document found!");
          setStudentData(null);
          setAvatarLetter('S');
        }
      } catch (error) {
        console.error("Error fetching student data:", error.message);
        setStudentData(null);
        setAvatarLetter('S');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser.email) {
      fetchStudentData();
    }
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  if (!studentData) {
    return (
        <div className="text-center mt-10 p-6 w-[90%] max-w-lg mx-auto bg-red-900/30 rounded-xl border border-red-700 text-red-300">
            <p>Profile data not found. Please ensure your account is registered correctly.</p>
        </div>
    );
  }

  return (
    <section className="mt-10 px-4">
      {/* Card Container: Dark, prominent, rounded, with shadow */}
      <div 
        className="text-center bg-gray-900 rounded-2xl py-8 w-full max-w-lg mx-auto 
                   shadow-2xl shadow-cyan-900/30 border border-gray-800"
      >
        {/* Avatar Circle */}
        <div 
          className="inline-block text-white w-28 h-28 rounded-full bg-cyan-600 relative 
                     border-4 border-cyan-400/50 shadow-xl shadow-cyan-900/50"
        >
          <h2
            className="absolute text-5xl font-extrabold top-1/2 left-1/2 
                       transform -translate-x-1/2 -translate-y-1/2"
          >
            {avatarLetter}
          </h2>
        </div>
        
        {/* Student Name */}
        <p className="text-2xl font-bold mt-4 text-gray-100">
          {studentData.name}
        </p>
        
        {/* Matric Number (Key Identifier) */}
        <p className="text-md italic text-gray-400 font-mono">
          {studentData.matricNumber || 'N/A'}
        </p>

        {/* Department and Level */}
        <p className="text-sm text-gray-500 mt-1">
          {studentData.department} | {studentData.level} Level
        </p>

        {/* Student ID Button */}
        <Link to={"id"}>
          <button 
            className="mt-6 font-bold text-lg cursor-pointer rounded-full inline-block px-8 py-2 
                       bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/50 
                       transition-all duration-300"
          >
            View QR ID
          </button>
        </Link>
      </div>
    </section>
  );
};

export default StudentCard;