// React Functions
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import App from './App'

// CSS
import './index.css'

// Routes
import SignUp from './routes/signup'
import Home from './routes/home'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='home' element={<Home />} />
    </Routes>
  </BrowserRouter>

);
