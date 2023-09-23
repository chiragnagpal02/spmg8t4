import React from "react";
import "/src/index.css";

const HomePageSearch = () => {
    return(
        <div className="m-0 bg-gradient-to-b from-red-400 p-[4em] h-[35em]">

            <div className="">
                <div className="font-bold text-6xl mb-[0.5em]">
                    <span className="text-red-700">Find A </span>
                    <span>Job </span>
                    <span className="text-red-700">That</span><br/>
                    <span>Matches </span><span className="text-red-700">Your </span><br />
                    <span className="text-red-700">Passion</span>
                </div>

                <div className="subText mb-[4em]">
                    <span>Hand-picked opportunities to work from home, remotely, freelance, full-time, part-time, contract and internships.</span>
                </div>

            </div>

            <div className="SearchBar">

                <form>   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-md" placeholder="Search by Job Title...." required />
                        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

            </div>

        </div>
    )
    
}


export default HomePageSearch;