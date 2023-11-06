import React from "react";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import NewJob from "../../assets/images/NewJob.svg";
import Department from "../../assets/images/department.svg";
import Timer from "../../assets/images/timer.svg";
import Open from "../../assets/images/open.svg";
import Close from "../../assets/images/closed.svg";
import Location from "../../assets/images/location.svg";
import { Link } from "react-router-dom";

const JobCard = ({ name, location, dpt, close_date, listing_id, status }) => {
  console.log(status);
  return (
    <div className="font-montserrat grid grid-cols-5 border-2 shadow-md hover:bg-gray-100 hover:shadow-2xl rounded-md mt-5">
      <div className="flex justify-center mt-5">
        <img src={NewJob} alt="" width="90" />
      </div>

      <div className="information col-span-3 mt-2">
        <h2 className="text-2xl mb-2 p-2 font-bold">{name}</h2>

        <div className="grid grid-cols-4 p-2">
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
          <div>
            {status === "closed" ? (
              <img src={Close} alt="dpt" />
            ) : (
              <img src={Open} alt="dpt" />
            )}
          </div>
        </div>
      </div>

      <div className="viewdetailsbutton flex justify-center p-10">
        <Link to={`/staff/apply/${listing_id}`}>
          <button
            className={`group relative lg:h-12 lg:w-52 md:h-16 overflow-hidden rounded-lg text-lg p-2 ${
              status === "closed"
                ? "bg-gray-300 text-gray-500 shadow-none"
                : "bg-white text-black shadow"
            }`}
            disabled={status === "closed" ? true : false}
          >
            <div
              className={`absolute inset-0 w-3 bg-black ${
                status === "open"
                  ? ""
                  : "transition-all duration-[250ms] ease-out group-hover:w-full"
              }`}
            ></div>
            <span
              className={`relative text-black ${
                status === "open"
                  ? "text-gray-500"
                  : "group-hover:text-white"
              }`}
            >
              Apply Job
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
