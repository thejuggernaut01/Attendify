import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../layout/Navbar";
import { FiLoader, FiX } from "react-icons/fi"; 
import CourseCard from "../UI/CourseCard";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import LectuerCard from "../UI/LecturerCard";
import { AuthContext } from "../../store/AuthContext";
// Assuming you have a custom Loader component for consistency
import Loader from "../helpers/Loader"; 

function Lecturer() {
  const [classRepMail, setClassRepMail] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseUnit, setCourseUnit] = useState(0);
  const [lecturerName, setLecturerName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const { currentUser, logout } = useContext(AuthContext);
  const coursesRef = collection(db, "courseCollection");

  // --- Data Fetching Logic (Unchanged) ---
  const fetchCoursesData = async () => {
    const email = currentUser && currentUser.email;

    if (!email) return;

    const courseQuery = query(coursesRef, where("lecturerEmail", "==", email));

    const querySnapshot = await getDocs(courseQuery);
    const coursesData = querySnapshot.docs.map((doc) => doc.data());
    setCoursesData(coursesData);
  };

  useEffect(() => {
    fetchCoursesData();
  }, [currentUser]); // Added currentUser to dependencies

  // --- Form Submission Logic (Unchanged) ---
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const dataToSave = {
      classRepMail,
      courseCode: courseCode.toUpperCase(),
      courseTitle: courseTitle.toUpperCase(),
      courseUnit: parseInt(courseUnit), // Ensure unit is stored as number
      lecturerName,
      lecturerEmail: currentUser.email,
    };

    try {
      await addDoc(collection(db, "courseCollection"), dataToSave);
      
      // Reset form states on success
      setClassRepMail("");
      setCourseCode("");
      setCourseTitle("");
      setCourseUnit(0);
      setLecturerName("");

      setIsLoading(false);
      setShowAddForm(false);
      fetchCoursesData();
    } catch (error) {
      console.error("Error saving data:", error);
      setIsLoading(false);
    }
  };

  // --- Logout Logic (Unchanged) ---
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // --- Click Outside Logic (Unchanged) ---
  const handleClickOutside = (event) => {
    // Only close if the form is visible AND the click is outside the form
    if (showAddForm && formRef.current && !formRef.current.contains(event.target)) {
      setShowAddForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddForm]); // Depend on showAddForm for correct closure behavior

  // ------------------------------------
  // --- UI START ---
  // ------------------------------------

  return (
    // Main Container: Deep dark background, light text
    <div className="bg-gray-950 min-h-screen text-gray-100 pb-16">
      <Navbar logout={handleLogout} />

      {/* Lecturer Card - Assume this component is already styled dark mode */}
      <LectuerCard /> 

      {/* ADD COURSE BUTTON SECTION */}
      <section className="mt-8 px-4">
        <div 
          className="bg-gray-900 rounded-xl py-6 w-full max-w-lg mx-auto 
                     flex flex-col items-center cursor-pointer 
                     shadow-xl shadow-black/30 
                     hover:bg-gray-800 transition-colors duration-300 border border-gray-800"
          onClick={() => setShowAddForm(true)}
          role="button" // Accessibility
          aria-label="Add New Course"
        >
          {/* Replaced image with a styled icon for consistency */}
          <div className="p-3 rounded-full bg-cyan-600/20 text-cyan-400">
            <FiX size={24} className="transform rotate-45" /> {/* Using FiX and rotating 45deg for a clean plus icon */}
          </div>
          <p className="mt-3 text-lg font-medium text-cyan-400">
            Add Course
          </p>
        </div>
      </section>
      
      {/* COURSE LISTING SECTION */}
      <section className="mt-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {coursesData.length === 0 && !isLoading && (
            <p className="text-gray-500 col-span-full text-center">No courses added yet. Click 'Add Course' to get started.</p>
        )}
        {coursesData.map((course, index) => (
          // Assume CourseCard is styled to match dark mode (e.g., bg-gray-900)
          <CourseCard
            key={index}
            courseCode={course.courseCode}
            courseTitle={course.courseTitle}
            lecturerName={course.lecturerName}
            courseUnits={course.courseUnit}
          />
        ))}
      </section>

      {/* ADD COURSE MODAL/FORM */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            
            {/* Form Container Card */}
            <div
              className="bg-gray-900 text-gray-100 p-6 sm:p-8 w-full max-w-lg rounded-xl shadow-2xl shadow-cyan-900/30 border border-gray-800 relative"
              ref={formRef}
            >
              
              {/* Close Button */}
              <button
                onClick={() => setShowAddForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-cyan-400 transition-colors"
                aria-label="Close form"
              >
                <FiX size={24} />
              </button>

              <p className="text-xl font-bold text-center text-cyan-400 mb-6 border-b border-gray-700 pb-3">Add New Course</p>

              {isLoading ? ( // Show custom Loader when submitting
                <div className="flex justify-center py-10">
                    <Loader /> {/* Replaced FiLoader with your custom Loader */}
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="grid grid-cols-1 gap-4"
                >
                  {/* Inputs - Styled for dark mode with cyan focus */}
                  {[
                    { placeholder: "Course Title", value: courseTitle, setter: setCourseTitle, type: "text" },
                    { placeholder: "Course Code (e.g., CSC401)", value: courseCode, setter: setCourseCode, type: "text" },
                    { placeholder: "Course Unit", value: courseUnit, setter: setCourseUnit, type: "number" },
                    { placeholder: "Lecturer Name", value: lecturerName, setter: setLecturerName, type: "text" },
                    { placeholder: "Class Rep Email", value: classRepMail, setter: setClassRepMail, type: "email" },
                  ].map((field, index) => (
                    <input
                      key={index}
                      type={field.type}
                      className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                                 text-gray-100 placeholder-gray-500
                                 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400
                                 transition-all duration-200"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      required
                    />
                  ))}
                  
                  {/* Submission Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg 
                                 focus:outline-none shadow-lg shadow-cyan-900/40
                                 transition-all duration-300"
                    >
                      Add Course
                    </button>
                  </div>
                </form>
              )}
            </div>
        </div>
      )}
    </div>
  );
}

export default Lecturer;