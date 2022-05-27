// React Functions
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import App from './App'

// CSS
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Routes
import SignUp from './routes/signup'
import Home from './routes/home'
import UpdateNote from './routes/updateNote'
// import ProtectedRoute from './routes/ProtectedRoute'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/home' element={<Home />} />
      {/* <ProtectedRoute exact path='/home' component={Home} /> */}
      <Route path='/home/note/:id' element={<UpdateNote />} />
    </Routes>
  </BrowserRouter>
)