package com.aerayalkan.hrapp.service;

import com.aerayalkan.hrapp.model.Assignment;
import com.aerayalkan.hrapp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public Assignment updateAssignment(Long id, Assignment assignmentDetails) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        assignment.setAssignedBy(assignmentDetails.getAssignedBy());
        assignment.setAssignmentDate(assignmentDetails.getAssignmentDate());
        assignment.setInventory(assignmentDetails.getInventory());
        assignment.setEmployee(assignmentDetails.getEmployee());
        assignment.setReturnDate(assignmentDetails.getReturnDate());
        assignment.setReturnedTo(assignmentDetails.getReturnedTo());

        return assignmentRepository.save(assignment);
    }

    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }

    // Employee'in kendi zimmetlerini getiren metod
    public List<Assignment> getAssignmentsByEmployeeUsername(String username) {
        return assignmentRepository.findByEmployee_Username(username);
    }
}