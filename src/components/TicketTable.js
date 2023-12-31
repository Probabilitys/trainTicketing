import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Ticket.css'
import api from './api';

const TicketTable = ( {train, schedule, isAdmin, handleEdit, handleCreateButton} ) => {

    const [tickets, setTickets] = useState([])

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await api.get(`/train/tickets/${train}/${schedule}`)
                setTickets(response.data)
            }
            catch (err) {
                console.log(err)

            }
        };
        fetchTickets();
    }, []);

    const handleDelete = async (item) => {
        const deleteTicket = {
            id: item.id,
            seat: item.seat,
            train: item.train,
            departure: item.departure,
            customer_name: item.customer_name,
            price_paid: item.price_paid
        }
        const response = await api.post(`/ticket/delete/${item.id}`, deleteTicket)
        await api.get(`/train/tickets/${train}/${schedule}`)
        setTickets(response.data)
        alert(`A refund of $${item.price_paid} has been issued to ${item.customer_name}.`)
    }


    return (
        <div className='ticket-container'>
            <h2>Ticket List</h2>
            <div>
                {isAdmin && <button onClick={handleCreateButton}>Create Ticket</button>}
                <Link to={isAdmin ? '/admin' : '/receptionist'}>
                    <button>Back</button>
                </Link>                
            </div>

            <table border="1" className='ticket-table'>
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Seat ID</th>
                        <th>Train ID</th>
                        <th>Departure</th>
                        <th>Customer</th>
                        <th>Price Paid</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((item) => (
                        <tr key={item.ticket_id}>
                            <td>{item.id}</td>
                            <td>{item.seat}</td>
                            <td>{item.train}</td>
                            <td>{item.departure}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.price_paid}</td>
                            <td>
                                <button onClick={() => handleEdit(item.id)}>Edit</button>
                                <button onClick={() => handleDelete(item)}>Cancel Ticket</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>    
    )

}

export default TicketTable;
