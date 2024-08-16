package com.aerayalkan.hrapp.service;

import com.aerayalkan.hrapp.model.Employee;
import com.aerayalkan.hrapp.model.Assignment;
import com.aerayalkan.hrapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    public Employee saveEmployee(Employee employee) {
        employee.setPassword(bcryptEncoder.encode(employee.getPassword()));
        return employeeRepository.save(employee);
    }


    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee updateEmployeeAssignments(Long id, Set<Assignment> assignments) {
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            employee.setAssignments(assignments);
            return employeeRepository.save(employee);
        }
        throw new RuntimeException("Employee not found with id: " + id);
    }

    public Employee findByUsername(String username) {
        return employeeRepository.findByUsername(username);
    }
}
