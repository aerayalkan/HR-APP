import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import {jwtDecode} from 'jwt-decode';
import logo from '../assets/logo.png';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            const { token } = response.data;

            // Token'ı decode etme
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const roles = decodedToken.roles|| []; // Eğer roles yoksa boş bir dizi kullan

            localStorage.setItem('token', token);
            localStorage.setItem('roles', JSON.stringify(roles));

            if (roles.includes('ROLE_ADMIN')) {
                navigate('/admin/dashboard');
            } else {
                navigate('/employee/dashboard');
            }
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <img src={logo} alt="JFORCE Logo" className="mx-auto mb-6"/>
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">LOGIN</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;