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
                .orElseThrow(() -> new RuntimeException("Assignment not found for this id :: " + id));

        assignment.setEmployee(assignmentDetails.getEmployee());
        assignment.setInventory(assignmentDetails.getInventory());
        assignment.setAssignmentDate(assignmentDetails.getAssignmentDate());
        assignment.setReturnDate(assignmentDetails.getReturnDate());
        assignment.setAssignedBy(assignmentDetails.getAssignedBy());
        assignment.setReturnedTo(assignmentDetails.getReturnedTo());

        return assignmentRepository.save(assignment);
    }

    public void deleteAssignment(Long id) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found for this id :: " + id));
        assignmentRepository.delete(assignment);
    }
}
