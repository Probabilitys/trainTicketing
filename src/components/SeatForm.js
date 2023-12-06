import React, { useState } from 'react';
import api from './api';

const SeatForm = ( {train, schedule, isCreate, editingObject, handleBack} ) => {

    const [seatId, setSeatId] = useState(editingObject.id);
    const [name, setName] = useState(editingObject.name);
    const [price, setPrice] = useState(editingObject.price);

    const handleCancel = () => {
        setSeatId(editingObject.id)
        setName(editingObject.name)
        setPrice(editingObject.price)
    }

    const handleUpdate = async () => {
        const newSeat = {
            train_id: parseInt(train),
            name: name,
            price: parseInt(price)
        }
        const response = await api.post('/train/create_seat', newSeat)
    }

    return (
        <div className='seat-form-container'>
            <div>
                <h2>{isCreate ? 'Create' : 'Update'} Seat</h2>            
            </div>
            <table>
                <tr>
                    <td>
                        <label>Train:</label>
                    </td>
                    <td>
                        {train}
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Schedule:</label>
                    </td>
                    <td>
                        {schedule}
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Seat:</label>
                    </td>
                    <td>
                        <input type="text" value={seatId} onChange={(e) => setSeatId(e.target.value)} />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Seat Class:</label>
                    </td>
                    <td>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Price:</label>
                    </td>
                    <td>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </td>
                </tr>
            </table>

            <div>
                <button onClick={handleUpdate}>
                    {isCreate ? 'Create' : 'Update'}
                </button>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleBack}>Back</button>
            </div>
        </div>
    )
}

export default SeatForm;