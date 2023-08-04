import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";
import { db } from "../../firebase";
import { powerSvg } from "./Svg";
import QRCode from "react-qr-code";

const StudentSessionCard = () => {
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const studentCollection = collection(db, "studentCollection");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentsQuery = query(
          studentCollection,
          where("email", "==", currentUser.email)
        );
        setLoading(true);
        const querySnapshot = await getDocs(studentsQuery);

        if (!querySnapshot.empty) {
          const currentData = querySnapshot.docs[0].data();
          setCurrentData(currentData);
        } else {
          console.log("No matching documents found!");
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };

    fetchStudentData();
  }, [currentUser, studentCollection]);

  const [showBarcode, setShowBarcode] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const [QRData, setQRData] = useState([]);

  const handleJoinSessionClick = () => {
    if (showBarcode) {
      setShowBarcode(false); // Hide the QR code
    } else {
      const now = new Date();
      setTimestamp(now.toISOString());
      setShowBarcode(true); // Show the QR code
    }
  };

  useEffect(() => {
    // Update QRData whenever currentData or timestamp changes
    setQRData([currentData, timestamp]);
  }, [showBarcode]);

  return (
    <>
      <section className="mt-5">
        <div
          onClick={handleJoinSessionClick}
          className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto"
        >
          <div className="flex justify-center">
            <button className="text-green-500">{powerSvg}</button>
          </div>

          <p className="text-lg font-bold">
            Join session
          </p>
        </div>
      </section>

      <aside className="mt-6">
        <div className="flex justify-center items-center flex-col bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-80 mx-auto">
          {showBarcode ? <QRCode value={JSON.stringify(QRData)} /> : null}
        </div>
      </aside>
    </>
  );
};

export default StudentSessionCard;
