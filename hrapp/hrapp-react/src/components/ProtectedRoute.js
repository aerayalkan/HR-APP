import {jwtDecode} from 'jwt-decode';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
    const token = localStorage.getItem('token');
    let isTokenValid = false;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            isTokenValid = decodedToken.exp > currentTime;
        } catch (e) {
            console.error('Invalid token', e);
        }
    }

    const userRoles = JSON.parse(localStorage.getItem('roles')) || [];

    if (!token || !isTokenValid) {
        return <Navigate to="/login" />;
    }

    if (roles && roles.length > 0 && !roles.some(role => userRoles.includes(role))) {
        return <Navigate to="/login" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
