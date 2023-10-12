import React from "react";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import NewJob from "../../assets/images/NewJob.svg";
import Department from "../../assets/images/department.svg";
import Timer from "../../assets/images/timer.svg";
import Location from "../../assets/images/location.svg";

const JobCard = ({ name, location, dpt, close_date }) => {
  return (
    <div className="font-montserrat grid grid-cols-5 border-2 shadow-md hover:bg-gray-100 hover:shadow-2xl rounded-md mt-5">
      <div className="flex justify-center mt-5">
        <img src={NewJob} alt="" width="90" />
      </div>

      <div className="information col-span-3 mt-2">
        <h2 className="text-2xl mb-2 p-2 font-bold">{name}</h2>

        <div className="grid grid-cols-3 p-2">
          <div className="">
            <img src={Department} alt="dpt" />
            <h1 className="text-gray-400 text-sm">{dpt}</h1>
          </div>

          <div>
            <img src={Timer} alt="dpt" />
            <h1 className="text-gray-400 text-sm">{close_date}</h1>
          </div>
          <div>
            <img src={Location} alt="dpt" />
            <h1 className="text-gray-400 text-sm">{location}</h1>
          </div>
        </div>
      </div>

      <div className="viewdetailsbutton flex justify-center p-10">
        {/* <button className="bg-black hover:bg-red-700 text-white py-2 px-4 rounded-md ">
          View Details
        </button> */}

        <button class="group relative lg:h-12 lg:w-52 md:h-16 overflow-hidden rounded-lg bg-white text-lg shadow p-2">
          <div class="absolute inset-0 w-3 bg-black transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative text-black group-hover:text-white">
            View Details
          </span>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
