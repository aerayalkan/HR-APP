import React, { useState } from 'react';
import { useAuth } from '../services/authService';
import { useNavigate } from 'react-router-dom'; // useHistory yerine useNavigate kullanın
import './Login.css'; // Login CSS dosyasını dahil ediyoruz

const LoginPage = () => { // Burada Login yerine LoginPage
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // useHistory yerine useNavigate kullanın

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/'); // history.push yerine navigate kullanın
        } catch (error) {
            console.error('Login error:', error); // Hata mesajını log ekleyin
            alert('Login failed: ' + error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
