import React, { useState } from 'react';
import Schedule from '../components/Schedule';
import Train from '../components/Train';
import './Admin.css'

const Admin = ( {isAdmin} ) => {
  // Implement ticket management functionality here

  const [isMenu, setIsMenu] = useState(true)
  const [isTrain, setIsTrain] = useState(false)
  const [isSchedule, setIsSchedule] = useState(false)

  const handleViewTrain = () => {
    setIsTrain(true)
    setIsSchedule(false)
    setIsMenu(false)
  }

  const handleViewSchedule = () => {
    setIsSchedule(true)
    setIsTrain(false)
    setIsMenu(false)
  }

  const handleBack = () => {
    console.log("back")
    setIsMenu(true)
    setIsTrain(false)
    setIsSchedule(false)
  }

  return (
    <div className='admin-container'>
      {
      isMenu 
      &&
      <div className='menu-container'>
        <h2>Admin Menu</h2>
        <button onClick={handleViewTrain}>View Trains</button>
        <button onClick={handleViewSchedule}>View Schedules</button>            
      </div>
 
      }
      {isTrain && <Train handleBack={handleBack}/>}
      {isSchedule && <Schedule isAdmin={isAdmin} handleBack={handleBack}/>}
    </div>
  );
};

export default Admin;