import Navbar from '../Navbar'
import HomePageSearch from './HomePageSearch'
import Categories from './Departments'
import RecentlyAdded from './RecentlyAdded'
import Bottom from './Bottom'

function StaffPage() {
  return (
    <>
      <Navbar />
      <HomePageSearch />
      <Categories />
      <RecentlyAdded />
      
      <Bottom />

    </>
  )
}

export default StaffPage
