package com.aerayalkan.hrapp.controller;

import com.aerayalkan.hrapp.model.Employee;
import com.aerayalkan.hrapp.model.Inventory;
import com.aerayalkan.hrapp.service.InventoryService;
import com.aerayalkan.hrapp.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventories")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private EmployeeService employeeService;

    // Çalışana zimmetli envanterleri getir
    @GetMapping("/assigned")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<Inventory> getAssignedInventories(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Employee employee = employeeService.findByUsername(username);
        return inventoryService.getAssignedInventories(employee.getId());
    }

    // Boşta olan envanterleri getir
    @GetMapping("/available")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<Inventory> getAvailableInventories() {
        return inventoryService.getAvailableInventories();
    }

    // Tüm envanterleri getir (sadece adminler için)
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Inventory> getAllInventories() {
        return inventoryService.getAllInventories();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Inventory createInventory(@Valid @RequestBody Inventory inventory) {
        return inventoryService.createInventory(inventory);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Inventory updateInventory(@PathVariable Long id, @Valid @RequestBody Inventory inventoryDetails) {
        return inventoryService.updateInventory(id, inventoryDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
    }
}
