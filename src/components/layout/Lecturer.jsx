import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import StudentCard from '../UI/StudentCard';
import AddIcon from '../../icons/icon_addicon.svg';
import CourseCard from '../UI/CourseCard';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function Lecturer() { 
  const [classRepMail, setClassRepMail] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseUnit, setCourseUnit] = useState(0);
  const [lecturerName, setLecturerName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false); // State variable for form visibility
  const [coursesData, setCoursesData] = useState([]); // State variable for storing course data

  const fetchCoursesData = async () => {
    const coursesRef = collection(db, 'courseCollection');
    const querySnapshot = await getDocs(coursesRef);
    const coursesData = querySnapshot.docs.map((doc) => doc.data());
    setCoursesData(coursesData);
  };

  useEffect(() => {
    fetchCoursesData();
  }, []); // Empty dependency array to fetch data only on component mount

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const dataToSave = {
      classRepMail,
      courseCode,
      courseTitle,
      courseUnit,
      lecturerName,
    };

    saveDataToFirestore(dataToSave);
  };

  const saveDataToFirestore = (data) => {
    addDoc(collection(db, 'courseCollection'), data)
      .then(() => {
        console.log('Data successfully saved to Firestore!');
        setShowAddForm(false);
        // Trigger data fetching again to reload Course Cards
        fetchCoursesData();
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };

  const handleButtonClick = () => {
    setShowAddForm(true); // Show the form on button click
  };

  return (
    <div className='bg-gray-100 h-full pb-16'>
     <Navbar />
      <StudentCard initials={'P'} name={'Prof. Aribisala'} departmentLevel={'Computer Science'} />
      <section className='mt-5'>
        <div className='text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto'>
          <div className='flex justify-center'>
            <button className='text-green-500' onClick={handleButtonClick}>
              <img className='w-14' src={AddIcon} alt='Add Course' />
            </button>
          </div>
          <p className='mt-2' onClick={handleButtonClick}>
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
      <div className='fixed top-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white py-4 px-6 border-b-2 border-gray-300 rounded-md shadow-lg'>
       <p className='text-lg text-center p-2'>Add Course</p>  
            <form onSubmit={handleFormSubmit} className='grid grid-cols-1 gap-4'>
                <input
                  type='text'
                  className='px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                  placeholder='Course Title'
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
                <input
                  type='text'
                  className='px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                  placeholder='Course Code'
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
                <input
                  type='number'
                  className='px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                  placeholder='Course Unit'
                  value={courseUnit}
                  onChange={(e) => setCourseUnit(e.target.value)}
                />
                <input
                  type='text'
                  className='px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                  placeholder='Lecturer Name'
                  value={lecturerName}
                  onChange={(e) => setLecturerName(e.target.value)}
                />
                <input
                  type='email'
                  className='px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                  placeholder='Class Rep Mail'
                  value={classRepMail}
                  onChange={(e) => setClassRepMail(e.target.value)}
                />

                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      );
    }
    
    export default Lecturer;
    