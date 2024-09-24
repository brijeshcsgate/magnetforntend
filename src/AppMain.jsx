import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilepageUser from './pages/ProfilePages/ProfilepageUser';
import App from './App';


const AppMain = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/admin" element={<App />} /> */}
        <App />
      </Routes>
    </Router>
  );
};

export default AppMain;
