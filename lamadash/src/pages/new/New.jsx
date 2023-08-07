import React, { useState } from 'react';
import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {userInputs}from "../../formSource";

const New = ({ title }) => {
  const [file, setFile] = useState('');
  const { isAuthenticated } = useAuth(); // Get the isAuthenticated state from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object to store the form data
   
/* 
    // Loop through the inputs array and use their id as the key in the employeData object
    userInputs.forEach((input) => {
      employeData[input.label.toLowerCase()] = e.target[input.id].value;
    }); */
   
    const keyMapping = {
      "Image": "image",
      "Name": "name",
      "Role": "role",
      "Email":"email",
      "Phone":"phone",
      "Password":"password",
      "joining":"joining",
      "birth":"birth",
    };
    
    const employeData = {};
    
    userInputs.forEach((input) => {
      
      const mappedKey = keyMapping[input.label];
      employeData[mappedKey] = e.target[input.id].value;
    });
    
    try {
      // Send a POST request to the server with the employeData
      const token = localStorage.getItem('access_token');
      const response = await axios.post('/employes/', employeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Do something with the response, if needed
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error saving Employe:', error);
    }
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt='' />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
           

{userInputs.map((input) => (
  <div className='formInput' key={input.id}>
    {input.label === "Image" ? ( 
      <>
        <label htmlFor='file'>
         Image:<DriveFolderUploadOutlinedIcon className='icon' />
        </label>
        <input
          type='file' 
          onChange={(e) => setFile(e.target.files[0])}
          id='file'
          style={{ display: 'none' }}
        />
      </>
    ) : (
      <>
        <label>{input.label}</label>
        <input type={input.type} placeholder={input.placeholder} id={input.id} />
      </>
    )}
  </div>
))}

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
