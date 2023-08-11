import React, { useState } from 'react'; // Correct import
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

const Settings = () => {
  





  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="settings">
         
         
            <div className="settings-section">
              <h3>Account Settings</h3>
             
             
             
            </div>
         
         
        
        </div>
      </div>
    </div>
  );
};

export default Settings;
