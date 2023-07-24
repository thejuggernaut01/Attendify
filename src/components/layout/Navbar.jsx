import { bars } from "../UI/Svg";
import { attendifyLogo } from "../UI/Svg";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-around items-center pt-7 pb-3 bg-white">
        <div className="bg-black border border-black rounded-full p-2">
          {attendifyLogo}
        </div>
        <h1 className="text-xl">Attendify</h1>
        <div className="bg-black border border-black rounded-full p-2 text-white cursor-pointer">
          {bars}
        </div>
      </div>
    </>
  );
};

export default Navbar;
