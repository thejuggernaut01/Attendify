import React from "react";
import { Link } from "react-router-dom";
import Error404 from "../components/assets/404.jpg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600">
        The page you are looking for does not exist.
      </p>
      <img src={Error404} alt="404 Error" className="mt-8 max-w-xs w-full" />
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
