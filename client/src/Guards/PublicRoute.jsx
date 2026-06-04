import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate } from 'react-router';
import Loading from '../Utils/UI/Loading/Loading';

const PublicRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    if(loading){
        return <div className={`fixed flex items-center justify-center z-20 bg-black/65 w-full min-h-screen top-0 right-0`}>
                <Loading />
            </div>
    }

    if(user) {
        if(user.role === 'admin') return <Navigate to={'/admin'} replace />
        if(user.role === 'user') return <Navigate to={'/dashboard'} replace />
        if(user.role === 'vendor') return <Navigate to={'/vendor'} replace />

        return <Navigate to={'/'} replace />;
    }
    return children ;
};

export default PublicRoute;