package com.aerayalkan.hrapp.service;

import com.aerayalkan.hrapp.model.EmploymentRecord;
import com.aerayalkan.hrapp.repository.EmploymentRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmploymentRecordService {

    @Autowired
    private EmploymentRecordRepository employmentRecordRepository;

    public List<EmploymentRecord> getAllEmploymentRecords() {
        return employmentRecordRepository.findAll();
    }

    public EmploymentRecord createEmploymentRecord(EmploymentRecord employmentRecord) {
        return employmentRecordRepository.save(employmentRecord);
    }

    public EmploymentRecord updateEmploymentRecord(Long id, EmploymentRecord employmentRecordDetails) {
        EmploymentRecord employmentRecord = employmentRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EmploymentRecord not found for this id :: " + id));

        employmentRecord.setStartDate(employmentRecordDetails.getStartDate());
        employmentRecord.setStartPosition(employmentRecordDetails.getStartPosition());
        employmentRecord.setStartTitle(employmentRecordDetails.getStartTitle());
        employmentRecord.setEndDate(employmentRecordDetails.getEndDate());
        employmentRecord.setEndReason(employmentRecordDetails.getEndReason());

        return employmentRecordRepository.save(employmentRecord);
    }

    public void deleteEmploymentRecord(Long id) {
        EmploymentRecord employmentRecord = employmentRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EmploymentRecord not found for this id :: " + id));
        employmentRecordRepository.delete(employmentRecord);
    }
}