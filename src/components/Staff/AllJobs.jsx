import React from "react";
import JobCard from "./JobCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./StaffNavbar";
import HomePageSearch from "./HomePageSearch";
import { Multiselect } from 'multiselect-react-dropdown';




const AllJobs = () => {

  const [jobPostings, setJobPostings] = useState([]);
  const [depts, setdepts] = useState([]);

  useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/listingdetailsall
    axios
      .get("http://127.0.0.1:5000/listingdetailsall")
      .then((response) => {
        const unique_depts = [];
        const unique_depts_obj = [];
        const final_data = response.data.data.final_list;
        setJobPostings(final_data);

        final_data.forEach(element => {
            let dept = element.department;
            if (!unique_depts.includes(dept)){
                unique_depts.push(dept);
            }
        });

        unique_depts.forEach(element => {
            let obj = {
                dept: element
            }
            unique_depts_obj.push(obj);
        });
        
        setdepts(unique_depts_obj);
        console.log(unique_depts);
        console.log(response.data.data.final_list); // You can process the response data as needed


      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, []); // The empty array [] ensures that this effect runs once when the component is mounted.

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
            <Multiselect 
                options={depts}
                displayValue="dept" 
                placeholder="Select Department"
                
            />
          

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
