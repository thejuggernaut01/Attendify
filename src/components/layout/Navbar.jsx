import { bars } from "../UI/Svg";
import { attendifyLogo } from "../UI/Svg";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-around items-center">
        <div className="bg-black border border-black rounded-full p-2">
          {attendifyLogo}
        </div>
        <div className="text-3xl">Attendify</div>
        <div className="bg-black border border-black rounded-full p-2 text-white cursor-pointer">
          {bars}
        </div>
      </div>
    </>
  );
};

export default Navbar;
