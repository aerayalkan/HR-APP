import React, { useState } from 'react';
import { createEmployee } from '../api';

const AddEmployee = ({ onEmployeeAdded }) => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        department: '',
        position: '',
        tckn: '',
        birthDate: '',
        maritalStatus: '',
        active: true,
        employeeNumber: '',
        profilePhoto: '',
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createEmployee(employee);
        onEmployeeAdded(response.data);
        setEmployee({
            firstName: '',
            lastName: '',
            department: '',
            position: '',
            tckn: '',
            birthDate: '',
            maritalStatus: '',
            active: true,
            employeeNumber: '',
            profilePhoto: '',
            username: '',
            password: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="First Name"
                value={employee.firstName}
                onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="text"
                placeholder="Last Name"
                value={employee.lastName}
                onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="text"
                placeholder="Department"
                value={employee.department}
                onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="text"
                placeholder="Position"
                value={employee.position}
                onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="text"
                placeholder="TCKN"
                value={employee.tckn}
                onChange={(e) => setEmployee({ ...employee, tckn: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="date"
                placeholder="Birth Date"
                value={employee.birthDate}
                onChange={(e) => setEmployee({ ...employee, birthDate: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="text"
                placeholder="Marital Status"
                value={employee.maritalStatus}
                onChange={(e) => setEmployee({ ...employee, maritalStatus: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="text"
                placeholder="Employee Number"
                value={employee.employeeNumber}
                onChange={(e) => setEmployee({ ...employee, employeeNumber: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="text"
                placeholder="Profile Photo URL"
                value={employee.profilePhoto}
                onChange={(e) => setEmployee({ ...employee, profilePhoto: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="text"
                placeholder="Username"
                value={employee.username}
                onChange={(e) => setEmployee({ ...employee, username: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <input
                type="password"
                placeholder="Password"
                value={employee.password}
                onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full"
            />
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Add Employee
            </button>
        </form>
    );
};

export default AddEmployee;
