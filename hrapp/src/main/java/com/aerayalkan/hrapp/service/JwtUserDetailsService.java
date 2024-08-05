package com.aerayalkan.hrapp.service;

import com.aerayalkan.hrapp.dto.UserDto;
import com.aerayalkan.hrapp.model.Employee;
import com.aerayalkan.hrapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public Employee save(UserDto user) {
        Employee employee = new Employee();
        employee.setFirstName(user.getFirstName());
        employee.setLastName(user.getLastName());
        employee.setTckn(user.getTckn());
        employee.setDepartment(user.getDepartment());
        employee.setPosition(user.getPosition());
        employee.setBirthDate(user.getBirthDate());
        employee.setMaritalStatus(user.getMaritalStatus());
        employee.setActive(user.isActive());
        employee.setEmployeeNumber(user.getEmployeeNumber());
        employee.setProfilePhoto(user.getProfilePhoto());
        employee.setUsername(user.getUsername());
        employee.setPassword(bcryptEncoder.encode(user.getPassword()));

        return employeeRepository.save(employee);
    }
}
