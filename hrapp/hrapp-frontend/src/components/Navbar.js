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
                    {user.roles && user.roles.includes('ROLE_ADMIN') && (
                        <>
                            <Link to="/admin">Admin Dashboard</Link>
                            <Link to="/employees">Employees</Link>
                            <Link to="/inventories">Inventories</Link>
                            <Link to="/assignments">Assignments</Link>
                        </>
                    )}
                    {user.roles && user.roles.includes('ROLE_EMPLOYEE') && (
                        <>
                            <Link to="/profile">Profile</Link>
                            <Link to="/my-inventories">My Inventories</Link>
                            <Link to="/available-inventories">Available Inventories</Link>
                        </>
                    )}
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;
