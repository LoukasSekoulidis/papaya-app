// React Functions
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

// Components
import App from './App'

// CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Routes
// import SignUp from './routes/signup'
// import Home from './routes/home'
// import UpdateNote from './routes/updateNote'
// import { NotFound } from './routes/notFound'
// import ProtectedRoute from './routes/ProtectedRoute'
// import { Verify } from './routes/verify'
// import Landing from './routes/landing'


// check for logged in user
// const LOCAL_STORAGE_KEY = 'papaya.token'
// const user = localStorage.getItem(LOCAL_STORAGE_KEY)
// can't pass this down to use for /home, since after login the key needs longer to be in 
// localstorage than the site loads which ends up to forward you to /signup after successful 
// login instead of /home

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)