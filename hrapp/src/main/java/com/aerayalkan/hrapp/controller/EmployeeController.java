package com.aerayalkan.hrapp.controller;

import com.aerayalkan.hrapp.model.Assignment;
import com.aerayalkan.hrapp.model.Employee;
import com.aerayalkan.hrapp.service.EmployeeService;
import com.aerayalkan.hrapp.service.StorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Set;
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private StorageService storageService;


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        employeeService.addRoleIfNotExist(employee, "ROLE_EMPLOYEE");
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
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        Optional<Employee> employeeOpt = employeeService.getEmployeeById(id);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();

            employee.setFirstName(updatedEmployee.getFirstName());
            employee.setLastName(updatedEmployee.getLastName());
            employee.setTckn(updatedEmployee.getTckn());
            employee.setDepartment(updatedEmployee.getDepartment());
            employee.setPosition(updatedEmployee.getPosition());
            employee.setBirthDate(updatedEmployee.getBirthDate());
            employee.setMaritalStatus(updatedEmployee.getMaritalStatus());
            employee.setActive(updatedEmployee.isActive());
            employee.setEmployeeNumber(updatedEmployee.getEmployeeNumber());
            employee.setProfilePhoto(updatedEmployee.getProfilePhoto());
            employee.setAssignments(updatedEmployee.getAssignments());
            employee.setEmploymentRecords(updatedEmployee.getEmploymentRecords());
            employee.setRoles(updatedEmployee.getRoles());
            employee.setUsername(updatedEmployee.getUsername());
            employee.setPassword(updatedEmployee.getPassword());

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

    // Yeni Eklenen Fotoğraf Yükleme Endpoint'i
    @PostMapping("/uploadPhoto")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> uploadPhoto(@RequestParam("file") MultipartFile file) {
        String fileName = storageService.storeFile(file);
        String fileDownloadUri = "/uploads/" + fileName; // Dosyanın indirilebilir URL'si
        return ResponseEntity.ok(fileDownloadUri);
    }

}
