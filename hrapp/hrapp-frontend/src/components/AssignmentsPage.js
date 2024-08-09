import React, { useEffect, useState } from 'react';
import assignmentService from '../services/assignmentService';
import './AssignmentsPage.css';

const AssignmentsPage = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        assignmentService.getAllAssignments().then((response) => {
            setAssignments(response.data);
        });
    }, []);

    return (
        <div className="assignments-page">
            <h1>Assignments</h1>
            <table>
                <thead>
                <tr>
                    <th>Görev ID</th>
                    <th>Görev Adı</th>
                    <th>Görev Açıklaması</th>
                    <th>Başlangıç Tarihi</th>
                    <th>Bitiş Tarihi</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignmentsPage;
