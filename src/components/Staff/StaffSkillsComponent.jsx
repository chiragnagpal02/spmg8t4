import React, { useState, useEffect } from "react";

function StaffSkillsComponent() {
  const [staffSkills, setStaffSkills] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask API endpoint
    fetch("/staff_skills_with_names")
      .then((response) => response.json())
      .then((data) => setStaffSkills(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Staff Skills</h1>
      <ul>
        {staffSkills.map((staff, index) => (
          <li key={index}>
            {`${staff.fname} ${staff.lname} - Skill: ${staff.skill_name}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffSkillsComponent;

