import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { styles } from "../styles";
// import { navLinks } from "../constants";
import Logo from "../../assets/images/rocket.svg";
import User from "../../assets/images/user.svg";
import { Dropdown, Navbar, Avatar } from 'flowbite-react';

export default function NavbarWithDropdown() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/staff">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">JobsCompany</span>
        <span class="text-sm font-light whitespace-nowrap dark:text-white mx-3 mt-1">
           Staff
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Applications</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/staff">
          Home
        </Navbar.Link>
        <Navbar.Link href="/staffskills/123456789">Skills</Navbar.Link>
        <Navbar.Link href="/staff/viewalljobs">All Jobs</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


