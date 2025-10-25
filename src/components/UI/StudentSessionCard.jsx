import { useState, useEffect, useContext, useMemo } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";
import { db } from "../../firebase";
import { powerSvg } from "./Svg"; // Assuming powerSvg is an SVG icon component
import QRCode from "react-qr-code";
import Loader from "../helpers/Loader"; // Assuming your custom Loader
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi'; // Icons for showing/hiding QR code

const StudentSessionCard = () => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null); // Changed to null for clarity
  const { currentUser } = useContext(AuthContext);

  const [showBarcode, setShowBarcode] = useState(false);
  const [timestamp, setTimestamp] = useState("");

  const studentCollection = collection(db, "studentCollection");

  // --- Data Fetching Effect ---
  useEffect(() => {
    // Only proceed if a user is logged in
    if (!currentUser || !currentUser.email) {
        setLoading(false);
        return;
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
        } else {
          console.log("No matching student document found!");
          setStudentData(null);
        }
      } catch (error) {
        console.error("Error fetching student data:", error.message);
        setStudentData(null);
      }
      setLoading(false);
    };

    fetchStudentData();
  }, [currentUser]); // Dependencies updated

  // --- QR Data Generation (Memoized for efficiency) ---
  const qrDataValue = useMemo(() => {
    if (!studentData) return "";

    // IMPORTANT: Generate a clean, single JSON object containing necessary identifiers.
    const dataToEncode = {
        name: studentData.name,
        matricNumber: studentData.matricNumber,
        department: studentData.department,
        level: studentData.level,
        email: studentData.email,
        // Add a fresh timestamp ONLY when the barcode is toggled on
        timestamp: showBarcode ? new Date().toISOString() : undefined,
    };
    
    return JSON.stringify(dataToEncode);
  }, [studentData, showBarcode]);

  // --- Session Button Handler ---
  const handleJoinSessionClick = () => {
    // Toggling the QR code visibility
    if (showBarcode) {
      setShowBarcode(false); // Hide the QR code
      setTimestamp(""); // Clear timestamp when hiding
    } else {
      setShowBarcode(true); // Show the QR code
      // We rely on the `useMemo` above to grab the fresh timestamp when showBarcode becomes true
    }
  };

  // --- Button Styles ---
  const buttonStyle = showBarcode
    ? "bg-red-900/40 hover:bg-red-900/70 border-red-700 text-red-400 shadow-lg shadow-red-900/50" // Active (Hiding)
    : "bg-cyan-900/40 hover:bg-cyan-900/70 border-cyan-700 text-cyan-400 shadow-lg shadow-cyan-900/50"; // Inactive (Showing)
    
  const buttonText = showBarcode ? "Hide QR Code" : "Generate Student ID QR";
  const buttonIcon = showBarcode ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />;


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
              <p>Profile data required to generate QR ID.</p>
          </div>
      );
  }

  return (
    <>
      <section className="mt-5 px-4">
        {/* Session Button Card */}
        <div
          onClick={handleJoinSessionClick}
          className="text-center bg-gray-900 rounded-2xl py-6 w-full max-w-lg mx-auto 
                     shadow-xl shadow-black/30 border border-gray-800 transition-all duration-300 cursor-pointer"
          aria-label={buttonText}
        >
          <div className="flex justify-center">
            {/* Styled Button with State Icons */}
            <button 
                className={`flex items-center justify-center 
                            w-20 h-20 p-4 rounded-full border-4 
                            transition-all duration-300 transform hover:scale-105 
                            ${buttonStyle}`}
            >
                {buttonIcon}
            </button>
          </div>

          <p className={`text-lg font-bold mt-3 ${showBarcode ? 'text-red-400' : 'text-cyan-400'}`}>
            {buttonText}
          </p>
        </div>
      </section>

      {/* QR Code Display Card */}
      <aside className="mt-6 px-4">
        <div 
            className={`flex justify-center items-center flex-col py-8 w-full max-w-lg h-auto min-h-[150px] mx-auto 
                        rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl shadow-cyan-900/30 
                        transition-all duration-500 overflow-hidden ${showBarcode ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          {showBarcode && (
            <div className="p-4 bg-white rounded-xl shadow-inner shadow-black/50">
                {/* QR Code component - value is the stringified JSON object */}
                <QRCode 
                    value={qrDataValue} 
                    size={200}
                    level="H" // High error correction level
                />
            </div>
          )}
          
          <p className="mt-4 text-sm text-gray-500 italic">
              {showBarcode ? `Scan valid for ${new Date().toLocaleTimeString()}` : "ID is hidden."}
          </p>
        </div>
      </aside>
    </>
  );
};

export default StudentSessionCard;