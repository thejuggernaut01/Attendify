import { bars } from "../UI/Svg";
import { attendifyLogo } from "../UI/Svg";

const Navbar = ({logout}) => {
  return (
    <>
      <div className="flex justify-around items-center pt-7 pb-4 bg-white">
        <div className="bg-black border border-black rounded-full p-2">
          {attendifyLogo}
        </div>
        <h1 className="text-xl">Attendify</h1>
        <div onClick={logout} className="bg-red-500 border rounded-full p-2 text-white cursor-pointer">
          <p className="text-sm">Log out</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
