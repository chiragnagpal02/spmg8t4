import React, { useEffect } from 'react'
import { useState } from 'react'
import Modal from './Modal';
import axios from "axios";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import HRNavbar from './HRNavbar';

const UpdateJob = () => {
    const [inputs, setInputs] = useState([]);
    const [role, setRole] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const currentURL = window.location.href;
    const parts = currentURL.split('/');
    const role_listing_id = parts[parts.length - 1];
    const [managerData, setManagerData] = useState([]);

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

    const staff_id = parseInt(localStorage.getItem('id'))

    useEffect(() => {
        // Make the Axios GET request to http://127.0.0.1:5000/get_role_details/<role_listing_id>
        axios
          .get(`http://127.0.0.1:5000/get_role_details/${role_listing_id}`)
          .then((response) => {
            const data = response.data.data;
            const roleWithFormattedDates = {
                ...data,
                role_listing_open: new Date(data.role_listing_open).toISOString().split('T')[0],
                role_listing_close: new Date(data.role_listing_close).toISOString().split('T')[0],
                role_listing_updater: staff_id
            };
            setRole(roleWithFormattedDates);
            setInputs(roleWithFormattedDates);
          })
          .catch((error) => {
            // Handle any errors here
            console.error("Error:", error);
          });
      }, []); // The empty array [] ensures that this effect runs once when the component is mounted.

      useEffect(() => {
        axios
          .get(`http://127.0.0.1:5000/get_all_managers`)
          .then((response) => {
            const managerData = response.data;
            setManagerData(managerData);
          })
          .catch((error) => {
            // Handle any errors here
            console.error("Error:", error);
          });
      }, []); // The empty dependencies array ensures it runs only once on component mount
      
      const updatePosting = (event) => {
        event.preventDefault();
    
        // Merge the updated input fields into the role state
        setRole((prevRole) => ({
            ...prevRole,
            ...inputs,
        }));
    
    };

    const AlertSweet = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "green",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .put(`http://127.0.0.1:5000/update_role_listing/${role_listing_id}`, inputs)
              .then(function (response) {
                console.log(response.data);
                Swal.fire({
                  title: "Created!",
                  text: "You have successfully updated this job!",
                  icon: "success",
                  confirmButtonColor: "#000000",
                });
              })
              .catch(function (error) {
                console.error("Error:", error);
                Swal.fire({
                  title: "Error",
                  text: "An error occurred while updating the job.",
                  icon: "error",
                  confirmButtonColor: "#FF0000",
                });
              });
          }
        });
      };      

    console.log(role.role_listing_department)
    console.log(staff_id)
    return (
        <div className='font-montserrat'>

        <HRNavbar />
   
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="role_description">
                                Position
                            </label>
                            <input readOnly onChange={handleChange} name="role_description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline" id="role_description" type="text" defaultValue={role.role_name} />
                        </div>


                        <div>
                            <label for="role_listing_department" className="block text-gray-700 text-sm font-bold mb-2">
                                Department
                            </label>
                            <select onChange={handleChange} name="role_listing_department" id="role_listing_department" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={inputs.role_listing_department}>

                                <option value="" disabled>Choose a Department</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Accountancy">Accountancy</option> 
                            </select>
                        </div>

                        <div>
                            <label for="role_listing_source" className="block text-gray-700 text-sm font-bold mb-2">
                                Source Manager
                            </label>
                            <select onChange={handleChange} name="role_listing_source" id="role_listing_department" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={inputs.role_listing_source}>
                                {managerData.map(manager => (
                                <option key={manager.staff_id} value={manager.staff_id}>
                                    {manager.fname} {manager.lname}
                                </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="role_listing_open">
                                Application Start Date
                            </label>
                            <input onChange={handleChange} name="role_listing_open" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role_listing_open" type="date" placeholder="dd/mm/yyyy" value={inputs.role_listing_open} />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="role_listing_close">
                                Application End Date
                            </label>
                            <input onChange={handleChange} name="role_listing_close" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role_listing_close" type="date" placeholder="dd/mm/yyyy" defaultValue={role.role_listing_close} />
                        </div>

                        <div className='col-span-2'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="role_listing_desc">
                                Description
                            </label>
                            <textarea onChange={handleChange} name="role_listing_desc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role_listing_desc" placeholder="dd/mm/yyyy" defaultValue={role.role_listing_desc}/>
                        </div>

                        <div>
                            <label for="role_listing_type" className="block text-gray-700 text-sm font-bold mb-2">
                                Role Type
                            </label>
                            <select onChange={handleChange} name="role_listing_type" id="role_listing_type" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={inputs.role_listing_type}>

                                <option value = "" disabled>Choose a Role Type</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="role_listing_salary">
                                Salary
                            </label>
                            <input onChange={handleChange} name="role_listing_salary" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role_listing_salary" type="number" defaultValue={role.role_listing_salary}/>
                        </div>

                        <div>
                            <label for="role_listing_location" className="block text-gray-700 text-sm font-bold mb-2">
                                Location
                            </label>
                            <select onChange={handleChange} name="role_listing_location" id="role_listing_location" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={inputs.role_listing_location}>

                                <option value="" disabled>Choose a Location</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Vietnam">Vietnam</option> 
                                <option value="Hong Kong">Hong Kong</option>
                            </select>
                        </div>

                        <div className="mt-4 flex flexbox justify-center">
                            <Button
                                type="submit"
                                onClick={AlertSweet}
                                style={{
                                    backgroundColor: "#000000",
                                }}
                                variant="contained"
                                color="success"
                            >
                            Update posting
                            </Button>
                        </div>
                    </div>
                </form>
                
            </div>
            </div>

  );
};

export default UpdateJob;
