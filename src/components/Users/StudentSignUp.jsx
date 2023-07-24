import React, {useState} from 'react'

function StudentSignUp() {
    const [student_full_name, set_student_full_name] = useState("");
    const [student_matric_number, set_student_matric_number] = useState("");
    const [student_department, set_student_department] = useState("");
    const [student_level, set_student_level] = useState("")
    const [student_email, set_student_email] = useState("");
    const [student_password, set_student_password] = useState("")
    const [student_re_password, set_student_re_password] = useState("")

    const studentSignUpData = [
        { placeholder: "Enter Full Name", value: student_full_name, type:"text", stateManager: set_student_full_name },
        { placeholder: "Enter Matric Number", value: student_matric_number, type:"text", stateManager: set_student_matric_number },
        { placeholder: "Enter Department", value: student_department, type:"text", stateManager: set_student_department },
        { placeholder: "Enter Level", value: student_level, type:"text", stateManager: set_student_level },
        { placeholder: "Enter Email", value: student_email, type:"email", stateManager: set_student_email },
        { placeholder: "Enter Password", value: student_password, type:"password", stateManager: set_student_password },
        { placeholder: "Verify Password", value: student_re_password, type:"password", stateManager: set_student_re_password },
      ];

      const resetAllFields = () => {
        // Iterate through the lecturerLoginData array and reset each state to empty
        studentSignUpData.forEach((data) => {
          data.stateManager('');
        });
      };

      const studentRegister = () => {
        // resetAllFields();
      }
  return (
    <div>
    <form onSubmit={(e) => e.preventDefault()} className='text-center pt-8 text-white space-x-4 space-y-8 m-auto'>
    <div className='w-full md:w-1/2 p-2 space-y-8 w-100 m-auto'>
 
     
   {studentSignUpData.map((data, index) => (
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
     <button onClick={studentRegister} className="mt-8" type='submit'>
             Register
             <hr className='mt-2 w-20 border' />
             </button>
 </form>
    </div>
  )
}

export default StudentSignUp