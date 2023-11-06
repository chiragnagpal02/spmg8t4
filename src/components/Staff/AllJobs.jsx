import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./StaffNavbar";
import HomePageSearch from "./HomePageSearch";
import Select from "react-select";
import JobCard from "./JobCard";

const AllJobs = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [depts, setDepts] = useState([]);
  const [selectedDeptOptions, setSelectedDeptOptions] = useState([]);
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [filteredJobPostings, setFilteredJobPostings] = useState([]);

  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
  ];

  const handleChangeDept = (selectedValues) => {
    setSelectedDeptOptions(selectedValues);
  };

  const handleChangeStatus = (selectedValue) => {
    setSelectedStatusOption(selectedValue);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/listingdetailsall")
      .then((response) => {
        const uniqueDepts = [...new Set(response.data.data.final_list.map((job) => job.department))];
        setJobPostings(response.data.data.final_list);
        setFilteredJobPostings(response.data.data.final_list);
        setDepts(uniqueDepts.map((dept) => ({ value: dept, label: dept })));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const resetFilters = () => {
    setSelectedDeptOptions([]);
    setSelectedStatusOption(null);
    setFilteredJobPostings(jobPostings);
  };

  const applyFilters = () => {
    let filteredList = jobPostings;

    if (selectedDeptOptions.length > 0) {
      const selectedDepartments = selectedDeptOptions.map((option) => option.value);
      filteredList = filteredList.filter((job) => selectedDepartments.includes(job.department));
    }

    if (selectedStatusOption) {
      filteredList = filteredList.filter((job) => job.type === selectedStatusOption.value);
    }

    setFilteredJobPostings(filteredList);
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
          <div>
            <span>Filters</span>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <div className="grid grid-cols-2">
              <Select
                placeholder="Select Department"
                options={depts}
                isMulti={true}
                onChange={handleChangeDept}
                value={selectedDeptOptions}
              />
    
            </div>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <div className="grid grid-cols-2 mt-2">
              <Select
                placeholder="Select Status"
                options={statusOptions}
                onChange={handleChangeStatus}
                value={selectedStatusOption}
              />
            </div>
          </div>
          <div>
            <button
              onClick={resetFilters}
              className="border-2 rounded-md bg-black text-white p-2 mt-2 hover:bg-white hover:text-black hover:shadow-lg"
            >
              <span>Reset Filters</span>
            </button>
            <button
                onClick={applyFilters}
                className="border-2 rounded-md bg-black text-white p-2 mt-2 hover:bg-white hover:text-black hover:shadow-lg"
              >
                <span>Apply Filters</span>
              </button>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Showing {filteredJobPostings.length} Jobs
        </p>
        {filteredJobPostings.map((job) => (
          <JobCard
            name={job.name}
            dpt={job.department}
            location={job.location}
            close_date={job.close_date}
            listing_id={job.listing_id}
            status={job.type}
          />
        ))}

        {
          filteredJobPostings.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-10">
              <span className="text-2xl font-bold">No Jobs Found</span>
              <span className="text-gray-400">
                Try changing the filters or searching for a different job.
              </span>
            </div>
          )
        }
      </div>
    </>
  );
};

export default AllJobs;
