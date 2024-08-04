package com.aerayalkan.hrapp.controller;

import com.aerayalkan.hrapp.dto.UserDto;
import com.aerayalkan.hrapp.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class UserRegistrationController {

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveUser(@RequestBody UserDto userDto) throws Exception {
        return ResponseEntity.ok(userDetailsService.save(userDto));
    }
}
