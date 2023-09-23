import { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import HomePageSearch from './components/HomePage/HomePageSearch'
import Categories from './components/HomePage/Departments'
import RecentlyAdded from './components/HomePage/RecentlyAdded'
import Bottom from './components/HomePage/Bottom'

function App() {
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

export default App
