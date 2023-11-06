import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import userlogo from '../../assets/user.png';
import threedot from '../../assets/threedot.png';
import HRNavbar from './HRNavbar';

const ViewMatch = () => {
  const [roleApplicants, setRoleApplicants] = useState([]);
  const [role, setRole] = useState([]);
  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const role_listing_id = parts[parts.length - 1];

  useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/get_role_details/<role_listing_id>
    axios
      .get(`http://127.0.0.1:5000/get_role_details/${role_listing_id}`)
      .then((response) => {
        const data = response.data.data;
        setRole(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, []);

  // Make the Axios GET request to http://127.0.0.1:5000/get_role_applicant_skills/<role_listing_id>
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/get_role_applicant_skills/${role_listing_id}`)
      .then((response) => {
        const data = response.data.data;
        setRoleApplicants(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, []);

  const calculateMatchPercentage = (applicantSkills) => {
    const requiredSkills = role.skills;
    const matchedSkills = requiredSkills.filter(skill => applicantSkills.includes(skill));

    return requiredSkills.length > 0
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0;
  };

  return (
    <>
      <HRNavbar />

      <div className='bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]'>
        <span className='text-dark'>{role.role_name}</span>
      </div>

      <div>
        <table width="90%" className="styled-table">
          <thead>
            <tr>
              <th>Role Skills</th>
            </tr>
          </thead>
          <tbody>
            {role.skills ? (
              role.skills.map((skill, index) => (
                <tr key={index}>
                  <td>{skill}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No skills found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>
        <table width="90%" className="styled-table">
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
            {roleApplicants.length === 0 ? (
              <tr>
                <td colSpan="6">No applicants found</td>
              </tr>
            ) : (
              roleApplicants.map((applicant, index) => (
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
                  <td>{calculateMatchPercentage(applicant.skills)} %</td>
                  <td>
                    {applicant.skills.length === 0 ? (
                      "No skills found"
                    ) : (
                      applicant.skills.join(', ')
                    )}
                  </td>
                  <td>
                    <button>
                      <img width="30px" className="dots" src={threedot} alt="" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewMatch;