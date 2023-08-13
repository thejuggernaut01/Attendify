import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";
import QRCode from "react-qr-code";

const StudentID = () => {
  const [showBarcode, setShowBarcode] = useState(false);
  const [QRData, setQRData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const currentUserEmail = currentUser && currentUser.email;

  const studentCollection = collection(db, "studentCollection");
  const navigate = useNavigate();

  const showBarcodeHandler = () => {
    if (showBarcode) {
      setShowBarcode(false); // Hide the QR code
    } else {
      setShowBarcode(true); // Show the QR code
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const studentColQuery = query(
            studentCollection,
            where("email", "==", currentUserEmail)
          );

          const querySnapshot = await getDocs(studentColQuery);
          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            setQRData(data);
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="flex justify-center items-center h-[50vh]">
        <button
          onClick={showBarcodeHandler}
          className="mt-5 font-semibold text-lg cursor-pointer border rounded-lg inline-block px-5 py-2 bg-blue-500 text-white"
        >
          Generate ID
        </button>
      </section>

      <aside className="mt-6">
        <div className="flex justify-center items-center flex-col bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] h-80 mx-auto">
          {showBarcode ? <QRCode value={JSON.stringify(QRData)} /> : null}
        </div>
      </aside>
    </>
  );
};

export default StudentID;
