import axios from 'axios';

const API_URL = '/api/employees';

const getEmployees = () => {
    return axios.get(API_URL);
};

export default {
    getEmployees,
};
