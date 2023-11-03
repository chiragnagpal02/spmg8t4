import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StaffNavbar from "./StaffNavbar";

const StaffSkills = () => {
  const [staffSkills, setStaffSkills] = useState([]);
  const staff_id = useParams().staff_id;
  console.log(staff_id)

  useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/get_staff_skills/<staff_id>
    axios
      .get(`http://127.0.0.1:5000/get_staff_skills/${staff_id}`)
      .then((response) => {
        const data = response.data.data.skills;
        setStaffSkills(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, []); // The empty array [] ensures that this effect runs once when the component is mounted.

  console.log(staffSkills)
  return (
    <>
    <div className="font-montserrat">
    <StaffNavbar />
      <div className="bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]">
        <span className="text-dark">My Skills Page</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 p-3 justify-center">
        <div className="border-2 p-3 rounded-md ">
            <span className="text-dark font-bold text-lg">Active Skills</span>
            <div className="">
                {staffSkills.map((skill) => (
                <div className="flex justify-between content-center">
                    <span className="text-dark">{skill}</span>
                </div>
                ))}
            </div>
        </div>
        <div className="border-2 p-3 rounded-md ">
            <span className="text-dark font-bold text-lg">Inactive Skills</span>
            <div className="">
                {staffSkills.map((skill) => (
                <div className="flex justify-between">
                    <span className="text-dark">{skill}</span>
                </div>
                ))}
            </div>
        </div>
        <div className="border-2 p-3 rounded-md ">
            <span className="text-dark font-bold text-lg">In Progress Skills</span>
            <div className="">
                {staffSkills.map((skill) => (
                <div className="flex justify-between">
                    <span className="text-dark">{skill}</span>
                </div>
                ))}
            </div>
        </div>
      </div>

    </div>
      
    </>
  );
};

export default StaffSkills;
