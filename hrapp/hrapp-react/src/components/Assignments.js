import React, { useEffect, useState } from 'react';
import { getAllAssignments, createAssignment, updateAssignment, deleteAssignment } from '../api';

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [newAssignment, setNewAssignment] = useState({ assignedBy: '', assignmentDate: '', inventory: '', employee: '' });

    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await getAllAssignments();
            setAssignments(response.data);
        };

        fetchAssignments();
    }, []);

    const handleCreate = async () => {
        const response = await createAssignment(newAssignment);
        setAssignments([...assignments, response.data]);
    };

    const handleUpdate = async (id) => {
        const updatedAssignment = assignments.find(assignment => assignment.id === id);
        const response = await updateAssignment(id, updatedAssignment);
        setAssignments(assignments.map(assign => assign.id === id ? response.data : assign));
    };

    const handleDelete = async (id) => {
        await deleteAssignment(id);
        setAssignments(assignments.filter(assignment => assignment.id !== id));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Assignments</h2>
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
                        <td className="px-4 py-2 border-b">{assignment.assignedBy}</td>
                        <td className="px-4 py-2 border-b">{assignment.assignmentDate}</td>
                        <td className="px-4 py-2 border-b">{assignment.inventory}</td>
                        <td className="px-4 py-2 border-b">{assignment.employee}</td>
                        <td className="px-4 py-2 border-b">
                            <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition" onClick={() => handleUpdate(assignment.id)}>Edit</button>
                            <button className="bg-danger text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition" onClick={() => handleDelete(assignment.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Add New Assignment</h3>
                <input type="text" placeholder="Assigned By" value={newAssignment.assignedBy} onChange={(e) => setNewAssignment({ ...newAssignment, assignedBy: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <input type="date" placeholder="Assignment Date" value={newAssignment.assignmentDate} onChange={(e) => setNewAssignment({ ...newAssignment, assignmentDate: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <input type="text" placeholder="Inventory" value={newAssignment.inventory} onChange={(e) => setNewAssignment({ ...newAssignment, inventory: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <input type="text" placeholder="Employee" value={newAssignment.employee} onChange={(e) => setNewAssignment({ ...newAssignment, employee: e.target.value })} className="border rounded-lg px-4 py-2 mb-2 w-full" />
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={handleCreate}>Add Assignment</button>
            </div>
        </div>
    );
};

export default Assignments;
