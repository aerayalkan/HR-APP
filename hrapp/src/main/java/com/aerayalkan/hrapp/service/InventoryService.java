package com.aerayalkan.hrapp.service;

import com.aerayalkan.hrapp.model.Inventory;
import com.aerayalkan.hrapp.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(Long id, Inventory inventoryDetails) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found for this id :: " + id));

        inventory.setType(inventoryDetails.getType());
        inventory.setBrand(inventoryDetails.getBrand());
        inventory.setModel(inventoryDetails.getModel());
        inventory.setSerialNumber(inventoryDetails.getSerialNumber());
        inventory.setStatus(inventoryDetails.getStatus());
        inventory.setEntryDate(inventoryDetails.getEntryDate());

        return inventoryRepository.save(inventory);
    }

    public void deleteInventory(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found for this id :: " + id));
        inventoryRepository.delete(inventory);
    }

    public List<Inventory> getAssignedInventories(Long employeeId) {
        return inventoryRepository.findByAssignmentsEmployeeId(employeeId);
    }

    public List<Inventory> getAvailableInventories() {
        return inventoryRepository.findByAssignmentsIsNull();
    }
}