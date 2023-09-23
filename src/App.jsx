import { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import HomePageSearch from './components/HomePage/HomePageSearch'
import Categories from './components/HomePage/Departments'
import RecentlyAdded from './components/HomePage/RecentlyAdded'

function App() {
  return (
    <>
      <Navbar />
      <HomePageSearch />
      <Categories />
      <RecentlyAdded />
      

    </>
  )
}

export default App
