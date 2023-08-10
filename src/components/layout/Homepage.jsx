import NavbarHome from "./NavbarHome";
import IconHome from "../../icons/icon_hme.svg";
import AuthUI from "./AuthUI";

const Homepage = (props) => {
  return (
    <>
      <div
        className="bg-white 
                      h-screen max-w-screen"
      >
        <NavbarHome logoBlue={props.logoBlue} />

        <h1
          className="inset-0
                   bg-gradient-to-r 
                   text-2xl 
                   lg:text-4xl
                   text-center 
                   mt-8 from-[#eeeeee] 
                   from-10% via-black
                    to-black 
                    text-transparent 
                    bg-clip-text"
        >
          QR Code Attendance System
        </h1>
        <p className="text-xs w-96 lg:w-screen m-auto text-center mt-2 text-[#2b2b2b]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>

        <img
          src={IconHome}
          alt="IconHome"
          className="w-screen lg:w-[100%] m-auto my-12 lg:my-6"
        />

        <AuthUI className="max-h-screen" logo={props.logoBlue} />
      </div>
    </>
  );
};

export default Homepage;
