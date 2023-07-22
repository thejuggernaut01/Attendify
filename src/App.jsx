import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootRoute from "./pages/RootRoute";
import Homepage from "./components/layout/Homepage";
import StudentRoute from "./pages/StudentRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <RootRoute />,
      children: [{ index: true, element: <Homepage /> }],
    },
    { path: "student", element: <StudentRoute />, children: [{}] },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
