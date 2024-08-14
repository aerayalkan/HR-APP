import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../api';

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = localStorage.getItem('token');
            const response = await getAllEmployees(token);
            console.log(response.data);  // Gelen veriyi konsolda kontrol edelim
            setEmployees(response.data);
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Employees</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">First Name</th>
                    <th className="px-4 py-2 border-b">Last Name</th>
                    <th className="px-4 py-2 border-b">TCKN</th>
                    <th className="px-4 py-2 border-b">Department</th>
                    <th className="px-4 py-2 border-b">Position</th>
                    <th className="px-4 py-2 border-b">Birth Date</th>
                    <th className="px-4 py-2 border-b">Marital Status</th>
                    <th className="px-4 py-2 border-b">Active</th>
                    <th className="px-4 py-2 border-b">Employee Number</th>
                    <th className="px-4 py-2 border-b">Profile Photo</th>
                    <th className="px-4 py-2 border-b">Username</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.map(employee => (
                    <tr key={employee.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b">{employee.firstName}</td>
                        <td className="px-4 py-2 border-b">{employee.lastName}</td>
                        <td className="px-4 py-2 border-b">{employee.tckn}</td>
                        <td className="px-4 py-2 border-b">{employee.department}</td>
                        <td className="px-4 py-2 border-b">{employee.position}</td>
                        <td className="px-4 py-2 border-b">{employee.birthDate}</td>
                        <td className="px-4 py-2 border-b">{employee.maritalStatus}</td>
                        <td className="px-4 py-2 border-b">{employee.active ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-2 border-b">{employee.employeeNumber}</td>
                        <td className="px-4 py-2 border-b">{employee.profilePhoto}</td>
                        <td className="px-4 py-2 border-b">{employee.username}</td>
                        <td className="px-4 py-2 border-b">
                            <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">Edit</button>
                            <button className="bg-danger text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Add New Employee</button>
        </div>
    );
};

export default Employees;
