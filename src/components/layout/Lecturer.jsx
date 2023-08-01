import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../layout/Navbar";
// import StudentCard from "../UI/StudentCard";
import { FiLoader, FiX } from "react-icons/fi"; // Importing icons from React Icons library
import CourseCard from "../UI/CourseCard";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import LectuerCard from "../UI/LecturerCard";
import AddIcon from "../../icons/icon_addicon.svg";
import { AuthContext } from "../../store/AuthContext";

function Lecturer() {
  const [classRepMail, setClassRepMail] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseUnit, setCourseUnit] = useState(0);
  const [lecturerName, setLecturerName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); // State variable for form visibility
  const [coursesData, setCoursesData] = useState([]); // State variable for storing course data
  const [isLoading, setIsLoading] = useState(false); // State variable for loading state
  const formRef = useRef(null); // Ref to the form element
  const { currentUser } = useContext(AuthContext);
  const coursesRef = collection(db, "courseCollection");
  
  const fetchCoursesData = async () => {
    const email = currentUser && currentUser.email;

    const courseQuery = query(coursesRef, where("lecturerEmail", "==", email));

    const querySnapshot = await getDocs(courseQuery);
    const coursesData = querySnapshot.docs.map((doc) => doc.data());
    setCoursesData(coursesData);
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Show loading icon on form submit

    const dataToSave = {
      classRepMail,
      courseCode: courseCode.toUpperCase(),
      courseTitle: courseTitle.toUpperCase(),
      courseUnit,
      lecturerName,
      lecturerEmail: currentUser.email,
    };

    try {
      await saveDataToFirestore(dataToSave);
      setIsLoading(false); // Hide loading icon on successful form submit
      setShowAddForm(false);
      fetchCoursesData();
    } catch (error) {
      console.error("Error saving data:", error);
      setIsLoading(false); // Hide loading icon on error
    }
  };

  const saveDataToFirestore = (data) => {
    return addDoc(collection(db, "courseCollection"), data);
  };

  const handleButtonClick = () => {
    setShowAddForm(true); // Show the form on button click
  };

  // Function to handle clicks outside of the form
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowAddForm(false);
    }
  };

  useEffect(() => {
    // Attach event listener to handle clicks outside of the form
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  // Logout User
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="bg-gray-100 h-full pb-16">
      <Navbar logout={handleLogout} />

      <LectuerCard />
      <section className="mt-5">
        <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <div className="flex justify-center">
            <button className="text-green-500" onClick={handleButtonClick}>
              <img src={AddIcon} alt="Add Course" />
            </button>
          </div>
          <p className="mt-2" onClick={handleButtonClick}>
            Add Course
          </p>
        </div>
      </section>

      {/* Dynamically render Course Cards */}
      {coursesData.map((course, index) => (
        <CourseCard
          key={index}
          courseCode={course.courseCode}
          courseTitle={course.courseTitle}
          lecturerName={course.lecturerName}
          courseUnits={course.courseUnit}
        />
      ))}

      {/* Conditional rendering of the add course form */}
      {showAddForm && (
        <div
          className="fixed top-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white py-4 px-6 border-b-2 border-gray-300 rounded-md shadow-lg"
          ref={formRef}
        >
          {isLoading ? ( // Show loading icon when the form is submitting
            <div className="flex justify-center">
              <FiLoader className="text-green-500 animate-spin" size={24} />
            </div>
          ) : (
            <>
              <p className="text-lg text-center p-2">Add Course</p>
              {/* Exit button 
               <div className='inline-flex'>
               <button
                 onClick={() => setShowAddForm(false)}
                 className='text-gray-500 hover:text-gray-700 focus:outline-none'
               >
                 <FiX size={24} />
               </button>
             </div>*/}
              <form
                onSubmit={handleFormSubmit}
                className="grid grid-cols-1 gap-4"
              >
                <input
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Course Title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  required
                />

                <input
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Course Code"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  required
                />

                <input
                  type="number"
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Course Unit"
                  value={courseUnit}
                  onChange={(e) => setCourseUnit(e.target.value)}
                  required
                />

                <input
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Lecturer Name"
                  value={lecturerName}
                  onChange={(e) => setLecturerName(e.target.value)}
                  required
                />

                <input
                  type="email"
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Class Rep Mail"
                  value={classRepMail}
                  onChange={(e) => setClassRepMail(e.target.value)}
                  required
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Lecturer;
