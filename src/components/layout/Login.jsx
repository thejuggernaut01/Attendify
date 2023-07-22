import React from 'react'

function Login(props) {
  return (
    <div className=' 
    justify-center bg-gradient-to-r 
    w-screen from-[#020443] 
  to-[#02030C] h-96' 
    >
    
    <img className='m-auto pt-8' src={props.logo}/>

    <div className='flex justify-center space-x-[30%] mt-2 text-white'>
    <div className='items-center text-center'>
    <p>Lecturer Login</p>
    <div className='mt-2 bg-blue-800 h-[3px] rounded-full m-auto w-32'></div>
    </div>

    <div className='items-center text-center'>
    <p>Student Login</p>
    <div className='mt-2 bg-white h-[3px] rounded-full m-auto w-32'></div>
    </div>
    
    </div>

    </div>
  )
}

export default Login