import React, {useState, useEffect} from 'react'
import Login from './pages/Login'
import { Routes, Route } from 'react-router'
import Register from './pages/Register'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import AdminDashboard from './pages/Admin'

export const serverUrl = import.meta.env.VITE_SERVER_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])
  return (
    <div>
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<AdminDashboard />} />
        </Routes>
    </div>
  )
}

export default App