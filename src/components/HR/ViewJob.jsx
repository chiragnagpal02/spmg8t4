import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import "./App.css";
import penlogo from "../../assets/edit.png";
import eyelogo from "./hrasset/eye.png";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';

const ViewJob = () => {
  // if(sessionStorage.getItem('role')!='hr'){
  //   console.log('not hr!')
  //   const navigate=useNavigate();
  //   navigate('/login')
  //   alert('You are not authorized to view this page! You have been redirected to login')
  // }
    const [jobPostings, setJobPostings] = useState([]);
    useEffect(() => {
        // Make the Axios GET request to http://127.0.0.1:5000/roledetails
        axios.get('http://127.0.0.1:5000/rolelistings')
          .then((response) => {
            setJobPostings(response.data.data) // You can process the response data as needed
            console.log(response.data.data)
          })
          .catch((error) => {
            // Handle any errors here
            console.error('Error:', error);
          });
      }, []); // The empty array [] ensures that this effect runs once when the component is mounted.

        const listing=(jobPostings.rolelistings);
        console.log(listing)

    

    const [jobid, setJobId] = useState([]);
    useEffect(() => {
        // Make the Axios GET request to http://127.0.0.1:5000/roledetails
        axios.get('http://127.0.0.1:5000/roledetailsall')
          .then((response) => {
            setJobId(response.data.data) // You can process the response data as needed
            console.log(response.data.data)

          })
          .catch((error) => {
            // Handle any errors here
            console.error('Error:', error);
          });
      }, []); // The empty array [] ensures that this effect runs once when the component is mounted.
    
      const idlisting=(jobid.final_list);
      console.log(idlisting)

    const [staffname, setstaffname] = useState([]);
    useEffect(() => {
      
        // Make the Axios GET request to http://127.0.0.1:5000/roledetails
        axios.get('http://127.0.0.1:5000/staffdetails')
          .then((response) => {
            setstaffname(response.data.data) // You can process the response data as needed
            console.log(response.data)

          })
          .catch((error) => {
            // Handle any errors here
            console.error('Error:', error);
          });
      }, []); // The empty array [] ensures that this effect runs once when the component is mounted.

    

    useEffect(() => {
      var staffnames = staffname.staff
      var staffdict = {}
        for(var i in staffnames){
          staffdict[staffnames[i].staff_id]=staffnames[i].lname + ' ' + staffnames[i].fname
        }
    var table = document.getElementById("Table");
    table.getElementsByTagName("tbody")[0].innerHTML ='<tr></tr>'
      for(var i in listing){
        console.log(listing[i])
        var row = table.insertRow();
        var cell1 = row.insertCell();
        console.log(i)
        console.log(listing[i].role_id)
        console.log(idlisting[(listing[i].role_id-1)])
        cell1.innerHTML=idlisting[(listing[i].role_id-1)].name
        var cell2 = row.insertCell();
        cell2.innerHTML=listing[i].role_listing_department
        var cell3 = row.insertCell();
        cell3.innerHTML=listing[i].role_listing_type
        var cell4 = row.insertCell();
        cell4.innerHTML=listing[i].role_listing_close
        var cell5 = row.insertCell();
        cell5.innerHTML=staffdict[listing[i].role_listing_creator]
        var cell7 = row.insertCell();
        cell7.innerHTML=staffdict[listing[i].role_listing_updater]
        var cell6 = row.insertCell();
        cell6.innerHTML = `<button><a href='/hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a href='/hrupdate/${listing[i].role_listing_id}'><img className='mx-2' width='15px' src=${penlogo} /></a></button>`
      }
      document.getElementById('Dept').addEventListener("change", changed); 
      document.getElementById('Status').addEventListener("change", changed); 
      function changed(){
        console.log('changed')
        var filter = document.getElementById("Dept").value
        var status = document.getElementById("Status").value
        table.getElementsByTagName("tbody")[0].innerHTML ='<tr></tr>'
        if (filter=='All' && status=='All'){
          for(var i in listing){
            var row = table.insertRow();
            var cell1 = row.insertCell();
            cell1.innerHTML=idlisting[(listing[i].role_id-1)].name
            var cell2 = row.insertCell();
            cell2.innerHTML=listing[i].role_listing_department
            var cell3 = row.insertCell();
            cell3.innerHTML=listing[i].role_listing_type
            var cell4 = row.insertCell();
            cell4.innerHTML=listing[i].role_listing_close
            var cell5 = row.insertCell();
            cell5.innerHTML=staffdict[listing[i].role_listing_creator]
            var cell7 = row.insertCell();
            cell7.innerHTML=staffdict[listing[i].role_listing_updater]
            var cell6 = row.insertCell();
            cell6.innerHTML = `<button><a href='/hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a href='/hrupdate/${listing[i].role_listing_id}'><img className='mx-2' width='15px' src=${penlogo} /></a></button>`
          }

        }
        else if(filter == 'All'){
          for(var i in listing){
            if(listing[i].role_listing_type==status){
              var row = table.insertRow();
              var cell1 = row.insertCell();
              cell1.innerHTML=idlisting[(listing[i].role_id-1)].name
              var cell2 = row.insertCell();
              cell2.innerHTML=listing[i].role_listing_department
              var cell3 = row.insertCell();
              cell3.innerHTML=listing[i].role_listing_type
              var cell4 = row.insertCell();
              cell4.innerHTML=listing[i].role_listing_close
              var cell5 = row.insertCell();
              cell5.innerHTML=staffdict[listing[i].role_listing_creator]
              var cell7 = row.insertCell();
              cell7.innerHTML=staffdict[listing[i].role_listing_updater]
              var cell6 = row.insertCell();
              cell6.innerHTML = `<button><a href='/hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a href='/hrupdate/${listing[i].role_listing_id}'><img className='mx-2' width='15px' src=${penlogo} /></a></button>`
          }
        }
      }
        else if(status == 'All'){
          for(var i in listing){
            if(listing[i].role_listing_department==filter){
              var row = table.insertRow();
              var cell1 = row.insertCell();
              cell1.innerHTML=idlisting[(listing[i].role_id-1)].name
              var cell2 = row.insertCell();
              cell2.innerHTML=listing[i].role_listing_department
              var cell3 = row.insertCell();
              cell3.innerHTML=listing[i].role_listing_type
              var cell4 = row.insertCell();
              cell4.innerHTML=listing[i].role_listing_close
              var cell5 = row.insertCell();
              cell5.innerHTML=staffdict[listing[i].role_listing_creator]
              var cell7 = row.insertCell();
              cell7.innerHTML=staffdict[listing[i].role_listing_updater]
              var cell6 = row.insertCell();
              cell6.innerHTML = `<button><a href='/hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a href='/hrupdate/${listing[i].role_listing_id}'><img className='mx-2' width='15px' src=${penlogo} /></a></button>`
          }
        }
        }
        else{
          for(var i in listing){
            if(listing[i].role_listing_type==status && listing[i].role_listing_department==filter){
              var row = table.insertRow();
              var cell1 = row.insertCell();
              cell1.innerHTML=idlisting[(listing[i].role_id-1)].name
              var cell2 = row.insertCell();
              cell2.innerHTML=listing[i].role_listing_department
              var cell3 = row.insertCell();
              cell3.innerHTML=listing[i].role_listing_type
              var cell4 = row.insertCell();
              cell4.innerHTML=listing[i].role_listing_close
              var cell5 = row.insertCell();
              cell5.innerHTML=staffdict[listing[i].role_listing_creator]
              var cell7 = row.insertCell();
              cell7.innerHTML=staffdict[listing[i].role_listing_updater]
              var cell6 = row.insertCell();
              cell6.innerHTML = `<button><a href='/hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a href='/hrupdate/${listing[i].role_listing_id}'><img className='mx-2' width='15px' src=${penlogo} /></a></button>`
          }
        }
        }  
}}, [idlisting]);
;

  return (
    <div className="font-montserrat">
      <div class="bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]">
        <span class="text-dark">Current Job Postings</span>
      </div>
        
        <div class="padding-[50px]">
            <label class='text-gray-700 text-sm font-bold mb-2 m-10' for="Dept">Department</label>
            <select class="border rounded" name="Dept" id="Dept" defaultValue="All">
                <option value="All">All</option> 
                <option value="IT">IT</option> 
                <option value="Marketing">Marketing</option> 
                <option value="Management">Finance</option> 
                <option value="HR">HR</option> 
                <option value="HR">Operations</option>
            </select>
            <label class='text-gray-700 text-sm font-bold mb-2 m-10' for="Status">Status</label>
            <select class="border rounded" name="Status" id="Status" defaultValue="All" >
              <option   value="All">All</option> 
                <option value="open">Open</option> 
                <option value="closed">Closed</option> 
            </select>
        </div>

        <div>
          
        </div>

        <div>
            <table id='Table' class="styled-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Application Deadline</th>
                        <th>Creator</th>
                        <th>Last Updated By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                    {}
                </tbody>
            </table>
        </div>
    <div/>
  </div>
    
  )
}

export default ViewJob