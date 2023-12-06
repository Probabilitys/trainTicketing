import React, { useState } from 'react';
import './Schedule.css'
import api from './api';

const ScheduleForm = ( {editingObject, isCreate, handleBackForm} ) => {

    const [train, setTrain] = useState(editingObject.train);
    const [time, setTime] = useState(editingObject.time);

    const handleCancel = () => {
        setTrain(editingObject.train)
        setTime(editingObject.time)
    }

    const handleUpdate = async () => {
        const newSchedule = {
            train: parseInt(train),
            time: parseInt(time)
        }
        const response = await api.post('/schedule/create', newSchedule)
    }

    return (
        <div className='schedule-form-container'>
        <div>
            <h2>{isCreate ? 'Create' : 'Update'} Schedule</h2>            
        </div>
        <table>
            <tr>
                <td>
                    <label>Train:</label>
                </td>
                <td>
                    <input type="number" value={train} onChange={(e) => setTrain(e.target.value)} />
                </td>
            </tr>                    
            <tr>
                <td>
                    <label>Schedule:</label>
                </td>
                <td>
                    <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
                </td>
            </tr>                    
        </table>
        <div>
            <button onClick={handleUpdate}>
                {isCreate ? 'Create' : 'Update'}
            </button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleBackForm}>Back</button>
        </div>
    </div>
    )
}

export default ScheduleForm;