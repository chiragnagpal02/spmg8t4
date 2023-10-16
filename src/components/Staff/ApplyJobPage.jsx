import React from "react";
import Navbar from "./StaffNavbar";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ApplyJobPage = () => {
  const [posting, setPosting] = useState([]);
  const listing_id = useParams().listing_id;

  useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/listing/{listing_id}
    axios
      .get(`http://127.0.0.1:5000/listing/${listing_id}`)
      .then((response) => {
        setPosting(response.data.data);
        console.log(posting);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, [listing_id, posting]); // The empty array [] ensures that this effect runs once when the component is mounted.

  const date1 = new Date(posting.open_date);
  const date2 = new Date(posting.close_date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // get employee skills (employeeSkills)

  
  const getRandomColorClass = () => {
    const colors = ["red", "blue", "green", "yellow", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `bg-${randomColor}-300`;
  };

  const AlertSweet = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, apply for this job!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Applied!",
          text: "You have successfully applied for this job!",
          icon: "success",
          confirmButtonColor: "#000000",
        });
      }
    });
  };
  /* const getRequiredSkills = () => {
    const [requiredSkills, setRequiredSkills] = useState([]);
    const role_id = useParams().id;
  
    useEffect(() => {
      // Make the Axios GET request to http://127.0.0.1:5000/listing/{listing_id}
      axios
        .get(`http://127.0.0.1:5000/listing/${role_id}/required-skills`)
        .then((response) => {
          setPosting(response.data.data);
          console.log(requiredSkills);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error:", error);
        });
    }, []); // The empty array [] ensures that this effect runs once when the component is mounted.
    }; */
  
  const skills = [ // required skills for the current job
    "Agile",
    "SQL",
    "Python",
    "BBG",
    "BeautyBlast",
    "PingPongShow",
  ];

  // function to calculate percentage match, missing

  /* const getChartData = ({ employeeSkills, requiredSkills }) => {
    const matchedSkills = employeeSkills.filter(skill => requiredSkills.includes(skill));
    const matchedSkillsNum = matchedSkills.length;
    const matchPercentage = Math.round((matchedSkills.length / requiredSkills.length) * 100, 2);
    const mismatchedSkillsNum = requiredSkills.length - matchedSkills.length;
    //const mismatchPercentage = 100 - matchPercentage; // Calculate the mismatch percentage
  
    let backgroundColor; // change colour of graph based on match percentage
    if (matchPercentage > 70) {
      backgroundColor = ['#8FCE00', '#BCBCBC']; // green colour
    } else if (matchPercentage > 40) {
      backgroundColor = ['#FFA500', '#BCBCBC']; // orange colour
    } else {
      backgroundColor = ['#FF0000', '#BCBCBC']; // red colour
    }
  
    const chartData = { // 
      labels:['Matched', 'Missing'],
      datasets:[{
        label:['Job Skills Match'],
        data:[matchedSkillsNum,mismatchedSkillsNum], // number of matched skills, number of misMatched skills
        backgroundColor:[backgroundColor, 'lightgrey'],
        borderColor:[backgroundColor, 'lightgrey']
      }],
    }
  
    return chartData;
  }; */


  const options = {
  }

  return (
    <div>
      <Navbar />

      <div className="bg-blue-500 h-[80px] flex justify-center items-center">
        <h1 className="text-center">Job Description</h1>
      </div>

      <div className="mt-4 flex flexbox justify-center">
        <Button
          onClick={AlertSweet}
          style={{
            backgroundColor: "#000000",
          }}
          variant="contained"
          color="success"
        >
          Apply for this job
        </Button>
      </div>
      <div className="MainDiv p-4 mt-5">
        <div className="descriptionDiv md:grid grid-cols-2">
          <div className="description">
            <div className="HeadingDiv px-3">
              <h1 className="mb-4 text-4xl">{posting.name}</h1>
              <span className="bg-black rounded p-2 text-sm text-white">
                {posting.department} Department
              </span>
            </div>
            <h2 className="px-3 mt-6 underline font-bold">
              Job Description </h2>
              <br />
            <h2 className="px-3 mb-4">
            {posting.description}
            </h2>
            
          </div>
          <div className="details">
            <div className="border rounded grid grid-cols-2 p-3">
              <h2 className="col-span-2 mb-5 font-bold">Job Overview</h2>
              <div>
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.4546 5.4729H6.45459C5.90231 5.4729 5.45459 5.92062 5.45459 6.4729V26.4729C5.45459 27.0252 5.90231 27.4729 6.45459 27.4729H26.4546C27.0069 27.4729 27.4546 27.0252 27.4546 26.4729V6.4729C27.4546 5.92062 27.0069 5.4729 26.4546 5.4729Z"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22.4546 3.4729V7.4729"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.4546 3.4729V7.4729"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.45459 11.4729H27.4546"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2 className="font-thin text-grey mt-2">Job Posted on:</h2>
                <h2 className="mt-2">{posting.open_date}</h2>
              </div>
              <div>
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1213 27.4729C22.1965 27.4729 27.1213 22.548 27.1213 16.4729C27.1213 10.3978 22.1965 5.4729 16.1213 5.4729C10.0462 5.4729 5.12134 10.3978 5.12134 16.4729C5.12134 22.548 10.0462 27.4729 16.1213 27.4729Z"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M16.1213 16.4729L21.0711 11.5232"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.1213 1.4729H19.1213"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2 className="font-thin text-grey mt-2">Job Expire Date</h2>
                <h2 className="mt-2">{posting.close_date}</h2>
              </div>
              <div className="mt-3">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.78784 22.4729L16.7878 29.4729L28.7878 22.4729"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.78784 16.4729L16.7878 23.4729L28.7878 16.4729"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.78784 10.4729L16.7878 17.4729L28.7878 10.4729L16.7878 3.4729L4.78784 10.4729Z"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2 className="font-thin text-grey mt-2 ">Days Until Expiry</h2>
                <h2 className="mt-2">{diffDays} days</h2>
              </div>
              <div className="mt-3">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7878 22.7542L4.78784 24.6917V7.25415L12.7878 5.31665"
                    stroke="#0A65CC"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.7878 26.6292L12.7878 22.7542V5.31665L20.7878 9.19165V26.6292Z"
                    stroke="#0A65CC"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.7878 9.19165L28.7878 7.25415V24.6917L20.7878 26.6292"
                    stroke="#0A65CC"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2 className="font-thin text-grey mt-2 ">Job Location</h2>
                <h2 className="mt-2">{posting.location}</h2>
              </div>
            </div>
            <div className="border rounded p-3 mt-5">
              <h2 className="mb-5 font-bold">Skills Required</h2>

              <div style={ {width:'50%', height:'50%', alignSelf:'center'}}>
                {/* <Doughnut
                data={getChartData()}
                options={options}
                ></Doughnut> */}
              </div>

              <div className="grid grid-cols-3 gap-5">
                {skills.map((skill) => {
                  console.log(getRandomColorClass());
                  return (
                    <div key={skill}>
                      <h2 className={`${getRandomColorClass()}`}>{skill}</h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobPage;
