import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import "./App.css";
import penlogo from "../../assets/edit.png";
import binlogo from "../../assets/delete.png";
import eyelogo from "./hrasset/eye.png";
import axios from "axios";

const ViewJob = () => {
  const [jobPostings, setJobPostings] = useState([]);
  useEffect(() => {
    // Make the Axios GET request to http://127.0.0.1:5000/roledetails
    axios
      .get("http://127.0.0.1:5000/rolelistings")
      .then((response) => {
        setJobPostings(response.data.data); // You can process the response data as needed
        console.log(response.data.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, []); // The empty array [] ensures that this effect runs once when the component is mounted.
  listing
  
  for (var i in jobPostings.rolelistings) {
    console.log(i);
    var listing = jobPostings.rolelistings;
    /* console.log(Object.keys(listing)[i]) */
    console.log(listing[i].role_listing_desc);
    var table = document.getElementById("Table");
    var row = table.insertRow();
    var cell1 = row.insertCell();
    cell1.innerHTML = listing[i].role_listing_desc;
    var cell2 = row.insertCell();
    cell2.innerHTML = listing[i].role_listing_department;
    var cell3 = row.insertCell();
    cell3.innerHTML = listing[i].role_listing_type;
    var cell4 = row.insertCell();
    cell4.innerHTML = listing[i].role_listing_close;
    var cell5 = row.insertCell();
    cell5.innerHTML =
      `<button><a href='./hrmatch'><img width='15px' src=${eyelogo} /></a></button><button><a><img className='mx-2' width='15px' src=${penlogo} /></a></button><button><a><img width='15px' src=${binlogo} /></a></button>`;
  }

  return (
    <>
      <div class="bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]">
        <span class="text-dark">Current Job Postings</span>
      </div>

      <div class="padding-[50px]">
        <label class="text-gray-700 text-sm font-bold mb-2 m-10" for="Sort">
          Sort By
        </label>
        <select class="border rounded" name="Sort" id="Sort">
          <option selected value="Department">
            Department
          </option>
          <option value="Status">Status</option>
          <option value="Deadline">Deadline</option>
          <option value="Title">Title</option>
        </select>
      </div>

      <div>
        <table id="Table" class="styled-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Status</th>
              <th>Application Deadline</th>
              <th>Actions</th>
            </tr>
            
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewJob;
