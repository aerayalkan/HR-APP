package com.aerayalkan.hrapp.service;

import com.aerayalkan.hrapp.dto.UserDto;
import com.aerayalkan.hrapp.model.Employee;
import com.aerayalkan.hrapp.model.Assignment;
import com.aerayalkan.hrapp.model.Role;
import com.aerayalkan.hrapp.repository.EmployeeRepository;
import com.aerayalkan.hrapp.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public Employee createEmployee(UserDto userDto) {
        Employee employee = convertToEntity(userDto);
        Set<Role> roles = new HashSet<>();
        Role employeeRole = roleRepository.findByName("ROLE_EMPLOYEE");
        if (employeeRole != null) {
            roles.add(employeeRole);
        }
        employee.setRoles(roles);
        employee.setPassword(bcryptEncoder.encode(userDto.getPassword()));
        return employeeRepository.save(employee);
    }

    @Transactional
    public Employee updateEmployeeFromDto(Long id, UserDto userDto) {
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            updateEntityFromDto(userDto, employee);
            return employeeRepository.save(employee);
        }
        throw new RuntimeException("Employee not found with id: " + id);
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Transactional
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

    private Employee convertToEntity(UserDto userDto) {
        Employee employee = new Employee();
        employee.setFirstName(userDto.getFirstName());
        employee.setLastName(userDto.getLastName());
        employee.setTckn(userDto.getTckn());
        employee.setDepartment(userDto.getDepartment());
        employee.setPosition(userDto.getPosition());
        employee.setBirthDate(userDto.getBirthDate());
        employee.setMaritalStatus(userDto.getMaritalStatus());
        employee.setActive(userDto.isActive());
        employee.setEmployeeNumber(userDto.getEmployeeNumber());
        employee.setProfilePhoto(userDto.getProfilePhoto());
        employee.setUsername(userDto.getUsername());
        return employee;
    }

    private void updateEntityFromDto(UserDto userDto, Employee employee) {
        employee.setFirstName(userDto.getFirstName());
        employee.setLastName(userDto.getLastName());
        employee.setTckn(userDto.getTckn());
        employee.setDepartment(userDto.getDepartment());
        employee.setPosition(userDto.getPosition());
        employee.setBirthDate(userDto.getBirthDate());
        employee.setMaritalStatus(userDto.getMaritalStatus());
        employee.setActive(userDto.isActive());
        employee.setEmployeeNumber(userDto.getEmployeeNumber());
        employee.setProfilePhoto(userDto.getProfilePhoto());
        employee.setUsername(userDto.getUsername());

        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            employee.setPassword(bcryptEncoder.encode(userDto.getPassword()));
        }
    }
}
