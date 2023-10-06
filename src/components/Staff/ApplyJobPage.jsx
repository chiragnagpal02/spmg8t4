import React from "react";
import Navbar from "./StaffNavbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ApplyJobPage = () => {
  const date1 = new Date("7/13/2010");
  const date2 = new Date("12/15/2010");
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const getRandomColorClass = () => {
    const colors = ["red", "blue", "green", "yellow", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `bg-${randomColor}-300`;
  };

  const AlertSweet = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, apply for this job!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Applied!",
          text: "You have successfully applied for this job!",
          icon: "success",
          confirmButtonColor: "#000000",
        });
      }
    });
  };
  const skills = [
    "Agile",
    "SQL",
    "Python",
    "BBG",
    "BeautyBlast",
    "PingPongShow",
  ];

  return (
    <div>
      <Navbar />

      <div className="bg-red-500 h-[80px] flex justify-center items-center">
        <h1 className="text-center">
          Junior UX Designer (Full Time) - Match Company Limited{" "}
        </h1>
      </div>

      <div className="mt-4 flex flexbox justify-center">
        <Button
          onClick={AlertSweet}
          style={{
            backgroundColor: "#000000",
          }}
          variant="contained"
          color="success"
        >
          Apply for this job
        </Button>
      </div>
      <div className="MainDiv p-4">
        <div className="HeadingDiv p-3 mt-4">
          <h1 className="mb-4 text-4xl">Senior UX Designer</h1>
          <span className="bg-red-600 rounded p-2 text-sm text-white">
            Full Time
          </span>
        </div>

        <div className="descriptionDiv md:grid grid-cols-2">
          <div className="description">
            <h2 className="p-4">
              <span className="font-bold">Job Description</span>
              <br /> <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              blandit eu leo mollis iaculis. Proin eu nulla neque. Vivamus
              ornare dolor et eleifend molestie. Sed sit amet ultricies erat, ac
              pretium eros. In fermentum ipsum quis magna fringilla malesuada.
              Curabitur auctor nibh id scelerisque commodo. Nunc eros sem,
              condimentum ac congue at, ultrices id tortor. Nulla cursus, justo
              vitae finibus convallis, dui est tempor erat, eu convallis dolor
              sem sed lacus.
            </h2>
            <h2 className="p-4">
              Integer posuere velit at massa eleifend, eget placerat sem
              dignissim. Pellentesque habitant morbi tristique senectus et netus
              et malesuada fames ac turpis egestas. In aliquam nisl ut suscipit
              dictum. Nunc eu laoreet sapien, vel tincidunt urna. Nulla
              facilisi. Donec ultrices in tellus ac porttitor. Duis non mi vitae
              diam dictum ultricies. Cras nec odio suscipit magna porta luctus
              faucibus ac mauris. Nam vel augue sed erat feugiat sodales quis ac
              odio.{" "}
            </h2>

            <h2 className="p-4">
              Maecenas vitae ex hendrerit, vulputate sapien a, ornare quam.
              Maecenas eros augue, imperdiet id lacus non, vehicula fringilla
              dui. Pellentesque quis tellus tempus, pulvinar nibh id,
              ullamcorper magna. Donec orci elit, pretium ac risus euismod,
              consequat blandit massa. Pellentesque finibus vitae nunc a
              finibus. Nullam feugiat laoreet fringilla. Donec consequat, arcu
              auctor facilisis scelerisque, velit nisi rutrum tortor, at rutrum
              dolor augue sed tellus. Nunc bibendum augue leo, nec facilisis
              dolor ultricies at. Aenean at mauris feugiat, dapibus turpis et,
              ullamcorper nulla. Donec sit amet laoreet sapien. Sed ac finibus
              eros.
            </h2>
          </div>
          <div className="details">
            <div className="border rounded grid grid-cols-2 p-3">
              <h2 className="col-span-2 mb-5 font-bold">Job Overview</h2>
              <div>
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.4546 5.4729H6.45459C5.90231 5.4729 5.45459 5.92062 5.45459 6.4729V26.4729C5.45459 27.0252 5.90231 27.4729 6.45459 27.4729H26.4546C27.0069 27.4729 27.4546 27.0252 27.4546 26.4729V6.4729C27.4546 5.92062 27.0069 5.4729 26.4546 5.4729Z"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22.4546 3.4729V7.4729"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.4546 3.4729V7.4729"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.45459 11.4729H27.4546"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2 className="font-thin text-grey mt-2">Job Posted on:</h2>
                <h2 className="mt-2">10/06/2023</h2>
              </div>
              <div>
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1213 27.4729C22.1965 27.4729 27.1213 22.548 27.1213 16.4729C27.1213 10.3978 22.1965 5.4729 16.1213 5.4729C10.0462 5.4729 5.12134 10.3978 5.12134 16.4729C5.12134 22.548 10.0462 27.4729 16.1213 27.4729Z"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M16.1213 16.4729L21.0711 11.5232"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.1213 1.4729H19.1213"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2 className="font-thin text-grey mt-2">Job Expire Date</h2>
                <h2 className="mt-2">14/11/2023</h2>
              </div>
              <div className="mt-3">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.78784 22.4729L16.7878 29.4729L28.7878 22.4729"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.78784 16.4729L16.7878 23.4729L28.7878 16.4729"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.78784 10.4729L16.7878 17.4729L28.7878 10.4729L16.7878 3.4729L4.78784 10.4729Z"
                    stroke="#0A65CC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2 className="font-thin text-grey mt-2 ">Days Until Expiry</h2>
                <h2 className="mt-2">{diffDays} days</h2>
              </div>
              <div className="mt-3">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7878 22.7542L4.78784 24.6917V7.25415L12.7878 5.31665"
                    stroke="#0A65CC"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.7878 26.6292L12.7878 22.7542V5.31665L20.7878 9.19165V26.6292Z"
                    stroke="#0A65CC"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.7878 9.19165L28.7878 7.25415V24.6917L20.7878 26.6292"
                    stroke="#0A65CC"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h2 className="font-thin text-grey mt-2 ">Job Location</h2>
                <h2 className="mt-2">Singapore</h2>
              </div>
            </div>
            <div className="border rounded p-3 mt-5">
              <h2 className="mb-5 font-bold">Skills Required</h2>
              <div className="grid grid-cols-3 gap-5">
                {skills.map((skill) => {
                  console.log(getRandomColorClass());
                  return (
                    <div key={skill}>
                      <h2 className={`${getRandomColorClass()}`}>{skill}</h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobPage;
