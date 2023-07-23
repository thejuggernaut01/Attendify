import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import LogoWhite from './icons/icon_calendar.png'
import LogoBlue from './icons/icon_calendar_blue.png'
import RootRoute from "./pages/RootRoute";
import Homepage from "./components/layout/Homepage";
import StudentRoute from "./pages/StudentRoute";
import Session from "./pages/Session";
import Splashscreen from "./components/layout/Splashscreen";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootRoute />,
      children: [{ index: true, element: <Splashscreen logoBlue={LogoBlue} logoWhite={LogoWhite} /> }],
    },
    {
      path: "home",
      element: <RootRoute />,
      children: [{ index: true, element: <Homepage logoWhite={LogoWhite} logoBlue={LogoBlue} /> }],
    },
    {
      path: "student",
      element: <StudentRoute />,
      children: [
        {
          index: true,
          element: <Session />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
