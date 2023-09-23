import React from 'react'
import CategoryCard from './DepartmentCard'

import departmentsDict from '../../constants/departments_dict'

const Categories = () => {
  return (
    <div className='m-0 bg-gray-100 p-[4em]'>
        <span className='flex flex-col items-center font-bold text-2xl mb-6'>Openings by Department</span>

        <div className='flex flex-wrap -mx-4 justify-center'>
            {
              departmentsDict.map((item, index) => (
                <CategoryCard key={index} name={item.name} remaining_openings={item.remaining_openings}/>
              ))
            }
        </div>
        
        
    </div>
  )
}

export default Categories