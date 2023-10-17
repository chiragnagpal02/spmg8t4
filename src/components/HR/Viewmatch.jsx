import React from 'react'
import { useState, useEffect } from 'react'
import Modal from './Modal';
import './App.css'
import userlogo from '../../assets/user.png'
import threedot from '../../assets/threedot.png'

const ViewMatch = () => {
    

    const[roleApplicants, setRoleApplicants] = useState([]);
    
    useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/get_role_applicant_skills/<int:role_listing_id>
        axios
        .get("http://127.0.0.1:5000/get_role_applicant_skills/1")
            .then((response) => {
                const data = response.data.data;
                setRoleApplicants(data);
            }).catch((error) => {
                // Handle any errors here
                console.error("Error:", error);
            });
        }, []); // The empty array [] ensures that this effect runs once when the component is mounted.
    return (
        <>

        <div className='bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]'>

            <span className='text-dark'>
                Head, Talent Attraction
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
        <td>?</td>
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