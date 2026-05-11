import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate } from 'react-router';

const PublicRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    if(loading){
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    };

    if(user) {
        if (user.role === 'admin') return <Navigate to={'/admin'} replace />
        if (user.role === 'user') return <Navigate to={'/dashboard'} replace />
        if(user.role === 'vendor') return <Navigate to={'/vendor'} replace />

        return <Navigate to={'/'} replace />;
    }
    return children ;
};

export default PublicRoute;