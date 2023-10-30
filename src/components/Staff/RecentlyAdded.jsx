import React from 'react'
import RecentlyAddedCard from './RecentlyAddedCard'
import roles from '../../constants/roles'
import { useState, useEffect } from 'react'
import axios from "axios";
import JobCard from './JobCard';

const RecentlyAdded = () => {
  const [jobPostings, setJobPostings] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/listingdetailsall")
      .then((response) => {
          setJobPostings(response.data.data.final_list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  
  const rolesUpdated = jobPostings.slice(0, 2);
  console.log(rolesUpdated);

  return (
    <div className='m-0 bg-gray-200 p-[4em] font-montserrat'>
        <span className='flex flex-col items-center font-bold text-2xl mb-6'>Recently Added Jobs</span>

        <div className='flex flex-wrap -mx-4 justify-center '>
        {rolesUpdated.map((job) => (
          <JobCard
            name={job.name}
            dpt={job.department}
            location={job.location}
            close_date={job.close_date}
            listing_id={job.listing_id}
            status={job.status}
          />
        ))}
        </div>

        
    </div>
  )
}

export default RecentlyAdded