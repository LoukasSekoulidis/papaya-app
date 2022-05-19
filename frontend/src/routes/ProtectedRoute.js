import React from "react";
import { Navigate, Route } from "react-router-dom";
// import Home from './routes/home'


const LOCAL_STORAGE_KEY = 'papaya.token'


function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem(LOCAL_STORAGE_KEY);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/signin" />
      }
    />
  )
}

export default ProtectedRoute;
