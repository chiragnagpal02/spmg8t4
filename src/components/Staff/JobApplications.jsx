import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StaffNavbar from "./StaffNavbar";
import axios from "axios";

const JobApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  staff_id = localStorage.getItem("id");

    // useEffect(() => {
    //     axios.get("http://127.0.0.1:5000/listingdetailsall")
    //     .then((response) => {
    //     setJobApplications(response.data.data.final_list);
    //     })
    //     .catch((error) => {
    //     console.error("Error:", error);
    //     }
    //     );

    //     axios.get(`http://127.0.0.1:5000/get_applied_applications/${staff_id}`)
    //     .then((response) => {
    //     setAppliedJobs(response.data.data.applied_applications);} )
    //     .catch((error) => {
    //     console.error("Error:", error); } );
    
    //     for 
    // }, []);
    


  return (
    <>
      <StaffNavbar />

      <div className="bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]">
        <span className="text-dark">Applied Applications</span>
      </div>
    </>
  )};


export default JobApplications;
