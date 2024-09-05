import React, { useEffect, useState } from 'react';
import { getAllAssignments, createAssignment, updateAssignment, deleteAssignment, getAllEmployees, getAllInventories } from '../api';

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [newAssignment, setNewAssignment] = useState({
        assignedBy: '',
        assignmentDate: '',
        inventory: { id: '' },  // Representing inventory with an id field
        employees: { id: '' }    // Representing employees with an id field
    });

    useEffect(() => {
        const fetchData = async () => {
            const assignmentsResponse = await getAllAssignments();
            setAssignments(assignmentsResponse.data);

            const employeesResponse = await getAllEmployees();
            setEmployees(employeesResponse.data);

            const inventoriesResponse = await getAllInventories();
            setInventories(inventoriesResponse.data);
        };

        fetchData();
    }, []);

    const handleCreate = async () => {
        try {
            const response = await createAssignment(newAssignment);
            setAssignments([...assignments, response.data]);

            setNewAssignment({
                assignedBy: '',
                assignmentDate: '',
                inventory: { id: '' },  // Resetting inventory with an id field
                employees: { id: '' }    // Resetting employees with an id field
            });
        } catch (error) {
            console.error("Assignment creation failed", error);
            alert("Assignment creation failed. Please try again.");
        }
    };

    const handleUpdate = async (id) => {
        try {
            const updatedAssignment = assignments.find(assignment => assignment.id === id);
            const response = await updateAssignment(id, updatedAssignment);
            setAssignments(assignments.map(assign => assign.id === id ? response.data : assign));
        } catch (error) {
            console.error("Assignment update failed", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAssignment(id);
            setAssignments(assignments.filter(assignment => assignment.id !== id));
        } catch (error) {
            console.error("Assignment deletion failed", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Assignments</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">Assigned By</th>
                    <th className="px-4 py-2 border-b">Assignment Date</th>
                    <th className="px-4 py-2 border-b">Inventory</th>
                    <th className="px-4 py-2 border-b">Employee</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {assignments.map(assignment => (
                    <tr key={assignment.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b">{assignment?.assignedBy}</td>
                        <td className="px-4 py-2 border-b">{assignment?.assignmentDate}</td>
                        <td className="px-4 py-2 border-b">{assignment?.inventory?.model}</td>
                        <td className="px-4 py-2 border-b">{assignment?.employees?.firstName} {assignment?.employees?.lastName}</td>
                        <td className="px-4 py-2 border-b">
                            <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition" onClick={() => handleUpdate(assignment.id)}>Edit</button>
                            <button className="bg-danger text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition" onClick={() => handleDelete(assignment.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-2 text-white">Add New Assignment</h3>
                <input type="text" placeholder="Assigned By" value={newAssignment.assignedBy} onChange={(e) => setNewAssignment({ ...newAssignment, assignedBy: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <input type="date" placeholder="Assignment Date" value={newAssignment.assignmentDate} onChange={(e) => setNewAssignment({ ...newAssignment, assignmentDate: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />

                <select value={newAssignment.inventory.id} onChange={(e) => setNewAssignment({ ...newAssignment, inventory: { id: e.target.value } })} className="border rounded-lg px-4 py-2 mb-2 w-full">
                    <option value="">Select Inventory</option>
                    {inventories.map(inventory => (
                        <option key={inventory.id} value={inventory.id}>{inventory.model}</option>
                    ))}
                </select>

                <select value={newAssignment.employees.id} onChange={(e) => setNewAssignment({ ...newAssignment, employees: { id: e.target.value } })} className="border rounded-lg px-4 py-2 mb-2 w-full">
                    <option value="">Select Employee</option>
                    {employees.map(employee => (
                        <option key={employee?.id} value={employee?.id}>{employee?.firstName} {employee?.lastName}</option>
                    ))}
                </select>

                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={handleCreate}>Add Assignment</button>
            </div>
        </div>
    );
};

export default Assignments;