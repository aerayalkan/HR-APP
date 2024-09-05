/*
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
            console.log("Decoded Token:", decodedToken);
            const roles = decodedToken.roles || [];
            console.log("User Roles:", roles);

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
                            autoComplete="username"  // autocomplete özelliği eklendi
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
                            autoComplete="current-password"  // autocomplete özelliği eklendi
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
*/

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

            const decodedToken = jwtDecode(token);
            const roles = decodedToken.roles || [];

            localStorage.setItem('token', token);
            localStorage.setItem('roles', JSON.stringify(roles));

            if (roles.includes('ROLE_ADMIN')) {
                navigate('/admin');
            } else {
                navigate('/employee');
            }
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <form onSubmit={handleLogin} style={styles.form}>
                    <img src={logo} alt="JFORCE Logo" style={styles.logo} />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    {error && <p style={styles.error}>{error}</p>}
                    <button type="submit" style={styles.button}>Sign in</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    body: {
        background: 'linear-gradient(135deg, #1E3C72, #2A5298, #6DD5FA, #FFFFFF)',
        height: '100vh',
        fontFamily: "'Montserrat', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        position: 'relative',
    },
    form: {
        background: 'rgba(255, 255, 255, 0.3)',
        padding: '4em',
        borderRadius: '30px',
        borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '20px 20px 40px -6px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        width: '400px',
    },
    logo: {
        width: '300px',
        marginBottom: '60px',
        alignSelf: 'center',
    },
    input: {
        background: 'transparent',
        width: '100%',
        padding: '1.2em',
        marginBottom: '2em',
        border: 'none',
        borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '5000px',
        backdropFilter: 'blur(5px)',
        boxShadow: '4px 4px 60px rgba(0, 0, 0, 0.2)',
        color: '#fff',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: '500',
        fontSize: '1.1rem',
        transition: 'all 0.2s ease-in-out',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    'input::placeholder': {
        color: '#ffffff',
        opacity: '1',
    },
    button: {
        marginTop: '20px',
        width: '100%',
        fontSize: '1.2rem',
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '5000px',
        padding: '1.2em',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
    },
    error: {
        color: '#ff0000',
        fontSize: '1.2rem',
    },
};

export default Login;
