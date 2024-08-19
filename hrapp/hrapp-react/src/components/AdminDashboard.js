import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Employees from './Employees';
import Inventories from './Inventories';
import Assignments from './Assignments';
import AdminProfile from './AdminProfile';
import { logout } from '../utils/logout';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-primary text-white py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </button>
            </header>
            <div className="flex">
                <nav className="w-64 bg-white shadow-lg p-4">
                    <ul className="space-y-4">
                        <li>
                            <Link to="/admin/employees" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                Employees
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/inventories" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                Inventories
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/assignments" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                Assignments
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/profile" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
                <main className="flex-1 p-6">
                    <Routes>
                        <Route path="employees" element={<Employees />} />
                        <Route path="inventories" element={<Inventories />} />
                        <Route path="assignments" element={<Assignments />} />
                        <Route path="profile" element={<AdminProfile />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
