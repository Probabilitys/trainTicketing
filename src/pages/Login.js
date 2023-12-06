import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'


function Login( {onLogin} ) {

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <Link to='/admin' >
                <button onClick={() => onLogin(true)}>Admin</button>                
            </Link>
            <Link to='/receptionist' >
                <button onClick={() => onLogin(false)}>Receptionist</button>                
            </Link>   
        </div>
    )
}

export default Login