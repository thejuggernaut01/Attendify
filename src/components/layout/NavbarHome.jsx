import React from 'react'

function NavbarHome(props) {
  return (
    <div className="flex justify-center space-x-48 p-6">
    
    <div className='flex space-x-2'>
        <img src={props.logoBlue} alt="Logo"/>
        <p>Attendify</p>
    </div>
    
    <div className='flex space-x-10'>
    <p role='LoginBtn'>Login</p>
    <p role='SignUpBtn'>Register</p>
    </div>
        </div> 
  )
}

export default NavbarHome