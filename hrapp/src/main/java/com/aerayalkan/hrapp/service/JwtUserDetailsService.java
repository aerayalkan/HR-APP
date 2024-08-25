package com.aerayalkan.hrapp.service;

import com.aerayalkan.hrapp.model.Employee;
import com.aerayalkan.hrapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder bcryptEncoder;

    @Autowired
    public JwtUserDetailsService(EmployeeRepository employeeRepository, PasswordEncoder bcryptEncoder) {
        this.employeeRepository = employeeRepository;
        this.bcryptEncoder = bcryptEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByUsername(username);
        if (employee == null) {
            throw new UsernameNotFoundException("Employee not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(employee.getUsername(), employee.getPassword(),
                employee.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList()));
    }

    public Employee save(Employee employee) {
        // Yeni bir Employee nesnesi oluşturun ve gerekli alanları doldurun
        Employee newEmployee = new Employee();
        newEmployee.setFirstName(employee.getFirstName());
        newEmployee.setLastName(employee.getLastName());
        newEmployee.setTckn(employee.getTckn());
        newEmployee.setDepartment(employee.getDepartment());
        newEmployee.setPosition(employee.getPosition());
        newEmployee.setBirthDate(employee.getBirthDate());
        newEmployee.setMaritalStatus(employee.getMaritalStatus());
        newEmployee.setActive(employee.isActive());
        newEmployee.setEmployeeNumber(employee.getEmployeeNumber());
        newEmployee.setProfilePhoto(employee.getProfilePhoto());
        newEmployee.setUsername(employee.getUsername());

        // Şifreyi hashleyin
        newEmployee.setPassword(bcryptEncoder.encode(employee.getPassword()));

        // Çalışanı kaydedin
        return employeeRepository.save(newEmployee);
    }
}
