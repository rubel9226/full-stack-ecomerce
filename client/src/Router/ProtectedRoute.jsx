import React, { Component, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute =({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <p>Loading...</p>
    }


    if(!user){
        return <Navigate to={'/login'} state={{from: location}} replace />
    }

    // role mismatch -> redirect based on role instead of just unauthorized page
    if(allowedRoles && !allowedRoles.includes(user.role)){
        if(user.role === "admin") return <Navigate to={'/admin'} replace />
        if (user.role === 'user') return <Navigate to={'/dashboard'} replace />
        if(user.role === 'vendor') return <Navigate to={'/vendor'} replace />

        return <Navigate to={'/unauthorized'} replace />;
    }


    // if(!allowedRoles.includes(user.role)) {
    //     return <Navigate to={'/unauthorized'} />
    // }

    return children;
};

export default ProtectedRoute;