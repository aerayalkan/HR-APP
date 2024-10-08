import React, { useEffect, useState } from 'react';
import { getAllInventories, createInventory, updateInventory, deleteInventory } from '../api';

const Inventories = () => {
    const [inventories, setInventories] = useState([]);
    const [filteredInventories, setFilteredInventories] = useState([]);
    const [newInventory, setNewInventory] = useState({
        type: '',
        brand: '',
        model: '',
        serialNumber: '',
        status: '',
        entryDate: ''
    });
    const [filters, setFilters] = useState({
        type: '',
        brand: '',
        status: ''
    });
    const [editingInventoryId, setEditingInventoryId] = useState(null);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const response = await getAllInventories();
                setInventories(response.data);
                setFilteredInventories(response.data); // Initially show all inventories
            } catch (error) {
                console.error('Envanterler yüklenirken bir hata oluştu:', error);
            }
        };

        fetchInventories();
    }, []);

    const applyFilter = () => {
        let updatedInventories = inventories;
        if (filters.type) {
            updatedInventories = updatedInventories.filter(inventory => inventory.type === filters.type);
        }
        if (filters.brand) {
            updatedInventories = updatedInventories.filter(inventory => inventory.brand === filters.brand);
        }
        if (filters.status) {
            updatedInventories = updatedInventories.filter(inventory => inventory.status === filters.status);
        }
        setFilteredInventories(updatedInventories);
    };

    const handleCreateOrUpdate = async () => {
        try {
            if (editingInventoryId) {
                // Update existing inventory
                const response = await updateInventory(editingInventoryId, newInventory);
                setInventories(inventories.map(inv => inv.id === editingInventoryId ? response.data : inv));
                applyFilter();
            } else {
                // Create new inventory
                const response = await createInventory(newInventory);
                setInventories([...inventories, response.data]);
                applyFilter();
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
            applyFilter();
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
            entryDate: ''
        });
        setEditingInventoryId(null);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Inventories</h2>

            {/* Filter Section */}
            <div className="flex space-x-4 mb-6">
                <select name="type" value={filters.type} onChange={handleFilterChange} className="border rounded-lg px-4 py-2">
                    <option value="">All Types</option>
                    {Array.from(new Set(inventories.map(inv => inv.type))).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <select name="brand" value={filters.brand} onChange={handleFilterChange} className="border rounded-lg px-4 py-2">
                    <option value="">All Brands</option>
                    {Array.from(new Set(inventories.map(inv => inv.brand))).map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>

                <select name="status" value={filters.status} onChange={handleFilterChange} className="border rounded-lg px-4 py-2">
                    <option value="">All Status</option>
                    <option value="Available">Available</option>
                    <option value="In Use">In Use</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                </select>

                <button onClick={applyFilter} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Filter
                </button>
            </div>

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
                {filteredInventories.map(inventory => (
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
                <h3 className="text-xl font-bold mb-2 text-white">{editingInventoryId ? 'Edit Inventory' : 'Add New Inventory'}</h3>
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
