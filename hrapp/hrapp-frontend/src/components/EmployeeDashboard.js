import React, { useEffect, useState } from 'react';
import inventoryService from '../services/inventoryService';
import employeeService from '../services/employeeService';
import { useAuth } from '../services/authService';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [assignedInventories, setAssignedInventories] = useState([]);
    const [availableInventories, setAvailableInventories] = useState([]);
    const [profile, setProfile] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user.roles.includes('ROLE_EMPLOYEE')) {
            inventoryService.getAssignedInventories().then((response) => {
                setAssignedInventories(response.data);
            });
            inventoryService.getAvailableInventories().then((response) => {
                setAvailableInventories(response.data);
            });
            employeeService.getProfile().then((response) => {
                setProfile(response.data);
            });
        }
    }, [user.roles]);

    return (
        <div className="employee-dashboard">
            <h2>Employee Dashboard</h2>

            <h3>Profile</h3>
            {profile && (
                <div>
                    <p>Name: {profile.firstName} {profile.lastName}</p>
                    <p>Department: {profile.department}</p>
                    <p>Position: {profile.position}</p>
                    <p>Employee Number: {profile.employeeNumber}</p>
                </div>
            )}

            <h3>Assigned Inventories</h3>
            <table>
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Serial No</th>
                    <th>Status</th>
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

            <h3>Available Inventories</h3>
            <table>
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Serial No</th>
                    <th>Status</th>
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
