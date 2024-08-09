import React, { useEffect, useState } from 'react';
import employeeService from '../services/employeeService';
import './EmployeesPage.css';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        employeeService.getEmployees().then((response) => {
            setEmployees(response.data);
        });
    }, []);

    return (
        <div className="employees-page">
            <h1>Employees</h1>
            <table>
                <thead>
                <tr>
                    <th>Sicil No</th>
                    <th>Ad</th>
                    <th>Soyad</th>
                    <th>Birim</th>
                    <th>Pozisyon</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesPage;
