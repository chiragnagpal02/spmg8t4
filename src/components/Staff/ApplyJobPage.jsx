import React from "react";
import Navbar from "./StaffNavbar";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import SkillMatch from "./SkillMatch";


ChartJS.register(ArcElement, Tooltip, Legend);

const applyJob = (listingid) => {
  const arr = {
    "staff_id": localStorage.getItem('id'),
    "listing_id": listingid
  };

  axios.post(`http://127.0.0.1:5000/apply_for_role`, arr)
  .then((response) => {
    console.log(response.data);
    // redirect to all jobs page
    window.location.href = "/staff/viewalljobs";
  }
  )
  .catch((error) => {
    console.error(error);
  });
};

const ApplyJobPage = () => {
  const [posting, setPosting] = useState({});

  const [requiredSkills, setRequiredSkills] = useState([]);

  const [staffSkills, setStaffSkills] = useState([]);

  const [skills, setSkills] = useState([]);

  const [chartData, setChartData] = useState(null);

  const [message, setMessage] = useState(null);
  
  const [matchPercentage, setMatchPercentage] = useState(0);

  const [applicationStatus, setApplicationStatus] = useState(null);

  const listing_id = useParams().listing_id;
  const staff_id = localStorage.getItem('id');


  useEffect(() => {

    axios.get(`http://127.0.0.1:5000/get_application_status/${staff_id}/${listing_id}`)
    .then((response) => {
      // console.log(response.data.code)
      setApplicationStatus(response.data.code);
    })
    .catch((error) => {
      console.error(error);
    });
      

    // Make the Axios GET request to http://127.0.0.1:5000/listing/{listing_id}
    axios
      .get(`http://127.0.0.1:5000/listing/${listing_id}`)
      .then((response) => {
        const roleId = response.data.data.id;
        // console.log('id:', roleId);

        setPosting(response.data.data);
        // console.log('Posting data:', response.data);

        axios
          .get(`http://127.0.0.1:5000/get_required_skills/${roleId}`)
          .then((response) => {
            setRequiredSkills(response.data.data);
            console.log('Required skills data:', response.data.data);
            setSkills(response.data.data.skills);
          })
          .catch((error) => {
            console.error('Error getting required skills:', error);
          });
      })
      .catch((error) => {
        console.error('Error getting posting data:', error);
      });
  }, [listing_id]);

  // useEffect(() => {
  //   // console.log("requiredSkills", requiredSkills);
  // }, [requiredSkills]);

  useEffect(() => {
    // Get Staff Skills from Staff ID
    const staffId = staff_id; // Replace with the actual staff ID

    axios
      .get(`http://127.0.0.1:5000/get_staff_skills/${staffId}`)
      .then((response) => {
        const allSkills = response.data.data.skills;

        console.log('Staff all skills data:', allSkills);

        console.log('Staff active skills:', allSkills);
        setStaffSkills(allSkills);

      })
      .catch((error) => {
        console.error('Error getting staff skills:', error);
      });
  }, []);

  useEffect(() => {
    if ((Array.isArray(requiredSkills.skills)) && requiredSkills.skills.length > 0 ) {
      // if no required skills, then it will display no required skills
      // Calculate chart data
      const matchedSkills = staffSkills.filter(skill => requiredSkills.skills.includes(skill));
        const matchedSkillsNum = matchedSkills.length;
        console.log(matchedSkillsNum);

        const matchPercentage = requiredSkills.skills.length > 0
      ? Math.round((matchedSkillsNum / requiredSkills.skills.length) * 100)
      : 0; // Set to 0 if there are no required skills

      // if (requiredSkills.skills.length === 0) {
      //   NoRequiredSkillsAlert();
      // }

      if (matchPercentage === 0) {
        NoSkillsMatchAlert();
      }
      if (matchPercentage === 100) {
        FullSkillsMatchAlert();
      }

        console.log(matchPercentage , " %");
        // const matchPercentage = Math.round((matchedSkillsNum / requiredSkills.length) * 100);
        const mismatchedSkillsNum = requiredSkills.skills.length - matchedSkillsNum;
        
        console.log("mismatch",mismatchedSkillsNum)

      console.log('Updated reqskills:', requiredSkills);
      console.log('Updated staffskills:', staffSkills);

      const missingColor = 'lightgrey';

      let backgroundColor;
      if (matchPercentage > 70) {
        backgroundColor = 'green'; // Green color
      } else if (matchPercentage > 40) {
        backgroundColor = 'orange'; // Orange color
      } else {
        backgroundColor = 'red'; // Red color
      }

      console.log(backgroundColor)

      const chartData = {
        labels: ['Matched', 'Missing'],
        options: {
          responsive:true},
        datasets: [
          {
            label: ' No. of Skills',
            data: [matchedSkillsNum, mismatchedSkillsNum],
            backgroundColor: [backgroundColor,missingColor],
            borderColor: [backgroundColor,missingColor]
          },
        ],
      };
      console.log(chartData);

      setChartData(chartData); // Update chart data state
      setMatchPercentage(matchPercentage);

    }
    else {
      const message = "No Required Skills"
      setMessage(message)
      // console.log('hellooooo')
      //NoRequiredSkillsAlert();
    }
}, [requiredSkills, staffSkills]);


  const date1 = new Date(posting.open_date);
  const date2 = new Date(posting.close_date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  


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
        applyJob(listing_id);
        Swal.fire({
          title: "Applied!",
          text: "You have successfully applied for this job!",
          icon: "success",
          confirmButtonColor: "#000000",
        });
        
      }
    });
  };

  const NoSkillsMatchAlert = () => {
    Swal.fire({
      title: "0% Skill Match!",
      icon: "warning",
      confirmButtonColor: "#000000"
    });
  };


  
  const FullSkillsMatchAlert = () => {
    Swal.fire({
      title: "100% Skill Match!",
      icon: "success",
      confirmButtonColor: "#000000"
    });
  };

  
  return (
    <div>
      <Navbar />

      <div className="bg-blue-500 h-[80px] flex justify-center items-center">
        <h1 className="text-center">Job Description</h1>
      </div>

      <div className="mt-4 flex flexbox justify-center">
      {
        applicationStatus === 200 ? (
          <Button
          onClick={AlertSweet}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #000000",
          }}
          variant="contained"
          color="success"
          disabled
        >
          Already Applied!
        </Button>
        ) : (
          <Button
          onClick={AlertSweet}
          style={{
            backgroundColor: "#000000",
          }}
          variant="contained"
          color="success"
           > 
          APPLY FOR JOB
        </Button>
        )
      }
      
        
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
            <h2 className="px-3 mt-6 underline font-bold">Job Description </h2>
            <br />
            <h2 className="px-3 mb-4">{posting.description}</h2>
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
            {requiredSkills.skills && requiredSkills.skills.length > 0 ? (
        <div className="border rounded p-3 mt-5">
          <h2 className="mb-5 font-bold">Skills Match</h2>

              <div className="flex items-center">
                <div style={{ width: "50%", height: "50%" }}>
                  {chartData && (
                    <div>
                      <Doughnut data={chartData}></Doughnut>
                    </div>
                  )}
                </div>

                <div className="ml-5 text-center">
              <p>
                Match Percentage: <strong className="text">{matchPercentage}%</strong>
              </p>
            </div>
              </div>

              <strong className="text">Required Skills</strong>

              <div className="bg-gray-50 rounded p-3 mt-5">
                <div className="grid grid-cols-3 gap-5 margin-top-10">
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
            ) : (
              <p className="text" style={{ color: "green", fontSize: "22px", textAlign: "center", fontWeight: "bold", padding: "10px" }}>
                No Skills Required!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobPage;
