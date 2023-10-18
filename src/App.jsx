import './App.css'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import StaffPage from './components/Staff/StaffPage';
import HRPage from './components/HR/HRPage';
import ManagerPage from './components/Manager/ManagerPage';
import HRview from './components/HR/HRview';
import Home from './components/Home';
import AllJobs from './components/Staff/AllJobs';
import ApplyJobPage from './components/Staff/ApplyJobPage';
import HRmatch from './components/HR/Viewmatch';
import StaffSkillsComponent from './StaffSkillsComponent';

render() {
  return (
    <Router>
      <Routes>
        {/* Other Routes */}
        <Route path="/staff/viewalljobs" element={<AllJobs />} />
        <Route path="/" element={<Home />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/apply/:listing_id" element={<ApplyJobPage />} />
        <Route path="/hr" element={<HRPage />} />
        <Route path="/hrview" element={<HRview />} />
        <Route path="/hrmatch/:role_listing_id" element={<HRmatch />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/staff/staffskills" element={<StaffSkillsComponent />} />
      </Routes>
    </Router>
  );
}



export default App;

