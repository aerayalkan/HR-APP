package com.aerayalkan.hrapp.controller;

import com.aerayalkan.hrapp.model.Assignment;
import com.aerayalkan.hrapp.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    // Admin ve Employee yetkisine sahip herkes tüm zimmetleri görebilir
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @GetMapping
    public List<Assignment> getAllAssignments(Authentication authentication) {
        String username = authentication.getName();
        // Eğer kullanıcı Employee ise sadece kendi zimmetlerini getir
        if (authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_EMPLOYEE"))) {
            return assignmentService.getAssignmentsByEmployeeUsername(username);
        }
        // Admin ise tüm zimmetleri getir
        return assignmentService.getAllAssignments();
    }

    // Sadece Admin zimmet oluşturabilir
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Assignment createAssignment(@Valid @RequestBody Assignment assignment) {
        return assignmentService.createAssignment(assignment);
    }

    // Sadece Admin zimmet güncelleyebilir
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable Long id, @Valid @RequestBody Assignment assignmentDetails) {
        return assignmentService.updateAssignment(id, assignmentDetails);
    }

    // Sadece Admin zimmet silebilir
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
    }
}