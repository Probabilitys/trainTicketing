import React, { useState } from 'react';
import './Ticket.css'
import api from './api';

const TicketForm = ( {train, schedule, editingObject, isCreate, handleBack} ) => {
    
    console.log(editingObject)
    const [ticketId, setTicketId] = useState(editingObject.id);
    const [seat, setSeat] = useState(editingObject.seat);
    const [customer, setCustomer] = useState(editingObject.customer_name);
    const [price, setPrice] = useState(editingObject.price_paid);

    const handleCancel = () => {
        setTicketId(editingObject.ticket_id)
        setSeat(editingObject.seat_id)
        setCustomer(editingObject.customer)
        setPrice(editingObject.price) 
    }

    const updateTicket = async () => {
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
        <div className='ticket-form-container'>
            <div>
                <h2>{isCreate ? 'Create' : 'Update'} Ticket</h2>            
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
                        <label>Departure:</label>
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
                        <input type="text" value={seat} onChange={(e) => setSeat(e.target.value)} />
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
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </td>
                </tr>
            </table>

            <div>
                <button onClick={updateTicket}>
                    {isCreate ? 'Create' : 'Update'}
                </button>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleBack}>Back</button>                      
            </div>
        </div>
    )
}

export default TicketForm;