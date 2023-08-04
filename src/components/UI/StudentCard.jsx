import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const StudentCard = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const studentCollection = collection(db, "studentCollection");

  useEffect(() => {
    if (!currentUser) {
      // Step 2: Redirect if the user is not logged in
      navigate("/home");
    } else {
      const fetchStudentData = async () => {
        try {
          setLoading(true);
          const studentsQuery = query(
            studentCollection,
            where("email", "==", currentUser.email)
          );
          const querySnapshot = await getDocs(studentsQuery);

          if (!querySnapshot.empty) {
            const studentData = querySnapshot.docs[0].data();
            setStudentData(studentData);
            setAvatar(studentData.department.toUpperCase());
          } else {
            console.log("No matching documents found!");
          }
        } catch (error) {
          console.log(error.message);
        }
        setLoading(false);
      };

      fetchStudentData();
    }
  }, [currentUser, studentCollection]);

  return (
    <>
      <section className="">
        <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <div className="inline-block text-white p-14 rounded-[50%] bg-blue-500 relative">
            <h2
              className="absolute text-6xl top-[50%] left-[50%]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {studentData.name && studentData.name[0]}
            </h2>
          </div>
          <p className="text-lg font-semibold">
            {studentData && studentData.name}
          </p>
          <p className="text-sm italic">{studentData && avatar}</p>
        </div>
      </section>
    </>
  );
};

export default StudentCard;
