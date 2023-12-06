import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Header.css'

function Header( {isLogin, onLogout}) {

    return (
        <div className='header-container'>
            <h1>Train Ticketing System</h1>
            {
                isLogin &&
                <Link to='/'>
                    <button onClick={onLogout}>Log out</button>
                </Link>
            }   
            <hr/>
        </div>
    )
}

export default Header;