import React from "react";
import CategoryCard from "./DepartmentCard";
import { useState, useEffect } from "react";
import departmentsDict from "../../constants/departments_dict";
import axios from "axios";

const Categories = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/openingsbydept")
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setDepartments(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); // The empty array [] ensures that this effect runs once when the component is mounted.

  return (
    <div className="m-0 bg-gray-100 p-[4em] font-montserrat">
      <span className="flex flex-col items-center font-bold text-2xl mb-6">
        Openings by Department
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
          {departments.map((item, index) => (
            <CategoryCard
              key={index}
              name={item.name}
              remaining_openings={item.openings}
            />
          ))}
        
      </div>
    </div>
  );
};

export default Categories;
