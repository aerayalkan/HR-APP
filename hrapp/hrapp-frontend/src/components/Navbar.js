import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/authService';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    {user.roles && user.roles.includes('ROLE_ADMIN') && <Link to="/admin">Admin Dashboard</Link>}
                    {user.roles && user.roles.includes('ROLE_EMPLOYEE') && <Link to="/employee">Employee Dashboard</Link>}
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};


export default Navbar;
