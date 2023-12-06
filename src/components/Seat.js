import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SeatForm from './SeatForm';
import SeatTable from './SeatTable';
import './Seat.css'
import api from './api';


const Seat = ( {isAdmin} ) => {

    const {train, schedule} = useParams();

    const [seats, setSeats] = useState([
        {
            train: 1,
            name: "1st",
            price: 50
        }
    ]);

    const [isForm, setIsForm] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await api.get(`/train/list_seats/${train}`)
                setSeats(response.data)
            }
            catch (err) {
                console.log(err)
            }
        };
        fetchSeats();
    }, []);

    const [editingObject, setEditingObject] = useState(
        {
            id: '',
            train: '',
            name: '',
            price: ''
        }
    );

    const handleEdit = (id) => {
        const editing = seats.find((item) => item.id === id)
        setEditingObject(editing)
        setIsForm(true)
    }

    const handleCreateButton = () => {
        setIsCreate(true)
        setIsForm(true)
    }

    const handleBack = () => {
        setIsForm(false)
    }

    return (
        <>
        {
        isForm 
        ? 
        <SeatForm
            train={train}
            schedule={schedule}
            isCreate={isCreate}
            editingObject={editingObject}
            handleBack={handleBack}
        />
        :
        <SeatTable
            train={train}
            schedule_id={schedule}
            seatData={seats}
            handleCreateButton={handleCreateButton}
            handleEdit={handleEdit}
            isAdmin={isAdmin}
        />
        }
        </>
    )
}

export default Seat;