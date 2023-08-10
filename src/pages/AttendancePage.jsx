import { useParams } from "react-router-dom";

import { useState, useEffect, userEF, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import Navbar from "../components/layout/Navbar";
import Loader from "../components/helpers/Loader";

const AttendancePage = () => {
  const params = useParams();
  const [data, setData] = useState([]);

  const searchByDate = useRef();
  const [loading, setLoading] = useState(false);

  const attendanceCollection = collection(db, "attendanceCollection");
  const v4Id = uuidv4();

  function flattenNestedArray(arr) {
    let result = [];

    arr.forEach((item) => {
      if (Array.isArray(item)) {
        result = result.concat(flattenNestedArray(item));
      } else {
        result.push(item);
      }
    });

    return result;
  }

  const searchByDateHandler = () => {
    const matchDate = data.filter((data) => {
      const studentDate = data.timestamp.split("T")[0];
      const searchDate = searchByDate && searchByDate.current.value;
      return searchDate === studentDate;
    });
    console.log(matchDate);

    setData([]);
    setTimeout(() => {
      setData(matchDate);
    }, 1000);
  };

  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const attendanceQuery = query(
          attendanceCollection,
          where("courseCode", "==", params.course)
        );

        const querySnapshot = await getDocs(attendanceQuery);

        if (!querySnapshot.empty) {
          const allData = querySnapshot.docs.map((doc) => doc.data());
          const scannedStudents = allData.map((data) => data.scannedStudents);

          const allScannedStudents = flattenNestedArray(scannedStudents);

          const studentData = [];

          for (const jsonString of allScannedStudents) {
            const [studentInfoJson, timestamp] = JSON.parse(jsonString);
            const studentInfo = { ...studentInfoJson, timestamp };
            studentData.push(studentInfo);
          }

          setData(studentData);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <section className="mt-10">
        <h2 className="text-center text-2xl">Attendance For {params.course}</h2>

        <div className="text-center space-x-3 my-6">
          <input
            type="text"
            className="border-2 border-black h-10 rounded pl-2"
            placeholder="2023-07-31"
            ref={searchByDate}
          />
          <button
            className="border border-black py-2 px-4 rounded-lg bg-black text-white hover:scale-[1.03]"
            onClick={searchByDateHandler}
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : (
          <div>
            {data.length > 0 ? (
              <table className="w-[90%] mx-auto">
                <thead>
                  <tr className="flex justify-between border-b-black border-b-2">
                    <th className="text-xl font-semibold">Name</th>
                    <th className="py-2 text-xl font-semibold">
                      Matric Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) => (
                    <tr
                      key={`${v4Id} ${data.matricNumber} ${data.name}`}
                      className="flex justify-between border-b-black border-b-2"
                    >
                      <td className="py-2 text-lg">{data.name}</td>
                      <td className="py-2 text-lg font-semibold">
                        {data.matricNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center xs:text-xl sm:text-2xl font-semibold">
                No attendance was recorded for {params.course} on{" "}
                {searchByDate && searchByDate.current.value}.
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default AttendancePage;
