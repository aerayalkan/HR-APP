import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import EmployeesPage from './components/EmployeesPage'; // Yeni sayfalar
import InventoriesPage from './components/InventoriesPage';
import AssignmentsPage from './components/AssignmentsPage';
import ProfilePage from './components/ProfilePage'; // Employee için profil sayfası
import MyInventoriesPage from './components/MyInventoriesPage'; // Employee için zimmetli envanterler
import AvailableInventoriesPage from './components/AvailableInventoriesPage'; // Employee için mevcut envanterler
import LoginPage from './components/LoginPage';
import { AuthProvider } from './services/authService';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/inventories" element={<InventoriesPage />} />
                    <Route path="/assignments" element={<AssignmentsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/my-inventories" element={<MyInventoriesPage />} />
                    <Route path="/available-inventories" element={<AvailableInventoriesPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};


export default App;
