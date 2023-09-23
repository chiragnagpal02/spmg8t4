import './App.css'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StaffPage from './components/Staff/StaffPage'
import HRPage from './components/HR/HRPage'
import ManagerPage from './components/Manager/ManagerPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff" element={<HRPage />} />
        <Route path="/staff" element={<ManagerPage />} />
      </Routes>
    </Router>
  );
}

export default App
