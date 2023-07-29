import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom"; 

const LecturerCard = (props) => {
  const [lecturerData, setLecturerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState("")
  const navigate = useNavigate();

  const lecturerCollection = collection(db, "lecturerCollection");

  useEffect(() => {
    if (!currentUser) {
      // Step 2: Redirect if the user is not logged in
      navigate("/home");
    }else{
    const fetchLecturerData = async () => {
      try {
        setLoading(true);
        const lecturerQuery = query(
          lecturerCollection,
          where("email", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(lecturerQuery);

        if (!querySnapshot.empty) {
          const lecturerData = querySnapshot.docs[0].data();
          setLecturerData(lecturerData);
          setAvatar(lecturerData.name.charAt(0).toUpperCase())
        } else {
          console.log("No matching documents found!");
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };

    fetchLecturerData();
  }
  }, [currentUser.email]);

  return (
    <>
    <section className="mt-10">
    <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
      <div className="inline-block text-white p-14 rounded-[50%] bg-blue-500 relative">
        <h2
          className="absolute text-6xl top-[50%] left-[50%]"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {avatar}
        </h2>
      </div>
      <p className="text-lg font-semibold">
        {lecturerData.name}
      </p>
      <p className="text-sm italic">
       {lecturerData.department}
      </p>
    </div>
  </section>
    </>
  );
};

export default LecturerCard;