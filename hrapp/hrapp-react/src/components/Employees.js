import React, { useEffect, useState } from 'react';
import { getAllEmployees, deleteEmployee, createEmployee, updateEmployee, uploadPhoto, getAllRoles } from '../api';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]); // Rol verilerini tutacak state
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
        password: '',
        roles: [] // Rol bilgilerini tutacak alan
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getAllEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await getAllRoles(); // Rolleri getiren API çağrısı
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchEmployees();
        fetchRoles();
    }, []);

    const handleFileChange = (e) => {
        setPhotoFile(e.target.files[0]);
    };

    const handleRoleChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        const selectedRoles = roles.filter(role => value.includes(role.name));
        setNewEmployee({ ...newEmployee, roles: selectedRoles });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            let uploadedPhotoPath = newEmployee.profilePhoto;
            if (photoFile) {
                uploadedPhotoPath = await uploadPhoto(photoFile);
                console.log("Uploaded Photo Path:", uploadedPhotoPath);
            }

            const employeeData = {
                ...newEmployee,
                profilePhoto: uploadedPhotoPath
            };

            if (editingEmployeeId) {
                await updateEmployee(editingEmployeeId, employeeData);
                setEmployees(employees.map(employee =>
                    employee.id === editingEmployeeId ? { ...employeeData, id: editingEmployeeId } : employee
                ));
            } else {
                const response = await createEmployee(employeeData);
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

    const handleDelete = async (employeeId) => {
        try {
            await deleteEmployee(employeeId);
            setEmployees(employees.filter(employee => employee.id !== employeeId));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
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
            password: '',
            roles: []
        });
        setPhotoFile(null);
        setEditingEmployeeId(null);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Employees</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                <tr key="header-row">
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
                                <img src={`http://localhost:8080/uploads/${employee.profilePhoto}`} alt="Profile" className="h-8 w-8 rounded-full" />
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
                    type="file"
                    onChange={handleFileChange}
                    className="border rounded-lg px-4 py-2 w-full"
                />
                <select
                    multiple
                    value={newEmployee.roles.map(role => role.name)}
                    onChange={handleRoleChange}
                    className="border rounded-lg px-4 py-2 w-full"
                >
                    {roles.map(role => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                </select>
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
