import React, { useEffect, useState } from 'react'

function Login(props) {

  // Sign Up States
  const [lecturer_full_name, set_lecturer_full_name] = useState("");
  const [lectuer_department, set_lecturer_department] = useState("");
  const [lecturer_email, set_lecturer_email] = useState("");
  const [lecturer_phone_number, set_lecturer_phone_number] = useState("");
  const [lecturer_password, set_lecturer_password] = useState("");
  const [lecturer_re_password, set_lecturer_repassword] = useState("");
  
  const [student_full_name, set_student_full_name] = useState("");
  const [student_matric_number, set_student_matric_number] = useState("");
  const [student_department, set_student_department] = useState("");
  const [student_level, set_student_level] = useState("")
  const [student_email, set_student_email] = useState("");
  const [student_password, set_student_password] = useState("")
  const [student_re_password, set_student_re_password] = useState("")

  // Login States
  const [student_login_email, set_student_login_email] = useState("")
  const [student_login_password, set_student_login_password] = useState("");

  const [lecturer_login_email, set_lecturer_login_email] = useState("")
  const [lecturer_login_password, set_lecturer_login_password] = useState("");



  // Lecturer Fields
  const lecturerSignUpData = [
    { placeholder: "Enter Full Name", value: lecturer_full_name, type:"text", stateManager: set_lecturer_full_name },
    { placeholder: "Enter Department", value: lectuer_department, type:"text", stateManager: set_lecturer_department },
    { placeholder: "Enter Email", value: lecturer_email, type:"email", stateManager: set_lecturer_email },
    { placeholder: "Enter Phone Number", value: lecturer_phone_number, type:"text", stateManager: set_lecturer_phone_number },
    { placeholder: "Enter Password", value: lecturer_password, type:"password", stateManager: set_lecturer_password },
    { placeholder: "Verify Password", value: lecturer_re_password, type:"password", stateManager: set_lecturer_repassword },
  ];

  

  const lecturerLoginData = [
    { placeholder: "Enter Email", value: lecturer_login_email, type:"email", stateManager: set_lecturer_login_email},
    { placeholder: "Enter Password", value: lecturer_login_password, type:"password", stateManager: set_lecturer_login_password },
  ];

  // Student Fields
  const studentSignUpData = [
    { placeholder: "Enter Full Name", value: student_full_name, type:"text", stateManager: set_student_full_name },
    { placeholder: "Enter Matric Number", value: student_matric_number, type:"text", stateManager: set_student_matric_number },
    { placeholder: "Enter Department", value: student_department, type:"text", stateManager: set_student_department },
    { placeholder: "Enter Level", value: student_level, type:"text", stateManager: set_student_level },
    { placeholder: "Enter Email", value: student_email, type:"email", stateManager: set_student_email },
    { placeholder: "Enter Password", value: student_password, type:"password", stateManager: set_student_password },
    { placeholder: "Verify Password", value: student_re_password, type:"password", stateManager: set_student_re_password },
  ];

  const studentLoginData = [
    { placeholder: "Enter Email", value: student_login_email, type:"email", stateManager: set_student_login_email },
    { placeholder: "Enter Password", value: student_login_password, type:"password", stateManager: set_student_login_password },
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


  <form onSubmit={(e) => e.preventDefault()} className='text-center pt-8 text-white space-x-4 space-y-8 m-auto'>
   <div className='w-full md:w-1/2 p-2 space-y-8 w-100 m-auto'>

    
  {lecturerLoginData.map((data, index) => (
    <input
      key={index}
      type={data.type}
      name={data.value}
      placeholder={data.placeholder}
      value={data.value}
      onChange={(e) => {
        data.stateManager(e.target.value)
      }}
      className="bg-transparent border mx-2  rounded-full p-4 pl-6 w-72"
    required/>

    
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