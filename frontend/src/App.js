import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"


// Routes
import SignUpPage from './routes/SignUpPage'
import UpdateNotePage from './routes/UpdateNotePage'
import NotFoundPage from './routes/NotFoundPage'
import VerifyPage from './routes/VerifyPage'
import LandingPage from './routes/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'

// import ProtectedRoute from './routes/ProtectedRoute'

// check for logged in user
const LOCAL_STORAGE_KEY = 'papaya.token'

export default function App() {
  
  const user = localStorage.getItem(LOCAL_STORAGE_KEY)

  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/' element={<Navigate to={user ? "/dashboard" : "/landing"} />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/landing' element={<LandingPage />} />
      {/* <Route
        path='/dashboard'
        element={
          <ProtectedRoute user={user}>
            <Home />
          </ProtectedRoute>
        } /> */}
      <Route path='/dashboard/note/:id' element={<UpdateNotePage />} />
      <Route path='/verify/:id' element={<VerifyPage />} />
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/dashboard/:id' element={<Dashboard />}/>
    </Routes>
  )
}


