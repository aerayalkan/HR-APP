import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin/dashboard/*"
                    path="/admin/*"
                    element={<ProtectedRoute element={AdminDashboard} roles={['ROLE_ADMIN']} />}

                />
                <Route
                    path="/employee/dashboard/*"
                    path="/employee/*"
                    element={<ProtectedRoute element={EmployeeDashboard} roles={['ROLE_EMPLOYEE']} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
