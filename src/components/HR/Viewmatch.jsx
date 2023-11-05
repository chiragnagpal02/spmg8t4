import React from 'react'
import { useState, useEffect } from 'react'
import Modal from './Modal';
import axios from "axios";
import './App.css'
import userlogo from '../../assets/user.png'
import threedot from '../../assets/threedot.png'
import HRNavbar from './HRNavbar';


const ViewMatch = () => {
  // if(sessionStorage.getItem('role')!='hr'){
  //   console.log('not hr!')
  //   const navigate=useNavigate();
  //   navigate('/login')
  //   alert('You are not authorized to view this page! You have been redirected to login')
  // }

    const[roleApplicants, setRoleApplicants] = useState([]);
    const[role, setRole] = useState([]);
    const currentURL = window.location.href;
    const parts = currentURL.split('/');
    const role_listing_id = parts[parts.length - 1];
    
    useEffect(() => {
      // Make the Axios GET request to http://127.0.0.1:5000/get_role_details/<role_listing_id>
      axios
        .get(`http://127.0.0.1:5000/get_role_details/${role_listing_id}`)
        .then((response) => {
          const data = response.data.data;
          console.log(data)
          setRole(data);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error:", error);
        });
    }, []); // The empty array [] ensures that this effect runs once when the component is mounted.

    
    // Make the Axios GET request to http://127.0.0.1:5000/get_role_applicant_skills/<role_listing_id>
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:5000/get_role_applicant_skills/${role_listing_id}`)
        .then((response) => {
          const data = response.data.data;
          const role_applicant_skills = data[0].skills
          console.log(data[0].skills)
          setRoleApplicants(data);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error:", error);
        });
    }, []); // The empty array [] ensures that this effect runs once when the component is mounted.

    // useEffect(() => {
    //   if ((Array.isArray(requiredSkills.skills) ) {
    //     // if no required skills, then it will display no required skills
    //     // Calculate chart data
    //     const matchedSkills = staffSkills.filter(skill => requiredSkills.skills.includes(skill));
    //       const matchedSkillsNum = matchedSkills.length;
    //       console.log(matchedSkillsNum);
  
    //       const matchPercentage = requiredSkills.skills.length > 0
    //     ? Math.round((matchedSkillsNum / requiredSkills.skills.length) * 100)
    //     : 0;
    
    return (
        <>
        <HRNavbar />

        <div className='bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]'>

            <span className='text-dark'>
                {role.role_name}
            </span>

        </div>

        <div>
        <table width="90%%" className="styled-table">
    <thead>
        <tr>
            <th width="5%">Name</th>
            <th width='20%'></th>
            <th width='20%'>Application Date</th>
            <th width='10%'>Skill Match</th>
            <th width='40%'>Skill Sets</th>
            <th width='5%'></th>
        </tr>
    </thead>
    <tbody>
    {roleApplicants.map((applicant, index) => (
      <tr key={index}>
        <td>
          <button>
            <img className="mx-3" width="30px" src={userlogo} alt="" />
          </button>
        </td>
        <td>
          <p>{applicant.fname} {applicant.lname}</p>
          <p>{applicant.email}</p>
        </td>
        <td>{applicant.role_app_ts_create}</td>
        <td>%</td>
        <td>{applicant.skills.join(', ')}</td>
        <td>
          <button>
            <img width="30px" className="dots" src={threedot} alt="" />
          </button>
        </td>
      </tr>
    ))}
    </tbody>
</table>
        </div>
    </>   
  )
}

export default ViewMatch