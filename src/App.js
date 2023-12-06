import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Receptionist from './pages/Receptionist'
import Header from './components/Header'
import Ticket from './components/Ticket'
import Seat from './components/Seat'
import './App.css'

function App() {

  const [isAdmin, setIsAdmin] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = (admin) => {
    setIsAdmin(admin);
    setIsLogin(true);
  }

  const handleLogout = () => {
    setIsLogin(false);
  }

  return (
    <Router basename='/'>
      <div className='container'>
        <Header isLogin={isLogin} onLogout={handleLogout}/>
        <Routes>
          <Route 
            path="/" 
            exact 
            element={<Login onLogin={handleLogin}/>} 
          />
          <Route 
            path="admin" 
            exact 
            element={<Admin isAdmin={isAdmin}/>} 
          />
          <Route 
            path="receptionist" 
            exact 
            element={<Receptionist isAdmin={isAdmin}/>} 
          />
          <Route 
            path='ticket/:train/:schedule' 
            exact 
            element={<Ticket isAdmin={isAdmin}/>} 
          />
          <Route 
            path='seat/:train/:schedule' 
            exact 
            element={<Seat isAdmin={isAdmin} />} 
          />
        </Routes>       
      </div>
    </Router>
  )
}

export default App;
