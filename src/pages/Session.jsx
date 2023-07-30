import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";
import { db } from "../firebase";

import StudentCard from "../components/UI/StudentCard";
import ClassRepSessionCard from "../components/UI/ClassRepSessionCard";
import ClassRepSessionDetails from "../components/UI/ClassRepSessionDetails";
import StudentSessionCard from "../components/UI/StudentSessionCard";
import StudentSessionDetails from "../components/UI/StudentSessionDetails";

const Session = () => {
  const [data, setData] = useState([]);
  const [isClassRep, setIsClassRep] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const courseCollection = collection(db, "courseCollection");

  const email = currentUser && currentUser.email;

  useEffect(() => {
    const fetchData = async () => {
      const courseQuery = query(
        courseCollection,
        where("classRepMail", "==", email)
      );

      const querySnapshot = await getDocs(courseQuery);
      if (!querySnapshot.empty) {
        setData(querySnapshot.docs.map((doc) => doc.data()));
        setIsClassRep(true);
      } else {
        console.log("No matching documents found!");
      }
    };

    fetchData();
  }, [courseCollection, email]);

  return (
    <>
      <article className="py-8 bg-gray-500">
        <StudentCard />
        {isClassRep ? <ClassRepSessionCard /> : <StudentSessionCard />}
        {isClassRep ? (
          <ClassRepSessionDetails data={data} />
        ) : (
          <StudentSessionDetails />
        )}
      </article>
    </>
  );
};

export default Session;
