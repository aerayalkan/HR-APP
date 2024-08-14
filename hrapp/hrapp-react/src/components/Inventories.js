import React, { useEffect, useState } from 'react';
import { getAllInventories, createInventory, updateInventory, deleteInventory } from '../api';

const Inventories = () => {
    const [inventories, setInventories] = useState([]);
    const [newInventory, setNewInventory] = useState({ type: '', brand: '', model: '', serialNumber: '', status: '' });

    useEffect(() => {
        const fetchInventories = async () => {
            const response = await getAllInventories();
            setInventories(response.data);
        };

        fetchInventories();
    }, []);

    const handleCreate = async () => {
        const response = await createInventory(newInventory);
        setInventories([...inventories, response.data]);
    };

    const handleUpdate = async (id) => {
        const updatedInventory = inventories.find(inventory => inventory.id === id);
        const response = await updateInventory(id, updatedInventory);
        setInventories(inventories.map(inv => inv.id === id ? response.data : inv));
    };

    const handleDelete = async (id) => {
        await deleteInventory(id);
        setInventories(inventories.filter(inventory => inventory.id !== id));
    };

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
                            <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition" onClick={() => handleUpdate(inventory.id)}>Edit</button>
                            <button className="bg-danger text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition" onClick={() => handleDelete(inventory.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Add New Inventory</h3>
                <input type="text" placeholder="Type" value={newInventory.type} onChange={(e) => setNewInventory({ ...newInventory, type: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <input type="text" placeholder="Brand" value={newInventory.brand} onChange={(e) => setNewInventory({ ...newInventory, brand: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <input type="text" placeholder="Model" value={newInventory.model} onChange={(e) => setNewInventory({ ...newInventory, model: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <input type="text" placeholder="Serial Number" value={newInventory.serialNumber} onChange={(e) => setNewInventory({ ...newInventory, serialNumber: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <input type="text" placeholder="Status" value={newInventory.status} onChange={(e) => setNewInventory({ ...newInventory, status: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={handleCreate}>Add Inventory</button>
            </div>
        </div>
    );
};

export default Inventories;
