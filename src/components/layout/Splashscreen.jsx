import React from 'react'


function Splashscreen(props) {
  return (
    <div className='flex items-center 
                    justify-center bg-gradient-to-r 
                    w-screen from-[#020443] 
                  to-[#02030C] 
                    h-screen space-x-2' 
                    >
    <img src={props.logoWhite} alt="Logo"/>
    <p className='text-white text-xl'>Attendify</p>
    
    </div>
  )
}

export default Splashscreen