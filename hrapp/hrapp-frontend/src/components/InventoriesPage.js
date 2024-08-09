import React, { useEffect, useState } from 'react';
import inventoryService from '../services/inventoryService';
import './InventoriesPage.css';

const InventoriesPage = () => {
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        inventoryService.getAllInventories().then((response) => {
            setInventories(response.data);
        });
    }, []);

    return (
        <div className="inventories-page">
            <h1>Inventories</h1>
            <table>
                <thead>
                <tr>
                    <th>Tip</th>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Seri No</th>
                    <th>Durum</th>
                </tr>
                </thead>
                <tbody>
                {inventories.map((inventory) => (
                    <tr key={inventory.id}>
                        <td>{inventory.type}</td>
                        <td>{inventory.brand}</td>
                        <td>{inventory.model}</td>
                        <td>{inventory.serialNumber}</td>
                        <td>{inventory.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoriesPage;
