import React, { useEffect, useState } from 'react';
import { getAllInventories, createInventory, updateInventory, deleteInventory } from '../api';

const Inventories = () => {
    const [inventories, setInventories] = useState([]);
    const [newInventory, setNewInventory] = useState({
        type: '',
        brand: '',
        model: '',
        serialNumber: '',
        status: '',
        entryDate: '' // entryDate alanını ekledik
    });
    const [editingInventoryId, setEditingInventoryId] = useState(null);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const response = await getAllInventories();
                setInventories(response.data);
            } catch (error) {
                console.error('Envanterler yüklenirken bir hata oluştu:', error);
            }
        };

        fetchInventories();
    }, []);

    const handleCreateOrUpdate = async () => {
        try {
            if (editingInventoryId) {
                // Update existing inventory
                const response = await updateInventory(editingInventoryId, newInventory);
                setInventories(inventories.map(inv => inv.id === editingInventoryId ? response.data : inv));
            } else {
                // Create new inventory
                const response = await createInventory(newInventory);
                setInventories([...inventories, response.data]);
            }
            resetForm();
        } catch (error) {
            console.error('Envanter eklenirken veya güncellenirken bir hata oluştu:', error);
        }
    };

    const handleUpdate = (inventory) => {
        setNewInventory(inventory);
        setEditingInventoryId(inventory.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteInventory(id);
            setInventories(inventories.filter(inventory => inventory.id !== id));
        } catch (error) {
            console.error('Envanter silinirken bir hata oluştu:', error);
        }
    };

    const resetForm = () => {
        setNewInventory({
            type: '',
            brand: '',
            model: '',
            serialNumber: '',
            status: '',
            entryDate: '' // Formu sıfırlarken entryDate'i de sıfırlıyoruz
        });
        setEditingInventoryId(null);
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
                            <button
                                className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                onClick={() => handleUpdate(inventory)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-danger text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition"
                                onClick={() => handleDelete(inventory.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">{editingInventoryId ? 'Edit Inventory' : 'Add New Inventory'}</h3>
                <input
                    type="text"
                    placeholder="Type"
                    value={newInventory.type}
                    onChange={(e) => setNewInventory({ ...newInventory, type: e.target.value })}
                    className="border rounded-lg px-4 py-2 mb-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Brand"
                    value={newInventory.brand}
                    onChange={(e) => setNewInventory({ ...newInventory, brand: e.target.value })}
                    className="border rounded-lg px-4 py-2 mb-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Model"
                    value={newInventory.model}
                    onChange={(e) => setNewInventory({ ...newInventory, model: e.target.value })}
                    className="border rounded-lg px-4 py-2 mb-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Serial Number"
                    value={newInventory.serialNumber}
                    onChange={(e) => setNewInventory({ ...newInventory, serialNumber: e.target.value })}
                    className="border rounded-lg px-4 py-2 mb-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newInventory.status}
                    onChange={(e) => setNewInventory({ ...newInventory, status: e.target.value })}
                    className="border rounded-lg px-4 py-2 mb-2 w-full"
                    required
                />
                <input
                    type="date"
                    placeholder="Entry Date"
                    value={newInventory.entryDate}
                    onChange={(e) => setNewInventory({ ...newInventory, entryDate: e.target.value })}
                    className="border rounded-lg px-4 py-2 mb-2 w-full"
                    required
                />
                <button
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={handleCreateOrUpdate}
                >
                    {editingInventoryId ? 'Update Inventory' : 'Add Inventory'}
                </button>
                {editingInventoryId && (
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition ml-4"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default Inventories;
