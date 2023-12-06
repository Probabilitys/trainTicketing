import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Schedule.css'
import api from './api';

const ScheduleTable = ( {scheduleData, isAdmin, handleBack, handleEdit, handleCreateButton} ) => {

    const [schedules, setSchedules] = useState([])

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await api.get('/schedule/list')
                setSchedules(response.data)
            }
            catch (err) {
                if (err.response) {
                    // Not in the 200 reponse range
                    console.log(err.response)
                }
                else {
                    console.log(`Error: ${err.message}`)
                }
            }
        }
        fetchSchedules()
    }, [])

    return (
        <div className='schedule-table-container'>
            <h2>Schedule List</h2>
            <div>
                {isAdmin && <button onClick={handleCreateButton}>Create Schedule</button>}
                <button onClick={handleBack}>Back</button>                    
            </div>
            <table border="1" className='schedule-table'>
                <thead>
                    <tr>
                        <th>Schedule</th>
                        <th>Train ID</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((item) => (
                        <tr key={item.id}>
                            <td>{item.time}</td>
                            <td>{item.train}</td>
                            <td>
                                <Link to={`/ticket/${item.train}/${item.id}`}>
                                    <button>Tickets</button>
                                </Link>
                                <Link to={`/seat/${item.train}/${item.id}`}>
                                    <button>Seats</button>
                                </Link>                                
                                {
                                    isAdmin
                                    &&
                                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ScheduleTable;