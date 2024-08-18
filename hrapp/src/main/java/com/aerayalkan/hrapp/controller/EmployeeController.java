package com.aerayalkan.hrapp.controller;

import com.aerayalkan.hrapp.dto.UserDto;
import com.aerayalkan.hrapp.model.Assignment;
import com.aerayalkan.hrapp.model.Employee;
import com.aerayalkan.hrapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Employee> createEmployee(@RequestBody UserDto userDto) {
        Employee employee = convertToEntity(userDto);
        return ResponseEntity.ok(employeeService.saveEmployee(employee));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employeeOpt = employeeService.getEmployeeById(id);
        return employeeOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody UserDto updatedUserDto) {
        Optional<Employee> employeeOpt = employeeService.getEmployeeById(id);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            updateEntityFromDto(updatedUserDto, employee);
            return ResponseEntity.ok(employeeService.saveEmployee(employee));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @PutMapping("/{id}/assignments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Employee> updateEmployeeAssignments(@PathVariable Long id, @RequestBody Set<Assignment> assignments) {
        return ResponseEntity.ok(employeeService.updateEmployeeAssignments(id, assignments));
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
        employee.setPassword(userDto.getPassword());
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
        employee.setPassword(userDto.getPassword());
    }
}
