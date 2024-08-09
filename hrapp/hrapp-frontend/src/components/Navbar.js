import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/authService';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="nav-link">Home</Link>
            </div>
            <div className="nav-right">
                {user ? (
                    <>
                        {user.roles && user.roles.includes('ROLE_ADMIN') && (
                            <>
                                <Link to="/admin" className="nav-link">Admin Dashboard</Link>
                                <Link to="/employees" className="nav-link">Employees</Link>
                                <Link to="/inventories" className="nav-link">Inventories</Link>
                                <Link to="/assignments" className="nav-link">Assignments</Link>
                            </>
                        )}
                        {user.roles && user.roles.includes('ROLE_EMPLOYEE') && (
                            <>
                                <Link to="/profile" className="nav-link">Profile</Link>
                                <Link to="/my-inventories" className="nav-link">My Inventories</Link>
                                <Link to="/available-inventories" className="nav-link">Available Inventories</Link>
                            </>
                        )}
                        <button onClick={logout} className="nav-button">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="nav-link">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
