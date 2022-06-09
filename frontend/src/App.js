// import LoginForm from './components/user/LoginForm'
// import SignUpButton from './components/user/SignUpButton'


// export default function App() {
//   return (
//     <div>
//       <LoginForm />
//       <SignUpButton />
//     </div>
//   )
// }
import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"


// Routes
import SignUp from './routes/signup'
import Home from './routes/home'
import UpdateNote from './routes/updateNote'
import { NotFound } from './routes/notFound'
import ProtectedRoute from './routes/ProtectedRoute'
import { Verify } from './routes/verify'
import Landing from './routes/landing'
import Dashboard from './components/Dashboard/Dashboard'

// check for logged in user
const LOCAL_STORAGE_KEY = 'papaya.token'

export default function App() {
  
  const user = localStorage.getItem(LOCAL_STORAGE_KEY)

  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path='/' element={<Navigate to={user ? "/dashboard" : "/landing"} />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/landing' element={<Landing />} />
      {/* <Route
        path='/dashboard'
        element={
          <ProtectedRoute user={user}>
            <Home />
          </ProtectedRoute>
        } /> */}
      <Route path='/dashboard/note/:id' element={<UpdateNote />} />
      <Route path='/verify/:id' element={<Verify />} />
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/dashboard/:id' element={<Dashboard />}/>
    </Routes>
  )
}


