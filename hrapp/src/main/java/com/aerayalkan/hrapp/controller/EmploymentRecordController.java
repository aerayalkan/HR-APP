package com.aerayalkan.hrapp.controller;

import com.aerayalkan.hrapp.model.EmploymentRecord;
import com.aerayalkan.hrapp.service.EmploymentRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/employment-records")
public class EmploymentRecordController {

    @Autowired
    private EmploymentRecordService employmentRecordService;

    @GetMapping
    public List<EmploymentRecord> getAllEmploymentRecords() {
        return employmentRecordService.getAllEmploymentRecords();
    }

    @PostMapping
    public EmploymentRecord createEmploymentRecord(@Valid @RequestBody EmploymentRecord employmentRecord) {
        return employmentRecordService.createEmploymentRecord(employmentRecord);
    }

    @PutMapping("/{id}")
    public EmploymentRecord updateEmploymentRecord(@PathVariable Long id, @Valid @RequestBody EmploymentRecord employmentRecordDetails) {
        return employmentRecordService.updateEmploymentRecord(id, employmentRecordDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteEmploymentRecord(@PathVariable Long id) {
        employmentRecordService.deleteEmploymentRecord(id);
    }
}
