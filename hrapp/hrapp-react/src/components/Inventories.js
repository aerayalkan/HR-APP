import React, { useEffect, useState } from 'react';
import { getAllInventories } from '../api';

const Inventories = () => {
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        const fetchInventories = async () => {
            const token = localStorage.getItem('token');
            const response = await getAllInventories(token);
            setInventories(response.data);
        };

        fetchInventories();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Inventories</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">Type</th>
                    <th className="px-4 py-2 border-b">Brand</th>
                    <th className="px-4 py-2 border-b">Model</th>
                    <th className="px-4 py-2 border-b">Serial Number</th>
                    <th className="px-4 py-2 border-b">Status</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {inventories.map(inventory => (
                    <tr key={inventory.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b">{inventory.type}</td>
                        <td className="px-4 py-2 border-b">{inventory.brand}</td>
                        <td className="px-4 py-2 border-b">{inventory.model}</td>
                        <td className="px-4 py-2 border-b">{inventory.serialNumber}</td>
                        <td className="px-4 py-2 border-b">{inventory.status}</td>
                        <td className="px-4 py-2 border-b">
                            <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">Edit</button>
                            <button className="bg-danger text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Add New Inventory</button>
        </div>
    );
};

export default Inventories;
