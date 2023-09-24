import React from 'react'
import { useState } from 'react'

const CreateJob = () => {
    const [skills, setSkills] = useState([]);


    const handleSkills = () => {
        setSkills([...skills, 'React']);
    }


    return (
        <>

        <div className='bg-[#338573] h-[70px] flex justify-center items-center'>

            <span className='text-white text-2xl '>
                Create Job Posting
            </span>

        </div>

        <span>
            Job Details
        </span>

        <div className='m-0 bg-gray-100 p-[1em]'>
            

                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="position">
                                Position
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" placeholder="Job Position..." />
                        </div>


                        <div>
                            <label for="dpt" class="block text-gray-700 text-sm font-bold mb-2">
                                Department
                            </label>
                            <select id="dpt" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">

                                <option selected>Choose a Department</option>
                                <option value="it">IT</option>
                                <option value="marketing">Marketing</option>
                                <option value="finance">Finance</option>
                                <option value="accnt">Accountancy</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="startDate">
                                Application Start Date
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" type="date" placeholder="dd/mm/yyyy" />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="endDate">
                                Application End Date
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" type="date" placeholder="dd/mm/yyyy" />
                        </div>

                        <div className='col-span-2'>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="desc">
                                Description
                            </label>
                            <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="desc" placeholder="dd/mm/yyyy" />
                        </div>

                        <div className='col-span-2'>
                            <label for="skills" class="block text-gray-700 text-sm font-bold mb-2">
                                Skills
                            </label>
                            <select id="skills" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                onChange={handleSkills}
                            multiple
                            >
                                <option selected>Choose skills</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Accountancy">Accountancy</option>
                            </select>
                        </div>

                        <div className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline col-span-2'>
                            {skills}
                        </div>

                        <div className='col-span-2' >
                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                                Add New Posting
                            </button>
                        </div>

                        

                
                    </div>
                </form>
                
            </div>
    </>   
  )
}

export default CreateJob