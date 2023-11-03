import React from "react";
import JobCard from "./CreateJobCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const AllJobs = () => {
  // if(sessionStorage.getItem('role')!='hr'){
  //   console.log('not hr!')
  //   const navigate = useNavigate();
  //   navigate('/login')
  //   alert('You are not authorized to view this page! You have been redirected to login')
  // }

  const [jobPostings, setJobPostings] = useState([]);
  const [depts, setdepts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/listingdetailsall

    axios
      .get("http://127.0.0.1:5000/roledetailsall")
      .then((response) => {
        const unique_depts = [];
        const unique_depts_obj = [];
        const final_data = response.data.data.final_list;
        setJobPostings(final_data);

        axios
          .get("http://127.0.0.1:5000/listingdetailsall")
          .then((response) => {
            console.log(response);

            const listing_final_data = response.data.data.final_list;
            console.log(listing_final_data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        final_data.forEach((element) => {
          let dept = element.department;
          if (!unique_depts.includes(dept)) {
            unique_depts.push(dept);
          }
        });

        unique_depts.forEach((element) => {
          let obj = {
            value: element,
            label: element,
          };
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
    const selectedDepartments = selectedOptions.map((option) => option.value);

    if (selectedDepartments.length === 0) {
      // If no departments are selected, show all job postings
      setJobPostings(jobPostings);
      console.log(jobPostings);
    } else {
      // Filter job postings based on selected departments
      const filteredJobPostings = filteredJobPostings.filter((posting) =>
        selectedDepartments.includes(posting.department)
      );
      setJobPostings(filteredJobPostings);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 400, // Set your desired width
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: 200, // Set your desired height
      overflowY: "auto", // Enable vertical scrolling when content overflows
    }),
  };

  return (
    <>
      {/* <Navbar />
      <HomePageSearch /> */}

      <div className="m-0 bg-gray-100 p-[3em] font-montserrat">
        <span className="flex flex-col items-center font-bold text-2xl mb-6">
          Managers' Listings
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

          <p className="text-sm text-gray-400 mt-4">
            Showing {jobPostings.length} Jobs
          </p>
          {jobPostings.map((jobPostings) => (
            <JobCard
              name={jobPostings.name}
              desc={jobPostings.description}
              status={jobPostings.status}
              role_id={jobPostings.role_id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllJobs;
