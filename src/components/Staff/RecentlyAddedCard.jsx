import React from "react";

const RecentlyAddedCard = ({ name, deptName, closingDate }) => {
  return (
    <div class="bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 w-[80%] m-3 grid grid-cols-3">
      <div class="p-5 col-span-2">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {" "}
          {deptName}
        </p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Deadline - {closingDate}
        </p>

        <div class="">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
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
