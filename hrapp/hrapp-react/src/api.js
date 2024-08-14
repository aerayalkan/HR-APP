import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // API base URL

// Login API
export const login = async (username, password) => {
    return await axios.post(`${BASE_URL}/authenticate`, { username, password });
};

// Tüm çalışanları getiren API isteği
export const getAllEmployees = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(`${BASE_URL}/api/employees`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Yeni bir çalışan ekleyen API isteği
export const createEmployee = async (employeeData) => {
    const token = localStorage.getItem('token');
    return await axios.post(`${BASE_URL}/api/employees`, employeeData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Çalışan güncelleyen API isteği
export const updateEmployee = async (employeeId, employeeData) => {
    const token = localStorage.getItem('token');
    return await axios.put(`${BASE_URL}/api/employees/${employeeId}`, employeeData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Çalışan silen API isteği
export const deleteEmployee = async (employeeId) => {
    const token = localStorage.getItem('token');
    return await axios.delete(`${BASE_URL}/api/employees/${employeeId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Tüm envanterleri getiren API isteği
export const getAllInventories = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(`${BASE_URL}/inventories/all`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Yeni bir envanter ekleyen API isteği
export const createInventory = async (inventoryData) => {
    const token = localStorage.getItem('token');
    return await axios.post(`${BASE_URL}/inventories`, inventoryData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Envanteri güncelleyen API isteği
export const updateInventory = async (inventoryId, inventoryData) => {
    const token = localStorage.getItem('token');
    return await axios.put(`${BASE_URL}/inventories/${inventoryId}`, inventoryData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Envanteri silen API isteği
export const deleteInventory = async (inventoryId) => {
    const token = localStorage.getItem('token');
    return await axios.delete(`${BASE_URL}/inventories/${inventoryId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Tüm zimmetleri getiren API isteği
export const getAllAssignments = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(`${BASE_URL}/assignments`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Yeni bir zimmet ekleyen API isteği
export const createAssignment = async (assignmentData) => {
    const token = localStorage.getItem('token');
    return await axios.post(`${BASE_URL}/assignments`, assignmentData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Zimmeti güncelleyen API isteği
export const updateAssignment = async (assignmentId, assignmentData) => {
    const token = localStorage.getItem('token');
    return await axios.put(`${BASE_URL}/assignments/${assignmentId}`, assignmentData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Zimmeti silen API isteği
export const deleteAssignment = async (assignmentId) => {
    const token = localStorage.getItem('token');
    return await axios.delete(`${BASE_URL}/assignments/${assignmentId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getMyInventories = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(`${BASE_URL}/inventories/assigned`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};
