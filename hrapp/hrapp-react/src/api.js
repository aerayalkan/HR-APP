import axios from 'axios';

// Backend API base URL
const API_URL = 'http://localhost:8080/api';

// Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Login API call
export const login = async (username, password) => {
    return await api.post('/authenticate', { username, password });
};

// Fetch all employees
export const getAllEmployees = async (token) => {
    return await api.get('/employees', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Fetch employee by ID
export const getEmployeeById = async (id, token) => {
    return await api.get(`/employees/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Update employee details
export const updateEmployee = async (id, employeeData, token) => {
    return await api.put(`/employees/${id}`, employeeData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Delete employee
export const deleteEmployee = async (id, token) => {
    return await api.delete(`/employees/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Add new employee
export const addEmployee = async (employeeData, token) => {
    return await api.post('/employees', employeeData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Fetch all inventories
export const getAllInventories = async (token) => {
    return await api.get('/inventories/all', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Fetch assigned inventories
export const getAssignedInventories = async (token) => {
    return await api.get('/inventories/assigned', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Fetch available inventories
export const getAvailableInventories = async (token) => {
    return await api.get('/inventories/available', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Update inventory details
export const updateInventory = async (id, inventoryData, token) => {
    return await api.put(`/inventories/${id}`, inventoryData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Delete inventory
export const deleteInventory = async (id, token) => {
    return await api.delete(`/inventories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Add new inventory
export const addInventory = async (inventoryData, token) => {
    return await api.post('/inventories', inventoryData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Fetch assignments
export const getAllAssignments = async (token) => {
    return await api.get('/assignments', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Add new assignment
export const addAssignment = async (assignmentData, token) => {
    return await api.post('/assignments', assignmentData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Update assignment
export const updateAssignment = async (id, assignmentData, token) => {
    return await api.put(`/assignments/${id}`, assignmentData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Delete assignment
export const deleteAssignment = async (id, token) => {
    return await api.delete(`/assignments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
