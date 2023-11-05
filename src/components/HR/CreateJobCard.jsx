import React from "react";
import NewJob from "../../assets/images/NewJob.svg";
import Department from "../../assets/images/department.svg";
import Timer from "../../assets/images/timer.svg";
import { Link } from "react-router-dom";

const JobCard = ({ name, desc, status, role_id }) => {
  console.log(role_id)
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
            <h1 className="text-gray-400 text-sm">
                {desc.length > 200 ? desc.substring(0, 200) + '...' : desc}
            </h1>
          </div>

          <div>
            <img src={Timer} alt="dpt" />
            <h1 className="text-gray-400 text-sm">{status}</h1>
          </div>
        </div>
      </div>

      <div className="viewdetailsbutton flex justify-center p-10">
        <Link to={`/HR/CreateJob/${role_id}`}>
        <button
            className={`group relative lg:h-12 lg:w-52 md:h-16 overflow-hidden rounded-lg text-lg p-2 ${
            status === 'inactive' ? 'bg-gray-300 text-gray-500 shadow-none' : 'bg-white text-black shadow' }`} disabled={status === 'inactive'}>
            <div className={`absolute inset-0 w-3 bg-black ${status === 'inactive' ? '' : 'transition-all duration-[250ms] ease-out group-hover:w-full'}`}></div>
            <span className={`relative text-black ${status === 'inactive' ? 'text-gray-500' : 'group-hover:text-white'}`}>
              Create Job
            </span>
          </button>
        </Link>
      </div>
      
    </div>
  );
};

export default JobCard;
