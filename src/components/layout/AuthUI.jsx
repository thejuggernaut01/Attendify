import React, { useEffect, useState } from 'react'
import LecturerLogin from '../Users/LecturerLogin';

function Auth(props) {
  // Input Field Counter
  const [registered, setRegistered] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [currentForm, setCurrentForm] = useState(<LecturerLogin/>)

  return (
    <div className=' 
    justify-center bg-gradient-to-r 
    w-screen from-[#020443] 
  to-[#02030C] h-[130vh]' 
    >
    
    <img className='m-auto pt-8' src={props.logo}/>

    <div className='flex justify-around mt-2 cursor-pointer text-white'>
    { registered ? 
      <div  className='items-center text-center'>
      <p>Lecturer Login</p>
    <div className={isStudent ? 'mt-2 bg-white h-[3px] rounded-full m-auto w-32' : 'mt-2 bg-blue-800 h-[3px] rounded-full m-auto w-32' }></div>
    </div> 
    
    :

    <div className='items-center text-center'>
    <p>Lecturer Register</p>
    <div className={isStudent ? 'mt-2 bg-white h-[3px] rounded-full m-auto w-32' : 'mt-2 bg-blue-800 h-[3px] rounded-full m-auto w-32' }></div>
    </div>

  }

    { registered ?
      <div className='items-center text-center cursor-pointer'>
    <p>Student Login</p>
    <div className={isStudent ? 'mt-2 bg-blue-800 h-[3px] rounded-full m-auto w-32' : 'mt-2 bg-white h-[3px] rounded-full m-auto w-32' }></div>
    </div>
    :

    <div  className='items-center text-center cursor-pointer'>
    <p>Student Register</p>
    <div className={isStudent ? 'mt-2 bg-blue-800 h-[3px] rounded-full m-auto w-32' : 'mt-2 bg-white h-[3px] rounded-full m-auto w-32' }></div>
    </div>
  
  }
    
    </div>

    {currentForm}
    </div>
  )
}

export default Auth