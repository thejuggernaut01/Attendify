import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const ClassRepRoute = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ClassRepRoute;
