import React, { useEffect, useState } from 'react';
import { getAllEmployees, deleteEmployee, createEmployee, updateEmployee } from '../api';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
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
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getAllEmployees();
                if (Array.isArray(response.data)) {
                    setEmployees(response.data);
                } else {
                    console.error("Expected array but got:", response.data);
                    setEmployees([]);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            await deleteEmployee(employeeId);
            setEmployees(employees.filter(employee => employee.id !== employeeId));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingEmployeeId) {
                // Update existing employee
                await updateEmployee(editingEmployeeId, newEmployee);
                setEmployees(employees.map(employee =>
                    employee.id === editingEmployeeId ? { ...newEmployee, id: editingEmployeeId } : employee
                ));
            } else {
                // Add new employee
                const response = await createEmployee(newEmployee);
                setEmployees([...employees, response.data]);
            }
            resetForm();
        } catch (error) {
            console.error('Error adding/updating employee:', error);
        }
    };

    const handleEdit = (employee) => {
        setNewEmployee(employee);
        setEditingEmployeeId(employee.id);
    };

    const resetForm = () => {
        setNewEmployee({
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
        setEditingEmployeeId(null);
    };

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
                        <td className="px-4 py-2 border-b">
                            {employee.profilePhoto ? (
                                <img src={employee.profilePhoto} alt="Profile" className="h-8 w-8 rounded-full" />
                            ) : 'N/A'}
                        </td>
                        <td className="px-4 py-2 border-b">{employee.username}</td>
                        <td className="px-4 py-2 border-b">
                            <button
                                className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                onClick={() => handleEdit(employee)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-danger text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition"
                                onClick={() => handleDelete(employee.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3 className="text-xl font-bold mt-6 mb-4">{editingEmployeeId ? 'Edit Employee' : 'Add New Employee'}</h3>
            <form onSubmit={handleAddOrUpdate} className="space-y-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={newEmployee.firstName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newEmployee.lastName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="TCKN"
                    value={newEmployee.tckn}
                    onChange={(e) => setNewEmployee({ ...newEmployee, tckn: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    type="date"
                    placeholder="Birth Date"
                    value={newEmployee.birthDate}
                    onChange={(e) => setNewEmployee({ ...newEmployee, birthDate: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Marital Status"
                    value={newEmployee.maritalStatus}
                    onChange={(e) => setNewEmployee({ ...newEmployee, maritalStatus: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Employee Number"
                    value={newEmployee.employeeNumber}
                    onChange={(e) => setNewEmployee({ ...newEmployee, employeeNumber: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Profile Photo URL"
                    value={newEmployee.profilePhoto}
                    onChange={(e) => setNewEmployee({ ...newEmployee, profilePhoto: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={newEmployee.username}
                    onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newEmployee.password}
                    onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                    className="border rounded-lg px-4 py-2 w-full"
                    required
                />
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    {editingEmployeeId ? 'Update Employee' : 'Add Employee'}
                </button>
                {editingEmployeeId && (
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition ml-4"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default Employees;
