import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../helpers/Loader"; // Assuming you have your custom Loader

const LecturerCard = (props) => {
  const [lecturerData, setLecturerData] = useState(null); // Use null for initial state
  const [loading, setLoading] = useState(true); // Start loading immediately
  const { currentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const lecturerCollection = collection(db, "lecturerCollection");

  useEffect(() => {
    // Check if currentUser exists before trying to access its properties
    if (!currentUser) {
      // User is not logged in, but wait a moment to ensure Firebase hasn't just initialized
      const timeout = setTimeout(() => {
          if (!currentUser) {
              navigate("/home");
          }
      }, 500); // Short delay
      return () => clearTimeout(timeout);
    }

    const fetchLecturerData = async () => {
      setLoading(true);
      try {
        const lecturerQuery = query(
          lecturerCollection,
          where("email", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(lecturerQuery);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setLecturerData(data);
          // Set avatar from the first letter of the name
          setAvatar(data.name ? data.name.charAt(0).toUpperCase() : 'L');
        } else {
          console.log("No matching documents found for the current user email.");
          setLecturerData(null);
          setAvatar('L');
        }
      } catch (error) {
        console.error("Error fetching lecturer data:", error.message);
        setLecturerData(null);
        setAvatar('L');
      } finally {
        setLoading(false);
      }
    };

    // Ensure email is available before fetching
    if (currentUser.email) {
      fetchLecturerData();
    }
  }, [currentUser, navigate]); // Added navigate to dependencies

  // If still loading, show a full-screen spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader /> {/* Use your existing Loader component */}
      </div>
    );
  }
  
  // If data hasn't loaded (e.g., initial state or error)
  if (!lecturerData) {
      return (
          <div className="text-center mt-10 p-6 w-[90%] max-w-lg mx-auto bg-red-900/30 rounded-xl border border-red-700 text-red-300">
              <p>Failed to load lecturer profile. Please check your network or try logging in again.</p>
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
            {avatar}
          </h2>
        </div>
        
        {/* Lecturer Name */}
        <p className="text-2xl font-bold mt-4 text-gray-100">
          {lecturerData.name || 'Loading...'}
        </p>
        
        {/* Department/Title */}
        <p className="text-md italic text-gray-400">
          {lecturerData.department || 'N/A'}
        </p>
        
        {/* Email - Optional but useful to display */}
        <p className="text-sm text-gray-500 mt-1">
          {lecturerData.email}
        </p>
      </div>
    </section>
  );
};

export default LecturerCard;