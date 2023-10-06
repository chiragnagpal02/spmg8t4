import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { styles } from "../styles";
// import { navLinks } from "../constants";

import logo from '../../assets/logo.png';

import '../../index.css';

const Navbar = () => {
  return (
        

<nav class="border-gray-200 bg-gray-50 dark:bg-gray-50 dark:border-gray-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

    <Link to="/staff">
    <a href="" class="flex items-center">
        <img src={logo} class="h-8 mr-3" alt="Job Application Portal Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Staff</span>
    </a>
    </Link>
    
    <div class=" md:block md:w-auto" id="navbar-solid-bg">
      
      <ul class="flex flex-col font-medium rounded-lg bg-gray-500 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        <li>   
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-[100px]">
                Apply
          </button>
        </li>
        <li>
            <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-[100px]">
                    Login
            </button>
        </li>
        
      </ul>
    </div>
  </div>
</nav>

  )
}


export default Navbar;