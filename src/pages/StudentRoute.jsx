import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const ClassRepRoute = () => {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default ClassRepRoute;
