import React, { useEffect, useState } from 'react';
import inventoryService from '../services/inventoryService';
import { useAuth } from '../services/authService';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [assignedInventories, setAssignedInventories] = useState([]);
    const [availableInventories, setAvailableInventories] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user.role === 'EMPLOYEE') {
            inventoryService.getAssignedInventories().then((response) => {
                setAssignedInventories(response.data);
            });
            inventoryService.getAvailableInventories().then((response) => {
                setAvailableInventories(response.data);
            });
        }
    }, [user.role]);

    return (
        <div className="employee-dashboard">
            <h2>Employee Dashboard</h2>
            <h3>Üzerime Zimmetli Envanterler</h3>
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
                {assignedInventories.map((inventory) => (
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
            <h3>Boşta Olan Envanterler</h3>
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
                {availableInventories.map((inventory) => (
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

export default EmployeeDashboard;
