import React from 'react'
import RecentlyAddedCard from './RecentlyAddedCard'
import roles from '../../constants/roles'

const RecentlyAdded = () => {
  return (
    <div className='m-0 bg-gray-200 p-[4em]'>
        <span className='flex flex-col items-center font-bold text-2xl mb-6'>Recently Added Jobs</span>

        <div className='flex flex-wrap -mx-4 justify-center '>
            {
              roles.map((item, index) => (
                <RecentlyAddedCard key={index} name={item.name} deptName={item.department_name} closingDate={item.closing_date}/>
              ))
            }
        </div>

        
    </div>
  )
}

export default RecentlyAdded