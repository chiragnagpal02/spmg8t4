import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useState } from 'react'
import Modal from './Modal';
import axios from 'axios';
import Swal from "sweetalert2";
import Button from "@mui/material/Button";


const CreateJob = () => {
    const [skills, setSkills] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [details, setDetails] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const role_id = useParams().role_id;
    const [requiredSkills, setRequiredSkills] = useState([]);

  const handleSkills = (value) => {
    if (!skills.includes(value)) {
      setSkills([...skills, value]);
    }
  };

  const removeSelectedSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    console.log(updatedSkills);
    console.log(skills);
    setSkills(updatedSkills);
  };

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

    const submitPosting = (event) => {
        event.preventDefault();
        console.log(inputs)

        const staff_id = localStorage.getItem('id')
        console.log(staff_id)

        axios.post(`http://127.0.0.1:5000/create_role_listing/${role_id}/${staff_id}`, inputs).then(function(response){
            console.log(response.data);
        });
    }

    const AlertSweet = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#000000",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, created the job listing!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Created!",
              text: "You have successfully created this job!",
              icon: "success",
              confirmButtonColor: "#000000",
            });
          }
        });
      };
    
    useEffect(() => {
        // Make the Axios GET request to http://127.0.0.1:5000/listing/{listing_id}
        axios
          .get(`http://127.0.0.1:5000/details/${role_id}`)
          .then((response) => {
            const roleId = response.data.data.role_id;
            console.log('id:', roleId);
    
            setDetails(response.data.data);
            console.log('Details data:', response.data);
    
            axios
              .get(`http://127.0.0.1:5000/get_required_skills/${roleId}`)
              .then((response) => {
                // setRequiredSkills(response.data.data);
                // console.log('Required skills data:', response.data.data);
                setRequiredSkills(response.data.data.skills);
              })
              .catch((error) => {
                console.error('Error getting required skills:', error);
              });
          })
          .catch((error) => {
            console.error('Error getting posting data:', error);
          });
      }, [role_id]);    

    return (
        <>

  
   
      <div className="bg-[#338573] h-[40px] flex justify-center items-center">
        <span className="text-white text-1xl ">Create Job Posting</span>
      </div>

      {/* <span className='flex flex-col items-center font-bold text-2xl mb-6'>
            Job Details
        </span> */}

        <div className='m-0 bg-gray-100 p-[1em] h-screen'>
            
                <form onSubmit={submitPosting} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div classz="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="role_id">
                                Role ID
                            </label>
                            <input onChange={handleChange} name="position" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" value= {role_id} readOnly />
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="role_name">
                                Role Name
                            </label>
                            <input onChange={handleChange} name="position" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" value= {details.name} readOnly />
                        </div>
                        <div className='col-span-2'>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="role_desc">
                                Role Description
                            </label>
                            <textarea onChange={handleChange} name="role_desc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role_desc" value= {details.description} readOnly />
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="role_status">
                                Role Status
                            </label>
                            <input onChange={handleChange} name="position" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" value= {details.status} readOnly/>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="salary">
                                Skill requirements
                            </label>
                            <input onChange={handleChange} name="position" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text"  value={requiredSkills.join(', ')} readOnly/>
                        </div>
                        <div>
                            <label for="list_type" class="block text-gray-700 text-sm font-bold mb-2">
                                Listing type
                            </label>
                            <select onChange={handleChange} name="listing_type" id="list_type" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">

                                <option selected>Choose a Listing type</option>
                                <option value="Closed">Closed</option>
                                <option value="Open">Open</option>
                            </select>
                        </div>
                        <div>
                            <label for="dpt" class="block text-gray-700 text-sm font-bold mb-2">
                                Department
                            </label>
                            <select onChange={handleChange} name="department" id="dpt" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">

                                <option selected>Choose a Department</option>
                                <option value="it">IT</option>
                                <option value="marketing">Marketing</option>
                                <option value="finance">Finance</option>
                                <option value="accnt">Accountancy</option> 
                            </select>
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="salary">
                                Salary
                            </label>
                            <input onChange={handleChange} name="salary" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" placeholder="Salary..." />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="location">
                                Location
                            </label>
                            <input onChange={handleChange} name="location" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" placeholder="Job Location..." />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="location">
                                Source Manager
                            </label>
                            <input onChange={handleChange} name="manager_id" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" placeholder="Manager Id..." />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="startDate">
                                Application Start Date
                            </label>
                            <input onChange={handleChange} name="appStartDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" type="date" placeholder="dd/mm/yyyy" />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="endDate">
                                Application End Date
                            </label>
                            <input onChange={handleChange} name="appEndDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" type="date" placeholder="dd/mm/yyyy" />
                        </div>

                        <div className='col-span-2'>
                            <label class="block text-gray-700 text-sm font-bold mt-2" for="desc">
                                Listing Description
                            </label>
                            <textarea onChange={handleChange} name="listing_desc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="desc" placeholder="Roles and Responsibilities..." />
                        </div>

                        {/* <div className='col-span-2'>
                            <label for="skills" class="block text-gray-700 text-sm font-bold mb-2">
                                Skills
                            </label>
                            <select name="skills "id="skills" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                onChange={(event) => handleSkills(event.target.value)}
                            multiple
                            >
                                <option selected>Choose skills</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Accountancy">Accountancy</option>
                            </select>
                        </div> */}

                        {/* <div className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline col-span-2 '>
                            {skills.map((skill, index) => (
                                <span key={index}>
                                    <button
                                        className={`m-2 ml-2 text-red-500 bg-gray-200 hover:bg-gray-400 font-bold py-2 px-4 rounded ${skills.length === 0 && 'disabled'}`}
                                        onClick={() => removeSelectedSkill(skill)
                                        }
                                    >
                                        {skill}
                                        &#x2716;
                                    </button>
                                </span>
                            ))}
                        </div> */}

                        {/* <div className='col-span-2' >
                            <button type="submit" className='bg-[#338573] hover:bg-[#338573] text-white font-bold mt-2 py-2 px-4 rounded'
                            onClick={() => showModal()}>
                                Add New Posting
                            </button>

                            <Modal show={isModalVisible} onClose={hideModal} />
                       
                        </div> */}

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
                            Add New posting
                            </Button>
                        </div>
                    </div>
                </form>
                
            </div>

    </>
  );
};

export default CreateJob;
