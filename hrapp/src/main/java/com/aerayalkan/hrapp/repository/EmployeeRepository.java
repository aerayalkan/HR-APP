package com.aerayalkan.hrapp.repository;

import com.aerayalkan.hrapp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e JOIN FETCH e.roles WHERE e.username = :username")
    Employee findByUsername(@Param("username") String username);
}
