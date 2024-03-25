import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './org.js';
import Info from './org_user_partdeux.js';
import OrgUserPart3 from './org_user_part3.js';
import VolunteerUser from './volunteer_user.js';
import VolunteerInterest from './volunter_user_partdeux.js';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/org" element={<Home/>} />
        <Route path="/org_user_partdeux" element={<Info/>} />
        <Route path="/org_user_part3" element={<OrgUserPart3 />} />
        <Route path="/volunteer_user" element={<VolunteerUser />} />
        <Route path="/volunter_user_partdeux" element={<VolunteerInterest />} />

      </Routes>
    </Router>
  );
};

export default App;