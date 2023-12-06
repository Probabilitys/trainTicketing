import React, { useEffect, useState } from 'react';
import api from './api';

const Train = ( {handleBack} ) => {

    const [trains, setTrains] = useState([])

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await api.get('/train/list')
                setTrains(response.data)
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
        fetchTrains()
    }, [])

    const handleCreate = async () => {
        try {
            const response = await api.post('train/create', {
                id: 0
            });
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
            <h2>Train List</h2>
            <div>
                <button onClick={handleCreate}>Create Train</button>
                <button onClick={handleBack}>Back</button>                 
            </div>

            <table border="1">
                <thead>
                    <tr>
                        <th>Train ID</th>
                    </tr>
                </thead>
                <tbody>
                    {trains.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Train;