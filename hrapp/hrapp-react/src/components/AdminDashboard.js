import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Employees from './Employees';
import Inventories from './Inventories';
import Assignments from './Assignments';
import AdminProfile from './AdminProfile';
import { logout } from '../utils/logout';
import NewsSection from './NewsSection';
import jforce1 from '../images/jforce1.jpg';
import jforce2 from '../images/jforce2.jpg';
import jforce3 from '../images/jforce3.jpg';

const AdminDashboard = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-primary text-white py-4 flex justify-center items-center relative">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={logout}
                    className="absolute right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Logout
                </button>
            </header>
            <div className="flex">
                <nav className="w-64 bg-white shadow-lg p-4">
                    <ul className="space-y-4">
                        <li>
                            <Link to="/admin" className="block py-2 px-4 rounded hover:bg-primary hover:text-white transition">
                                Dashboard
                            </Link>
                        </li>
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
                <main className="flex-1 p-2">
                    {/* Haberler sadece "/admin" rotasında görünecek */}
                    {location.pathname === '/admin' && (
                        <div className="flex justify-between flex-wrap">
                            <NewsSection
                                imageSrc={jforce1}
                                title="News Title 1"
                                description="This is a short description for news item 1."
                            />
                            <NewsSection
                                imageSrc={jforce2}
                                title="News Title 2"
                                description="This is a short description for news item 2."
                            />
                            <NewsSection
                                imageSrc={jforce3}
                                title="News Title 3"
                                description="This is a short description for news item 3."
                            />
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
