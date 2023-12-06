import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TicketTable from './TicketTable';
import TicketForm from './TicketForm';
import './Ticket.css'
import api from './api';


const Ticket = ( {isAdmin} ) => {

    const {train, schedule} = useParams();
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

    const [isCreate, setIsCreate] = useState(false)
    const [isForm, setIsForm] = useState(false);
    const [editingObject, setEditingObject] = useState(
        {
            id: '',
            seat: '',
            train: '',
            departure: '',
            customer_name: '',
            price_paid: ''
        }
    );

    const handleEdit = (id) => {
        const editing = tickets.find((item) => item.id === id)
        setEditingObject(editing)
        setIsForm(true)
    }

    const handleCreateButton = () => {
        setIsCreate(true)
        setIsForm(true)
    }

    const handleBack = () => {
        setIsCreate(false)
        setIsForm(false)
    }

    return (
        <>
        {
        isForm 
        ?
        <TicketForm
            train={train}
            schedule={schedule}
            editingObject={editingObject}
            isCreate={isCreate}
            handleBack={handleBack}
        />
        :
        <TicketTable
            train={train}
            schedule={schedule}
            tickets={tickets}
            isAdmin={isAdmin}
            handleEdit={handleEdit}
            handleCreateButton={handleCreateButton}
        />
        }
        </>

    )
}

export default Ticket;