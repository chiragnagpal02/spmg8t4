import React from 'react'

const DepartmentCard = ( {name, remaining_openings} ) => {
  return (
    <div className="font-montserrat mb-1">
        <div class="bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700">

        {/* <div class="bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700"> */}            
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Number of Openings : {remaining_openings}</p>

                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-blue-800">
                    See Jobs
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>


    </div>
  )
}

export default DepartmentCard