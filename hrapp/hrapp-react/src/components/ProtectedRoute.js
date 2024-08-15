import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
    const token = localStorage.getItem('token');
    const userRoles = JSON.parse(localStorage.getItem('roles')) || [];

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (roles && roles.length > 0 && !roles.some(role => userRoles.includes(role))) {
        return <Navigate to="/login" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
