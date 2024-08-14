import React, { useEffect, useState } from 'react';
import { getAllAssignments } from '../api';

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            const token = localStorage.getItem('token');
            const response = await getAllAssignments(token);
            setAssignments(response.data);
        };

        fetchAssignments();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Assignments</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">Employee</th>
                    <th className="px-4 py-2 border-b">Inventory</th>
                    <th className="px-4 py-2 border-b">Assignment Date</th>
                    <th className="px-4 py-2 border-b">Return Date</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {assignments.map(assignment => (
                    <tr key={assignment.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b">{assignment.employee.firstName} {assignment.employee.lastName}</td>
                        <td className="px-4 py-2 border-b">{assignment.inventory.type} {assignment.inventory.model}</td>
                        <td className="px-4 py-2 border-b">{assignment.assignmentDate}</td>
                        <td className="px-4 py-2 border-b">{assignment.returnDate || 'Not Returned'}</td>
                        <td className="px-4 py-2 border-b">
                            <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">Edit</button>
                            <button className="bg-danger text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Add New Assignment</button>
        </div>
    );
};

export default Assignments;
