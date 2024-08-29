import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import EmployeeProfile from './EmployeeProfile';
import MyInventories from './MyInventories';
import { logout } from '../utils/logout';

const EmployeeDashboard = () => {
    const location = useLocation();

    // Dashboard sayfasında mıyız kontrolü
    const isDashboard = location.pathname === '/employee';

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-primary text-white py-4 flex justify-center items-center relative" style={{ backgroundColor: '#3336f3' }}>
                <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', textAlign: 'center', width: '100%' }}>
                    Employee Dashboard
                </h1>
                <button onClick={logout} className="absolute right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </button>
            </header>
            <div className="flex">
                {!isDashboard && (
                    <nav className="w-64 bg-white shadow-lg p-4">
                        <ul className="space-y-4">
                            <li>
                                <Link to="/employee" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                    Dashboard
                                </Link>
                            </li>
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
                )}
                <main className={`flex-1 p-2 ${isDashboard ? 'flex flex-col justify-center items-center' : ''}`}>
                    {isDashboard && (
                        <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-4rem)]">
                            <div className="grid grid-cols-2 gap-8 w-full max-w-screen-lg">
                                <Link
                                    to="/employee/profile"
                                    className="flex justify-center items-center h-[20vh] bg-white rounded-lg hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300 ease-in-out"
                                    style={{ boxShadow: '0 4px 6px rgb(51, 54, 243)' }}
                                >
                                    <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        My Profile
                                    </span>
                                </Link>
                                <Link
                                    to="/employee/inventories"
                                    className="flex justify-center items-center h-[20vh] bg-white rounded-lg hover:bg-primary hover:text-white transition transform hover:scale-105 duration-300 ease-in-out"
                                    style={{ boxShadow: '0 4px 6px rgb(51, 54, 243)' }}
                                >
                                    <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        My Inventories
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )}
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
