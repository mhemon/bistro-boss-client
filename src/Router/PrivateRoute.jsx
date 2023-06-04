import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    if(user){
        return children
    }

    if(loading){
        return <progress className="progress w-56"></progress>
    }
    return (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoute;