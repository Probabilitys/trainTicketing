import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api';

const SeatTable = ( {train, schedule_id, seatData, handleCreateButton, handleEdit, isAdmin} ) => {

    const [seats, setSeats] = useState([])

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

    const showAvailable = async () => {
        try {
            const response = await api.get(`/train/available_seats/${train}/${schedule_id}`)
            setSeats(response.data)
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

    const showAll = async () => {
        try {
            const response = await api.get(`/train/list_seats/${train}`)
            setSeats(response.data)
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

    return (
        <div className='seat-container'>
            <h2>Seat List</h2>
            <div>
                <button onClick={handleCreateButton}>Create Seat</button>
                <button onClick={showAvailable}>Show Available</button>
                <button onClick={showAll}>Show All</button>
                <Link to={isAdmin ? '/admin' : '/receptionist'}>
                    <button>Back</button>
                </Link>                 
            </div>
 
            <table border="1">
                <thead>
                    <tr>
                        <th>Seat</th>
                        <th>Train</th>
                        <th>Class</th>
                        <th>Price</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {seats.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.train_id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <button onClick={() => handleEdit(item.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
 
        </div>
    )
}

export default SeatTable;