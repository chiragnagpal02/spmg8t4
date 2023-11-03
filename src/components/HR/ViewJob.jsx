import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import "./App.css";
import penlogo from "../../assets/edit.png";
import binlogo from "../../assets/delete.png";
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
    
    useEffect(() => {
    var table = document.getElementById("Table");
    table.getElementsByTagName("tbody")[0].innerHTML ='<tr></tr>'
      for(var i in listing){
        var row = table.insertRow();
        var cell1 = row.insertCell();
        cell1.innerHTML=listing[i].role_listing_desc
        var cell2 = row.insertCell();
        cell2.innerHTML=listing[i].role_listing_department
        var cell3 = row.insertCell();
        cell3.innerHTML=listing[i].role_listing_type
        var cell4 = row.insertCell();
        cell4.innerHTML=listing[i].role_listing_close
        var cell5 = row.insertCell();
        cell5.innerHTML = `<button><a href='/hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a><img className='mx-2' width='15px' src=${penlogo} /></a></button><button><a><img width='15px' src=${binlogo} /></a></button>`
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
            cell1.innerHTML=listing[i].role_listing_desc
            var cell2 = row.insertCell();
            cell2.innerHTML=listing[i].role_listing_department
            var cell3 = row.insertCell();
            cell3.innerHTML=listing[i].role_listing_type
            var cell4 = row.insertCell();
            cell4.innerHTML=listing[i].role_listing_close
            var cell5 = row.insertCell();
            cell5.innerHTML = `<button><a href='/hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a><img className='mx-2' width='15px' src=${penlogo} /></a></button><button><a><img width='15px' src=${binlogo} /></a></button>`
          }

        }
        else if(filter == 'All'){
          for(var i in listing){
            if(listing[i].role_listing_type==status){
            var row = table.insertRow();
            var cell1 = row.insertCell();
            cell1.innerHTML=listing[i].role_listing_desc
            var cell2 = row.insertCell();
            cell2.innerHTML=listing[i].role_listing_department
            var cell3 = row.insertCell();
            cell3.innerHTML=listing[i].role_listing_type
            var cell4 = row.insertCell();
            cell4.innerHTML=listing[i].role_listing_close
            var cell5 = row.insertCell();
            cell5.innerHTML = `<button><a href='/hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a><img className='mx-2' width='15px' src=${penlogo} /></a></button><button><a><img width='15px' src=${binlogo} /></a></button>`
          }
        }
      }
        else if(status == 'All'){
          for(var i in listing){
            if(listing[i].role_listing_department==filter){
            var row = table.insertRow();
            var cell1 = row.insertCell();
            cell1.innerHTML=listing[i].role_listing_desc
            var cell2 = row.insertCell();
            cell2.innerHTML=listing[i].role_listing_department
            var cell3 = row.insertCell();
            cell3.innerHTML=listing[i].role_listing_type
            var cell4 = row.insertCell();
            cell4.innerHTML=listing[i].role_listing_close
            var cell5 = row.insertCell();
            cell5.innerHTML = `<button><a href='./hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a><img className='mx-2' width='15px' src=${penlogo} /></a></button><button><a><img width='15px' src=${binlogo} /></a></button>`
          }
        }
        }
        else{
          for(var i in listing){
            if(listing[i].role_listing_type==status && listing[i].role_listing_department==filter){
            var row = table.insertRow();
            var cell1 = row.insertCell();
            cell1.innerHTML=listing[i].role_listing_desc
            var cell2 = row.insertCell();
            cell2.innerHTML=listing[i].role_listing_department
            var cell3 = row.insertCell();
            cell3.innerHTML=listing[i].role_listing_type
            var cell4 = row.insertCell();
            cell4.innerHTML=listing[i].role_listing_close
            var cell5 = row.insertCell();
            cell5.innerHTML = `<button><a href='/hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a><img className='mx-2' width='15px' src=${penlogo} /></a></button><button><a><img width='15px' src=${binlogo} /></a></button>`
          }
        }
        }  
}})
// useEffect(() => {
//   addEventListener("change", changed());
// function changed(){
//   filter=document.getElementById("Dept").value
//   status=document.getElementById("Status").value
//   var table = document.getElementById("Table");
//   table.getElementsByTagName("tbody")[0].innerHTML ='<tr></tr>'
//   var filter = document.getElementById("Dept").value
//   var status = document.getElementById("Status").value
//   if(filter=='All' && status=='All'){
//     for(var i in listing){
//       var row = table.insertRow();
//       var cell1 = row.insertCell();
//       cell1.innerHTML=listing[i].role_listing_desc
//       var cell2 = row.insertCell();
//       cell2.innerHTML=listing[i].role_listing_department
//       var cell3 = row.insertCell();
//       cell3.innerHTML=listing[i].role_listing_type
//       var cell4 = row.insertCell();
//       cell4.innerHTML=listing[i].role_listing_close
//       var cell5 = row.insertCell();
//       cell5.innerHTML = `<button><a href='./hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a><img className='mx-2' width='15px' src=${penlogo} /></a></button><button><a><img width='15px' src=${binlogo} /></a></button>`
//     }
//   }

