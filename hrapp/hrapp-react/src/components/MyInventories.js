import React, { useEffect, useState } from 'react';
import { getMyInventories } from '../api';

const MyInventories = () => {
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        const fetchMyInventories = async () => {
            const response = await getMyInventories();
            setInventories(response.data);
        };

        fetchMyInventories();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">My Inventories</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">Type</th>
                    <th className="px-4 py-2 border-b">Brand</th>
                    <th className="px-4 py-2 border-b">Model</th>
                    <th className="px-4 py-2 border-b">Serial Number</th>
                    <th className="px-4 py-2 border-b">Status</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyInventories;
