import React from 'react'
import { useState } from 'react'
import Modal from './Modal';
import './App.css'

const ViewJob = () => {

    return (
        <>

        <div class='bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]'>

            <span class='text-dark'>
                Current Job Postings
            </span>

        </div>
        
        <div class="padding-[50px]">
            <label class='text-gray-700 text-sm font-bold mb-2 m-10' for="Sort">Sort By</label>
            <select class="border rounded" name="Sort" id="Sort">
                <option selected value="Department">Department</option> 
                <option value="Status">Status</option> 
                <option value="Deadline">Deadline</option> 
                <option value="Title">Title</option> 
            </select>
        </div>

        <div>
        <table class="styled-table">
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
        <tr>
            <td>Head, Talent Attraction</td>
            <td>HR</td>
            <td>Open</td>
            <td>25/09/2023</td>
            <td>icons here</td>
        </tr>

        <tr>
            <td>Head, Talent Attraction</td>
            <td>HR</td>
            <td>Open</td>
            <td>25/09/2023</td>
            <td>icons here</td>
        </tr>

        <tr>
            <td>Head, Talent Attraction</td>
            <td>HR</td>
            <td>Open</td>
            <td>25/09/2023</td>
            <td>icons here</td>
        </tr>

        <tr>
            <td>Head, Talent Attraction</td>
            <td>HR</td>
            <td>Open</td>
            <td>25/09/2023</td>
            <td>icons here</td>
        </tr>
    </tbody>
</table>
        </div>
    </>   
  )
}

export default ViewJob