import React from "react";
import JobCard from "./JobCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./StaffNavbar";
import HomePageSearch from "./HomePageSearch";
import { Multiselect } from 'multiselect-react-dropdown';
import Select from 'react-select'


const AllJobs = () => {

  const [jobPostings, setJobPostings] = useState([]);
  const [depts, setdepts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredJobPostings, setFilteredJobPostings] = useState([]);

  const handleChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/listingdetailsall
    axios
      .get("http://127.0.0.1:5000/listingdetailsall")
      .then((response) => {
        const unique_depts = [];
        const unique_depts_obj = [];
        const final_data = response.data.data.final_list;
        setJobPostings(final_data);
        setFilteredJobPostings(final_data);

        console.log(filteredJobPostings);

        final_data.forEach(element => {
            let dept = element.department;
            if (!unique_depts.includes(dept)){
                unique_depts.push(dept);
            }
        });

        unique_depts.forEach(element => {
            let obj = {
                value: element,
                label: element
            }
            unique_depts_obj.push(obj);
        });
        
        setdepts(unique_depts_obj);

      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, []); // The empty array [] ensures that this effect runs once when the component is mounted.

  const deptFilter = () => {
    console.log(selectedOptions);

    // clone the job postings array
    const filteredJobPostings = [...jobPostings];

    // Get the selected departments
    const selectedDepartments = selectedOptions.map(option => option.value);

    if (selectedDepartments.length === 0) {
      // If no departments are selected, show all job postings
      setJobPostings(jobPostings);
    } else {
      // Filter job postings based on selected departments
      const filteredJobPostings = filteredJobPostings.filter(posting => selectedDepartments.includes(posting.department));
      setJobPostings(filteredJobPostings);
    }
  };



  const options = [
    { value2: 'option1', label: 'Option 1' },
    { value2: 'option2', label: 'Option 2' },
    { value2: 'option3', label: 'Option 3' },
    { value2: 'option4', label: 'Option 4' },
    { value2: 'option5', label: 'Option 5' },
    // Add more options as needed
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 400, // Set your desired width
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: 200, // Set your desired height
      overflowY: 'auto', // Enable vertical scrolling when content overflows
    }),
  };
  
  return (
    <>
      <Navbar />
      <HomePageSearch />

      <div className="m-0 bg-gray-100 p-[3em] font-montserrat">
        <span className="flex flex-col items-center font-bold text-2xl mb-6">
          All Jobs
        </span>

        <div className="">
          <div className="flex justify-between">
            <div>
              <span>Filters</span>
            </div>
            <Select
                placeholder="Select Department"
                options={depts}
                isMulti={true}
                styles={customStyles}
                onChange={handleChange}
                value={selectedOptions}
            />
            <button onClick={deptFilter}>
                <span>Apply</span>
            </button>
          

        </div>

          <p className="text-sm text-gray-400">
            Showing {jobPostings.length} Jobs
          </p>
          {jobPostings.map((jobPostings) => (
            <JobCard
              name={jobPostings.name}
              dpt={jobPostings.department}
              location={jobPostings.location}
              close_date={jobPostings.close_date}
            />
          ))}
        </div>
      </div>

      
    </>
  );
};

export default AllJobs;
