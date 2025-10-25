import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { FiSearch, FiCalendar } from "react-icons/fi"; // Icons for search
import Navbar from "../components/layout/Navbar";
import Loader from "../components/helpers/Loader";

const AttendancePage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]); // Store original fetched data
  const searchByDate = useRef();
  const [loading, setLoading] = useState(false);
  const [searchDateValue, setSearchDateValue] = useState(''); // State for input value

  const attendanceCollection = collection(db, "attendanceCollection");

  // Helper function to flatten the nested scannedStudents array
  // Assuming the structure from previous components is now cleaner, but keeping this helper for legacy data
  function flattenAndParseStudentData(allAttendanceDocs) {
    // Flatten the array of scannedStudents arrays
    const allScannedStudents = allAttendanceDocs.flatMap(doc => doc.scannedStudents || []);

    // Process each student entry. We assume the data is now an array of clean objects, 
    // but handle the legacy array-in-array structure if needed.
    const studentData = [];
    
    for (const studentEntry of allScannedStudents) {
        // Check if the entry is an object (clean data)
        if (typeof studentEntry === 'object' && studentEntry !== null && studentEntry.matricNumber) {
            studentData.push(studentEntry);
        } 
        // Handle legacy JSON string data (as was in the original code)
        else if (typeof studentEntry === 'string') {
            try {
                // The original code was parsing a JSON string that resulted in a [studentInfoJson, timestamp] array
                const [studentInfoJson, timestamp] = JSON.parse(studentEntry); 
                const studentInfo = { ...studentInfoJson, timestamp };
                studentData.push(studentInfo);
            } catch (e) {
                // Handle parsing errors for malformed QR data
                console.error("Failed to parse student JSON string:", studentEntry, e);
            }
        }
    }
    
    return studentData;
  }
  
  // --- Search Handler ---
  const searchByDateHandler = () => {
    const searchDate = searchDateValue.trim();

    if (!searchDate) {
        // If search is cleared, show all initial data
        setData(initialData);
        return;
    }

    const matchDate = initialData.filter((student) => {
      // Assuming student object has a timestamp property like "2023-07-31T10:00:00.000Z"
      const studentDate = student.timestamp ? student.timestamp.split("T")[0] : null;
      return studentDate === searchDate;
    });

    setData(matchDate);
  };

  // --- Data Fetching Effect ---
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
          const allAttendanceDocs = querySnapshot.docs.map((doc) => doc.data());
          
          // Use the simplified data structure created in the previous step (clean objects)
          // If the data is still stored as nested JSON strings, the helper function is needed.
          
          // A safer, more robust way:
          const processedStudents = flattenAndParseStudentData(allAttendanceDocs);
          
          // Sort data by name or time if desired
          processedStudents.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

          setInitialData(processedStudents); // Store all data
          setData(processedStudents);       // Display all data initially
        } else {
            setInitialData([]);
            setData([]);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.course]);

  // --- Component Render ---
  return (
    // Main Container: Deep dark background, light text
    <div className="bg-gray-950 min-h-screen text-gray-100 pb-10">
      <Navbar />
      
      <section className="mt-10 px-4 max-w-4xl mx-auto">
        
        {/* Title */}
        <h2 className="text-center text-3xl font-extrabold text-cyan-400 mb-6 border-b border-gray-800 pb-3">
          Attendance For {params.course}
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center space-x-3 my-6">
          <div className="relative flex items-center">
            <FiCalendar className="absolute left-3 text-gray-500" size={18} />
            <input
              type="date" // Use type="date" for native date picker UI
              className="border-2 border-gray-700 h-10 rounded-lg pl-10 pr-4 
                         bg-gray-800 text-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 
                         transition-colors"
              placeholder="YYYY-MM-DD"
              ref={searchByDate}
              value={searchDateValue}
              onChange={(e) => setSearchDateValue(e.target.value)}
            />
          </div>
          
          <button
            className="flex items-center space-x-2 border py-2 px-4 rounded-lg 
                       bg-cyan-600 text-white font-semibold hover:bg-cyan-500 hover:scale-[1.03] 
                       shadow-md shadow-cyan-900/50 transition-all duration-200"
            onClick={searchByDateHandler}
          >
            <FiSearch size={18} />
            <span>Search</span>
          </button>
        </div>

        {/* Content/Results */}
        {loading ? (
          <div className="text-center py-10">
            <Loader />
          </div>
        ) : (
          <div className="mt-8">
            {data.length > 0 ? (
              // Table Container
              <div className="bg-gray-900 rounded-xl shadow-2xl shadow-black/50 overflow-hidden border border-gray-800">
                <table className="w-full">
                  {/* Table Header */}
                  <thead className="bg-gray-800 border-b border-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold uppercase text-cyan-400 w-1/3">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold uppercase text-cyan-400 w-1/3">Matric Number</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold uppercase text-cyan-400 w-1/3 hidden sm:table-cell">Scan Time</th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                    {data.map((student, index) => (
                      <tr
                        key={`${student.matricNumber}-${student.timestamp}-${index}`} // Better unique key
                        className="border-b border-gray-700 hover:bg-gray-800/70 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-200 w-1/3">{student.name}</td>
                        <td className="py-3 px-4 text-sm font-mono text-gray-400 w-1/3">{student.matricNumber}</td>
                        <td className="py-3 px-4 text-xs text-gray-500 w-1/3 hidden sm:table-cell">
                            {/* Format timestamp to readable time/date */}
                            {student.timestamp ? new Date(student.timestamp).toLocaleTimeString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center p-8 text-xl font-semibold text-gray-400 bg-gray-900 rounded-xl border border-gray-800 shadow-lg">
                No attendance recorded for {params.course} 
                {searchDateValue && ` on ${searchDateValue}`}.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AttendancePage;