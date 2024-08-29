import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Employees from './Employees';
import Inventories from './Inventories';
import Assignments from './Assignments';
import AdminProfile from './AdminProfile';
import { logout } from '../utils/logout';

const AdminDashboard = () => {
    const location = useLocation();

    // Dashboard sayfasında mıyız kontrolü
    const isDashboard = location.pathname === '/admin';

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="text-white py-4 flex justify-center items-center relative" style={{ backgroundColor: '#3336f3' }}>
                <h1 className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Admin Dashboard
                </h1>
                <button
                    onClick={logout}
                    className="absolute right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </button>
            </header>
            <div className="flex">
                {!isDashboard && (
                    <nav className="w-64 bg-white shadow-lg p-4">
                        <ul className="space-y-4">
                            <li>
                                <Link to="/admin" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition" style={{ hover: { backgroundColor: '#3336f3' } }}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/employees" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition" style={{ hover: { backgroundColor: '#3336f3' } }}>
                                    Employees
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/inventories" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition" style={{ hover: { backgroundColor: '#3336f3' } }}>
                                    Inventories
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/assignments" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition" style={{ hover: { backgroundColor: '#3336f3' } }}>
                                    Assignments
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/profile" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition" style={{ hover: { backgroundColor: '#3336f3' } }}>
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
                <main className={`flex-1 p-2 ${isDashboard ? 'flex justify-center items-center' : ''}`}>
                    {isDashboard && (
                        <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-4rem)]">
                            <div className="grid grid-cols-2 gap-8 w-full max-w-screen-lg">
                                <Link
                                    to="/admin/employees"
                                    className="flex justify-center items-center h-[20vh] bg-white rounded-lg hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300 ease-in-out"
                                    style={{ boxShadow: '0 4px 6px rgb(51, 54, 243)' }}
                                >
                                    <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Employees
                                    </span>
                                </Link>
                                <Link
                                    to="/admin/inventories"
                                    className="flex justify-center items-center h-[20vh] bg-white rounded-lg hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300 ease-in-out"
                                    style={{ boxShadow: '0 4px 6px rgb(51, 54, 243)' }}
                                >
                                    <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Inventories
                                    </span>
                                </Link>
                                <Link
                                    to="/admin/assignments"
                                    className="flex justify-center items-center h-[20vh] bg-white rounded-lg hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300 ease-in-out"
                                    style={{ boxShadow: '0 4px 6px rgb(51, 54, 243)' }}
                                >
                                    <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Assignments
                                    </span>
                                </Link>
                                <Link
                                    to="/admin/profile"
                                    className="flex justify-center items-center h-[20vh] bg-white rounded-lg hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300 ease-in-out"
                                    style={{ boxShadow: '0 4px 6px rgb(51, 54, 243)' }}
                                >
                                    <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Profile
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )}
                    <Routes>
                        {/* Diğer admin menü sayfaları */}
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
