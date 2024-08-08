import axios from 'axios';

const API_URL = 'http://localhost:8080/assignments';

const getAssignments = () => {
    return axios.get(API_URL, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

const createAssignment = (assignment) => {
    return axios.post(API_URL, assignment, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

const updateAssignment = (id, assignment) => {
    return axios.put(`${API_URL}/${id}`, assignment, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

const deleteAssignment = (id) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

export default {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
};
