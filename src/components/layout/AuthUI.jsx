import React from 'react'

function Login(props) {
  const lecturerSignUpData = [
    { placeholder: "Enter Full Name", value: "", type:"text" },
    { placeholder: "Enter Department", value: "", type:"text" },
    { placeholder: "Enter Email", value: "", type:"email" },
    { placeholder: "Enter Phone Number", value: "", type:"text" },
    { placeholder: "Enter Password", value: "", type:"password" },
    { placeholder: "Verify Password", value: "", type:"password" },
  ];

  const lecturerLoginData = [
    { placeholder: "Enter Email", value: "", type:"email" },
    { placeholder: "Enter Password", value: "", type:"password" },
  ];

  const studentSignUpData = [
    { placeholder: "Enter Full Name", value: "", type:"text" },
    { placeholder: "Enter Matric Number", value: "", type:"text" },
    { placeholder: "Enter Department", value: "", type:"text" },
    { placeholder: "Enter Level", value: "", type:"text" },
    { placeholder: "Enter Email", value: "", type:"email" },
    { placeholder: "Enter Password", value: "", type:"password" },
    { placeholder: "Verify Password", value: "", type:"password" },
  ];

  const studentLoginData = [
    { placeholder: "Enter Email", value: "", type:"email" },
    { placeholder: "Enter Password", value: "", type:"password" },
  ];

  return (
    <div className=' 
    justify-center bg-gradient-to-r 
    w-screen from-[#020443] 
  to-[#02030C] h-[130vh]' 
    >
    
    <img className='m-auto pt-8' src={props.logo}/>

    <div className='flex justify-around mt-2 text-white'>
    <div className='items-center text-center'>
    <p>Lecturer Login</p>
    <div className='mt-2 bg-blue-800 h-[3px] rounded-full m-auto w-32'></div>
    </div>

    <div className='items-center text-center'>
    <p>Student Login</p>
    <div className='mt-2 bg-white h-[3px] rounded-full m-auto w-32'></div>
    </div>
    
    </div>


  <form className='text-center pt-8 text-white space-x-4 space-y-8 m-auto'>
   <div className='w-full md:w-1/2 p-2 space-y-8 w-100 m-auto'>

  
   {lecturerLoginData.map((data, index) => (
    <input
      key={index}
      type="text"
      name="value"
      placeholder={data.placeholder}
      value={data.value}
      className="bg-transparent border mx-2  rounded-full p-4 pl-6 w-72"
    />

    
  ))}
    </div>
    <button className="mt-8" type='submit'>
            Register
            <hr className='mt-2 w-20 border' />
            </button>
            <p className='text-gray-500   cursor-pointer'>Don't have an account?</p>
</form>
    </div>
  )
}

export default Login