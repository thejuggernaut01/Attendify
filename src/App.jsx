import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";

import RootRoute from "./pages/RootRoute";
import Homepage from "./components/layout/Homepage";
import StudentRoute from "./pages/StudentRoute";
import Session from "./pages/Session";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootRoute />,
      children: [{ index: true, element: <Homepage /> }],
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
