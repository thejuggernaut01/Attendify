import NavbarHome from "./NavbarHome";
import IconHome from "../../icons/iconhome.svg";
import AuthUI from "./AuthUI"; // Assuming you renamed it back to AuthUI if needed

const Homepage = (props) => {
  return (
    <>
      <div
        className="bg-gray-950 
                   min-h-screen max-w-screen 
                   text-white font-sans 
                   overflow-x-hidden" // Set deep background and base text color
      >
        <NavbarHome logoBlue={props.logoBlue} />

        {/* HERO SECTION */}
        <div className="pt-16 pb-12 px-4">
            
            {/* HEADLINE */}
            <h1
              className="text-3xl lg:text-5xl xl:text-6xl
                         font-extrabold tracking-tight 
                         text-center 
                         bg-gradient-to-r 
                         from-cyan-400 via-blue-500 to-indigo-600 // Electric Gradient
                         text-transparent 
                         bg-clip-text"
            >
              QR Code Attendance System
            </h1>

            {/* SUBHEADER */}
            <p className="text-sm md:text-base w-11/12 max-w-xl m-auto text-center mt-4 text-gray-400">
              A seamless, secure, and modern platform for managing attendance using dynamic QR code technology. Get started in seconds.
            </p>
        </div>

        {/* ICON/VISUAL SECTION (With optional Glow/Animation) */}
        <div className="relative my-12 lg:my-6 flex justify-center">
            {/* Subtle Background Glow - Animate pulse to feel next-gen */}
            <div className="absolute inset-0 m-auto w-3/4 max-w-md h-3/4 blur-[50px] opacity-20 bg-cyan-500 rounded-full animate-pulse-slow"></div>

            <img
              src={IconHome}
              alt="IconHome"
              // Adjust image size to fit better and be centered
              className="relative z-10 w-11/12 max-w-4xl m-auto object-contain" 
            />
        </div>
        
        {/* AUTH/LOGIN SECTION */}
        <AuthUI className="max-h-screen" logo={props.logoBlue} />
        
      </div>
    </>
  );
};

export default Homepage;