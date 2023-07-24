import React from 'react'
import Navbar from '../layout/Navbar'
import StudentCard from '../UI/StudentCard'
import SessionCard from '../UI/SessionCard'
import AddIcon from '../../icons/icon_addicon.svg'
import CourseCard from '../UI/CourseCard'
import SessionDetails from '../UI/SessionDetails'
function Lecturer() {
  return (
    <div className='bg-gray-100 h-full pb-16'>
        <Navbar/>
        <StudentCard initials={"P"} name={"Prof. Aribisala"} departmentLevel={"Computer Science"}/>
        
      <section className="mt-5">
        <div className="text-center bg-white rounded-2xl py-6 w-[90%] sm:w-[70%] mx-auto">
          <div className="flex justify-center">
              <button className="text-green-500">
                <img className='w-14' src={AddIcon} alt='Add Course' />
              </button>
          </div>
            <p className="mt-2">Add Course</p>
        </div>
      </section>

      <CourseCard courseCode={"CSC 404"} courseTitle={"Introduction to Computer Science"} courseLecture={"Prof. Aribisala"} courseUnits={"4 Units"}/>
      <CourseCard courseCode={"CSC 404"} courseTitle={"Introduction to Computer Science"} courseLecture={"Prof. Aribisala"} courseUnits={"4 Units"}/>
      <CourseCard courseCode={"CSC 404"} courseTitle={"Introduction to Computer Science"} courseLecture={"Prof. Aribisala"} courseUnits={"4 Units"}/>   
      </div>
  )
}

export default Lecturer