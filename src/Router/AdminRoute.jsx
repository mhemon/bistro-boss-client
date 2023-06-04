import React from 'react';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    const [isAdmin, isAdminLoading] = useAdmin()
    if(loading || isAdminLoading){
        return <progress className="progress progress-primary w-56"></progress>
    }

    if(user && isAdmin){
        return children
    }
    return (
        <Navigate to="/" state={{from: location}} replace/>
    );
};

export default AdminRoute;