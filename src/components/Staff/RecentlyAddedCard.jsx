import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router


const RecentlyAddedCard = ({ name, deptName, closingDate }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 w-[80%] m-3 grid grid-cols-3">
      <div className="p-5 col-span-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {deptName}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Deadline - {closingDate}
        </p>

        <div className="">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>

        {/* Add a button with a Link */}
        <Link to="/staff/apply">
          <button className="bg-red-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-red-700">
            Apply Now
          </button>
        </Link>
      </div>

      <div className="flex flexbox-center justify-center items-center">
        <img
          src="src/assets/open.png"
          alt=""
          width={100}
          style={{ maxWidth: "100%" }}
        />
      </div>
    </div>
  );
};

export default RecentlyAddedCard;
