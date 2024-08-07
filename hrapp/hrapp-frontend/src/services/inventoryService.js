import axios from 'axios';

const API_URL = 'http://localhost:8080/inventories';

const getAssignedInventories = () => {
    return axios.get(`${API_URL}/assigned`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

const getAvailableInventories = () => {
    return axios.get(`${API_URL}/available`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

const getAllInventories = () => {
    return axios.get(`${API_URL}/all`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

const createInventory = (inventory) => {
    return axios.post(API_URL, inventory, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

const updateInventory = (id, inventory) => {
    return axios.put(`${API_URL}/${id}`, inventory, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

const deleteInventory = (id) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
};

export default {
    getAssignedInventories,
    getAvailableInventories,
    getAllInventories,
    createInventory,
    updateInventory,
    deleteInventory
};
