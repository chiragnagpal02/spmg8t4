import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';
export default function Login() {
  const navigate=useNavigate();
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #007BFF, #ffffff)', // Blue to white gradient
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
  };

  const textStyle = {
    fontFamily: 'Arial, sans-serif', // Use a classier and simpler font
    color: 'black',
    fontWeight: 'bold',
    fontSize: '18px', // Adjust the font size as needed
  };

  const inputStyle = {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    margin: '10px 0', // Add spacing between form elements
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #007BFF, #00BFFF)',
    color: 'white',
    fontWeight: 'bold',
    border: '2px solid black',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    margin: '10px 0', // Add spacing between form elements
  };

  const staffLoginStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'black',
    fontSize: '18px',
  };

  const [jobPostings, setJobPostings] = useState([]);
    useEffect(() => {
      
        // Make the Axios GET request to http://127.0.0.1:5000/roledetails
        document.getElementById("sub_btn").addEventListener("click", function(event){
            event.preventDefault()
            var username = document.getElementById("uname").value;
            var password = document.getElementById("password").value;
            console.log(username);
            console.log(password);
            axios.get(`http://127.0.0.1:5000/login/${username}/${password}`)
                .then((response) => {
                    setJobPostings(response.data) // You can process the response data as needed
                    var role = response.data.data.sys_role;
                    sessionStorage.setItem("role", role)
                    navigate(`/${role}`)
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error:', error);
                    alert("Invalid username or password")
                });
        });
        
      }, []); // The empty array [] ensures that this effect runs once when the component is mounted.
    
    const listing=(jobPostings.rolelistings);

  return (
    <div style={containerStyle}>
      <h1 style={{ color: 'black', fontSize: '24px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
        Sign in
      </h1>

      <form style={formStyle} action="/home">
        <p>
          <h2 style={textStyle}>Username or email address:</h2>
          <input id="uname" type="text" style={inputStyle} placeholder="Enter text here" />
        </p>
        <p>
          <h2 style={textStyle}>Password:</h2>
          <input id="password" type="password" style={inputStyle} placeholder="Enter password" name="password" required className="form-control" />
        </p>
        <p>
          <button id="sub_btn" type="submit" style={buttonStyle}>
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/" style={textStyle}>
            Back to Homepage
          </Link>
          .
        </p>
      </footer>
      <div style={staffLoginStyle}>Staff Login</div>
    </div>
  );
}
