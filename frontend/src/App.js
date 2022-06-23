import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"

// Routes
import SignUpPage from './routes/SignUpPage'
import UpdateNotePage from './routes/UpdateNotePage'
import NotFoundPage from './routes/NotFoundPage'
import VerifyPage from './routes/VerifyPage'
import LandingPage from './routes/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'
import UserPreferences from './routes/UserPreferencesPage'

import { useSelector } from 'react-redux'
import { selectToken  } from './redux/user/userSlice'

// import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {

  // const token = useSelector(selectToken)
  const token = localStorage.getItem('papaya.token')
  
  if(token) {
    return (
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/dashboard/note/:id' element={<UpdateNotePage />} />
        <Route path='/verify/:id' element={<VerifyPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='/userPreferences' element={<UserPreferences />} />
      </Routes>
    )
  }
  else {
    return (
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/verify/:id' element={<VerifyPage />} />
      </Routes>
    )

  }
}