//   else {
//     for(var i in listing){
//       if((listing[i].role_listing_department==filter|| listing[i].role_listing_department=='All') && (listing[i].role_listing_type==status|| listing[i].role_listing_type=='All')){
//       var row = table.insertRow();
//       var cell1 = row.insertCell();
//       cell1.innerHTML=listing[i].role_listing_desc
//       var cell2 = row.insertCell();
//       cell2.innerHTML=listing[i].role_listing_department
//       var cell3 = row.insertCell();
//       cell3.innerHTML=listing[i].role_listing_type
//       var cell4 = row.insertCell();
//       cell4.innerHTML=listing[i].role_listing_close
//       var cell5 = row.insertCell();
//       cell5.innerHTML = `<button><a href='./hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a><img className='mx-2' width='15px' src=${penlogo} /></a></button><button><a><img width='15px' src=${binlogo} /></a></button>`
//   }

//   }
//   }
// }
// addEventListener("change", changes());
// function changes(){
//   status=document.getElementById("Status").value
//   filter=document.getElementById("Dept").value
//   var table = document.getElementById("Table");
//   table.getElementsByTagName("tbody")[0].innerHTML ='<tr></tr>'
//   var filter = document.getElementById("Dept").value
//   var status = document.getElementById("Status").value
  


//     for(var i in listing){
//       if((listing[i].role_listing_department==filter|| listing[i].role_listing_department=="All") && (listing[i].role_listing_type==status|| listing[i].role_listing_type=='All')){
//       var row = table.insertRow();
//       var cell1 = row.insertCell();
//       cell1.innerHTML=listing[i].role_listing_desc
//       var cell2 = row.insertCell();
//       cell2.innerHTML=listing[i].role_listing_department
//       var cell3 = row.insertCell();
//       cell3.innerHTML=listing[i].role_listing_type
//       var cell4 = row.insertCell();
//       cell4.innerHTML=listing[i].role_listing_close
//       var cell5 = row.insertCell();
//       cell5.innerHTML = `<button><a href='./hrmatch/${listing[i].role_listing_id}'><img width='15px' src=${eyelogo} /></a></button><button><a><img className='mx-2' width='15px' src=${penlogo} /></a></button><button><a><img width='15px' src=${binlogo} /></a></button>`
//   }

//   }
// }
// })
;

  return (
    <>
      <div class="bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]">
        <span class="text-dark">Current Job Postings</span>
      </div>
        
        <div class="padding-[50px]">
            <label class='text-gray-700 text-sm font-bold mb-2 m-10' for="Dept">Department</label>
            <select class="border rounded" name="Dept" id="Dept" defaultValue="All">
                <option value="All">All</option> 
                <option value="IT">IT</option> 
                <option value="Marketing">Marketing</option> 
                <option value="Management">Management</option> 
                <option value="HR">HR</option> 
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                    {}
                </tbody>
            </table>
        </div>
    </>
    
  )
}

export default ViewJob