import { useState, useEffect } from "react";
import axios from "axios";
import StaffNavbar from "./StaffNavbar";

const StaffSkills = ({ staff_id }) => {
  const [staffSkills, setStaffSkills] = useState([]);

  useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/get_staff_skills/<staff_id>
    axios
      .get(`http://127.0.0.1:5000/get_staff_skills/123456789`)
      .then((response) => {
        const data = response.data.data.skills;
        setStaffSkills(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });

    console.log(staffSkills);
  }, []); // The empty array [] ensures that this effect runs once when the component is mounted.
  return (
    <>
      <StaffNavbar />
      <div className="bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]">
        <span className="text-dark">Skills</span>
      </div>

      <div></div>
    </>
  );
};

export default StaffSkills;
