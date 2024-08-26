package com.aerayalkan.hrapp.service;

import com.aerayalkan.hrapp.model.Employee;
import com.aerayalkan.hrapp.model.Assignment;
import com.aerayalkan.hrapp.model.Role;
import com.aerayalkan.hrapp.repository.RoleRepository;
import com.aerayalkan.hrapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    public Employee saveEmployee(Employee employee) {
        Set<Role> attachedRoles = new HashSet<>();
        for (Role role : employee.getRoles()) {
            Role attachedRole = roleRepository.findByName(role.getName());
            if (attachedRole != null) {
                attachedRoles.add(attachedRole);
            }
        }
        employee.setRoles(attachedRoles);

        employee.setPassword(bcryptEncoder.encode(employee.getPassword()));
        return employeeRepository.save(employee);
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public void deleteEmployee(Long id) {
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();

            // Rolleri temizle
            employee.getRoles().clear();
            employeeRepository.save(employee);

            // Çalışanı sil
            employeeRepository.deleteById(id);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
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

    // ROLE_EMPLOYEE'yi eklemek için
    public void addRoleIfNotExist(Employee employee, String roleName) {
        if (employee.getRoles() == null) {
            employee.setRoles(new HashSet<>());
        }
        Role role = roleRepository.findByName(roleName);
        if (role != null && !employee.getRoles().contains(role)) {
            employee.getRoles().add(role);
        }
    }

    // Çalışanın rollerini güncelle
    public void updateEmployeeRoles(Employee employee, Set<Role> updatedRoles) {
        Set<Role> roles = new HashSet<>();
        for (Role role : updatedRoles) {
            Role existingRole = roleRepository.findByName(role.getName());
            if (existingRole != null) {
                roles.add(existingRole);
            }
        }
        employee.setRoles(roles);
        employeeRepository.save(employee);
    }
}
