import React, { useState } from 'react';
import api from './api';

const BookSeat = ( {train, schedule, bookingSeat, handleBack} ) => {

    const [seat, setSeat] = useState(bookingSeat.id)
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleCancel = () => {
        setCustomer('')
        setPrice('')
    }

    const handleBook = async () => {
        const newTicket = {
            seat: parseInt(seat),
            train: parseInt(train),
            departure: parseInt(schedule),
            customer_name: customer,
            price_paid: parseInt(price)
        }
        const response = await api.post('/ticket/create', newTicket)
    }

    return (
        <div className='seat-form-container'>
            <div>
                <h2>Book Seat</h2>            
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
                        {seat}
                    </td>
                </tr>

                <tr>
                    <td>
                        <label>Customer:</label>
                    </td>
                    <td>
                        <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Price Paid:</label>
                    </td>
                    <td>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </td>
                </tr>
            </table>

            <div>
                <button onClick={handleBook}>
                    Book
                </button>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleBack}>Back</button>
            </div>
        </div>
    )
}

export default BookSeat;