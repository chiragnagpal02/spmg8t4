import React from "react";
import Hiring from "../assets/Hiring.png";

import { Link } from "react-router-dom";
import Staff from "../assets/Staff.png";
import Employee from "../assets/HR.png";
import Manager from "../assets/Manager.png";

const Home = () => {
  return (
    <div className="p-5 m-0 bg-gradient-to-b from-blue-400 p-[4em] h-[35em]">

    

      <div className="flex justify-center">
        <img src={Hiring} alt="Hiring" className="w-1/2" />
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center mt-2 mb-4">
            Welcome to Jobs Portal
          </h1>
          <h2 className="text-xl font-bold text-center mt-2 mb-4">
            Select below to choose user type.
          </h2>
        </div>

      </div>
      {/* Create 3 cards - one for staff, one for employee, one for manager. Each card should have a small image with a title and a button redirecting to their particular page. */}

      <div className="mt-10 grid grid-cols-1 ">
        <div className="flex justify-around">
          <div className="bg-white rounded-lg shadow-lg p-4 w-80">
            <img src={Staff} alt="Staff" className="w-20 mx-auto" />
            <h2 className="text-xl font-bold text-center mt-2 mb-4">Staff</h2>
            <Link
              to="/staff"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full block mx-auto text-center 
            shadow-md hover:shadow-lg transition duration-300"
            >
              Staff Login
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 w-80">
            <img src={Employee} alt="Employee" className="w-20 mx-auto" />
            <h2 className="text-xl font-bold text-center mt-2 mb-4">HR</h2>
            <Link
              to="/hr"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full block mx-auto text-center 
            shadow-md hover:shadow-lg transition duration-300"
            >
              HR Login
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 w-80">
            <img src={Manager} alt="Manager" className="w-20 mx-auto" />
            <h2 className="text-xl font-bold text-center mt-2 mb-4">Manager</h2>
            <Link
              to="/manager"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full block mx-auto text-center 
            shadow-md hover:shadow-lg transition duration-300"
            >
              Manager Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
