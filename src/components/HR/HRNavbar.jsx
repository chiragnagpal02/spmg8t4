import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "../../index.css";
import { Link } from "react-router-dom";
import { Dropdown, Navbar, Avatar } from "flowbite-react";

export default function HRNavbar() {
  // if (sessionStorage.getItem("role") != "staff") {
  //   console.log("not staff!");
  //   const navigate = useNavigate();
  //   navigate("/login");
  //   alert(
  //     "You are not authorized to view this page! You have been redirected to login"
  //   );
  // }
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/staff">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          JobsCompany
        </span>
        <span class="text-sm font-light whitespace-nowrap dark:text-white mx-3 mt-1">
          HR
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Applications</Dropdown.Item>
          <Dropdown.Divider />
          <Link to={"/login"}>
            <Dropdown.Item>Sign out</Dropdown.Item>
            {sessionStorage.clear()}
          </Link>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/hr">Home</Navbar.Link>
        <Navbar.Link href="/hrview/">My Listings</Navbar.Link>
        <Navbar.Link>
        Candidates</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
