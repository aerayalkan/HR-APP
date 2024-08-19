import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import EmployeeProfile from './EmployeeProfile';
import MyInventories from './MyInventories';
import { logout } from '../utils/logout';

const EmployeeDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-primary text-white py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-center">Employee Dashboard</h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </button>
            </header>
            <div className="flex">
                <nav className="w-64 bg-white shadow-lg p-4">
                    <ul className="space-y-4">
                        <li>
                            <Link to="/employee/profile" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                My Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/employee/inventories" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                My Inventories
                            </Link>
                        </li>
                    </ul>
                </nav>
                <main className="flex-1 p-6">
                    <Routes>
                        <Route path="profile" element={<EmployeeProfile />} />
                        <Route path="inventories" element={<MyInventories />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
