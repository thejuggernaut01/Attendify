import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { attendifyLogo } from "../UI/Svg";

import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className="flex justify-around items-center pt-7 pb-4 bg-white">
        <div className="bg-black border border-black rounded-full p-2">
          {attendifyLogo}
        </div>
        <h1 className="text-xl">Attendify</h1>
        <Link to="/home">
          <div
            onClick={logout}
            className="bg-red-500 border rounded-full p-2 text-white cursor-pointer"
          >
            <p className="text-sm">Log out</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
