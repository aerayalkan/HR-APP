package com.aerayalkan.hrapp.repository;

import com.aerayalkan.hrapp.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    // Çalışana zimmetli envanterleri getir
    List<Inventory> findByAssignmentsEmployeeId(Long employeeId);

    // Boşta olan envanterleri getir
    List<Inventory> findByAssignmentsIsNull();
}