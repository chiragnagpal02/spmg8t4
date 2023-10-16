import './App.css'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import StaffPage from './components/Staff/StaffPage'
import HRPage from './components/HR/HRPage'
import ManagerPage from './components/Manager/ManagerPage'
import HRview from './components/HR/HRview'
import Home from './components/Home';
import AllJobs from './components/Staff/AllJobs';
import ApplyJobPage from './components/Staff/ApplyJobPage';
import HRmatch from './components/HR/Viewmatch';


import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from './UserProfile';

class App extends React.Component {
  
  state = {
    user: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      skills: ['React', 'JavaScript', 'CSS'],
    },
  };

  render() {
    return (
      <Router>
        <Switch>
          {/* Other Routes */}
          {/* Route for User Profile */}
          <Route path="/profile" render={() => <UserProfile user={this.state.user} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;




function App() {
  return (
    <>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />

    <Router>
      <Routes>
        <Route path="/staff/viewalljobs" element={<AllJobs />} />
        <Route path="/" element={<Home />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/apply/:listing_id" element={<ApplyJobPage />} />
        <Route path="/hr" element={<HRPage />} />
        <Route path="/hrview" element={<HRview />} />
        <Route path="/hrmatch" element={<HRmatch />} />
        <Route path="/manager" element={<ManagerPage />} />
        {/* <Route path="/staff/viewjobs" element={<ViewJobs />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App
