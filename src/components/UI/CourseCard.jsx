import React from 'react'

function CourseCard(props) {
  return (
    <div>
    <div role='card' className='flex justify-between w-[90%] mt-20 pt-8 h-32 m-auto rounded-xl mb-8 p-6 bg-white'>
    <div className=''>
    <p className='text-lg'>{props.courseCode}</p>
    <p className='text-sm'>{props.courseTitle}</p>
    <p className='text-xs'>{props.courseLecturer}</p>
    </div>   
    
    <div>
      <button className='text-xs text-white p-2 rounded-full bg-green-500'>Check Attendance</button>
      <p className='text-xs text-right mt-2 mr-6'>{props.courseUnits}</p>
      </div>
   </div>
    </div>
  )
}

export default CourseCard