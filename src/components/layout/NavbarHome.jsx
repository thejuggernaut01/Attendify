import React from "react";

function NavbarHome(props) {
  return (
    <div className="flex justify-around space-x-16 p-6 ">
      <div className="cursor-pointer flex space-x-2">
        <img src={props.logoBlue} alt="Logo" />
        <p>Attendify</p>
      </div>

      <div className="flex space-x-10">
        <p className="cursor-pointer">Login</p>
        <p className="cursor-pointer">Register</p>
      </div>
    </div>
  );
}

export default NavbarHome;
