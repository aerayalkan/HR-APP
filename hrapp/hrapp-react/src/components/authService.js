import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const login = async (username, password) => {
    const response = await axios.post('/api/authenticate', { username, password });
    const { token } = response.data;


    const decodedToken = jwtDecode(token);
    const roles = decodedToken.roles || [];

    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));

    return roles;
};

