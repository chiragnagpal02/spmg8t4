import { useState, useEffect } from "react";
import axios from "axios";
import StaffNavbar from "./StaffNavbar";

const StaffSkills = () => {
  const [staffSkills, setStaffSkills] = useState([]);
  const staff_id = localStorage.getItem("id");
  const [activeSkills, setActiveSkills] = useState([]);
  const [unverifiedSkills, setUnverifiedSkills] = useState([]);
  const [inprogressSkills, setInprogressSkills] = useState([]);

  console.log(staff_id);

  useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/get_staff_skills/<staff_id>
    axios
      .get(`http://127.0.0.1:5000/display_staff_skills/${staff_id}`)
      .then((response) => {
        const data = response.data.data.skills;

        data.forEach((e) => {
          if (e.ss_status === "active") {
            if (activeSkills.includes(e.skill_name) === false) {
              setActiveSkills((activeSkills) => [...activeSkills, e.skill_name]);
            }
          } else if (e.ss_status === "unverified") {
            if (unverifiedSkills.includes(e.skill_name) === false) {
              setUnverifiedSkills((unverifiedSkills) => [...unverifiedSkills, e.skill_name]);
            }
          } else if (e.ss_status === "in-progress") {
            if (inprogressSkills.includes(e.skill_name) === false) {
              setInprogressSkills((inprogressSkills) => [...inprogressSkills, e.skill_name]);
            }
          }
        });
        setStaffSkills(data);
        logData(activeSkills, unverifiedSkills, inprogressSkills, staffSkills);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, []); // The empty array [] ensures that this effect runs once when the component is mounted.



  const getUniqueActiveSkills = (activeSkills) => {
    const uniqueActiveSkills = [...new Set(activeSkills)];
    return uniqueActiveSkills;
  }

  const getUniqueUnverifiedSkills = (unverifiedSkills) => {
    const uniqueUnverifiedSkills = [...new Set(unverifiedSkills)];
    return uniqueUnverifiedSkills;
  }

  const getUniqueInprogressSkills = (inprogressSkills) => {
    const uniqueInprogressSkills = [...new Set(inprogressSkills)];
    return uniqueInprogressSkills;
  }

  const logData = (activeSkills, unverifiedSkills, inprogressSkills) => {
    console.log("Active Skills:", getUniqueActiveSkills(activeSkills));
    console.log("Unverified Skills:", getUniqueUnverifiedSkills(unverifiedSkills));
    console.log("In-Progress Skills:", getUniqueInprogressSkills(inprogressSkills));
  };


    
  return (
    <>
      <div className="font-montserrat">
        <StaffNavbar />
        <div className="bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]">
          <span className="text-dark">My Skills Page</span>
        </div>

        <div className="grid grid-cols-3 gap-2 p-3 justify-center">
          <div className="border-2 p-3 rounded-md flex flex-col justify-center transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:opacity-100 hover:text-white">
            <span className="text-dark font-bold text-lg flex justify-center mb-3">Active Skills</span>
            <div className="">
              {activeSkills.length > 0 ? (getUniqueActiveSkills(activeSkills).map((skill) => (
                <div className="flex justify-center">
                  <span className="text-dark">{skill}</span>
                </div> ) )) : (<div className="flex justify-center"><span className="text-dark">No active skills</span></div>
              )}
            </div>
          </div>
          <div className="border-2 p-3 rounded-md flex flex-col justify-center transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:opacity-100 hover:text-white">
            <span className="text-dark font-bold text-lg flex justify-center mb-3">Unverified Skills</span>
            <div className="">
              {unverifiedSkills.length > 0 ? (getUniqueUnverifiedSkills(unverifiedSkills).map((skill) => (
                <div className="flex justify-center">
                  <span className="text-dark">{skill}</span>
                </div> ))) : (<div className="flex justify-center"><span className="text-dark">No unverified skills</span></div>
              )}
              
            </div>
          </div>
          <div className="border-2 p-3 rounded-md flex flex-col justify-center transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:opacity-100 hover:text-white">
            <span className="text-dark font-bold text-lg flex justify-center mb-3">In-Progress Skills</span>
            <div className="">
              {inprogressSkills.length > 0 ? (getUniqueInprogressSkills(inprogressSkills).map((skill) => (
                <div className="flex justify-center">
                  <span className="text-dark">{skill}</span>
                </div>) )) : (<div className="flex justify-center"><span className="text-dark">No in-progress skills</span></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffSkills;