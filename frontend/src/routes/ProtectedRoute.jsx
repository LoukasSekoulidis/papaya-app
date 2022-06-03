import React from "react";
import { Navigate } from "react-router-dom";
// import Home from './routes/home'


const LOCAL_STORAGE_KEY = 'papaya.token'


const ProtectedRoute = ({ user, children }) => {

  const logedIn = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!logedIn) {
  // if (!user) {
    return <Navigate to="/landing" state={{error: 'You are currently not logged in.'}} replace />
  }

  return children;
};

export default ProtectedRoute;
