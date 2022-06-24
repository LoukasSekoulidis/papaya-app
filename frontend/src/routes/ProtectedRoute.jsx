import React from "react";
import { Navigate } from "react-router-dom";

const LOCAL_STORAGE_KEY = 'papaya.token'


const ProtectedRoute = ({ user, children }) => {

  const loggedIn = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!loggedIn) {
    return <Navigate to="/landing" state={{error: 'You are currently not logged in.'}} replace />
  }

  return children;
};

export default ProtectedRoute;
