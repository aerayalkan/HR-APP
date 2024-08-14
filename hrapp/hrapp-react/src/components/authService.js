import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const login = async (username, password) => {
    const response = await axios.post('/api/authenticate', { username, password });
    const { token } = response.data;

    // Token'ı decode etme
    const decodedToken = jwtDecode(token);
    const roles = decodedToken.roles || []; // Eğer roles yoksa boş bir dizi

    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));

    return roles;
};

