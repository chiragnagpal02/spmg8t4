import React, { useEffect } from 'react'
import { useState } from 'react'
import Modal from './Modal';



const CreateJob = () => {
    const [skills, setSkills] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        console.log("test")
        event.preventDefault();

        axios.post('http://127.0.0.1:5000/create_role_listing/1', inputs).then(function(response){
            console.log(response.data);
        });
    }

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
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="position">
                                Position
                            </label>
                            <input onChange={handleChange} name="position" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" placeholder="Job Position..." />
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
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="startDate">
                                Application Start Date
                            </label>
                            <input onChange={handleChange} name="appStartDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" type="date" placeholder="dd/mm/yyyy" />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="endDate">
                                Application End Date
                            </label>
                            <input onChange={handleChange} name="appEndDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" type="date" placeholder="dd/mm/yyyy" />
                        </div>

                        <div className='col-span-2'>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="desc">
                                Description
                            </label>
                            <textarea onChange={handleChange} name="desc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="desc" placeholder="dd/mm/yyyy" />
                        </div>

                        <div className='col-span-2'>
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
                        </div>

                        <div className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline col-span-2 '>
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

export default CreateJob;
