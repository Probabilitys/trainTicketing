import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Schedule from '../components/Schedule';
import './Receptionist.css'

const Receptionist = ( {isAdmin} ) => {
  
  const [isMenu, setIsMenu] = useState(true)

  const handleBack = () => {
    setIsMenu(true)
  }

  const handleViewSchedule = () => {
    setIsMenu(false)
  }

  return (
    <div className='receptionist-container'>
      {
      isMenu 
      ?
      <div className='menu-container'>
        <h2>Receptionist Menu</h2>
        <button onClick={handleViewSchedule}>View Schedules</button>            
      </div>
      :
      <Schedule isAdmin={isAdmin} handleBack={handleBack}/>
      }
    </div>
  );
};

export default Receptionist;