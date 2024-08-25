package com.aerayalkan.hrapp.repository;

import com.aerayalkan.hrapp.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByEmployee_Username(String username);
}
