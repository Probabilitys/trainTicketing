import React, { useEffect, useState } from 'react';
import ScheduleTable from './ScheduleTable';
import ScheduleForm from './ScheduleForm';
import './Schedule.css'
import api from './api';

const Schedule = ( {isAdmin, handleBack} ) => {

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


    const [isCreate, setIsCreate] = useState(false);
    const [isForm, setIsForm] = useState(false);
    const [editingObject, setEditingObject] = useState(
        {
            id: '',
            train: '',
            time: ''
        }
    );

    const handleEdit = (id) => {
        const editing = schedules.find((item) => item.id === id)
        setEditingObject(editing)
        setIsForm(true)
    }

    const handleCreateButton = () => {
        setIsCreate(true)
        setIsForm(true)
    }

    const handleBackForm = () => {
        console.log('back')
        setEditingObject(
            {
                id: '',
                train: '',
                time: ''
            }
        )
        setIsForm(false)
    }

    return (
        <>
        {
        isForm ?
        <ScheduleForm 
            editingObject={editingObject}
            isCreate={isCreate}
            handleBackForm={handleBackForm}
        />
        :
        <ScheduleTable 
            scheduleData={schedules}
            isAdmin={isAdmin}
            handleEdit={handleEdit}
            handleCreateButton={handleCreateButton}
            handleBack={handleBack}
        />        
        }
        </>

    )
}

export default Schedule;