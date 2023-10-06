import './App.css'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StaffPage from './components/Staff/StaffPage'
import HRPage from './components/HR/HRPage'
import ManagerPage from './components/Manager/ManagerPage'
import HRview from './components/HR/HRview'
import Home from './components/Home';
import HRmatch from './components/HR/Viewmatch';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/hr" element={<HRPage />} />
        <Route path="/hrview" element={<HRview />} />
        <Route path="/hrmatch" element={<HRmatch />} />
        <Route path="/manager" element={<ManagerPage />} />
        {/* <Route path="/staff/viewjobs" element={<ViewJobs />} /> */}
      </Routes>
    </Router>
  );
}

export default App
