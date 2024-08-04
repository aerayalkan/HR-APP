package com.aerayalkan.hrapp.repository;

import com.aerayalkan.hrapp.model.EmploymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmploymentRecordRepository extends JpaRepository<EmploymentRecord, Long> {
}
