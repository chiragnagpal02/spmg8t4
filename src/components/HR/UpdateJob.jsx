import React, { useEffect } from 'react'
import { useState } from 'react'
import Modal from './Modal';
import axios from "axios";


const UpdateJob = () => {
    const [inputs, setInputs] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const updatePosting = (event) => {
        console.log("test")
        event.preventDefault();

        axios.post('http://127.0.0.1:5000/update_role_listing/1', inputs).then(function(response){
            console.log(response.data);
        });
    }

    return (
        <>

  
   
      <div className="bg-[#338573] h-[40px] flex justify-center items-center">
        <span className="text-white text-1xl ">Update Job Posting</span>
      </div>

      {/* <span className='flex flex-col items-center font-bold text-2xl mb-6'>
            Job Details
        </span> */}

        <div className='m-0 bg-gray-100 p-[1em] h-screen'>
            
                <form onSubmit={updatePosting} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div classz="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="position">
                                Position
                            </label>
                            <input readOnly onChange={handleChange} name="position" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" />
                        </div>


                        <div>
                            <label for="dpt" className="block text-gray-700 text-sm font-bold mb-2">
                                Department
                            </label>
                            <select onChange={handleChange} name="department" id="dpt" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">

                                <option selected>Choose a Department</option>
                                <option value="it">IT</option>
                                <option value="marketing">Marketing</option>
                                <option value="finance">Finance</option>
                                <option value="accnt">Accountancy</option> 
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="startDate">
                                Application Start Date
                            </label>
                            <input onChange={handleChange} name="appStartDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" type="date" placeholder="dd/mm/yyyy" />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="endDate">
                                Application End Date
                            </label>
                            <input onChange={handleChange} name="appEndDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" type="date" placeholder="dd/mm/yyyy" />
                        </div>

                        <div className='col-span-2'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="desc">
                                Description
                            </label>
                            <textarea onChange={handleChange} name="desc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="desc" placeholder="dd/mm/yyyy" />
                        </div>

                        <div>
                            <label for="type" className="block text-gray-700 text-sm font-bold mb-2">
                                Role Type
                            </label>
                            <select onChange={handleChange} name="roletype" id="type" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">

                                <option selected>Choose a Role Type</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="salary">
                                Salary
                            </label>
                            <input onChange={handleChange} name="salary" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="number" />
                        </div>

                        <div>
                            <label for="location" className="block text-gray-700 text-sm font-bold mb-2">
                                Location
                            </label>
                            <select onChange={handleChange} name="location" id="location" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">

                                <option selected>Choose a Location</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Vietnam">Vietnam</option> 
                                <option value="Hong Kong">Hong Kong</option>
                            </select>
                        </div>

                        <div className='col-span-2' >
                            <button type="submit" className='bg-[#338573] hover:bg-[#338573] text-white font-bold py-2 px-4 rounded'
                            onClick={() => showModal()}>
                                Add New Posting
                            </button>

                            <Modal show={isModalVisible} onClose={hideModal} />
                       
                        </div>
                    </div>
                </form>
                
            </div>

    </>
  );
};

export default UpdateJob;
