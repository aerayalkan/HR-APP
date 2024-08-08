import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';
import inventoryService from '../services/inventoryService';
import assignmentService from '../services/assignmentService';
import { useAuth } from '../services/authService';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [assignments, setAssignments] = useState([]); // Görevler için yeni state
    const { user } = useAuth();

    useEffect(() => {
        if (user.roles.includes('ROLE_ADMIN')) {
            employeeService.getEmployees().then((response) => {
                setEmployees(response.data);
            });
            inventoryService.getAllInventories().then((response) => {
                setInventories(response.data);
            });
            assignmentService.getAssignments().then((response) => { // Görevleri almak için yeni eklenen çağrı
                setAssignments(response.data);
            });
        }
    }, [user.roles]);

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <button onClick={() => window.location.href = '/add-employee'}>Yeni Personel</button>
            <table>
                <thead>
                <tr>
                    <th>Sicil No</th>
                    <th>Ad</th>
                    <th>Soyad</th>
                    <th>Birim</th>
                    <th>Pozisyon</th>
                    <th>Güncelle</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.employeeNumber}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.department}</td>
                        <td>{employee.position}</td>
                        <td>
                            <button onClick={() => window.location.href = `/update-employee/${employee.id}`}>Güncelle</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2>Envanter Yönetimi</h2>
            <button onClick={() => window.location.href = '/add-inventory'}>Yeni Zimmet Ekle</button>
            <table>
                <thead>
                <tr>
                    <th>Tip</th>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Seri No</th>
                    <th>Durum</th>
                    <th>Güncelle</th>
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
                        <td>
                            <button onClick={() => window.location.href = `/update-inventory/${inventory.id}`}>Güncelle</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2>Görev Yönetimi</h2>
            <table>
                <thead>
                <tr>
                    <th>Görev ID</th>
                    <th>Görev Adı</th>
                    <th>Görev Açıklaması</th>
                    <th>Başlangıç Tarihi</th>
                    <th>Bitiş Tarihi</th>
                    <th>Güncelle</th>
                </tr>
                </thead>
                <tbody>
                {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                        <td>{assignment.id}</td>
                        <td>{assignment.name}</td>
                        <td>{assignment.description}</td>
                        <td>{assignment.startDate}</td>
                        <td>{assignment.endDate}</td>
                        <td>
                            <button onClick={() => window.location.href = `/update-assignment/${assignment.id}`}>Güncelle</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
