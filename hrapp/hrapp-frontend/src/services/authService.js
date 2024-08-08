import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // 'jwt-decode' olarak import edin
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/authenticate', { username, password });
            const token = response.data.token;
            console.log('Token:', token); // Token'i kontrol etmek için log ekleyin
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken); // Decoded token'i kontrol etmek için log ekleyin
            const user = {
                username: decodedToken.sub,
                roles: decodedToken.roles
            };
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        } catch (error) {
            console.error('Login failed:', error); // Hata mesajını log ekleyin
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
