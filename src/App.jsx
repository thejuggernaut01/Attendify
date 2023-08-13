import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import LogoWhite from "./icons/icon_calendar.png";
import LogoBlue from "./icons/icon_calendar_blue.png";
import RootRoute from "./pages/RootRoute";
import Homepage from "./components/layout/Homepage";
import StudentRoute from "./pages/StudentRoute";
import Session from "./pages/Session";
import Splashscreen from "./components/layout/Splashscreen";
import Lecturer from "./components/layout/Lecturer";
import AttendancePage from "./pages/AttendancePage";
import StudentID from "./pages/StudentID";
import NotFoundPage from "./pages/NotFoundPage";
import ScanPage from "./components/layout/ScanPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootRoute />,
      children: [
        {
          index: true,
          element: <Splashscreen logoBlue={LogoBlue} logoWhite={LogoWhite} />,
        },
      ],
      errorElement: <NotFoundPage />,
    },
    {
      path: "home",
      element: <RootRoute />,
      children: [
        {
          index: true,
          element: <Homepage logoWhite={LogoWhite} logoBlue={LogoBlue} />,
        },
      ],
    },
    {
      path: "scan",
      element: <RootRoute />,
      children: [
        {
          index: true,
          element: <ScanPage/>,
        },
      ],
    },
    {
      path: "student",
      element: <StudentRoute />,
      children: [
        {
          index: true,
          element: <Session />,
        },
        { path: "id", element: <StudentID /> },
      ],
    },
    {
      path: "lecturer",
      element: <Lecturer />,
      children: [
        {
          index: true,
          element: <Session />,
        },
      ],
    },
    { path: "lecturer/:course", element: <AttendancePage /> },
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
