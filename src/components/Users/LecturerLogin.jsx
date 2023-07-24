import React, {useState} from 'react'

function LecturerLogin() {
    const [lecturer_login_email, set_lecturer_login_email] = useState("")
    const [lecturer_login_password, set_lecturer_login_password] = useState("");

    const lecturerLoginData = [
        { placeholder: "Enter Email", value: lecturer_login_email, type:"email", stateManager: set_lecturer_login_email},
        { placeholder: "Enter Password", value: lecturer_login_password, type:"password", stateManager: set_lecturer_login_password },
      ];

      const resetAllFields = () => {
        // Iterate through the lecturerLoginData array and reset each state to empty
        lecturerLoginData.forEach((data) => {
          data.stateManager('');
        });
      };

      const lecturerLogin = () => {
        // resetAllFields();
      }

  return (
    <div>
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
     <button onClick={lecturerLogin} className="mt-8" type='submit'>
             Register
             <hr className='mt-2 w-20 border' />
             </button>
 </form>
    </div>
  )
}

export default LecturerLogin