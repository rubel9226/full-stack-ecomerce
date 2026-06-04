import React, { Component, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Utils/UI/Loading/Loading';

const TempRoute =({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className={`fixed flex items-center justify-center z-20 bg-black/65 w-full min-h-screen top-0 right-0`}>
                <Loading />
            </div>
    }

    if(!user){
        return <Navigate to={'/'} state={{from: location}} replace />
    }

    // role mismatch -> redirect based on role instead of just unauthorized page
    if(allowedRoles && !allowedRoles.includes(user.role)){
        if(user.role === "admin") return <Navigate to={'/admin'} replace />
        if (user.role === 'user') return <Navigate to={'/dashboard'} replace />
        if(user.role === 'vendor') return <Navigate to={'/vendor'} replace />

        return <Navigate to={'/unauthorized'} replace />;
    }
    return children;
};

export default TempRoute;